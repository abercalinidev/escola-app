import { informacaoAluno } from "@/app/services/representante/representanteAluno";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function InformacaoAluno() {
  const { id } = useLocalSearchParams();

  // 👉 Input começa com a data atual
  const hoje = new Date();
  const dataHoje = hoje.toLocaleDateString("pt-BR");

  const [data, setData] = useState(dataHoje);
  const [informacoes, setInformacoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function buscar(filtrarData = false) {
    try {
      setLoading(true);

      const response = await informacaoAluno(id, filtrarData ? data : null);

      console.log("RESPONSE:", response);

      setInformacoes(response ?? []);
    } catch (error) {
      console.log("Erro ao carregar informações:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    buscar(false); // 👉 busca tudo na primeira vez
  }, []);

  const formatarData = (texto: string) => {
  // Remove tudo que não é número
  let numeros = texto.replace(/\D/g, "");

  if (numeros.length > 2 && numeros.length <= 4) {
    numeros = numeros.replace(/(\d{2})(\d+)/, "$1/$2");
  } else if (numeros.length > 4) {
    numeros = numeros.replace(/(\d{2})(\d{2})(\d+)/, "$1/$2/$3");
  }

  return numeros;
};

  return (
    <View style={{ flex: 1, backgroundColor: "#f1f5f9", padding: 20 }}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
          marginBottom: 15,
          color: "#1e3a8a",
          textAlign: "center",
        }}
      >
        Informações do Aluno
      </Text>

      {/* INPUT DA DATA */}
      <TextInput placeholder="Digite a data (dd/MM/yyyy)" keyboardType="numeric" value={data}
        onChangeText={(texto) => setData(formatarData(texto))} maxLength={10} // dd/MM/yyyy tem 10 caracteres
        style={{backgroundColor: "#fff",padding: 14,borderRadius: 12,borderWidth: 1,borderColor: "#cbd5e1",
                fontSize: 16,marginBottom: 12}}
/>

      {/* BOTÃO COM ÍCONE */}
      <TouchableOpacity
        onPress={() => buscar(true)}
        disabled={loading}
        style={{
          backgroundColor: loading ? "#93c5fd" : "#2563eb",
          paddingVertical: 14,
          borderRadius: 12,
          alignItems: "center",
          marginBottom: 15,
          flexDirection: "row",
          justifyContent: "center",
          gap: 10,
          alignSelf: "center",
          paddingHorizontal: 25,
        }}
      >
        <MaterialCommunityIcons name="magnify" size={22} color="#fff" />
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700", width : 280, textAlign : "center" }}>
          Buscar por data
        </Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 30 }} color="#1e40af" />
      ) : (
        <ScrollView
          style={{ marginTop: 10 }}
          contentContainerStyle={{ paddingBottom: 60 }} // evita cortar último card
        >
          {informacoes.length === 0 ? (
            <Text style={{ textAlign: "center", fontSize: 18 }}>
              Nenhuma informação encontrada.
            </Text>
          ) : (
            informacoes.map((info: any) => (
              <View
                key={info.id}
                style={{
                  backgroundColor: "#ffffff",
                  padding: 20,
                  borderRadius: 16,
                  marginBottom: 18,
                  shadowColor: "#000",
                  shadowOpacity: 0.15,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              >
                {/* TÍTULO DA DATA */}
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <MaterialCommunityIcons
                    name="calendar-month"
                    size={24}
                    color="#1e3a8a"
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "700",
                      color: "#1e3a8a",
                    }}
                  >
                    {info.dataCadastro}
                  </Text>
                </View>

                {/* CAFÉ DA MANHÃ */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 12,
                    gap: 6,
                  }}
                >
                  <MaterialCommunityIcons
                    name="coffee-outline"
                    size={22}
                    color="#334155"
                  />
                  <Text style={{ fontSize: 16, color: "#334155" }}>
                    Café da manhã:{" "}
                    <Text style={{ fontWeight: "600" }}>
                      {info.situacaoCafeManha}
                    </Text>
                  </Text>
                </View>

                {/* ALMOÇO */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 6,
                    gap: 6,
                  }}
                >
                  <MaterialCommunityIcons
                    name="silverware-fork-knife"
                    size={22}
                    color="#334155"
                  />
                  <Text style={{ fontSize: 16, color: "#334155" }}>
                    Almoço:{" "}
                    <Text style={{ fontWeight: "600" }}>
                      {info.situacaoAlmoco}
                    </Text>
                  </Text>
                </View>

                {/* CAFÉ DA TARDE */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 6,
                    gap: 6,
                  }}
                >
                  <MaterialCommunityIcons
                    name="coffee"
                    size={22}
                    color="#334155"
                  />
                  <Text style={{ fontSize: 16, color: "#334155" }}>
                    Café da tarde:{" "}
                    <Text style={{ fontWeight: "600" }}>
                      {info.situacaoCafeTarde}
                    </Text>
                  </Text>
                </View>

                {/* OBSERVAÇÃO */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    marginTop: 10,
                    gap: 6,
                  }}
                >
                  <MaterialCommunityIcons
                    name="note-text-outline"
                    size={22}
                    color="#475569"
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#475569",
                      fontStyle: "italic",
                      flex: 1,
                    }}
                  >
                    {info.observacao || "Nenhuma observação."}
                  </Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}
