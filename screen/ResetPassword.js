import { BackHandler, Keyboard, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Button, TextInput } from "react-native-paper";
import { emailValidator } from "../validator/emailValidator";

const ResetPassword = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [cnHeight, setCnHeight] = useState("20%");

  useEffect(() => {
    const keyboardShow = Keyboard.addListener("keyboardDidShow", () => {
      setCnHeight("30%");
    });

    const keyboardHide = Keyboard.addListener("keyboardDidHide", () => {
      setCnHeight("20%");
    });

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

    return () => {
      backHandler.remove();
      keyboardShow.remove();
      keyboardHide.remove();
    };
  }, []);

  const sendVerification = () => {
    const emailError = emailValidator(email.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    setEmail({ value: "", error: "" });
    //axios
  };

  return (
    <View style={styles.page}>
      <Text style={styles.heading}>Enter Email For Verification</Text>
      <View style={[styles.container, { height: cnHeight }]}>
        <TextInput
          label={"Email"}
          value={email.value}
          onChangeText={(e) => setEmail({ value: e, error: "" })}
          error={!!email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          returnKeyType="next"
          style={styles.label}
        />
        <View style={styles.btnContainer}>
          <Button
            mode="contained"
            style={styles.btn}
            onPress={sendVerification}
          >
            SEND VERIFICATION
          </Button>
        </View>
      </View>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  page: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#28282B",
  },
  container: {
    width: "80%",
    borderRadius: 10,
    backgroundColor: "#404040",
    padding: 10,
  },
  heading: {
    color: "#FFFFFF",
    padding: 10,
    fontSize: 24,
  },
  label: {
    marginVertical: 10,
    borderRadius: 5,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 20,
    justifyContent: "space-evenly",
  },
  btn: {
    marginVertical: 20,
    backgroundColor: "#808080",
  },
});
