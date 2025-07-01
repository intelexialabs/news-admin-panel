import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 0;  // Desactiva prerender para evitar error de conexión en build

export default async function Home() {
  const noticias = await prisma.news.findMany({
    orderBy: { fecha_publicacion: 'desc' },
    take: 10,
  });

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Noticias recientes</h1>

      <div className="grid gap-6">
        {noticias.map((noticia) => (
          <article
            key={noticia.id}
            className="border p-4 rounded shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-1">{noticia.titulo}</h2>
            <p className="text-sm text-gray-600 mb-2">
              Publicado por {noticia.autor || 'Desconocido'} el{' '}
              {new Date(noticia.fecha_publicacion ?? '').toLocaleDateString()}
            </p>

            {noticia.imagen && (
              <div className="relative w-full h-60 mb-3">
                <Image
                  src={noticia.imagen}
                  alt={noticia.titulo}
                  fill
                  className="object-cover rounded"
                />
              </div>
            )}

            <p className="text-gray-700">{noticia.resumen}</p>

            <Link
              href={noticia.url || '#'}
              className="inline-block mt-4 text-blue-600 hover:underline"
              target="_blank"
            >
              Leer más →
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
