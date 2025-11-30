import { NativeBaseProvider } from 'native-base';
import Login from '../telas/login/login';

export default function HomeScreen() {
  return (
    <NativeBaseProvider>
      <Login />
    </NativeBaseProvider>
  );
}
