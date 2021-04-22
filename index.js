const settings = require("./settings.json");
const commands =  require("./commands.json");
const path = require("path");
const express = require("express");
const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));

const errorHandler = require('express-error-handler'),
    handler = errorHandler({
        static: {
            '404': path.join(__dirname, './views/404.html')
        }
});

app.get("/", (req, res) => {
    res.render('index', { bot: settings.website })
})

app.get("/commands", (req, res) => {
  res.render("commands", { bot: settings.website, commands: commands.commands })
})

app.get("/developers", (req, res) => {
  res.render("developers", { bot: settings.website })
})

app.use(errorHandler.httpError(404));

app.use(handler);

app.listen(4000, function () {
    console.log('Listening on port 4000');
})