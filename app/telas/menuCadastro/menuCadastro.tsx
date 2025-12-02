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

  const irParaCadastroAluno = () => {
    router.navigate("/telas/aluno/alunoCadastro");
  }

  const irParaListaAluno = () => {
    router.navigate("/telas/aluno/listarAluno");
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f1f5f9" }}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
    >
      <Heading
        size="xl"
        style={{
          fontWeight: "900",
          color: "#1e293b",
          textAlign: "left",
          marginBottom: 20,
          fontSize: 32,
        }}
      >
        📘 Menu de Cadastros
      </Heading>

      {/* CARD 1 - REPRESENTANTE */}
      <Card
        style={{
          padding: 20,
          borderRadius: 18,
          backgroundColor: "#ffffff",
          marginBottom: 24,
          shadowColor: "#000",
          shadowOpacity: 0.07,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <VStack style={{ marginBottom: 20 }}>
          <Heading
            size="lg"
            style={{ fontWeight: "900", color: "#0f172a", marginBottom: 6 }}
          >
            👥 Representantes
          </Heading>

          <Text style={{ color: "#475569", fontSize: 15 }}>
            Cadastre ou visualize a lista de representantes.
          </Text>
        </VStack>

        {/* BOTÕES */}
        <View style={{ gap: 12 }}>
          <Button
            variant="solid"
            action="primary"
            size="lg"
            onPress={irParaCadastro}
            style={{
              backgroundColor: "#2563eb",
              borderRadius: 12,
              justifyContent: "center",
              paddingVertical: 14,
              minHeight: 52,
            }}
          >
            <ButtonText
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "#fff",
                textAlign: "center",
              }}
            >
              ➕ Cadastrar Representante
            </ButtonText>
          </Button>

          <Button
            variant="outline"
            action="secondary"
            size="lg"
            onPress={irParaLista}
            style={{
              borderRadius: 12,
              borderColor: "#2563eb",
              borderWidth: 2,
              backgroundColor: "#ffffff",
              justifyContent: "center",
              paddingVertical: 14,
              minHeight: 52,
            }}
          >
            <ButtonText
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "#2563eb",
                textAlign: "center",
              }}
            >
              📄 Listar Representantes
            </ButtonText>
          </Button>
        </View>
      </Card>

      {/* CARD 2 - ALUNO */}
      <Card
        style={{
          padding: 20,
          borderRadius: 18,
          backgroundColor: "#ffffff",
          marginBottom: 24,
          shadowColor: "#000",
          shadowOpacity: 0.07,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <VStack style={{ marginBottom: 20 }}>
          <Heading
            size="lg"
            style={{ fontWeight: "900", color: "#0f172a", marginBottom: 6 }}
          >
            🎓 Alunos
          </Heading>

          <Text style={{ color: "#475569", fontSize: 15 }}>
            Cadastre novos alunos ou consulte a lista.
          </Text>
        </VStack>

        {/* BOTÕES */}
        <View style={{ gap: 12 }}>
          <Button
            variant="solid"
            action="primary"
            size="lg"
            onPress={irParaCadastroAluno}
            style={{
              backgroundColor: "#16a34a",
              borderRadius: 12,
              justifyContent: "center",
              paddingVertical: 14,
              minHeight: 52,
            }}
          >
            <ButtonText
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "#fff",
                textAlign: "center",
              }}
            >
              ➕ Cadastrar Aluno
            </ButtonText>
          </Button>

          <Button
            variant="outline"
            action="secondary"
            size="lg"
            onPress={irParaListaAluno}
            style={{
              borderRadius: 12,
              borderColor: "#16a34a",
              borderWidth: 2,
              backgroundColor: "#ffffff",
              justifyContent: "center",
              paddingVertical: 14,
              minHeight: 52,
            }}
          >
            <ButtonText
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "#16a34a",
                textAlign: "center",
              }}
            >
              📄 Listar Alunos
            </ButtonText>
          </Button>
        </View>
      </Card>
    </ScrollView>
  );
}
