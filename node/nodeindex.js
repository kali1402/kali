const rp = require('request-promise');

rp('http://www.playauto.co.kr')
    .then(function (res) {
        const pattern = /"[.](.*png)"/g;
        while((result = pattern.exec(res))!=null)
        {
            console.log("www.playauto.co.kr" + result[1]);
        }
    })