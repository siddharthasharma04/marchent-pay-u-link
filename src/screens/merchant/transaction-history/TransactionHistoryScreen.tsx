import { useState } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity, Modal } from 'react-native';
import { useAppStore } from '../../../store/useAppStore';
import { useTransactionHistoryStyles } from './styles';
import { useTheme } from '../../../hooks/useTheme';
import InvoiceCard from '../../../components/molecules/invoice-card/InvoiceCard';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../components/organisms/header/Header';
import { X } from 'lucide-react-native';
import { TInvoice } from '../../../model';
import { CurrencyIcon } from '../../../components/atoms/CurrencyIcon';

interface HistoryProps {
  onBack: () => void;
}

export default function TransactionHistoryScreen() {
  const invoices = useAppStore((state) => state.invoices);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<TInvoice | null>(null);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Paid' | 'Pending' | 'Failed'>('All');
  const styles = useTransactionHistoryStyles();
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

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
      {/* <Header title='Transaction History'/> */}

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
            <TouchableOpacity
              key={invoice.id}
              onPress={() => setSelectedInvoice(invoice)} // 2. Trigger modal open by setting data
              activeOpacity={0.7}
            >
              <InvoiceCard key={invoice.id} invoice={invoice} />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      {/* Loan Detail Pop-over Sheet */}
      <Modal
        visible={!!selectedInvoice} // Opens automatically if selectedTx is not null
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedInvoice(null)} // Handles Android hardware back button
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>

            {/* Drag indicator bar for premium native aesthetic */}
            <View style={styles.dragIndicator} />

            <Text style={styles.modalTitle}>Transaction Details</Text>

            {selectedInvoice && (
              <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Customer Name</Text>
                  <Text style={styles.detailValue}>{selectedInvoice.customerName}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Description</Text>
                  <Text style={styles.detailValue}>{selectedInvoice.description}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Amount</Text>
                  <View style={styles.detailValueWrap}>
                    <Text><CurrencyIcon color={colors?.primary} /></Text>
                    <Text style={[styles.detailValue, { color: colors?.primary }]}>{selectedInvoice.amount?.toFixed(3)}</Text>
                  </View>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Date</Text>
                  <Text style={styles.detailValue}>{selectedInvoice.createdAt}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Ref Number</Text>
                  <Text style={styles.detailValue}>{selectedInvoice.id}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Status</Text>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: selectedInvoice.status === 'Paid' ? colors.success + '20' : selectedInvoice.status === 'Pending' ? '#FF980020' : colors.error + '20' }
                  ]}>
                    <Text style={[
                      styles.statusText,
                      { color: selectedInvoice.status === 'Paid' ? colors.success : selectedInvoice.status === 'Pending' ? '#FB8C00' : colors.error }
                    ]}>
                      {selectedInvoice.status}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {/* Action Buttons */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedInvoice(null)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </View>

  );
}

