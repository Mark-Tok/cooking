const express = require('express');
const path = require('path');
const app = express();

app.get("*", (require,resolve) => {
    resolve.sendFile(path.resolve(__dirname, '../', 'pub.html'))
})

app.listen(5000, () => console.log("Server up"))