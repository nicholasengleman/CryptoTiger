import app from "./app";

import bodyParser from "./middlewares/bodyParser";
app.use(bodyParser);

import cors from "./middlewares/allowCrossDomain";
app.use(cors);
