import { Platform, StatusBar, StyleSheet } from "react-native";
import { useTheme } from "../../../hooks/useTheme";

export const useDashboardStyles = () => {
    const { colors, spacing, borderRadius } = useTheme();
    return StyleSheet.create({
        container: { flex: 1, backgroundColor: colors.background },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: colors.surface,
            borderBottomWidth: 1,
            borderColor: colors.border,
            // FIX: Add safe space for Android's Status Bar height
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + spacing.sm : spacing.md,
            paddingBottom: spacing.md,
            paddingHorizontal: spacing.md,
        },
        userIcon: { 
            color: colors.textMain, 
            borderWidth: 2,  borderColor: colors.textMain, 
            borderRadius: borderRadius.round, 
            height: 32, width: 32, 
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            textAlign: 'center', textAlignVertical: 'center',
            padding: 5

         },
         brandWrapper: {borderRadius: borderRadius.md, backgroundColor: colors.primary, paddingHorizontal: spacing.md, paddingVertical: spacing.xs},
         brandName: {fontSize:18, fontWeight: '500', color: colors.textSecondary},
        welcomeText: { fontSize: 14, color: colors.textMuted },
        usernameText: { fontSize: 16, fontWeight: '700', color: colors.textMain },
        logoutBtn: { padding: spacing.sm },
        logoutBtnText: { color: colors.error, fontWeight: '600', fontSize: 14 },
        scrollBody: { padding: spacing.lg },
        metricCard: {
            backgroundColor: colors.primary,
            borderRadius: borderRadius.lg,
            padding: spacing.xl,
            marginBottom: spacing.lg,
            position: 'relative',
            overflow: 'hidden'
        },
        metricLabel: { color: colors.textSecondary, fontSize: 14, fontWeight: '500', marginBottom: spacing.xs },
        metricValue: { flexDirection: 'row', alignItems: 'center', display: 'flex', gap: 8 },
        metricAmount: { color: colors.textSecondary, fontSize: 32, fontWeight: '800', },
        currency: { fontSize: 16, fontWeight: '400' },
        goldBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, backgroundColor: colors.secondary },
        actionButton: {
            backgroundColor: colors.surface,
            borderColor: colors.primary,
            borderWidth: 1.5,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            alignItems: 'center',
            marginBottom: spacing.xl
        },
        actionButtonText: { color: colors.primary, fontWeight: '700', fontSize: 16 },
        sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.textMain, },
        buttonWrapper: { flexDirection: 'row', gap: 12, marginBottom: spacing.lg },
        sectionSubtitle: { fontSize: 12, color: colors.textMuted, fontWeight: '500' },
        sectionWrapper: { marginBottom: 12, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
        viewAllButton: { alignSelf: 'flex-end', fontWeight: '600', fontSize: 14, borderRadius: borderRadius.round, padding: spacing.sm, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
        viewAllButtonText: { color: colors.textMain, fontWeight: '600', fontSize: 12 }
    })
};