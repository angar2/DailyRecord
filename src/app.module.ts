import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { Users } from './entities/users.entity';
import { AuthModule } from './auth/auth.module';
import { DailiesModule } from './dailies/dailies.module';
import { Dailies } from './entities/dailies.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
          Users, Dailies
      ],
    }),
    UsersModule,
    AuthModule,
    DailiesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
