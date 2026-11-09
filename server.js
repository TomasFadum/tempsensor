
const express = require("express");
const axios = require("axios");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Forsiden skal alltid være Temp_prosjekt_gruppe5.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "Temp_prosjekt_gruppe5.html"));
});

// Hent temperatur fra Blynk
app.get("/api/temperature", async (req, res) => {
    try {
        const response = await axios.get(
            "https://blynk.cloud/external/api/get",
            {
                params: {
                    token: process.env.BLYNK_AUTH_TOKEN,
                    [process.env.BLYNK_PIN]: ""
                }
            }
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

// Gjør de andre HTML-filene tilgjengelige
app.use(express.static(__dirname, { dotfiles: "deny" }));

app.listen(PORT, () => {
    console.log(`Nettsiden kjører på http://localhost:${PORT}`);
});
