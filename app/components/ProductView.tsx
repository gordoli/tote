import { Image, StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import { Product } from "../lib/types";

const ProductView = ({ product }: { product: Product }) => {
  return (
    <View className="relative">
      <Image src={product.image} className="w-full rounded-lg aspect-video" />
      <View className="absolute bottom-0 left-0 w-full p-4 rounded-b-lg bg-black/60">
        <Text className="font-semibold text-white">{product.name}</Text>
      </View>
    </View>
  );
};

export default ProductView;
