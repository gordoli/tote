import { StyleSheet } from "react-native";
import { Text } from "./Themed";

const ToteTitle = ({customStyles = {}}) => {
  const styles = StyleSheet.create({
    baseText: {
      fontFamily: "Georgia",
      fontSize: 24,
      fontWeight: "bold",
      ...customStyles,
    },
  });

  return (
    <Text style={styles.baseText} className="text-lightBlue">
      tote
    </Text>
  );
};

export default ToteTitle;
