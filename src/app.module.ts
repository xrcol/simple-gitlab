import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GitService } from './git.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [GitService],
})
export class AppModule {}
