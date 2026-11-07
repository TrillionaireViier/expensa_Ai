import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const initialTransactions = [
  { id: '1', title: 'Coffee', category: 'Food', type: 'expense', amount: 4.5 },
  { id: '2', title: 'Freelance design', category: 'Income', type: 'income', amount: 450 },
  { id: '3', title: 'Transport', category: 'Travel', type: 'expense', amount: 35 },
];

export default function App() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const totals = useMemo(() => transactions.reduce((sum, item) => {
    sum[item.type] += item.amount;
    return sum;
  }, { income: 0, expense: 0 }), [transactions]);

  const addTransaction = () => {
    const value = Number(amount);
    if (!title.trim() || !Number.isFinite(value) || value <= 0) return;
    setTransactions(items => [{ id: `${Date.now()}`, title: title.trim(), category: type === 'income' ? 'Income' : 'General', type, amount: value }, ...items]);
    setTitle('');
    setAmount('');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.eyebrow}>PERSONAL FINANCE</Text>
        <Text style={styles.title}>Expensa <Text style={styles.accent}>AI</Text></Text>
        <Text style={styles.subtitle}>Your money, clearly organized.</Text>
        <View style={styles.balanceCard}>
          <Text style={styles.label}>AVAILABLE BALANCE</Text>
          <Text style={styles.balance}>${(totals.income - totals.expense).toFixed(2)}</Text>
          <View style={styles.statsRow}>
            <View><Text style={styles.label}>INCOME</Text><Text style={styles.income}>+${totals.income.toFixed(2)}</Text></View>
            <View><Text style={styles.label}>SPENDING</Text><Text style={styles.expense}>-${totals.expense.toFixed(2)}</Text></View>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Add transaction</Text>
          <TextInput value={title} onChangeText={setTitle} placeholder="What was it for?" placeholderTextColor="#8290a5" style={styles.input} />
          <TextInput value={amount} onChangeText={setAmount} placeholder="Amount" placeholderTextColor="#8290a5" keyboardType="decimal-pad" style={styles.input} />
          <View style={styles.statsRow}>
            {['expense', 'income'].map(option => <TouchableOpacity key={option} onPress={() => setType(option)} style={[styles.typeButton, type === option && styles.selectedType]}><Text style={styles.buttonText}>{option.toUpperCase()}</Text></TouchableOpacity>)}
          </View>
          <TouchableOpacity onPress={addTransaction} style={styles.addButton}><Text style={styles.addText}>Add transaction</Text></TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>Recent activity</Text>
        {transactions.map(item => <View key={item.id} style={styles.transaction}><View><Text style={styles.transactionTitle}>{item.title}</Text><Text style={styles.label}>{item.category}</Text></View><Text style={item.type === 'income' ? styles.income : styles.expense}>{item.type === 'income' ? '+' : '-'}${item.amount.toFixed(2)}</Text></View>)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0b1220' }, container: { padding: 22, paddingBottom: 48, gap: 18 },
  eyebrow: { color: '#9b8bff', fontSize: 11, fontWeight: '800', letterSpacing: 2, marginTop: 16 },
  title: { color: '#f8fafc', fontSize: 36, fontWeight: '900' }, accent: { color: '#a78bfa' },
  subtitle: { color: '#aab4c5', fontSize: 15, marginTop: -12 },
  balanceCard: { backgroundColor: '#171f31', borderWidth: 1, borderColor: '#303b50', borderRadius: 22, padding: 22, gap: 14 },
  label: { color: '#8290a5', fontSize: 11, fontWeight: '700', letterSpacing: 1 }, balance: { color: 'white', fontSize: 36, fontWeight: '800' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginTop: 8 }, income: { color: '#34d399', fontWeight: '800', marginTop: 6 }, expense: { color: '#fb7185', fontWeight: '800', marginTop: 6 },
  card: { backgroundColor: '#171f31', borderColor: '#303b50', borderWidth: 1, borderRadius: 20, padding: 18, gap: 12 }, sectionTitle: { color: '#f8fafc', fontSize: 19, fontWeight: '800', marginTop: 8 },
  input: { backgroundColor: '#0b1220', borderColor: '#344158', borderWidth: 1, color: 'white', padding: 14, borderRadius: 12 }, typeButton: { flex: 1, padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#344158', alignItems: 'center' }, selectedType: { backgroundColor: '#453883' }, buttonText: { color: 'white', fontSize: 12, fontWeight: '800' },
  addButton: { backgroundColor: '#8b5cf6', padding: 15, borderRadius: 12, alignItems: 'center' }, addText: { color: 'white', fontWeight: '800' },
  transaction: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#171f31', borderColor: '#303b50', borderWidth: 1, padding: 15, borderRadius: 14 }, transactionTitle: { color: '#f8fafc', fontWeight: '700', marginBottom: 5 },
});
