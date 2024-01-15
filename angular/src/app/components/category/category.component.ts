import { Component } from '@angular/core';
import { Category } from '../../model/Category';
import { CategoryService } from '../../servico/category/category.service';
import { Task } from '../../model/Task';
import { TaskService } from '../../servico/task/task.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  task = new Task();
  category = new Category();
  
  tasks: Task[] = []
  categories: Category[] = []; 

  constructor(private service: CategoryService,
    private taskService: TaskService){}
    getAllTasks(): void {
      this.taskService.getAllTasks()
        .subscribe(retorno => this.tasks = retorno);
    }
  getAllCategories(): void {
    this.service.getAllCategories()
      .subscribe(retorno => this.categories = retorno);
  }

  getTaskByCategory(): void {
    this.service.getTaskByCategory(this.category.id)
      .subscribe(retorno => this.tasks = retorno) 
  }

  ngOnInit(){ 
    console.log(this.getTaskByCategory);
    
    this.getTaskByCategory();
    this.getAllCategories();
    this.getAllTasks();
  }
}
