import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppTheme } from './src/theme';
import RootNavigator from './src/navigation';
import { useAuthListener } from './src/hooks/useAuthListener';

// Initialise the auth listener at root level so it fires before any screen renders
function AppWithAuth() {
  useAuthListener();
  return <RootNavigator />;
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider theme={AppTheme}>
          <StatusBar style="dark" />
          <AppWithAuth />
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
