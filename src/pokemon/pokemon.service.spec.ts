import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { HttpService } from "@nestjs/axios";
import { BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { PokemonService } from "./pokemon.service";

describe('PokemonService', () => {
    let pokemonService: PokemonService;
    let httpService: DeepMocked<HttpService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PokemonService,
            ],
        }).useMocker(createMock).compile();

        pokemonService = module.get<PokemonService>(PokemonService);
        httpService = module.get(HttpService);
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
            //"Mockup" do retorno esperado do teste
            httpService.axiosRef.mockResolvedValueOnce({
                data: {
                    species: { name: "bulbasaur" },
                },
                headers: {},
                config: { url: "" },
                status: 200,
                statusText: "",
            });

        });

        it('deveria retornar um erro quando a API muda inesperadamente', async () => {
            httpService.axiosRef.mockResolvedValueOnce({
                //Propositalmente retornando um valor diferente do esperado
                data: `Unexpected data`,
                headers: {},
                config: { url: '' },
                status: 200,
                statusText: "",
            });

            const getPokemon = pokemonService.getPokemon(1);

            await expect(getPokemon).rejects.toBeInstanceOf(
                InternalServerErrorException,
            );
        });
    });
});