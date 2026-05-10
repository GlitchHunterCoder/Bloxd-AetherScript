# AetherScript

> Where JSDocs creates the doorway between JavaScript and TypeScript

## What is AetherScript?

Not a new language.
Not a compiler.
Not a framework.

It is the discovery that three languages already exist in every `.js` file,
and the formal rules that govern how they interact.

AetherScript is a merge of JavaScript and TypeScript — not one or the other.
Writing pure TypeScript loses the execution layer.
Writing pure JavaScript loses the computation layer.
AetherScript uses both deliberately.

AetherScript is most useful when you cannot use TypeScript directly
but still want TypeScript's understanding of your code.
It is the discovery that this was always possible,
and the formal rules that make it intentional rather than accidental.

> Code should hint in TypeScript but execute in JavaScript

```as
let a: string  // hints as string, cannot execute — intentional
```

## The Three Realms

### JavaScript — The Classical — World
> the finite, the practical, the spoken

The foundation. The root. Everything that runs, changes, and impacts 
the environment lives here. It is large, extensive, and contains 
everything needed under normal conditions. TypeScript is built upon it — 
Paradise cannot exist without World.

### TypeScript — The Quantum — Paradise
> the infinite, the theoretical, the unspoken

Silent but present. It shows through the lens of types what could be,
how code COULD run, what COULD appear. Perfect and proven, but rootless
without JavaScript beneath it.

### JSDoc — The Door — Veil
> the binding force, the passage between worlds

The place between worlds. Without it, JavaScript and TypeScript are two
separate universes. With it, they are connected and you can move freely
between them.

Not just a doorway — it is an active participant with its own vocabulary:

| Tag        | Purpose                               |
|------------|---------------------------------------|
| @type      | annotate a variable                   |
| @typedef   | define a custom type                  |
| @template  | generics                              |
| @param     | parameter types                       |
| @returns   | return type                           |
| @overload  | multiple signatures                   |
| @enum      | create named type using variable name |
| @template  | generic type parameters               |

## The Realms

### Comment Realm
Supports: JSDoc, TypeScript
Lives in `/** */` blocks.
Has zero runtime presence — completely invisible to the JS engine.

### Code Realm
Supports: JavaScript, TypeScript
Two sublayers:
- **TS sublayer** — hints only, stripped before execution
- **JS sublayer** — hints and execution, runs in the environment

The TS sublayer is not passive — it actively computes and transforms types
within code realm expressions. JS provides the structure, TS reads and
reasons about it:

```as
/** @type {[1,2,3]} */
var Arr

var Item = Arr[number]  // JS structure: index access → throws, number isnt defined
                        // TS computation: [1,2,3][number] → 1|2|3
```

The `number` here is a TS type used as an index — not a JS value.
TS resolves the access at type level, JS provides the expression syntax.
This is the core of AetherScript — neither layer alone could do this.
JS provides the form, TS provides the meaning.

### The Door — JSDoc and Types
The bridge layer. Exists in comment realm but reaches into code realm
through variable annotations, type declarations, and inference triggers.

### Collision Rules
When Comment Realm and Code Realm conflict:
```as
/** @type {string} */  // comment realm says: string
var a = 1  // code realm says: number
```
> Rule: Annotation beats Inference. Comment realm wins at collision.

## The Rules

### Rule 1 — Annotation beats Inference
When a variable has both a `@type` annotation and an initializer,
the annotation type from the initializer wins.

### Rule 2 — Comment realm has zero runtime presence
Everything in `/** */` is invisible to the JS engine.

### Rule 3 — TS syntax in code realm has zero runtime presence
`let a: string` hints correctly but cannot execute.

### Rule 4 — JSDoc bridges comment realm to code realm
`@type`, `@typedef` etc. are the only way to move types from
comment realm into code realm and vice versa.

### Rule 5 — @type is opaque, inference is transparent
When a type is assigned via `@type`, the alias name is displayed as-is.
When a type is inferred from a function return, the resolved type is displayed.

### Rule 6 — @typedef and variable names must not collide
If a @typedef and a variable share the same name, both realms hold 
a definition and neither overwrites the other, causing a confused state.

```as
/** @typedef {Arr} ArrNum */  // ❌ ArrNum in comment realm
let ArrNum                    // ❌ ArrNum in code realm
                              // result: undefined and number[] simultaneously
```

Use distinct names to keep realms unambiguous:
```as
/** @typedef {Arr} ArrNumType */  // ✅ distinct name in comment realm
let ArrNum                        // ✅ distinct name in code realm
```

```as
/** @type {Add<3,3>} */
var x  // displays as Add<3,3>

const y = add(3,3)  // displays as 6
```

The mechanism that makes inference work is `@param` + `@returns` binding
generics to the call site — not `@type` on the function itself.

### Rule 7 — 1000 instantiation hard cap
TypeScript will return `any` on type computations exceeding
1000 recursive type instantiations.

### Rule 8 — Paradise is scopeless
@typedef and @enum declarations are globally visible
regardless of where in the code they appear
Function scope, block scope — irrelevant to Paradise

## Bridges

### Type Land → JS Land
Via `@type` — pulls a type from comment realm into a variable:
```as
/** @type {Add<3,3>} */
var x  // x now carries the type in JS land
```

### JS Land → Type Land
Via inference — JS expression result becomes a type:
```as
var Arr = [1,2,3]
/** @type {Arr} */ //now contains JS as type
```

### Round Trip
Type land → JS land → computation → back to type land → back to JS land:

```as
/** @type {[1,2,3]} */
var Arr              // type land → JS land
var Item = Arr[number]  // JS computation, type inferred

/** @type {Item} */  //re-imports it back into type
var Dup              // type land → JS land

Dup                  // 1|2|3, visible in World
```

No function returns needed — the cycle is:
```
@type       →  comment realm declares
var         →  code realm receives
inference   →  code realm computes
@type       →  comment realm re-imports
var         →  code realm receives again
```

## Limits

### Instantiation Depth
Hard cap of 1000 type instantiations per computation.
```as
/** @type {DepthTest<999, []>} */  // ✅ resolves
/** @type {DepthTest<1000, []>} */ // ❌ bails to any
```

### Display Limits
Named type aliases never expand in hover when annotated directly.
Only inference triggers full expansion.

### Enforcement
AetherScript is advisory, not enforced.
Types hint and guide — they do not error or block execution.
`// @ts-check` enables stricter checking but still does not enforce at runtime.

## Examples

### Hello AetherScript
```as
/** @type {string} */
let greeting = "Hello, AetherScript"
greeting  // hints as string, runs as JS
```

### Number System
A full compile-time arithmetic system built purely in type land:
```as
/** @type {Add<3, 3>} */
var six  // 6

/** @type {Fact<5>} */
var onetwenty  // 120
```
[→ full example](examples/number-system/)

### Round Trip
[→ full example](examples/round-trip/)

### Tictactoe
[→ full example](examples/tictactoe/)

## Grammar

| Construct              | Realm         | Syntax                    |
|------------------------|---------------|---------------------------|
| Type annotation        | Comment       | `/** @type {T} */`        |
| Type definition        | Comment       | `/** @typedef {T} N */`   |
| Generic type           | Comment       | `/** @template T */`      |
| TS type declaration    | Code (TS)     | `let a: string`           |
| JS variable            | Code (JS)     | `var a = 1`               |
| Bridge annotation      | Comment→Code  | `/** @type {T} */ var a`  |
| Bridge inference       | Code→Comment  | `var a = expr`            |

## Philosophy

> JavaScript is the finite, the practical, the spoken.
> TypeScript is the infinite, the theoretical, the unspoken.
> JSDoc is the Door — the Veil between worlds.

Paradise cannot exist without World.
World cannot see Paradise without the Veil.
The Veil has no purpose without both worlds.

AetherScript is not the invention of something new.
It is the naming of something that was always there.

Paradise is not universal — it is defined by the environment.
The Door can only open to what Paradise contains.
