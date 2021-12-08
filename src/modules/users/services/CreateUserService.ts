import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import UsersRepository from '../typeorm/repositories/UsersRepository';

export interface IRequestCreatUserService {
  name: string;
  password: string;
  email: string;
}
export class CreateUserService {
  async execute({
    name,
    email,
    password,
  }: IRequestCreatUserService): Promise<Product> {
    const usersRepository =
      getCustomRepository<UsersRepository>(UsersRepository);

    const emailExists = !!(await usersRepository.findByEmail(email));

    if (emailExists) {
      throw new AppError('Email already in use by another user', 400);
    }

    const user = await usersRepository.create({
      name,
      email,
      password,
    });

    return usersRepository.save(user);
  }
}

export default CreateUserService;
