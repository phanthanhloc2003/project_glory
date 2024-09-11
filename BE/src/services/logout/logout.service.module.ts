import { Module } from '@nestjs/common';
import { LogoutService } from './logout.service';

@Module({
  imports: [],
  providers: [LogoutService],
  exports: [LogoutService],
})
export class LogoutServiceModule {}
