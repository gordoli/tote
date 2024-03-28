import React from "react";
import { Image } from "react-native";

type AvatarProps = {
  size?: "sm" | "md" | "lg";
  src: string;
  className?: string;
};

const Avatar: React.FC<AvatarProps> = ({
  size = "md",
  src,
  className = "",
}) => {
  return (
    <Image
      source={{ uri: src }}
      className={`${className} h-12 w-12 rounded-full`}
    />
  );
};

export default Avatar;
