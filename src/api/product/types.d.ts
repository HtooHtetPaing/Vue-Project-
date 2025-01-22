export type ProductType = {
  productID: string,
  productName: string,
  stock : number,
  sellingPrice: number,
  profitPerItem: number,
  createdTime: string,
  updatedTime: string,
  createdBy: string,
  updatedBy: string,
  activeFlag: boolean
}

export type ProductInputType = {
   productID: string,
   productName: string,
   stock: number,
   sellingPrice: number,
   profitPerItem: number
}

export type CartType = {
    productID: string,
  productName: string,
  stock : number,
  sellingPrice: number,
  profitPerItem: number,
  quantity: number
}

export type CartInputType = {
    orderID: string,
    productID: string,
    quantity: number
}

export type ProductDeleteType = {
    productID: string
}