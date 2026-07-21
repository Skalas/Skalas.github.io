# Nutrition Macro Enrichment Plan

## Data Summary

- Source dataset: `analysis/data/recipes.json`
- Scope: 29 translated recipe notes
- Requested outcome: an auditable, conservative proposal for website recipe macro metadata.

## Audit Rules

1. Record every nutrition value and serving statement already present in recipe metadata or body text as **source-provided**.
2. Propose metadata only when one recipe version has all four macros (calories, protein, carbohydrates, and fat) and an unambiguous serving basis.
3. Treat creator labels such as `~` and `estimated` as source-provided approximate values, never as calculated values.
4. Do not calculate missing values where a recipe has an unspecified brand, optional ingredient, variable yield, or incomplete quantity/serving information.
5. If a calculated estimate were warranted, it would cite USDA FoodData Central food records and list all substitutions and yield assumptions. This run contains no such estimates: every recipe without safe source values has a material ambiguity.

## Questions Answered

1. What calories, protein, carbohydrates, fat, and serving information does each source provide?
2. Which complete source-provided macro sets can safely become recipe metadata?
3. Which recipes need clarification rather than an estimate, and why?

## Outputs

- `outputs/profile.md` — dataset and existing-metadata profile.
- `outputs/nutrition_audit.json` — one machine-readable audit record per recipe.
- `outputs/nutrition_audit.md` — concise review report and safe-to-apply list.
- `outputs/validation.md` — integrity checks for the audit output.

## Reproducible Scripts

1. `scripts/01_profile.py`
2. `scripts/02_nutrition_audit.py`
3. `scripts/03_validate_audit.py`
