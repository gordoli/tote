import { Image } from "react-native";
import { Text, View } from "./Themed";
import { Product2 } from "../lib/types";

const ProductView = ({ product }: { product: Product2 }) => {
  return (
    <View className="relative">
      {product.image ? (
        <>
          <Image
            src={product.image}
            className="w-full rounded-lg aspect-video"
          />
          s
          <View className="absolute bottom-0 left-0 w-full p-4 rounded-b-lg bg-black/60">
            <Text className="font-semibold text-white">{product.name}</Text>
          </View>
        </>
      ) : (
        <Text className="font-semibold">{product.name}</Text>
      )}
    </View>
  );
};

export default ProductView;
