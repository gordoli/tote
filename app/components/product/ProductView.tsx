import { Image, TouchableOpacity } from "react-native";
import { Text, View } from "../Themed";
import { Product } from "../../lib/types";
import { useState } from "react";
import { useWishlist } from "@/app/hooks/useWishlist";
import Toast from "react-native-toast-message";
import { FontAwesome } from "@expo/vector-icons";

const ProductView = ({
  product,
  isCurrUser,
  onEditRankProduct,
}: {
  product: Product,
  isCurrUser: boolean,
  onEditRankProduct: () => void
}) => {
  const [wishlisted, setWishlisted] = useState(product.wishlisted);
  const { handleAddToWishlist, handleRemoveFromWishlist } = useWishlist();

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: `${product.name} ${
        wishlisted ? "removed from" : "added to"
      } your wishlist`,
      position: "bottom",
    });
  };

  const onBookmarkClick = () => {
    if (wishlisted) {
      handleRemoveFromWishlist(product.id);
    } else {
      handleAddToWishlist(product.id);
    }
    showToast();
    setWishlisted(!wishlisted);
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

            
            {!isCurrUser ? (
              <TouchableOpacity onPress={onBookmarkClick}>
                <FontAwesome
                  name={wishlisted ? "bookmark" : "bookmark-o"}
                  color={wishlisted ? "gold" : "white"}
                  size={20}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={onEditRankProduct}>
                <FontAwesome
                  name="edit"
                  color="white"
                  size={20}
                />
              </TouchableOpacity>
            )}
          </View>
        </>
      ) : (
        <View className="flex-row items-center justify-between mt-2">
          <Text className="font-semibold">{product.name}</Text>
          {!isCurrUser ? (
            <TouchableOpacity onPress={onBookmarkClick} className="mr-2">
              <FontAwesome
                name={wishlisted ? "bookmark" : "bookmark-o"}
                color={wishlisted ? "gold" : "black"}
                size={20}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onEditRankProduct} className="mr-2">
              <FontAwesome
                name="edit"
                color="black"
                size={20}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default ProductView;
