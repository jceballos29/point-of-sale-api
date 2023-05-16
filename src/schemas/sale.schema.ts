import { TypeOf, number, object, optional, string } from 'zod';

const createSale = {
  body: object({
    device: string({
      required_error: 'Device is required',
    }),
    party: string({
      required_error: 'Party is required',
    }),
  })
}

const getSale = {
  params: object({
    id: string({
      required_error: 'Sale is required',
    })
  })
}

const getSales = {
  query: object({
    device: string({
      required_error: 'Device is required',
    })
  })
}

const updateSale = {
  params: object({
    id: string({
      required_error: 'Sale is required',
    })
  }),
  body: object({
    paymentMethod: optional(
      string({
        required_error: 'Payment method is required',
      })
    )
  })
}

const addItem = {
  params: object({
    id: string({
      required_error: 'Sale is required',
    })
  }),
  body: object({
    product: string({
      required_error: 'Product is required',
    }),
    quantity: number({
      required_error: 'Quantity is required',
    }),
    price: number({
      required_error: 'Price is required',
    }),
    discount: number({
      required_error: 'Discount is required',
    })
  })
}

const deleteItem = {
  params: object({
    id: string({
      required_error: 'Sale is required',
    }),
    itemId: string({
      required_error: 'Item is required',
      })
  }),
}

const updateItem = {
  params: object({
    id: string({
      required_error: 'Sale is required',
    }),
    itemId: string({
      required_error: 'Item is required',
      })
  }),
  body: object({
    product: string({
      required_error: 'Product is required',
    }),
    quantity: number({
      required_error: 'Quantity is required',
    }),
    price: number({
      required_error: 'Price is required',
    }),
    discount: number({
      required_error: 'Discount is required',
    })
  })
}

export const createSaleSchema = object({
  ...createSale
})

export const getSaleSchema = object({
  ...getSale
})

export const getSalesSchema = object({
  ...getSales
})

export const updateSaleSchema = object({
  ...updateSale
})

export const addItemSchema = object({
  ...addItem
})

export const deleteItemSchema = object({
  ...deleteItem
})

export const updateItemSchema = object({
  ...updateItem
})

export type CreateSaleInput = TypeOf<typeof createSaleSchema>;
export type GetSaleInput = TypeOf<typeof getSaleSchema>;
export type GetSalesInput = TypeOf<typeof getSalesSchema>;
export type UpdateSaleInput = TypeOf<typeof updateSaleSchema>;
export type AddItemInput = TypeOf<typeof addItemSchema>;
export type DeleteItemInput = TypeOf<typeof deleteItemSchema>;
export type UpdateItemInput = TypeOf<typeof updateItemSchema>;