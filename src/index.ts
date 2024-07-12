import "dotenv/config";
import express from "express";
import messagesRouter from "./router/messagesRouter";

const app = express();
const port = process.env.PORT || 3000;
const apiRoute = process.env.API_URL as string;

app.use(express.json());

app.use(apiRoute, messagesRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
