import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "./Themed";
import { useProfile } from "../hooks/useProfile";
import { set } from "date-fns";

const FollowButton = ({
  userId,
  isFollowing,
}: {
  userId: string;
  isFollowing: boolean;
}) => {
  const [following, setFollowing] = useState<boolean>(isFollowing);
  const baseStyle = "px-8 py-2 bg-white border border-gray-300 rounded-full";
  const followingStyle = "bg-darkBlue text-white border-darkBlue";
  const notFollowingStyle = "";

  const { handleFollowUser } = useProfile();

  return (
    <TouchableOpacity
      className={`${baseStyle} ${
        following ? followingStyle : notFollowingStyle
      }`}
      onPress={() => {
        handleFollowUser(userId, following);
        setFollowing(!following);
      }}
    >
      <Text className={following ? "text-white" : ""}>
        {following ? "Following" : "Follow"}
      </Text>
    </TouchableOpacity>
  );
};

export default FollowButton;
