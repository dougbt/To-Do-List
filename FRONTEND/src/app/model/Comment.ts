import { Task } from "./Task";

export class Comment{
    id: number = 0;
    description: string = '';
    task: Task = new Task();
}