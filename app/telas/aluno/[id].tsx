import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from "react-native";

import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { router, useLocalSearchParams } from "expo-router";

import {
  buscarAlunoPorId,
  editarAluno
} from "@/app/services/aluno/alunoService";
import { listarRepresentantes } from "@/app/services/representante/representante";

const series = [
  { label: "Primeiro Ano", value: "PRIMEIRO_ANO" },
  { label: "Segundo Ano", value: "SEGUNDO_ANO" },
  { label: "Terceiro Ano", value: "TERCEIRO_ANO" },
  { label: "Quarto Ano", value: "QUARTO_ANO" },
  { label: "Quinto Ano", value: "QUINTO_ANO" },
];

export default function EditarAluno() {
  const { id } = useLocalSearchParams();

  const [carregando, setCarregando] = useState(true);

  const [aluno, setAluno] = useState({
    nome: "",
    sobrenome: "",
    idade: "",
    dataNascimento: "",
    serieAluno: "",
    representantes: [] as { id: number }[],
    endereco: {
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
      complemento: "",
    },
  });

  const [representantesDisponiveis, setRepresentantesDisponiveis] =
    useState<any[]>([]);
  const [filtroRepresentante, setFiltroRepresentante] = useState("");

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const reps = await listarRepresentantes();
      setRepresentantesDisponiveis(reps);

      const alunoCarregado = await buscarAlunoPorId(id);

      alunoCarregado.representantes = alunoCarregado.representantes.map(
        (r : any) => ({ id: r.id })
      );

      // >>> CORREÇÃO AQUI <<<  
      // garante que idade sempre seja string
      alunoCarregado.idade = String(alunoCarregado.idade ?? "");

      setAluno(alunoCarregado);
    } catch (error) {
      console.log("Erro ao carregar aluno", error);
      Alert.alert("Erro", "Não foi possível carregar o aluno.");
    } finally {
      setCarregando(false);
    }
  };

  const handleChange = (key: string, value: any) => {
    setAluno({ ...aluno, [key]: value });
  };

  const handleEnderecoChange = (key: string, value: any) => {
    setAluno({ ...aluno, endereco: { ...aluno.endereco, [key]: value } });
  };

  const handleRepresentantesChange = (id: number, checked: boolean) => {
    if (checked) {
      setAluno({ ...aluno, representantes: [...aluno.representantes, { id }] });
    } else {
      setAluno({
        ...aluno,
        representantes: aluno.representantes.filter((r) => r.id !== id),
      });
    }
  };

  const salvar = async () => {
    try {
      await editarAluno(aluno, id);

      Alert.alert("Sucesso", "Aluno atualizado com sucesso!", [
        {
          text: "OK",
          onPress: () => router.navigate("/telas/aluno/listarAluno"),
        },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível atualizar o aluno.");
    }
  };

  const representantesFiltrados = representantesDisponiveis.filter((r) =>
    `${r.nome} ${r.sobrenome}`
      .toLowerCase()
      .includes(filtroRepresentante.toLowerCase())
  );

  if (carregando) {
    return (
      <Text
        style={{
          fontSize: 20,
          fontWeight: "700",
          padding: 20,
          textAlign: "center",
        }}
      >
        Carregando...
      </Text>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: "#f1f5f9" }}
        contentContainerStyle={{ padding: 16, paddingBottom: 50 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text
          size="4xl"
          style={{
            color: "#1e293b",
            textAlign: "center",
            marginBottom: 20,
            fontWeight: "900",
          }}
        >
          Editar Aluno
        </Text>

        <Box
          style={{
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 14,
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 3,
            marginBottom: 30,
          }}
        >
          {/* INFORMAÇÕES GERAIS */}
          <Text
            size="lg"
            style={{ fontWeight: "900", marginBottom: 15, color: "#1e293b" }}
          >
            Informações Gerais
          </Text>

          <View style={{ flexDirection: "row", gap: 10, marginBottom: 12 }}>
            <Input variant="underlined" size="xl" style={{ flex: 1 }}>
              <InputField
                placeholder="Nome"
                value={aluno.nome}
                onChangeText={(v) => handleChange("nome", v)}
                style={{ color: "#1e293b", fontWeight: "700" }}
              />
            </Input>

            <Input variant="underlined" size="xl" style={{ flex: 1 }}>
              <InputField
                placeholder="Sobrenome"
                value={aluno.sobrenome}
                onChangeText={(v) => handleChange("sobrenome", v)}
                style={{ color: "#1e293b", fontWeight: "700" }}
              />
            </Input>
          </View>

          <View style={{ flexDirection: "row", gap: 10, marginBottom: 12 }}>
            <Input variant="underlined" size="xl" style={{ flex: 1 }}>
              <InputField
                placeholder="Idade"
                value={aluno.idade}
                onChangeText={(v) =>
                  handleChange("idade", v.replace(/[^0-9]/g, ""))
                }
                style={{ color: "#1e293b", fontWeight: "700" }}
                keyboardType="number-pad"
              />
            </Input>

            <Input variant="underlined" size="xl" style={{ flex: 1 }}>
              <InputField
                placeholder="Data Nascimento"
                value={aluno.dataNascimento}
                onChangeText={(v) => handleChange("dataNascimento", v)}
                style={{ color: "#1e293b", fontWeight: "700" }}
              />
            </Input>
          </View>

          {/* SÉRIE */}
          <Text
            size="md"
            style={{ fontWeight: "900", marginBottom: 8, color: "#1e293b" }}
          >
            Série
          </Text>

          <View style={{ marginBottom: 12 }}>
            {series.map((s) => (
              <Button
                key={s.value}
                variant={aluno.serieAluno === s.value ? "solid" : "outline"}
                size="md"
                action="primary"
                onPress={() => handleChange("serieAluno", s.value)}
                style={{ marginBottom: 8, borderRadius: 10 }}
              >
                <ButtonText
                  style={{
                    fontWeight: "700",
                    color:
                      aluno.serieAluno === s.value ? "#fff" : "#1e293b",
                  }}
                >
                  {s.label}
                </ButtonText>
              </Button>
            ))}
          </View>

          {/* ENDEREÇO */}
          <Text
            size="lg"
            style={{ fontWeight: "900", marginVertical: 15, color: "#1e293b" }}
          >
            Endereço
          </Text>

          <Input variant="underlined" size="xl" style={{ marginBottom: 12 }}>
            <InputField
              placeholder="Rua"
              value={aluno.endereco.rua}
              onChangeText={(v) => handleEnderecoChange("rua", v)}
              style={{ color: "#1e293b", fontWeight: "700" }}
            />
          </Input>

          <View style={{ flexDirection: "row", gap: 10, marginBottom: 12 }}>
            <Input variant="underlined" size="xl" style={{ flex: 1 }}>
              <InputField
                placeholder="Número"
                value={aluno.endereco.numero}
                onChangeText={(v) =>
                  handleEnderecoChange("numero", v.replace(/[^0-9]/g, ""))
                }
                style={{ color: "#1e293b", fontWeight: "700" }}
                keyboardType="number-pad"
              />
            </Input>

            <Input variant="underlined" size="xl" style={{ flex: 1 }}>
              <InputField
                placeholder="Bairro"
                value={aluno.endereco.bairro}
                onChangeText={(v) => handleEnderecoChange("bairro", v)}
                style={{ color: "#1e293b", fontWeight: "700" }}
              />
            </Input>
          </View>

          <View style={{ flexDirection: "row", gap: 10, marginBottom: 12 }}>
            <Input variant="underlined" size="xl" style={{ flex: 1 }}>
              <InputField
                placeholder="Cidade"
                value={aluno.endereco.cidade}
                onChangeText={(v) => handleEnderecoChange("cidade", v)}
                style={{ color: "#1e293b", fontWeight: "700" }}
              />
            </Input>

            <Input variant="underlined" size="xl" style={{ flex: 1 }}>
              <InputField
                placeholder="Estado"
                value={aluno.endereco.estado}
                onChangeText={(v) => handleEnderecoChange("estado", v)}
                style={{ color: "#1e293b", fontWeight: "700" }}
              />
            </Input>
          </View>

          <View style={{ flexDirection: "row", gap: 10, marginBottom: 12 }}>
            <Input variant="underlined" size="xl" style={{ flex: 1 }}>
              <InputField
                placeholder="CEP"
                value={aluno.endereco.cep}
                onChangeText={(v) =>
                  handleEnderecoChange("cep", v.replace(/[^0-9]/g, ""))
                }
                style={{ color: "#1e293b", fontWeight: "700" }}
                keyboardType="number-pad"
              />
            </Input>

            <Input variant="underlined" size="xl" style={{ flex: 1 }}>
              <InputField
                placeholder="Complemento"
                value={aluno.endereco.complemento}
                onChangeText={(v) =>
                  handleEnderecoChange("complemento", v)
                }
                style={{ color: "#1e293b", fontWeight: "700" }}
              />
            </Input>
          </View>

          {/* REPRESENTANTES */}
          <Text
            size="md"
            style={{ fontWeight: "900", marginBottom: 8, color: "#1e293b" }}
          >
            Representantes
          </Text>

          <Input variant="underlined" size="xl" style={{ marginBottom: 12 }}>
            <TextInput
              placeholder="Buscar representante"
              value={filtroRepresentante}
              onChangeText={setFiltroRepresentante}
              style={{ color: "#1e293b", fontWeight: "700", padding: 10 }}
            />
          </Input>

          {representantesFiltrados.map((r) => (
            <View
              key={r.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Button
                variant={
                  aluno.representantes.some((rep) => rep.id === r.id)
                    ? "solid"
                    : "outline"
                }
                size="sm"
                action="primary"
                onPress={() =>
                  handleRepresentantesChange(
                    r.id,
                    !aluno.representantes.some((rep) => rep.id === r.id)
                  )
                }
                style={{ borderRadius: 8, flex: 1 }}
              >
                <ButtonText
                  style={{
                    fontWeight: "700",
                    color: aluno.representantes.some(
                      (rep) => rep.id === r.id
                    )
                      ? "#fff"
                      : "#1e293b",
                  }}
                >
                  {r.nome} {r.sobrenome}
                </ButtonText>
              </Button>
            </View>
          ))}

          {/* BOTÃO SALVAR */}
          <Button
            onPress={salvar}
            variant="solid"
            size="lg"
            action="secondary"
            style={{
              marginTop: 30,
              borderRadius: 14,
              backgroundColor: "#2563eb",
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
            <ButtonText
              style={{
                color: "#fff",
                fontSize: 18,
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              Atualizar
            </ButtonText>
          </Button>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
