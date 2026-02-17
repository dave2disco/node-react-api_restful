import { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:3000/users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Errore fetch users:', err);
    }
  };

  const addUser = async () => {
    if (!name || !email) return alert('Inserisci nome ed email!');
    try {
      await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });
      setName('');
      setEmail('');
      fetchUsers();
    } catch (err) {
      console.error('Errore add user:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lista Utenti</h1>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button onClick={addUser}>Aggiungi Utente</button>

      <ul>
        {users.length === 0 ? (
          <li>Nessun utente presente</li>
        ) : (
          users.map(user => (
            <li key={user.id}>{user.name} - {user.email}</li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
