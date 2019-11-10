const express = require("express");
const router = express.Router();
const http = require("http");
const bodyParser = require("body-parser");
const socketIo = require("socket.io");
const cors = require("cors");
const updateCurrentPriceData = require("./db/price/updateCurrentPriceData");
const updateHistoricalPriceData = require("./db/price/updateHistoricalPriceData");

//Express Setup
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routers
const cryptoData = require("./routes/cryptoData");
app.use("/api/crypto-data", cryptoData);

const port = process.env.PORT || 5000;
let server = app.listen(port, () => console.log(`Listening on port ${port}`));
let latest_current_data = [];

const io = socketIo.listen(server);

//updates historical data every hour
updateHistoricalPriceData();
setInterval(() => {
    updateHistoricalPriceData();
}, 3600000);

//updates current data every 10 seconds
getDataEveryXSeconds(10000);

function getDataEveryXSeconds(milliseconds) {
    updateCurrentPriceData((error, cryptoList) => {
        if (error) {
            console.log(error);
        } else {
            latest_current_data = cryptoList;
        }
        setTimeout(() => {
            getDataEveryXSeconds(milliseconds);
        }, milliseconds);
    });
}

//sends latest current data to connected sockets every 10 seconds
io.on("connection", socket => {
    setInterval(() => {
        socket.emit("currentDataUpdate", latest_current_data);
    }, 10000);
    socket.on("disconect", () => console.log("Client disconnected"));
});

app.get("/socket", (req, res) => {
    res.send({ response: "I am alive" }).status(200);
});
