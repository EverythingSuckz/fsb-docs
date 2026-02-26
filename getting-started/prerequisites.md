# Prerequisites

Before you unleash `FSB` into the wild, you need to gather a few essential ingredients. You just have to goto a couple of websites and click around a bit and copy some values. Don't worry, it's not as scary as it sounds. 

## 1. Telegram API Credentials

First, you need an API ID and an API Hash to communicate with Telegram's core servers. Complicated? Not at all. Just follow these steps:

1. Go to [my.telegram.org](https://my.telegram.org) and log in with your phone number.
<br>
[![my telegram website](/screenshots/my_telegram.png)](https://my.telegram.org)
2. Click **API development tools**.
<br>
[![api development tools button](/screenshots/api_dev_tools.png)](https://my.telegram.org/apps)
3. Create a new application. The App title and Short name can be anything you like, and you can select "Other" for the Platform.
<br>
[![creating a new application on my telegram](/screenshots/create_app.png)](https://my.telegram.org/apps)
4. Copy your `api_id` and `api_hash`. We'll need these later.
<br>
[![api id and hash example](/screenshots/api_id_hash.png)](https://my.telegram.org/apps)

::: details Is it safe? Will it get my telegram account banned?
Nope, these credentials are used to create a separate session for the bot and do not have access to your personal Telegram account. Just make sure to **keep them secret and don't share them with anyone**.
:::

## 2. Bot Token

You need a dedicated Bot Token to run the system. You'll obtain this after creating your own bot on Telegram. Here's how:

1. Open [@BotFather](https://telegram.dog/BotFather) in Telegram.
<br>
[![banner of bot father on telegram](/screenshots/bot_father.png)](https://telegram.dog/BotFather)
2. Send the `/newbot` command and follow the prompts to choose a name and username.
<br>
[![creating a new bot with bot father](/screenshots/new_bot.png)](https://telegram.dog/BotFather)
3. BotFather will hand you a token (it looks something like `123456789:ABCdefGHI...`).
<br>
[![bot token example](/screenshots/bot_token.png)](https://telegram.dog/BotFather)
4. Note it down. We'll need this later.

## 3. The Log Channel

The Log Channel is where the bot will store all the files you forward it. This is done to generate the streaming links. You can use an existing channel or create a new one specifically for this purpose.

1. Create a new Telegram channel. We highly recommend making it **Private**.
2. Go to the channel settings and add your newly created bot as an **Administrator**. It needs permission to post messages.
3. Get the **Channel ID**. 
   - A quick way to get this is to send a message in the channel, forward it to [@MissRose_bot](https://telegram.dog/MissRose_bot), and reply to the forwarded message with `/id`.
   - The ID should be a negative number starting with `-100` (for example, `-100123456789`).

   [![getting channel id with missrose bot](/screenshots/rose_channel_id.png)](https://telegram.dog/MissRose_bot)

If you are setting up [multiple worker bots](../advanced/multi-bot.md) later, you will need to add all of them to this channel as well.

## Bringing it all together

You should now have:
- `API_ID`
- `API_HASH`
- `BOT_TOKEN`
- `LOG_CHANNEL`

Keep these handy, you will need them in the next step when we install and configure the bot.

## Next Steps

Now that you have your credentials, let's get the bot running. Head over to [Installation](./installation.md).
