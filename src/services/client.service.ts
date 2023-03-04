/** @format */

import { FilterQuery, QueryOptions } from 'mongoose';
import ClientModel, {
	Client,
	ClientDocument,
} from '../models/client.model';

export const addClient = async (client: Client) => {
	return await ClientModel.create(client);
};

export const findClients = async (
	query: FilterQuery<ClientDocument>,
	options: QueryOptions = { lean: true },
) => {
	return ClientModel.find(query, {}, options);
};
