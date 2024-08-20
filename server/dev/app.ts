import { Request, Response } from "express";
import { router } from "./routes/emailRouter";
const cors = require('cors');
import express from "express";
import path from "path";
import BodyParser from "body-parser";


const app: express.Application = express();
app.use( cors() );
const PORT = process.env.PORT || 3000;
app.use( BodyParser.urlencoded({ extended: true }) );

app.use(express.static(path.join(__dirname, '../../client/')))
app.use(express.json());
app.use("/api/", router);

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../client/', 'index.html'));
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})


