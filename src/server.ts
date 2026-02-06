import express from "express";
import AuthRouter from "./routes/auth.route";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/auth", AuthRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

