
import { ScrollView, Text, View } from "react-native";
import { Stack } from "expo-router";

export default function TermsOfServiceScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Terms of Service" }} />

      <ScrollView className="flex-1 bg-[#F5F4F0]">
        <View className="p-6">
          <Text className="text-3xl font-bold text-[#1A1D26] mb-2">
            Terms of Service
          </Text>

          <Text className="text-sm text-brand-text-muted mb-6">
            Last updated: October 28, 2026
          </Text>

          <Text className="text-lg font-bold text-[#1A1D26] mb-2">
            1. Acceptance of Terms
          </Text>
          <Text className="text-base text-brand-text-muted leading-6 mb-5">
            By creating an account or using this application, you agree to
            these Terms of Service. If you do not agree, please do not use
            the application.
          </Text>

          <Text className="text-lg font-bold text-[#1A1D26] mb-2">
            2. About the Service
          </Text>
          <Text className="text-base text-brand-text-muted leading-6 mb-5">
            The application provides tools to manage expenses and financial
            records. Features and availability may change as the application
            develops.
          </Text>

          <Text className="text-lg font-bold text-[#1A1D26] mb-2">
            3. Your Account
          </Text>
          <Text className="text-base text-brand-text-muted leading-6 mb-5">
            You are responsible for maintaining the security of your account
            credentials and for activities performed through your account.
            Please provide accurate information and notify us if you suspect
            unauthorized access.
          </Text>

          <Text className="text-lg font-bold text-[#1A1D26] mb-2">
            4. Acceptable Use
          </Text>
          <Text className="text-base text-brand-text-muted leading-6 mb-5">
            You agree not to misuse the service, interfere with its operation,
            attempt unauthorized access, or use it for unlawful purposes.
          </Text>

          <Text className="text-lg font-bold text-[#1A1D26] mb-2">
            5. Financial Information
          </Text>
          <Text className="text-base text-brand-text-muted leading-6 mb-5">
            The app is intended to help you organize and track financial
            information. AI-generated insights may be inaccurate and should
            be checked before making financial decisions. The app does not
            replace professional financial or tax advice.
          </Text>

          <Text className="text-lg font-bold text-[#1A1D26] mb-2">
            6. Availability and Disclaimer
          </Text>
          <Text className="text-base text-brand-text-muted leading-6 mb-5">
            We aim to keep the service available and reliable, but cannot
            guarantee uninterrupted operation or that all information will
            always be error-free. Any limitations of liability must be
            consistent with applicable law.
          </Text>

          <Text className="text-lg font-bold text-[#1A1D26] mb-2">
            7. Termination
          </Text>
          <Text className="text-base text-brand-text-muted leading-6 mb-5">
            We may suspend or terminate access where permitted by law,
            including for violations of these terms. You may stop using
            the service at any time.
          </Text>

          <Text className="text-lg font-bold text-[#1A1D26] mb-2">
            8. Changes to These Terms
          </Text>
          <Text className="text-base text-brand-text-muted leading-6 mb-5">
            We may update these terms as the service evolves. We will provide
            notice of material changes where required by applicable law.
          </Text>

          <Text className="text-lg font-bold text-[#1A1D26] mb-2">
            9. Contact Us
          </Text>
          <Text className="text-base text-brand-text-muted leading-6">
            For questions about these terms, contact us at your official
            support email address.
          </Text>
        </View>
      </ScrollView>
    </>
  );
}
