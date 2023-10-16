import { returnCityDto } from '../../city/dtos/returnCity.dto';
import { AdresssEntity } from '../entities/address.entity';

export class ReturnAddressDto {
  complement: string;
  numberAddress: number;
  cep: string;
  city?: returnCityDto;

  constructor(address: AdresssEntity) {
    this.complement = address.complement;
    this.numberAddress = address.numberAddress;
    this.cep = address.cep;
    this.city = address.city ? new returnCityDto(address.city) : undefined;
  }
}
