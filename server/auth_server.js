import dotenv from "dotenv"
import express from "express";
import cors from "cors";
import { createClient } from "redis";
dotenv.config();

const app = express();
app.use(express.json()); // auto parse incoming req body stuff
app.use(cors({
    origin: "https://fauz-del.github.io/Productivity-Toolkit/",
    methods: ["POST", "GET", "OPTIONS"],
    allowedHeaders: ["content-type"]
})); // allow cross origin requests from other ports

const client = createClient({
    url: process.env.database_url
});
client.on("error", (error) => {
    globalThis.console.log(error);

    // console logging it also
    globalThis.console.log("something went wrong " + error);
});

await client.connect();

app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    // check if no exist
    if (!name || !email || !password) {
        return res.status(401).json({ error: "missing fields" });
    }

    await client.set(`user: ${email}`, JSON.stringify({ name, email, password }));
    res.status(201).json({ message: "account created successfully" });
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // grab user from our db
    const user_data = await client.get(`user: ${email}`);

    // check if user no exists
    if (!user_data) {
        return res.status(404).json({ error: "user doesnt exist" });
    }

    const user = JSON.parse(user_data);
    if (user.password !== password) {
        return res.status(401).json({ error: "wrong password" });
    }

    res.json({ message: `welcome back user ${user.name}` });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, "0.0.0.0", () => {

    // logging
    globalThis.console.log("server successfully running");
});