import { StyleSheet } from "react-native";
import { useTheme } from "../../../hooks/useTheme";

export const useQuickLinksStyles = () => {
    const { colors, spacing, borderRadius } = useTheme();
    return StyleSheet.create({
        container: { flex: 1, backgroundColor: colors.background, marginBottom: spacing.md },
        metricsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.lg },
        metricCard: { 
            flex: 1, 
            backgroundColor: colors.surface, 
            padding: spacing.md, 
            borderRadius: borderRadius.lg, 
            marginRight: spacing.sm, 
            borderWidth: 1, 
            borderColor: colors.border, 
            alignItems: 'center', 
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 12
        },
        quickLinkRight: {},
        metricIcon: {color: colors.border },
        metricValue: { fontSize: 28, fontWeight: '700', color: colors.primary },
        matrixCardInner: {display: 'flex', flexDirection: 'column', columnGap: 8},
        metricLabel: { fontSize: 12, color: colors.textMuted, marginTop: 4 },
        sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: spacing.md, color: colors.textMain },
        menuButton: { flexDirection: 'row', backgroundColor: colors.surface, padding: spacing.md, borderRadius: borderRadius.lg, marginBottom: 12, borderWidth: 1, borderColor: colors.border, alignItems: 'center' },
        iconPlaceholder: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.secondary, justifyContent: 'center', alignItems: 'center', marginRight: spacing.md },
        menuTextContainer: { flex: 1 },
        menuTitle: { fontSize: spacing.md, fontWeight: '700', color: colors.textMain },
        menuDesc: { fontSize: 12, color: colors.textMuted, marginTop: 2 }
    });
}