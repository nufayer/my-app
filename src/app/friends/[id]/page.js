import FriendProfile from "@/components/FriendProfile";

export default async function FriendDetailsPage({ params }) {
  const { id } = await params;

  return <FriendProfile friendId={id} />;
}
