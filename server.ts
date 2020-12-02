const http = require('http');

const url = require('url');
const request = require('request');

export class Sserver {
    constructor() {
        const server = http.createServer((req, res) => {
            if(req.url .includes( "/tvm.m3u8")){
                doProxy(req,res);
            }else {
                res.writeHeader(200, {'Content-Type' : 'text/html;charset:utf-8'
                });
                res.end(getPlayList())
            }
        });
        server.listen(15808, '127.0.0.1', () => {
            const addr = `http://127.0.0.1:15808`;
            console.info(`Server started at `+addr);
        })
    }
}


function doProxy(req, res){
    const q = url.parse(req.url, true).query;
    let id= q.id;
    const ts = q.ts;

    if(ts==null) {//请求EXTM3U
        if(id == null){
            id="CCTV1HD";
        }
        id=id+"";
        id = id.trim();
        const bitrate = id.includes("HD")? "3000000" : "1500000";
        const url = "https://live-bdxcx.mtq.tvmmedia.cn/baidu/live_"+id+".m3u8";
        //设置头部
        const headers = {
            'User-Agent': `Mozilla/5.0 (Linux; Android 8.0.0; BLN-AL40 Build/HONORBLN-AL40; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/63.0.3239.83 Mobile Safari/537.36 T7/11.11 swan/2.8.0 swan-baiduboxapp/11.11.0.12 baiduboxapp/11.11.0.12 (Baidu; P1 8.0.0) dumedia/6.14.2.8`,
        };
        const options = {
            url: url,
            headers: headers
        };
        request(options, function (error, response, body) {
            let s = body;
            s = s.replace(/http:\/\/live-bdxcx.mtq.tvmmedia.cn\//g,"/tvm.m3u8?ts=");
            s = s.replace(/1500000/g,bitrate);
            s = s.replace(/\n/g,"\r\n");
            res.end(s);
        });
    }else{
        const url = "http://live-bdxcx.mtq.tvmmedia.cn/"+ts;
        //设置头部
        const headers = {
            'User-Agent': `Mozilla/5.0 (Linux; Android 8.0.0; BLN-AL40 Build/HONORBLN-AL40; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/63.0.3239.83 Mobile Safari/537.36 T7/11.11 swan/2.8.0 swan-baiduboxapp/11.11.0.12 baiduboxapp/11.11.0.12 (Baidu; P1 8.0.0) dumedia/6.14.2.8`,
        };
        const options = {
            url: url,
            headers: headers
        };
        request(options).on('error', function(e) {
            res.end(e);
        }).pipe(res);

    }

}
function getPlayList(){
    return `#EXTM3U
#EXTINF:-1 group-title="默认频道",CCTV1高清
http://127.0.0.1:15808/tvm.m3u8?id=CCTV1HD
#EXTINF:-1 group-title="默认频道",CCTV2高清
http://127.0.0.1:15808/tvm.m3u8?id=CCTV2HD
#EXTINF:-1 group-title="默认频道",CCTV3高清
http://127.0.0.1:15808/tvm.m3u8?id=CCTV3HD
#EXTINF:-1 group-title="默认频道",CCTV4高清
http://127.0.0.1:15808/tvm.m3u8?id=CCTV4HD
#EXTINF:-1 group-title="默认频道",CCTV5高清
http://127.0.0.1:15808/tvm.m3u8?id=CCTV5HD
#EXTINF:-1 group-title="默认频道",CCTV6高清
http://127.0.0.1:15808/tvm.m3u8?id=CCTV6HD
#EXTINF:-1 group-title="默认频道",CCTV7高清
http://127.0.0.1:15808/tvm.m3u8?id=CCTV7HD
#EXTINF:-1 group-title="默认频道",CCTV8高清
http://127.0.0.1:15808/tvm.m3u8?id=CCTV8HD
#EXTINF:-1 group-title="默认频道",CCTV9高清
http://127.0.0.1:15808/tvm.m3u8?id=CCTV9HD
#EXTINF:-1 group-title="默认频道",CCTV10高清
http://127.0.0.1:15808/tvm.m3u8?id=CCTV10HD
#EXTINF:-1 group-title="默认频道",CCTV12高清
http://127.0.0.1:15808/tvm.m3u8?id=CCTV12HD
#EXTINF:-1 group-title="默认频道",CCTV17高清
http://127.0.0.1:15808/tvm.m3u8?id=CCTV17HD
#EXTINF:-1 group-title="默认频道",凤凰中文高清
http://127.0.0.1:15808/tvm.m3u8?id=PhoenixTVHD
#EXTINF:-1 group-title="默认频道",凤凰资讯高清
http://127.0.0.1:15808/tvm.m3u8?id=PhoenixinfoTVHD
#EXTINF:-1 group-title="默认频道",凤凰香港高清
http://127.0.0.1:15808/tvm.m3u8?id=PhoenixHKHD
#EXTINF:-1 group-title="默认频道",东南卫视高清
http://127.0.0.1:15808/tvm.m3u8?id=DongNanHD
#EXTINF:-1 group-title="默认频道",东方卫视高清
http://127.0.0.1:15808/tvm.m3u8?id=SHDongFangHD
#EXTINF:-1 group-title="默认频道",北京卫视高清
http://127.0.0.1:15808/tvm.m3u8?id=BTV1HD
#EXTINF:-1 group-title="默认频道",四川卫视高清
http://127.0.0.1:15808/tvm.m3u8?id=SiChuanTVHD
#EXTINF:-1 group-title="默认频道",天津卫视高清
http://127.0.0.1:15808/tvm.m3u8?id=TianJinHD
#EXTINF:-1 group-title="默认频道",安徽卫视高清
http://127.0.0.1:15808/tvm.m3u8?id=AnHuiHD
#EXTINF:-1 group-title="默认频道",山东卫视高清
http://127.0.0.1:15808/tvm.m3u8?id=ShanDongHD
#EXTINF:-1 group-title="默认频道",广东卫视高清
http://127.0.0.1:15808/tvm.m3u8?id=GuangDongHD
#EXTINF:-1 group-title="默认频道",江西卫视高清
http://127.0.0.1:15808/tvm.m3u8?id=JiangXiHD
#EXTINF:-1 group-title="默认频道",河北卫视高清
http://127.0.0.1:15808/tvm.m3u8?id=HeBeiHD
#EXTINF:-1 group-title="默认频道",河南卫视高清
http://127.0.0.1:15808/tvm.m3u8?id=HeNanHD
#EXTINF:-1 group-title="默认频道",海南卫视高清
http://127.0.0.1:15808/tvm.m3u8?id=TravelTVHD
#EXTINF:-1 group-title="默认频道",深圳卫视高清
http://127.0.0.1:15808/tvm.m3u8?id=ShenZhenHD
#EXTINF:-1 group-title="默认频道",湖北卫视高清
http://127.0.0.1:15808/tvm.m3u8?id=HuBeiHD
#EXTINF:-1 group-title="默认频道",湖南卫视高清
http://127.0.0.1:15808/tvm.m3u8?id=HuNanHD
#EXTINF:-1 group-title="默认频道",辽宁卫视高清
http://127.0.0.1:15808/tvm.m3u8?id=LiaoNingHD
#EXTINF:-1 group-title="默认频道",重庆卫视高清
http://127.0.0.1:15808/tvm.m3u8?id=ChongQingHD
#EXTINF:-1 group-title="默认频道",黑龙江卫视高清
http://127.0.0.1:15808/tvm.m3u8?id=HeiLongJiangHD
#EXTINF:-1 group-title="默认频道",北京冬奥纪实高清
http://127.0.0.1:15808/tvm.m3u8?id=BTVJiShiHD
#EXTINF:-1 group-title="默认频道",北京文艺高清
http://127.0.0.1:15808/tvm.m3u8?id=BTV2HD
#EXTINF:-1 group-title="默认频道",上海东方影视高清
http://127.0.0.1:15808/tvm.m3u8?id=SHTeleplayHD
#EXTINF:-1 group-title="默认频道",上海五星体育高清
http://127.0.0.1:15808/tvm.m3u8?id=SHSportHD
#EXTINF:-1 group-title="默认频道",上海新闻综合高清
http://127.0.0.1:15808/tvm.m3u8?id=SHNewsHD
#EXTINF:-1 group-title="默认频道",上海第一财经高清
http://127.0.0.1:15808/tvm.m3u8?id=CBNHD
#EXTINF:-1 group-title="默认频道",上海纪实人文高清
http://127.0.0.1:15808/tvm.m3u8?id=SHJiShiHD
#EXTINF:-1 group-title="默认频道",上海都市高清
http://127.0.0.1:15808/tvm.m3u8?id=DongFangYuLeHD
#EXTINF:-1 group-title="默认频道",SiTV全纪实高清
http://127.0.0.1:15808/tvm.m3u8?id=QuanJiShiHD
#EXTINF:-1 group-title="默认频道",SiTV动漫秀场高清
http://127.0.0.1:15808/tvm.m3u8?id=DongManXCHD
#EXTINF:-1 group-title="默认频道",SiTV劲爆体育高清
http://127.0.0.1:15808/tvm.m3u8?id=JinBaoSportHD
#EXTINF:-1 group-title="默认频道",SiTV幸福彩高清
http://127.0.0.1:15808/tvm.m3u8?id=XingFuCaiHD
#EXTINF:-1 group-title="默认频道",SiTV新视觉高清
http://127.0.0.1:15808/tvm.m3u8?id=XSJHD
#EXTINF:-1 group-title="默认频道",SiTV欢笑剧场高清
http://127.0.0.1:15808/tvm.m3u8?id=HuanXiaoJCHD
#EXTINF:-1 group-title="默认频道",SiTV游戏风云高清
http://127.0.0.1:15808/tvm.m3u8?id=YouXiFYHD
#EXTINF:-1 group-title="默认频道",SiTV都市剧场高清
http://127.0.0.1:15808/tvm.m3u8?id=DuShiJCHD
#EXTINF:-1 group-title="默认频道",SiTV魅力足球高清
http://127.0.0.1:15808/tvm.m3u8?id=MeiLiYYHD
#EXTINF:-1 group-title="默认频道",CCTV11
http://127.0.0.1:15808/tvm.m3u8?id=CCTV11
#EXTINF:-1 group-title="默认频道",云南卫视
http://127.0.0.1:15808/tvm.m3u8?id=YunNanTV
#EXTINF:-1 group-title="默认频道",内蒙古卫视
http://127.0.0.1:15808/tvm.m3u8?id=NeiMengGuTV
#EXTINF:-1 group-title="默认频道",厦门卫视
http://127.0.0.1:15808/tvm.m3u8?id=XiaMenTV
#EXTINF:-1 group-title="默认频道",厦门卫视
http://127.0.0.1:15808/tvm.m3u8?id=XiaMenWorld
#EXTINF:-1 group-title="默认频道",吉林卫视
http://127.0.0.1:15808/tvm.m3u8?id=JiLinTV
#EXTINF:-1 group-title="默认频道",吉林延边卫视
http://127.0.0.1:15808/tvm.m3u8?id=CYS
#EXTINF:-1 group-title="默认频道",四川康巴卫视
http://127.0.0.1:15808/tvm.m3u8?id=KangBaTV
#EXTINF:-1 group-title="默认频道",宁夏卫视
http://127.0.0.1:15808/tvm.m3u8?id=NingXiaTV
#EXTINF:-1 group-title="默认频道",山东教育卫视
http://127.0.0.1:15808/tvm.m3u8?id=SDETV
#EXTINF:-1 group-title="默认频道",山西卫视
http://127.0.0.1:15808/tvm.m3u8?id=Shan1XiTV
#EXTINF:-1 group-title="默认频道",广东南方卫视上星
http://127.0.0.1:15808/tvm.m3u8?id=SouthTV
#EXTINF:-1 group-title="默认频道",广东南方卫视地面
http://127.0.0.1:15808/tvm.m3u8?id=TVSCity
#EXTINF:-1 group-title="默认频道",新疆兵团卫视
http://127.0.0.1:15808/tvm.m3u8?id=BingTuanTV
#EXTINF:-1 group-title="默认频道",新疆卫视
http://127.0.0.1:15808/tvm.m3u8?id=XinJiangTV
#EXTINF:-1 group-title="默认频道",浙江卫视
http://127.0.0.1:15808/tvm.m3u8?id=ZheJiangTV
#EXTINF:-1 group-title="默认频道",福建海峡卫视
http://127.0.0.1:15808/tvm.m3u8?id=HaiXiaTV
#EXTINF:-1 group-title="默认频道",贵州卫视
http://127.0.0.1:15808/tvm.m3u8?id=GuiZhouTV
#EXTINF:-1 group-title="默认频道",陕西农林卫视
http://127.0.0.1:15808/tvm.m3u8?id=Shan3XiNL
#EXTINF:-1 group-title="默认频道",陕西卫视
http://127.0.0.1:15808/tvm.m3u8?id=Shan3XiTV
#EXTINF:-1 group-title="默认频道",青海卫视
http://127.0.0.1:15808/tvm.m3u8?id=QingHaiTV
#EXTINF:-1 group-title="默认频道",CCTV1(成都经济资讯)
http://127.0.0.1:15808/tvm.m3u8?id=ChengDuJingJi
#EXTINF:-1 group-title="默认频道",SiTV极速汽车
http://127.0.0.1:15808/tvm.m3u8?id=ChannelMax
#EXTINF:-1 group-title="默认频道",上海ICS外语
http://127.0.0.1:15808/tvm.m3u8?id=ICS
#EXTINF:-1 group-title="默认频道",上海哈哈炫动
http://127.0.0.1:15808/tvm.m3u8?id=TOONMAXTV
#EXTINF:-1 group-title="默认频道",上海第一财经
http://127.0.0.1:15808/tvm.m3u8?id=CBN
#EXTINF:-1 group-title="默认频道",上海都市
http://127.0.0.1:15808/tvm.m3u8?id=DongFangYuLe
#EXTINF:-1 group-title="默认频道",中国教育1
http://127.0.0.1:15808/tvm.m3u8?id=CETV1
#EXTINF:-1 group-title="默认频道",中国教育2
http://127.0.0.1:15808/tvm.m3u8?id=CETV2
#EXTINF:-1 group-title="默认频道",中国教育4
http://127.0.0.1:15808/tvm.m3u8?id=CETVSky
#EXTINF:-1 group-title="默认频道",中国黄河
http://127.0.0.1:15808/tvm.m3u8?id=ChinaHuangHe
#EXTINF:-1 group-title="默认频道",云南公共
http://127.0.0.1:15808/tvm.m3u8?id=YunNanPublic
#EXTINF:-1 group-title="默认频道",云南国际
http://127.0.0.1:15808/tvm.m3u8?id=YunNanWorld
#EXTINF:-1 group-title="默认频道",北京冬奥纪实
http://127.0.0.1:15808/tvm.m3u8?id=BTVJiShi
#EXTINF:-1 group-title="默认频道",北京卡酷少儿
http://127.0.0.1:15808/tvm.m3u8?id=KAKU
#EXTINF:-1 group-title="默认频道",北京国际
http://127.0.0.1:15808/tvm.m3u8?id=BTVWorld
#EXTINF:-1 group-title="默认频道",北京影视
http://127.0.0.1:15808/tvm.m3u8?id=BTV4
#EXTINF:-1 group-title="默认频道",北京文艺
http://127.0.0.1:15808/tvm.m3u8?id=BTV2
#EXTINF:-1 group-title="默认频道",北京科教
http://127.0.0.1:15808/tvm.m3u8?id=BTV3
#EXTINF:-1 group-title="默认频道",北京财经
http://127.0.0.1:15808/tvm.m3u8?id=BTV5
#EXTINF:-1 group-title="默认频道",安徽人物
http://127.0.0.1:15808/tvm.m3u8?id=AnHuiPeople
#EXTINF:-1 group-title="默认频道",安徽公共
http://127.0.0.1:15808/tvm.m3u8?id=AnHuiPublic
#EXTINF:-1 group-title="默认频道",安徽国际
http://127.0.0.1:15808/tvm.m3u8?id=AnHuiWorld
#EXTINF:-1 group-title="默认频道",安徽科教
http://127.0.0.1:15808/tvm.m3u8?id=AnHuiEdu
#EXTINF:-1 group-title="默认频道",安徽经济生活
http://127.0.0.1:15808/tvm.m3u8?id=AnHuiFinance
#EXTINF:-1 group-title="默认频道",山东国际
http://127.0.0.1:15808/tvm.m3u8?id=TaiShanTV
#EXTINF:-1 group-title="默认频道",山西少儿
http://127.0.0.1:15808/tvm.m3u8?id=Shan1XiChild
#EXTINF:-1 group-title="默认频道",山西影视
http://127.0.0.1:15808/tvm.m3u8?id=Shan1XiFilm
#EXTINF:-1 group-title="默认频道",山西科教
http://127.0.0.1:15808/tvm.m3u8?id=Shan1XiEdu
#EXTINF:-1 group-title="默认频道",山西经济资讯
http://127.0.0.1:15808/tvm.m3u8?id=Shan1XiFinance
#EXTINF:-1 group-title="默认频道",广东体育
http://127.0.0.1:15808/tvm.m3u8?id=GDSport
#EXTINF:-1 group-title="默认频道",广东公共
http://127.0.0.1:15808/tvm.m3u8?id=GDPublic
#EXTINF:-1 group-title="默认频道",广东嘉佳卡通
http://127.0.0.1:15808/tvm.m3u8?id=GDKT
#EXTINF:-1 group-title="默认频道",广东少儿
http://127.0.0.1:15808/tvm.m3u8?id=TVSChild
#EXTINF:-1 group-title="默认频道",广东影视
http://127.0.0.1:15808/tvm.m3u8?id=TVSMovie
#EXTINF:-1 group-title="默认频道",广东新闻
http://127.0.0.1:15808/tvm.m3u8?id=GDNews
#EXTINF:-1 group-title="默认频道",广东珠江
http://127.0.0.1:15808/tvm.m3u8?id=GDZhuJiang
#EXTINF:-1 group-title="默认频道",广东经济科教
http://127.0.0.1:15808/tvm.m3u8?id=TVSFinance
#EXTINF:-1 group-title="默认频道",广州少儿
http://127.0.0.1:15808/tvm.m3u8?id=GZChild
#EXTINF:-1 group-title="默认频道",广州影视
http://127.0.0.1:15808/tvm.m3u8?id=GZMovie
#EXTINF:-1 group-title="默认频道",广州新闻
http://127.0.0.1:15808/tvm.m3u8?id=GZNews
#EXTINF:-1 group-title="默认频道",广州法治
http://127.0.0.1:15808/tvm.m3u8?id=GZFinance
#EXTINF:-1 group-title="默认频道",广州生活
http://127.0.0.1:15808/tvm.m3u8?id=GZEnglish
#EXTINF:-1 group-title="默认频道",广州竞赛
http://127.0.0.1:15808/tvm.m3u8?id=GZJingSai
#EXTINF:-1 group-title="默认频道",广州综合
http://127.0.0.1:15808/tvm.m3u8?id=GZTV
#EXTINF:-1 group-title="默认频道",广西综艺旅游
http://127.0.0.1:15808/tvm.m3u8?id=GuangXiZongYi
#EXTINF:-1 group-title="默认频道",广西都市
http://127.0.0.1:15808/tvm.m3u8?id=GuangXiCity
#EXTINF:-1 group-title="默认频道",成都都市生活
http://127.0.0.1:15808/tvm.m3u8?id=ChengDuDuShi
#EXTINF:-1 group-title="默认频道",新疆维语经济生活
http://127.0.0.1:15808/tvm.m3u8?id=XJTV9
#EXTINF:-1 group-title="默认频道",新疆维语综艺
http://127.0.0.1:15808/tvm.m3u8?id=XJTV5
#EXTINF:-1 group-title="默认频道",无锡教育
http://127.0.0.1:15808/tvm.m3u8?id=WuXiEdu
#EXTINF:-1 group-title="默认频道",无锡新闻综合
http://127.0.0.1:15808/tvm.m3u8?id=WuXiNews
#EXTINF:-1 group-title="默认频道",武汉外语
http://127.0.0.1:15808/tvm.m3u8?id=WuHanWaiYu
#EXTINF:-1 group-title="默认频道",武汉文体
http://127.0.0.1:15808/tvm.m3u8?id=WuHanWenTi
#EXTINF:-1 group-title="默认频道",武汉新闻综合
http://127.0.0.1:15808/tvm.m3u8?id=WuHanXinWen
#EXTINF:-1 group-title="默认频道",武汉电视剧
http://127.0.0.1:15808/tvm.m3u8?id=WuHanDianShiJu
#EXTINF:-1 group-title="默认频道",武汉科技生活
http://127.0.0.1:15808/tvm.m3u8?id=WuHanKeJi
#EXTINF:-1 group-title="默认频道",武汉经济
http://127.0.0.1:15808/tvm.m3u8?id=WuHanJingJi
#EXTINF:-1 group-title="默认频道",江苏体育休闲
http://127.0.0.1:15808/tvm.m3u8?id=JiangSuTiYu
#EXTINF:-1 group-title="默认频道",江苏公共新闻
http://127.0.0.1:15808/tvm.m3u8?id=JiangSuPublic
#EXTINF:-1 group-title="默认频道",江苏国际
http://127.0.0.1:15808/tvm.m3u8?id=JiangSuWorld
#EXTINF:-1 group-title="默认频道",江苏城市
http://127.0.0.1:15808/tvm.m3u8?id=JiangSuCity
#EXTINF:-1 group-title="默认频道",江苏好享购物(长沙互动)
http://127.0.0.1:15808/tvm.m3u8?id=ChangShaHuDong
#EXTINF:-1 group-title="默认频道",江苏影视
http://127.0.0.1:15808/tvm.m3u8?id=JiangSuMovie
#EXTINF:-1 group-title="默认频道",江苏教育
http://127.0.0.1:15808/tvm.m3u8?id=JiangSuEdu
#EXTINF:-1 group-title="默认频道",河南国际
http://127.0.0.1:15808/tvm.m3u8?id=HeNanWorld
#EXTINF:-1 group-title="默认频道",河南都市
http://127.0.0.1:15808/tvm.m3u8?id=HeNanCity
#EXTINF:-1 group-title="默认频道",深圳国际
http://127.0.0.1:15808/tvm.m3u8?id=ShenZhenWorld
#EXTINF:-1 group-title="默认频道",湖北公共新闻
http://127.0.0.1:15808/tvm.m3u8?id=HuBeiXinWen
#EXTINF:-1 group-title="默认频道",湖南公共
http://127.0.0.1:15808/tvm.m3u8?id=HuNanPublic
#EXTINF:-1 group-title="默认频道",湖南国际
http://127.0.0.1:15808/tvm.m3u8?id=HuNanWorld
#EXTINF:-1 group-title="默认频道",湖南娱乐
http://127.0.0.1:15808/tvm.m3u8?id=HuNanYuLe
#EXTINF:-1 group-title="默认频道",湖南电视剧
http://127.0.0.1:15808/tvm.m3u8?id=HuNanTeleplay
#EXTINF:-1 group-title="默认频道",湖南经视
http://127.0.0.1:15808/tvm.m3u8?id=HuNanFinance
#EXTINF:-1 group-title="默认频道",湖南金鹰卡通
http://127.0.0.1:15808/tvm.m3u8?id=HuNanKT
#EXTINF:-1 group-title="默认频道",贵阳经济生活(暂无信号)
http://127.0.0.1:15808/tvm.m3u8?id=GuiYangJingJi
#EXTINF:-1 group-title="默认频道",重庆国际
http://127.0.0.1:15808/tvm.m3u8?id=ChongQingWorld
#EXTINF:-1 group-title="默认频道",长沙女性
http://127.0.0.1:15808/tvm.m3u8?id=ChangShaWomen
#EXTINF:-1 group-title="默认频道",长沙影视
http://127.0.0.1:15808/tvm.m3u8?id=ChangShaFinance
#EXTINF:-1 group-title="默认频道",长沙政法
http://127.0.0.1:15808/tvm.m3u8?id=ChangShaZhengFa
#EXTINF:-1 group-title="默认频道",长沙新闻
http://127.0.0.1:15808/tvm.m3u8?id=ChangShaNews
#EXTINF:-1 group-title="默认频道",青海生活
http://127.0.0.1:15808/tvm.m3u8?id=QingHaiLife
#EXTINF:-1 group-title="默认频道",青海都市
http://127.0.0.1:15808/tvm.m3u8?id=QingHaiCity
#EXTINF:-1 group-title="默认频道",黄河新闻
http://127.0.0.1:15808/tvm.m3u8?id=HuangHeNews
#EXTINF:-1 group-title="默认频道",阳光卫视
http://127.0.0.1:15808/tvm.m3u8?id=SunShineTV
#EXTINF:-1 group-title="默认频道",澳门卫视
http://127.0.0.1:15808/tvm.m3u8?id=MSTV
#EXTINF:-1 group-title="默认频道",澳亚卫视
http://127.0.0.1:15808/tvm.m3u8?id=MasTV
#EXTINF:-1 group-title="默认频道",星空卫视
http://127.0.0.1:15808/tvm.m3u8?id=XingKongTV
#EXTINF:-1 group-title="默认频道",卫视音乐
http://127.0.0.1:15808/tvm.m3u8?id=ChannelV
#EXTINF:-1 group-title="默认频道",翡翠台
http://127.0.0.1:15808/tvm.m3u8?id=XGFeiCui
#EXTINF:-1 group-title="默认频道",明珠台
http://127.0.0.1:15808/tvm.m3u8?id=XGMingZhu`

}
