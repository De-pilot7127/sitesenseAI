"""Gemma integration boundary for Phase 2."""

import json
import os
import urllib.error
import urllib.request

from dotenv import load_dotenv

load_dotenv()


def analyze_with_gemma(input_text: str) -> tuple[str, str]:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return (
            "Demo analysis: the backend received the request and is ready for AI integration.",
            "Configure GEMINI_API_KEY to enable live Gemma analysis.",
        )

    model = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
    endpoint = (
        f"https://generativelanguage.googleapis.com/v1beta/models/"
        f"{model}:generateContent?key={api_key}"
    )
    payload = {
        "contents": [
            {
                "role": "user",
                "parts": [
                    {
                        "text": (
                            "You are a construction intelligence assistant. "
                            "Provide concise findings and actionable recommendations "
                            "for this construction portfolio request:\n\n"
                            f"{input_text}"
                        )
                    }
                ],
            }
        ]
    }
    request = urllib.request.Request(
        endpoint,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            result = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as error:
        return (
            "Gemini could not analyze the request.",
            f"The Gemini API returned HTTP {error.code}. Check the API key and model configuration.",
        )
    except (urllib.error.URLError, TimeoutError):
        return (
            "Gemini is temporarily unavailable.",
            "Check network access to the Gemini API and try again.",
        )

    text = result.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text")
    if not text:
        return (
            "Gemini returned no analysis.",
            "Try a more specific construction question.",
        )
    return text, "Review these AI findings with qualified project personnel before operational decisions."
