import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdresssEntity } from './entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdresssEntity])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
