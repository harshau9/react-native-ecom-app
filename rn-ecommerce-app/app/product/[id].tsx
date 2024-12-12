import React from "react";
import { View, ScrollView } from "react-native";
import { Text } from "@/components/ui/text";
import { useLocalSearchParams } from "expo-router";
import products from "@/assets/products.json";
import { Image } from "@/components/ui/image";
import { Card } from "@/components/ui/card";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText } from "@/components/ui/button";
import { Box } from "@/components/ui/box";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const productId = Number(id); // Convert id to number if it's a string
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-md text-red-500">Oops! Product not found.</Text>
      </View>
    );
  }

  return (
    <Card className="p-5 rounded-lg max-w-[560px] flex-1">
      <Image
        source={{
          uri: product.image,
        }}
        className="mb-6 h-[240px] w-full rounded-md"
        alt={`${product.name} image`}
        resizeMode="contain"
      />
      <Text className="text-sm font-normal mb-2 text-typography-700">
        {product.name}
      </Text>
      <VStack className="mb-6">
        <Heading size="md" className="mb-4">
          Rs{product.price}
        </Heading>
        <Text size="sm">{product.description}</Text>
      </VStack>
      <Box className="flex-col sm:flex-row">
        <Button className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1">
          <ButtonText size="sm">Add to cart</ButtonText>
        </Button>
        <Button
          variant="outline"
          className="px-4 py-2 border-outline-300 sm:flex-1"
        >
          <ButtonText size="sm" className="text-typography-600">
            Wishlist
          </ButtonText>
        </Button>
      </Box>
    </Card>
  );
}
