import { BadRequestException } from '@nestjs/common';
import { ParsePokemonIdPipe } from './parse-pokemon-id.pipe';

describe('ParsePokemonIdPipe', () => {
  let pipe: ParsePokemonIdPipe;

  beforeEach(() => {
    pipe = new ParsePokemonIdPipe();
  });

  it('deveria ser definido', () => {
    expect(new ParsePokemonIdPipe()).toBeDefined();
  });

  it('deveria retornar erro para não números', () => {
    const value = () => pipe.transform('hello');
    expect(value).toThrowError(BadRequestException);
  });

  it('deveria retornar erro se o valor for abaixo de 1', () => {
    const value = () => pipe.transform('-1');
    expect(value).toThrowError(BadRequestException);
  });

  it('deveria retornar erro se o valor for acima de 151', () => {
    const value = () => pipe.transform('152');
    expect(value).toThrowError(BadRequestException);
  });

  it('deveria retornar número se o valor for de 1 a 151', () => {
    const value = () => pipe.transform('150');
    expect(value()).toBe(150);
  });
});
