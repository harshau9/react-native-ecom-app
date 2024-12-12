import React from "react";
import { FlatList, Text, View } from "react-native";
import products from "../assets/products.json";
import ProductListItem from "../components/ProductListItem"
export default function HomeScreen() {
  return (
    <View>
      <FlatList
        data={products}
        numColumns={2}
        renderItem={({ item }) => <ProductListItem product={item}/>}
        contentContainerClassName="gap-2"
        columnWrapperClassName="gap-2"
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
