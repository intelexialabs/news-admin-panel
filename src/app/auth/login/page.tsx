'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Error al iniciar sesión');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
<div className="space-y-6">
  {error && (
    <div
      role="alert"
      className="rounded-md bg-[#fdecea] p-4 text-[#e61011] text-center font-semibold"
    >
      {error}
    </div>
  )}

  <div>
    <label
      htmlFor="email"
      className="block text-sm font-semibold text-[#1a3680] mb-1"
    >
      Correo electrónico
    </label>
    <input
      id="email"
      type="email"
      required
      autoComplete="email"
      placeholder="admin@example.com"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="block w-full rounded-md border border-[#1a3680] bg-[#f0f4ff] py-2 px-4 text-[#1a3680] placeholder-[#9bb1d4] shadow-sm focus:border-[#163065] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a3680] sm:text-sm"
      aria-invalid={!!error}
    />
  </div>

  <div>
    <label
      htmlFor="password"
      className="block text-sm font-semibold text-[#1a3680] mb-1"
    >
      Contraseña
    </label>
    <input
      id="password"
      type="password"
      required
      autoComplete="current-password"
      placeholder="••••••••"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="block w-full rounded-md border border-[#1a3680] bg-[#f0f4ff] py-2 px-4 text-[#1a3680] placeholder-[#9bb1d4] shadow-sm focus:border-[#163065] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a3680] sm:text-sm"
      aria-invalid={!!error}
    />
  </div>

  <button
    type="submit"
    className="w-full rounded-full bg-[#1a3680] py-3 text-white text-lg font-semibold shadow-md hover:bg-[#163065] focus:outline-none focus:ring-4 focus:ring-[#1a3680]/70 transition"
  >
    Iniciar Sesión
  </button>
</div>
    </form>
  );
}
