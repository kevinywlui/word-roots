# The Fossil Record of English

A short guide to Greek and Latin roots. Chapters live in `src/` as Markdown; `book.md` is the concatenation and `book.epub` is the built ebook.

Rebuild after editing anything in `src/`:

```sh
for f in src/*.md; do cat "$f"; echo; done > book.md
ebook-convert book.md book.epub --title "The Fossil Record of English" --language en \
  --formatting-type markdown --markdown-extensions tables \
  --level1-toc '//h:h1' --level2-toc '//h:h2' --chapter '//h:h1' \
  --chapter-mark pagebreak --page-breaks-before '//h:h1' --epub-version 3
```

Add `--authors "Your Name"` and `--cover cover.png` to the command if you want them.
