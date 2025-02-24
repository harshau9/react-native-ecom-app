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
import { signup } from '@/api/auth';
import { useAuth } from '@/store/authStore';
import { Redirect, Link, useRouter } from 'expo-router';
import { Pressable, ActivityIndicator } from 'react-native';

export default function SignupScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isLoggedIn = useAuth((s) => !!s.token);
  const router = useRouter();

  const signupMutation = useMutation({
    mutationFn: () => signup(email, password),
    onSuccess: (data) => {
      console.log('Success sign up: ', data);
      // Instead of setting token/user, redirect to login
      router.replace('/login');
    },
    onError: (error) => {
      console.log('Error signing up: ', error);
    },
  });

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSignup = () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      // For a simple approach, you can do an alert or some error UI
      alert("Passwords don't match!");
      return;
    }
    signupMutation.mutate();
  };

  if (isLoggedIn) {
    return <Redirect href="/" />;
  }

  return (
    <FormControl
      isInvalid={!!signupMutation.error}
      className="p-4 border rounded-lg max-w-[500px] border-outline-300 bg-white m-2"
    >
      <VStack space="xl">
        <Heading className="text-typography-900 leading-3 pt-3">
          Sign up
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

        {/* Password Input */}
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

        {/* Confirm Password Input */}
        <VStack space="xs">
          <Text className="text-typography-500 leading-1">
            Confirm Password
          </Text>
          <Input>
            <InputField
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <InputSlot
              className="pr-3"
              onPress={handleShowConfirmPassword}
            >
              <InputIcon
                as={showConfirmPassword ? EyeIcon : EyeOffIcon}
                className="text-darkBlue-500"
              />
            </InputSlot>
          </Input>
        </VStack>

        <HStack space="sm">
          <Button
            className="flex-1"
            onPress={handleSignup}
            disabled={signupMutation.isPending}
          >
            {signupMutation.isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <ButtonText>Sign up</ButtonText>
            )}
          </Button>
        </HStack>

        {/* Login link below button */}
        <VStack space="xs" className="mt-3">
          <Text className="text-center">Already have an account?</Text>
          <Link href="/login" asChild>
            <Pressable>
              <Text className="text-center text-blue-500">Log in</Text>
            </Pressable>
          </Link>
        </VStack>
      </VStack>
    </FormControl>
  );
}
