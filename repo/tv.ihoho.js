// ==MiruExtension==
// @name         海外华人在线影视视频平台 - HOHO TV
// @version      v0.0.1
// @author       zj
// @lang         zh-cn
// @license      MIT
// @icon         https://ihoho.tv/favicon.ico
// @package      tv.ihoho
// @type         bangumi
// @webSite      https://ihoho.tv/
// ==/MiruExtension==

import axios from './axios';

export default class extends Extension {
    constructor() {
        super("https://ihoho.tv/")
    }
    getCover(url) {
        if (url.indexOf("http") == -1) {
            return `https://ihoho.tv${url}`
        }
        return url
    }

    async search(kw, page) {
        const res = await axios.get('http://47.115.229.58:5000/search?page=${page}&wd=${kw}');
        return res.data;
    }
    // 人气榜，并不是所有网站都有，根据情况修改成首页推荐
    async latest() {
        const res = await axios.get('http://47.115.229.58:5000');
        return res.data;
    }

    async detail(url) {
        const res = await axios.get('http://47.115.229.58:5000/detail?url=${url}');
        return res.data;
    }

    async watch(url) {
        const res = await axios.get('http://47.115.229.58:5000/watch?url=${url}');
        return res.data;
    }

    async checkUpdate(url) {
        const res = await this.request(url)
        return res.match(/<span class="hl-text-conch">(.+?)<\/span>/)[1]
    }

}
