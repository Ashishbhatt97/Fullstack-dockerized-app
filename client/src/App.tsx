import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import "./App.css";
import api from "./axios";

const App: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState<{ id: number; email: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all emails from API
  const fetchEmails = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("users");
      console.log("API response:", res.data);
      if (Array.isArray(res.data)) {
        setEmails(res.data);
      } else {
        setEmails([]);
        setError("Invalid data format from server");
      }
    } catch (error) {
      console.error("Error fetching emails:", error);
      setEmails([]);
      setError("Failed to fetch emails");
    } finally {
      setLoading(false);
    }
  };

  // Add new email
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    console.log("handle");

    try {
      await api.post("users", { email });
      setEmail("");
      fetchEmails();
    } catch (error) {
      console.error("Error adding email:", error);
      setError("Failed to add email");
    }
  };

  // Fetch emails on mount
  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className="container">
      <motion.div className="card">
        <h1 className="title">Email Manager 📧</h1>

        <form onSubmit={handleSubmit} className="form">
          <input
            type="email"
            placeholder="Enter email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
          <button type="submit" className="button">
            Add
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        <h2 className="subtitle">Saved Emails ({emails.length})</h2>

        <div className="email-list">
          {loading ? (
            <p className="loading">Loading emails...</p>
          ) : Array.isArray(emails) && emails.length > 0 ? (
            <ul>
              {emails.map((user) => (
                <motion.li key={user.id} className="email-item">
                  {user.email}
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className="no-data">No emails found.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default App;
