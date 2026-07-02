import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Platform } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { TTabType, TTheme } from '../../model';
import DashboardScreen from './dashboard/DashboardScreen';
import CreateInvoiceScreen from './create-invoice/CreateInvoiceScreen';
import TransactionHistoryScreen from './transaction-history/TransactionHistoryScreen';
import ProfileScreen from './profile/ProfileScreen';
import BottomTabs from '../../components/organisms/nav-bar/BottomTabs';

export default function AppShell() {
    const theme = useTheme();
    const styles = getAppShellStyles(theme);
    const [activeTab, setActiveTab] = useState<TTabType>('home');

    // Choose the viewport content dynamically based on current selected tab ID
    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return <DashboardScreen navigateTo={setActiveTab} />;
            case 'create':
                return <CreateInvoiceScreen onBack={() => setActiveTab('home')} />;
            case 'history':
                return <TransactionHistoryScreen onBack={() => setActiveTab('home')} />;
            case 'profile':
                return <ProfileScreen onBack={() => setActiveTab('home')} />;
            default:
                return <DashboardScreen navigateTo={setActiveTab} />;
        }
    };
    return (
        <View style={styles.rootContainer}>
            {/* Dynamic Content Window */}
            <View style={styles.viewPort}>
                {renderContent()}
            </View>

            {/* Persistent Bottom Controls matching image_6d3bdf.png */}
            <BottomTabs currentTab={activeTab} onTabSelect={setActiveTab} />
        </View>
    );
}

const getAppShellStyles = ({ colors, borderRadius }: TTheme) => {

    return StyleSheet.create({
        // If on web, this creates a soft backdrop; on mobile, it's transparent
        webOutsideBackground: {
            flex: 1,
            backgroundColor: Platform.OS === 'web' ? '#E5E9F0' : colors?.background,
            justifyContent: 'center',
            alignItems: 'center',
        },
        // Constrains width to look like a mobile device on web browsers
        appContainer: {
            flex: 1,
            width: Platform.OS === 'web' ? 420 : '100%',
            maxHeight: Platform.OS === 'web' ? 850 : '100%',
            backgroundColor: colors?.background,
            // Add modern phone styling shadows only on web view
            ...Platform.select({
                web: {
                    borderRadius: borderRadius?.lg,
                    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.08)',
                    overflow: 'hidden',
                },
            }),
        },
        rootContainer: {
            flex: 1,
            backgroundColor: colors?.background,
        },
        viewPort: {
            flex: 1,
            paddingBottom: 75, // Keeps scrolling views from hiding behind our bottom bar layout
        },
    });
}

export { AppShell };