import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/utils/db.server';

export async function POST(request) {
  const session = await getServerSession(authOptions);
  const roles = session?.user?.roles.split(',');
  if (!session || (session && !roles.includes('5'))) {
    return NextResponse.json('Заборонена дія!');
  }
  try {
    const data = await request.json();
    const tagsArray = data.tag ? data.tag : [];
    const create = tagsArray.map((tag) => ({
      tag: {
        connect: {
          id: parseInt(tag),
        },
      },
    }));

    const result = await db.torty.create({
      data: {
        name: data.name,
        description: data.description,
        images: data.images,
        tags: {
          create,
        },
      },
    });

    return NextResponse.json(result);
  } catch (err) {
    console.log(err);
  }
}
