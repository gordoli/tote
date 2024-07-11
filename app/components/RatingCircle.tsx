import React from "react";
import { ViewStyle } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import { Text, View } from "./Themed";

const getColorForRating = (rating: number) => {
  switch (rating) {
    case 1:
      return "#D2DFFF";
    case 2:
      return "#879BCD";
    case 3:
      return "#505E94";
    case 4:
      return "#364064";
    case 5:
      return "#182547";
  }
};

const RatingCircle = ({
  rating,
  numberStyles = {},
  radius = 20,
}: {
  rating: number;
  numberStyles?: ViewStyle;
  radius?: number;
}) => {
  const strokeColor = getColorForRating(rating);
  const emoji = ["😠", "🙁", "😐", "😊", "😍"];

  return (
    // <View className="flex items-center justify-center w-8 h-8 border rounded-full">
    <Text
      className="text-lg font-semibold"
      style={[{ color: strokeColor }, numberStyles]}
    >
      {emoji[rating - 1]}
    </Text>
    // </View>
  );
};

export default RatingCircle;
