import { Platform, StatusBar, StyleSheet } from "react-native";
import { useTheme } from "../../../hooks/useTheme";


export const useTransactionHistoryStyles = () => {
    const { colors, spacing, borderRadius } = useTheme();
    return StyleSheet.create({
        container: { flex: 1, backgroundColor: colors.background },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: spacing.md,
            backgroundColor: colors.surface,
            borderBottomWidth: 1,
            borderColor: colors.border,
             // FIX: Add safe space for Android's Status Bar height
            // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + spacing.sm : spacing.md,
            paddingBottom: spacing.md,
            paddingHorizontal: spacing.md,
        },
        backBtnText: { color: colors.textMain, fontSize: 16, fontWeight: '600' },
        headerTitle: { fontSize: 18, fontWeight: '700', color: colors.textMain },
        searchSection: { padding: spacing.md },
        searchInput: {
            backgroundColor: colors.textBoxBg,
            padding: spacing.sm + 4,
            borderRadius: borderRadius.md,
            borderWidth: 1,
            borderColor: colors.border,
            fontSize: 15,
            color: colors.textMain
        },
        filterContainer: { flexDirection: 'row', paddingHorizontal: spacing.md, gap: 8, marginBottom: spacing.sm },
        filterChip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, backgroundColor: colors.primary, borderWidth: 1, borderColor: colors.border },
        activeFilterChip: { backgroundColor: colors.secondary },
        filterChipText: { fontSize: 13, color: colors.textSecondary, fontWeight: '500' },
        activeFilterChipText: { color: '#FFF', fontWeight: '600' },
        scrollContainer: { padding: spacing.md },
        invoiceCard: {
            backgroundColor: colors.surface,
            padding: spacing.md,
            borderRadius: borderRadius.md,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: spacing.sm,
            borderWidth: 1,
            borderColor: colors.border
        },
        customerName: { fontSize: 16, fontWeight: '600', color: colors.textMain },
        invoiceMeta: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
        descriptionText: { fontSize: 13, color: colors.textMuted, marginTop: 4, maxWidth: 200 },
        rightBlock: { alignItems: 'flex-end' },
        amountText: { fontSize: 15, fontWeight: '700', color: colors.primary, marginBottom: 4 },
        statusBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 4 },
        statusText: { fontSize: 14, fontWeight: '700' },
        emptyText: { textAlign: 'center', color: colors.textMuted, marginTop: 40, fontSize: 14 },
        detailValueWrap: {
            display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4
        },
        modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.6)', justifyContent: 'flex-end' },
        modalContent: {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: spacing.lg,
            borderBottomWidth: 0,
            backgroundColor: colors.background
        },
        modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
        modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 24 },
        dragIndicator: {
            width: 40,
            height: 5,
            backgroundColor: colors.border,
            borderRadius: 4,
            alignSelf: 'center',
            marginBottom: 16,
        },
        detailsContainer: {
            marginBottom: 24,
        },
        detailRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
        },
        detailLabel: {
            fontSize: 14,
            color: colors.primary,
        },
        detailValue: {
            fontSize: 14,
            fontWeight: '600',
            color: colors.textMain,
        },
        closeButton: {
            backgroundColor: colors.primary,
            padding: 14,
            borderRadius: borderRadius?.md || 12,
            alignItems: 'center',
        },
        closeButtonText: {
            fontSize: 16,
            fontWeight: '600',
            color: colors.textSecondary,
        },
    });
}