const dotenv = require('dotenv');

dotenv.config({ path: "./config.env" });

const app = require('./app');
const mongoose = require('mongoose');


mongoose.connect(process.env.DATABASE_CONNECTION)
    .then(() => console.log('Database is connected successfully'))
    .catch((err) => console.log(err))

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
})
