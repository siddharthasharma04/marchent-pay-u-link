import { Platform, StatusBar, StyleSheet } from "react-native";
import { useTheme } from "../../../hooks/useTheme";

export const useCreateInvoiceStyles = () => {
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
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + spacing.sm : spacing.md,
            paddingBottom: spacing.md,
            paddingHorizontal: spacing.md,
        },
        backBtnText: { color: colors.textMain, fontSize: 16, fontWeight: '500' },
        headerTitle: { fontSize: 18, fontWeight: '700', color: colors.textMain },
        scrollContainer: { padding: spacing.md, paddingBottom: 100 },
        label: { fontSize: 14, fontWeight: '600', color: colors.textMain, marginBottom: 6, marginTop: 12 },
        input: {
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderRadius: borderRadius.md,
            padding: spacing.sm + 4,
            fontSize: 15,
            color: colors.textMain
        },
        errorText: { color: colors.error, fontSize: 12, marginTop: 4, fontWeight: '500' },

        // Items List section
        itemRow: {
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            marginBottom: spacing.sm,
            position: 'relative'
        },
        deleteItemBtn: { position: 'absolute', top: 12, right: 12 },
        itemInlineGrid: { flexDirection: 'row', gap: 12, marginTop: spacing.sm },
        gridCol: { flex: 1 },

        // Add Item Controls
        addItemContainer: {
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: colors.primary,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            alignItems: 'center',
            marginTop: spacing.md,
            backgroundColor: colors.surface
        },
        addItemText: { color: colors.primary, fontWeight: '600', marginLeft: 6 },

        // Totals Layer
        totalCard: {
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: borderRadius.lg,
            padding: spacing.md,
            marginVertical: spacing.lg
        },
        totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
        totalLabel: { fontSize: 14, color: colors.textMuted },
        totalVal: { fontSize: 15, fontWeight: '600', color: colors.textMain },
        grandTotalLabel: { fontSize: 16, fontWeight: '700', color: colors.textMain },
        grandTotalVal: { fontSize: 20, fontWeight: '800', color: colors.primary },

        // Form CTA
        submitBtn: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: spacing.md,
            borderRadius: borderRadius.md,
            marginTop: spacing.sm
        },
        submitBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700', marginLeft: 8 },

        // Modal Sheet layout
        modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.6)', justifyContent: 'flex-end' },
        modalContent: {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: spacing.lg,
            borderWidth: 1,
            borderBottomWidth: 0
        },
        modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
        modalTitle: { fontSize: 18, fontWeight: '700' },
        linkBox: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: borderRadius.md,
            padding: spacing.sm,
            marginVertical: spacing.md
        },
        linkInput: { flex: 1, fontSize: 14, paddingRight: 8 },
        modalCta: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: spacing.md,
            borderRadius: borderRadius.md,
            marginVertical: 6,
            borderWidth: 1
        },
        modalCtaText: { fontWeight: '700', fontSize: 15, marginLeft: 8 },
        nativePickerWrapper: {
            borderWidth: 1,
            borderRadius: borderRadius.md,
            marginTop: 4,
            overflow: 'hidden', // Ensures the native selection block respects your border radius boundaries
            justifyContent: 'center',
            height: 48 // Standard input row height matching your text entries
        }
    });
};

// Dropdown unique picker parameters object layout mapping styles
export const usePickerSelectStyles = () => {
    const { colors } = useTheme();
    return ({
        inputIOS: { fontSize: 15, paddingVertical: 12, paddingHorizontal: 10, borderWidth: 1, borderColor: colors.border, borderRadius: 8, color: colors.textMain, backgroundColor: colors.surface, paddingRight: 30 },
        inputAndroid: { fontSize: 15, paddingHorizontal: 10, paddingVertical: 8, borderWidth: 1, borderColor: colors.border, borderRadius: 8, color: colors.textMain, backgroundColor: colors.surface, paddingRight: 30 }
    })
};