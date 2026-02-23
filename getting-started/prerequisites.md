# Prerequisites

Before you unleash TG-FileStreamBot into the wild, you need to gather a few essential ingredients. Think of this as getting your API ID, Bot Token, and Log Channel ready so the bot actually has permission to do its magic.

## 1. Telegram API Credentials

You need an API ID and an API Hash to communicate with Telegram's core servers.

1. Go to [my.telegram.org](https://my.telegram.org) and log in with your phone number.
2. Click **API development tools**.
3. Create a new application. The App title and Short name can be anything you like, and you can select "Other" for the Platform.
4. Copy your `api_id` and `api_hash`.

Keep these secret. They represent your account's access to the API.

## 2. Bot Token

You need a dedicated Bot Token to run the system.

1. Open [@BotFather](https://telegram.dog/BotFather) in Telegram.
2. Send the `/newbot` command and follow the prompts to choose a name and username.
3. BotFather will hand you a token (it looks something like `123456789:ABCdefGHI...`).
4. Save this token.

## 3. The Log Channel

The Log Channel is where the bot will securely store references to the files you want to stream.

1. Create a new Telegram channel. We highly recommend making it **Private**.
2. Go to the channel settings and add your newly created bot as an **Administrator**. It needs permission to post messages.
3. Get the **Channel ID**. 
   - A quick way to get this is to send a message in the channel, forward it to [@MissRose_bot](https://telegram.dog/MissRose_bot), and reply to the forwarded message with `/id`.
   - The ID should be a negative number starting with `-100` (for example, `-100123456789`).

If you are setting up multiple worker bots later, you will need to add all of them to this channel as well.

## Bringing it all together

You should now have:
- `API_ID`
- `API_HASH`
- `BOT_TOKEN`
- `LOG_CHANNEL`

Keep these handy, you will need them in the next step when we install and configure the bot.

## Next Steps

Now that you have your credentials, let's get the bot running. Head over to [Installation](./installation.md).
