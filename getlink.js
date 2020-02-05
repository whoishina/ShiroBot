let http = require("request")

function getZingMp3URL(id) {

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
            uri: "https://m.zingmp3.vn/bai-hat/Yeu-Motq%C6%B0ong%C3%A1dg/" + id + ".html#!",
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
                    console.log("https:" + JSON.parse(body).data.source["128"])
                })

        })
}

getZingMp3URL('ZWB0ZUDO')