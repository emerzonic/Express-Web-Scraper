# Express Web Scrapper

This is an Express application built using MongoBD for database, Express js for server-side routing and Node js framework. The app is fetching data from the New York Times website. 

* The app's Get Article route initiates a server-side logic that utilizes the NPM's request and cheerio packeges to scrape of tech news from the New York Time website. The json response is then manipulated and rendered back to the client-side and displayed for the user in a polished Semantic UI page using Handlebars. 

* Users will have to be authenticated in order to save an articule. This ensures that saved articles are associated with users in the database. When a user saves an article, the frontend data is formulated into a JavaScript object and a post request is sent to the express server to save the data into MongoDB using Mongoose ODM.

* Users can view their saved articles any time when they log in. When a user goes to the app "My Saved Articles" route, a get request is made to the database for all articles that match the current user.

* Users can also delete an article from their saved articles. When a delete request is made by the user for a particular article, the articlue's id is sent via a delete request that uses mongoose's findByIdAndRemove method to delete the article.

### Get all the latest tech news [here](https://dry-plains-35717.herokuapp.com/home)


