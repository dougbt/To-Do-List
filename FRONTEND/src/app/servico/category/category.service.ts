import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../model/Category';
import { Task } from '../../model/Task';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url: string = 'http://localhost:8080/category';
  private taskByCategoryUrl: string = 'http://localhost:8080/tasks/category'

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.url);
  }
  
  getTaskByCategory(categoryId : any): Observable<Task[]>{
    const url= `${this.taskByCategoryUrl}/${categoryId}`
    return this.http.get<Task[]>(url);

  }
}
