import { useState } from "react";
import { View, Text } from "@/app/components/Themed";
import Avatar from "@/app/components/Avatar";
import { DUMMY_FEED_ITEMS, FeedItem } from "@/app/lib/types";
import { ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Feed = () => {
  const [feed, setFeed] = useState<FeedItem[]>([
    ...DUMMY_FEED_ITEMS,
    ...DUMMY_FEED_ITEMS,
    ...DUMMY_FEED_ITEMS,
    ...DUMMY_FEED_ITEMS,
  ]);

  return (
    <ScrollView className="h-screen">
      {feed.map((item, i: number) => (
        <FeedItemCard key={i} item={item} />
      ))}
    </ScrollView>
  );
};

export default Feed;

const FeedItemCard = ({ item }: { item: FeedItem }) => {
  return (
    <View className="space-y-4 p-6 border-b border-gray-200">
      <View className="flex-row items-center w-full space-x-2">
        <Avatar src={item.user.avatar} />

        <View className="flex-row items-center space-x-1">
          <Text className="font-bold">{item.user.name}</Text>
          <Text>{item.content}</Text>
          <Text className="font-bold">{item.brand.name}</Text>
        </View>

        <View className="flex-row items-center justify-center w-10 h-10 !ml-auto bg-blue-500 rounded-full">
          <Text>8.5</Text>
        </View>
      </View>

      <View className="flex-row items-center w-full space-x-2">
        <FontAwesome name="heart-o" size={20} />
        <FontAwesome name="comment-o" size={20} />
        <FontAwesome name="bookmark-o" size={20} />
      </View>
    </View>
  );
};
