import { Controller, Get, Query, Render } from '@nestjs/common';
import { GitService } from './git.service';

@Controller()
export class AppController {
  constructor(private readonly gitService: GitService) {}

  @Get()
  @Render('index')
  index(@Query('path') path: string) {
    return this.gitService.index(path);
  }

  @Get('show')
  @Render('show')
  show(@Query('path') path: string) {
    return this.gitService.show(path);
  }
}
