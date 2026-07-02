import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useAppStore, useTranslation } from '../../../store/useAppStore';
import { useDashboardStyles } from './styles';
import InvoiceCard from '../../../components/molecules/invoice-card/InvoiceCard';
import { TTabType } from '../../../model';
import { BellDot, User } from 'lucide-react-native';
import { CurrencyIcon } from '../../../components/atoms/CurrencyIcon';

export default function DashboardScreen({ navigateTo }: { navigateTo: (tab: TTabType) => void }) {
    const { username, invoices } = useAppStore();
    const { t, isRTL } = useTranslation();

    const styles = useDashboardStyles();

    // Calculate quick metrics from mock data
    const totalCollected = invoices
        .filter(i => i.status === 'Paid')
        .reduce((sum, current) => sum + current.amount, 0);

    return (
        <View style={styles.container}>
            {/* Premium Profile Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigateTo('profile')}>
                    <Text style={styles.userIcon}>
                        <User size={18} />
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <BellDot size={20} color={styles.userIcon.color} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
                <View style={{ marginBottom: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={styles.welcomeText}>Marhaban </Text>
                    <Text style={styles.usernameText}>{username || 'Merchant'}</Text>
                </View>
                {/* Metric Balance Card (Omani Theme Layout) */}
                <View style={styles.metricCard}>
                    <Text style={styles.metricLabel}>Total Collections</Text>
                    <View style={styles.metricValue}>
                        <Text><CurrencyIcon color={styles.metricAmount.color} size={40} /></Text>
                        <Text style={styles.metricAmount}>{totalCollected.toFixed(3)}</Text>
                    </View>
                    <View style={styles.goldBar} />
                </View>

                {/* Recent Transactions List */}
                <View style={styles.sectionWrapper}>
                    <Text style={styles.sectionTitle}>
                        Recent Invoices
                        <Text style={styles.sectionSubtitle}> (Latest 5)</Text>
                    </Text>
                    <TouchableOpacity onPress={() => navigateTo('history')} style={styles.viewAllButton}>
                        <Text style={styles.viewAllButtonText}>View All</Text>
                    </TouchableOpacity>
                </View>

                {invoices.slice(0, 5).map((invoice) => (
                    <InvoiceCard key={invoice.id} invoice={invoice} />
                ))}

            </ScrollView>
        </View>
    );
}
