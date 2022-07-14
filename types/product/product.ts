import {ProductEntity} from "./product.entity";

export type CreateProductReq = Omit<ProductEntity, "id">;
export interface TakeSingleProductRes {
    product: ProductEntity;

}



