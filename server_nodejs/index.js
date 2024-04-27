import express from 'express';
import dotenv from 'dotenv';
import pokeIpsumRouter from './controllers/pokeIpsumController.js';
import geradorRouter from './controllers/geradorController.js';
import cors from 'cors'
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

app.use(express.json());
app.use(cors(corsOptions));
app.use('/pokeipsum', pokeIpsumRouter);
app.use('/gerador', geradorRouter);

app.listen(port, () => {
    console.log(`Poké Ipsum running on http://localhost:${port}`);
});
