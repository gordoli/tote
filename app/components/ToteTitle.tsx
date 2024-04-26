import { StyleSheet } from "react-native";
import { Text } from "./Themed";

const ToteTitle = () => {
  const styles = StyleSheet.create({
    baseText: {
      fontFamily: "Georgia",
      fontSize: 24,
      fontWeight: "bold",
    },
  });

  return (
    <Text style={styles.baseText} className="text-lightBlue">
      tote
    </Text>
  );
};

export default ToteTitle;
