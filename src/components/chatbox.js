"use client";

import React, { useState } from 'react';
import axios from 'axios';
import styles from './chatbox.module.css';

export default function Chatbox({ pantryItems }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    setLoading(true);
    const userMessage = input;
    setMessages([...messages, { sender: 'user', text: userMessage }]);
    setInput('');

    try {
      const response = await axios.post('/api/openai', { pantryItems, message: userMessage });
      const botMessage = response.data.message;
      setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: userMessage }, { sender: 'bot', text: botMessage }]);
    } catch (error) {
      console.error("Chatbox Error:", error.message);
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: "Error fetching response from the server." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.chatbox}>
      <div className={styles.messages}>
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === 'user' ? styles.userMessage : styles.botMessage}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask for a recipe..."
        disabled={loading}
      />
      <button onClick={handleSendMessage} disabled={loading}>
        Send
      </button>
    </div>
  );
}
