import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  selectionContainer: {
    borderTopWidth: 1,
    borderTopColor: "#e6e6e6",
    marginTop: 15,
    paddingTop: 15,
  },
  selectionItem: {
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
    padding: 7,
  },
  likedSelection: {
    width: "32%",
    backgroundColor: "#00b33c",
  },
  fineSelection: {
    width: "32%",

  },
  dislikeSelection: {
    width: "32%",
    backgroundColor: "#ff4d4d",
  },
  buttonSelectPrefer: {
    alignItems: "center",
    width: "15%",
    padding: 7,
  },
  shuffleButton: {
    backgroundColor: '#0065FF',
    width: "65%",
  },
  loadingStyle: {
    height: 200,
  },
  category: {
    borderColor: "#091e4214",
    backgroundColor: "white",
  },
  categorySelected: {
    borderColor: "#0065FF",
    backgroundColor: "#0065ff1f",
  },
  pasteButton: {
    position: "absolute",
    top: 9,
    right: 12,
  },
  pasteText: {
    color: "#0065FF",
  },
});

export default styles;