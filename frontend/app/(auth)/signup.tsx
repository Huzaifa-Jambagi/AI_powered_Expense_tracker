import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { useSignInWithGoogle } from "@clerk/expo/google";
import { useSignUp, useAuth } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import Logo from "../../assets/Logo.svg";
import GoogleLogo from "../../assets/googleLogo.svg";
import { UserRound, Mail, LockKeyhole } from "lucide-react-native";
import {
  signUpSchema,
  type SignUpFormSchema,
} from "../../lib/schemas/authSchema";
export default function SignUpScreen() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const router = useRouter();

  let isLoading = fetchStatus === "fetching";
  const [email, setEmail] = useState("");
  const { startGoogleAuthenticationFlow } = useSignInWithGoogle();

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

const handleGoogleSignUp = async () => {
  try {
    const { createdSessionId, setActive } = await startGoogleAuthenticationFlow();

    if (createdSessionId && setActive) {
      await setActive({ session: createdSessionId });
      router.replace("/");
    } else {
      Alert.alert(
        "Sign-up incomplete",
        "Google authentication did not create a session."
      );
    }
  } catch (err: any) {
  console.log("========== GOOGLE AUTH ERROR ==========");
  console.log("Message:", err?.message);
  console.log("Code:", err?.code);
  console.log("Status:", err?.status);
  console.log("Clerk errors:", JSON.stringify(err?.errors, null, 2));
  console.log("Full error:", JSON.stringify(err, null, 2));
  console.log("========================================");

  Alert.alert(
    "Google sign-up failed",
    err?.message || "Unknown authentication error"
  );
}
};


const onSignUpPress = async (values: SignUpFormSchema) => {
  try {
    const { error } = await signUp.password({
      firstName: values.firstName,
      lastName: values.lastName,
      emailAddress: values.email,
      password: values.password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const { error: sendError } =
      await signUp.verifications.sendEmailCode();

    if (sendError) {
      alert(sendError.message);
      return;
    }

     router.push({
          pathname: "/otp",
          params: {
            email: values.email,
            flow: "sign-up",
          },
        });
  } catch (error) {
    console.error(error);
  }
};

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 items-center px-6"
    >
      <View className="items-center pt-12 pb-5">
        <Logo width={145} height={152} />

        <Text className="text-3xl font-bold mt-4 mb-2 leading-tight text-[#1A1D26]">
          Create Account
        </Text>

        <Text className="text-brand-text-muted text-base text-center mb-6">
          Manage your expenses, powered by AI
        </Text>
      </View>

      <View className="w-full">
        <View className="flex-row gap-3 mb-4">
          <Controller
            control={control}
            name="firstName"
            render={({ field: { value, onChange } }) => (
              <View className="flex-1 flex-row items-center border border-[#E8E6DF] bg-white rounded-xl px-3">
                <UserRound size={19} color="#8A8D96" />
                <TextInput
                  className="flex-1 py-4 pl-3 text-[#1A1D26]"
                  placeholder="First name"
                  placeholderTextColor="#8A8D96"
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="words"
                  underlineColorAndroid="transparent"
                  selectionColor="#2563EB"
                />
              </View>
            )}
          />

          <Controller
            control={control}
            name="lastName"
            render={({ field: { value, onChange } }) => (
              <View className="flex-1 flex-row items-center border border-[#E8E6DF] bg-white rounded-xl px-3">
                <UserRound size={19} color="#8A8D96" />
                <TextInput
                  className="flex-1 py-4 pl-3 text-[#1A1D26]"
                  placeholder="Last name"
                  placeholderTextColor="#8A8D96"
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="words"
                />
              </View>
            )}
          />
        </View>

        {(formErrors.firstName || formErrors.lastName) && (
          <Text className="text-brand-coral mb-2 text-sm">
            {formErrors.firstName?.message || formErrors.lastName?.message}
          </Text>
        )}

        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <View className="w-full flex-row items-center border border-[#E8E6DF] bg-white rounded-xl px-3 mb-4">
              <Mail size={19} color="#8A8D96" />
              <TextInput
                className="flex-1 py-4 pl-3 text-[#1A1D26]"
                placeholder="Email Address"
                placeholderTextColor="#8A8D96"
                value={value}
                onChangeText={onChange}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          )}
        />

        {formErrors.email && (
          <Text className="text-brand-coral mb-2 text-sm">
            {formErrors.email.message}
          </Text>
        )}

        {errors.fields.emailAddress && (
          <Text className="text-brand-coral mb-2 text-sm">
            {errors.fields.emailAddress.message}
          </Text>
        )}

        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange } }) => (
            <View className="w-full flex-row items-center border border-[#E8E6DF] bg-white rounded-xl px-3 mb-6">
              <LockKeyhole size={19} color="#8A8D96" />
              <TextInput
                className="flex-1 py-4 pl-3 text-[#1A1D26]"
                placeholder="Password"
                placeholderTextColor="#8A8D96"
                value={value}
                onChangeText={onChange}
                secureTextEntry
              />
            </View>
          )}
        />

        {formErrors.password && (
          <Text className="text-brand-coral mb-2 text-sm">
            {formErrors.password.message}
          </Text>
        )}

        {errors.fields.password && (
          <Text className="text-brand-coral mb-2 text-sm">
            {errors.fields.password.message}
          </Text>
        )}

        {/* Required by Clerk for bot protection */}
        <View nativeID="clerk-captcha" />

        <TouchableOpacity
          onPress={handleSubmit(onSignUpPress)}
          disabled={isLoading}
          className="bg-brand-blue py-4 w-full items-center rounded-xl mb-3"
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold">Sign Up</Text>
          )}
        </TouchableOpacity>

        <View className="flex-row items-center my-4">
          <View className="flex-1 h-px bg-[#E0E2DC]" />
          <Text className="mx-3 text-sm text-brand-text-muted">
            or continue with
          </Text>
          <View className="flex-1 h-px bg-[#E0E2DC]" />
        </View>

        <TouchableOpacity
          onPress={handleGoogleSignUp}
          className="flex-row items-center justify-center border border-[#E0E2DC] bg-white rounded-xl py-4 mb-4 gap-1"
        >
          <GoogleLogo width={20} height={20} />
          <Text className="text-[#1A1D26] font-semibold ml-1">
            Sign up with Google
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center items-center mb-6">
          <Text className="text-sm text-brand-text-muted">
            Already have an account?{" "}
          </Text>
          <Link href="/signIn">
            <Text className="text-sm text-brand-blue font-semibold">
              Sign in
            </Text>
          </Link>
        </View>

        <View className="flex-row flex-wrap justify-center px-3 mb-4 mt-2">
          <Text className="text-xs text-brand-text-muted">
            By creating an account, you agree to our{" "}
          </Text>

          <Link href="/terms-of-service">
            <Text className="text-xs text-brand-blue font-semibold">
              Terms of Service
            </Text>
          </Link>

          <Text className="text-xs text-brand-text-muted"> and </Text>

          <Link href="/privacy-policy">
            <Text className="text-xs text-brand-blue font-semibold">
              Privacy Policy
            </Text>
          </Link>

          <Text className="text-xs text-brand-text-muted">.</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );


}