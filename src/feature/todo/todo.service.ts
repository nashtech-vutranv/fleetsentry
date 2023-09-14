import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TodoEntity } from "src/entities";
import { Repository } from "typeorm";
import { TodoDto } from "./todo.dto";

@Injectable()
export class TodoService {
  constructor(@InjectRepository(TodoEntity) private todoRepo: Repository<TodoEntity>) {}

  /**
   * @author vungpv93@gmail.com
   * @functionName filter
   * @description
   */
  public async filter(): Promise<TodoEntity[]> {
    return await this.todoRepo.find({ order: { id: "DESC" } });
  }

  /**
   * @author vungpv93@gmail.com
   * @functionName store
   * @param todoBody
   * @description
   */
  public async store(todoBody: TodoDto): Promise<TodoEntity> {
    return await this.todoRepo.save(this.todoRepo.create(todoBody));
  }

  /**
   * @author vungpv93@gmail.com
   * @functionName destroy
   * @param id
   * @description
   */
  public async destroy(id: number): Promise<any> {
    return await this.todoRepo.softDelete({ id: id });
  }
}
