import { useState } from "react";

const UserList: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://skojryaxbquqtwvuyhfv.supabase.co/rest/v1/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrb2pyeWF4YnF1cXR3dnV5aGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MTQ0MTUsImV4cCI6MjA3MzA5MDQxNX0.nZMSWKNIve_UmSe1KEehy9ocL2FIR25QflnccDRQ998",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrb2pyeWF4YnF1cXR3dnV5aGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MTQ0MTUsImV4cCI6MjA3MzA5MDQxNX0.nZMSWKNIve_UmSe1KEehy9ocL2FIR25QflnccDRQ998",
          },
          body: JSON.stringify({ name, email }),
        }
      );

      const data = await res.json();
      console.log("Usuario creado:", data);
      setName('');
      setEmail('');
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  return (
    <div>
      <h1>CREAR USUARIOS</h1>
      <form onSubmit={guardar}>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Crear Usuario</button>
      </form>
    </div>
  );
};

export default UserList;
