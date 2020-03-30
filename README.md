<p align="center">
  <a href="https://github.com/biancamoreno/virtual-wallet">
    <img src="src/assets/images/cripto.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Virtual Wallet</h3>

  <p align="center">
    O Virtual Wallet é um sistema que fornece carteiras virtuais de criptomoedas para a realização de movimentações monetárias, desenvolvido para a StoneCo.
    <br />
    <a href="https://github.com/biancamoreno/virtual-wallet"><strong>Abrir repositório no GitHub »</strong></a>
  </p>
</p>
<br />
<br />


## Sobre

O Virtual Wallet é um sistema que fornece carteiras virtuais de criptomoedas para a realização de movimentações monetárias, desenvolvido para a StoneCo, conforme o desafio abaixo:

"O Web App precisa fornecer carteiras virtuais de criptomoedas. Todo cliente possui ao se cadastrar recebe R$ 100.000,00 (cem mil reais) em conta para comprar Bitcoins e Britas. A cotação da criptomoeda Brita é equivalente ao dólar e pode ser consultada na API do Banco Central enquanto que a cotação do Bitcoin pode ser consultada na API do Mercado Bitcoin.
<br/>
Sobre as operações financeiras de criptomoedas, é correto afirmar que:
<br/>
- O cliente pode vender suas criptomoedas ou trocar uma pela outra.
- O cliente precisa saber o saldo discriminado por cada moeda.
- O cliente precisa ter um extrato de operações financeiras."

<a href="https://gist.github.com/renatazenaro/4f68af50c12a0c324404dec849242eed"><strong>Mais Detalhes »</strong></a>
<br /><br />


### Como foi desenvolvido
Durante o desenvolvimento do projeto, foram utilizadas as seguintes ferramentas:

* [React](https://pt-br.reactjs.org)
* [React Redux](https://react-redux.js.org)
* [Dexie](https://dexie.org)
* [Axios](https://github.com/axios/axios)
* [Sass](https://sass-lang.com)
* [Material UI](https://material-ui.com)
* [React App Rewire](https://github.com/timarney/react-app-rewired) (controle de processos Webpack)
* [ClassNames](https://github.com/JedWatson/classnames)
* [Formik](https://jaredpalmer.com/formik)
* [Yup](https://github.com/jquense/yup)

Práticas utilizadas:
* [BEM](http://getbem.com)
* [Atomic Design](https://atomicdesign.bradfrost.com/chapter-2)
* [ESLint](https://eslint.org)
* [Prettier](https://prettier.io)
<br /><br />


## Inicialização

Para iniciar o projeto é necessário atender aos pré-requisitos e realizar a instalação, veja abaixo.
<br />
### Pré-Requisitos

* npm
```sh
npm install npm@latest -g
```
<br />

### Instalação

1. Clone o repositório
```sh
git clone https://github.com/biancamoreno/virtual-wallet.git
```
2. Instale o NPM
```sh
npm install
```
<br /><br />


## Build

Para gerar o build do projeto, no terminal execute o comando:
```sh
npm run build
```
<br /><br />

## Teste

Para executar os testes unitários do projeto, no terminal execute o comando:
```sh
npm run test
```
<br /><br />



## Mapa do Projeto

<br />
<pre>
src/
├── actions
├── assets
|  ├── images
|  └── styles
|     ├── css
|     └── scss
├── components
|  ├── atoms
|  |  ├── balance
|  |  ├── button
|  |  ├── label
|  |  ├── link
|  |  ├── msg-error
|  |  ├── nav-menu
|  |  └── welcome
|  ├── molecules
|  |  └── infos-menu
|  └── organisms
|     ├── form
|     ├── header
|     └── simpleModal
├── database
├── pages
|  ├── buy
|  ├── exchange
|  ├── home
|  ├── login
|  ├── sell
|  ├── signup
|  └── transactions
├── store
├── templates
|  └── main
└── utils
</pre>
<br /><br />


## Contato

Bianca Moreno - [Linkedin](https://www.linkedin.com/in/biancamorenogar/)
