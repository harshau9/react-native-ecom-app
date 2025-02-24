import '@/global.css';
import { Link, Stack, useRouter, useSegments } from 'expo-router';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Icon } from '@/components/ui/icon';
import { ShoppingCart, User, LogOut } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { useCart } from '@/store/cartStore';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/store/authStore';
import { useEffect } from 'react';

const queryClient = new QueryClient();

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  const cartItemsNum = useCart((state) => state.items.length);
  const { token, setToken, setUser } = useAuth();
  const isLoggedIn = !!token;

  // If no token and not on (auth) screen => redirect to login
  useEffect(() => {
    const topSegment = segments[0]; // e.g. 'index', '(auth)', 'product', etc.
    if (!isLoggedIn && topSegment !== '(auth)') {
      router.replace('/login');
    }
  }, [isLoggedIn, segments, router]);

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    // After logging out, go to login page
    router.replace('/login');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="light">
        <Stack
          screenOptions={{
            headerRight: () =>
              isLoggedIn && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {cartItemsNum > 0 && (
                    <Link href="/cart" asChild>
                      <Pressable
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginRight: 16,
                        }}
                      >
                        <Icon as={ShoppingCart} />
                        <Text>{cartItemsNum}</Text>
                      </Pressable>
                    </Link>
                  )}
                  <Pressable style={{ marginRight: 10 }} onPress={handleLogout}>
                    <Icon as={LogOut} />
                  </Pressable>
                </View>
              ),
            headerLeft: () =>
              !isLoggedIn && (
                <Link href="/login" asChild>
                  <Pressable style={{ marginLeft: 10, flexDirection: 'row' }}>
                    <Icon as={User} />
                  </Pressable>
                </Link>
              ),
          }}
        >
          {/* Screens */}
          <Stack.Screen name="index" options={{ title: 'Shop' }} />
          <Stack.Screen name="cart" options={{ title: 'Cart' }} />
          <Stack.Screen name="product/[id]" options={{ title: 'Product' }} />
          <Stack.Screen name="order-success" options={{ title: 'Success' }} />

          {/* Auth screens */}
          <Stack.Screen name="(auth)/login" options={{ title: 'Login' }} />
          <Stack.Screen name="(auth)/signup" options={{ title: 'Signup' }} />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
