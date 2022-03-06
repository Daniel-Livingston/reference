---
title: preg_match()
layout: article
---

<script context="module">
  export function load() {
    return {
      stuff: {
        title: 'preg_match - PHP',
        layout: 'article'
      }
    };
  }
</script>

# {title}

## Description

Searches a string `subject` for a match to the regular expression given in `pattern`.

```php
preg_match(
  string $pattern,
  string $subject,
  array &$matches = null,
  int $flags = 0,
  int $offset = 0): int|false
```

## Parameters

| Parameter | Description                                     |
| --------- | ----------------------------------------------- |
| `pattern` | The pattern to search for.                      |
| `subject` | The input string.                               |
| `matches` | Results of the search.                          |
| `flags`   | Described [below](#flags).                      |
| `offset`  | Specify an alternate place to start the search. |

### Flags

| Flag                     | Description                                                                  |
| ------------------------ | ---------------------------------------------------------------------------- |
| `PREG_OFFSET_CAPTURE`    | For every occuring match, the appendant string offset will also be returned. |
| `PREG_UNMATCHED_AS_NULL` | Unmatched subpatterns are reported as `null`.                                |

## Return

| Value   | Condition                   |
| ------- | --------------------------- |
| `1`     | `pattern` matches `subject` |
| `0`     | No match                    |
| `false` | Failure                     |

## Examples

```php
preg_match('/php/i', 'PHP is a language.');
```

## References

- [preg_match | PHP Manual](https://www.php.net/manual/en/function.preg-match.php)
