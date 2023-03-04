/** @format */

import { FilterQuery, ProjectionFields, QueryOptions } from 'mongoose';
import warehouseModel, {
	Warehouse,
	WarehouseDocument,
} from '../models/warehouse.model';

export const addWarehouse = async (warehouse: Warehouse) => {
	return await warehouseModel.create(warehouse);
};

export const findWarehouse = async (
	query: FilterQuery<WarehouseDocument>,
  projection: ProjectionFields<WarehouseDocument>,
	options: QueryOptions = { lean: true },
) => {
	return warehouseModel.findOne(query, projection, options);
};

export const findWarehouses = async (
	query: FilterQuery<WarehouseDocument>,
  projection: ProjectionFields<WarehouseDocument>,
	options: QueryOptions = { lean: true },
) => {
	return warehouseModel.find(query, projection, options);
};
