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
      return await bot.sendMessage(msg.chat.id, 'Halo! gw bisa download video tiktok no wm loh! kirimin gw link nya nanti gw download.')
    }
    
    if (message === '/donate') {
      return await bot.sendMessage(msg.chat.id, '(USD)https://ko-fi.com/xdf54 (IDR) https://saweria.co/Xdf54')
    }


    if (message.match('https:\\/\\/[a-zA-Z]+\\.tiktok\\.com\\/')) {
      const resp = await TikTokDownloader.downloadVideo(message)
      return await bot.sendVideo(chatId, resp)
    } else {
      return await bot.sendMessage(chatId, 'Link nya salah banh,kirim link yang bener banh.')
    }
  })
}

start()
