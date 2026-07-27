import { DataSourceOptions } from 'typeorm';
import { Property } from './src/entities/property.entity';

export const pgConfig: DataSourceOptions = {
    //Dont put it here, use .env file for security reasons. This is just for testing purpose.
    url: 'postgresql://neondb_owner:npg_wD4OG2zAuQgi@ep-misty-band-awr1116q-pooler.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
    type: 'postgres',
    port: 5432,
    ssl: { rejectUnauthorized: false },
    // entities: [Property],
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true, // set to false in production, otherwise it will drop the database and create a new one every time the application starts
    logging: true,
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
}