/**
 * utils.js
 * =============
 * author: Fabien Daniel
 */
var _ = require("underscore.string");
var constants = require("./constants");

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
    throwError: function (response, errorCode, errorMessage) {
        var json = [];
        json.push({
            "erreur": errorMessage
        });
        response.status(errorCode).send(json);
    },
    cleanText: function (text) {
        return _(text).trim().clean().replaceAll('\n', '').value();
    }
}