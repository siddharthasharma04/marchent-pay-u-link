import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Home, PlusCircle, ClipboardList, User, Zap } from 'lucide-react-native';
import { useTheme } from '../../../hooks/useTheme';
import { TTabType } from '../../../model';
import { useNavigation } from '@react-navigation/native';



interface BottomTabsProps {
  currentTab: TTabType;
  onTabSelect?: (tab: TTabType) => void;
}

export default function BottomTabs({currentTab}: BottomTabsProps) {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  const tabs = [
    { id: 'home' as TTabType, label: 'Home', Icon: Home },
    { id: 'quick-pay' as TTabType, label: 'Quick Pay', Icon: Zap },
    { id: 'create' as TTabType, label: 'Add Invoice', Icon: PlusCircle },
    { id: 'history' as TTabType, label: 'Transactions', Icon: ClipboardList },
    { id: 'profile' as TTabType, label: 'Profile', Icon: User },
  ];

  return (
    <View style={[styles.tabBarContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        const activeColor = colors.textMain;
        const inactiveColor = colors.textMuted;
        const IconComponent = tab.Icon;

        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabButton}
            onPress={() => navigation.navigate(tab.id)}
            activeOpacity={0.7}
          >
            <IconComponent 
              color={isActive ? activeColor : inactiveColor} 
              size={22} 
              strokeWidth={isActive ? 2.5 : 1.8}
            />
            <Text style={[
              styles.tabLabel, 
              { color: isActive ? activeColor : inactiveColor, fontWeight: isActive ? '700' : '500' }
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    height: 75,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderBottomWidth: 0,
    paddingBottom: 12,
    paddingTop: 10,
    // Soft shadow mimicking image_6d3bdf.png
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
  },
});