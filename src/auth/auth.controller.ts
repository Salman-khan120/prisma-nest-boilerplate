import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  // @Post('/logout')
  // public async logout(@Headers('Authorization') authorizationHeader: string, @Query('fcm_token') fcm_token='') {
  //     const token: string = authorizationHeader.split(' ')[1];
  //     return await this.authService.logout(token, fcm_token);
  // }

  // @Public()
  // @Post('/forgot-password')
  // public async forgotPassword (@Body() forgotPasswordDto: ForgotPasswordDto) {
  //     return await this.authService.forgotPassword(forgotPasswordDto);
  // }

  // @Public()
  // @Patch('/reset-password')
  // public async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
  //     return await this.authService.resetPassword(resetPasswordDto);
  // }

  // @Public()
  // @Post('/send-otp')
  // public async sendOtp(@Body() sendOtpDto: SendOtpDto) {
  //     return await this.authService.sendOtp(sendOtpDto);
  // }

  // @Public()
  // @Patch('/verify-otp')
  // public async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
  //     return await this.authService.verifyOtp(verifyOtpDto);
  // }
}
