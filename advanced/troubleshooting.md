# Troubleshooting

Sometimes things go wrong. Here are some common problems and solutions.

## Connection Issues

### Bot Not Starting

**The issue**: Your bot is failing to start and throws connection errors.

**How to fix it**:
- Verify your `API_ID` and `API_HASH` are correct.
- Ensure your bot token is actually valid.
- Check network connectivity to the Telegram API.

### Cannot Connect to Telegram

**The issue**: You are getting "Failed to connect" or timeout errors.

**How to fix it**:
- Check your firewall settings. Telegram needs port 443 open.
- Make sure your server can actually reach `api.telegram.org`.
- Try enabling `USE_PUBLIC_IP` if you are behind a NAT.

## Stream Issues

### Slow Stream Start

**The issue**: A video takes a very long time to start playing.

**How to fix it**:
- Increase `STREAM_CONCURRENCY` for a faster initial fetch.
- Increase `STREAM_BUFFER_COUNT` to prefetch more data.
- Check your network latency to Telegram's servers.

### Stream Fails Mid-Playback

**The issue**: The stream randomly stops or throws errors during playback.

**How to fix it**:
- Increase `STREAM_TIMEOUT_SEC` if you are dealing with slow connections.
- Increase `STREAM_MAX_RETRIES` if the network is just unreliable.
- Check server logs for any specific error messages.
- Make sure your server has enough memory to support your buffer count.

### Flood Wait Errors

**The issue**: You keep seeing "Flood wait" errors popping up in the logs.

**How to fix it**:
- Lower your `STREAM_CONCURRENCY`.
- Add more worker bots (check out the [Multi-Bot Setup](./multi-bot.md)).
- Wait out the specified cooldown period.

## Configuration Issues

### Invalid Log Channel

**The issue**: The bot cannot post to the log channel.

**How to fix it**:
- Make sure your bot is actually an admin in the channel.
- Verify your `LOG_CHANNEL` ID is correct (it must be a negative number starting with `-100`).
- Test it manually by sending a message through the bot's API.

### Host URL Not Working

**The issue**: The generated links simply do not work.

**How to fix it**:
- Set `HOST` explicitly to your domain or IP address in your `.env` file.
- If you deployed to a cloud platform, make sure `HOST` matches your public app URL.
- Make sure you exposed your port correctly.

## High Memory Usage

**The issue**: Your server is running completely out of memory.

**How to fix it**:
- Reduce your `STREAM_BUFFER_COUNT`.
- Limit concurrent streams at your proxy or load balancer level.
- Get a beefier server.

## Exploring User Sessions

If you need to automatically add bots to your log channel, you need a `USER_SESSION`. Run the following command:

::: code-group
```bash [Linux/macOS/Termux]
./fsb session --api-id <your_api_id> --api-hash <your_api_hash>
```
```powershell [Windows]
.\fsb session --api-id <your_api_id> --api-hash <your_api_hash>
```
:::

::: info :orange_circle: WARNING
Use this feature with caution. Newly created accounts might get banned by Telegram.
:::

Scan the generated QR code with your Telegram app. If the session is invalid or expired, just generate a new one.

## Getting Help

If none of this helped, you can always open a [GitHub Issue](https://github.com/EverythingSuckz/TG-FileStreamBot/issues) or join the [Telegram Support Group](https://t.me/AlteredVoid). We won't bite.. unless you don't follow the common internet etiquettes.
