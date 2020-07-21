# NaFila-Br

Este é um projeto inicial de adaptação do "NaFila" de Portugal para a realidade do Brasil.

Existem 3 entidades:
- A *Pessoa* que vai usar o sistema;
- A *Loja* que oferece informações sobre o fluxo dentro do estabelecimento;
- O *Administrador*: Alguém com acesso para cadastrar lojas (Inicialmente não há login para lojistas).

### Sequência de uso
* Fazer o login na tela inicial
    (Quem não tem cadastro pode fazê-lo através de um link abaixo);
* Entrar na fila de uma loja *proxima*;
    (Por enquanto o sistema usa o CEP como medidor
    de localização, mas o ideal é uma API de 
    geolocalização)
* Aguardar o SMS de aviso (ou de confirmação de cadastro) **Também não há uma API de SMS ainda**!

### Regras
- Quando a pessoa entra na fila de uma loja, o sistema informa a posição da pessoa na fila.
- A pessoa não pode entrar duas vezes na fila da mesma loja

> Obs.: Não há ainda um meio de mover a fila.

### Informações especiais:
* No ato do cadastro a pessoa pode dizer se tem alguma condição especial: Grávida, idoso ou deficiente;
* Ao entrar numa fila, a pessoa também pode fazer uma observação: Por exemplo, se vai se atrasar, se precisa de vaga no estacionamento, se vai levar o cachorro etc.

> Obs.: Não há ainda um meio de priorizar pessoas em condições especiais.


### Quanto ao movimento da loja
* Inicialmente pensou-se em algum aviso para lojas muito cheias/lotadas;
* Pensando melhor, foi sugerido um indicativo de **melhor horário** para fazer compras naquela loja (o momento em que a loja está mais vazia) -- Esse indicativo é incluído no momento do cadastro da loja.

### CEP
* Atualmente os cadastros de Pessoa e de Loja contam com botão, onde após colocar o CEP e o complemento, ele monta o endereço completo;
* Possivelmente esses campos serão inutilizados com a API de geolocalização.

---
###### Os fontes do projeto original dispensam estes fontes -- e provavelmente terão recursos diferentes dos listados aqui.
