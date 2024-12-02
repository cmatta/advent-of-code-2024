#!/usr/bin/env bash

set -e  # Exit on error

SOLUTIONS_DIR="src/solutions"
TEMPLATE_FILE="${SOLUTIONS_DIR}/day-template.ts"
TEST_TEMPLATE_FILE="${SOLUTIONS_DIR}/test-template.ts"

# Find the highest day number from existing files, defaulting to 0 if none found
HIGHEST_DAY=$(find "${SOLUTIONS_DIR}" -name "day*.ts" -type f | 
              grep -v "template\|test" | 
              sed -E 's/.*day([0-9]+)\.ts$/\1/' |
              sort -n | 
              tail -1 ||
              echo "0")

echo "Debug: HIGHEST_DAY = ${HIGHEST_DAY}"

# If no existing days found, start with day 1
if [ "${HIGHEST_DAY}" = "0" ]; then
    NEXT_DAY="1"
else
    NEXT_DAY=$((HIGHEST_DAY + 1))
fi

echo "Debug: NEXT_DAY = ${NEXT_DAY}"

NEW_SOLUTION_FILE="${SOLUTIONS_DIR}/day${NEXT_DAY}.ts"
NEW_TEST_FILE="${SOLUTIONS_DIR}/day${NEXT_DAY}.test.ts"

# Check if templates exist
if [ ! -f "$TEMPLATE_FILE" ] || [ ! -f "$TEST_TEMPLATE_FILE" ]; then
    echo "Error: Template files not found"
    exit 1
fi

# Check if files already exist
if [ -f "$NEW_SOLUTION_FILE" ] || [ -f "$NEW_TEST_FILE" ]; then
    echo "Error: Files for day ${NEXT_DAY} already exist"
    exit 1
fi

# Copy and replace template placeholders
sed "s/__DAY__/${NEXT_DAY}/g" "$TEMPLATE_FILE" > "$NEW_SOLUTION_FILE"
sed "s/__DAY__/${NEXT_DAY}/g" "$TEST_TEMPLATE_FILE" > "$NEW_TEST_FILE"

touch src/inputs/day${NEXT_DAY}.txt

echo "Created new files for day ${NEXT_DAY}:"
echo "- ${NEW_SOLUTION_FILE}"
echo "- ${NEW_TEST_FILE}"
echo "- src/inputs/day${NEXT_DAY}.txt"