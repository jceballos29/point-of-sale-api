import { TypeOf, object, string } from 'zod';

const params = {
  params: object({
    id: string({
      required_error: 'Id is required',
    }),
  }),
}

const payload = {
  body: object({
    name: string({
      required_error: 'Name is required',
    })
  })
}

export const createGroupSchema = object({
  ...payload
})

export const updateGroupSchema = object({
  ...params,
  ...payload
})

export const getGroupSchema = object({
  ...params
})

export const deleteGroupSchema = object({
  ...params
})

export type CreateGroupInput = TypeOf<typeof createGroupSchema>;
export type UpdateGroupInput = TypeOf<typeof updateGroupSchema>;
export type GetGroupInput = TypeOf<typeof getGroupSchema>;
export type DeleteGroupInput = TypeOf<typeof deleteGroupSchema>;