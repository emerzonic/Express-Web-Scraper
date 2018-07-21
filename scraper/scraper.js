var request = require('request'),
    cheerio = require('cheerio');


module.exports = function webScapper(cb) {
    var scrapedDataArray = [];
    var scrapedData;
    // Make a request for the news section of `ycombinator`
    // request("https://news.ycombinator.com/", function (err, response, html) {
    request("https://www.nytimes.com/section/technology?module=SectionsNav&action=click&version=BrowseTree&region=TopBar&contentCollection=Tech&pgtype=sectionfront", function (err, response, html) {
        // Load the html body from request into cheerio
        var $ = cheerio.load(html);
        // For each element with a "title" class
        // $(".title").each(function (i, element) {
            $("article").each(function(i, element) {
            // Save the text and href of each url enclosed in the current element
            // var title = $(element).children("a").text();
            // var url = $(element).children("a").attr("href");


            var url = $(element).find('a').attr('href');
            var img = $(element).find('img').attr('src');
            var title = $(element).find('h2').text();
            var summary = $(element).find('.summary').text();
            var writer = $(element).find('.byline').text();
            // If this found element had both a title and a url
            if (title && url && img && summary && writer) {
                scrapedData = {
                    title: title,
                    url: url,
                    img: img,  
                    summary: summary,  
                    writer: writer
                };
                // console.log(scrapedData);
                // push the data into the scrapedData array
                scrapedDataArray.push(scrapedData);
            }
        });
        console.log(scrapedDataArray);
        return cb(err, scrapedDataArray);
    });
};



