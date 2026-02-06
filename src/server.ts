import express from "express";
import AuthRouter from "./routes/auth.route";
import { errorHandlerMiddleware } from "./middleware/error-handler.middleware";
import ProductRouter from "./routes/product.route";
import OrderRouter from "./routes/order.route";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/auth", AuthRouter);

app.use("/products", ProductRouter);

app.use("/orders", OrderRouter);

app.use(errorHandlerMiddleware);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

