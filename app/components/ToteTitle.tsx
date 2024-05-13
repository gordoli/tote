import { StyleSheet } from "react-native";
import { Text } from "./Themed";

const ToteTitle = ({customStyles = {}}) => {
  const styles = StyleSheet.create({
    baseText: {
      fontFamily: "Georgia",
      fontSize: 24,
      fontWeight: "normal",
      ...customStyles,  
    },
  });

  return <Text style={styles.baseText}>tote</Text>;
};

export default ToteTitle;
