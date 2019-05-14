const express = require('express');
const rq = require('request-promise');
const cheerio = require('cheerio');
const app = express();
const port = 3000;

app.get('/', function(req,res){

const options = {
    method: 'get',
    uri: 'http://www.playauto.co.kr'
};

    rq(options)
        .then(function(body){
            const $ = cheerio.load(body);
            let viewTable = `
            <table>
                <tr>
                    <td>택배사 이미지</td>
                </tr>
            </table>
            `
            const carriers = $('div#tab4 ul li');
            for (let index = 0; index < carriers.length; index++) {
                const img = carriers.eq(index).html();
                const img_url = cheerio.load(img);
                const url ='http://www.playauto.co.kr' + img_url('img').attr('src').replace('..','');
                
                viewTable += `
                <tr>
                    <td><img src='${url}'></td>
                </tr>
                `;
            }
            viewTable += '</table>';
            res.send(viewTable);
        });
})

app.listen(port, function(){
    console.log('d');
})