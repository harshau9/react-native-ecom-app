import { FormControl } from '@/components/ui/form-control';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon } from 'lucide-react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { useState } from 'react';
import { HStack } from '@/components/ui/hstack';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/api/auth';
import { useAuth } from '@/store/authStore';
import { Redirect, Link } from 'expo-router';
import { Pressable, ActivityIndicator } from 'react-native';

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const setUser = useAuth((s) => s.setUser);
  const setToken = useAuth((s) => s.setToken);
  const isLoggedIn = useAuth((s) => !!s.token);

  const loginMutation = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (data) => {
      console.log('Success: ', data);
      if (data.user && data.token) {
        setUser(data.user);
        setToken(data.token);
      }
    },
    onError: () => {
      console.log('Error logging in');
    },
  });

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  if (isLoggedIn) {
    return <Redirect href="/" />;
  }

  return (
    <FormControl
      isInvalid={!!loginMutation.error}
      className="p-4 border rounded-lg max-w-[500px] border-outline-300 bg-white m-2"
    >
      <VStack space="xl">
        <Heading className="text-typography-900 leading-3 pt-3">
          Login
        </Heading>

        <VStack space="xs">
          <Text className="text-typography-500 leading-1">Email</Text>
          <Input>
            <InputField
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
          </Input>
        </VStack>

        <VStack space="xs">
          <Text className="text-typography-500 leading-1">Password</Text>
          <Input>
            <InputField
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <InputSlot className="pr-3" onPress={handleShowPassword}>
              <InputIcon
                as={showPassword ? EyeIcon : EyeOffIcon}
                className="text-darkBlue-500"
              />
            </InputSlot>
          </Input>
        </VStack>

        <HStack space="sm">
          <Button
            className="flex-1"
            onPress={() => loginMutation.mutate()}
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <ButtonText>Sign in</ButtonText>
            )}
          </Button>
        </HStack>

        {/* Signup link below button */}
        <VStack space="xs" className="mt-3">
          <Text className="text-center">Don&#39;t have an account?</Text>
          <Link href="/signup" asChild>
            <Pressable>
              <Text className="text-center text-blue-500">Sign up</Text>
            </Pressable>
          </Link>
        </VStack>
      </VStack>
    </FormControl>
  );
}
