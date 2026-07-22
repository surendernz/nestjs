import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate, validateOrReject } from "class-validator";

export const RequestHeader = createParamDecorator(
    async (targetDto: any, ctx: ExecutionContext) => {
        const headers = ctx.switchToHttp().getRequest().headers;
        const dto = plainToInstance(targetDto, headers, { excludeExtraneousValues: true });
        //        await validateOrReject(dto); //not sure why, this is not working.
        const errors = await validate(dto, { whitelist: true });
        if (errors.length > 0) {
            throw new BadRequestException({
                message: 'Validation failed',
                errors: errors.map((error) => ({
                    property: error.property,
                    constraints: error.constraints,
                })),
            });
        }

        return dto;
    });