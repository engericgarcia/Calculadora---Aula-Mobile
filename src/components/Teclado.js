import { StyleSheet, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

// Cada botão: rótulo exibido, tecla enviada para a lógica e tipo (define o visual).
const LINHAS = [
  [
    { rotulo: 'C', tecla: 'C', tipo: 'funcao' },
    { rotulo: '±', tecla: '±', tipo: 'funcao' },
    { rotulo: '%', tecla: '%', tipo: 'funcao' },
    { rotulo: '÷', tecla: '/', tipo: 'operador' },
  ],
  [
    { rotulo: '7', tecla: '7' },
    { rotulo: '8', tecla: '8' },
    { rotulo: '9', tecla: '9' },
    { rotulo: '×', tecla: '*', tipo: 'operador' },
  ],
  [
    { rotulo: '4', tecla: '4' },
    { rotulo: '5', tecla: '5' },
    { rotulo: '6', tecla: '6' },
    { rotulo: '−', tecla: '-', tipo: 'operador' },
  ],
  [
    { rotulo: '1', tecla: '1' },
    { rotulo: '2', tecla: '2' },
    { rotulo: '3', tecla: '3' },
    { rotulo: '+', tecla: '+', tipo: 'operador' },
  ],
  [
    { rotulo: '⌫', tecla: '⌫', tipo: 'funcao' },
    { rotulo: '0', tecla: '0' },
    { rotulo: ',', tecla: '.' },
    { rotulo: '=', tecla: '=', tipo: 'igual' },
  ],
];

function Tecla({ rotulo, tecla, tipo, ativo, onPress }) {
  const theme = useTheme();

  // Modos de botão do React Native Paper conforme o tipo da tecla
  let mode = 'elevated';
  let buttonColor;
  let textColor;

  if (tipo === 'funcao') {
    mode = 'contained-tonal';
  } else if (tipo === 'operador') {
    mode = 'contained';
    if (ativo) {
      buttonColor = theme.colors.onPrimary;
      textColor = theme.colors.primary;
    }
  } else if (tipo === 'igual') {
    mode = 'contained';
    buttonColor = theme.colors.tertiary;
    textColor = theme.colors.onTertiary;
  }

  return (
    <Button
      mode={mode}
      onPress={() => onPress(tecla)}
      style={styles.botao}
      contentStyle={styles.conteudo}
      labelStyle={styles.rotulo}
      buttonColor={buttonColor}
      textColor={textColor}
      accessibilityLabel={rotulo}
    >
      {rotulo}
    </Button>
  );
}

export default function Teclado({ onPress, operadorAtivo }) {
  return (
    <View style={styles.teclado}>
      {LINHAS.map((linha, i) => (
        <View key={i} style={styles.linha}>
          {linha.map((item) => (
            <Tecla
              key={item.tecla}
              {...item}
              ativo={item.tecla === operadorAtivo}
              onPress={onPress}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  teclado: {
    gap: 12,
  },
  linha: {
    flexDirection: 'row',
    gap: 12,
  },
  botao: {
    flex: 1,
    borderRadius: 20,
  },
  conteudo: {
    height: 68,
  },
  rotulo: {
    fontSize: 26,
    lineHeight: 32,
  },
});
