import { Redirect } from "expo-router";
import { useAuth} from '@clerk/expo'
import { useClerk } from "@clerk/expo";

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth()
  const clerk = useClerk();
  console.log(clerk.status);
  

  if(!isLoaded){
    return null;  }
  if (isSignedIn) {
    return <Redirect href="/(root)/(tabs)" />;
  }

  return <Redirect href="/(auth)/signup" />;
}