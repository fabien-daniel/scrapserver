/**
 * connector.senscritique.js
 * =============
 * author: Fabien Daniel
 */
var request = require('request');
var cheerio = require('cheerio');
var promise = require('promise');
var utils = require("../utils");

module.exports = {
    getFirstUrlResult: function (url) {
        return new Promise(function (resolve, reject) {
            request(url, function (error, response, html) {
                if (!error) {
                    var $ = cheerio.load(html);
                    var urlResponse;
                    $('.ProductListItem__Container-s1ci68b-0').each(function (i, elem) {
                        // -- get the url of the first result
                        var data = $(this);
                        urlResponse = $(this).find(".ProductListItem__TextContainer-s1ci68b-8").find("a").attr("href");
                        return false;
                    });
                    console.log(urlResponse);
                    if (urlResponse) {
                        resolve(urlResponse);
                    } else {
                        reject("Aucune réponse trouvée");
                    }

                } else {
                    reject("Erreur lors de la requête");
                }
            })
        })
    },
    getMediaInformation: function (url) {
        return new Promise(function (resolve, reject) {
            request(url, function (error, response, html) {
                if (!error) {
                    var json = [];
                    var $ = cheerio.load(html);
                    var imageUrl = $('.pvi-hero-poster').attr('src');
                    var title = utils.cleanText($('.pvi-product-title').attr('title'));
                    var author = utils.cleanText($('.pvi-productDetails-item').find('span').first().text());

                    console.log(imageUrl);
                    json.push({
                        "imageUrl": imageUrl,
                        "title": title,
                        "author": author
                    });
                    console.log(json);
                    resolve(json);
                } else {
                    reject("Erreur lors de la requête");
                }
            })
        });
    }
}