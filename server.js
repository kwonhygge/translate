const express = require("express");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.post("/translate", async (req, res) => {
    const url = "https://deepl-translator.p.rapidapi.com/translate";

    try {
        const { text, source, target } = req.body;
        const data = {
            text: text,
            source: source,
            target: target,
        };

        console.log(data, 'data to send')

        const response = await axios.post(url, data, {
            headers: {
                "Content-Type": "application/json",
                "X-RapidAPI-Key": req.body["key"],
                "X-RapidAPI-Host": "deepl-translator.p.rapidapi.com",
            },
        });

        const responseData = response.data;
        console.log(responseData);
        res.json(responseData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "오류가 발생했습니다." });
    }
});

app.listen(port, () => {
    console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
