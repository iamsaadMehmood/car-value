import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReportDto {
  @IsNumber()
  @Min(0)
  @Max(10000000)
  price: number;
  @IsString()
  make: string;
  @IsString()
  model: string;
  @IsNumber()
  @Min(1990)
  @Max(2030)
  year: number;

  @IsLongitude()
  long: number;
  @IsLatitude()
  lat: number;
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
}
