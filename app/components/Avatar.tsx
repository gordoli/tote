import React from "react";
import { Image } from "react-native";

type AvatarProps = {
  size?: "sm" | "md" | "lg" | "xl";
  src: string | null;
  className?: string;
  shape?: "circle" | "rounded";
};

const Avatar: React.FC<AvatarProps> = ({
  size = "md",
  src,
  className = "",
  shape = "circle",
}) => {
  const sizeMap = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-16 w-16",
    xl: "h-20 w-20",
  };

  return src === null ? (
    <Image
      source={{
        uri: "https://placehold.jp/3d4070/ffffff/150x150.png?text=TOTE",
      }}
      className={`${className} ${sizeMap[size]} ${
        shape === "circle" ? "rounded-full" : "rounded"
      }`}
    />
  ) : (
    <Image
      source={{ uri: src }}
      className={`${className} ${sizeMap[size]} rounded-full`}
    />
  );
};

export default Avatar;
