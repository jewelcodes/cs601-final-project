# Etymology App for CS601
# Omar Elghoul

from fastapi import FastAPI
from bs4 import BeautifulSoup
from pycountry import languages
import time
import requests

app = FastAPI()


def scrape_wiktionary(word: str) -> str | None:
    url = "https://en.wiktionary.org/w/api.php"
    params = {
        "action": "query",
        "prop": "extracts",
        "titles": word,
        "format": "json"
    }

    try:
        res = requests.get(url, params=params)
        res.raise_for_status()
        data = res.json()
        if not data:
            return None
        query = data.get("query", {})
        pages = query.get("pages", {})
        if not pages:
            return None
        page = next(iter(pages.values()))
        extract = page.get("extract")
        if not extract:
            return None

        clean_extract = extract.replace("\u003C", "<").replace("\u003E", ">")
        return clean_extract
    except Exception:
        return None


def parse_etymology_from_html(html: str) -> list[dict]:
    soup = BeautifulSoup(html, "html.parser")

    english_h2 = soup.find("h2", string="English")
    if not english_h2:
        return []

    h3 = english_h2.find_next("h3", string="Etymology 1")
    if not h3:
        h3 = english_h2.find_next("h3", string="Etymology 2")
    if not h3:
        h3 = english_h2.find_next("h3", string="Etymology")
    if not h3:
        return []

    p = h3.find_next_sibling("p")
    if not p:
        return []

    results = []
    seen_non_english = False
    seen_archaic_lang = False
    current_lang = None

    for el in p.children:
        if el.name == "span" and el.text.strip():
            current_lang = el.text.strip()

        elif el.name == "i" and el.text.strip():
            language_code = el.attrs.get("lang")
            if language_code and (2 <= len(language_code) <= 3):
                if seen_archaic_lang:
                    continue
                try:
                    if len(language_code) == 2:
                        language = languages.get(alpha_2=language_code)
                    else:
                        language = languages.get(alpha_3=language_code)
                    if language and language.name:
                        current_lang = language.name
                        if "(" in current_lang:
                            current_lang = current_lang.split("(")[0].strip()
                except LookupError:
                    pass
            elif language_code and len(language_code) >= 4:
                seen_archaic_lang = True

            word = el.text.strip()

            if current_lang and seen_non_english \
                    and current_lang.lower() == "english":
                continue

            if (2 <= len(current_lang) <= 50) and word:
                if current_lang.lower() != "english":
                    seen_non_english = True

                results.append({
                    "language": current_lang,
                    "word": word
                })

    return results


@app.get("/")
@app.get("/health")
async def health():
    return {
        "ok": True,
        "time": int(time.time() * 1000)
    }


@app.get("/word/{word}")
async def get_word(word: str):
    word = word.strip().lower()
    if not word:
        return {
            "ok": False,
            "word": "",
            "error": "Word cannot be empty."
        }

    html = scrape_wiktionary(word)
    if not html:
        return {
            "ok": False,
            "word": word,
            "error": f"No etymology found for {word}."
        }

    etymology = parse_etymology_from_html(html)
    if not etymology:
        return {
            "ok": False,
            "word": word,
            "error": f"No etymology found for {word}."
        }

    if etymology[0]["word"].lower() != word \
            or etymology[0]["language"].lower() != "english":
        etymology.insert(0, {
            "language": "English",
            "word": word
        })

    return {
        "ok": True,
        "word": word,
        "etymology": list(reversed(etymology))
    }
