var express = require('express');
var constants = require("./constants");
var utils = require("./utils");
var senscritique = require("./connector/connector.senscritique");

var app = express();

app.post('/books', (req, res) => {
    // -- Build search url and extract information of the first result
    var searchUrl = utils.buildSCSearchRequest(constants.SC_URL_SEARCH, constants.SC_BOOKS, req.query.q);
    senscritique.getFirstUrlResult(searchUrl).then((bookUrl) => {
        senscritique.getMediaInformation(bookUrl).then((json) => {
            res.send(json);
        }, (errorMessage) => {
            utils.throwError(res, 404, errorMessage);
        })
    }, (errorMessage) => {
        utils.throwError(res, 404, errorMessage);
    });
})


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