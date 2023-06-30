import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/utils/db.server';

export async function GET(request) {
  try {
    const result = await db.tags.findMany();
    return NextResponse.json({ result });
  } catch (err) {
    console.log(err);
  }
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  const roles = session?.user?.roles.split(',');
  if (!session || (session && !roles.includes('5'))) {
    return NextResponse.json('Заборонена дія!');
  }
  try {
    const data = await request.json();
    const result = await db.tags.create({
      data: {
        name: data.name,
      },
    });

    return NextResponse.json(result);
  } catch (err) {
    console.log(err);
  }
}

export async function PUT(request) {
  const session = await getServerSession(authOptions);
  const roles = session?.user?.roles.split(',');
  if (!session || (session && !roles.includes('5'))) {
    return NextResponse.json('Заборонена дія!');
  }

  try {
    const data = await request.json();
    const result = await db.tags.update({
      where: { id: data.id },
      data: {
        name: data.name,
      },
    });
    const allTags = await db.tags.findMany();
    return NextResponse.json(allTags);
  } catch (err) {
    console.log(err);
  }
}
