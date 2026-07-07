import { Platform, StatusBar, StyleSheet } from "react-native";
import { useTheme } from "../../../hooks/useTheme";

export const useHALStyles = () => {
    const { colors, spacing, borderRadius } = useTheme();

    return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, padding: 16 },
    title: { fontSize: 22, fontWeight: '800', color: colors.textMain },
    subtitle: { fontSize: 13, color: colors.textMuted, marginBottom: 20 },
    loanCard: { backgroundColor: colors.surface, padding: 16, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#EAE5DB' },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    loanId: { fontWeight: '700', color: colors.primary, fontSize: 15 },
    badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    cardAmount: { fontSize: 20, fontWeight: '800', color: colors.textMain, marginVertical: 6 },
    cardTenure: { fontSize: 12, color: colors.textMuted },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: colors.surface, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24 },
    modalTitle: { fontSize: 18, fontWeight: '800', color: colors.textMain, marginBottom: 12 },
    divider: { height: 1, backgroundColor: colors.border, marginBottom: 16 },
    detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
    detailLabel: { color: colors.textMuted, fontSize: 14 },
    detailVal: { fontWeight: '600', color: colors.textMuted, fontSize: 14 },
    closeBtn: { backgroundColor: colors.primary, padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 16 },
    closeBtnText: { color: colors.surface, fontWeight: '700' }
});
}