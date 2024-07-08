import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Text, TextInput, View } from "../components/Themed";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { useProfile } from "../hooks/useProfile";
import Storage from "../lib/storage";
import { AuthContext } from "../lib/globalContext";
import LoadingScreen from "../components/LoadingScreen";

const ChangePasswordScreen = () => {
  const router = useRouter();
  const params: any = useLocalSearchParams();
  const { handleChangePassword, formChangePasswordErrors, loading } = useProfile();
  const { logout } = useContext(AuthContext);
  const [isShowCurrPassword, setIsShowCurrPassword] = useState<boolean>(true);
  const [isShowNewPassword, setIsShowNewPassword] = useState<boolean>(true);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState<boolean>(true);
  const [editData, setEditData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const onChangePassword = () => {
    handleChangePassword(editData, () => {
      Storage.removeItem("AUTH");
      logout();
    });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView className="gap-4 p-6 text-center bg-white">
      <Stack.Screen
        options={{
          title: "Tote",
          headerLeft: () => (
            <EditUserScreenHeader
              side="left"
              onBack={() =>
                params.screen ? router.navigate(params.screen) : router.back()
              }
            />
          ),
          headerTitle: () => <EditUserScreenHeader side="center" />,
          headerRight: () => <EditUserScreenHeader side="right" />,
          headerShadowVisible: false,
          headerBackVisible: false,
        }}
      />
      <View className="relative">
        <Text className="mb-1">Current Password</Text>
        <TextInput
          value={editData.currentPassword}
          placeholder="Enter your current password"
          onChangeText={(text) => setEditData({ ...editData, currentPassword: text })}
          className="w-full h-12 p-2 bg-gray-200 rounded-lg"
          secureTextEntry={isShowCurrPassword}
        />
        <TouchableOpacity
          style={styles.eyePassword}
          onPress={() => setIsShowCurrPassword(!isShowCurrPassword)}
        >
          <FontAwesome
            name={`${isShowCurrPassword ? "eye-slash" : "eye"}`}
            size={20}
            color="#787878"
          />
        </TouchableOpacity>
        {formChangePasswordErrors.currentPassword && (
          <Text className="text-red-600">
            {formChangePasswordErrors.currentPassword}
          </Text>
        )}
      </View>

      <View className="relative">
        <Text className="mb-1">New Password</Text>
        <TextInput
          value={editData.newPassword}
          placeholder="Enter your new password"
          onChangeText={(text) => setEditData({ ...editData, newPassword: text })}
          className="w-full h-12 p-2 bg-gray-200 rounded-lg"
          secureTextEntry={isShowNewPassword}
        />
        <TouchableOpacity
          style={styles.eyePassword}
          onPress={() => setIsShowNewPassword(!isShowNewPassword)}
        >
          <FontAwesome
            name={`${isShowNewPassword ? "eye-slash" : "eye"}`}
            size={20}
            color="#787878"
          />
        </TouchableOpacity>
        {formChangePasswordErrors.newPassword && (
          <Text className="text-red-600">
            {formChangePasswordErrors.newPassword}
          </Text>
        )}
      </View>

      <View className="relative">
        <Text className="mb-1">Confirm New Password</Text>
        <TextInput
          value={editData.confirmNewPassword}
          placeholder="Confirm your new password"
          onChangeText={(text) => setEditData({ ...editData, confirmNewPassword: text })}
          className="w-full h-12 p-2 bg-gray-200 rounded-lg"
          secureTextEntry={isShowConfirmPassword}
        />
        <TouchableOpacity
          style={styles.eyePassword}
          onPress={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
        >
          <FontAwesome
            name={`${isShowConfirmPassword ? "eye-slash" : "eye"}`}
            size={20}
            color="#787878"
          />
        </TouchableOpacity>
        {formChangePasswordErrors.confirmNewPassword && (
          <Text className="text-red-600">
            {formChangePasswordErrors.confirmNewPassword}
          </Text>
        )}
      </View>

      <View className="flex-row w-full justify-around">
        <TouchableOpacity
          onPress={onChangePassword}
          className="items-center justify-center h-12 rounded-lg bg-darkBlue px-4"
        >
          <Text className="text-white">Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => {
          params.screen ? router.navigate(params.screen) : router.back()
        }}
        className="items-center justify-center h-12 rounded-lg bg-darkBlue px-4"
      >
        <Text className="text-white">Cancel</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ChangePasswordScreen;

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
          <Text className="ml-2">Change Password</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  eyePassword: {
    position: "absolute",
    right: 20,
    top: 35,
  },
});