import { FontAwesome, Feather } from "@expo/vector-icons";
import ToteTitle from "../components/ToteTitle";
import { View } from "@/app/components/Themed";
import UserProfile from "../screens/userProfile";

const Profile = () => {
  return <UserProfile />;
};

export default Profile;

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
          <Feather name="share-2" size={20} />
          <FontAwesome name="bell-o" size={20} />
        </View>
      )}
    </>
  );
};
