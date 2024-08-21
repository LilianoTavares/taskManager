import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Status } from '@prisma/client';

export class UpdateTaskStatusDto {
  @ApiProperty({ description: 'The status of the task', enum: Status })
  @IsEnum(Status, {
    message: 'Status must be one of: PENDING, IN_PROGRESS, DONE',
  })
  status: Status;
}
