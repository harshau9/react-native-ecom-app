import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { useCart } from '@/store/cartStore';
import { FlatList } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { Redirect, useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '@/api/orders';

export default function CartScreen() {
  const items = useCart((state) => state.items);
  const resetCart = useCart((state) => state.resetCart);
  const router = useRouter();

  const createOrderMutation = useMutation({
    mutationFn: () =>
      createOrder(
        items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
        }))
      ),
    onSuccess: () => {
      resetCart();
      router.replace('/order-success');
    },
    onError: (error) => {
      console.log(error);
      // Show an error or do what you wish
    },
  });

  const onCheckout = () => {
    createOrderMutation.mutate();
  };

  if (items.length === 0) {
    return <Redirect href="/" />;
  }

  return (
    <FlatList
      data={items}
      contentContainerStyle={{
        gap: 8,
        maxWidth: 960,
        width: '100%',
        alignSelf: 'center',
        padding: 8,
      }}
      renderItem={({ item }) => (
        <HStack style={{ backgroundColor: 'white', padding: 12 }}>
          <VStack>
            <Text bold>{item.product.name}</Text>
            <Text>$ {item.product.price}</Text>
          </VStack>
          <Text style={{ marginLeft: 'auto' }}>{item.quantity}</Text>
        </HStack>
      )}
      ListFooterComponent={() => (
        <Button onPress={onCheckout}>
          <ButtonText>Checkout</ButtonText>
        </Button>
      )}
    />
  );
}
