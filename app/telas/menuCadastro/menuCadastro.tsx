import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { router } from "expo-router";
import { ScrollView, View } from "react-native";

export default function MenuCadastro() {

  const irParaCadastro = () => {
    router.navigate("/telas/representante/cadastroRepresentante");
  };

  const irParaLista = () => {
    router.navigate("/telas/representante/listarRepresentante");
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: "#cbd5e1" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 50 }}>

        <Card className="p-6 rounded-lg w-full max-w-[360px] bg-white shadow">
          <VStack className="mb-6 items-center">
            <Heading size="lg" className="text-black mb-2">
              Cadastro do Representante
            </Heading>
            <Text size="sm" className="text-gray-700 text-center">
              Escolha uma opção abaixo para cadastrar ou listar representate.
            </Text>
          </VStack>

          <View style={{ gap: 15, marginTop: 10 }}>
            <Button
              variant="solid"
              size="lg"
              action="primary"
              onPress={irParaCadastro}
              style={{ borderRadius: 10 }}
            >
              <ButtonText style={{ fontSize: 16 }}>Cadastrar Representante</ButtonText>
            </Button>

            <Button
              variant="outline"
              size="lg"
              action="secondary"
              onPress={irParaLista}
              style={{ borderRadius: 10 }}
            >
              <ButtonText style={{ fontSize: 16 }}>Listar Representante</ButtonText>
            </Button>
          </View>
        </Card>

      </View>
    </ScrollView>
  );
}
