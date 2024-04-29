import React, { useState, useRef, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Button,
  BackHandler,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native-web";
import Carousel from "../component/carousel";

export default function ChatPage({ navigation }) {
  useEffect(() => {
    const backAction = () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true;
      } else {
        BackHandler.exitApp();
        return true;
      }
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const scrollViewRef = useRef();

  const botResponses = {
    "Hey I want's to know my order status. Can you check?":
      "Hi! Let me quickly look into that for you. 🧐 Can you please provide your order ID?",
    "Sure, it's #45321.": "Thanks! Give me a moment to check the details. 🕵️‍♂️",
    "That’s great to hear. Can you also tell me how long it will take to arrive once shipped?":
      "Absolutely! Once shipped, it typically takes 3-5 business days for delivery. 🚚",
    "Perfect, thanks for the help!":
      "You're welcome! If you have any more questions or need further assistance, just let me know. Enjoy your day! 😄",
  };

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessages = [...messages, { text: inputText, sender: "user" }];
      setMessages(newMessages);
      setInputText("");

      // Scroll to bottom when a new message is added
      scrollViewRef.current.scrollToEnd({ animated: true });

      // Simulate a reply
      // Hello! How can I help you today?
      setTimeout(() => {
        const replyText =
          botResponses[inputText] || "Hello! How can I help you today?";
        let updatedMessages = [
          ...newMessages,
          { text: replyText, sender: "bot" },
        ];
        if (replyText === carousel) {
          updatedMessages.push({ isCarousel: true });
        }

        setMessages(updatedMessages);

        // Check if a follow-up message is needed
        if (inputText === "Sure, it's #45321.") {
          setTimeout(() => {
            const followUpMessage =
              "It looks like your order was delayed due to an unexpected supply issue, but it's now back on track and should be shipped out tomorrow. You should receive an update by email soon!";
            updatedMessages = [
              ...updatedMessages,
              { text: followUpMessage, sender: "bot" },
            ];
            setMessages(updatedMessages);
          }, 3000); // Wait 3 seconds before sending the follow-up message
        }
      }, 1000);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Carousel />
      {/* <h1>Hello</h1> */}

      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="menu" size={24} color="white" />
        <Text style={styles.headerTitle}>Akaay </Text>
        <Ionicons name="paper-plane" size={24} color="white" />
      </View>

      {/* Message area */}
      <ScrollView style={styles.messagesContainer} ref={scrollViewRef}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={
              msg.sender === "user" ? styles.userMessage : styles.botMessage
            }
          >
            {msg.sender === "user" && (
              <View style={styles.msgContainer}>
                <Ionicons
                  name="person-circle-outline"
                  size={40}
                  color="#999"
                  style={styles.userIcon}
                />
                <view style={styles.msg}>
                  <Text style={styles.messageText}>{msg.text}</Text>
                </view>
              </View>
            )}
            {msg.sender !== "user" && (
              <View style={styles.msgContainer}>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={40}
                  color="#999"
                  style={styles.userIcon}
                />
                <view style={styles.msg}>
                  {msg.isCarousel ? (
                    <View style={styles.carouselContainer}>{carousel()}</View>
                  ) : (
                    <Text style={styles.messageText}>{msg.text}</Text>
                  )}
                </view>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Input area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          onChangeText={setInputText}
          value={inputText}
          placeholder="Type your message here..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
    // <SIgnUp />
  );
}

const styles = StyleSheet.create({
  msgContainer: {
    flexDirection: "row",
    maxWidth: "400px",
  },
  container: {
    flex: 1,
    backgroundColor: "#28282B", // The background is black
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#28282B", // Header background is also black
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  userMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#28282B", // Blue color for user messages
    padding: 15,
    borderRadius: 20,
    marginVertical: 5,
    maxWidth: "80%",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#28282B", // Dark grey for bot messages
    padding: 15,
    borderRadius: 20,
    marginVertical: 5,
    maxWidth: "80%",
  },
  messageText: {
    color: "white", // White text for messages
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#333", // Dark input field
    borderRadius: 20,
    color: "white",
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#333", // Blue color for the send button
    borderRadius: 50,
    padding: 10,
  },
  userIcon: {
    marginRight: 10,
  },
  msg: {
    marginTop: 10,
    flexWrap: "wrap",
    flex: 1,
    maxWidth: "100%",
  },
});
