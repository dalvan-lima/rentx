import { getRepository } from "typeorm";
import { Category } from "../../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

import { Repository } from "typeorm";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  private static INSTANCE: CategoriesRepository;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    
    const category = this.repository.create({
      description,
      name
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await  this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    // O QUE ESTÁ ACONTECENDO DENTRO DO FINDONE É SELECT * FROM CATEGORIES WHERE NAME = "NAME" LIMIT 1,
    // SENDO O { NAME } O WHERE DA QUERY ACIMA
    const category = await this.repository.findOne({ name })
    return category;
  }
}

export { CategoriesRepository };
