import { Request, Response } from "express";
import { router } from "./routes/emailRouter";
import { sendEmailController } from "./controllers/emailController";
import express from "express";
import path from "path";

const app: express.Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../../client/')))
app.use(express.json());
app.use("/api/", router);

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
})
app.post('/send-email', sendEmailController);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})

