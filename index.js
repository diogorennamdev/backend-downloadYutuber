const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = 5000;

app.get('/download', async (req, res) => {
  try {
    const videoUrl = req.query.url;
    const info = await ytdl.getInfo(videoUrl);
    
    res.header('Content-Disposition', `attachment; filename="${info.videoDetails.title}.mp3"`);
    ytdl(videoUrl, { filter: 'audioonly' }).pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao processar a solicitação.');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
