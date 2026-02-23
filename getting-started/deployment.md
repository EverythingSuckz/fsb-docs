# Deployment Options

If you don't want to run TG-FileStreamBot on your own computer, you can easily host it on a cloud server. Here are the simplest ways to get your bot online 24/7.

## Koyeb

Koyeb is a developer-friendly platform that makes deploying Docker containers incredibly simple.

### Quick Deploy Button

Click the button below to instantly deploy to Koyeb using our provided template. You will be prompted to enter your credentials along the way.

[![Deploy to Koyeb](https://www.koyeb.com/static/images/deploy/button.svg)](https://app.koyeb.com/deploy?type=docker&name=file-stream-bot&image=ghcr.io/everythingsuckz/fsb:latest&env%5BAPI_HASH%5D=&env%5BAPI_ID%5D=&env%5BBOT_TOKEN%5D=&env%5BHOST%5D=https%3A%2F%2F%7B%7B+KOYEB_PUBLIC_DOMAIN+%7D%7D&env%5BLOG_CHANNEL%5D=&env%5BPORT%5D=8038&ports=8038%3Bhttp%3B%2F&hc_protocol%5B8038%5D=tcp&hc_grace_period%5B8038%5D=5&hc_interval%5B8038%5D=30&hc_restart_limit%5B8038%5D=3&hc_timeout%5B8038%5D=5&hc_path%5B8038%5D=%2F&hc_method%5B8038%5D=get)

### Manual Setup on Koyeb

If you prefer to set it up manually:

1. Create a new app on Koyeb.
2. Select Docker as the deployment type and use the image `ghcr.io/everythingsuckz/fsb:latest`.
3. Add your required environment variables (`API_ID`, `API_HASH`, `BOT_TOKEN`, `LOG_CHANNEL`).
4. Set the `PORT` variable to 8038.
5. Set the `HOST` variable to `https://{YOUR_APP_NAME}.koyeb.app`.
6. Deploy your application.

## Heroku

If you prefer Heroku, we have you covered as well.

### Quick Deploy Button

Note that you must fork the main repository to deploy to Heroku first. Once you have done that, click the button below.

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## VPS or Dedicated Server

The easiest way to install TG-FileStreamBot on your own Linux server or macOS machine is via our interactive installation script:

```bash
curl -sL https://filestream.bot/install | bash
```

Alternatively, you can download the binary manually from the [releases page](https://github.com/EverythingSuckz/TG-FileStreamBot/releases), extract it, and run it.

For a more detailed explanation of these installation methods (including Docker architectures), check out the [Installation Guide](./installation.md).

### Setting Up a Systemd Service

To keep the bot running permanently in the background, we recommend creating a systemd service.

1. Ensure the binary is accessible in your PATH. The `install.sh` script does this automatically. If you downloaded it manually, move it: `sudo cp fsb /usr/local/bin/fsb`.
2. Create a new service file at `/etc/systemd/system/fsb.service`.

```ini
[Unit]
Description=TG-FileStreamBot
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/fsb
ExecStart=/usr/local/bin/fsb run
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

4. Enable and start the service:

```bash
sudo systemctl enable fsb
sudo systemctl start fsb
```

## A Note on Ports and SSL

The default port is `8080`, but you can change this using the `PORT` environment variable. When deploying to cloud platforms, make sure you expose the correct port.

Platforms like Koyeb and Heroku handle SSL automatically, so your stream links will use HTTPS. If you are self-hosting on a VPS, you will want to set up a reverse proxy like Nginx or Caddy with Let's Encrypt to handle HTTPS.

## Next Steps

Now that you are installed and deployed, let's explore all the ways you can tune the bot. Check out the [Configuration Guide](../configuration/index.md).
