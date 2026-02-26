# Getting Started

Telegram File Stream Bot (FSB for short) generates direct HTTP streaming links for files any Telegram Files. It's written in Go to ensure high performance and low resource usage.

Please use the sidebar to navigate through the docs. If there's anything you think we should add, please open an issue or submit a pull request on the [GitHub repository](https://github.com/EverythingSuckz/fsb-docs).

## Features

- **Instant Links**: You don't have to wait, everything is instant :zap:. 
- **Media Support**: Videos, music, documents, and more. If Telegram can handle it, so can FSB.
- **Parallel streaming**: Supports concurrency to maximize throughput and minimize latency.
- **Multi-bot load balancing**: Distribute API calls across different bots. (upto 50 bots)
- **Single binary**: No extra dependencies or databases required. Just run the binary.
- **Open source**: Fully open source and free to use. Contributions are welcome!

## The Roadmap

Setting up the bot only takes a few steps. Here is the path we are going to follow:

1. **[Prerequisites](./prerequisites.md)**: Shows steps to gather all the necessary variables you need to get the bot started.
2. **[Installation](./installation.md)**: Shows how to run the bot locally.
3. **[Deployment](./deployment.md)**: (OPTIONAL) Explore options to host the bot on the cloud.

---

#### Bonus pages
- **[Configuration](../configuration/index.md)**: A detailed look at all the configuration options available to customize your bot.
- **[Config Generator](../configuration/generator.md)**: An interactive tool to help you generate a valid `fsb.env` file without any hassle.
- **[Stream Tuning Guide](../advanced/stream-tuning.md)**: Tips and tricks to optimize streaming performance for different file types and network conditions.**
- **[Multi-Bot Setup](../advanced/multi-bot.md)**: A guide on how to set up multiple bots for load balancing and increased performance.
- **[Troubleshooting](../advanced/troubleshooting.md)**: Common issues and their solutions to help you get back on track quickly.
