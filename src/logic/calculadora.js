// Lógica pura da calculadora (sem dependência de React),
// o que facilita testar e entender as regras separadamente da interface.

export const ESTADO_INICIAL = {
  display: '0',
  valorAnterior: null,
  operador: null,
  aguardandoNovoNumero: false,
  expressao: '',
};

const SIMBOLOS = { '+': '+', '-': '−', '*': '×', '/': '÷' };

// Evita resultados como 0.1 + 0.2 = 0.30000000000000004
export function formatar(numero) {
  if (!Number.isFinite(numero)) return 'Erro';
  return String(parseFloat(numero.toPrecision(12)));
}

export function calcular(a, b, operador) {
  switch (operador) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return b === 0 ? NaN : a / b;
    default:
      return b;
  }
}

export function digitarNumero(estado, digito) {
  if (estado.display === 'Erro') {
    return { ...ESTADO_INICIAL, display: digito };
  }
  if (estado.aguardandoNovoNumero) {
    return { ...estado, display: digito, aguardandoNovoNumero: false };
  }
  if (estado.display.replace(/[-.]/g, '').length >= 12) return estado;
  const display = estado.display === '0' ? digito : estado.display + digito;
  return { ...estado, display };
}

export function digitarVirgula(estado) {
  if (estado.display === 'Erro' || estado.aguardandoNovoNumero) {
    return { ...estado, display: '0.', aguardandoNovoNumero: false };
  }
  if (estado.display.includes('.')) return estado;
  return { ...estado, display: estado.display + '.' };
}

export function escolherOperador(estado, operador) {
  if (estado.display === 'Erro') return estado;
  const atual = parseFloat(estado.display);

  // Troca de operador sem ter digitado o segundo número
  if (estado.operador && estado.aguardandoNovoNumero) {
    return {
      ...estado,
      operador,
      expressao: `${formatar(estado.valorAnterior)} ${SIMBOLOS[operador]}`,
    };
  }

  // Encadeamento: 2 + 3 + ... já calcula 5
  let resultado = atual;
  if (estado.operador && estado.valorAnterior !== null) {
    resultado = calcular(estado.valorAnterior, atual, estado.operador);
    if (!Number.isFinite(resultado)) return { ...ESTADO_INICIAL, display: 'Erro' };
  }

  return {
    display: formatar(resultado),
    valorAnterior: resultado,
    operador,
    aguardandoNovoNumero: true,
    expressao: `${formatar(resultado)} ${SIMBOLOS[operador]}`,
  };
}

export function igual(estado) {
  if (!estado.operador || estado.valorAnterior === null || estado.display === 'Erro') {
    return estado;
  }
  const atual = parseFloat(estado.display);
  const resultado = calcular(estado.valorAnterior, atual, estado.operador);
  const expressao = `${formatar(estado.valorAnterior)} ${SIMBOLOS[estado.operador]} ${formatar(atual)} =`;

  if (!Number.isFinite(resultado)) {
    return { ...ESTADO_INICIAL, display: 'Erro', expressao };
  }
  return {
    display: formatar(resultado),
    valorAnterior: null,
    operador: null,
    aguardandoNovoNumero: true,
    expressao,
  };
}

export function inverterSinal(estado) {
  if (estado.display === 'Erro' || estado.display === '0') return estado;
  const display = estado.display.startsWith('-')
    ? estado.display.slice(1)
    : '-' + estado.display;
  return { ...estado, display };
}

export function porcentagem(estado) {
  if (estado.display === 'Erro') return estado;
  return { ...estado, display: formatar(parseFloat(estado.display) / 100) };
}

export function apagar(estado) {
  if (estado.display === 'Erro' || estado.aguardandoNovoNumero) return estado;
  const display = estado.display.length > 1 ? estado.display.slice(0, -1) : '0';
  return { ...estado, display: display === '-' ? '0' : display };
}

export function limpar() {
  return { ...ESTADO_INICIAL };
}
