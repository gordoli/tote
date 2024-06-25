import { Text, View } from "../Themed";
import { Brand } from "../../lib/types";
import Avatar from "../Avatar";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const BrandCard = ({ brand }: { brand: Brand }) => {
  const router = useRouter();

  const onGoToBrandProfile = (brand: Brand) => {
    router.navigate({
      pathname: "/screens/brand",
      params: brand,
    });
  };

  return (
    <View className="flex-row items-center px-6 py-2">
      <TouchableOpacity
        className="flex-row items-center w-3/4"
        onPress={() => onGoToBrandProfile(brand)}
      >
        <Avatar src={brand.logo} className="w-8 h-8" shape="rounded" />
        <View className="ml-2">
          <Text className="font-semibold">{brand.name}</Text>
        </View>
      </TouchableOpacity>
      <View className="!ml-auto flex-row items-center items-end space-x-2">
        <FontAwesome name="plus-circle" size={20} />
      </View>
    </View>
  );
};

export default BrandCard;
