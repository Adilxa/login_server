require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./router/index");
const errorMiddleware = require("./middlewares/error-middleware");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL || process.env.DEPLOYED_URL,
    })
);
app.use("/api", router);

app.use("/static", express.static("public"));

app.post("/api/generate-widget", (req, res) => {
    const { color, fontSize, width, height, boxShadow } = req.body;
    const script = `<script src="${
        process.env.DEPLOYED_URL
    }/static/widget.js?color=${encodeURIComponent(
        color || "#000"
    )}&fontSize=${encodeURIComponent(
        fontSize || "16px"
    )}&width=${encodeURIComponent(
        width || "300px"
    )}&height=${encodeURIComponent(
        height || "400px"
    )}&boxShadow=${encodeURIComponent(
        boxShadow || "0px 4px 8px rgba(0, 0, 0, 0.1)"
    )}"></script>`;
    res.json({ script });
});

// Error handling middleware
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();
