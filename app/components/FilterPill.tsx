import { FontAwesome } from "@expo/vector-icons";
import { Text, View } from "./Themed";
import _default from "@expo/vector-icons/build/FontAwesome";
import { ReactNode } from "react";
import { Pressable } from "react-native";

const FilterPill = ({
  children,
  isActive,
  onClick,
}: {
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <Pressable
      onPress={onClick}
      className={`cursor-pointer text-sm py-2 px-4 flex-row items-center justify-center space-x-1 rounded-full ${
        isActive
          ? "bg-skyBlue/20 text-skyBlue border border-skyBlue"
          : "bg-gray-200/20 text-gray-800 border border-gray-200"
      }`}
    >
      {children}
    </Pressable>
  );
};

export default FilterPill;
