const axios = require('axios')
const cheerio = require('cheerio')

class TikTokDownloader {
  async _fetchVideoId(url) {
    try {
      const { data } = await axios.get(url)
      const $ = cheerio.load(data)
      const link = $('link[rel="canonical"]').attr('href')
      const id = link.split('/')
      return id[id.length - 1]
    } catch (e) {
      console.log(e)
    }
  }

  async _getVideoLink(id) {
    try {
      const { data } = await axios.get(`https://api2.musical.ly/aweme/v1/aweme/detail/?aweme_id=${id}`)
      const uri = data.aweme_detail.video.download_addr.uri
      return `https://api2-16-h2.musical.ly/aweme/v1/play/?video_id=${uri}&vr_type=0&is_play_url=1&source=PackSourceEnum_PUBLISH&media_type=4`
    } catch (e) {
      console.log(e)
    }
  }

  async downloadVideo(url) {
    try {
      const id = await this._fetchVideoId(url)
      return await this._getVideoLink(id)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new TikTokDownloader()
