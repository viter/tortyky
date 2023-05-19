import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/utils/db.server';

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  const roles = session?.user?.roles.split(',');
  if (!session || (session && !roles.includes('5'))) {
    return NextResponse.json('Заборонена дія!');
  }

  try {
    const result = await db.tags.delete({
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json(result);
  } catch (err) {
    if (err.code === 'P2003') {
      return NextResponse.json(err);
    }
  }
}
