import AppShell from './src/screens/merchant/AppShell';
import LoginScreen from './src/screens/merchant/login/LoginScreen';
import { useAppStore } from './src/store/useAppStore';

export default function App() {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  return (
    <>
    {isAuthenticated ? (
        <AppShell />
      ) : (
        <LoginScreen />
      )}
    </>
  );
}