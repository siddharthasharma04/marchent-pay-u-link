import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAppStore } from '../../../store/useAppStore';
import { useQuickLinksStyles } from './styles';
import { Building, ChevronRight, File, FileDiff, Link, LucideArrowRight, Zap } from 'lucide-react-native';

export default function QuickLinks({ navigateTo }: { navigateTo: any }) {
  const { username, invoices, quickPayLinks } = useAppStore();
  const styles = useQuickLinksStyles();

  return (
    <ScrollView style={styles.container}>

      {/* Metrics Section */}
      <View style={styles.metricsRow}>
        <View style={styles.metricCard}>
          <Text><FileDiff color={styles.metricIcon.color} size={40} /></Text>
          <View style={styles.matrixCardInner}>
            <Text style={styles.metricLabel}>Total Invoices</Text>
            <Text style={styles.metricValue}>{invoices.length}</Text>
          </View>
        </View>
        <View style={styles.metricCard}>
          <Text><Link color={styles.metricIcon.color} size={40} /></Text>
          <View style={styles.matrixCardInner}>
            <Text style={styles.metricLabel}>Active Links</Text>
            <Text style={styles.metricValue}>{quickPayLinks.length}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <View>
        {/* Quick Pay Navigation */}
        <TouchableOpacity style={styles.menuButton} onPress={() => navigateTo('quick-pay')}>
          <View style={styles.iconPlaceholder}>
            <Text style={{ color: '#FFF' }}><Zap size={20} /></Text>
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Quick Pay</Text>
            <Text style={styles.menuDesc}>Instant transaction generation links with discounts</Text>
          </View>
          <View style={styles.quickLinkRight}>
            <Text><ChevronRight size={20} /></Text>
          </View>
        </TouchableOpacity>

        {/* Invoice Pay Navigation */}
        <TouchableOpacity style={styles.menuButton} onPress={() => navigateTo('create')}>
          <View style={[styles.iconPlaceholder, { backgroundColor: '#9C6740' }]}>
            <Text style={{ color: '#FFF' }}><FileDiff size={20} /></Text>
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Invoice Pay</Text>
            <Text style={styles.menuDesc}>View, handle, and append structural commercial invoices</Text>
          </View>
          <View style={styles.quickLinkRight}>
            <Text><ChevronRight size={20} /></Text>
          </View>
        </TouchableOpacity>

        {/* HAL Registry Navigation */}
        <TouchableOpacity style={styles.menuButton} onPress={() => navigateTo('hal-registry')}>
          <View style={[styles.iconPlaceholder, { backgroundColor: '#2EBD59' }]}>
            <Text style={{ color: '#FFF' }}><Building size={20} /></Text>
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>HAL Registry</Text>
            <Text style={styles.menuDesc}>Track commercial lending profiles and tenure status</Text>
          </View>
          <View style={styles.quickLinkRight}>
            <Text><ChevronRight size={20} /></Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
