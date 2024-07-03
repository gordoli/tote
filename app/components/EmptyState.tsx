import { View, Text } from "./Themed";

const EmptyState = ({ label }: { label: string }) => {
  return (
    <View className="flex-row items-center justify-center flex-1 h-full">
      <Text>{label}</Text>
    </View>
  );
};

export default EmptyState;
