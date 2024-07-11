import { View, Text, ScrollView } from "@/app/components/Themed";
import Avatar from "@/app/components/Avatar";
import { Brand, FeedActivity, User } from "@/app/lib/types";
import ProductView from "@/app/components/product/ProductView";
import RatingCircle from "../components/RatingCircle";
import { getFirstName, formatRelativeDate } from "../lib/helpers";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { useFeed } from "../hooks/useFeed";
import LoadingScreen from "../components/LoadingScreen";
import EmptyState from "../components/EmptyState";
import { Image } from "react-native";
import { useCurrentUser } from "../hooks/useCurrentUser";
import ActivityCard from "../components/activity/ActivityCard";
import ActivityList from "../components/activity/ActivityList";

const Feed = () => {
  const { data, loading, error } = useFeed();
  if (loading) {
    return <LoadingScreen />;
  }

  return <ActivityList activities={data} />;
};

export default Feed;

// export const FeedScreenHeader = ({ side }: { side: string }) => {
//   return (
//     <>
//       {side === "left" && (
//         <View className="flex-row items-center px-4">
//           <ToteTitle />
//         </View>
//       )}

//       {side === "right" && (
//         <View className="flex-row items-center px-4 space-x-2">
//           {/* <FontAwesome name="search" size={20} /> */}
//           <NotificationBell />
//         </View>
//       )}
//     </>
//   );
// };
