import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoDbConfig = (
  configService: ConfigService,
): MongooseModuleOptions => {
  const uri = configService.get<string>('MONGODB_URI');

  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not defined');
  }

  return {
    uri,
  };
};