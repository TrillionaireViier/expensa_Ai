import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart 
} from 'recharts';
import { 
  Wallet, TrendingUp, TrendingDown, Plus, Sparkles, Send, 
  Coffee, ShoppingBag, Car, Home, Smartphone
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const initialData = [
  { name: 'Mon', expenses: 120, income: 0 },
  { name: 'Tue', expenses: 45, income: 0 },
  { name: 'Wed', expenses: 80, income: 450 },
  { name: 'Thu', expenses: 210, income: 0 },
  { name: 'Fri', expenses: 60, income: 0 },
  { name: 'Sat', expenses: 150, income: 0 },
  { name: 'Sun', expenses: 90, income: 0 },
];

const initialTransactions = [
  { id: 1, type: 'expense', amount: 4.50, category: 'Food', title: 'Starbucks Coffee', date: 'Today, 09:41 AM', icon: Coffee },
  { id: 2, type: 'expense', amount: 120.00, category: 'Shopping', title: 'Nike Shoes', date: 'Yesterday, 14:20 PM', icon: ShoppingBag },
  { id: 3, type: 'income', amount: 450.00, category: 'Salary', title: 'Freelance UI Design', date: 'Wed, 10:00 AM', icon: Wallet },
  { id: 4, type: 'expense', amount: 35.00, category: 'Transport', title: 'Uber Ride', date: 'Tue, 18:30 PM', icon: Car },
];

export default function App() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [chatInput, setChatInput] = useState('');
  const [chatLog, setChatLog] = useState([
    { role: 'ai', text: 'Hi! I am Expensa AI. Tell me what you bought or earned, like "Spent $45 on groceries today".' }
  ]);

  const handleAISubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newLog = [...chatLog, { role: 'user', text: chatInput }];
    setChatLog(newLog);
    
    // Simulate AI parsing
    setTimeout(() => {
      let responseText = "I couldn't quite catch the amount or category.";
      
      const lowerInput = chatInput.toLowerCase();
      
      // Simple mock AI logic
      if (lowerInput.includes('spent') || lowerInput.includes('bought')) {
        const amountMatch = chatInput.match(/\\$?(\\d+)/);
        if (amountMatch) {
          const amount = parseFloat(amountMatch[1]);
          const newTx = {
            id: uuidv4(),
            type: 'expense',
            amount: amount,
            category: 'AI Auto-categorized',
            title: chatInput,
            date: 'Just now',
            icon: ShoppingBag
          };
          setTransactions([newTx, ...transactions]);
          responseText = `Got it! I added an expense of $${amount.toFixed(2)}. Watch your spending! 💸`;
        }
      } else if (lowerInput.includes('earned') || lowerInput.includes('got')) {
        const amountMatch = chatInput.match(/\\$?(\\d+)/);
        if (amountMatch) {
          const amount = parseFloat(amountMatch[1]);
          const newTx = {
            id: uuidv4(),
            type: 'income',
            amount: amount,
            category: 'Income',
            title: chatInput,
            date: 'Just now',
            icon: Wallet
          };
          setTransactions([newTx, ...transactions]);
          responseText = `Awesome! Added $${amount.toFixed(2)} to your income. Keep it up! 🚀`;
        }
      }

      setChatLog([...newLog, { role: 'ai', text: responseText }]);
    }, 800);

    setChatInput('');
  };

  const totalBalance = 2450.00;
  const totalIncome = 3200.00;
  const totalExpenses = 750.00;

  return (
    <div className="app-container">
      <header>
        <h1><Wallet size={32} color="#a78bfa" /> Expensa <span className="ai-badge">AI</span></h1>
        <button className="add-btn">
          <Plus size={20} /> Add Manual
        </button>
      </header>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <span>Total Balance</span>
            <Wallet size={20} />
          </div>
          <div className="stat-value">${totalBalance.toFixed(2)}</div>
        </div>
        <div className="card">
          <div className="card-header">
            <span>Monthly Income</span>
            <TrendingUp size={20} color="#10b981" />
          </div>
          <div className="stat-value stat-positive">${totalIncome.toFixed(2)}</div>
        </div>
        <div className="card">
          <div className="card-header">
            <span>Monthly Expenses</span>
            <TrendingDown size={20} color="#ef4444" />
          </div>
          <div className="stat-value stat-negative">${totalExpenses.toFixed(2)}</div>
        </div>
      </div>

      <div className="main-content">
        <div className="card" style={{ paddingBottom: 0 }}>
          <div className="card-header">
            <span>Weekly Overview</span>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <AreaChart data={initialData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Area type="monotone" dataKey="expenses" stroke="#ef4444" fillOpacity={1} fill="url(#colorExp)" strokeWidth={3} />
                <Area type="monotone" dataKey="income" stroke="#10b981" fillOpacity={1} fill="url(#colorInc)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <div className="card-header" style={{ marginBottom: 0 }}>
              <span>Recent Transactions</span>
            </div>
            <div className="transactions-list">
              {transactions.slice(0, 4).map(tx => {
                const Icon = tx.icon;
                return (
                  <div className="transaction-item" key={tx.id}>
                    <div className="transaction-info">
                      <div className={`icon-wrapper ${tx.type === 'expense' ? 'icon-expense' : 'icon-income'}`}>
                        <Icon size={20} />
                      </div>
                      <div className="transaction-details">
                        <h4>{tx.title}</h4>
                        <p>{tx.date}</p>
                      </div>
                    </div>
                    <div className={`transaction-amount ${tx.type === 'expense' ? 'stat-negative' : 'stat-positive'}`}>
                      {tx.type === 'expense' ? '-' : '+'}${tx.amount.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="card ai-assistant">
          <div className="card-header">
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#a78bfa', fontWeight: '600' }}>
              <Sparkles size={18} /> AI Assistant
            </span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Tell me about your spending and I'll log it for you.
          </p>
          
          <div className="ai-chat">
            {chatLog.map((log, i) => (
              log.role === 'ai' ? (
                <div className="ai-message" key={i}>
                  <div className="ai-avatar">AI</div>
                  <div style={{ flex: 1, lineHeight: '1.4' }}>{log.text}</div>
                </div>
              ) : (
                <div className="user-message" key={i}>
                  {log.text}
                </div>
              )
            ))}
          </div>

          <form className="chat-input-wrapper" onSubmit={handleAISubmit}>
            <input 
              type="text" 
              className="chat-input" 
              placeholder="e.g. Spent $20 on Netflix..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button type="submit" className="send-btn">
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
