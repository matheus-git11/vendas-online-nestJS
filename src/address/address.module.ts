import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdresssEntity } from './entities/address.entity';
import { UserModule } from '../user/user.module';
import { CityModule } from '../city/city.module';

@Module({
  imports: [TypeOrmModule.forFeature([AdresssEntity]), UserModule, CityModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
