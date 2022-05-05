const settings = require("./settings.json");
const commands = require("./commands.json");
const path = require("path");
const express = require("express");
const app = express();
const Topgg = require('@top-gg/sdk')
app.set('view engine', 'ejs');
app.use(express.static("public"));

const errorHandler = require('express-error-handler'),
  handler = errorHandler({
    static: {
      '404': path.join(__dirname, './views/404.html')
    }
  });

const api = new Topgg.Api(process.env.top);

app.get("/", async (req, res) => {
  let stats = await api.getStats('723112579584491571').catch(() => { });
  if (!stats) {
    stats = { serverCount: '3700+' }
  }
  res.render('index', { bot: settings.website, stats: stats })
})

app.get("/commands", (req, res) => {
  res.render("commands", { bot: settings.website, commands: commands.commands })
})

app.get("/developers", (req, res) => {
  res.render("developers", { bot: settings.website })
})

app.get("/thankyou", (req, res) => {
  res.render("thankyou", { bot: settings.website })
})

app.get("/credits", (req, res) => {
  res.render("credits", { bot: settings.website })
})

app.get("/legal", (req, res) => {
  res.render("legal", { bot: settings.website })
})

app.use(errorHandler.httpError(404));

app.use(handler);

app.listen(4000, function() {
  console.log('Listening on port 4000');
})