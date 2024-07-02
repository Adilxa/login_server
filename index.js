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
        origin: process.env.CLIENT_URL,
    })
);
app.use("/api", router);

app.use("/static", express.static("public"));

// Endpoint to generate the widget script
app.post("/api/generate-widget", (req, res) => {
    const { widgetId } = req.body;
    const script = `<script src="http://localhost:${PORT}/static/widget.js?widgetId=${widgetId}"></script>`;
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
