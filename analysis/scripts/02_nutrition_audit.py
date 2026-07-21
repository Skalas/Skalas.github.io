#!/usr/bin/env python3
"""Create a conservative, source-traceable nutrition metadata audit."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

DATA_FILE = Path("analysis/data/recipes.json")
JSON_OUTPUT = Path("analysis/outputs/nutrition_audit.json")
MARKDOWN_OUTPUT = Path("analysis/outputs/nutrition_audit.md")
MACRO_FIELDS = ("calories", "protein", "carbs", "fat")

# Values transcribed from the translated body text. `variant` captures exactly
# which source version was assessed; it prevents silently mixing alternatives.
SOURCE_CANDIDATES: dict[str, dict[str, Any]] = {
    "recipe-2-minute-protein-brownie": {"macros": [312, 49, 16, 8], "servings": 1, "basis": "per portion", "variant": "recipe as written", "approximate": False},
    "recipe-3-minute-nutella": {"macros": [480, 37, 60, 16], "servings": 1, "basis": "whole bowl", "variant": "Kara protein modification", "approximate": True},
    "recipe-4-ingredient-protein-bagels": {"macros": [254, 18, 44, 1], "servings": 4, "basis": "per bagel", "variant": "recipe as written", "approximate": False},
    "recipe-bang-bang-chicken-tenders": {"macros": [477, 50, None, None], "servings": 2, "basis": "per serving (3 fillets)", "variant": "recipe as written", "approximate": False},
    "recipe-chicken-crust-pizza": {"macros": [510, 48, 6, 32], "servings": 3, "basis": "per portion", "variant": "recipe as written", "approximate": False},
    "recipe-chicken-pesto-bake": {"macros": [484, 51.4, 47.2, 8.89], "servings": 6, "basis": "per serving", "variant": "recipe as written", "approximate": False},
    "recipe-chocolate-protein-mousse": {"macros": [400, 29, 41, 10], "servings": 3, "basis": "per portion", "variant": "recipe as written", "approximate": True},
    "recipe-gooey-protein-banana-chocolate-cake-air-fryer": {"macros": [189, 13.5, 31, 3], "servings": 2, "basis": "per serve", "variant": "without optional chocolate", "approximate": False},
    "recipe-healthy-chicken-gyro": {"macros": [309, 34, 26, 7.5], "servings": 2, "basis": "per gyro", "variant": "recipe as written", "approximate": True},
    "recipe-healthy-low-ingredient-protein-cookies": {"macros": [123, 10, 14, 4], "servings": 12, "basis": "per cookie", "variant": "recipe as written", "approximate": False},
    "recipe-high-protein-berry-cheesecake": {"macros": [345, 40, 28, 8], "servings": 1, "basis": "per portion", "variant": "Kara modified version", "approximate": False},
    "recipe-high-protein-breakfast-burritos-beef-bacon-egg": {"macros": [530, 56, 28, 24], "servings": 5, "basis": "per burrito", "variant": "recipe as written", "approximate": False},
    "recipe-high-protein-cheesy-chicken-pesto-bake": {"macros": [498, 50, 45, 12], "servings": 4, "basis": "per portion", "variant": "recipe as written", "approximate": False},
    "recipe-high-protein-onion-chips": {"macros": [293, 33, 23, 5], "servings": None, "basis": "whole batch", "variant": "parmesan and spray oil treatment unclear", "approximate": False},
    "recipe-high-protein-tomato-soup": {"macros": [558, 43, 47, 20], "servings": None, "basis": "whole batch; source says 1-2 servings", "variant": "recipe as written", "approximate": True},
    "recipe-mcchicken-smash-tacos": {"macros": [198, 16, 16, 7], "servings": 8, "basis": "per taco", "variant": "recipe as written", "approximate": False},
    "recipe-my-protein-pancakes": {"macros": [399, 45.5, 28.7, 10], "servings": None, "basis": "recipe amount; yield not stated", "variant": "without toppings", "approximate": False},
    "recipe-pepperoni-pizza-hot-pockets": {"macros": [350, 40, 38, 4], "servings": 10, "basis": "per hot pocket", "variant": "recipe as written", "approximate": False},
    "recipe-protein-chocolate-lava-cake": {"macros": [260, 34, 17, 8], "servings": None, "basis": "serving basis not stated", "variant": "recipe as written", "approximate": False},
    "recipe-protein-coffee-cake": {"macros": [216, 46, 3, 1], "servings": None, "basis": "per batch; yield not stated", "variant": "recipe as written", "approximate": False},
    "recipe-protein-passionfruit-cheesecake-bowl": {"macros": [209, 17, 23, 3], "servings": 1, "basis": "per portion", "variant": "recipe as written", "approximate": False},
    "recipe-rice-noodle-stir-fry": {"macros": [460, 43, 60, 3], "servings": 1, "basis": "per serve", "variant": "recipe as written", "approximate": False},
    "recipe-super-fck-protein-brownies": {"macros": [99, 11, 8, 2], "servings": 9, "basis": "per brownie", "variant": "recipe as written", "approximate": False},
    "recipe-the-french-toast-cloud": {"macros": [280, 25, 27, 7], "servings": None, "basis": "per serving; yield not stated", "variant": "optional toppings excluded", "approximate": False},
    "recipe-torta-de-zanahoria-prueba-1": {"macros": [493, 8.2, 50.6, 28.8], "servings": None, "basis": "per portion; source gives mutually exclusive 8- and 10-portion options", "variant": "8-portion option", "approximate": False},
}

INSUFFICIENT_REASONS = {
    "recipe-cottage-cheese-chocolate-bake-toddler-approved": "No stated yield or serving count.",
    "recipe-hotcakes-de-proteina-queso-cottage": "Yield is a 3-or-6 piece range; cooking oil and toppings are unspecified.",
    "recipe-tres-huevazos-leche-en-polvo-pancito-saludable": "Serving yield is stated as one large item or several small items; sesame quantity is unspecified.",
    "recipe-tzatziki-e-naan": "Naan yield does not define servings for the combined naan and tzatziki dish; cucumber sizes and dill quantity are unspecified.",
}

HOLD_REASONS = {
    "recipe-3-minute-nutella": "The body presents original and Kara-modified versions; choose a canonical recipe variant before setting metadata.",
    "recipe-bang-bang-chicken-tenders": "The source omits carbohydrate and fat values.",
    "recipe-gooey-protein-banana-chocolate-cake-air-fryer": "The source gives different macro panels with and without the optional chocolate; metadata cannot represent both without a declared default.",
    "recipe-high-protein-berry-cheesecake": "The source presents original and Kara-modified versions; choose a canonical recipe variant before setting metadata.",
    "recipe-high-protein-onion-chips": "Macros are for the whole batch, not a stated serving; parmesan and spray oil treatment are also variable.",
    "recipe-high-protein-tomato-soup": "Macros are for the whole batch and the source permits either one or two servings.",
    "recipe-my-protein-pancakes": "Macros are for the recipe amount, but no yield or serving count is stated.",
    "recipe-protein-chocolate-lava-cake": "The source does not state whether macros are for one cake or the batch.",
    "recipe-protein-coffee-cake": "Macros are for the batch, but the yield is not stated.",
    "recipe-the-french-toast-cloud": "Macros are per serving, but the source does not state how many servings the recipe yields.",
    "recipe-torta-de-zanahoria-prueba-1": "The source provides mutually exclusive 8- and 10-portion macro options.",
}


def load_recipes() -> list[dict[str, Any]]:
    return json.loads(DATA_FILE.read_text(encoding="utf-8"))["recipes"]


def macro_dict(values: list[float | int | None]) -> dict[str, float | int | None]:
    return dict(zip(MACRO_FIELDS, values, strict=True))


def source_metadata(recipe: dict[str, Any]) -> dict[str, float | int | None]:
    metadata = recipe["metadata"]
    return {field: metadata.get(field) for field in ("servings", *MACRO_FIELDS)}


def is_complete(candidate: dict[str, Any]) -> bool:
    return candidate["servings"] is not None and all(value is not None for value in candidate["macros"])


def is_safe(candidate: dict[str, Any]) -> bool:
    return is_complete(candidate) and candidate["variant"] == "recipe as written"


def no_estimate(reason: str) -> dict[str, Any]:
    return {
        "status": "not_calculated",
        "reason": reason,
        "assumptions": [],
        "references": [],
    }


def build_record(recipe: dict[str, Any]) -> dict[str, Any]:
    recipe_id = recipe["id"]
    candidate = SOURCE_CANDIDATES.get(recipe_id)
    metadata = source_metadata(recipe)
    base = {
        "id": recipe_id,
        "title": recipe["metadata"]["title"],
        "file": recipe["file"],
        "source_path": recipe["source_path"],
        "source_provided_metadata": metadata,
    }
    if candidate is None:
        reason = INSUFFICIENT_REASONS[recipe_id]
        return {
            **base,
            "source_provided_body": {"status": "no complete macro statement", "candidate": None},
            "proposed_metadata": None,
            "basis": "insufficient_confidence",
            "provenance": "no source-provided complete macros; no calculated estimate",
            "confidence": "insufficient",
            "assumptions": [],
            "calculated_estimate": no_estimate(reason),
            "safe_to_apply": False,
            "review_note": reason,
        }
    complete = is_complete(candidate)
    safe = is_safe(candidate)
    source_macros = macro_dict(candidate["macros"])
    body = {
        "status": "complete" if complete else "partial_or_ambiguous",
        "macros": source_macros,
        "servings": candidate["servings"],
        "serving_basis": candidate["basis"],
        "variant": candidate["variant"],
        "stated_as_approximate": candidate["approximate"],
    }
    if safe:
        proposed = {"servings": candidate["servings"], **source_macros}
        note = "Complete source-provided values and a single serving basis; no calculation performed."
        confidence = "high" if not candidate["approximate"] else "medium"
        basis = "source_provided" if not candidate["approximate"] else "source_provided_approximate"
    else:
        proposed = None
        confidence = "insufficient"
        basis = "insufficient_confidence"
        note = HOLD_REASONS[recipe_id]
    return {
        **base,
        "source_provided_body": body,
        "proposed_metadata": proposed,
        "basis": basis,
        "provenance": "source-provided recipe body; not independently calculated",
        "confidence": confidence,
        "assumptions": [],
        "calculated_estimate": no_estimate(note),
        "safe_to_apply": safe,
        "review_note": note,
    }


def render_report(records: list[dict[str, Any]]) -> str:
    safe = [record for record in records if record["safe_to_apply"]]
    held = [record for record in records if not record["safe_to_apply"]]
    lines = [
        "# Recipe Nutrition Audit",
        "",
        f"- Recipes audited: {len(records)}",
        f"- Safe source-provided metadata proposals: {len(safe)}",
        f"- Held for clarification: {len(held)}",
        "- Calculated estimates: 0",
        "",
        "## Safe to Apply",
        "",
        "| Recipe | Servings | Calories | Protein (g) | Carbs (g) | Fat (g) | Basis |",
        "|---|---:|---:|---:|---:|---:|---|",
    ]
    for record in safe:
        values = record["proposed_metadata"]
        lines.append(
            f"| {record['title']} | {values['servings']} | {values['calories']} | {values['protein']} | "
            f"{values['carbs']} | {values['fat']} | {record['basis']} |"
        )
    lines.extend(["", "## Held for Clarification", ""])
    for record in held:
        lines.append(f"- **{record['title']}** — {record['review_note']}")
    lines.extend(
        [
            "",
            "## Method and Limits",
            "",
            "Values marked `source_provided` are transcribed from each translated recipe's body; they are not independently verified. "
            "Values marked `source_provided_approximate` retain the creator's approximate label. No calculated estimates were produced, "
            "because the remaining recipes have a material ambiguity (brand/formulation, optional ingredient, variant, or yield). "
            "If a future calculation is authorized after clarification, cite the exact [USDA FoodData Central](https://fdc.nal.usda.gov/) record(s) and list the ingredient and yield assumptions in the JSON record.",
            "",
            "This audit is informational content maintenance, not nutrition or medical advice.",
            "",
        ]
    )
    return "\n".join(lines)


def main() -> None:
    records = [build_record(recipe) for recipe in load_recipes()]
    JSON_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    JSON_OUTPUT.write_text(json.dumps(records, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    MARKDOWN_OUTPUT.write_text(render_report(records), encoding="utf-8")
    print(f"Audited {len(records)} recipes; {sum(item['safe_to_apply'] for item in records)} safe proposals")


if __name__ == "__main__":
    main()
