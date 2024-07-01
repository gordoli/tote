import { ScrollView } from "react-native";
import { Text, TextInput, View } from "../components/Themed";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Avatar from "../components/Avatar";
import { useContext, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useProfile } from "../hooks/useProfile";
import Storage from "../lib/storage";
import { AuthContext } from "../lib/globalContext";

const EditUserScreen = () => {
  const router = useRouter();
  const { handleEditUser } = useProfile();
  const currUser: any = useLocalSearchParams();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    Storage.removeItem("AUTH");
    logout();
  };

  const [editData, setEditData] = useState({
    firstName: currUser?.firstName || "",
    lastName: currUser?.lastName || "",
    email: currUser?.email || "",
    username: currUser?.username,
  });

  return (
    <ScrollView className="gap-4 p-6 text-center bg-white">
      <Stack.Screen
        options={{
          title: "Tote",
          headerLeft: () => (
            <EditUserScreenHeader side="left" onBack={() => router.back()} />
          ),
          headerTitle: () => <EditUserScreenHeader side="center" />,
          headerRight: () => <EditUserScreenHeader side="right" />,
          headerShadowVisible: false,
          headerBackVisible: false,
        }}
      />
      <View className="flex items-center justify-center">
        <View className="relative">
          <View className="absolute z-10 p-1 bg-white rounded-full -top-1 -right-2">
            <Ionicons name="camera" size={24} color="gray" />
          </View>

          <Avatar src={currUser?.avatar || null} size="xxl" />
        </View>
      </View>

      <View>
        <Text className="mb-1">First Name</Text>
        <TextInput
          value={editData.firstName}
          onChangeText={(text) => setEditData({ ...editData, firstName: text })}
          className="w-full h-12 p-2 bg-gray-200 rounded-lg"
        />
      </View>

      <View>
        <Text className="mb-1">Last Name</Text>
        <TextInput
          value={editData.lastName}
          onChangeText={(text) => setEditData({ ...editData, lastName: text })}
          className="w-full h-12 p-2 bg-gray-200 rounded-lg"
        />
      </View>

      <View>
        <Text className="mb-1">Email</Text>
        <TextInput
          value={editData.email}
          onChangeText={(text) => setEditData({ ...editData, email: text })}
          className="w-full h-12 p-2 bg-gray-200 rounded-lg"
        />
      </View>

      <View>
        <Text className="mb-1">Username</Text>
        <TextInput
          value={editData.username}
          onChangeText={(text) => setEditData({ ...editData, username: text })}
          className="w-full h-12 p-2 bg-gray-200 rounded-lg"
        />
      </View>

      <TouchableOpacity
        onPress={() => handleEditUser(editData)}
        className="items-center justify-center h-12 rounded-lg bg-darkBlue"
      >
        <Text className="text-white">Save</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleLogout()}>
        <Text className="text-center text-darkBlue">Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditUserScreen;

const EditUserScreenHeader = ({
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
          <Text className="ml-2">Edit Profile</Text>
        </View>
      )}
    </>
  );
};
