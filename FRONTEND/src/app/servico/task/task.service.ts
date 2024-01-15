import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../model/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url: string = 'http://localhost:8080/tasks';

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(this.url);
  }

  createTask(obj: Task): Observable<Task> {
    return this.http.post<Task>(this.url, obj);
  }
  
  updateTask(obj: Task): Observable<Task> {
    const url2 = this.url + obj.id
    return this.http.put<Task>(url2, obj);
  }
  
  deleteTask(id:number): Observable<void> {
    const url2 = `${this.url}/${id}`
    return this.http.delete<void>(url2);
  }

}
