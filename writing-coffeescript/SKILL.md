---
name: writing-coffeescript
description: Guidelines for writing clean, idiomatic CoffeeScript following the Dashkite coding style. Use when writing, refactoring, or reviewing CoffeeScript logic.
---

# Writing CoffeeScript (Dashkite Style)

This skill provides the foundational coding standards for CoffeeScript development within the Byline/Central Park project. Adherence to these patterns ensures code is easy to scan, refactor, and maintain.

## Variable Naming

- **Avoid Arbitrary Abbreviations**: Use `error` instead of `err`, `element` instead of `el`. Spell words out by default.
- **Avoid Compound Names**: Prefer `visible` over `nextVisible`. Focus on nouns for values and verbs for functions. Use namespaces (e.g., `Elements.visible`) if ambiguous.
- **Single/Double Letter Variables**: Acceptable for nuanced algorithms where semantic names might be misleading or superfluous.

## Whitespace & Punctuation

- **Liberal Spaces**: Use spaces inside parentheses and around expressions: `( a, b, c )`, `( a + b )`.
- **Group Punctuation**: No spaces between nested or adjacent punctuation (including empty inline literals next to parentheses or brackets): `({ a, b, c })`, `[ @a, @b ]`, `( data = {})`. Collapse spaces for consecutive closing punctuation: `}}`, `}]`, `]]`.
- **Lisp-style Grouping**: Prefer grouping function calls with liberal spaces over standard C-style syntax: `( f a, b )` instead of `f( a, b )`.

## Strings

- **Multiline Strings**: Break long strings with newlines for readability. CoffeeScript's standard string delimiters (`"` or `'`) collapse newlines into spaces.
- **Heredocs**: Use triple delimiters (`"""` or `'''`) when you want to preserve newlines.

## Logic & Flow

- **Avoid Early Returns**: Use conditional branching instead. Indentation makes branches easier to scan and logic easier to simplify.
  - *Prefer*: `if condition then "a" else "b"`
  - *Avoid*: `return "a" if condition`
- **Implicit Returns**: Rely on CoffeeScript's implicit returns; avoid the `return` keyword where possible.
- **Logical Operators**: Use `||` and `&&` instead of `or` and `and`.
- **Await in Implicit Returns**: Avoid using `await` in implicit returns unless necessary to force the generation of an async function or generator.
- **Line Length**: Keep lines under 80 characters for readability.
- **Split Assignments**: Break complex expressions across lines after the `=` for clarity.
- **Block Syntax with `do ->`**: Use `do ->` as a whitespace-sensitive block syntax to pass complex expressions as arguments.
  ```coffeescript
  page.waitForNetworkIdle do ->
    Object.assign { idleTime: 500, timeout: 10000 }, options
  ```
- **Chaining & Indentation**: Use newlines and indentation for method chaining to reduce parentheses and highlight flow.
  ```coffeescript
  elements =
    $ "body"
      .children()
      .filter ( i, el ) ->
        !$ el
          .hasClass "footnotes"
  ```

## Refactoring & Complexity

- **Explicit Combinators**: Move logic inside combinators (like `filter`, `map`) into named functions to reveal intent.
- **Small Functions**: Aim for functions under 5-10 lines. If a function is longer, it's a candidate for being broken into a pipeline or smaller, focused helpers.
- **Reveal Logic**: The goal of refactoring is to reveal the underlying logic, not just to reduce line count.
