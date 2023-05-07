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

export const createCategorySchema = object({
  ...payload
})

export const updateCategorySchema = object({
  ...params,
  ...payload
})

export const getCategorySchema = object({
  ...params,
})

export const deleteCategorySchema = object({
  ...params
})

export type CreateCategoryInput = TypeOf<typeof createCategorySchema>;
export type UpdateCategoryInput = TypeOf<typeof updateCategorySchema>;
export type GetCategoryInput = TypeOf<typeof getCategorySchema>;
export type DeleteCategoryInput = TypeOf<typeof deleteCategorySchema>;