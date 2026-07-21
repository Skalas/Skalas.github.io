#!/usr/bin/env python3
"""Validate consistency of the nutrition audit output."""

from __future__ import annotations

import json
from pathlib import Path

AUDIT_FILE = Path("analysis/outputs/nutrition_audit.json")
OUTPUT_FILE = Path("analysis/outputs/validation.md")
MACRO_FIELDS = ("calories", "protein", "carbs", "fat")


def validate(records: list[dict]) -> list[str]:
    failures: list[str] = []
    identifiers = [record["id"] for record in records]
    if len(identifiers) != len(set(identifiers)):
        failures.append("Recipe identifiers are not unique.")
    for record in records:
        proposal = record["proposed_metadata"]
        if record["safe_to_apply"] and proposal is None:
            failures.append(f"{record['id']}: safe record lacks a metadata proposal.")
        if proposal is not None and any(proposal[field] is None for field in ("servings", *MACRO_FIELDS)):
            failures.append(f"{record['id']}: proposal is missing a required value.")
        if record["basis"].startswith("source_provided") and record["calculated_estimate"]["status"] != "not_calculated":
            failures.append(f"{record['id']}: source-provided record incorrectly includes a calculation.")
    return failures


def main() -> None:
    records = json.loads(AUDIT_FILE.read_text(encoding="utf-8"))
    failures = validate(records)
    result = ["# Nutrition Audit Validation", "", f"- Records checked: {len(records)}"]
    if failures:
        result.extend(["- Status: failed", "", "## Failures", "", *[f"- {failure}" for failure in failures]])
        raise SystemExit("\n".join(failures))
    result.extend(["- Status: passed", "- All safe proposals have complete macro and serving values.", ""])
    OUTPUT_FILE.write_text("\n".join(result), encoding="utf-8")
    print(f"Validated {len(records)} audit records")


if __name__ == "__main__":
    main()
