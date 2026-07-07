import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import { useAppStore } from '../../../store/useAppStore';
import { THalLoan } from '../../../model';
import Header from '../../../components/organisms/header/Header';
import { useHALStyles } from './styles';
import { useTheme } from '../../../hooks/useTheme';
import { CurrencyIcon } from '../../../components/atoms/CurrencyIcon';

export default function HalRegistryScreen() {
    const { halLoans } = useAppStore();
    const { colors } = useTheme()
    const [selectedLoan, setSelectedLoan] = useState<THalLoan | null>(null);
    const styles = useHALStyles()
    return (
        <View style={styles.container}>
            {/* <Header title='HAL Registry' /> */}
            {/* <Text style={styles.title}>HAL Registry Systems</Text>
            <Text style={styles.subtitle}>Corporate Credit Lines & Active Commercial Financing</Text> */}

            <FlatList
                data={halLoans}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.loanCard} onPress={() => setSelectedLoan(item)}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.loanId}>{item.id}</Text>
                            <View style={[styles.badge, { backgroundColor: item.status === 'Active' ? colors.success + '20' : colors.textMuted + '20' }]}>
                                <Text style={{ color: item.status === 'Active' ? colors.success : colors.textMuted, fontWeight: '700', fontSize: 11 }}>{item.status}</Text>
                            </View>
                        </View>
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6}}>
                            <Text><CurrencyIcon color={styles.cardAmount.color} /></Text>
                            <Text style={styles.cardAmount}>{item.loanAmount.toLocaleString()}</Text>
                        </View>
                        <Text style={styles.cardTenure}>Pending Duration: {item.pendingTenure}</Text>
                    </TouchableOpacity>
                )}
            />

            {/* Loan Detail Pop-over Sheet */}
            <Modal visible={selectedLoan !== null} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Financing Breakdown</Text>
                        <View style={styles.divider} />

                        <View style={styles.detailRow}><Text style={styles.detailLabel}>Facility ID:</Text><Text style={styles.detailVal}>{selectedLoan?.id}</Text></View>
                        <View style={styles.detailRow}><Text style={styles.detailLabel}>Principal Balance:</Text><Text style={styles.detailVal}>{selectedLoan?.loanAmount.toLocaleString()}</Text></View>
                        <View style={styles.detailRow}><Text style={styles.detailLabel}>Interest Evaluation:</Text><Text style={styles.detailVal}>{selectedLoan?.interestRate}</Text></View>
                        <View style={styles.detailRow}><Text style={styles.detailLabel}>Remaining Lifespan:</Text><Text style={styles.detailVal}>{selectedLoan?.pendingTenure}</Text></View>
                        <View style={styles.detailRow}><Text style={styles.detailLabel}>Next Installment Date:</Text><Text style={styles.detailVal}>{selectedLoan?.nextInstallmentDate}</Text></View>
                        <View style={styles.detailRow}><Text style={styles.detailLabel}>Account Standing:</Text><Text style={[styles.detailVal, { color: '#2EBD59' }]}>{selectedLoan?.status}</Text></View>

                        <TouchableOpacity style={styles.closeBtn} onPress={() => setSelectedLoan(null)}>
                            <Text style={styles.closeBtnText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
