import config from 'config';
import express from 'express';
import deserializeUser from './middleware/deserialize-user';
import routes from './routes';
import connect from './utils/connect';
import logger from './utils/logger';

const port = config.get<number>('port');
const url = config.get<string>('url');

const app = express();

app.use(express.json());
app.use(deserializeUser);


app.listen(port, async () => {
    logger.info(`Server started on port ${url}`);
    await connect();
    routes(app);
});

app.get('/',(req, res) => {
    res.send('Hello World')
});