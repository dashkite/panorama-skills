---
tags:
  - languages
---

# Writing CoffeeScript (Dashkite Style Guide)

This guide provides an in-depth explanation of the Dashkite CoffeeScript coding style, detailing the rationale and examples for each convention.

## Variable Naming

Dashkite style prioritizes scan-efficiency and readability over brevity. Names should be fully spelled out and simple.

### Avoid Arbitrary Abbreviations
Words should be fully written. Abbreviations increase cognitive load because the reader has to translate them back to understand the code.

```coffeescript
# BAD: Abbreviations are cryptic
checkUser = ( usr ) ->
  el = getEl()
  details = usr.details

# GOOD: Fully spelled out names are self-documenting
checkUser = ( user ) ->
  element = getElement()
  details = user.details
```

### Avoid Compound Names
Do not concatenate adjectives or states (e.g., `nextVisibleElement`, `updatedUserRecord`). Instead, keep the name focused on the core noun (e.g., `element`, `user`) and use namespace context, helper functions, or local scoping to disambiguate.

```coffeescript
# BAD: Visual clutter from concatenated descriptors
checkUser = ( user ) ->
  nxtEl = getNext element
  usrInfo = user.details

# GOOD: Clean scoping reveals details naturally
checkUser = ( user ) ->
  next = getNext element
  details = user.details
```

### Single/Double Letter Variables
Allowed only for short, nuanced algorithmic blocks (like math formulas, low-level coordinate iterations, or generic helper functions) where naming every variable would clutter the logic.

```coffeescript
# GOOD: Single letter variables fit low-level matrix math or loops
for i in [ 0..width ]
  for j in [ 0..height ]
    draw i, j
```

## Whitespace & Punctuation

CoffeeScript is whitespace-sensitive. Dashkite style leverages whitespace to separate tokens and make complex nested structures visually distinct.

### Liberal Spaces
Place spaces inside parentheses, brackets, and around operator expressions. This reduces token density and makes lines easier to parse.

```coffeescript
# BAD: Jammed expressions
calculate(x,y)+[1,2]

# GOOD: Clear visual spacing
( calculate x, y ) + [ 1, 2 ]
```

### Group Punctuation
Do not place spaces between adjacent punctuation symbols. Collapse spaces when closing consecutive brackets or braces (e.g., `}}`, `}]`, `]]`). Use empty inline literals without spacing next to enclosing symbols.

```coffeescript
# BAD: Extra spaces within grouped punctuation
options = { timeout: 1000, force: true }
initialize = ( options = {  } ) ->

# GOOD: Grouped punctuation without intermediate spaces
options = ({ timeout: 1000, force: true })
initialize = ( options = {} ) ->
```

### Lisp-Style Grouping
For function calls, prefer wrapping the entire call in parentheses with liberal inner spaces instead of the C-style `func(args)`.

```coffeescript
# BAD: C-style function execution
myFunction(arg1, arg2)

# GOOD: Lisp-style space-wrapped evaluation
( myFunction arg1, arg2 )
```

## Logic & Flow

We rely on CoffeeScript's structured block indentation to represent control flow, avoiding early escapes that break visual alignment.

### Avoid Early Returns
Do not return early using postfix conditionals (e.g., `return null if error`). Instead, use structural `if/else` branching. Indented branches clearly map all logical pathways of the function.

```coffeescript
# BAD: Postfix conditionals disrupt flow
fetchRecord = ( id ) ->
  return null if !id
  record = database.find id
  return null if !record.active
  record

# GOOD: Structural indentation visualizes all branches
fetchRecord = ( id ) ->
  if id
    record = database.find id
    if record.active
      record
    else
      null
  else
    null
```

### Implicit Returns
Rely on CoffeeScript's implicit return of the last evaluated expression. Only use the `return` keyword when absolutely necessary (e.g., exiting a loop early).

```coffeescript
# BAD: Explicit return statement
computeValue = ( x ) ->
  return x * 2

# GOOD: Implicit return
computeValue = ( x ) ->
  x * 2
```

### Logical Operators
Use `||` and `&&` instead of CoffeeScript's English equivalents `or` and `and`.

```coffeescript
# BAD
if active and visible

# GOOD
if active && visible
```

### Await in Implicit Returns
Avoid using `await` in implicit returns. If the function is declared `async`, it automatically wraps the returned value in a promise. Adding `await` at the end forces the event loop to yield unnecessarily.

```coffeescript
# BAD: Redundant await yields control back to event loop
fetchData = ->
  await api.get "/data"

# GOOD: Let the async wrapper handle promise resolution
fetchData = ->
  api.get "/data"
```

### Split Assignments
If an assignment statement is long, place the value on a new indented line after the `=`.

```coffeescript
# GOOD: Long expression split after the equal sign
result =
  database
    .query "users"
    .filter ( user ) -> user.active
```

### Block Syntax with `do ->`
Use `do ->` to create clean IIFEs or block-level parameters for higher-order functions.

```coffeescript
# GOOD: IIFE block syntax used as argument
page.waitForNetworkIdle do ->
  Object.assign { idleTime: 500, timeout: 10000 }, options
```

## Classes & Instantiation

### Static Constructors (`make` and `from`)
Our convention for instantiating classes is to define static methods that wrap `new`, so that the constructor can be invoked with no arguments. This gives us more flexibility in how the class is instantiated.

In this pattern, the class always provides at least a `make` static method, which effectively takes the place of the default constructor.

When converting from an existing value, including when serializing from JSON, we use `from`. If there is no serialization requirement or need to convert from another value, it is not necessary to include a `from` style constructor.

In practice, these constructors should also provide lightweight verification of the arguments.

Note the use of `@` (CoffeeScript's shorthand for `this`) which, in a static method, references the class itself. This allows any static constructor functions to be inherited by subclasses.

```coffeescript
# GOOD: Static constructor pattern
class Dog
  @make: ( breed ) -> Object.assign ( new @ ), { breed }
  @from: ( data ) -> Object.assign ( new @ ), data
```

## Refactoring & Complexity

We organize complex operations into pipelines of small, focused functions.

### Explicit Combinators
Extract anonymous functions passed to combinators (like `map`, `filter`, `reduce`) into small, descriptive, named local functions.

```coffeescript
# BAD: Inline filter/map functions hide intent
activeNames =
  users
    .filter ( u ) -> u.age >= 18 && u.status is "active"
    .map ( u ) -> u.profile.firstName

# GOOD: Extracted helpers explicitly document logic
activeAdult = ( user ) ->
  user.age >= 18 && user.status is "active"

firstName = ( user ) ->
  user.profile.firstName

activeNames =
  users
    .filter activeAdult
    .map firstName
```

### Keep Functions Small
Functions should ideally be 5-10 lines. If a function exceeds this, decompose it into helper functions or pipeline steps.

### Reveal Logic
Refactoring should seek to make the underlying logic self-explanatory, not just to compress the line count.
