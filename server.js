
const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/api/temperature", async (req, res) => {
    try {
        const response = await axios.get(
            `https://blynk.cloud/external/api/get?token=${process.env.BLYNK_AUTH_TOKEN}&${process.env.BLYNK_PIN}`
        );

        res.json({
            temperature: Number(response.data),
            success: true
        });

    } catch (error) {
        console.error("Feil ved henting fra Blynk:", error.message);

        res.status(500).json({
            success: false,
            error: "Kunne ikke hente temperatur fra Blynk"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Nettsiden kjører på http://localhost:${PORT}`);
});