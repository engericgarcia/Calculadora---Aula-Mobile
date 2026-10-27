import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Appbar, MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';

import Display from './src/components/Display';
import Teclado from './src/components/Teclado';
import useCalculadora from './src/hooks/useCalculadora';

function Calculadora() {
  const { display, expressao, operadorAtivo, pressionar } = useCalculadora();

  return (
    <View style={styles.conteudo}>
      <Display valor={display} expressao={expressao} />
      <Teclado onPress={pressionar} operadorAtivo={operadorAtivo} />
    </View>
  );
}

export default function App() {
  // Segue o tema claro/escuro do celular
  const esquemaDeCores = useColorScheme();
  const theme = esquemaDeCores === 'dark' ? MD3DarkTheme : MD3LightTheme;

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <SafeAreaView edges={['bottom', 'left', 'right']} style={[styles.tela, { backgroundColor: theme.colors.background }]}>
          <Appbar.Header elevated>
            <Appbar.Content title="Calculadora" />
          </Appbar.Header>
          <Calculadora />
          <StatusBar style={esquemaDeCores === 'dark' ? 'light' : 'dark'} />
        </SafeAreaView>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
  },
  conteudo: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
});
