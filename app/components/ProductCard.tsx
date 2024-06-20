import { Image } from "react-native";
import { Text, View } from "./Themed";
import { Product } from "../lib/types";
import RatingCircle from "./RatingCircle";
import ProductView from "./ProductView";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <View className="p-6 border-b border-gray-200">
      <View className="flex-row items-center mb-4">
        <Image src={product.brand.logo} className="w-8 h-8 mr-2 rounded" />
        <View>
          <Text className="font-semibold">{product.brand.name}</Text>
          <Text className="text-sm text-muted">{product.category}</Text>
        </View>

        <View className="!ml-auto">
          <RatingCircle rating={product.rating} />
        </View>
      </View>

      <ProductView product={product} />
    </View>
  );
};

export default ProductCard;
