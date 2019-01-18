var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var _ = require("underscore.string");
var constants = require("./constants");
var utils = require("./utils");
var senscritique = require("./connector/connector.senscritique");

var app = express();

app.post('/books', function (req, res) {
    // -- Build search url
    var searchUrl = utils.buildSCSearchRequest(constants.SC_URL_SEARCH, constants.SC_BOOKS, req.query.q);
    var bookUrl = senscritique.getFirstUrlResult(searchUrl);
    
   /* request(url, function (error, response, html) {

        if (!error) {
            var json = [];
            var $ = cheerio.load(html);
            var url;
            $('.ProductListItem__Container-s1ci68b-0').each(function (i, elem) {
                // -- get the url of the first result
                if (i < 1) {
                    var data = $(this);
                    image = $(this).find("img").attr("src");
                    console.log(image);
                    title = $(this).find(".ProductListItem__Title-s1ci68b-9").first().text();
                    console.log(title);
                    json.push({
                        "image": image,
                        "title": title
                    });
                    console.log(json);
                }
            })

            res.send(json);
        } else {
            console.log("Erreur lors de la requête");
        }
    })*/
})





function cleanText(text) {
    return _(text).trim().clean().replaceAll('\n', '').value();
}

function cleanPrice(price) {
    return _(price).trim().clean().replaceAll('\n', '').replaceAll('€', '').replaceAll(' ', '').value();
}

/*

Exemple de json attendu :

{
    "attachments": [
        {

            "author_name": "George Orwell",
            "title": "1984",
            "title_link": "https://www.senscritique.com/film/Les_Delices_de_Tokyo/12986407",
            "thumb_url": "https://media.senscritique.com/media/000013029587/95x130/Les_Delices_de_Tokyo.jpg"
        }
    ]
}
*/

app.listen('8081')
exports = module.exports = app;