import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import Logo from "../../assets/Logo.svg";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type otpFormValues, otpSchema } from '../../lib/schemas/authSchema';
import { useSignUp } from '@clerk/expo';
import { ActivityIndicator } from "react-native";

const otp = () => {
  const { email } = useLocalSearchParams();
  const { signUp, errors, fetchStatus } = useSignUp();
  let isLoading = fetchStatus === "fetching";

  const router = useRouter();

  const onVerify = async ({ otp }: otpFormValues) => {
    const { error } = await signUp.verifications.verifyEmailCode({
      code: otp,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const { error: finalizeError } = await signUp.finalize();

    if (finalizeError) {
      alert(finalizeError.message);
      return;
    }

    router.replace("/");
  };

  const onResendOtp = async () => {
    const { error } = await signUp.verifications.sendEmailCode();

    if (error) {
      alert(error.message);
      return;
    }

    alert("A new verification code has been sent.");
  };

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<otpFormValues>({
    resolver: zodResolver(otpSchema),
    mode: "onBlur",
    defaultValues: {
      otp: ""
    },
  });

 return (
  <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : undefined}
    className="flex-1 bg-[#F8F9FC]"
  >
    <View className="flex-1 px-6 py-6">
      <View className="items-center pt-16 pb-8">
        <Logo width={145} height={152} />

        <Text className="text-3xl font-bold mt-6 mb-3 text-[#1A1D26] text-center">
          Verify Account
        </Text>

        <Text className="text-brand-text-muted text-base text-center leading-6">
          We sent a verification code to{"\n"}
          <Text className="font-semibold text-[#1A1D26]">
            {Array.isArray(email) ? email[0] : email}
          </Text>
        </Text>
      </View>

      <View className="w-full">
       <Controller
  control={control}
  name="otp"
  render={({ field: { value, onChange, onBlur } }) => (
    <View className="w-full">
      <Text className="text-sm font-semibold text-[#1A1D26] mb-3">
        Verification code
      </Text>

      <View className="relative w-full">
        {/* Six visual OTP boxes */}
        <View className="flex-row justify-between gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <View
              key={index}
              className={`flex-1 h-14 items-center justify-center rounded-xl border bg-white ${
                value.length === index
                  ? "border-brand-blue"
                  : "border-[#E8E6DF]"
              }`}
            >
              <Text className="text-xl font-semibold text-[#1A1D26]">
                {value[index] ?? ""}
              </Text>
            </View>
          ))}
        </View>

        {/* Invisible input captures keyboard input */}
        <TextInput
          value={value}
          onChangeText={(text) =>
            onChange(text.replace(/\D/g, "").slice(0, 6))
          }
          onBlur={onBlur}
          keyboardType="number-pad"
          maxLength={6}
          autoFocus
          caretHidden
          underlineColorAndroid="transparent"
          selectionColor="transparent"
          style={{
            position: "absolute",
            width: "100%",
            height: 56,
            opacity: 0,
            zIndex: 10,
          }}
        />
      </View>

      {formErrors.otp && (
        <Text className="text-red-500 text-sm mt-2">
          {formErrors.otp.message}
        </Text>
      )}
    </View>
  )}
/>

        <TouchableOpacity
          onPress={handleSubmit(onVerify)}
          disabled={isLoading}
          className="bg-brand-blue py-4 w-full items-center justify-center rounded-xl mt-6 mb-3"
          activeOpacity={0.8}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-base">
              Verify Account
            </Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center items-center mt-3">
          <Text className="text-brand-text-muted text-sm">
            Didn't receive the code?{" "}
          </Text>

          <TouchableOpacity
            onPress={onResendOtp}
            disabled={isLoading}
            activeOpacity={0.7}
          >
            <Text className="text-brand-blue font-semibold text-sm">
              Resend OTP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </KeyboardAvoidingView>
);
}

export default otp