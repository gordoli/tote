import { View, Text } from "@/app/components/Themed";
import { CURRENT_USER, UserStats } from "../lib/types";
import ToteTitle from "../components/ToteTitle";
import { FontAwesome } from "@expo/vector-icons";
import Avatar from "../components/Avatar";
import { TouchableOpacity } from "react-native";

const Profile = () => {
  return (
    <View className="flex-col items-center min-h-screen space-y-4">
      <Avatar src={CURRENT_USER.avatar} size="xl" />

      <View>
        <Text className="font-semibold">{CURRENT_USER.name}</Text>
        <Text className="text-muted">@{CURRENT_USER.username}</Text>
      </View>

      <ProfileStats stats={CURRENT_USER.stats} />

      <View className="flex-row items-center justify-center space-x-4">
        <TouchableOpacity
          className="px-4 py-2 bg-white border border-gray-300 rounded-full"
          onPress={() => {
            /* Handle edit profile */
          }}
        >
          <Text className="text-sm">Edit profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="px-4 py-2 bg-white border border-gray-300 rounded-full"
          onPress={() => {
            /* Handle share profile */
          }}
        >
          <Text className="text-sm">Share profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const ProfileStats = ({ stats }: { stats: UserStats }) => {
  return (
    <View className="flex flex-row items-center w-4/5 px-4 py-2 mt-4 border border-gray-200 rounded-lg">
      <View className="flex-col items-center w-1/3">
        <Text className="font-semibold">{stats.followers}</Text>
        <Text className="text-sm text-muted">followers</Text>
      </View>
      <View className="flex-col items-center w-1/3">
        <Text className="font-semibold">{stats.following}</Text>
        <Text className="text-sm text-muted">following</Text>
      </View>
      <View className="flex-col items-center w-1/3">
        <Text className="font-semibold">{stats.products}</Text>
        <Text className="text-sm text-muted">products</Text>
      </View>
    </View>
  );
};

export const ProfileScreenHeader = ({ side }: { side: string }) => {
  return (
    <>
      {side === "left" && (
        <View className="flex-row items-center px-4">
          <ToteTitle />
        </View>
      )}
      {side === "right" && (
        <View className="flex-row items-center px-4 space-x-2">
          <FontAwesome name="search" size={20} />
          <FontAwesome name="bell-o" size={20} />
        </View>
      )}
    </>
  );
};
