import { Component } from '@angular/core';
import { Task } from '../../model/Task';
import { TaskService } from '../../servico/task/task.service';
import { Category } from '../../model/Category';
import { CategoryService } from '../../servico/category/category.service';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  task = new Task();
  category = new Category();

  //json de task
  tasks: Task[] = []
  categories: Category[] = [];

  //construtor
  constructor(private service: TaskService,
    private categoryservice: CategoryService) { }

  //metodo de listagem
  getAllTasks(): void {
    this.service.getAllTasks()
      .subscribe(retorno => this.tasks = retorno);
  }

  getAllCategories(): void {
    this.categoryservice.getAllCategories()
      .subscribe(retorno => this.categories = retorno);
  }
  
  //metodo de cadastro
  createTask(): void {
    this.service.createTask(this.task)
      .subscribe(retorno => {
        this.tasks.push(retorno);
        this.task = new Task();
        alert("Task created successfully!");
      }/* , err => {
        if(err.error.error.match('Category not found')){
          alert(err.error.error)
        }
      }*/) ;
  }
  
  //metodo de alteração
  updateTask(): void{
    this.service.updateTask(this.task)
    .subscribe(retorno => { 

      //obter posição do vetor onde está o cliente
      let position = this.tasks.findIndex(obj => {
        return obj.id == retorno.id;
      })

      //alterar os dados do cliente no vetor
      this.tasks[position] = retorno;

      alert('Task alterada com sucesso!')
    });
  }

  //metodo de remoção
  deleteTask(): void{
    this.service.deleteTask(this.task.id)
    .subscribe(retorno => { 

      //obter posição do vetor onde está o cliente
      let position = this.tasks.findIndex(obj => {
        return obj.id == this.task.id;
      })

      //remover cliente no vetor
      this.tasks.splice(position, 1);

      alert('Task removida com sucesso!')
    });
  } 
  
 /*  btnChecked(): void{
    this.service.getAllTasks()
    .subscribe(retorno => this.tasks.completed = retorno);
  } */


  //metodo de inicialização
  ngOnInit(){    
    console.log(this.task);

    this.getAllTasks();
    this.getAllCategories();
  }
}
