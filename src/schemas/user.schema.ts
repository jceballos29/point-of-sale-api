import { object, string, TypeOf, optional, array } from 'zod';

const params = {
	params: object({
		id: string({
			required_error: 'Id is required',
		}),
	}),
};

export const createUserSchema = object({
	body: object({
		name: string({
			required_error: 'Name is required',
		}),
		username: string({
			required_error: 'Username is required',
		}),
		email: string({
			required_error: 'Email is required',
		}),
		password: string({
			required_error: 'Password is required',
		}).min(6, 'Password too short'),
		groups: array(
			string({
				required_error: 'Group is required',
			}),
		),
	}),
});

export const updateUserSchema = object({
	...params,
	body: object({
		name: optional(
			string({
				required_error: 'Name is required',
			}),
		),
		username: optional(
			string({
				required_error: 'Username is required',
			}),
		),
		email: optional(
			string({
				required_error: 'Email is required',
			}),
		),
		password: optional(
			string({
				required_error: 'Password is required',
			}).min(6, 'Password too short'),
		),
		groups: optional(
			array(
				string({
					required_error: 'Group is required',
				}),
			),
		),
	}),
});

export const deleteUserSchema = object({
	...params,
});

export const getUserSchema = object({
	...params,
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>;
export type GetUserInput = TypeOf<typeof getUserSchema>;
