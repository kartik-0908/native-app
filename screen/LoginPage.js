import { BackHandler, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Button, TextInput } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { emailValidator } from "../validator/emailValidator";
import { passwordValidator } from "../validator/passwordValidator";

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

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

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    setEmail({ value: "", error: "" });
    setPassword({ value: "", error: "" });
    navigation.navigate("ChatPage");
  };

  const onSignPressed = () => {
    setEmail({ value: "", error: "" });
    setPassword({ value: "", error: "" });
    navigation.navigate("Register");
  };

  return (
    <View style={styles.page}>
      <Text style={styles.heading}>Welcome to Akaay</Text>
      <View style={styles.container}>
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
        <TextInput
          label={"Password"}
          returnKeyType="done"
          value={password.value}
          onChangeText={(e) => setPassword({ value: e, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
          style={styles.label}
        />
        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ResetPassword")}
          >
            <Text style={styles.forgotText}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnContainer}>
          <Button mode="contained" style={styles.btn} onPress={onLoginPressed}>
            LOGIN
          </Button>
          <Button mode="contained" onPress={onSignPressed} style={styles.btn}>
            SIGN UP
          </Button>
        </View>
      </View>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  page: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#28282B",
  },
  container: {
    width: "80%",
    height: "30%",
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
  forgotPassword: {
    width: "100",
    alignItems: "flex-end",
    marginVertical: 5,
  },
  forgotText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  btn: {
    marginVertical: 20,
    backgroundColor: "#808080",
  },
});
