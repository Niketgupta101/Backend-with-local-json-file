import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import routes from './routes/index.js';

const app = express();

app.use(helmet());

app.use(cookieParser());

app.use(express.json());

app.get('/ping', (req, res) => {
    res.status(201).json('OK!!');
})

app.use('/api', routes);

app.use('*', (req, res) => {
    res.status(404).json('Page Not Found !!!');
})

const port = process.env.PORT || 3002;

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));