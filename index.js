const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const {
    cliId,
    prefix,
    token
} = require('./config/config.json')

const zingCfg = require('./config/zingmp3api.json')

let http = require('request')
let iconv = require('iconv-lite');

client.once('ready', () => {
    console.log('Onii chan em đã chạy rồi nè !');
});

/**
 * Return timestamp
 */
let timeNow = Date.now || function () {
    return +new Date;
};

let cfg = {
    "inselectsong": false,
    "songs": []
}

/**
 * Lấy link MP3 Zing
 */


client.on('message', message => {
    // console.log(mes.content)
    if (message.content.startsWith(`${prefix}play`) || message.content.startsWith(`${prefix}sing`)) {

        let songname = message.content.substr("s.sing".length)

        if (songname) {

            /**
             * 
             * Tham gia voice channel
             */
            if (message.member.voiceChannel) {
                message.member.voiceChannel.join()
                // .then(connection => { // Connection is an instance of VoiceConnection
                //     message.reply("OK em hát cho nghe nè 💓 ")
                // })
                // .catch(console.log);
            } else {
                message.reply('Vào đi rồi em mới vào, tắt mic = gay nha XD');
            }

            /**
             * Tìm kiếm bài hát và gửi lại list cho người dùng
             */
            let name = encodeURI(songname)

            let urlApi = zingCfg.api_url + '?q=' + name + "&ctime=1580927808&sig=" + zingCfg.sig + "&api_key=" + zingCfg.api_key

            http.get({
                    "headers": {
                        "Sec-Fetch-Site": "cross-site",
                        "Sec-Fetch-Mode": "cors",
                        "Accept-Encoding": "gzip, deflate, br",
                        "Accept-Language": "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
                        "Accept": "*/*",
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36",
                        "Cookie": "	_zlang=vn; __zi=2000.SSZzejyD0jSbZUgxWaGPoJIFlgNCIW6BQ9sqkzu84vrxtklztWrVq7tIw_xT15-UUDRjkjm4NfTzq-wuC0.1; visitorId=2000.SSZzejyD0jSbZUgxWaGPoJIFlgNCIW6BQ9sqkzu84vrxtklztWrVq7tIw_xT15-UUDRjkjm4NfTzq-wuC0.1; _ga=GA1.2.849683028.1580916858; _gid=GA1.2.649969061.1580916858; session_key=; _fbp=fb.1.1580916860706.23961274; adtimaUserId=2000.SSZzejyD0jSbZUgxWaGPoJIFlgNCIW6BQ9sqkzu84vrxtklztWrVq7tIw_xT15-UUDRjkjm4NfTzq-wuC0.1; fuid=2bc1a334b6ff2c3c69803567337ad18f; fpsend=146381; __gads=ID=f3b0160026926ca8:T=1580927790:S=ALNI_Mb73vPNTGLMamACvl4I0-FiRCFZ3g"
                    },
                    uri: urlApi,
                    gzip: true
                },

                function (err, resp, body) {
                    let DataJson = JSON.parse(body);
                    let stt = 1;
                    let Songs = [];
                    cfg.songs = DataJson.data.song.items;

                    if (!DataJson.data.song.items) {
                        message.reply("Không có bài nào tên tương tự >~< Baka !!! ")
                        return 0
                    }

                    DataJson.data.song.items.forEach(e => {
                        Songs.push(stt + " => " + e.title)
                        stt++
                    });

                    message.channel.send("Chọn bài đi nè [ZingMP3] [Phiên sẽ kết thúc trong 1 phút]:")


                    message.channel.send(Songs)

                    /**
                     * Bắt đầu chọn bài
                     */
                    cfg.inselectsong = true;

                    setTimeout(() => {

                        if (cfg.inselectsong) {

                            message.channel.send("Chậm quá thôi bỏ đi >~< ")
                            cfg.inselectsong = false

                        }

                    }, 60 * 1000);

                });

        } else
            message.channel.send("Tên bài là gì nè ? ví dụ : s.sing <tên bài hát> 💓")

    }

    if (!isNaN(message.content) && (cfg.inselectsong == true)) {

        songID = parseInt(message.content)

        if (songID > 0 && songID < 6) {

            let theSong = (Object.entries(cfg.songs))[songID - 1][1];
            var songUrl;
            message.channel.send("Em hát bài " + theSong.title + " cho nè 💓💓💓")
            // console.log(Object.entries(cfg.songs))
            cfg.inselectsong = false

            let mp3Api = zingCfg.mp3Url + '?id=' + theSong.id + "&ctime=1580935007&sig=" + zingCfg.mp3Sig + "&api_key=" + zingCfg.api_key

            /**
             * Stream audio
             */
            http.get({
                    "headers": {
                        "Sec-Fetch-Site": "cross-site",
                        "Sec-Fetch-Mode": "cors",
                        "Accept-Encoding": "gzip, deflate, br",
                        "Accept-Language": "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
                        "Accept": "*/*",
                        "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Mobile Safari/537.36",
                        "Cookie": "	_zlang=vn; __zi=2000.SSZzejyD0jSbZUgxWaGPoJIFlgNCIW6BQ9sqkzu84vrxtklztWrVq7tIw_xT15-UUDRjkjm4NfTzq-wuC0.1; visitorId=2000.SSZzejyD0jSbZUgxWaGPoJIFlgNCIW6BQ9sqkzu84vrxtklztWrVq7tIw_xT15-UUDRjkjm4NfTzq-wuC0.1; _ga=GA1.2.849683028.1580916858; _gid=GA1.2.649969061.1580916858; session_key=; _fbp=fb.1.1580916860706.23961274; adtimaUserId=2000.SSZzejyD0jSbZUgxWaGPoJIFlgNCIW6BQ9sqkzu84vrxtklztWrVq7tIw_xT15-UUDRjkjm4NfTzq-wuC0.1; fuid=2bc1a334b6ff2c3c69803567337ad18f; fpsend=146381; __gads=ID=f3b0160026926ca8:T=1580927790:S=ALNI_Mb73vPNTGLMamACvl4I0-FiRCFZ3g"
                    },
                    uri: "https://m.zingmp3.vn/bai-hat/Yeu-Motq%C6%B0ong%C3%A1dg/" + theSong.id + ".html#!",
                    gzip: true
                },

                function (err, resp, body) {
                    let data = /\/media\/get-source\?type=audio&key=([a-zA-Z0-9]+)/g.exec(body)
                    let key = data[1]


                    /**
                     * Get MP3 URL
                     */
                    http.get({
                            "headers": {
                                "Sec-Fetch-Site": "cross-site",
                                "Sec-Fetch-Mode": "cors",
                                "Accept-Encoding": "gzip, deflate, br",
                                "Accept-Language": "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
                                "Accept": "*/*",
                                "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Mobile Safari/537.36",
                                "Cookie": "	_zlang=vn; __zi=2000.SSZzejyD0jSbZUgxWaGPoJIFlgNCIW6BQ9sqkzu84vrxtklztWrVq7tIw_xT15-UUDRjkjm4NfTzq-wuC0.1; visitorId=2000.SSZzejyD0jSbZUgxWaGPoJIFlgNCIW6BQ9sqkzu84vrxtklztWrVq7tIw_xT15-UUDRjkjm4NfTzq-wuC0.1; _ga=GA1.2.849683028.1580916858; _gid=GA1.2.649969061.1580916858; session_key=; _fbp=fb.1.1580916860706.23961274; adtimaUserId=2000.SSZzejyD0jSbZUgxWaGPoJIFlgNCIW6BQ9sqkzu84vrxtklztWrVq7tIw_xT15-UUDRjkjm4NfTzq-wuC0.1; fuid=2bc1a334b6ff2c3c69803567337ad18f; fpsend=146381; __gads=ID=f3b0160026926ca8:T=1580927790:S=ALNI_Mb73vPNTGLMamACvl4I0-FiRCFZ3g"
                            },
                            uri: "https://m.zingmp3.vn/xhr/media/get-source?type=audio&key=" + key,
                            gzip: true
                        },

                        function (err, resp, body) {
                            // console.log("https:" + JSON.parse(body).data.source["128"])

                            const broadcast = client.createVoiceBroadcast();
                            broadcast.playStream("https:" + JSON.parse(body).data.source["128"])
                            // Play "music.mp3" in all voice connections that the client is in
                            for (const connection of client.voiceConnections.values()) {
                                connection.playBroadcast(broadcast)
                            }



                        })

                })

        }


    }

    // if (message.content.startsWith(`${prefix}run`)) {
    //     const broadcast = client.createVoiceBroadcast();
    //     broadcast.playFile("./music.mp3")
    //     // Play "music.mp3" in all voice connections that the client is in
    //     for (const connection of client.voiceConnections.values()) {
    //         connection.playBroadcast(broadcast)
    //     }
    // }

    //  JOIN CHANNEL
    if (message.content.startsWith(`${prefix}join`))
        message.member.voiceChannel.join()

    // LEAVE CHANNEL
    if (message.content.startsWith(`${prefix}leave`))
        message.member.voiceChannel.leave()

    // Say function
    if (message.content.startsWith(`${prefix}say`)) {
        // Get all msg data
        msg = message.content
        // Get content
        var dataSay = msg.substr("h!play".length)
        // Send say
        message.channel.send(dataSay)
        // log mes & author in terminal
        console.log(message.author + ': send : ' + msg)
        // Delete msg
        message.delete()
    }
    if (message.isMemberMentioned(client.user)) {
        message.channel.send('Hai!! Sukidesuyo!!!')
    }

    if (message.content.startsWith(`${prefix}help`)) {
        message.channel.send("Haii~~~ ! Gohan wo taberu? Ofuro ni suru? Soretomo, wa. ta. shi >w< ")
    }

    // Clear msgs

    // Join & play music

    // kick member

    // Ban member

    // register ani4vn account

    // pushchage premium

    // forgot user password

    /**
     * Tự động out khi chỉ còn một mình bot sau 10p
     */
    setInterval(() => {
        console.log(message.member.voiceChannel.members.size)
        if (message.member.voiceChannel.members.size == 1) {
            message.member.voiceChannel.leave()
        }
    }, 600 * 1000)

})

client.login(token);