import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useProfileStyles } from './styles';
import { useAppStore, useTranslation } from '../../../store/useAppStore';
import { ColorThemes } from '../../../constants/theme';
import { ArrowLeft } from 'lucide-react-native';

interface ProfileProps {
    onBack: () => void;
}

export default function ProfileScreen({ onBack }: ProfileProps) {
    const {logout, ...store} = useAppStore();
    const { t, isRTL } = useTranslation();

    // Local component form states
    const [email, setEmail] = useState(store.email);
    const [phone, setPhone] = useState(store.phone);

    const styles = useProfileStyles();

    const handleSaveProfile = () => {
        store.updateProfile(email, phone);
    };

    return (
        <View style={styles.container}>
            {/* Header View */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack}>
                    <ArrowLeft color={styles.backBtnText.color} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { textAlign: isRTL ? 'right' : 'left' }]}>{t('profile.title')}</Text>
                <View style={{ width: 50 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

                {/* Section 1: Business Identity Details */}
                <Text style={styles.sectionHeader}>{t('profile.merchantDetails')}</Text>
                <View style={styles.card}>
                    <Text style={[styles.label, { textAlign: isRTL ? 'right' : 'left' }]}>{t('profile.registeredUsername')}</Text>
                    <TextInput style={[styles.input, styles.disabledInput, {textAlign: isRTL ? 'right' : 'left' }]} value={store.username || 'Merchant'} editable={false} />

                    <Text style={[styles.label, { textAlign: isRTL ? 'right' : 'left' }]}>{t('profile.supportEmail')}</Text>
                    <TextInput style={[styles.input, {textAlign: isRTL ? 'right' : 'left' }]} value={email} onChangeText={setEmail} keyboardType="email-address" />

                    <Text style={[styles.label, { textAlign: isRTL ? 'right' : 'left' }]}>{t('profile.contactPhone')}</Text>
                    <TextInput style={[styles.input, {textAlign: isRTL ? 'right' : 'left' }]} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

                    <TouchableOpacity style={styles.saveBtn} onPress={handleSaveProfile}>
                        <Text style={styles.saveBtnText}>{t('profile.saveBtn')}</Text>
                    </TouchableOpacity>
                </View>

                {/* Section 2: Localization Preferences */}
                <Text style={styles.sectionHeader}>{t('profile.systemConfig')}</Text>
                <View style={styles.card}>
                    <Text style={[styles.label, { textAlign: isRTL ? 'right' : 'left' }]}>{t('profile.displayLanguage')}</Text>
                    <View style={styles.row}>
                        {(['en', 'ar'] as const).map((lang) => (
                            <TouchableOpacity
                                key={lang}
                                style={[styles.chip, store.language === lang && styles.activeChip]}
                                onPress={() => store.setLanguage(lang)}
                            >
                                <Text style={[styles.chipText, store.language === lang && styles.activeChipText]}>{lang==='en' ? 'English' : 'العربية'}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={[styles.label, { marginTop: 16, textAlign: isRTL ? 'right' : 'left' }]}>{t('profile.brandingColor')}</Text>
                    <View style={styles.row}>
                        {(Object.values(ColorThemes)).map((themeName) => (
                            <TouchableOpacity
                                key={themeName}
                                style={[styles.chip, store.activeTheme === themeName && styles.activeChip]}
                                onPress={() => store.setAppTheme(themeName)}
                            >
                                <Text style={[styles.chipText, store.activeTheme === themeName && styles.activeChipText]}>{themeName}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                 <TouchableOpacity style={{...styles.saveBtn,...styles.logoutBtnText}} onPress={logout}>
                        <Text style={[styles.saveBtnText, { textAlign: isRTL ? 'right' : 'left' }]}>{t('profile.logoutBtn')}</Text>
                    </TouchableOpacity>

            </ScrollView>
        </View>
    );
}

