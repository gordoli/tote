import { Image, TouchableOpacity } from "react-native";
import { Text, View } from "../Themed";
import { Product, User } from "../../lib/types";
import RatingCircle from "../RatingCircle";
import ProductView from "./ProductView";
import Avatar from "../Avatar";
import { useCurrentUser } from "@/app/hooks/useCurrentUser";
import { useRouter } from "expo-router";

const ProductCard = ({ product }: { product: Product }) => {
  const { currUser } = useCurrentUser();
  const router = useRouter();

  const onUserClick = (user: User | undefined) => {
    router.navigate({
      pathname: "/screens/userProfile",
      params: { ...user, screen: "feed" },
    });
  };

  return (
    <View className="p-6 border-b border-gray-200">
      <View className="flex-row items-center mb-4">
        <Avatar
          src={product.brand?.logo || null}
          className="w-8 h-8"
          shape="rounded"
        />
        <View className="ml-2">
          <View className="flex-row items-center">
            <Text className="font-semibold">{product.brand?.name || ""}</Text>
            {product.createdBy?.id !== currUser?.id ? (
              <TouchableOpacity onPress={() => onUserClick(product.createdBy)}>
                <Text className="font-semibold">
                  {" "}
                  · {product.createdBy?.username}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => onUserClick(product.createdBy)}>
                <Text className="font-semibold"> · You</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text className="text-sm text-muted">
            {product.category?.name || ""}
          </Text>
        </View>

        <View className="!ml-auto">
          <RatingCircle rating={product.rate} />
        </View>
      </View>

      <ProductView product={product} />
    </View>
  );
};

export default ProductCard;
