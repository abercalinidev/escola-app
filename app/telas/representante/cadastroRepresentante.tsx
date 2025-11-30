import { salvarRepresentante } from "@/app/services/representante/representante";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

export default function CadastroRepresentante() {
  const [representante, setRepresentante] = useState({
    nome: '',
    sobrenome: '',
    celular: '',
    email: '',
    cpf: '',
    endereco: {
      rua: '',
      cep: '',
      estado: '',
      complemento: '',
      numero: '',
      cidade: '',
      bairro: ''
    }
  });

  const handleChange = (key: string, value: string) => {
    setRepresentante({ ...representante, [key]: value });
  };

  const handleEnderecoChange = (key: string, value: string) => {
    setRepresentante({
      ...representante,
      endereco: { ...representante.endereco, [key]: value }
    });
  };

 const salvar = async () => {
  try {
    await salvarRepresentante(representante);

    // ALERTA DE SUCESSO
    Alert.alert(
      "Sucesso",
      "Representante salvo com sucesso!",
      [
        {
          text: "OK",
          onPress: () => {
            // Resetar o formulário
            setRepresentante({
              nome: '',
              sobrenome: '',
              celular: '',
              email: '',
              cpf: '',
              endereco: {
                rua: '',
                cep: '',
                estado: '',
                complemento: '',
                numero: '',
                cidade: '',
                bairro: ''
              }
            });

            // Navegar para lista
            router.navigate("/telas/representante/listarRepresentante")
          }
        }
      ]
    );
  } catch (error) {
    console.log(error);
    Alert.alert("Erro", "Não foi possível salvar o representante.");
  }
};


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
        <Text size="4xl" style={{ color: "#1e293b", textAlign: "center", marginBottom: 20, fontWeight: '900' }}>
          Cadastro Representante
        </Text>

        <Box style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 14,
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 3,
          marginBottom: 30
        }}>
          {/* INFORMAÇÕES GERAIS */}
          <Text size="lg" style={{ fontWeight: '900', marginBottom: 15, color: "#1e293b" }}>
            Informações Gerais
          </Text>

          <View style={{ flexDirection: 'row', gap: 10, marginBottom: 12 }}>
            <Input variant="underlined" size="xl" style={{ flex: 1 }}>
              <InputField
                placeholder="Nome"
                value={representante.nome}
                onChangeText={(v) => handleChange('nome', v)}
                style={{ color: "#1e293b", fontWeight: '700' }}
              />
            </Input>

            <Input variant="underlined" size="xl" style={{ flex: 1 }}>
              <InputField
                placeholder="Sobrenome"
                value={representante.sobrenome}
                onChangeText={(v) => handleChange('sobrenome', v)}
                style={{ color: "#1e293b", fontWeight: '700' }}
              />
            </Input>
          </View>

          <Input variant="underlined" size="xl" style={{ marginBottom: 12 }}>
            <InputField
              placeholder="Email"
              value={representante.email}
              onChangeText={(v) => handleChange('email', v)}
              style={{ color: "#1e293b", fontWeight: '700' }}
              keyboardType="email-address"
            />
          </Input>

          <View style={{ flexDirection: 'row', gap: 10, marginBottom: 12 }}>
            <Input variant="underlined" size="xl" style={{ flex: 1 }}>
              <InputField
                placeholder="Celular"
                value={representante.celular}
                onChangeText={(v) => handleChange('celular', v.replace(/[^0-9]/g, ''))}
                style={{ color: "#1e293b", fontWeight: '700' }}
                keyboardType="number-pad"
              />
            </Input>

            <Input variant="underlined" size="xl" style={{ flex: 1 }}>
              <InputField
                placeholder="CPF"
                value={representante.cpf}
                onChangeText={(v) => handleChange('cpf', v.replace(/[^0-9]/g, ''))}
                style={{ color: "#1e293b", fontWeight: '700' }}
                keyboardType="number-pad"
              />
            </Input>
          </View>

          {/* ENDEREÇO */}
          <Text size="lg" style={{ fontWeight: '900', marginVertical: 15, color: "#1e293b" }}>
            Endereço
          </Text>

          <Input variant="underlined" size="xl" style={{ marginBottom: 12 }}>
            <InputField
              placeholder="Rua"
              value={representante.endereco.rua}
              onChangeText={(v) => handleEnderecoChange('rua', v)}
              style={{ color: "#1e293b", fontWeight: '700' }}
            />
          </Input>

          <View style={{ flexDirection: 'row', gap: 10, marginBottom: 12 }}>
            <Input variant="underlined" size="xl" style={{ flex: 1 }}>
              <InputField
                placeholder="Número"
                value={representante.endereco.numero}
                onChangeText={(v) => handleEnderecoChange('numero', v.replace(/[^0-9]/g, ''))}
                style={{ color: "#1e293b", fontWeight: '700' }}
                keyboardType="number-pad"
              />
            </Input>

            <Input variant="underlined" size="xl" style={{ flex: 1 }}>
              <InputField
                placeholder="Bairro"
                value={representante.endereco.bairro}
                onChangeText={(v) => handleEnderecoChange('bairro', v)}
                style={{ color: "#1e293b", fontWeight: '700' }}
              />
            </Input>
          </View>

          <View style={{ flexDirection: 'row', gap: 10, marginBottom: 12 }}>
            <Input variant="underlined" size="xl" style={{ flex: 1 }}>
              <InputField
                placeholder="Cidade"
                value={representante.endereco.cidade}
                onChangeText={(v) => handleEnderecoChange('cidade', v)}
                style={{ color: "#1e293b", fontWeight: '700' }}
              />
            </Input>

            <Input variant="underlined" size="xl" style={{ flex: 1 }}>
              <InputField
                placeholder="Estado"
                value={representante.endereco.estado}
                onChangeText={(v) => handleEnderecoChange('estado', v)}
                style={{ color: "#1e293b", fontWeight: '700' }}
              />
            </Input>
          </View>

          <View style={{ flexDirection: 'row', gap: 10, marginBottom: 12 }}>
            <Input variant="underlined" size="xl" style={{ flex: 1 }}>
              <InputField
                placeholder="CEP"
                value={representante.endereco.cep}
                onChangeText={(v) => handleEnderecoChange('cep', v.replace(/[^0-9]/g, ''))}
                style={{ color: "#1e293b", fontWeight: '700' }}
                keyboardType="number-pad"
              />
            </Input>

            <Input variant="underlined" size="xl" style={{ flex: 1 }}>
              <InputField
                placeholder="Complemento"
                value={representante.endereco.complemento}
                onChangeText={(v) => handleEnderecoChange('complemento', v)}
                style={{ color: "#1e293b", fontWeight: '700' }}
              />
            </Input>
          </View>

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
              elevation: 4
            }}
          >
            <ButtonText style={{ color: "#fff", fontSize: 18, fontWeight: "700", textAlign: 'center' }}>
              Salvar
            </ButtonText>
          </Button>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
