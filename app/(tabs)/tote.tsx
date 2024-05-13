import { View, Text } from "@/app/components/Themed";
import { DUMMY_PRODUCTS, Product } from "../lib/types";
import { Image } from "react-native";
import ProductView from "../components/ProductView";
import RatingCircle from "../components/RatingCircle";
import { ScrollView } from "react-native";
import ToteTitle from "../components/ToteTitle";
import { FontAwesome } from "@expo/vector-icons";

const Tote = () => {
  return (
    <ScrollView>
      {DUMMY_PRODUCTS.map((product, i: number) => (
        <ToteProductCard key={i} product={product} />
      ))}
    </ScrollView>
  );
};

export default Tote;

const ToteProductCard = ({ product }: { product: Product }) => {
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

export const ToteScreenHeader = ({ side }: { side: string }) => {
  return (
    <>
      {side === "left" && (
        <View className="flex-row items-center px-4">
          <ToteTitle />
        </View>
      )}

      {side === "right" && (
        <View className="flex-row items-center px-4 space-x-2">
          <FontAwesome name="plus-circle" size={20} />
          <FontAwesome name="bell-o" size={20} />
        </View>
      )}
    </>
  );
};
