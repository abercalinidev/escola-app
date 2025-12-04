import { buscarRepresentanteEmail } from '@/app/services/representante/representante';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { Text } from "@/components/ui/text";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, View } from "react-native";


export default function LoginRepresentante() {
  const [email, setEmail] = useState("");


  const entrar = async () => {
    try {
        const response = await buscarRepresentanteEmail(email);
        router.push(`/telas/representanteAluno/${response.id}`);
        } catch(error) {
            console.log(error);
            Alert.alert("Email não encontrado no sistema.")
        }
    }

  return (
    <LinearGradient
      colors={["#e0e7ff", "#f0f4ff"]}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          padding: 24,
        }}
      >
        <View style={{
          backgroundColor: "#ffffff",
          borderRadius: 18,
          padding: 28,
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 4,
        }}>
          
          <Text
            size="4xl"
            style={{
              color: "#1e293b",
              textAlign: "center",
              fontWeight: "700",
              marginBottom: 6
            }}
          >
            Bem-vindo!
          </Text>

          <Text
            size="lg"
            style={{
              color: "#475569",
              textAlign: "center",
              marginBottom: 28
            }}
          >
            Acesso exclusivo para representantes
          </Text>

          <Input
            variant="outline"
            size="xl"
            style={{
              marginBottom: 24,
              borderColor: "#94a3b8",
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 4,
            }}
          >
            <InputField
              placeholder="Digite seu e-mail"
              value={email}
              onChangeText={setEmail}
              style={{ color: "#1e293b" }}
            />
          </Input>

          <Button onPress={entrar} variant="solid" size="lg" action="secondary"
            style={{borderRadius: 10, backgroundColor: "#2563eb",}}>
         <ButtonText style={{ color: "#fff", fontSize: 16 }}>
    Entrar
  </ButtonText>
</Button>


        </View>
      </ScrollView>
    </LinearGradient>
  );
}
