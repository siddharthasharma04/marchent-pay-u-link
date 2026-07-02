import { useState } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useAppStore } from '../../../store/useAppStore';
import { useTransactionHistoryStyles } from './styles';
import { useTheme } from '../../../hooks/useTheme';
import { ArrowLeft } from 'lucide-react-native';
import InvoiceCard from '../../../components/molecules/invoice-card/InvoiceCard';

interface HistoryProps {
  onBack: () => void;
}

export default function TransactionHistoryScreen({ onBack }: HistoryProps) {
  const invoices = useAppStore((state) => state.invoices);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Paid' | 'Pending' | 'Failed'>('All');
  const styles = useTransactionHistoryStyles();
  const {colors} = useTheme();

  // Filter logic for our local JSON/Zustand state
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch = invoice.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          invoice.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' ? true : invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <View style={styles.container}>
      {/* Header View */}
       <View style={styles.header}>
            <TouchableOpacity onPress={onBack}>
                <ArrowLeft color={styles.backBtnText.color} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Transaction History</Text>
            <View style={{ width: 50 }} />
        </View>

      {/* Search Input Box */}
      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by customer name or ID..."
          placeholderTextColor={colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filter Chips Layer */}
      <View style={styles.filterContainer}>
        {(['All', 'Paid', 'Pending', 'Failed'] as const).map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.filterChip,
              statusFilter === status && styles.activeFilterChip
            ]}
            onPress={() => setStatusFilter(status)}
          >
            <Text style={[
              styles.filterChipText,
              statusFilter === status && styles.activeFilterChipText
            ]}>
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Filtered Scroll View Feed */}
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {filteredInvoices.length === 0 ? (
          <Text style={styles.emptyText}>No matching records found.</Text>
        ) : (
          filteredInvoices.map((invoice) => (
             <InvoiceCard key={invoice.id} invoice={invoice} />
          ))
        )}
      </ScrollView>
    </View>
  );
}

