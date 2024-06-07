import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "./Themed";

const FollowButton = () => {
  const [following, setFollowing] = useState<boolean>(false);
  const baseStyle = "px-4 py-1 rounded";
  const followingStyle = "bg-blue-500 text-white";
  const notFollowingStyle = "bg-gray-500 text-white";

  return (
    <TouchableOpacity
      className={`${baseStyle} ${
        following ? followingStyle : notFollowingStyle
      }`}
      onPress={() => setFollowing(!following)}
    >
      <Text className="text-white">{following ? "Following" : "Follow"}</Text>
    </TouchableOpacity>
  );
};

export default FollowButton;
