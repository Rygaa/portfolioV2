const express = require('express')
const path = require('path')
const app = express();

const PORT = process.env.PORT || 9999

app.use(express.static('build'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
})

app.listen(PORT, () => {
    console.log('Server listening to', PORT);
})


