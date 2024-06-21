import { ScrollView } from "react-native";
import { Text, View } from "../components/Themed";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ToteTitle from "../components/ToteTitle";
import { DUMMY_NOTIFICATIONS, Notification } from "../lib/types";
import Avatar from "../components/Avatar";

const NotificationsScreen = () => {
  const router = useRouter();

  return (
    <ScrollView className="bg-white">
      <Stack.Screen
        options={{
          title: "Tote",
          headerLeft: () => (
            <NotificationsScreenHeader
              side="left"
              onBack={() => router.back()}
            />
          ),
          headerTitle: () => <NotificationsScreenHeader side="center" />,
          headerRight: () => <NotificationsScreenHeader side="right" />,
          headerShadowVisible: false,
          headerBackVisible: false,
        }}
      />
      {DUMMY_NOTIFICATIONS.map((notification: Notification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
    </ScrollView>
  );
};

export default NotificationsScreen;

const NotificationCard = ({ notification }: { notification: Notification }) => {
  return (
    <View className="flex-row items-center p-4">
      <View
        className={`${
          notification.isRead ? "bg-transparent" : "bg-purple"
        } w-1.5 h-1.5 mr-2 rounded-full`}
      />
      <Avatar src={notification.sender.avatar} size="sm" />
      <Text className="ml-2">
        {notification.sender.name} started following you
      </Text>
      <Text className="!ml-auto">3d</Text>
    </View>
  );
};

const NotificationsScreenHeader = ({
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
