import { View, Text } from "@/app/components/Themed";
import { ScrollView, ViewStyle } from "react-native";
import { Brand, DUMMY_BRANDS } from "../lib/types";

const Discover = () => {
  return (
    <View className="flex-row flex-wrap justify-between p-4 gap-4">
      {DUMMY_BRANDS.map((brand) => (
        <BrandDiscoverCard key={brand.id} brand={brand} />
      ))}
    </View>
  );
};

export default Discover;

const BrandDiscoverCard = ({ brand }: { brand: Brand }) => (
  <View className="w-1/2 aspect-square p-4 border border-gray-200">
    <Text>{brand.name}</Text>
  </View>
);

const styles = {
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  } as ViewStyle,
  card: {
    width: "48%",
    padding: 4,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 8,
  } as ViewStyle,
};
