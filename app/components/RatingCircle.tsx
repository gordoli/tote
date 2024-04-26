import React from "react";
import ProgressCircle from "react-native-progress-circle";
import { Text } from "./Themed";

const getColorForRating = (rating: number) => {
  if (rating > 8) {
    return "#4CAF50"; // Green for ratings over 8
  } else if (rating >= 6) {
    return "#FFA500"; // Orange for ratings between 6 and 8
  } else if (rating >= 3) {
    return "#FFD700"; // Yellow for ratings between 3 and 6
  } else {
    return "#FF0000"; // Red for ratings below 3
  }
};

const RatingCircle = ({ rating }: { rating: number }) => {
  const percentage = (rating / 10) * 100;
  const strokeColor = getColorForRating(rating);

  return (
    <ProgressCircle
      percent={percentage}
      radius={20}
      borderWidth={2}
      color={strokeColor}
      shadowColor="#d3d3d3"
      bgColor="#fff"
    >
      <Text className="text-sm font-semibold" style={{ color: strokeColor }}>
        {rating}
      </Text>
    </ProgressCircle>
  );
};

export default RatingCircle;
