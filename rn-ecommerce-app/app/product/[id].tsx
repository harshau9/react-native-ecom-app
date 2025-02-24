import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Text } from '@/components/ui/text';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Image } from '@/components/ui/image';
import { Card } from '@/components/ui/card';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { Box } from '@/components/ui/box';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '@/api/products';
import { useCart } from '@/store/cartStore';

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  image?: string;
}

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const addProduct = useCart((state) => state.addProduct);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(Number(id)),
    enabled: !!id, // Only run if `id` is truthy
  });

  const addToCart = () => {
    if (!product) return;
    addProduct(product);
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error || !product) {
    return <Text>Product not found!</Text>;
  }

  return (
    <Box className="flex-1 items-center p-3">
      <Stack.Screen options={{ title: product.name }} />

      <Card className="p-5 rounded-lg max-w-[960px] w-full flex-1">
        <Image
          source={{ uri: product.image }}
          className="mb-6 h-[240px] w-full rounded-md"
          alt={`${product.name} image`}
          resizeMode="contain"
        />
        <Text className="text-sm font-normal mb-2 text-typography-700">
          {product.name}
        </Text>
        <VStack className="mb-6">
          <Heading size="md" className="mb-4">
            ${product.price}
          </Heading>
          {product.description && <Text size="sm">{product.description}</Text>}
        </VStack>
        <Box className="flex-col sm:flex-row">
          <Button
            onPress={addToCart}
            className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1"
          >
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
    </Box>
  );
}
