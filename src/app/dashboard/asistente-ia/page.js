'use client';
import styles from './asistente-ia.module.css';
import { useState, useEffect } from 'react';
import { FiSend, FiTrash2, FiPlus, FiMessageSquare, FiSearch } from 'react-icons/fi'; // Importa nuevos íconos

export default function ChatPage() {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    // Simulamos la carga inicial de conversaciones
    const stored = localStorage.getItem('lexum_conversations');
    let initialConversations = [];
    if (stored) {
      initialConversations = JSON.parse(stored);
    } else {
      // Creamos una conversación de ejemplo si no hay ninguna
      initialConversations = [
        {
          id: Date.now(),
          title: 'Consulta de contrato',
          messages: [
            { type: 'bot', text: 'Hola, soy tu asistente legal con IA. ¿En qué puedo ayudarte hoy?' },
            { type: 'user', text: 'Necesito revisar un contrato de arrendamiento. ¿Cuáles son los puntos clave?' },
            { type: 'bot', text: 'Claro, con gusto. Los puntos clave en un contrato de arrendamiento son: las partes, la descripción del inmueble, el precio y forma de pago, la duración del contrato y las obligaciones de cada parte.' },
          ]
        },
      ];
    }
    setConversations(initialConversations);
    if (initialConversations.length > 0) {
      setActiveId(initialConversations[0].id);
    }
  }, []);

  useEffect(() => {
    // Sincroniza con localStorage cada vez que las conversaciones cambian
    localStorage.setItem('lexum_conversations', JSON.stringify(conversations));
  }, [conversations]);

  const activeConversation = conversations.find(c => c.id === activeId);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = { type: 'user', text: input };
    const updated = conversations.map(c =>
      c.id === activeId
        ? { ...c, messages: [...c.messages, newMessage] }
        : c
    );
    setConversations(updated);
    setInput('');
    // TODO: Aquí podrías llamar a una API para obtener la respuesta del bot
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleNewConversation = () => {
    const newId = Date.now();
    const newConv = {
      id: newId,
      title: `Nueva consulta ${conversations.length + 1}`,
      messages: [
        {
          type: 'bot',
          text: 'Hola, soy tu asistente legal con IA. ¿En qué puedo ayudarte hoy?'
        }
      ]
    };
    setConversations([newConv, ...conversations]);
    setActiveId(newId);
  };

  const handleDelete = (id) => {
    const updated = conversations.filter(c => c.id !== id);
    setConversations(updated);
    if (id === activeId && updated.length > 0) {
      setActiveId(updated[0].id);
    } else if (updated.length === 0) {
      setActiveId(null);
    }
  };

  const handleRename = (id) => {
    const updated = conversations.map(c =>
      c.id === id ? { ...c, title: editTitle.trim() || c.title } : c
    );
    setConversations(updated);
    setEditingId(null);
  };
  
  // Función para obtener las iniciales del usuario
  const getUserInitials = (name) => {
    if (!name) return 'JD'; // Valor por defecto
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  return (
    <div className={styles.chatWrapper}>
      <aside className={styles.sidebar}>
        <button className={styles.newChat} onClick={handleNewConversation}>
          <FiPlus /> Nueva Consulta
        </button>
        <div className={styles.searchContainer}>
           <FiSearch size={18} color="#9ca3af" />
          <input
            type="text"
            placeholder="Buscar conversaciones"
            className={styles.search}
          />
        </div>
        <ul className={styles.chatList}>
          {conversations.map((conv) => (
            <li
              key={conv.id}
              className={conv.id === activeId ? styles.active : ''}
              onClick={() => setActiveId(conv.id)}
              onDoubleClick={() => {
                setEditingId(conv.id);
                setEditTitle(conv.title);
              }}
            >
              {editingId === conv.id ? (
                <input
                  className={styles.renameInput}
                  value={editTitle}
                  autoFocus
                  onChange={(e) => setEditTitle(e.target.value)}
                  onBlur={() => handleRename(conv.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleRename(conv.id);
                  }}
                />
              ) : (
                <span className={styles.chatListItemTitle}>{conv.title}</span>
              )}
              <button
                className={styles.deleteBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(conv.id);
                }}
              >
                <FiTrash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div className={styles.chatPanel}>
        <header className={styles.chatHeader}>
          <h2>{activeConversation?.title || 'Selecciona una conversación'}</h2>
        </header>

        <div className={styles.chatBody}>
          {activeConversation?.messages.map((msg, i) => (
            <div
              key={i}
              className={`${styles.messageWrapper} ${
                msg.type === 'user' ? styles.user : styles.bot
              }`}
            >
              {/* Aquí usamos las nuevas clases de avatar */}
              {msg.type === 'user' ? (
                <div className={styles.avatarUser}>JD</div>
              ) : (
                <div className={styles.avatarBot}>🤖</div>
              )}

              <div className={styles.messageContent}>
                {msg.type === 'bot' && (
                  <div className={styles.botHeader}>
                    <strong className={styles.botTitle}>Asistente Legal IA</strong>
                  </div>
                )}
                <p className={styles.messageText}>{msg.text}</p>
              </div>
            </div>
          ))}
          {activeConversation?.messages.length === 0 && (
            <div className={styles.system}>
              <p>Hola, soy tu asistente legal con IA. ¿En qué puedo ayudarte hoy?</p>
            </div>
          )}
        </div>

        {activeConversation && (
          <>
            <div className={styles.chatInput}>
              <textarea
                placeholder="Escribe tu mensaje..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
              />
              <button onClick={handleSend}>
                <FiSend size={20} />
              </button>
            </div>
            <div className={styles.notice}>
              <p>El asistente es una herramienta de IA. No sustituye la asesoría de un profesional.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}