'use client';
import styles from './asistente-ia.module.css';
import { useState } from 'react';
import { FiSend } from 'react-icons/fi';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { type: 'system', text: 'Hola, soy tu asistente legal con IA. ¿En qué puedo ayudarte hoy?' },
    { type: 'user', text: 'Hola, necesito ayuda con un contrato de arrendamiento...' },
    { type: 'bot', text: 'Claro, puedo ayudarte con eso. Las cláusulas sobre reparaciones...' }
  ]);

  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { type: 'user', text: input }]);
    setInput('');
  };

  return (
    <div className={styles.chatWrapper}>
      {/* Conversaciones recientes */}
      <aside className={styles.sidebar}>
        <button className={styles.newChat}>+ Nueva Consulta</button>
        <input type="text" placeholder="Buscar conversaciones" className={styles.search} />
        <ul className={styles.chatList}>
          <li className={styles.active}>Consulta sobre contrato de arrendamiento</li>
          <li>Revisión de términos laborales</li>
          <li>Consulta sobre derechos de autor</li>
          <li>Análisis de contrato comercial</li>
        </ul>
      </aside>

      {/* Chat */}
      <div className={styles.chatPanel}>
        <header className={styles.chatHeader}>
          <h2>Consulta sobre contrato de arrendamiento</h2>
        </header>

        <div className={styles.chatBody}>
          {messages.map((msg, i) => (
            <div key={i} className={`${styles.message} ${styles[msg.type]}`}>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        <div className={styles.chatInput}>
          <textarea
            placeholder='Escribe tu mensaje...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleSend}>
            Enviar <FiSend />
          </button>
        </div>

        
      </div>
    </div>
  );
}
