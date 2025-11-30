import { Avatar, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { router } from "expo-router";
import { ScrollView, View } from "react-native";

export default function Menu() {

  const paginaCadastros = () => {
    router.navigate("/telas/menuCadastro/menuCadastro");
  }

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: "#f1f5f9" }}>
      
      <Card style={{
        padding: 20,
        borderRadius: 14,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
        marginBottom: 16
      }}>
        
        <VStack style={{ marginBottom: 20 }}>
          <Heading size="lg" style={{ fontWeight: "900", color: "#1e293b", marginBottom: 6 }}>
            Cadastros
          </Heading>

          <Text size="sm" style={{ color: "#64748b" }}>
            Cadastros de funcionalidades do aplicativo. Clique abaixo para acessar.
          </Text>
        </VStack>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          
          <Avatar style={{ marginRight: 12 }}>
            <AvatarFallbackText>RR</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: 'https://d2r9epyceweg5n.cloudfront.net/apps/4982-pt_BR-cadastro-personalizado.gif',
              }}
            />
          </Avatar>

          <VStack style={{ flex: 1, gap: 10 }}>
            <Heading size="md" style={{ fontWeight: "700", color: "#1e293b" }}>
              Acessar
            </Heading>

            <Button 
              variant="solid" 
              size="lg" 
              action="primary" 
              onPress={paginaCadastros}
              style={{
                borderRadius: 14,
                backgroundColor: "#2563eb",
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 16,
                minHeight: 56, // Garante que o texto nunca será cortado
                shadowColor: "#000",
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 4
              }}
            >
              <ButtonText style={{ 
                color: "#fff", 
                fontWeight: "700", 
                fontSize: 16, 
                textAlign: 'center', // força centralização
                includeFontPadding: false // remove padding extra no Android
              }}>
                Cadastrar
              </ButtonText>
            </Button>
          </VStack>

        </View>

      </Card>

    </ScrollView>
  );
}
