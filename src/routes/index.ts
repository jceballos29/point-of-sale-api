import { Request, Response, Router } from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';
import { logger } from '../utils';

const router = Router();
const PATH_ROUTER = __dirname;

const cleanFileName = (filename: string) =>
	filename.split('.').shift() || '';

const getRoutes = (path: string) =>
	readdirSync(path)
		.map(cleanFileName)
		.filter((name) => name && name !== 'index');

const routes = getRoutes(PATH_ROUTER);

routes.forEach(async (route) => {
	try {
		const path = await import(join(PATH_ROUTER, `${route}.routes`));
		if (path) {
			logger.info(`Route ${route} loaded`);
			router.use(`/${route}`, path.default);
		}
	} catch (error: any) {
		logger.error(error);
	}
});


export default router;
