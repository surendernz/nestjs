import { Module, ValidationPipe } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';

@Module({
  controllers: [PropertyController],
  // providers: [PropertyService,
  //   {
  //     provide: 'APP_PIPE',
  //     useValue: new ValidationPipe({
  //       whitelist: true,
  //       forbidNonWhitelisted: true,
  //       transform: true,
  //       transformOptions: {
  //         enableImplicitConversion: true
  //       }
  //     })
  //   }
  // ]
})
export class PropertyModule { }
