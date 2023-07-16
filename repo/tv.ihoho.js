// ==MiruExtension==
// @name         海外华人在线影视视频平台 - HOHO TV
// @version      v0.0.1
// @author       zj
// @lang         zh-cn
// @license      MIT
// @icon         https://ihoho.tv
// @package      tv.ihoho
// @type         bangumi
// @webSite      https://ihoho.tv
// ==/MiruExtension==

export default class extends Extension {
    constructor() {
        super("https://ihoho.tv")
    }
    getCover(url) {
        if (url.indexOf("http") == -1) {
            return `https://ihoho.tv/${url}`
        }
        return url
    }

    async search(kw, page) {
        const response = await this.request(`/vod/search/page/${page}/wd/${wd}.html`)
        // const response = await axios.get('https://ihoho.tv/vod/search/wd/%E7%86%9F%E5%B9%B4.html', {
        //     headers: {
        //         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
        //         Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        //         'Accept-Language': 'en-US,en;q=0.9',
        //         'Accept-Encoding': 'gzip, deflate, br',
        //         Connection: 'keep-alive',
        //     }
        // });
        const ul = response.match(/<ul class="stui-vodlist clearfix([\s\S]+?)<\/ul/)[1]
        const li = ul.match(/<li([\s\S]+?)<\/li>/g)
        const bangumi = []
        li.forEach(e => {
            const title = e.match(/title="(.+?)"/)[1]
            const url = e.match(/href="(.+?)"/)[1]
            const cover = e.match(/data-original="(.+?)"/)[1]
            const update = e.match(/<span class="pic-text text-right"><b>(.+?)<\/b><\/span>/)[1]
            bangumi.push({
                title,
                url,
                cover,
                update,
            })
        })
        return bangumi
    }
    // 人气榜，并不是所有网站都有，根据情况修改成首页推荐
    async latest() {
        // const res = await this.request("/",{
        //   headers: {
        //     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
        //     Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        //     'Accept-Language': 'en-US,en;q=0.9',
        //     'Accept-Encoding': 'gzip, deflate, br',
        //     Connection: 'keep-alive',
        //   }
        // });
        // const ul = /class="stui-vodlist clearfix"([\s\S]+?)\/ul/g.exec(res)[0]
        // const li = ul.match(/<div class="stui-vodlist__box">([\s\S]+?)<\/div>/g)
        // const bangumi = []
        // li.forEach(e => {
        //   const title = e.match(/title="(.+?)"/)[1]
        //   const url = e.match(/href="(.+?)"/)[1]
        //   const cover = e.match(/data-original="(.+?)"/)[1]
        //   let update = ""
        //   try {
        //     update = e.match(/<span class="pic-text text-right"><b>(.+?)<\/b><\/span>/)[1]
        //   } catch (error) {
        //     update = ""
        //     console.log(error);
        //   }
        //   bangumi.push({
        //     title,
        //     url,
        //     cover,
        //     update
        //   })
        // })
        return [
  {
    title: '玉骨遥',
    url: '/detail/201936.html',
    cover: 'https://img.liangzipic.com/upload/vod/20230702-1/97a95f644aa5148316301cddbdb770e0.jpg',
    update: '更新至第30集'
  },
  {
    title: '暮色心约',
    url: '/detail/201938.html',
    cover: 'https://img.liangzipic.com/upload/vod/20230629-1/c89a127429dc0089f584fb8bf9dbb782.jpg',
    update: '更新至第30集'
  },
  {
    title: '长风渡',
    url: '/detail/201945.html',
    cover: 'https://img.liangzipic.com/upload/vod/20230618-1/e2cc81769235b3a259f6609279457e37.jpg',
    update: '已完结'
  },
  {
    title: '出发！趣野吧',
    url: '/detail/201961.html',
    cover: 'https://img.liangzipic.com/upload/vod/20230629-1/c41829d9ab62b1accf8707d80c440415.jpg',
    update: '更新至第3期'
  },
  {
    title: '尘缘',
    url: '/detail/201939.html',
    cover: 'https://img.liangzipic.com/upload/vod/20230702-1/03dfc4a7cd0106b73ec1e5f4e35d682d.jpg',
    update: '更新至第12集'
  },
  {
    title: '熟年',
    url: '/detail/201955.html',
    cover: 'https://img.liangzipic.com/upload/vod/20230525-1/87a5aa417d73fdad4b412870d5e1583c.jpg',
    update: '更新至第39集'
  }
];
    }

    async detail(url) {
        const res = await this.request(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                Connection: 'keep-alive',
            }
        });
        // const res = await axios.get('https://ihoho.tv/detail/201955.html', {
        //     headers: {
        //         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
        //         Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        //         'Accept-Language': 'en-US,en;q=0.9',
        //         'Accept-Encoding': 'gzip, deflate, br',
        //         Connection: 'keep-alive',
        //     }
        // });

        const descMatch = res.match(/class="detail-content" style="display: none;">(.+?)<\/span>/);
        const desc = descMatch ? descMatch[1] : '';

        const coverMatch = res.match(/data-original="(.+?)"/);
        const cover = coverMatch ? coverMatch[1] : '';

        const titleMatch = res.match(/class="title">(.+?)<\/h1>/);
        const title = titleMatch ? titleMatch[1] : '';

        const watchUrlTitleStrMatch = res.match(/stui-pannel__head bottom-line active dpplay clearfix">([\s\S]+?)<\/div>/g);
        const watchUrlTitleStr = watchUrlTitleStrMatch ? watchUrlTitleStrMatch.join('') : '';
        const watchUrlTitle = watchUrlTitleStr.match(/data-toggle="tab">(.+?)<\/a>/g);

        const watchUrlGroupsStr = res.match(/class="stui-content__playlist clearfix ">([\s\S]+?)<\/ul/g);

        // console.log(watchUrlTitleStrMatch)
        // console.log(watchUrlTitleStr)
        // console.log(watchUrlTitle)
        // console.log(watchUrlGroupsStr)

        const episodes = [];
        let i = 0;

        watchUrlGroupsStr.forEach(e => {
            const episode = [];
            const lis = e.match(/<li([\s\S]+?)<\/li>/g);
            lis.forEach(e => {
                const match = e.match(/<a href="(.+?)">(.+?)<\/a>/);
                if (match) {
                    episode.push({
                        url: match[1],
                        name: match[2],
                    });
                }
            });
            const episodeTitleMatch = watchUrlTitle[i++].match(/>(.+?)<\/a>/);
            const episodeTitle = episodeTitleMatch ? episodeTitleMatch[1] : '';
            episodes.push({
                title: episodeTitle,
                urls: episode
            });
        });

        return {
            episodes,
            desc,
            cover,
            title
        }
    }

    async watch(url) {
        const res = await this.request(url)

        // const res = await axios.get('https://ihoho.tv/player/201955/1/2.html', {
        //     headers: {
        //         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
        //         Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        //         'Accept-Language': 'en-US,en;q=0.9',
        //         'Accept-Encoding': 'gzip, deflate, br',
        //         Connection: 'keep-alive',
        //     }
        // });
        const urlMatch = res.match(/,"url":"(.+?)","url_next/);
        const encode = urlMatch ? urlMatch[1] : '';

        // 需要解密

        return {
            type: "hls",
            url: `http${url[1].replace(/\\\/|\/\\/g, "/")}.m3u8`
        }
    }

    async checkUpdate(url) {
        const res = await this.request(url)
        return res.match(/<span class="hl-text-conch">(.+?)<\/span>/)[1]
    }

}
