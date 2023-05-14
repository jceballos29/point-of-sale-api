import { FilterQuery, QueryOptions } from 'mongoose';
import PartyModel, { PartyDocument } from '../models/party.model';

export const find = async (
  query: FilterQuery<PartyDocument>,
  options: QueryOptions = { lean: true },
) => {
  return await PartyModel.find(query, null, options);
}