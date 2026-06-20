import CommunityConversation from "@/Views/community/communityConversation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <CommunityConversation conversationId={id} />;
}
