import { IsInt, IsNumber, IsString, Length } from "class-validator";

export class CreatePropertyDto {
    @IsString()
    @Length(3, 50)
    name!: string;
    @IsString()
    @Length(10, 200,
        {
            groups: ['create'],
            message: 'Customer Message: Description must be between 10 and 200 characters'
        })
    @Length(20, 200, { groups: ['update'] })
    description!: string;
    @IsInt()
    price!: number;
}