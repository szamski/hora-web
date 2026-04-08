#!/usr/bin/env python3
"""Push generated social media copy to Buffer as drafts."""

import json
import os
import re
import sys
import time
import urllib.request
import urllib.error

BUFFER_API = "https://api.buffer.com"


def buffer_request(api_key, query, variables=None, max_retries=3):
    body = {"query": query}
    if variables:
        body["variables"] = variables
    for attempt in range(max_retries):
        req = urllib.request.Request(
            BUFFER_API,
            data=json.dumps(body).encode("utf-8"),
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {api_key}",
            },
            method="POST",
        )
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            if e.code in (429, 500, 502, 503) and attempt < max_retries - 1:
                wait = 10 * (2 ** attempt)
                print(f"Buffer API {e.code}, retrying in {wait}s (attempt {attempt + 1}/{max_retries})...")
                time.sleep(wait)
                continue
            raise


def create_draft(api_key, channel_id, text):
    mutation = """
    mutation CreatePost($input: CreatePostInput!) {
        createPost(input: $input) {
            ... on PostActionSuccess {
                post { id text }
            }
            ... on MutationError {
                message
            }
        }
    }
    """
    variables = {
        "input": {
            "text": text,
            "channelId": channel_id,
            "saveToDraft": True,
        }
    }
    return buffer_request(api_key, mutation, variables)


def extract_linkedin_post(copy):
    """Extract LinkedIn post text from the generated copy."""
    match = re.search(
        r"## LinkedIn\s*\n+### Post\s*\n+```\n(.*?)\n```",
        copy,
        re.DOTALL,
    )
    return match.group(1).strip() if match else None


def extract_linkedin_comment(copy):
    """Extract LinkedIn first comment text."""
    match = re.search(
        r"### First comment\s*\n+```\n(.*?)\n```",
        copy,
        re.DOTALL,
    )
    return match.group(1).strip() if match else None


def extract_x_standalone(copy):
    """Extract standalone X/Twitter post."""
    match = re.search(
        r"### Standalone\s*\n+```\n(.*?)\n```",
        copy,
        re.DOTALL,
    )
    return match.group(1).strip() if match else None


def extract_x_thread(copy):
    """Extract X/Twitter thread posts."""
    posts = []
    for match in re.finditer(
        r"\*\*Post \d+:\*\*\s*\n```\n(.*?)\n```",
        copy,
        re.DOTALL,
    ):
        posts.append(match.group(1).strip())
    return posts


def main():
    api_key = os.environ.get("BUFFER_API_KEY")
    linkedin_channel = os.environ.get("BUFFER_LINKEDIN_CHANNEL_ID")
    x_channel = os.environ.get("BUFFER_X_CHANNEL_ID")
    threads_channel = os.environ.get("BUFFER_THREADS_CHANNEL_ID")

    if not api_key:
        print("Missing BUFFER_API_KEY", file=sys.stderr)
        sys.exit(1)

    with open("/tmp/issue-body.md", "r") as f:
        copy = f.read()

    results = []

    # LinkedIn draft
    if linkedin_channel:
        li_post = extract_linkedin_post(copy)
        if li_post:
            resp = create_draft(api_key, linkedin_channel, li_post)
            results.append(("LinkedIn post", resp))
            print(f"LinkedIn draft created ({len(li_post)} chars)")

            # LinkedIn first comment as separate draft with note
            li_comment = extract_linkedin_comment(copy)
            if li_comment:
                comment_draft = f"[FIRST COMMENT after posting]\n\n{li_comment}"
                resp = create_draft(api_key, linkedin_channel, comment_draft)
                results.append(("LinkedIn comment", resp))
                print(f"LinkedIn comment draft created")
        else:
            print("Could not extract LinkedIn post from copy", file=sys.stderr)

    # X/Twitter draft — standalone version
    if x_channel:
        standalone = extract_x_standalone(copy)
        if standalone:
            resp = create_draft(api_key, x_channel, standalone)
            results.append(("X standalone", resp))
            print(f"X standalone draft created ({len(standalone)} chars)")

        # Thread posts as individual drafts
        thread = extract_x_thread(copy)
        if thread:
            for i, post in enumerate(thread, 1):
                draft_text = f"[THREAD {i}/{len(thread)}]\n\n{post}"
                resp = create_draft(api_key, x_channel, draft_text)
                results.append((f"X thread {i}", resp))
            print(f"X thread drafts created ({len(thread)} posts)")

        if not standalone and not thread:
            print("Could not extract X posts from copy", file=sys.stderr)

    # Threads — same content as X
    if threads_channel:
        if standalone:
            resp = create_draft(api_key, threads_channel, standalone)
            results.append(("Threads standalone", resp))
            print(f"Threads standalone draft created ({len(standalone)} chars)")

        if thread:
            for i, post in enumerate(thread, 1):
                draft_text = f"[THREAD {i}/{len(thread)}]\n\n{post}"
                resp = create_draft(api_key, threads_channel, draft_text)
                results.append((f"Threads thread {i}", resp))
            print(f"Threads thread drafts created ({len(thread)} posts)")

    # Check for errors
    errors = []
    for label, resp in results:
        if "errors" in resp:
            errors.append(f"{label}: {resp['errors']}")
        data = resp.get("data", {}).get("createPost", {})
        if "message" in data:
            errors.append(f"{label}: {data['message']}")

    if errors:
        print("Buffer errors:", file=sys.stderr)
        for e in errors:
            print(f"  - {e}", file=sys.stderr)
        sys.exit(1)

    print(f"All {len(results)} drafts pushed to Buffer successfully")


if __name__ == "__main__":
    main()
