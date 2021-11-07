import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PostCategory } from './post-category.model';
import { Category } from './category.model';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(PostCategory) private readonly postCategoryModel: typeof PostCategory,
              @InjectModel(Category) private readonly categoryModel: typeof Category) {}

  async get(id: number): Promise<Category> {
    return await this.categoryModel.findOne({
      where: {
        id
      }
    });
  }

  async append(post, category) {
    return await this.postCategoryModel.create({post_id: post.id, category_id: category})
  }
}
