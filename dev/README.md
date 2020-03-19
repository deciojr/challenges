## Sumário

- ### [Decisões](#decisões)
      	- #### [Backend](#backend)
      	- #### [Frontend](#frontend)
      	- #### [Testes](#testes)
      	- #### [Commits](#commits)
- ### [Como rodar o projeto](#decisões)
      	- ###	[Pré-requisitos](#pré-requisitos)
      	- ### [Frontend](#frontend)
      	- ### [Backend](#backend)
- ### [Observações finais](#observações-finais)

## Decisões

### Backend

Decidi usar a o framework chamado **NestJS**, para esta parte da aplicação. Baseei essa escolha no fato dela ser inspirada no **Angular**, uma framework que possuo um pouco de familiaridade, tornando a curva de aprendizado um pouco menos acentuada.

Integrando do Nest, decidi também utilizar o **TypeORM** para realizar a conexão com o banco de dados, mapear as entidades do projeto e realizar operações com os dados. Tive bastante dificuldade nessa parte de conexão, pois inicialmente, havia decidido utilizar o **MongoDB** como o banco de dados, mas a falta de documentação e referências de como integrar os dois me fez desistir e ao invés do Mongo, migrei para o **PostgreSQL**

Com o TypeORM utilizei o padrão de **_repositories_** atribuido a cada entidade. Este padrão disponibiliza uma interface entre cada entidade da aplicação (cada tabela refere-se a uma entidade), decidi optar por esse padrão pois é o que utilizo diariamente com a framework **Spring Boot**.

A estrutura do backend está dividida por _entidade_ (usuário, ameaça etc) ou _funcionalidade_ (autenticação etc)

Para autenticação e autorização do usuário utilizei **jwt**.

### Frontend

Para o frontend decidi utilizar o **Angular** junto com o **@ngrx** (uma das frameworks de redux para o Angular) e seus design patterns. Decidi também utilizar uma das suas funcionalidades chamada **@ngrx/data** que abstrai para o desenvolvedor a criação de boilerplate para realizar ações de CRUD em entidades.

Também utilizo o **HMR** (Hot Module Replacement) esta ferramenta auxilia a produtividade ao aplicar as mudanças feitas no código através de patches nos arquivos alterados, assim não é necessário atualizar a página a cada mudança.

Para implementar o design utilizei o **Bootstrap 4**

A estrutura do projeto foi implementada seguindo o [projeto de exemplo](https://github.com/ngrx/platform/tree/master/projects/example-app) do **@ngrx**

### Testes

Possuo bem pouca experiência nessa área, então foi mais um desafio aprender um pouco sobre como funciona esse _mundo_. Devido isso, após tentar bastante, consegui realizar os testes que envolvem o registro do usuário (frontend e backend).

Como já havia gastando bastante tempo realizando esses testes, decidi não testar o resto da aplicação e focar em implementar as regras de negócios e funcionalidades. Mesmo assim, manti os padrões utilizados para facilitar que, hipoteticamente, se o restante dos testes fossem implementos não houvesse maiores complicações.

_Obs:_ Decidi remover os arquivos de teste (identificados pelo sufixo _.**spec**.ts_) dos módulos e componentes que não fazem parte do cadastro de usuário para que não interfiram quando os testes forem executados

### Commits

Adicionei ao projeto o **Husky** para rodar pre-commit hooks para checar o estilo do código e executar os respectivos linters do backend e frontend.

Usei também o **git-flow**.

Para escrever as mensagens de commit tento seguir esse [padrão](<[https://chris.beams.io/posts/git-commit/](https://chris.beams.io/posts/git-commit/)>).

## Como rodar o projeto

### Pré-requisitos

1.  Variáveis de ambiente
    O projeto possui na raiz um arquivo **.env**, configure-o de acordo com as suas preferências
2.  Banco de dados
    - Você deve possui o **docker** e estar ter disponível o comando **docker-compose** ou
    - O PostgreSQL deve estar sendo executado localmente
      Caso escolha utilizar o docker, na raiz do projeto execute `$ docker-compose up -d` para iniciar o banco de dados.
      _Obs:_ O argumento **`-d`** coloca o processo no background, caso deseje ver o log do banco de dados, remova o argumento
3.  Backend

    - Para iniciar use o comando `$ yarn start:dev`
    - Para executar os testes use o comando `$ yarn test` e o o comando para o teste de cobertura é `$ yarn test coverage`

4.  Frontend
    - Para iniciar use o comando `$ yarn start:dev`
    - Para executar os testes use o comando `$ yarn test` e o o comando para o teste de cobertura é `$ yarn test coverage`

_Obs_: Recomendo utilizar o package manager **yarn** (o projeto só possui o arquivo **yarn.lock**) para evitar inconsistências com outros package managers

_Obs:_ Para executar os mesmos comandos com o **npm** adicione a palavra **run** entre o package manager e o comando, ex: `$ npm run start:dev`

### Observações finais

Não consegui implementar o projeto por completo e acredito que algumas partes podiam ser melhoradas ou implementadas e alguns bugs resolvidos.

- Durante a implementação do registro, estava retornando os códigos http de erro manualmente (ao invés de retornar através de exceptions), só bateu que não fazia sentido um pouco tarde demais =/ e já estava replicado assim em outros módulos, então decidi manter.
- No frontend, a funcionalidade que citei **@ngrx/data** possui pouca documentação na forma que ela lida com as respostas http e de como as entidades são atualizadas com base nelas, sendo assim, não consegui fazer com que as entidades atualizem ao realizar a filtragem, no backend esta funcionalidade está ok.
- Outra questão que não resolvi foi a de atualizar os dados do herói, só é possível realizar a atualização uma vez, a partir dai, acredito que por estar retornando o código http ao invés do próprio herói atualizado,, não é mais possível realizar alterações.
- Não implementei a desalocação de um herói.
- Não implementei a alocação de um herói mais adequado, apenas ordenei pela classe mais alta para a mais baixa e aloquei o herói.
- Adicionei uma regra para caso não houvesse um herói disponível, a aplicação gera um automaticamente e o aloca à ameaça
- Na descrição do desafio, as ameaças possuem os níveis: **Gold, Silver, Copper e Wood**. Mas ao conectar ao socket das ameaças os níveis que recebi foram: **God, Dragon, Wolf e Tiger**.
