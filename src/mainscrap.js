var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var _ = require("underscore.string");


// url of the first page
url = "http://www.aip-immobilier.fr/recherche,basic.htm?ci=290019&idtt=2&idtypebien=2&tri=d_dt_crea";

request(url, function (error, response, html) {

    // First we'll check to make sure no errors occurred when making the request

    if (!error) {
        // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
        var $ = cheerio.load(html);

        // -- On recupere un tableau des differentes pages de listing


        // -- On parcours les reponses
        var json = [];

        $('#recherche-resultats-listing').find($("[id^='annonce']")).each(function (i, elem) {
            console.log("---------------------------------");
            var titre = cleanText($(this).find("p").first().text());
            var prix = cleanPrice($(this).find("[id^='prix']").first().text());
            var url = $(this).find("a").first().attr("href");

            console.log(titre + " - " + prix + " - " + url);
            //json.add({ titre: "+ titre + ", page: "", prix: " + prix + " });

            /*console.log(titre);
            console.log(prix);*/
        });

        // Finally, we'll define the variables we're going to capture
        var title, release, rating;

        console.log(json);

        //res.send('Check your console!')
    } else {
        console.log("Erreur lors de la requête");
    }
});

/**
 * For a listing page, extract all the properties
 * @param {*} url 
 */
function getListingResults(url) {
    request(url, function (error, response, html) {
        var $ = cheerio.load(html);
        $('#recherche-resultats-listing').find($("[id^='annonce']")).each(function (i, elem) {
            var titre = cleanText($(this).find("p").first().text());
            var prix = cleanPrice($(this).find("[id^='prix']").first().text());
            var url = $(this).find("a").first().attr("href");

            console.log(titre + " - " + prix + " - " + url);
        });
    });
}

function cleanText(text) {
    return _(text).trim().clean().replaceAll('\n', '').value();
}

function cleanPrice(price) {
    return _(price).trim().clean().replaceAll('\n', '').replaceAll('€', '').replaceAll(' ', '').replaceAll(' ', '').value();
}