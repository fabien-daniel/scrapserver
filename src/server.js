var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var _ = require("underscore.string");
var app = express();

app.get('/scrape', function (req, res) {
console.log("let's scrap");
    //All the web scraping magic will happen here
    url = "https://www.senscritique.com/search?categories[0][0]=Livres&q=ne%20tirez%20pas%20sur%20l%27oiseau%20moqueur&";

    request(url, function (error, response, html) {

        if (!error) {
            var $ = cheerio.load(html);

            var json = [];

            $('//*[@id="__next"]/div[2]/div[2]/div[2]/div[1]/div[1]/div/a/h4').find($("[id^='annonce']")).each(function (i, elem) {

            });

            var title, release, rating;


            res.send('Check your console!')
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

app.listen('8081')
exports = module.exports = app;

