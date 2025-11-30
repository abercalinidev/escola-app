import { ScrollView, View } from "react-native";

import { Avatar, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { router } from "expo-router";


export default function Menu() {

  const paginaCadastros = () => {
    router.navigate("/telas/menuCadastro/menuCadastro");
  }

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: "#cbd5e1" }}>
      
      <Card className="p-5 rounded-lg max-w-[360px] m-3 bg-white">
        
        <VStack className="mb-6">
          <Heading size="md" className="mb-4 text-black">
            Cadastros
          </Heading>

          <Text size="sm" className="text-black">
            Cadastros de funcionalidades do aplicativo...
          </Text>
        </VStack>

        <View className="flex-row items-center">
          
          <Avatar className="mr-3">
            <AvatarFallbackText>RR</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: 'https://d2r9epyceweg5n.cloudfront.net/apps/4982-pt_BR-cadastro-personalizado.gif',
              }}
            />
          </Avatar>

          <VStack>
            <Heading size="sm" className="mb-2 text-black">
              Acessar
            </Heading>

            <Button variant="solid" size="md" action="primary" onPress={paginaCadastros}>
              <ButtonText>Cadastrar</ButtonText>
            </Button>
          </VStack>

        </View>

      </Card>

    </ScrollView>
  );
}
