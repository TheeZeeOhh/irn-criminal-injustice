#!/usr/bin/env bash
# IRN deploy script — build main, push to gh-pages cleanly
set -e

echo "→ Building..."
npm run build

echo "→ Verifying CSS refs match actual files..."
for f in out/*.html out/**/*.html; do
  [[ -f "$f" ]] || continue
  while IFS= read -r chunk; do
    path="out/${chunk#/irn-criminal-injustice/}"
    if [[ ! -f "$path" ]]; then
      echo "✗ MISSING: $chunk (referenced in $f)"
      exit 1
    fi
  done < <(grep -o '[^"]*/_next/static/chunks/[^"]*\.css' "$f" 2>/dev/null || true)
done
echo "✓ All CSS chunks verified"

echo "→ Switching to gh-pages..."
git stash --include-untracked 2>/dev/null || true
git checkout gh-pages

echo "→ Syncing build output..."
git rm -rf . --quiet
cp -r out/. .
rm -rf out
touch .nojekyll
printf "node_modules\n.next\nout\n" > .gitignore

echo "→ Committing..."
git add -A
git commit -m "Deploy $(date -u '+%Y-%m-%d %H:%M UTC')"

echo "→ Pushing..."
GIT_TERMINAL_PROMPT=0 git push origin gh-pages

echo "→ Returning to main..."
git checkout main
git stash pop 2>/dev/null || true

echo "✓ Done"
