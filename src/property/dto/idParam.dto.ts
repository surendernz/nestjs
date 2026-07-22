import { IsInt } from "class-validator";

export class IdParamDto {
    @IsInt()
    id!: number;
}