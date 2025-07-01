// src/app/api/login-handler/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email y contraseña requeridos' }, { status: 400 });
    }

    const user = await prisma.users.findUnique({ where: { email } });

    if (!user || user.password !== password) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    return NextResponse.json({
      message: 'Login correcto',
      user: { email: user.email, role: user.role },
    });

  } catch (err) {
    console.error('Error en login:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
