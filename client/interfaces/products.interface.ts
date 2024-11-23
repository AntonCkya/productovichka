export interface ProductsInterface {
    products: ProductItem[],
    total_count: number,
    limit: number,
    offset: number,
}

export interface ProductItem {
    id: number,
    name: string,
    description: string,
    price: number,
    photo: string,
    type :string,
}
