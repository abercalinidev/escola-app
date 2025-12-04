import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { Text } from "@/components/ui/text";
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from "react-native";

export default function Login() {
  const [login, setLogin] = useState({
    email: '',
    senha: ''
  });

  const handleChange = (key: any, value: any) => {
    setLogin({
      ...login,
      [key]: value
    });
  };

  const verificarLogin = () => {
    router.navigate("/telas/menu/menu");
  }

  const entrarComoRepresentante = () => {
    router.navigate("/telas/menu/menuRepresentante");
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f0f4f8" }}
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 16 }}
    >
      <View style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 10,
      }}>
        <Text size="4xl" style={{ color: "#1e293b", textAlign: "center", marginBottom: 20 }}>
          Faça seu Login
        </Text>

        <Input variant="underlined" size="xl" style={{ marginBottom: 20 }}>
          <InputField
            placeholder="Digite seu email"
            value={login.email}
            onChangeText={(value) => handleChange('email', value)}
            style={{ color: "#1e293b" }}
          />
        </Input>

        <Input variant="underlined" size="xl" style={{ marginBottom: 30 }}>
          <InputField
            placeholder="Digite sua senha"
            value={login.senha}
            onChangeText={(value) => handleChange('senha', value)}
            style={{ color: "#1e293b" }}
            secureTextEntry
          />
        </Input>

        <Button
          onPress={verificarLogin}
          variant="solid"
          size="lg"
          action="secondary"
          style={{
            borderRadius: 10,
            backgroundColor: "#2563eb",
          }}
        >
          <ButtonText style={{ color: "#fff", fontSize: 16 }}>Entrar</ButtonText>
        </Button>

        <Button onPress={entrarComoRepresentante} variant="outline" size="md" action="primary" style={{ marginTop: 20, borderRadius: 10, borderColor: "#2563eb", backgroundColor: "#fff" }}>
          <ButtonText style={{ color: "#2563eb", fontSize: 14 }}>Entrar como Representante</ButtonText>
        </Button>
      </View>
    </ScrollView>
  );
}
