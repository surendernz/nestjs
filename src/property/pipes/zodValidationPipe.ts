import { BadRequestException, PipeTransform } from "@nestjs/common";

export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: any) { }

    transform(value: any) {
        const result = this.schema.safeParse(value);
        if (!result.success) {
            throw new BadRequestException(result.error.flatten());
        }
        return result.data;
    }
}