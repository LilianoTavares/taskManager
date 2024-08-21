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
import { TaskStatus } from './enums/task-status.enum';

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
  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async updateStatus(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<TaskDto> {
    const { status } = updateTaskStatusDto;

    if (!Object.values(TaskStatus).includes(status)) {
      throw new BadRequestException('Invalid status value.');
    }
    try {
      const task = await this.prisma.task.update({
        where: { id },
        data: { status },
      });

      return task;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Task with ID ${id} not found.`);
      }
      throw error;
    }
  }
  async delete(id: string) {
    try {
      const task = await this.prisma.task.delete({
        where: { id },
      });

      return task;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Task with ID ${id} not found.`);
      }
      throw error;
    }
  }
}
