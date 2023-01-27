import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParsePokemonIdPipe implements PipeTransform {
  transform(value: string): number {
    const id = parseInt(value);
    if (isNaN(id)) {
      throw new BadRequestException(
        'Falha na validação (era espserado um número)',
      );
    }
    if (id < 1 || id > 151) {
      throw new BadRequestException(
        'ID deve ser entre 1 e 151'
      );
    }
    return id;
  }
}
