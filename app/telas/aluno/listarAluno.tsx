import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, View } from "react-native";


import { listarAlunos } from "@/app/services/aluno/alunoService";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { router } from "expo-router";

export default function ListarAluno() {
  const [alunos, setAlunos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [filtro, setFiltro] = useState<"TODOS" | "ATIVO" | "INATIVO">("TODOS");

  const carregarAlunos = async () => {
    try {
      setLoading(true);
      const data = await listarAlunos();
      setAlunos(data);
    } catch (err) {
      setErro("Erro ao carregar alunos");
    } finally {
      setLoading(false);
    }
  };

  const editar = (id: string) => {
    router.push(`/telas/aluno/${id}`);
  };

  const ativar = (id: string) => {
    Alert.alert("Ativar", "Deseja ativar este aluno?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Ativar",
        onPress: async () => {
         // await ativarAluno(id);
          carregarAlunos();
        },
      },
    ]);
  };

  const inativar = (id: string) => {
    Alert.alert("Inativar", "Deseja inativar este aluno?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Inativar",
        onPress: async () => {
         // await inativarAluno(id);
          carregarAlunos();
        },
      },
    ]);
  };

  const voltarTelaCadastro = () => {
    router.navigate("/telas/aluno/cadastroAluno");
  };

  useEffect(() => {
    carregarAlunos();
  }, []);

  const alunosFiltrados = alunos.filter((item) => {
    if (filtro === "TODOS") return true;
    return item.situacao === filtro;
  });

  if (loading) {
    return (
      <VStack className="flex-1 justify-center items-center mt-20">
        <ActivityIndicator size="large" color="#000" />
        <Text style={{ marginTop: 10 }}>Carregando...</Text>
      </VStack>
    );
  }

  if (erro) {
    return (
      <VStack className="flex-1 justify-center items-center mt-20">
        <Text style={{ color: "red", fontSize: 18 }}>{erro}</Text>
      </VStack>
    );
  }

  return (
    <ScrollView style={{ padding: 16, backgroundColor: "#f1f5f9" }}>
      {/* CABEÇALHO */}
      <View style={{ marginBottom: 25 }}>
        <Heading
          size="xl"
          style={{
            color: "#1e293b",
            fontWeight: "900",
            fontSize: 30,
            textAlign: "left",
            marginBottom: 6,
          }}
        >
          👨‍🎓 Alunos
        </Heading>
        <Text style={{ color: "#64748b", fontSize: 16, marginLeft: 2 }}>
          Lista completa de alunos cadastrados
        </Text>
      </View>

      {/* FILTROS */}
      <View style={{ flexDirection: "row", marginBottom: 16, gap: 10 }}>
        {["TODOS", "ATIVO", "INATIVO"].map((status) => {
          const selecionado = filtro === status;
          return (
            <Button
              key={status}
              action={selecionado ? "primary" : "secondary"}
              size="sm"
              onPress={() => setFiltro(status as any)}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
                backgroundColor: selecionado ? "#0ea5e9" : "#fff",
                borderWidth: 1,
                borderColor: "#0ea5e9",
                paddingVertical: 10,
                minHeight: 40,
              }}
            >
              <ButtonText
                style={{
                  color: selecionado ? "#fff" : "#0ea5e9",
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                {status}
              </ButtonText>
            </Button>
          );
        })}
      </View>

      {/* LISTA DE ALUNOS */}
      {alunosFiltrados.map((item, index) => (
        <Card
          key={index}
          style={{
            padding: 20,
            marginBottom: 16,
            borderRadius: 14,
            shadowColor: "#000",
            shadowOpacity: 0.08,
            shadowRadius: 6,
            elevation: 3,
            backgroundColor: item.situacao === "ATIVO" ? "#d1fae5" : "#fee2e2",
          }}
        >
          <VStack space="sm">
            <Heading size="lg" style={{ fontWeight: "900", color: "#1e293b" }}>
              {item.nome} {item.sobrenome}
            </Heading>
            <Text style={{ color: "#374151" }}>🎓 Série: {item.serieAluno}</Text>
            <Text style={{ color: "#374151" }}>📅 Nascimento: {item.dataNascimento}</Text>
            <Text style={{ color: "#374151" }}>
              🏠 Cidade: {item.endereco?.cidade || "-"}
            </Text>
            <Text
              style={{
                marginTop: 4,
                fontWeight: "bold",
                color: item.situacao === "ATIVO" ? "green" : "red",
              }}
            >
              Situação: {item.situacao}
            </Text>
          </VStack>

          {/* BOTÕES */}
          <View style={{ flexDirection: "row", marginTop: 16, gap: 10 }}>
            <Button
              action="primary"
              variant="solid"
              size="md"
              onPress={() => editar(item.id)}
              style={{
                flex: 1,
                backgroundColor: "#0ea5e9",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 14,
                minHeight: 48,
              }}
            >
              <ButtonText style={{ color: "white", fontWeight: "700", textAlign: "center" }}>
                Editar
              </ButtonText>
            </Button>

            {item.situacao === "INATIVO" ? (
              <Button
                action="positive"
                variant="solid"
                size="md"
                onPress={() => ativar(item.id)}
                style={{
                  flex: 1,
                  backgroundColor: "#22c55e",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 14,
                  minHeight: 48,
                }}
              >
                <ButtonText style={{ color: "white", fontWeight: "700", textAlign: "center" }}>
                  Ativar
                </ButtonText>
              </Button>
            ) : (
              <Button
                action="negative"
                variant="solid"
                size="md"
                onPress={() => inativar(item.id)}
                style={{
                  flex: 1,
                  backgroundColor: "#ef4444",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 14,
                  minHeight: 48,
                }}
              >
                <ButtonText style={{ color: "white", fontWeight: "700", textAlign: "center" }}>
                  Inativar
                </ButtonText>
              </Button>
            )}
          </View>
        </Card>
      ))}

      {/* BOTÃO CADASTRAR */}
      <View style={{ marginTop: 40, marginBottom: 70 }}>
        <Button
          action="primary"
          size="lg"
          onPress={voltarTelaCadastro}
          style={{
            width: "100%",
            borderRadius: 14,
            backgroundColor: "#3b82f6",
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 16,
            minHeight: 56,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <ButtonText style={{ fontSize: 18, color: "white", fontWeight: "700", textAlign: "center" }}>
            + Cadastrar novo aluno
          </ButtonText>
        </Button>
      </View>
    </ScrollView>
  );
}
