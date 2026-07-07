import { ArrowLeft } from "lucide-react-native"
import { Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useTheme } from "../../../hooks/useTheme"
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "../../../store/useAppStore";


export default function Header({title}: {title: string}) {
      const navigation = useNavigation<any>();
    const styles = useStyle();
    const { t, isRTL } = useTranslation();
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={()=>{navigation.navigate('home')}}>
                <ArrowLeft color={styles.backBtnText.color} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { textAlign: isRTL ? 'right' : 'left' }]}>{title}</Text>
            <View style={{ width: 50 }} />
        </View>
    )
}


const useStyle = () => {
    const { colors, spacing, borderRadius } = useTheme();
    return StyleSheet.create({
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
    backBtnText: { color: colors.textMain, fontSize: 16, fontWeight: '600' },
    headerTitle: { fontSize: 18, fontWeight: '700', color: colors.textMain }
    })
}