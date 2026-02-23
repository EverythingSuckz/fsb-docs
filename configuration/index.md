# Configuration

Now that you have your bot installed or deployed, let's configure it. All settings are configured through environment variables, typically stored in an `fsb.env` file if you are using Docker or the binary release.

## Required Variables

These must be set, otherwise the bot will not start.

| Variable | Description |
|---|---|
| `API_ID` | Telegram API ID from [my.telegram.org](https://my.telegram.org) |
| `API_HASH` | Telegram API Hash from [my.telegram.org](https://my.telegram.org) |
| `BOT_TOKEN` | Bot token from [@BotFather](https://telegram.dog/BotFather) |
| `LOG_CHANNEL` | Telegram channel ID for file storage |

## Optional Variables

These are optional settings you can use to tweak the bot's behavior.

| Variable | Default | Description |
|---|---|---|
| `DEV` | `false` | Enable verbose development logging |
| `PORT` | `8080` | HTTP server port |
| `HOST` | auto-detected | Base URL for generated links (e.g. `https://stream.example.com`) |
| `HASH_LENGTH` | `6` | Length of URL hash, minimum `5`, maximum `32` |
| `USE_SESSION_FILE` | `true` | Persist worker sessions across restarts |
| `USER_SESSION` | (Empty) | Session string for userbot features (auto-add bots to channel) |
| `USE_PUBLIC_IP` | `false` | Auto-discover public IP for the `HOST` URL |
| `ALLOWED_USERS` | (Empty) | Comma-separated Telegram user IDs (allowlist) |

## Interactive Config Builder

If you want an easy way to generate your `fsb.env` file, head over to the [Config Generator](./generator.md).

## What to Read Next

- [Stream Tuning](../advanced/stream-tuning.md)
- [Multi-Bot Setup](../advanced/multi-bot.md)
