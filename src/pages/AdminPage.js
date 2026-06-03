import React, { useState } from "react";
import "./AdminPage.css";

const AdminPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (
      user === process.env.REACT_APP_ADMIN_USER &&
      password === process.env.REACT_APP_ADMIN_PASSWORD
    ) {
      setLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Usuário ou senha incorretos.");
    }
  };

  const handleSend = async () => {
    if (!title.trim() || !body.trim()) {
      setError("Preencha o título e a mensagem.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/send-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
      });

      const data = await response.json();
      setResult(data);
      setTitle("");
      setBody("");
    } catch (err) {
      setError("Erro ao enviar notificação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (!loggedIn) {
    return (
      <div className="admin-container">
        <div className="admin-card">
          <h2 className="admin-title">🔒 Área Administrativa</h2>
          <p className="admin-subtitle">Pampa Saúde</p>

          <input
            className="admin-input"
            type="text"
            placeholder="Usuário"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            className="admin-input"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />

          {loginError && <p className="admin-error">{loginError}</p>}

          <button className="admin-button" onClick={handleLogin}>
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h2 className="admin-title">📢 Enviar Notificação</h2>
        <p className="admin-subtitle">A mensagem será enviada para todos os dispositivos</p>

        <label className="admin-label">Título</label>
        <input
          className="admin-input"
          type="text"
          placeholder="Ex: Novo comunicado"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={50}
        />
        <small className="admin-counter">{title.length}/50</small>

        <label className="admin-label">Mensagem</label>
        <textarea
          className="admin-textarea"
          placeholder="Ex: Temos uma novidade para você!"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={200}
        />
        <small className="admin-counter">{body.length}/200</small>

        {error && <p className="admin-error">{error}</p>}

        {result && (
          <div className="admin-result">
            <p>✅ Notificação enviada com sucesso!</p>
            <p>📱 Total de dispositivos: <strong>{result.total}</strong></p>
            <p>✔️ Enviadas: <strong>{result.sent}</strong></p>
            {result.failed > 0 && (
              <p>⚠️ Falhas (dispositivos removidos): <strong>{result.failed}</strong></p>
            )}
          </div>
        )}

        <button
          className="admin-button"
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar para Todos"}
        </button>

        <button
          className="admin-button-logout"
          onClick={() => setLoggedIn(false)}
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default AdminPage;