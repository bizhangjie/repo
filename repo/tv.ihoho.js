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
        const response = await this.request(`/vod/search/page/${page}/wd/${wd}.html.html`)
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
    // 人气榜，并不是所有网站都有
    async latest() {
        const res = await this.request("/label/rankweek.html")
        const ul = /class="hl-rank-list clearfix"([\s\S]+?)\/ul/g.exec(res)[0]
        const li = ul.match(/<li class="hl-list-item hl-col-xs-12">([\s\S]+?)<\/li>/g)
        const bangumi = []
        li.forEach(e => {
            const title = e.match(/title="(.+?)"/)[1]
            const url = e.match(/href="(.+?)"/)[1]
            const cover = this.getCover(e.match(/data-original="(.+?)"/)[1])
            let update = ""
            try {
                update = e.match(/<span class="hl-text-conch score">(.+?)<\/span>(.+?)<\/div>/)[2]
            } catch (error) {
                update = ""
                console.log(error);
            }
            bangumi.push({
                title,
                url,
                cover,
                update
            })
        })
        return bangumi
    }

    async detail(url) {
        const res = await this.request(url)

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
