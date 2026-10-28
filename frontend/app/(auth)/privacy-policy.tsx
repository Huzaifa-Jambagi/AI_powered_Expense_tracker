import { ScrollView, Text, View } from "react-native";
import { Stack } from "expo-router";

export default function PrivacyPolicyScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Privacy Policy" }} />

      <ScrollView className="flex-1 bg-[#F5F4F0]">
        <View className="p-6">
          <Text className="text-3xl font-bold text-[#1A1D26] mb-2">
            Privacy Policy
          </Text>

          <Text className="text-sm text-brand-text-muted mb-6">
            Last updated: October 28, 2026
          </Text>

          <Text className="text-lg font-bold text-[#1A1D26] mb-2">
            Information We Collect
          </Text>
          <Text className="text-base text-brand-text-muted leading-6 mb-5">
            We may collect account information and the information you provide
            when using the app to manage your finances.
          </Text>

          <Text className="text-lg font-bold text-[#1A1D26] mb-2">
            How We Use Your Information
          </Text>
          <Text className="text-base text-brand-text-muted leading-6 mb-5">
            We use your information to provide and maintain the app, manage
            your account, and deliver its features.
          </Text>

          <Text className="text-lg font-bold text-[#1A1D26] mb-2">
            Data Security
          </Text>
          <Text className="text-base text-brand-text-muted leading-6 mb-5">
            We take reasonable measures to protect your information from
            unauthorized access, loss, or misuse.
          </Text>

          <Text className="text-lg font-bold text-[#1A1D26] mb-2">
            Your Rights
          </Text>
          <Text className="text-base text-brand-text-muted leading-6 mb-5">
            Depending on applicable law, you may have rights to access,
            correct, or request deletion of your personal information.
          </Text>

          <Text className="text-lg font-bold text-[#1A1D26] mb-2">
            Contact Us
          </Text>
          <Text className="text-base text-brand-text-muted leading-6">
            huzaifajambagi10@gmail.com
          </Text>
        </View>
      </ScrollView>
    </>
  );
}