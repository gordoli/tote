import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "./Themed";

const FollowButton = () => {
  const [following, setFollowing] = useState<boolean>(false);
  const baseStyle = "px-4 py-2 rounded";
  const followingStyle = "bg-blue-500 text-white";
  const notFollowingStyle = "bg-white border border-blue-500";

  return (
    <TouchableOpacity
      className={`${baseStyle} ${
        following ? followingStyle : notFollowingStyle
      }`}
    >
      <Text>{following ? "Following" : "Follow"}</Text>
    </TouchableOpacity>
  );
};

export default FollowButton;
