const express = require("express");
const { engine } = require('express-handlebars');
const path = require("path");
const session = require("express-session");
var SequelizeStore = require("connect-session-sequelize")(session.Store);
var sequelize = require("./config/config")
require('dotenv').config()

const userRouter = require("./router/user");
const blogRouter = require("./router/blog")
const homeRouter = require("./router/home");
const app = express();

// configuring the view engine
app.engine('hbs', engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', 'hbs');
app.set("views","./views");


sequelize.authenticate().then(function(err) {
    if (!!err) {
        console.log('Unable to connect to the database:', err)
    } else {
        console.log('Connection has been established successfully.')
    }
});
myStore = new SequelizeStore({
    db: sequelize,
}),
// configuring session
app.use(
    session({
        logged_in : false,
        secret: process.env.SECRET,
        // we support the touch method so per the express-session docs this should be set to false
        resave: false,
        saveUninitialized: true,
        cookie: {maxAge: 10 * 60 * 1000,}, //session expires in 10 min
        store : myStore,
    })
);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// bootstrap static files setting : using npm i bootstrap
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use(express.static('public'));
// routers config

app.use("/", userRouter);
app.use("/", blogRouter);
app.use("/", homeRouter);
// other setting
PORT = process.env.PORT || 3000;

// myStore.sync().catch((err)=> {console.log(err)});
// app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
// { force: true } #not good to use when hosting or production

sequelize.sync().catch((err)=> {console.log(err)})
app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));