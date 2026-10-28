import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { tokenCache } from "@clerk/expo/token-cache";
import * as SplashScreen from "expo-splash-screen";

export default function Index() {
  const [hasCachedToken, setHasCachedToken] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function checkTokenCache() {
      try {
        const token = await tokenCache?.getToken("__clerk_client_jwt");

        if (!cancelled) {
          setHasCachedToken(Boolean(token));
        }
      } catch (error) {
        console.error("Failed to read token cache:", error);

        if (!cancelled) {
          setHasCachedToken(false);
        }
      }
    }

    void checkTokenCache();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (hasCachedToken !== null) {
      void SplashScreen.hideAsync();
    }
  }, [hasCachedToken]);


  if (hasCachedToken === null) {
    return null;
  }

  if (hasCachedToken) {
    return <Redirect href="/(root)/(tabs)" />;
  }

  return <Redirect href="/(auth)/signup" />;
}