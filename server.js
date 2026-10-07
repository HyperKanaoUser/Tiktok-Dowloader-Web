const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors()); // Supaya Blogger lu diijinin akses ke sini

app.get('/download', async (req, res) => {
    const videoUrl = req.query.url;
    
    // AMBIL DARI ENVIRONMENT VARIABLE RENDER (LEBIH AMAN)
    const apiKey = process.env.RAPIDAPI_KEY; 

    const options = {
        method: 'GET',
        url: 'https://tiktok-video-downloader-api.p.rapidapi.com/media',
        params: { videoUrl: videoUrl },
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'tiktok-video-downloader-api.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        res.json({ download_url: response.data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server jalan di port ${PORT}`));