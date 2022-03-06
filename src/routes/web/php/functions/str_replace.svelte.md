---
title: str_replace()
layout: article
---

<script context="module">
  export function load() {
    return {
      stuff: {
        title: 'str_replace() - PHP',
        layout: 'article'
      }
    };
  }
</script>

# {title}

## Description

Replace all occurrences of the search string with the replacement string.

```php
str_replace(
  array|string $search,
  array|string $replace,
  array|string $subject,
  int &$count = null,
): array|string
```

## Parameters

| Parameter | Description                                                                                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `search`  | The value being searched for. An array designates multiple search values.                                                       |
| `replace` | The replacement value that replaces `search` values. An array designates multiple replacements.                                 |
| `subject` | The string or array being searched and replaced on. If `subject` is an array, search and replace is performed with every entry. |
| `count`   | If passed, will be set to the number of replacements performed.                                                                 |

## Return

| Value    | Condition               |
| -------- | ----------------------- |
| `string` | `subject` is a `string` |
| `array`  | `subject` is an `array` |

## References

- [str_replace | PHP Manual](https://www.php.net/manual/en/function.str-replace.php)
