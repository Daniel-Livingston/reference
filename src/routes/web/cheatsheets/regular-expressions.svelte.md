---
title: Regular expressions
layout: article
---

<script context="module">
  export async function load() {
    return {
      stuff: {
        title: 'Regular expressions'
      }
    };
  }
</script>

# {title}

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

| Characters                                   | Meaning                                                                                                                                           |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.`                                          | Matches any single character except line terminators. Inside a character class, the dot matches a literal dot.                                    |
| `\d`                                         | Matches any digit. Equivalent to `[0-9]`.                                                                                                         |
| `\D`                                         | Matches any _non_-digit. Equivalent to `[^0-9]`.                                                                                                  |
| `\w`                                         | Matches any alphanumeric character, including the underscore. Equivalent to `[A-Za-z0-9_]`.                                                       |
| `\W`                                         | Matches any _non_-alphanumeric character, including the underscore. Equivalent to `[^A-Za-z0-9_]`.                                                |
| `\s`                                         | Matches a white space character. Equivalent to ` [ \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]`.                     |
| `\S`                                         | Matches a _non_-white space character. Equivalent to ` [^ \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]`.              |
| `\t`                                         | Matches a horizontal tab.                                                                                                                         |
| `\r`                                         | Matches a carriage feed.                                                                                                                          |
| `\n`                                         | Matches a linefeed.                                                                                                                               |
| `\v`                                         | Matches a vertical tab.                                                                                                                           |
| `\f`                                         | Matches a form-feed.                                                                                                                              |
| `[\b]`                                       | Matches a backspace.                                                                                                                              |
| `\0`                                         | Matches a NUL character. Must not be followed with another digit.                                                                                 |
| `\cX`                                        | Matches a control character using caret notation.                                                                                                 |
| `\xhh`                                       | Matches the character with the code `hh`.                                                                                                         |
| `\uhhhh`                                     | Matches a UTF-16 code-unit with the value `hhhh`.                                                                                                 |
| `\u{hhhh}`, `\u{hhhhh}`                      | Matches a character with the Unicode value `U+hhhh` or `U+hhhhh` only when the `u` flag is set.                                                   |
| `\p{UnicodeProperty}`, `\P{UnicodeProperty}` | Matches a character based on its Unicode character properties.                                                                                    |
| `\`                                          | Indicates that the following character should be escaped. Literal characters are treated specially, and special characters are treated literally. |

## Groups and ranges

| Characters           | Meaning                                                                                             |
| -------------------- | --------------------------------------------------------------------------------------------------- |
| `x&#124;y`           | Matches either `x` or `y`.                                                                          |
| `[xyz]`<br>`[a-c]`   | Matches any one of the enclosed characters. Hyphens specify a range of characters.                  |
| `[^xyz]`<br>`[^a-c]` | A negated or complemented character class. Matches anything not enclosed.                           |
| `(x)`                | **Capturing group**. Matches `x` and remembers the match.                                           |
| `\n`                 | A back reference to the last substring matching the `n` capturing group. `n` is a positive integer. |
| `\k<Name>`           | A back reference to the last substring matching the **named capturing group** specified by `Name`.  |
| `(?<Name>x)`         | **Named capturing group**. Matches `x` and stores it under the name specified by `Name`.            |
| `(?:x)`              | **Non-capturing group**. Matches `x` but does not remember the match.                               |

## Quantifiers

| Characters                                                  | Meaning                                                                                   |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `x*`                                                        | Matches the preceding item `x` 0 or more times.                                           |
| `x+`                                                        | Matches the preceding item `x` 1 or more times.                                           |
| `x?`                                                        | Matches the preceding item `x` 0 or 1 time(s).                                            |
| `x{n}`                                                      | Matches the preceding item `x` exactly `n` times.                                         |
| `x{n,}`                                                     | Matches the preceding item `x` at least `n` times.                                        |
| `x{n,m}`                                                    | Matches the preceding item `x` at least `n` and at most `m` times.                        |
| `x*?`<br>`x+?`<br>`x??`<br>`x{n}?`<br>`x{n,}?`<br>`x{n,m}?` | Makes the quantifier _non-greedy_, meaning that it will stop as soon as it finds a match. |

## References

- [Regular Expressions | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
