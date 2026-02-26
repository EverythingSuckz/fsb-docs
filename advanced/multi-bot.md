# Multi-Bot Setup

`FSB` supports using multiple bot tokens to distribute stream requests and avoid Telegram API rate limits.

## How It Works

When using multiple bots (workers):
- Each HTTP stream request uses one worker in round-robin mode
- Reduces floodwait risk by distributing API calls across tokens
- Can handle more concurrent streams

## Configuration

Add worker bot tokens to your `fsb.env` file:

```bash
# Main bot token
BOT_TOKEN=55838383:mainbottoken

# Worker bot tokens
MULTI_TOKEN1=55838373:workerbottoken1
MULTI_TOKEN2=55838355:workerbottoken2
MULTI_TOKEN3=55838344:workerbottoken3

# ... up to 50 tokens
```

## Requirements

All worker bots must:
1. Be added to your `LOG_CHANNEL` as admins
2. Have access to the files you want to stream

## Best Practices

1. Start with 2-4 worker bots for moderate usage
2. Add more workers if you see frequent flood wait errors
3. Maximum limit is 50 bots (Telegram channel admin limit)
4. Ensure all bots have identical admin permissions in the channel

## Performance Impact

With multiple workers:
- More concurrent streams can be handled
- Better distribution of API load
- Improved reliability during high traffic

## Auto-Add Bots with User Session

You can use the `USER_SESSION` feature to automatically add worker bots to your log channel.

See [User Session Authentication](./troubleshooting#exploring-user-sessions) for setup instructions.

::: tip  :green_circle: NOTE
This section will be updated soon with more detailed guides. If you would like to contribute, please press the "Edit this page" button at the bottom of the page and submit a pull request with your improvements.
:::
