import { Request, response, Response } from 'express';
import CreateProductService from '../services/CreateProcutService';
import DeleteProductService from '../services/DeleteProductService';
import ListProductService from '../services/LIstProductService';
import ShowProductService from '../services/ShowProductService';
import UpdateProductService from '../services/UpdateProductService';

export default class ProductsController {
  async index(request: Request, response: Response): Promise<Response> {
    const listProducts = await new ListProductService().execute();

    return response.json(listProducts);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const product = await new ShowProductService().execute({ id })

    return response.json(product)
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body

    const product = await new CreateProductService().execute({ name, price, quantity })
    return response.status(201).json(product)
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body
    const { id } = request.params

    const product = await new UpdateProductService().execute({ id, name, price, quantity })
    return response.json(product)
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    await new DeleteProductService().execute({ id })
    return response.status(201).send()
  }
}
