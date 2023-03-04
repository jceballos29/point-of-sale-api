/** @format */

import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import config from './config';
import connectDB from './config/database';
import log from './libs/logger';

import authRoutes from './routes/auth.routes';
import categoryRoutes from './routes/category.routes';
import clientRoutes from './routes/client.routes';
import productRoutes from './routes/product.routes';
import userRoutes from './routes/user.routes';
import warehouseRoutes from './routes/warehouse.routes';

import deserialize from './middleware/deserialize';

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(deserialize);

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/warehouses', warehouseRoutes);

app.get('/health', (_req, res) => {
	res.sendStatus(200);
});

// Start Server
const PORT = config.port;

app.listen(PORT, () => log.info(`Server started on port ${PORT}`));
