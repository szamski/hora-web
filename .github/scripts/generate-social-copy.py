#!/usr/bin/env python3
"""Generate social media copy from a blog post using Gemini API."""

import json
import os
import re
import sys
import urllib.request
import urllib.error

def parse_frontmatter(content):
    match = re.match(r'^---\n(.*?)\n---\n(.*)$', content, re.DOTALL)
    if not match:
        return {}, content
    meta = {}
    for line in match.group(1).split('\n'):
        if ':' in line:
            key, *rest = line.split(':')
            val = ':'.join(rest).strip().strip('"').strip("'")
            meta[key.strip()] = val
    return meta, match.group(2)

def main():
    post_file = os.environ.get('POST_FILE')
    api_key = os.environ.get('GEMINI_API_KEY')

    if not post_file or not api_key:
        print("Missing POST_FILE or GEMINI_API_KEY", file=sys.stderr)
        sys.exit(1)

    with open(post_file, 'r') as f:
        content = f.read()

    meta, body = parse_frontmatter(content)
    title = meta.get('title', os.path.basename(post_file))
    description = meta.get('description', '')
    tags = meta.get('tags', '')
    date = meta.get('date', '')
    slug = os.path.splitext(os.path.basename(post_file))[0]
    blog_url = f"https://horacal.app/blog/{slug}/"
    img_count = len(re.findall(r'!\[', content))

    prompt = f"""You are a social media copywriter for an indie developer building "hora Calendar" — a native macOS Google Calendar client (Swift 6 + SwiftUI, no Electron, no CalDAV, direct Google REST API).

The developer's handle is @moto_szama on X and the website is horacal.app.

Given a blog post, generate ready-to-publish social media copy. The copy must use these algorithm-hacking techniques:

## X / Twitter rules:
- Thread format: 5 posts. Each post MUST be under 280 characters.
- Post 1 (hook): Start with a bold claim, number, or contrarian take. Use whitespace aggressively (short lines). End with a thread indicator. NO hashtags in main posts.
- Posts 2-4: Each covers ONE specific thing from the blog. Be concrete and technical — devs respect specifics. Use line breaks between ideas. Each must stand alone if someone only sees that one tweet.
- Post 5 (CTA): Mention horacal.app, link to blog post, "long road ahead" vibe (NOT "coming soon" or "almost ready").
- Also generate a STANDALONE version (single tweet, under 280 chars) as alternative.
- Timing recommendation and first self-reply text (for hashtags + engagement bait).

## LinkedIn rules:
- One long-form post (1500-2000 chars). Storytelling format.
- First line must be a HOOK — surprising stat, contrarian opinion, or bold statement. This is the only line visible before "see more".
- Use single-line paragraphs with whitespace between them (LinkedIn rewards scroll depth / dwell time).
- Include numbered list of what was shipped (scannable).
- End with an OPEN QUESTION relevant to the post topic (drives comments, which LinkedIn's algorithm rewards heavily).
- Do NOT put any links in the post body. Note that the link goes in the FIRST COMMENT.
- Max 3-5 hashtags at the very end.

## General rules:
- Write in English.
- Tone: authentic indie dev, technical but accessible. Not corporate, not hype-bro.
- Never say "coming soon", "almost ready", "final polish". This is a journey — long road ahead.
- Never use generic filler ("excited to share", "I'm thrilled", "check it out").
- Be specific — mention actual features, actual technical decisions, actual numbers.

## Output format:
Use this exact markdown structure:

## X / Twitter

### Thread

**Post 1:**
```
[post text]
```

**Post 2:**
```
[post text]
```

**Post 3:**
```
[post text]
```

**Post 4:**
```
[post text]
```

**Post 5:**
```
[post text]
```

### Standalone
```
[single tweet text]
```

### First self-reply
```
[reply with hashtags and engagement prompt]
```

---

## LinkedIn

### Post
```
[full linkedin post]
```

### First comment
```
[comment with blog link]
```

---

## Timing
- **X:** [recommended day and time]
- **LinkedIn:** [recommended day and time]

## Media suggestions
[what screenshots/images to attach to each platform]

---

Now generate copy for this blog post:

Blog URL: {blog_url}
Number of screenshots in post: {img_count}

---

{content}
"""

    request_body = json.dumps({
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "temperature": 0.9,
            "maxOutputTokens": 8192
        }
    })

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"

    req = urllib.request.Request(
        url,
        data=request_body.encode('utf-8'),
        headers={"Content-Type": "application/json"},
        method="POST"
    )

    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            data = json.loads(resp.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        print(f"Gemini API error {e.code}: {error_body}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Request failed: {e}", file=sys.stderr)
        sys.exit(1)

    try:
        ai_copy = data["candidates"][0]["content"]["parts"][0]["text"]
    except (KeyError, IndexError) as e:
        print(f"Unexpected response structure: {e}", file=sys.stderr)
        print(json.dumps(data, indent=2), file=sys.stderr)
        sys.exit(1)

    # Build issue body
    issue_body = f"""## Social Copy for New Blog Post

**Post:** [{title}]({blog_url})
**Date:** {date}
**Generated by:** Gemini 2.0 Flash
**Screenshots available:** {img_count}

> Review and adjust before posting. AI-generated — check tone, facts, and character counts.

---

{ai_copy}
"""

    # Write outputs
    with open('/tmp/issue-body.md', 'w') as f:
        f.write(issue_body)

    with open('/tmp/issue-title.txt', 'w') as f:
        f.write(f"Social copy: {title}")

    print(f"Generated social copy for: {title}")
    print(f"Blog URL: {blog_url}")
    print(f"AI response length: {len(ai_copy)} chars")

if __name__ == '__main__':
    main()
