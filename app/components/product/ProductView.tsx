import { Image, TouchableOpacity } from "react-native";
import { Text, View } from "../Themed";
import { Product } from "../../lib/types";
import { useState } from "react";
import { useWishlist } from "@/app/hooks/useWishlist";
import Toast from "react-native-toast-message";
import { FontAwesome } from "@expo/vector-icons";

const ProductView = ({ product }: { product: Product }) => {
  const [wishlisted, setWishlisted] = useState(false);
  const { handleAddToWishlist } = useWishlist();

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: `${product.name} added to your wishlist`,
      position: "bottom",
    });
  };

  const onBookmarkClick = () => {
    // handleAddToWishlist(item.rankProduct.id);
    console.log("Here");
    setWishlisted(!wishlisted);
    showToast();
  };

  return (
    <View className="relative">
      {product.image && product.image !== "" ? (
        <>
          <Image
            src={product.image}
            className="w-full rounded-lg aspect-video"
          />

          <View className="absolute bottom-0 left-0 flex-row justify-between w-full p-4 rounded-b-lg bg-black/60">
            <Text className="font-semibold text-white">{product.name}</Text>

            <TouchableOpacity onPress={onBookmarkClick}>
              <FontAwesome
                name={wishlisted ? "bookmark" : "bookmark-o"}
                color={wishlisted ? "gold" : "white"}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View className="flex-row items-center justify-between mt-2">
          <Text className="font-semibold">{product.name}</Text>

          <TouchableOpacity onPress={onBookmarkClick} className="mr-2">
            <FontAwesome
              name={wishlisted ? "bookmark" : "bookmark-o"}
              color={wishlisted ? "gold" : "black"}
              size={20}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ProductView;
