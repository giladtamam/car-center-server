import { TaskStatus } from "../task-status.model";
import { IsEnum } from 'class-validator';

export class UpdateTaskStatDto {
    @IsEnum(TaskStatus)
    status: TaskStatus;
}