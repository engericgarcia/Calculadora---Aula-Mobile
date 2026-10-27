import { useState } from 'react';
import {
  ESTADO_INICIAL,
  digitarNumero,
  digitarVirgula,
  escolherOperador,
  igual,
  inverterSinal,
  porcentagem,
  apagar,
  limpar,
} from '../logic/calculadora';

// Hook customizado: guarda o estado da calculadora com useState
// e expõe uma única função para tratar o toque em qualquer botão.
export default function useCalculadora() {
  const [estado, setEstado] = useState(ESTADO_INICIAL);

  function pressionar(tecla) {
    setEstado((atual) => {
      if (/^[0-9]$/.test(tecla)) return digitarNumero(atual, tecla);
      if (['+', '-', '*', '/'].includes(tecla)) return escolherOperador(atual, tecla);

      switch (tecla) {
        case '.':
          return digitarVirgula(atual);
        case '=':
          return igual(atual);
        case 'C':
          return limpar();
        case '±':
          return inverterSinal(atual);
        case '%':
          return porcentagem(atual);
        case '⌫':
          return apagar(atual);
        default:
          return atual;
      }
    });
  }

  return {
    display: estado.display,
    expressao: estado.expressao,
    operadorAtivo: estado.aguardandoNovoNumero ? estado.operador : null,
    pressionar,
  };
}
