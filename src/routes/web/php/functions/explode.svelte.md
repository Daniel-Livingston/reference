---
title: explode()
layout: article
---

<script context="module">
  export function load() {
    return {
      stuff: {
        title: 'explode() - PHP',
        layout: 'article'
      }
    };
  }
</script>

# {title}

## Description

Split a string by a string.

```php
explode(
  string $separator,
  string $string,
  int $limit = PHP_INT_MAX
): array
```

## Parameters

| Parameter   | Description                                                                                                                                                                                                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `separator` | The boundary string.                                                                                                                                                                                                                                                            |
| `string`    | The input string.                                                                                                                                                                                                                                                               |
| `limit`     | If `limit` is set and positive, the returned array will contain a max of `limit` elements with the last element containing the rest of `string`.<br><br>If `limit` is negative, all except the last `-limit` are returned.<br><br>If `limit` is `0`, then it is treated as `1`. |

## Return

| Value                                            | Condition                                                                                     |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| throws `ValueError`                              | `separator` is an empty `string`                                                              |
| `[]`                                             | `separator` contains a value that is not contained in `string` and a negative `limit` is used |
| `array` containing results of splitting `string` | Otherwise                                                                                     |

## References

- [explode | PHP Manual](https://www.php.net/manual/en/function.explode.php)
