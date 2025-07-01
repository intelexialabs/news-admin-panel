interface News {
  id: string;
  title: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
}

export type { News, User };