import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/products", (req, res) => {
    res.send("Server is ready");
});

console.log(process.env.MONGO_URI);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});