# Calculadora — React Native + Expo + React Native Paper

App de calculadora simples feito com **React Native (Expo)** e componentes do **React Native Paper**, para o exercício de Arquitetura de Software.

## Funcionalidades

- Operações básicas: soma (+), subtração (−), multiplicação (×) e divisão (÷)
- Display com o valor atual e a expressão em andamento
- Números decimais, inversão de sinal (±), porcentagem (%), apagar dígito (⌫) e limpar (C)
- Encadeamento de operações (ex.: `2 + 3 × 4 =` → `20`, calculando da esquerda para a direita)
- Tratamento de divisão por zero (exibe `Erro`)
- Tema claro/escuro automático, seguindo o celular

## Componentes do React Native Paper utilizados

`PaperProvider`, `Appbar`, `Surface`, `Text`, `Button` (modos `elevated`, `contained` e `contained-tonal`) e o hook `useTheme`.

## Hooks utilizados

- `useState` — guarda o estado da calculadora
- `useColorScheme` — detecta tema claro/escuro
- `useTheme` (Paper) — acessa as cores do tema
- `useCalculadora` — hook customizado que concentra a lógica de estado

## Estrutura

```
App.js                       # Providers (Paper, SafeArea) e montagem da tela
src/
  components/
    Display.js               # Visor (Surface + Text)
    Teclado.js               # Grade de botões (Button do Paper)
  hooks/
    useCalculadora.js        # Hook customizado com useState
  logic/
    calculadora.js           # Regras das operações (funções puras)
```

## Como rodar

```bash
npm install
npx expo start
```

Depois, escaneie o QR Code com o app **Expo Go** no celular (ou pressione `a` para abrir no emulador Android).
