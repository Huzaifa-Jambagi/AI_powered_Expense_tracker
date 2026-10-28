import { Slot } from 'expo-router'
import { Redirect } from "expo-router";
import { useAuth } from '@clerk/expo'

export default function RootLayout() {
     const { isLoaded, isSignedIn } = useAuth()
    
      if(!isLoaded){
        return null;
      }
      if (!isSignedIn) {
        return <Redirect href="/(auth)/signup" />;
      }
    
  return (
  <Slot/>
  )
}