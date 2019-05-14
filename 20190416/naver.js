const express = require('express');
const rq = require('request-promise');
const cheerio = require('cheerio');
const app = express();
const port = 3000;

app.get('/', function(req,res){

    let options = {
        method: 'GET',
        uri: 'https://datalab.naver.com/keyword/realtimeList.naver',
        headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36'
        },
        form: ''
        };

    rq(options)
        .then(function(body){
        const code = cheerio.load(body);

        let viewTable = `
        <center>
        <table border='1' style='color:blue;'>
        <tr>
        <td>급상승검색어 전체 연령대</td>
        </tr>
        </center>
        `;
        const all = code("div[data-age='all']");

        const keywords = cheerio.load(all.html());
        const $ = keywords('span.title');
    
        for (let index = 0; index < $.length; index++) {
        const keyword = $.eq(index).text();
        
        viewTable += `
        <tr>
        <td>${keyword}</td>
        </tr>
        `;
        }

        viewTable += `</table>`;
        res.send(viewTable);;

        options = {
            method: 'post',
            uri: 'https://hooks.slack.com/services/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',
            body: {
                text: ' '
            },
            json: true
        };

        return rq(options);
        })
        .then(function(resultData){
            console.log(resultData);
        })
});
app.listen(port, function(){
    console.log('네이버 실시간 검색어');
})