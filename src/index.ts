import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { logger, stream } from './utils';
import { env, database } from './config'

import router from './routes'
import { deserialize } from './middleware';

const app: Application = express();

app.use(express.json())
app.use(
	cors({
		origin: '*',
	}),
);
app.use(helmet());
app.use(morgan('dev', { stream }));
app.use(helmet());

app.use(deserialize)

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.use('/:database', router);

const PORT = env.port;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  database();
})

