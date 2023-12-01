// App.js
import React from "react";
import { StyleSheet, View } from "react-native";
import QuestionBox from "./QuestionBox";

export default function App() {
  return (
    <View style={styles.container}>
      <QuestionBox />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
