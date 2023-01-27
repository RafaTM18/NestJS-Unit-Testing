import { HttpModule } from '@nestjs/axios/dist';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let pokemonService: PokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule], //Importação necessária para rodar os testes
      providers: [PokemonService],
    }).compile();

    pokemonService = module.get<PokemonService>(PokemonService);
  });

  describe('getPokemon', () => {
    it('deveria retornar erro quando o ID é menor que 1', async () => {
      const getPokemon = pokemonService.getPokemon(0);

      await expect(getPokemon).rejects.toBeInstanceOf(BadRequestException);
    });

    it('deveria retornar erro quando o ID é maior que 151', async () => {
      const getPokemon = pokemonService.getPokemon(152);

      await expect(getPokemon).rejects.toBeInstanceOf(BadRequestException);
    });

    it('deveria retornar o nome de um pokemon', async () => {
      const getPokemon = pokemonService.getPokemon(1);

      await expect(getPokemon).resolves.toBe('bulbasaur');
    });
  })
});
