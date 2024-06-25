import { Text, View } from "../Themed";
import { Brand, User } from "../../lib/types";
import Avatar from "../Avatar";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const UserCard = ({ user }: { user: User }) => {
  const router = useRouter();

  const onGoToUserProfile = (user: User) => {
    router.navigate({
      pathname: "/screens/userProfile",
      params: user,
    });
  };

  return (
    <View className="flex-row items-center px-6 py-2">
      <TouchableOpacity
        className="flex-row items-center w-3/4"
        onPress={() => onGoToUserProfile(user)}
      >
        <Avatar src={user.avatar} className="w-8 h-8" />
        <View className="ml-2">
          <Text className="font-semibold">{user.username}</Text>
        </View>
      </TouchableOpacity>
      <View className="!ml-auto flex-row items-center items-end space-x-2">
        <FontAwesome name="plus-circle" size={20} />
      </View>
    </View>
  );
};

export default UserCard;
