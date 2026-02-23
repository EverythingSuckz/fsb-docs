# Stream Tuning

Tune streaming performance to match your server capacity and network conditions.

## Variables

| Variable | Default | Description |
|---|---|---|
| `STREAM_CONCURRENCY` | `4` | Parallel block downloads per stream |
| `STREAM_BUFFER_COUNT` | `8` | Blocks to prefetch ahead |
| `STREAM_TIMEOUT_SEC` | `30` | Timeout (seconds) per block download |
| `STREAM_MAX_RETRIES` | `3` | Retry attempts before failing a stream |

## Understanding the Variables

### STREAM_CONCURRENCY

Controls how many Telegram file blocks are downloaded simultaneously for each stream request.

- Higher values mean faster initial playback and higher throughput
- Higher values also mean more Telegram API requests, increasing floodwait risk
- Recommended range: 4-8

### STREAM_BUFFER_COUNT

Controls how many downloaded blocks are kept ready in memory.

- Does not increase parallel download count
- Bigger values mean smoother playback on unstable networks
- Increases memory usage per stream
- Formula: `memory ≈ STREAM_BUFFER_COUNT * blockSize`
- Block size is dynamic: 64KB/256KB/512KB/1MB

### STREAM_TIMEOUT_SEC

Maximum time to wait for a single block download from Telegram.

- Increase for slow connections
- Decrease to fail fast on problematic connections

### STREAM_MAX_RETRIES

Number of retry attempts for a failed block before failing the entire stream.

## Presets

### Small Server / Home Host

```bash
STREAM_CONCURRENCY=4
STREAM_BUFFER_COUNT=8
STREAM_TIMEOUT_SEC=30
STREAM_MAX_RETRIES=3
```

### Medium VPS

```bash
STREAM_CONCURRENCY=6
STREAM_BUFFER_COUNT=12
STREAM_TIMEOUT_SEC=45
STREAM_MAX_RETRIES=3
```

### High Bandwidth / Multiple Workers

```bash
STREAM_CONCURRENCY=8
STREAM_BUFFER_COUNT=16
STREAM_TIMEOUT_SEC=60
STREAM_MAX_RETRIES=5
```

## Telegram API Pressure

The main factor affecting Telegram API pressure is `STREAM_CONCURRENCY`.

Approximate Telegram API calls at peak: `active_streams × STREAM_CONCURRENCY`

## Best Practices

1. Start with defaults (`4` concurrency, `8` buffer) and monitor logs
2. Watch for `FLOOD_WAIT` errors — reduce concurrency if they appear
3. Scale up gradually; test each change under load before committing
4. Use [Multi-Bot Setup](../advanced/multi-bot) to distribute API calls across tokens
5. Balance throughput against Telegram rate limits

::: warning
Higher `STREAM_CONCURRENCY` directly increases Telegram API pressure: `active_streams × concurrency = peak API calls`. Size accordingly.
:::
