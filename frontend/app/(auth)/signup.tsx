import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { useSignUp, useAuth } from "@clerk/expo";
import { useRouter } from "expo-router";
import Logo from "../../assets/Logo.svg";
import {
  signUpSchema,
  type SignUpFormSchema,
} from "../../lib/schemas/authSchema";
import { KeyboardAvoidingView, Platform } from "react-native";

export default function SignUpScreen() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-brand-body"
    >
      <View className="items-center">
        <Logo width={144} height={64} />
        <Text>Signuop screen</Text>
      </View>
      <Text>Signup</Text>
    </KeyboardAvoidingView>
  );

}