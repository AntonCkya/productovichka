export interface ProductsInterface {
    products: ProductItem[],
    total_count: number,
}

export interface ProductItem {
    id: number,
    name: string,
    description: string,
    price: number,
    type: string,
    score: number,
}
