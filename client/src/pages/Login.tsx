import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await api.post('/auth/login', { email, password });
    if (res.token) {
      localStorage.setItem('token', res.token);
      navigate('/');
    }
  }
  return (
    <form onSubmit={submit} className="p-4 flex flex-col gap-2 max-w-sm mx-auto">
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2" />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2" />
      <button className="bg-blue-500 text-white p-2">Login</button>
    </form>
  );
}
