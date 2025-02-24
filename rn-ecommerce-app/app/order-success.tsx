import React from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";

export default function OrderSuccessScreen() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text className="text-xl font-bold mb-4">Order Placed Successfully!</Text>
      <Text className="text-center mb-6">
        Your order has been placed. Thank you for shopping with us.
      </Text>

      <Button
        onPress={() => {
          router.replace("/");
        }}
      >
        <ButtonText>Continue Shopping</ButtonText>
      </Button>
    </View>
  );
}
