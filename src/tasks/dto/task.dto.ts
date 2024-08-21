import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty({ description: 'The ID of the task' })
  id: string;

  @ApiProperty({ description: 'The title of the task' })
  title: string;

  @ApiProperty({ description: 'The description of the task' })
  description: string;

  @ApiProperty({ description: 'The status of the task' })
  status: string;

  @ApiProperty({ description: 'The creation date of the task' })
  createdAt: Date;
}
