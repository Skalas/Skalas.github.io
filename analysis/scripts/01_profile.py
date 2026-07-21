#!/usr/bin/env python3
"""Profile the translated recipe dataset without reading recipe source files."""

from __future__ import annotations

import json
from pathlib import Path

DATA_FILE = Path("analysis/data/recipes.json")
OUTPUT_FILE = Path("analysis/outputs/profile.md")
MACRO_FIELDS = ("calories", "protein", "carbs", "fat")


def load_recipes() -> list[dict]:
    return json.loads(DATA_FILE.read_text(encoding="utf-8"))["recipes"]


def has_complete_metadata(recipe: dict) -> bool:
    metadata = recipe["metadata"]
    return all(metadata.get(field) is not None for field in MACRO_FIELDS)


def render_profile(recipes: list[dict]) -> str:
    complete = sum(has_complete_metadata(recipe) for recipe in recipes)
    serving_count = sum(recipe["metadata"].get("servings") is not None for recipe in recipes)
    return "\n".join(
        [
            "# Recipe Nutrition Data Profile",
            "",
            f"- Recipes: {len(recipes)}",
            f"- Recipes with all four existing metadata macros: {complete}",
            f"- Recipes with existing metadata servings: {serving_count}",
            "- Input: `analysis/data/recipes.json` (translated recipe records only)",
            "",
            "## Existing Metadata Coverage",
            "",
            "| Field | Present | Missing |",
            "|---|---:|---:|",
            *[
                f"| {field} | {sum(recipe['metadata'].get(field) is not None for recipe in recipes)} | "
                f"{sum(recipe['metadata'].get(field) is None for recipe in recipes)} |"
                for field in ("servings", *MACRO_FIELDS)
            ],
            "",
            "This is a content audit, not dietary or medical guidance.",
            "",
        ]
    )


def main() -> None:
    recipes = load_recipes()
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_FILE.write_text(render_profile(recipes), encoding="utf-8")
    print(f"Profiled {len(recipes)} recipes to {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
