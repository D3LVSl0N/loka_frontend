import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock Prisma Database State
  // Updated state to adhere to the single Superadmin constraint
  let users = [
    { id: 1, name: 'Alice Walker', email: 'alice.w@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bsmith@example.com', role: 'Superadmin', status: 'Active' },
    { id: 3, name: 'Charlie Davis', email: 'charlie.d@example.com', role: 'Admin', status: 'Active' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'Inactive' },
    { id: 5, name: 'Evan Wright', email: 'ewright@example.com', role: 'Admin', status: 'Active' },
  ];

  // 1. Mock Authentication & Role Validation Middleware
  const authenticateRole = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // In a real app, this reads the JWT payload or session cookie securely.
    // For this live preview, we simulate reading a secure header passed by the frontend.
    const role = req.headers['x-mock-role'];
    if (!role) {
      res.status(401).json({ error: 'Unauthorized: Missing Role' });
      return;
    }
    (req as any).user = { role };
    next();
  };

  // 2. Fetch Users API
  app.get('/api/users', authenticateRole, (req, res) => {
    // In a real app: const users = await prisma.user.findMany();
    // Simulate slight network delay
    setTimeout(() => {
      res.json(users);
    }, 400);
  });

  // 3. Delete User API (Protected against non-Superadmins)
  app.delete('/api/users/:id', authenticateRole, (req, res) => {
    const userRole = (req as any).user.role;
    
    // SECURE SERVER-SIDE ROLE VALIDATION
    if (userRole !== 'Superadmin') {
      res.status(403).json({ error: 'Forbidden: You do not have permission to delete users.' });
      return;
    }

    const userId = parseInt(req.params.id);
    users = users.filter((u) => u.id !== userId);
    
    setTimeout(() => {
      res.json({ success: true });
    }, 400);
  });

  // 4. Create User API with Superadmin Constraint Logic
  app.post('/api/users', authenticateRole, (req, res) => {
    const userRole = (req as any).user.role;
    const { name, email, role, status } = req.body;

    // Only one Superadmin constraint logic!
    if (role === 'Superadmin') {
      const existingSuperadmin = users.find(u => u.role === 'Superadmin');
      if (existingSuperadmin) {
        res.status(400).json({ error: 'Constraint Failure: Only ONE Super Admin can exist in the system.' });
        return;
      }
    }

    // Secondary authorization gate check
    if (role === 'Superadmin' && userRole !== 'Superadmin') {
      res.status(403).json({ error: 'Forbidden: Only an existing Superadmin can attempt role inheritance.' });
      return;
    }

    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      name,
      email,
      role: role || 'User',
      status: status || 'Active'
    };

    users.unshift(newUser);
    
    setTimeout(() => {
      res.json(newUser);
    }, 400);
  });

  // Vite development middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
