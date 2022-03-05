import { TaskStatus } from "../task-status.model";

export class GetTasksFilterDto {
    search?: string;
    status?: TaskStatus;
}