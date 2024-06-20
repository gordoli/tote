import React from "react";
import { Image } from "react-native";

type AvatarProps = {
  size?: "sm" | "md" | "lg" | "xl";
  src: string;
  className?: string;
};

const Avatar: React.FC<AvatarProps> = ({
  size = "md",
  src,
  className = "",
}) => {
  const sizeMap = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-16 w-16",
    xl: "h-20 w-20",
  };

  return (
    <Image
      source={{ uri: src }}
      className={`${className} ${sizeMap[size]} rounded-full`}
    />
  );
};

export default Avatar;
