import { StyleSheet } from "react-native";
import { useTheme } from "../../../hooks/useTheme";

export const useInvoiceCardStyles = () => {
    const { colors, spacing, borderRadius } = useTheme();
    return StyleSheet.create({
        invoiceCard: {
            backgroundColor: colors.surface,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: spacing.sm,
            borderWidth: 1,
            borderColor: colors.border
        },
        invoiceLeft: { flex: 1 },
        customerName: { fontSize: 16, fontWeight: '600', color: colors.textMain },
        invoiceMeta: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
        invoiceRight: { alignItems: 'flex-end' },
        invoiceAmount: { fontSize: 15, fontWeight: '700', color: colors.textMain, marginBottom: 4, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 },
        statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
        statusText: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase' }
    });
}