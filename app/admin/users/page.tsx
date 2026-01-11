import { prisma } from "@/lib/prisma";
export const dynamic = 'force-dynamic';
import UsersClient from "./UsersClient";

export default async function UsersManagementPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Transform users to match the expected format
  const formattedUsers = users.map((user) => ({
    id: user.id,
    name: user.name || 'Unnamed User',
    email: user.email,
    role: user.role,
    status: 'active' as const, // Default status since User model doesn't have a status field
    joinedAt: user.createdAt.toISOString().split('T')[0],
    lastActive: getRelativeTime(user.updatedAt),
  }));

  return <UsersClient users={formattedUsers} />;
}

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) === 1 ? '' : 's'} ago`;
  return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) === 1 ? '' : 's'} ago`;
}
