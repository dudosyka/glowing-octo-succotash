import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostCategory } from './post-category.model';
import { Category } from './category.model';

@Module({
  imports: [
    SequelizeModule.forFeature([PostCategory, Category])
  ],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModule {}
