import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

export interface IRequestCreateProductService {
  name: string;
  price: number;
  quantity: number;
}
export class CreateProductService {
  async execute({
    name,
    price,
    quantity,
  }: IRequestCreateProductService): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already a product with this name', 400);
    }

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    return productsRepository.save(product);
  }
}

export default CreateProductService;
