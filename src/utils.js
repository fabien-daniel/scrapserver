/**
 * utils.js
 * =============
 * author: Fabien Daniel
 */

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
    }
}