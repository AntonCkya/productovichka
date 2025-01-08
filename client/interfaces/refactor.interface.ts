export interface BaseArguments {
    router: any,
    setIsLoading: (e: boolean) => void,
}

export interface AddArguments extends BaseArguments {
    name: string,
    description: string,
    price: string,
    type: string,
    setErrName: (e: boolean) => void,
    setErrDescription: (e: boolean) => void,
    setErrPrice: (e: boolean) => void,
    setErrType: (e: boolean) => void,
}

export interface RemoveArguments extends BaseArguments {
    productId: string,
    setErrProductId: (e: boolean) => void,
}
