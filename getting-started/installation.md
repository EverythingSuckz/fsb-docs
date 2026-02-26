# Installation

FSB is written in Go, which means it compiles down to a single binary. You can run it practically anywhere. Here is how to get it running on your machine.

::: tip  :green_circle: NOTE
This guide is for locally running the bot on your own computer. If you want to host it on a cloud server, check out the [Deployment Options](./deployment.md) guide.
:::

## Prerequisites

Make sure you have completed the [Prerequisites](./prerequisites.md) guide. You should have your `API_ID`, `API_HASH`, `BOT_TOKEN`, and `LOG_CHANNEL` variables ready.

## Install Script

**Option 1 (Recommended)**: The easiest way to install FSB is via our installation script which automatically sets up the latest binary for your system:

##### Run the installation script

1. Run the following command in your terminal:
::: code-group
```bash [Linux/macOS/Termux]
curl -sL https://filestream.bot/install | bash
```
```txt [Windows]
Please download the binary manually from the releases page.
```
:::

::: tip  :green_circle: NOTE
When running the above command, it'll ask for some questions. If you don't understand any of them, just press Enter to select the default value.
:::

::: info :orange_circle: WARNING
This script only works on Linux and macOS. You'll have to download the binary manually if you're on Windows from the [releases page](https://github.com/EverythingSuckz/TG-FileStreamBot/releases).
:::

##### Configure the env file

2. After running the script, goto the `fsb.env` file that was created (if it was not created, [create it yourself](../configuration/generator.md#config-generator)) and fill in your credentials. 

<!--@include: ../configuration/generator.md#example-fsb-env-->

##### Run the bot

3. Run the bot using the following command:

::: code-group
```bash [Linux/macOS/Termux]
cd FSB/
./fsb run
```
```ps1 [Windows]
.\fsb.exe run
```
:::

::: tip  :green_circle: NOTE
This command can vary based on where you downloaded the binary and how you named it. Just make sure to navigate to the directory where the `fsb` binary is located and run it with the `run` argument.
:::

## Binary Releases

**Option 2**: If you prefer to download it manually:

1. Head over to the [releases page](https://github.com/EverythingSuckz/TG-FileStreamBot/releases) on GitHub.
2. Download the appropriate binary for your system (Linux, macOS, or Windows).
3. Extract the file.
4. Rename `fsb.sample.env` to `fsb.env` and fill in your [credentials](../configuration/index.md).
5. Run the bot using the following command:
<!--@include: ./installation.md#run-the-bot{3,} -->

## Docker

**Option 3**: Docker is also fully supported if you prefer containerized environments. First, save your configuration into a file named `fsb.env` (we will cover other settings in the [Configuration](../configuration/index.md) section):

<!--@include: ../configuration/generator.md#example-fsb-env-->

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

::: tip  :green_circle: NOTE
Run this command in the same directory where your `docker-compose.yaml` and `fsb.env` files are located.
:::

## Building from Source

If you want to compile the bot yourself, you will need Go 1.25 or higher installed on your system.

```bash
git clone https://github.com/EverythingSuckz/TG-FileStreamBot
cd TG-FileStreamBot

# Build the binary
go build ./cmd/fsb/

# Set up your environment file
cp fsb.sample.env fsb.env
```

Fill in your credentials in `fsb.env`, see [Configuration](../configuration/index.md) for details on each variable.

Then run the bot:
<!--@include: ./installation.md#run-the-bot{3,} -->

## Next Steps

If you want to host the bot on a cloud platform instead of your own machine, check out the [Deployment Options](./deployment.md). Otherwise, head over to the [Configuration](../configuration/index.md) section to learn how to properly configure your bot.
