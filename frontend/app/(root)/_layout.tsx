import { Slot, Redirect } from "expo-router";
import { useAuth } from "@clerk/expo";
import DashboardSkeleton from "../../components/Dashboard/DashboardSkeleton";

export default function RootGroupLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  
  if (!isLoaded) {
    return <DashboardSkeleton />;
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/signIn" />;
  }

  return <Slot />;
}