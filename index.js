require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')
const TikTokDownloader = require('./TikTokDownloader')

const token = process.env.TELEGRAM_BOT_TOKEN
const bot = new TelegramBot(token, { polling: true })

const start = async () => {
  bot.on('message', async (msg) => {
    const chatId = msg.chat.id
    const message = msg.text

    if (message === '/start') {
      return await bot.sendMessage(msg.chat.id, 'Hi, this bot will help you download videos without a watermark from TikTok. First, send a link to the video.')
    }

    if (message.match('https:\\/\\/[a-zA-Z]+\\.tiktok\\.com\\/')) {
      const resp = await TikTokDownloader.downloadVideo(message)
      return await bot.sendVideo(chatId, resp)
    } else {
      return await bot.sendMessage(chatId, 'The url is incorrect, please try again.')
    }
  })
}

start()
