import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import ProductModel, { ProductDocument } from "../models/product.model";

export async function createProduct(
  input: DocumentDefinition<Omit<ProductDocument, "createdAt" | "updatedAt">>
) {
  try {
    const product = await ProductModel.create(input);
    return product;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function findProducts(
  query: FilterQuery<ProductDocument>,
  option: QueryOptions = { lean: true }
) {
  return ProductModel.findOne(query, {}, option);
}

export async function findAndUpdateProduct(
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions
) {
  return ProductModel.findOneAndUpdate(query, update, options);
}

export async function deleteProduct(query: FilterQuery<ProductDocument>) {
  return ProductModel.deleteOne(query);
}
