import { Transform } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class GetEstimateDto {
  @IsString()
  make: string;
  @IsString()
  model: string;
  
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1990)
  @Max(2030)
  year: number;
  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  long: number;
  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  lat: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
}