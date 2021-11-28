import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

export interface IRequestUpdateProductService {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export class UpdateProductService {
  async execute({
    id,
    price,
    quantity,
    name,
  }: IRequestUpdateProductService): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    const productExists = await productsRepository.findByName(name);

    if (productExists && name !== product.name) {
      throw new AppError('There is already a product with this name', 400);
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    return await productsRepository.save(product);
  }
}

export default UpdateProductService;
