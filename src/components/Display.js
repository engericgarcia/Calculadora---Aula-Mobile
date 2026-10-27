import { StyleSheet } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';

// Exibe a expressão em andamento (linha menor) e o valor atual (linha grande).
export default function Display({ valor, expressao }) {
  const theme = useTheme();
  const valorFormatado = valor.replace('.', ',');

  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.surfaceVariant }]} elevation={2}>
      <Text
        variant="titleMedium"
        style={[styles.expressao, { color: theme.colors.onSurfaceVariant }]}
        numberOfLines={1}
      >
        {expressao.replace(/\./g, ',') || ' '}
      </Text>
      <Text
        variant="displayLarge"
        style={styles.valor}
        numberOfLines={1}
        adjustsFontSizeToFit
        accessibilityLabel={`Resultado: ${valorFormatado}`}
      >
        {valorFormatado}
      </Text>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginBottom: 16,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    minHeight: 160,
  },
  expressao: {
    opacity: 0.8,
    marginBottom: 4,
  },
  valor: {
    fontWeight: '300',
  },
});
