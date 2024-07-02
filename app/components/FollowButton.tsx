import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "./Themed";
import { useProfile } from "../hooks/useProfile";

const FollowButton = ({
  userId,
  isFollowing,
}: {
  userId: string;
  isFollowing: boolean;
}) => {
  const [following, setFollowing] = useState<boolean>(isFollowing);
  const baseStyle = "px-4 py-1 rounded";
  const followingStyle = "bg-blue-500 text-white";
  const notFollowingStyle = "bg-gray-500 text-white";

  const { handleFollowUser } = useProfile();

  return (
    <TouchableOpacity
      className={`${baseStyle} ${
        following ? followingStyle : notFollowingStyle
      }`}
      onPress={() => handleFollowUser(userId, following)}
    >
      <Text className="text-white">{following ? "Following" : "Follow"}</Text>
    </TouchableOpacity>
  );
};

export default FollowButton;
