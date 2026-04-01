import { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });

  const API = '/api/users';

  const fetchUsers = async () => {
    const res = await axios.get(API);
    setUsers(res.data);
  };

  const addUser = async () => {
    if (!form.name || !form.email) return;
    await axios.post(API, form);
    setForm({ name: '', email: '' });
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          User Manager 🚀
        </h1>

        <div className="flex gap-2 mb-6">
          <input
            className="border p-2 rounded w-full"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="border p-2 rounded w-full"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <button
            className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
            onClick={addUser}
          >
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {users.map((u) => (
            <li
              key={u._id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded shadow-sm"
            >
              <div>
                <p className="font-semibold">{u.name}</p>
                <p className="text-sm text-gray-500">{u.email}</p>
              </div>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => deleteUser(u._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
