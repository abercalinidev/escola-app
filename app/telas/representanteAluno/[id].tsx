import { buscarRepresentanteAlunosId } from "@/app/services/representante/representanteAluno";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function RepresentanteAluno() {
  const { id } = useLocalSearchParams();
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);

  const buscar = async () => {
    try {
      const response = await buscarRepresentanteAlunosId(id);
      setAlunos(response.alunos || []);
    } catch (error) {
      console.log("Erro ao buscar alunos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscar();
  }, []);

  const abrirDetalhes = (idAluno: any) => {
    router.push(`/telas/informacaoAluno/${idAluno}`);
  };

  return (
    <LinearGradient
      colors={["#dbeafe", "#eff6ff"]}
      style={{ flex: 1, padding: 20 }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
          color: "#1e3a8a",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Alunos do Representante
      </Text>

      {loading ? (
        <View style={{ marginTop: 40 }}>
          <ActivityIndicator size="large" color="#1e40af" />
        </View>
      ) : alunos.length === 0 ? (
        <Text style={{ fontSize: 18, textAlign: "center", marginTop: 40 }}>
          Nenhum aluno encontrado.
        </Text>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          {alunos.map((aluno: any) => (
            <TouchableOpacity
              key={aluno.id}
              onPress={() => abrirDetalhes(aluno.id)}
              activeOpacity={0.8}
            >
              <View
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: 16,
                  padding: 20,
                  marginBottom: 18,
                  shadowColor: "#000",
                  shadowOpacity: 0.15,
                  shadowRadius: 10,
                  elevation: 4,
                }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "700",
                    color: "#1e3a8a",
                    marginBottom: 10,
                  }}
                >
                  {aluno.nome} {aluno.sobrenome}
                </Text>

                <Text style={{ fontSize: 16, color: "#334155", marginBottom: 5 }}>
                  🎂 Idade: <Text style={{ fontWeight: "600" }}>{aluno.idade}</Text>
                </Text>

                <Text style={{ fontSize: 16, color: "#334155", marginBottom: 5 }}>
                  🎒 Série: <Text style={{ fontWeight: "600" }}>{aluno.serieAluno}</Text>
                </Text>

                <Text style={{ fontSize: 16, color: "#334155", marginBottom: 5 }}>
                  📌 Situação:{" "}
                  <Text
                    style={{
                      fontWeight: "700",
                      color: aluno.situacao === "ATIVO" ? "green" : "red",
                    }}
                  >
                    {aluno.situacao}
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </LinearGradient>
  );
}
