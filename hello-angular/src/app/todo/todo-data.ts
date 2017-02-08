import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from '../domain/entities';


//使用内存数据库，模拟接口返回数据
export class InMemoryTodoDbService implements InMemoryDbService {
    createDb(){
      let todos: Todo[]=[
        {id: "f823b191-7799-438d-8d78-fcb1e468fc78", desc: 'Getting up', completed: true },
        {id: "c316a3bf-b053-71f9-18a3-0073c7ee3b76", desc: 'Go to school', completed: false}
      ];
      return {todo: todos};
    }
}
