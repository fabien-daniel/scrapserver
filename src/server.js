var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var _ = require("underscore.string");
var app = express();

app.get('/scrape', function (req, res) {
    console.log("let's scrap");
    url = "https://www.senscritique.com/search?categories[0][0]=Livres&q=ne%20tirez%20pas%20sur%20l%27oiseau%20moqueur&";

    request(url, function (error, response, html) {

        if (!error) {
            var json = [];

            var $ = cheerio.load(html);

            /* $('/html/body/div[2]/div[2]/div[2]/div[2]/div[1]/div[1]/div/a/h4').find($("[id^='annonce']"))unction (i, elem) {
 .each(f
             });*/

            var title, author, rating, link, image;
            $('.ProductListItem__Container-s1ci68b-0').each(function (i, elem) {
                // -- just take the first result
                if (i < 1) {
                    var data = $(this);
                    image = $(this).find("a").find("img").attr("src");
                    console.log(image);
                    title = $(this).find(".ProductListItem__Title-s1ci68b-9").first().text();
                    console.log(title);
                    json.push({ "image": image, "title": title});
                    console.log(json);
                }
            })

            res.send(html);
        } else {
            console.log("Erreur lors de la requête");
        }
    })
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

