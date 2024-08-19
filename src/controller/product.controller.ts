import { Response, Request } from "express";
import {
  CreateProductInput,
  DeleteProductInput,
  GetProductInput,
  UpdateProductInput,
} from "../schema/product.schema";
import {
  createProduct,
  findProducts,
  findAndUpdateProduct,
  deleteProduct,
} from "../service/product.service";

export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._doc._id;
  const body = req.body;
  const product = await createProduct({ ...body, user: userId });
  return res.send(product);
}

export async function getProductHandler(
  req: Request<GetProductInput["params"]>,
  res: Response
) {
  const productId = req.params.productId;
  const product = await findProducts({ productId });
  if (!product) {
    return res.sendStatus(404);
  }
  return res.send(product);
}

export async function updateProductHandler(
  req: Request<UpdateProductInput["params"]>,
  res: Response
) {
  const user = res.locals.user._doc._id;
  const productId = req.params.productId;
  const update = req.body;
  const product = await findProducts({ productId });
  if (!product) {
    return res.sendStatus(404);
  }
  if (String(product.user) !== String(user)) {
    return res.sendStatus(403);
  }
  const updatedProduct = await findAndUpdateProduct({ productId }, update, {
    new: true,
  });
  return res.send(updatedProduct);
}

export async function deleteProductHandler(
  req: Request<DeleteProductInput["params"]>,
  res: Response
) {
    const user = res.locals.user._doc._id;
    const productId = req.params.productId;
    const product = await findProducts({ productId });
    if (!product) {
      return res.sendStatus(404);
    }
    if (String(product.user) !== String(user)) {
      return res.sendStatus(403);
    }
    await deleteProduct({ productId });
    return res.sendStatus(200);
}
