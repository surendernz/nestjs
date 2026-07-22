import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class ParseIdPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): number {
        const val = parseInt(value, 10);
        if (isNaN(val)) {
            throw new BadRequestException('Validation failed (numeric string is expected)');
        }
        if (val <= 0) {
            throw new BadRequestException('Validation failed (id must be a positive number)');
        }
        return val;
    }
}