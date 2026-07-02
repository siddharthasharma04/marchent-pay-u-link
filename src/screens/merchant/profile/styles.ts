import { Platform, StatusBar, StyleSheet } from "react-native";
import { useTheme } from "../../../hooks/useTheme";

export const useProfileStyles = () => {
    const { colors, spacing, borderRadius } = useTheme();
    return (
        StyleSheet.create({
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
            backBtnText: { color: colors.textMain},
            headerTitle: { fontSize: 18, fontWeight: '700', color: colors.textMain },
            scrollContainer: { padding: spacing.md },
            sectionHeader: { fontSize: 14, fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase', marginBottom: 8, marginTop: 12, paddingLeft: 4 },
            card: { backgroundColor: colors.surface, padding: 16, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, marginBottom: 20 },
            label: { fontSize: 13, fontWeight: '600', color: colors.textMain, marginBottom: 6 },
            input: { backgroundColor: colors.textBoxBg, borderWidth: 1, borderColor: colors.border, borderRadius: 6, padding: 12, marginBottom: 14, fontSize: 15, color: colors.textMain },
            disabledInput: { backgroundColor: colors.surface, color: '#64748B' },
            saveBtn: { backgroundColor: colors.primary, borderWidth: 1, borderColor: colors.textSecondary, padding: 12, borderRadius: 6, alignItems: 'center', marginTop: 4 },
            saveBtnText: { color: colors.textSecondary, fontWeight: '700', fontSize: 14 },
            row: { flexDirection: 'row', gap: 10 },
            chip: { flex: 1, paddingVertical: 10, borderRadius: 6, backgroundColor: colors.primary, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
            activeChip: { backgroundColor: colors.secondary, borderColor: colors.primary },
            chipText: { fontSize: 14, fontWeight: '500', color: colors.textSecondary },
            activeChipText: { color: colors.surface, fontWeight: '700' },
            logoutBtnText: { backgroundColor: colors.error, fontWeight: '600', fontSize: 14 },
        })
    )
}