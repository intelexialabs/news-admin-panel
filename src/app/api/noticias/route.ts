import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  try {
    const noticias = await prisma.news.findMany({
      where: { estado: 'PENDIENTE' },
      orderBy: { created_at: 'desc' }
    });
    return NextResponse.json(noticias);
  } catch (error) {
    return NextResponse.json({ error: 'Error al cargar noticias' }, { status: 500 });
  }
}