import { Category } from "./Category";

export class Task {
    id: number = 0;
    description: string = '';
    completed: boolean = false;
    category: Category = new Category();
    comments: Comment[] = [];
}