import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Invalid email format.' })
  @IsNotEmpty({ message: 'Email is required.' })
  email: string;

  @IsString({ message: 'Password should be a string.' })
  @MinLength(6, { message: 'Password should be at least 6 characters long.' })
  @IsNotEmpty({ message: 'Password is required.' })
  password: string;
}
