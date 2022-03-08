import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.model';
import { Task } from './task.entity';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private tasksRepository: TaskRepository
    ){}

    async getTaskById(id: string): Promise<Task> {
        const found = await this.tasksRepository.findOne(id);
        if (!found) {
            throw new NotFoundException('Task not found');
        }

        return found;
    }

    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.tasksRepository.getTasks(filterDto);
    }

    // getTask(id: string): Task {
    //     const found =  this.tasks.find(task => task.id === id);
    //     if (!found) {
    //         throw new NotFoundException();
    //     }

    //     return found;
    // }

    async deleteTask(id: string): Promise<void> {
        const { affected } = await this.tasksRepository.delete(id);

        if (affected === 0) {
            throw new NotFoundException('Task not found');
        }
    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await this.tasksRepository.save(task);

        return task;
    }
    
    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto);
    }
}

