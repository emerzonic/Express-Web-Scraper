var request = require('request'),
    cheerio = require('cheerio');


module.exports = function webScapper(cb) {
    var scrapedDataArray = [];
    var scrapedData;
    // Make a request for the news section of `ycombinator`
    request("https://news.ycombinator.com/", function (err, response, html) {
        // Load the html body from request into cheerio
        var $ = cheerio.load(html);
        // For each element with a "title" class
        $(".title").each(function (i, element) {
            // Save the text and href of each url enclosed in the current element
            var title = $(element).children("a").text();
            var url = $(element).children("a").attr("href");
            // If this found element had both a title and a url
            if (title && url) {
                scrapedData = {
                    title: title,
                    url: url
                };
                // push the data into the scrapedData array
                scrapedDataArray.push(scrapedData);
            }
        });
        return cb(err, scrapedDataArray);
    });
};



