# Getting Started

TG-FileStreamBot generates direct HTTP streaming URLs for files stored in your Telegram channel. Written in Go, it is designed for high throughput, low latency, and easy deployment.

## Features

- **Direct HTTP links**: Shareable URLs for any Telegram file type
- **Parallel streaming**: Configurable concurrency and prefetch buffers
- **Multi-bot load balancing**: Distribute API calls across up to 50 tokens
- **Single binary**: No runtime dependencies, easy deployment
- **Fine-grained tuning**: Control concurrency, buffer depth, timeouts, and retries

## The Roadmap

Setting up the bot only takes a few steps. Here is the path we are going to follow:

1. **[Prerequisites](./prerequisites.md)**: Gather your Telegram API ID, Bot Token, and Log Channel ID.
2. **[Installation](./installation.md)**: Run the bot locally using Docker or a standalone binary.
3. **[Deployment](./deployment.md)**: Explore options to host the bot on the cloud.

Let's begin by gathering everything you need in the [Prerequisites Guide](./prerequisites.md).
