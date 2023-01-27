import { Test, TestingModule } from '@nestjs/testing';
import { TweetsService } from './tweets.service';

describe('TweetsService', () => {
  //Describe agrupa testes relacionados, dessa forma, todos testes 
  //relacionados a TweetsService devem estar aqui
  let service: TweetsService;

  beforeEach(async () => {
    //Esse bloco de código é sempre realizado antes de rodar os testes
    const module: TestingModule = await Test.createTestingModule({
      providers: [TweetsService],
    }).compile();

    service = module.get<TweetsService>(TweetsService);
  });

  describe('createTweet', () => {
    it('deveria criar tweet', () => {
      //Arrange
      //Configurações necessárias para a realização do teste
      service.tweets = [];
      const payload = 'Esse é meu tweet';

      //Act
      //Chama o método createTweet, que é o código sendo testado
      const tweet = service.createTweet(payload);

      //Assert
      //Declara o resultado esperado, conferindo que o tweet retornado é igual ao payload e vendo
      //se foi add corretamente na lista
      expect(tweet).toBe(payload);
      expect(service.tweets).toHaveLength(1);
    });

    it('deveria prevenir a criação de tweet com mais de 280 caracteres', () => {
      //Arrange
      const payload = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut scelerisque hendrerit dapibus. Nullam quam quam, maximus et diam sed, vehicula ullamcorper orci. Integer vehicula enim id sem porttitor, at pretium mi aliquet. Etiam accumsan nibh turpis, eu elementum nisi consectetur et."

      //Act
      const tweet = () => {
        return service.createTweet(payload);
      }

      //Assert
      expect(tweet).toThrowError();
    })
  });
});
