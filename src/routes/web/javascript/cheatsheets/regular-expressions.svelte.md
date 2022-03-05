---
title: Regular expressions
---

<script context="module">
  export function load() {
    return {
      stuff: {
        title: 'Regular expressions'
      }
    };
  }
</script>

## Assertions

| Characters | Meaning                                                                             |
| ---------- | ----------------------------------------------------------------------------------- |
| `^`        | Matches the beginning of input.                                                     |
| `$`        | Matches the end of input.                                                           |
| `\b`       | Matches a word boundary.                                                            |
| `\B`       | Matches a non-word boundary.                                                        |
| `x(?=y)`   | **Lookahead assertion**: Matches `x` only if `x` is followed by `y`.                |
| `x(?!y)`   | **Negative lookahead assertion**: Matches `x` only if `x` is _not_ followed by `y`. |
| `(?<=y)x`  | **Lookbehind assertion**: Matches `x` only if `x` is preceded by `y`.               |
| `(?<~y)x`  | **Negative lookbehind assertion**: Matches `x` only if `x` is not preceded by `y`.  |

## Character classes

| Characters | Meaning                                                                             |
| ---------- | ----------------------------------------------------------------------------------- |
| `.`        | Matches the beginning of input.                                                     |
| `\d`       | Matches the end of input.                                                           |
| `\D`       | Matches a word boundary.                                                            |
| `\w`       | Matches a non-word boundary.                                                        |
| `\W`       | **Lookahead assertion**: Matches `x` only if `x` is followed by `y`.                |
| `\s`       | **Negative lookahead assertion**: Matches `x` only if `x` is _not_ followed by `y`. |
| `\S`       | **Lookbehind assertion**: Matches `x` only if `x` is preceded by `y`.               |
| `\t`       | **Negative lookbehind assertion**: Matches `x` only if `x` is not preceded by `y`.  |
| `\r`       | **Negative lookbehind assertion**: Matches `x` only if `x` is not preceded by `y`.  |
| `\n`       | **Negative lookbehind assertion**: Matches `x` only if `x` is not preceded by `y`.  |
| `\v`       | **Negative lookbehind assertion**: Matches `x` only if `x` is not preceded by `y`.  |
| `\f`       | **Negative lookbehind assertion**: Matches `x` only if `x` is not preceded by `y`.  |
| `[\b]`     | **Negative lookbehind assertion**: Matches `x` only if `x` is not preceded by `y`.  |
| `\0`       | **Negative lookbehind assertion**: Matches `x` only if `x` is not preceded by `y`.  |
| `\cX`      | **Negative lookbehind assertion**: Matches `x` only if `x` is not preceded by `y`.  |
| `\xhh`     | **Negative lookbehind assertion**: Matches `x` only if `x` is not preceded by `y`.  |
| `\uhhhh`   | **Negative lookbehind assertion**: Matches `x` only if `x` is not preceded by `y`.  |
| `\u{hhhh}` | **Negative lookbehind assertion**: Matches `x` only if `x` is not preceded by `y`.  |
