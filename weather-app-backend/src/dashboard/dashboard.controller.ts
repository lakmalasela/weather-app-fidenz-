import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('dashboard')
export class DashboardController {

  @Get()
  @UseGuards(AuthGuard)
  getDashboard() {

    return {
      message: "Comfort Index Dashboard Data",
      temperature: 27,
      humidity: 60
    };

  }
}
