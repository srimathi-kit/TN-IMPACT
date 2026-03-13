import React, { useState, useEffect } from 'react'
import axios from 'axios'
import API_BASE_URL from '../api'
import { Send, User, MessageSquare, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const Messages = () => {
  const location = useLocation()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [conversations, setConversations] = useState([])
  const [selectedContact, setSelectedContact] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  useEffect(() => {
    fetchMessages()
    markAllAsRead()
    const interval = setInterval(fetchMessages, 5000)
    return () => clearInterval(interval)
  }, [])

  const markAllAsRead = async () => {
    try {
      await axios.put(`${API_BASE_URL}/messages/read-all`, {}, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      window.dispatchEvent(new Event('refreshNotifications'));
    } catch (err) {
      console.error('Error marking all messages as read:', err);
    }
  };

  const fetchMessages = async () => {
    try {
      const timestamp = new Date().getTime()
      const { data } = await axios.get(`${API_BASE_URL}/messages?t=${timestamp}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      })
      setMessages(data)
      
      // Group by conversation
      const contactsMap = {}
      data.forEach(msg => {
        const isSenderMine = String(msg.sender._id || msg.sender) === String(userInfo._id);
        const contact = isSenderMine ? msg.receiver : msg.sender;
        const contactId = String(contact._id || contact);
        if (!contactsMap[contactId]) {
          contactsMap[contactId] = {
            ...contact,
            lastMessage: msg.message,
            timestamp: msg.createdAt,
            unread: !isSenderMine && !msg.read && String(selectedContact?._id) !== String(contactId)
          }
        } else if (!isSenderMine && !msg.read && String(selectedContact?._id) !== String(contactId)) {
          contactsMap[contactId].unread = true;
        }
      })
      const convList = Object.values(contactsMap)
      setConversations(convList)
      
      if (location.state?.contact) {
        const contact = location.state.contact
        setSelectedContact(contact)
        if (!contactsMap[String(contact._id)]) {
          setConversations([contact, ...convList])
        }
      }
      setLoading(false)
      
      // If a contact is already selected, mark as read
      if (selectedContact) {
        markAsRead(selectedContact._id)
      }
    } catch (err) {
      console.error(err)
      if (err.response?.status === 401) {
        localStorage.removeItem('userInfo')
        window.location.href = '/login'
      }
      setLoading(false)
    }
  }

  const markAsRead = async (senderId) => {
    // Clear local state immediately for instant feedback
    setConversations(prev => prev.map(c => 
      String(c._id) === String(senderId) ? { ...c, unread: false } : c
    ));

    const idStr = String(senderId);
    try {
      await axios.put(`${API_BASE_URL}/messages/read/${idStr}`, {}, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      // Trigger Navbar to update immediately
      window.dispatchEvent(new Event('refreshNotifications'));
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  useEffect(() => {
    if (selectedContact) {
      markAsRead(selectedContact._id)
    }
  }, [selectedContact])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedContact) return

    try {
      await axios.post(`${API_BASE_URL}/messages`, {
        receiver: selectedContact._id,
        message: newMessage
      }, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      })
      setNewMessage('')
      fetchMessages()
    } catch (err) {
      console.error(err)
    }
  }

  const getSafeId = (obj) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    if (obj._id) return obj._id.toString();
    return obj.toString();
  };

  const selectedMessages = messages.filter(msg => {
    if (!selectedContact) return false;
    const senderId = getSafeId(msg.sender);
    const receiverId = getSafeId(msg.receiver);
    const currentUserId = getSafeId(userInfo);
    const contactId = getSafeId(selectedContact);

    return (
      (senderId === currentUserId && receiverId === contactId) ||
      (receiverId === currentUserId && senderId === contactId)
    );
  }).sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0))

  return (
    <div className="h-[calc(100vh-140px)] flex glass rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden animate-in fade-in duration-700">
      {/* Sidebar */}
      <div className="w-80 border-r border-white/10 flex flex-col bg-slate-950/40">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-black text-white tracking-tight">Industry Chats</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 && !loading ? (
            <div className="p-10 text-center text-slate-400 text-sm font-medium">
              No conversations yet.
            </div>
          ) : (
            conversations.map(contact => (
              <button 
                key={contact._id}
                onClick={() => setSelectedContact(contact)}
                className={`w-full p-6 text-left transition-all border-b border-white/5 flex items-center space-x-4 hover:bg-white/5 ${selectedContact?._id === contact._id ? 'bg-primary-500/10 border-l-4 border-l-primary-500' : ''}`}
              >
                <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-300 border border-white/10 shadow-inner">
                  <User className="h-6 w-6" />
                </div>
                <div className="flex-1 overflow-hidden relative">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-white truncate tracking-tight">{contact.industryName}</p>
                    {contact.unread && (
                      <div className="h-2 w-2 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-1">{contact.lastMessage}</p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-950/60 relative">
        {selectedContact ? (
          <>
            {/* Header */}
            <div className="p-6 glass-header border-b border-white/10 flex items-center justify-between sticky top-0 z-10 backdrop-blur-md bg-slate-950/50">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-2xl bg-primary-500/20 border border-primary-500/30 flex items-center justify-center text-primary-400 shadow-lg shadow-primary-500/10">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-bold text-white text-lg tracking-tight">{selectedContact.industryName}</h2>
                  <div className="flex items-center mt-1">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 mr-2 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></div>
                    <p className="text-xs text-emerald-400 font-medium tracking-wider uppercase">Secure Link Active</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 flex flex-col">
              {selectedMessages.map(msg => {
                const isMine = getSafeId(msg.sender) === getSafeId(userInfo);
                return (
                <div key={msg._id || Math.random()} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md p-5 rounded-[2rem] text-sm shadow-xl backdrop-blur-sm ${
                    isMine
                    ? 'bg-primary-600/90 text-white rounded-tr-sm shadow-primary-500/20 border border-primary-500/50' 
                    : 'bg-white/10 text-slate-100 rounded-tl-sm shadow-black/20 border border-white/10'
                  }`}>
                    <p className="leading-relaxed font-medium">{msg.message}</p>
                    <p className={`text-[10px] mt-3 font-medium flex items-center ${
                      isMine ? 'justify-end text-primary-200' : 'justify-start text-slate-400'
                    }`}>
                      <Clock className="h-3 w-3 mr-1.5 opacity-70" />
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                )
              })}
            </div>

            {/* Input */}
            <div className="p-6 bg-slate-950/80 border-t border-white/10 backdrop-blur-md">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
                <input 
                  type="text"
                  placeholder="Transmit secure message..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 focus:bg-white/10 outline-none transition-all placeholder:text-slate-500 text-white font-medium shadow-inner"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button 
                  type="submit"
                  className="bg-primary-600 text-white p-4 rounded-2xl hover:bg-primary-500 transition-all shadow-lg shadow-primary-600/30 flex items-center justify-center min-w-[3.5rem]"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-20 relative overflow-hidden">
            {/* Background decorative glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-500/5 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="h-24 w-24 glass rounded-[2.5rem] border border-white/10 shadow-2xl flex items-center justify-center mb-8 relative z-10">
              <MessageSquare className="h-10 w-10 text-primary-400" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight relative z-10">Select a connection</h2>
            <p className="text-slate-400 mt-3 max-w-sm font-medium relative z-10">Pick an industrial partner from the left menu to establish a secure circular-economy comm channel.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Messages
