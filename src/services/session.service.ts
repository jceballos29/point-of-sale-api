/** @format */

import { FilterQuery, ProjectionFields, QueryOptions } from 'mongoose';
import SessionModel, { Session, SessionDocument } from '../models/session.model';

export const createSession = async (
  session: Session
) => {
	return await SessionModel.create(session);
};

export const getSession = async (id: string) => {
  return await SessionModel.findById(id);
};

export const findSession = async (
  query: FilterQuery<SessionDocument>,
	projection: ProjectionFields<SessionDocument>,
	options: QueryOptions = { lean: true },
) => {
  return await SessionModel.findOne(query, projection, options);
}

export const closeSession = async (id: string) => {
  return await SessionModel.findByIdAndUpdate(id, { valid: false });
};
