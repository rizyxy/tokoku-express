import express from "express";
import AuthRouter from "./routes/auth.route";
import { errorHandlerMiddleware } from "./middleware/error-handler.middleware";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/auth", AuthRouter);

app.use(errorHandlerMiddleware);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

