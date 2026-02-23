# Installation

TG-FileStreamBot is written in Go, which means it compiles down to a single binary. You can run it practically anywhere. Here is how to get it running on your machine.

## Prerequisites

Make sure you have completed the [Prerequisites](./prerequisites.md) guide. You should have your `API_ID`, `API_HASH`, `BOT_TOKEN`, and `LOG_CHANNEL` details ready.

## One-Line Install (Recommended)

The easiest way to install TG-FileStreamBot is via our installation script which automatically sets up the latest binary for your system:

```bash
curl -sL https://filestream.bot/install | bash
```

## Binary Releases

If you prefer to download it manually:

1. Head over to the [releases page](https://github.com/EverythingSuckz/TG-FileStreamBot/releases) on GitHub.
2. Download the appropriate binary for your system (Linux, macOS, or Windows).
3. Extract the file.
4. Rename `fsb.sample.env` to `fsb.env` and fill in your credentials.
5. Run the bot by executing `./fsb run` in your terminal.

## Docker

Docker is also fully supported if you prefer containerized environments. First, save your configuration into a file named `fsb.env` (we will cover other settings in the Configuration section):

```bash
API_ID=your_api_id
API_HASH=your_api_hash
BOT_TOKEN=your_bot_token
LOG_CHANNEL=-100123456789
```

Then, run the container:

```bash
docker run --env-file fsb.env -p 8080:8080 ghcr.io/everythingsuckz/fsb:latest
```

### Docker Compose

If you prefer `docker-compose.yaml`:

<GitHubSnippet url="https://raw.githubusercontent.com/EverythingSuckz/TG-FileStreamBot/main/docker-compose.yaml" lang="yaml" />

Bring it up with:

```bash
docker-compose up -d
```
## Building from Source

If you want to compile the bot yourself, you will need Go 1.21 or higher installed on your system.

```bash
git clone https://github.com/EverythingSuckz/TG-FileStreamBot
cd TG-FileStreamBot

# Build the binary
go build ./cmd/fsb/

# Set up your environment file
cp fsb.sample.env fsb.env
# Edit fsb.env with your details

# Run the bot
./fsb run
```

## Next Steps

If you want to host the bot on a cloud platform instead of your own machine, check out the [Deployment Options](./deployment.md). Otherwise, head over to the [Configuration](../configuration/index.md) section to learn how to properly configure your bot.
