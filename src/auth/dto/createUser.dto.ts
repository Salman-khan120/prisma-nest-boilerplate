import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsBoolean,
} from 'class-validator';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Name should not be empty.' })
  @MinLength(1, { message: 'Name is too short.' })
  @MaxLength(50, { message: 'Name is too long.' })
  name: string;

  @IsEmail({}, { message: 'Invalid email format.' })
  @IsNotEmpty({ message: 'Email should not be empty.' })
  email: string;

  @IsString({ message: 'Invalid password format.' })
  @IsNotEmpty({ message: 'Password should not be empty.' })
  @MinLength(5, {
    message: 'Password is too short. It should be between 5 and 50 characters.',
  })
  @MaxLength(50, {
    message: 'Password is too long. It should be between 5 and 50 characters.',
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,50}$/,
    {
      message:
        'Password should include one uppercase letter, one lowercase letter, one number, and one special character.',
    },
  )
  password: string;

  @IsString({ message: 'Invalid format for confirm password.' })
  @IsNotEmpty({ message: 'Confirm password should not be empty.' })
  confirmPassword: string;

  @IsOptional()
  @IsString({ message: 'Invalid phone format.' })
  phone?: string;

  @IsOptional()
  @IsString({ message: 'Invalid address format.' })
  address?: string;

  @IsOptional()
  @IsString({ message: 'Invalid job title format.' })
  jobTitle?: string;

  @IsOptional()
  @IsString({ message: 'Invalid avatar format.' })
  avatar?: string;

  @IsBoolean({ message: 'Enable Super Admin should be a boolean value.' })
  enableSuperAdmin: boolean;
}
