// QuestionBox.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Keyboard } from "react-native";

// QuestionBox.js
// ... (other imports)

const QuestionBox = () => {
  const [questionNumber, setQuestionNumber] = useState("");
  const [answers, setAnswers] = useState([]);
  console.log(`http://localhost:3000/card/${questionNumber}`);
  const handleShowAnswers = async () => {
    try {
      // Fetch card by number from the server
      const response = await fetch(
        `http://localhost:3000/card/${questionNumber}`
      );

      if (!response.ok) {
        console.error("Failed to fetch card");
        return;
      }

      // Parse the response JSON
      const card = await response.json();

      // Extract answers from the card and update state
      setAnswers(card.answers || []);

      // Remove focus from the TextInput and hide the keyboard
      Keyboard.dismiss();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleNewQuestion = () => {
    // Clear answers when the "New Question" button is pressed
    setAnswers([]);
  };

  return (
    <ImageBackground
      source={require("./img/bg.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter card number"
          keyboardType="numeric"
          maxLength={3} // Limit input to 3 characters
          value={questionNumber}
          onChangeText={(text) => setQuestionNumber(text)}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleShowAnswers}>
            <Text style={styles.buttonText}>Show Answers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleNewQuestion}>
            <Text style={styles.buttonText}>New Question</Text>
          </TouchableOpacity>
        </View>
        {answers.map((answer, index) => (
          <Text key={index} style={styles.answerText}>
            {answer}
          </Text>
        ))}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: 160, // Set a fixed width for the input field
    backgroundColor: "#fff", // White background for the input
    textAlign: "center", // Center the text in the input field
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#3498db", // Blue color
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff", // White color
    fontSize: 16,
    fontWeight: "bold",
  },
  answerText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent white background for answers
    padding: 10,
    borderRadius: 8,
  },
});

export default QuestionBox;
