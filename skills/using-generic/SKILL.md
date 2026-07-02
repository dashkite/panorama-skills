# Using Generic

> [!Note]
> For in-depth technical documentation and detailed context, refer to the [Using Generic Knowledge Base Article](../../kb/using-generic/index.md).


The `@dashkite/generic` library allows for the creation of dynamic, runtime generic functions (dispatchers) that choose an implementation based on the types or properties of their arguments.

## Core Concepts

- **Dispatcher**: Created using `Generic.make`. It manages the various definitions and handles the dispatch logic.
- **Predicates**: Used to match arguments to definitions. They can be explicit types or functions returning a boolean.
- **Definitions**: Specific implementations added to a dispatcher using `define`.

## Creating a Dispatcher

The simplest way to create a dispatcher is to call `Generic.make` with the name of the function (for debugging messages):

```coffeescript
import Generic from "@dashkite/generic"

select = Generic.make "select"
```

You can also provide default handler to catch unsupported argument combinations, which useful for tailoring the error messages to the function:

```coffeescript
import Generic from "@dashkite/generic"

select = Generic.make
  name: "select"
  default: ( target ) ->
    type = target?.constructor?.name ? typeof target
    throw new Error "select: unsupported target [ #{ type } ]"
```

## Adding Definitions

Definitions map a set of predicates to an implementation function. Types can be used as implicit predicates.

```coffeescript
# Using explicit types
select.define [ Page, String ], ( page, selector ) -> 
  page.$$ selector

# Using custom predicates
isElement = ( x ) -> x?.constructor?.name == 'ElementHandle'
select.define [ isElement, String ], ( element, selector ) -> 
  element.$$ selector
```

## Chaining Form

When the definitions appear near the call to `make`, you can chain them:

```coffeescript
isElement = ( x ) -> x?.constructor?.name == 'ElementHandle'

select = 

  Generic.make
    name: "select"
    default: ( target ) ->
      type = target?.constructor?.name ? typeof target
      throw new Error "select: unsupported target [ #{ type } ]"

    .define [ Page, String ], ( page, selector ) -> 
      page.$$ selector
    
    .define [ isElement, String ], ( element, selector ) -> 
      element.$$ selector
```

## Predicate Rules

- **Implicit Type Predicates**: Passing a class/constructor (e.g., `Page`) works as an implicit `instanceof` check.
- **Literals**: For primitive types like `String`, `Number`, and `Boolean`, the implicit type predicate matches both literals and their object wrappers.
- **Subtypes**: Generic's implicit type predicates automatically support subtypes.
- **No Arrays of Types**: `Generic` does **not** support arrays of types as a single predicate (e.g., `[ TypeA, TypeB ]`). It will treat the array as a literal match. Instead, use a predicate function.
- **Using Joy**: For concise type checking in predicates, use `isType` or `isKind` from `@dashkite/joy/type`.

## Dispatch Order and Precedence

Definitions are evaluated in **reverse order** (Last-In, First-Out). The dispatcher checks the most recently added definition first.

To handle overlapping predicates (e.g., `String` and `Object`), add the more specific definition **after** the more general one.

```coffeescript
# 1. General handler
select.define [ Object ], ( target ) -> ...

# 2. Specific handler (added last, so it takes precedence for strings)
select.define [ String ], ( selector ) -> ...
```

```coffeescript
import { isType } from "@dashkite/joy/type"

# Correct way to handle multiple possible types
isTarget = ( x ) -> isType( Page, x ) or isType( JSHandle, x )
waitFor.define [ isTarget, String ], ( target, selector ) -> ...
```

## Best Practices

- **Runtime Safety**: Use `Generic` to enforce type constraints at runtime, providing clear error messages when expectations aren't met.
- **Internal Dispatchers**: Prefix dispatchers with `_` if they are internal implementation details of a public API.
- **Naming**: Ensure the dispatcher name in `Generic.make` reflects its fully qualified path for better stack traces, ex: `Mimic.select` instead of `select`.
- **Conditional Arguments:** Use Generics in place of conditional logic for arguments
- **Explicit Arity:** Generics are variadic by default. Use `binary`, `ternary`, or `arity` from `@dashkite/joy/function` to give them a specific arity (useful when you want to make a function curryable). **Important:** Use only if all definitions have the same number of arguments.
