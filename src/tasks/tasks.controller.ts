import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Patch,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskDto } from './dto/task.dto';
//import { DeleteTaskDto } from './dto/delete-task.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'The task has been created.',
    type: TaskDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createTaskDto: CreateTaskDto): Promise<TaskDto> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: 200,
    description: 'Return all tasks.',
    type: [TaskDto],
  })
  @ApiResponse({ status: 404, description: 'Tasks not found.' })
  findAll(): Promise<TaskDto[]> {
    return this.tasksService.findAllTasks();
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update the status of a task' })
  @ApiResponse({
    status: 200,
    description: 'The task status has been updated.',
    type: TaskDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid status value.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  updateStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<TaskDto> {
    return this.tasksService.updateStatus(id, updateTaskStatusDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }
}
