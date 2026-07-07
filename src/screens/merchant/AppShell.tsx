import React, { useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { TTabType, TTheme } from '../../model';
import DashboardScreen from './dashboard/DashboardScreen';
import CreateInvoiceScreen from './create-invoice/CreateInvoiceScreen';
import TransactionHistoryScreen from './transaction-history/TransactionHistoryScreen';
import ProfileScreen from './profile/ProfileScreen';
import BottomTabs from '../../components/organisms/nav-bar/BottomTabs';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import QuickPayScreen from './quick-pay/QuickPayScreen';
import HalRegistryScreen from './hal-registry/HalRegistryScreen';

const Stack = createStackNavigator();
const navigationRef = createNavigationContainerRef<any>();

export default function AppShell() {
    const theme = useTheme();
    const styles = getAppShellStyles(theme);
    // const [activeTab, setActiveTab] = useState<TTabType>('home');
    // const navigation = useNavigation<any>();
    const [activeTab, setActiveTab] = useState<string>('home');

    const stateChange = (state: any) => {
        if (!state) return;
        // Grab the current active route name natively from the root state tree
        const currentRouteName = state.routes[state.index].name;
        setActiveTab(currentRouteName.toLowerCase());
    }

    return (
        <NavigationContainer ref={navigationRef} onStateChange={stateChange}>
            <View style={styles.rootContainer}>
                {/* Dynamic Content Window */}
                <View style={styles.viewPort}>
                    <Stack.Navigator
                        initialRouteName="home"
                        screenListeners={{
                            state: (e) => {
                                console.log(e)
                            }
                        }}
                        screenOptions={{
                            // headerShown: false,
                            headerBackgroundContainerStyle: { backgroundColor: theme.colors.background },
                            gestureEnabled: true,
                            detachPreviousScreen: false,
                            gestureDirection: 'horizontal',
                            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,


                        }} // Hides default header to match your original clean layout
                    >
                        <Stack.Screen name="home" component={DashboardScreen} options={{ header: () => false, animation: 'fade' }} />
                        <Stack.Screen name="create" component={CreateInvoiceScreen} options={{ title: 'Add Invoice', }} />
                        <Stack.Screen name="history" component={TransactionHistoryScreen} options={{ title: 'Transactions' }} />
                        <Stack.Screen name="profile" component={ProfileScreen} options={{ title: 'Account Setting' }} />
                        <Stack.Screen name="quick-pay" component={QuickPayScreen} options={{ title: 'Quick Pay' }} />
                        <Stack.Screen name="hal-registry" component={HalRegistryScreen} options={{ title: 'HAL Financing Hub' }} />
                    </Stack.Navigator>
                </View>

                {/* Persistent Bottom Controls matching image_6d3bdf.png */}
                <BottomTabs currentTab={activeTab as TTabType} />
            </View>
        </NavigationContainer>
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