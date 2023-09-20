import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdresssEntity } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/CreateAddress.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AdresssEntity)
    private readonly addressRepository: Repository<AdresssEntity>,
  ) {}

  async createAddress(
    createAddressDto: CreateAddressDto,
    userId: number,
  ): Promise<AdresssEntity> {
    return this.addressRepository.save({
      ...createAddressDto,
      userId,
    });
  }
}
