import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskDto> {
    const task = await this.prisma.task.create({
      data: createTaskDto,
    });
    return task;
  }

  findAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async updateStatus(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<TaskDto> {
    const { status } = updateTaskStatusDto;

    if (!Object.values(status).includes(status)) {
      throw new BadRequestException('Invalid status value.');
    }

    const task = await this.prisma.task.update({
      where: { id },
      data: { status },
    });

    if (!task) {
      throw new NotFoundException('Task not found.');
    }

    return task;
  }
}
