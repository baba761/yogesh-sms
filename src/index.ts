import app from "./app";
import mongoose from "mongoose";
import "dotenv/config";

const port = process.env.PORT || 4000;

const start = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI must be defined");
    }
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to mongodb");
    } catch (error) {
        console.log(error);
    }
};

app.all("/", (req, res) => {
    res.send("<h1> It is working </h1>");
});
app.all("*", async () => {
    throw new Error("Not found");
});

app.listen(port, () => {
    console.log(`server working on ${port}`);
});
start();
