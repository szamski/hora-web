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


def create_idea(api_key, org_id, title, text):
    mutation = """
    mutation CreateIdea($input: CreateIdeaInput!) {
        createIdea(input: $input) {
            ... on Idea {
                id
                content { title text }
            }
        }
    }
    """
    variables = {
        "input": {
            "organizationId": org_id,
            "content": {
                "title": title,
                "text": text,
            },
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
    org_id = os.environ.get("BUFFER_ORG_ID")

    if not api_key:
        print("Missing BUFFER_API_KEY", file=sys.stderr)
        sys.exit(1)
    if not org_id:
        print("Missing BUFFER_ORG_ID", file=sys.stderr)
        sys.exit(1)

    with open("/tmp/issue-body.md", "r") as f:
        copy = f.read()

    results = []

    # LinkedIn
    li_post = extract_linkedin_post(copy)
    if li_post:
        resp = create_idea(api_key, org_id, "LinkedIn post", li_post)
        results.append(("LinkedIn post", resp))
        print(f"LinkedIn idea created ({len(li_post)} chars)")

        li_comment = extract_linkedin_comment(copy)
        if li_comment:
            resp = create_idea(api_key, org_id, "LinkedIn first comment", li_comment)
            results.append(("LinkedIn comment", resp))
            print("LinkedIn comment idea created")
    else:
        print("Could not extract LinkedIn post from copy", file=sys.stderr)

    # X/Twitter — standalone
    standalone = extract_x_standalone(copy)
    if standalone:
        resp = create_idea(api_key, org_id, "X standalone", standalone)
        results.append(("X standalone", resp))
        print(f"X standalone idea created ({len(standalone)} chars)")

    # X/Twitter — thread
    thread = extract_x_thread(copy)
    if thread:
        for i, post in enumerate(thread, 1):
            resp = create_idea(api_key, org_id, f"X thread {i}/{len(thread)}", post)
            results.append((f"X thread {i}", resp))
        print(f"X thread ideas created ({len(thread)} posts)")

    if not standalone and not thread:
        print("Could not extract X posts from copy", file=sys.stderr)

    # Check for errors
    errors = []
    for label, resp in results:
        if "errors" in resp:
            errors.append(f"{label}: {resp['errors']}")

    if errors:
        print("Buffer errors:", file=sys.stderr)
        for e in errors:
            print(f"  - {e}", file=sys.stderr)
        sys.exit(1)

    print(f"All {len(results)} ideas pushed to Buffer successfully")


if __name__ == "__main__":
    main()
