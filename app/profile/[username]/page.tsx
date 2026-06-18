import { use } from "react";
import ProfileView from "@/Views/profile/profileView";

interface Props {
  params: Promise<{ username: string }>;
}

export default function UserProfilePage({ params }: Props) {
  const { username } = use(params);
  return <ProfileView username={username} />;
}
