import React, { useEffect } from "react";
import { FlatList, View } from "react-native";
import products from "@/assets/products.json";
import ProductListItem from "@/components/ProductListItem";
import { useBreakpointValue } from "@/components/ui/utils/use-break-point-value";
import { listProducts } from "@/api/products";
export default function HomeScreen() {

  useEffect(() =>{
    listProducts();
  },[])
  const numColumns = useBreakpointValue({
    default: 2,
    sm: 3,
    xl: 4,
  });

  return (
    <View>
      <FlatList
        data={products}
        numColumns={numColumns}
        renderItem={({ item }) => <ProductListItem product={item} />}
        contentContainerClassName="gap-2 max-w-[960px] mx-suto w-full"
        columnWrapperClassName="gap-2"
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
