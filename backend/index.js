const express = require("express");
const router = express.Router();
const http = require("http");
const bodyParser = require("body-parser");
const socketIo = require("socket.io");
const cors = require("cors");
const updateCurrentPriceData = require("./db/price/updateCurrentPriceData");

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

// const io = socketIo.listen(server);

// const getApiAndEmit = async socket => {
//     try {
//         updateCurrentPriceData(cryptoList => {
//             socket.emit("currentDataUpdate", cryptoList);
//         });
//     } catch (error) {
//         console.error(`Error: ${error.code}`);
//     }
// };

// io.on("connection", socket => {
//     console.log("New client connected"), setInterval(() => getApiAndEmit(socket), 5000);
//     socket.on("disconect", () => console.log("Client disconnected"));
// });

// app.get("/socket", (req, res) => {
//     res.send({ response: "I am alive" }).status(200);
// });
