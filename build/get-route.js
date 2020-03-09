var request = require('request');
var fs = require("fs");
var path = 'https://talk.vtaiwan.tw/c/meta-data.json';
let file_name = './build/prerender-route.json';
let prerender_json = {} /* output to prerender-route.json */
let routes = [ /* array for all routes */
    '/',
    '/how-to-use',
    '/intro',
    '/search',
    '/contactus',
    '/subscribe'
]
var headers = {
    'User-Agent': 'Super Agent/0.0.1',
    'Content-Type': 'application/x-www-form-urlencoded'
}
var opts = {
    url: path,
    method: 'GET',
    headers: headers
}
request(opts, function(error, response, results) {
    if (!error && response.statusCode == 200) {
        var res = JSON.parse(results);
        length = res.topic_list.topics.length;
        for (var i = 0; i < length; i++) {
            var title = res.topic_list.topics[i].title;
            var chk = title.lastIndexOf(' ');
            var pinned = res.topic_list.topics[i].pinned;
            if (chk > -1 && pinned == false) {
                title = title.substring(chk + 1, title.length);
                routes.push("/topic/" + title)
            }
        }
        prerender_json.routes = routes
        fs.writeFile(file_name, JSON.stringify(prerender_json, null, '\t'), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    } else {
        console.log('get topic list error=' + error + ' ' + response.statusCode);
    }
})