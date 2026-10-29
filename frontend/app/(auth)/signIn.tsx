
import { useSignInWithGoogle } from '@clerk/expo/google';
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useSignIn } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import Logo from "../../assets/Logo.svg";
import GoogleLogo from "../../assets/googleLogo.svg";
import { Mail, LockKeyhole } from "lucide-react-native";
import {
  SignInFormSchema,
  signInSchema,
} from "../../lib/schemas/authSchema";

export default function SignInScreen() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const { startGoogleAuthenticationFlow } = useSignInWithGoogle()
  const router = useRouter();

  const isLoading = fetchStatus === "fetching";

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<SignInFormSchema>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSignInPress = async (values: SignInFormSchema) => {
    try {
      const { error } = await signIn.password({
        emailAddress: values.email,
        password: values.password,
      });

      if (error) {
        Alert.alert("Sign in failed", error.message);
        return;
      }

      if (signIn.status === "complete") {
        await signIn.finalize({
          navigate: ({ session, decorateUrl }) => {
            if (session?.currentTask) return;
            router.replace(decorateUrl("/") as any);
          },
        });

        return;
      }

      if (
        signIn.status === "needs_second_factor" ||
        signIn.status === "needs_client_trust"
      ) {
        const emailCodeFactor = signIn.supportedSecondFactors.find(
          (factor) => factor.strategy === "email_code"
        );

        if (!emailCodeFactor) {
          Alert.alert(
            "Verification unavailable",
            "Clerk did not provide an email verification option for this sign-in."
          );
          return;
        }

        const { error: sendError } = await signIn.mfa.sendEmailCode();

        if (sendError) {
          Alert.alert("Unable to send code", sendError.message);
          return;
        }

        router.push({
          pathname: "/otp",
          params: {
            email: values.email,
            flow: "sign-in",
          },
        });

        return;
      }

      console.error("Sign-in attempt not complete:", signIn.status);

      Alert.alert(
        "Sign in incomplete",
        "Your sign-in requires an additional step that is not handled yet."
      );
    } catch (error) {
      console.error("Sign-in failed:", error);

    }
  };


const handleGoogleSignIn = async () => {
  try {
    const { createdSessionId, setActive } = await startGoogleAuthenticationFlow();

    if (createdSessionId && setActive) {
      await setActive({ session: createdSessionId });
      router.replace("/");
    } else {
      Alert.alert(
        "Sign-in incomplete",
        "Google authentication did not create a session."
      );
    }
  } catch (err: any) {
    if (
      err.code === "SIGN_IN_CANCELLED" ||
      err.code === "-5"
    ) {
      return;
    }

    console.error("Google sign-in error:", err);

    Alert.alert(
      "Google sign-in failed",
      err.message || "An error occurred during Google sign-in."
    );
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
          Welcome back
        </Text>

        <Text className="text-brand-text-muted text-base text-center mb-6">
          Manage your expenses, powered by AI
        </Text>
      </View>

      <View className="w-full">
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
                autoComplete="email"
              />
            </View>
          )}
        />

        {formErrors.email && (
          <Text className="text-brand-coral mb-2 text-sm">
            {formErrors.email.message}
          </Text>
        )}

        {errors.fields.identifier && (
          <Text className="text-brand-coral mb-2 text-sm">
            {errors.fields.identifier.message}
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
                autoComplete="current-password"
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

        {/* Required for Clerk bot protection where applicable */}
        <View nativeID="clerk-captcha" />

        <TouchableOpacity
          onPress={handleSubmit(onSignInPress)}
          disabled={isLoading}
          className="bg-brand-blue py-4 w-full items-center rounded-xl mb-3"
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold">Sign In</Text>
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
          onPress={handleGoogleSignIn}
          className="flex-row items-center justify-center border border-[#E0E2DC] bg-white rounded-xl py-4 mb-4 gap-1"
        >
          <GoogleLogo width={20} height={20} />

          <Text className="text-[#1A1D26] font-semibold ml-1">
            Sign in with Google
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center items-center mb-6">
          <Text className="text-sm text-brand-text-muted">
            Don't have an account?{" "}
          </Text>

          <Link href="/signup">
            <Text className="text-sm text-brand-blue font-semibold">
              Sign up
            </Text>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
