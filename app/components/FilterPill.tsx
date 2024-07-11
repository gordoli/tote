import _default from "@expo/vector-icons/build/FontAwesome";
import { ReactNode } from "react";
import { Pressable, TouchableOpacity } from "react-native";
import { Text } from "./Themed";

const FilterPill = ({
  children,
  isActive,
  onPress,
  className,
  label,
}: {
  children?: ReactNode;
  isActive: boolean;
  onPress?: () => void;
  className?: string;
  label?: string;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`cursor-pointer px-8 py-2 bg-gray/20 rounded-full ${
        isActive
          ? "bg-blue/10 !text-blue !border-none"
          : "text-gray-800 bg-blue/10"
      }, ${className}`}
    >
      <Text className={isActive ? "text-blue" : "text-gray-800"}>{label}</Text>
    </TouchableOpacity>
  );
};

export default FilterPill;
