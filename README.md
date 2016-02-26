# Trailer Viewer

Application written in Node.JS for showing trailers from the Viaplay Content API. After reading "Please write your application in Node.JS" I decided to render the markup on the server using React. Maybe a bit too litteraly.

Happyflow only. No error handling.

* Example of movie: http://localhost:8080/web-se/film/the-wedding-ringer-2015
* Another example: http://localhost:8080/web-se/film/dude-wheres-my-car-2000

## Install and run

```zsh
# Clone repo
git clone

# Install dependencies
npm install

# Run server
npm start
```
## Some of the frameworks used in this project

### Babel
* Mainly for being able to import JSX into Node. Did not used the latest version since i have played around a bit with version 4 and version 6 is quite different. Ex. Babel is replaced with babel-cli.

### React
* Fits really good with Node.JS for server rendering of markup (and because I wanted to play around with it).

### Fetch
* Get content from other endpoints. Used this instead of "http" which I normally use in projects. Really liked fetch. Simple and promise based.

### ServeStatic
* Basic node plugins used for serving static content such as images and stylesheets.


## Some enhancements and left outs
Intentionally left out some of the graphic elements such as the IMDB logo, tags, favourites icon and footer and header links.

* Render on client as well. Currently there is only server side rendering.
* Add css processor and split css into modules as the application grows.
* Implement error handling such as catch on promises etc.
