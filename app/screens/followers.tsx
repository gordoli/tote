import { ScrollView } from "react-native";
import { Text, View } from "../components/Themed";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const FollowersScreen = () => {
  const router = useRouter();

  return (
    <ScrollView className="bg-white">
      <Stack.Screen
        options={{
          title: "Tote",
          headerLeft: () => (
            <FollowersScreenHeader side="left" onBack={() => router.back()} />
          ),
          headerTitle: () => <FollowersScreenHeader side="center" />,
          headerRight: () => <FollowersScreenHeader side="right" />,
          headerShadowVisible: false,
          headerBackVisible: false,
        }}
      />
    </ScrollView>
  );
};

export default FollowersScreen;

const FollowersScreenHeader = ({
  side,
  onBack,
}: {
  side: string;
  onBack?: () => void;
}) => {
  return (
    <>
      {side === "left" && (
        <View className="flex-row items-center">
          <Ionicons
            name="chevron-back-outline"
            size={24}
            color="gray"
            onPress={onBack}
          />
          <Text className="ml-2">Notifications</Text>
        </View>
      )}
    </>
  );
};
