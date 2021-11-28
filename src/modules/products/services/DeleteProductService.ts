import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

export interface IRequestDeleteProductService {
  id: string;
}

export class DeleteProductService {
  async execute({ id }: IRequestDeleteProductService): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      console.log('aaaa');
      throw new AppError('Product not found', 404);
    }

    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
