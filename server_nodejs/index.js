import express from 'express';
import dotenv from 'dotenv';
import pokeIpsumRouter from './controllers/pokeIpsumController.js';
import geradorRouter from './controllers/geradorController.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use('/pokeipsum', pokeIpsumRouter);
app.use('/gerador', geradorRouter);

app.listen(port, () => {
    console.log(`Poké Ipsum running on http://localhost:${port}`);
});
