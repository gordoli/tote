import { View, Text } from "@/app/components/Themed";
import { Brand, DUMMY_BRANDS } from "../lib/types";
import { Image } from "expo-image";

const Tote = () => {
  const brands = DUMMY_BRANDS;

  return (
    <View>
      <Text>Tote</Text>
      {brands.map((item: Brand) => (
        <View key={item.id}>
          <Text>{item.name}</Text>
          <Image style={{ width: 100, height: 100 }} contentFit="contain" source={item.logo} />
        </View>
      ))}
    </View>
  );
};

export default Tote;
