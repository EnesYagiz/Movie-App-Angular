import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoryRepository } from '../models/categoryrepository';
import { CategoryService } from '../services/category.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CategoryService]
})
export class CategoryComponent implements OnInit {

  categories: Category[];
  selectedCategory: Category = null;
  // categoryRepository: CategoryRepository;

  constructor(private categoryService: CategoryService) {
    // this.categoryRepository = new CategoryRepository;
    // this.categories = this.categoryRepository.getCategories();
  }
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    })
  }


  displayAll:boolean = true;

  selectCategory(item?: Category) {
    if(item) {
      this.selectedCategory = item;
      this.displayAll = false;
    } else {
      this.selectedCategory = null;
      this.displayAll = true;
    }
  }

}
