/**
 * connector.senscritique.js
 * =============
 * author: Fabien Daniel
 */
var request = require('request');
var cheerio = require('cheerio');

module.exports = {
    // -- Build a senscritique search request
    buildSCSearchRequest: function (domain, category, query) {
        constants.SC_QUERY.q = query;
        constants.SC_QUERY["categories[0][0]"] = category;

        url = domain + "?";
        var keys = Object.keys(constants.SC_QUERY);
        keys.forEach(function (element) {
            url += element + "=" + constants.SC_QUERY[element] + "&";
        });
        return url;
    },
    getFirstUrlResult: function(url){
        request(url, function (error, response, html) {

            if (!error) {
                var json = [];
                var $ = cheerio.load(html);
                var urlResponse;
                $('.ProductListItem__Container-s1ci68b-0').each(function (i, elem) {
                    // -- get the url of the first result
                    if (i < 1) {
                        var data = $(this);
                        urlResponse = $(this).find(".ProductListItem__TextContainer-s1ci68b-8").find("a").attr("href");
                        console.log(urlResponse);
                        /*title = $(this).find(".ProductListItem__Title-s1ci68b-9").first().text();
                        console.log(title);
                        json.push({
                            "image": image,
                            "title": title
                        });
                        console.log(json);*/
                    }
                })
    
                //res.send(json);
                return urlResponse;
            } else {
                console.log("Erreur lors de la requête");
            }
        })
    }
}