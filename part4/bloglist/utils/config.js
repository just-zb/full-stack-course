require('dotenv').config();

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL
const TEST_MONGODB_URL = process.env.TEST_MONGODB_URL;
const SECRET = process.env.SECRET
module.exports = {
    PORT,
    MONGODB_URL,
    TEST_MONGODB_URL,
    SECRET,
}