import { ArrowLeft, RefreshCw, Search, Truck } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

// Theme Colors
const COLORS = {
  primary: '#2bee6c',
  backgroundLight: '#f6f8f6',
  backgroundDark: '#102216',
  cardDark: '#1a2c20',
  textDark: '#111813',
  textWhite: '#ffffff',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  blue50: '#eff6ff',
  blue700: '#1d4ed8',
  green800: '#166534',
};

interface OrdersScreenProps {
  onBack?: () => void;
  onTrackOrder?: (orderId: string) => void;
  onViewDetails?: (orderId: string) => void;
  onReorder?: (orderId: string) => void;
}

export default function OrdersScreen({
  onBack,
  onTrackOrder,
  onViewDetails,
  onReorder
}: OrdersScreenProps) {
  const [activeTab, setActiveTab] = useState('Active');

  const handleTrackOrder = (orderId: string) => {
    onTrackOrder?.(orderId);
  };

  const handleViewDetails = (orderId: string) => {
    onViewDetails?.(orderId);
  };

  const handleReorder = (orderId: string) => {
    onReorder?.(orderId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.backgroundLight} />
      
      {/* Top App Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={onBack}>
          <ArrowLeft color={COLORS.textDark} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Search color={COLORS.textDark} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Segmented Buttons */}
        <View style={styles.segmentedControlContainer}>
          <View style={styles.segmentedControl}>
            <TouchableOpacity
              style={[
                styles.segmentButton,
                activeTab === 'Active' && styles.segmentButtonActive,
              ]}
              onPress={() => setActiveTab('Active')}
            >
              <Text
                style={[
                  styles.segmentText,
                  activeTab === 'Active' ? styles.segmentTextActive : styles.segmentTextInactive,
                ]}
              >
                Active
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.segmentButton,
                activeTab === 'Past' && styles.segmentButtonActive,
              ]}
              onPress={() => setActiveTab('Past')}
            >
              <Text
                style={[
                  styles.segmentText,
                  activeTab === 'Past' ? styles.segmentTextActive : styles.segmentTextInactive,
                ]}
              >
                Past
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Orders List */}
        <View style={styles.listContainer}>
          {/* Item 1: Processing */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardInfoContainer}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{ 
                      uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDne_9NR_GaOX74kHi_hsnfZcwg1QsdHgh1bBKgJOp3EGGq2UMj7OI31xIcD1Nu8F-vnP5u3gzWuZi4jAZX1p2G_dNb-LskptzS5EmxOMWhCiBrDL080d2Aj6t6HB-uQs6hCZWB27SerWRdUNrBqZzJiKxCJ8D8mego5A3OEkHvzgE9ePybrCaj9vb4HNmwseQtip7jnp8GXkeNNq9tzvRkFGJKFB7_p-FZ52PWJyXt92UGgL0DK_pjb6iijJ3E8yVVY2CWnlu4NDD1' 
                    }}
                    style={styles.storeImage}
                  />
                  <View style={styles.iconBadge}>
                    <Truck color={COLORS.primary} size={16} fill={COLORS.primary} />
                  </View>
                </View>
                <View style={styles.textContainer}>
                  <View style={styles.titleRow}>
                    <Text style={styles.storeName}>Whole Foods Market</Text>
                    <View style={[styles.statusBadge, styles.statusProcessing]}>
                      <Text style={styles.statusTextProcessing}>Processing</Text>
                    </View>
                  </View>
                  <Text style={styles.metaText}>Today, 2:00 PM • #9921</Text>
                  <Text style={styles.itemsText} numberOfLines={1}>
                    Bananas, Almond Milk, Bread + 9 more
                  </Text>
                </View>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>$45.20</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.actionsContainer}>
              <TouchableOpacity 
                style={styles.buttonGhost}
                onPress={() => handleViewDetails('#9921')}
              >
                <Text style={styles.buttonGhostText}>View Details</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.buttonPrimary}
                onPress={() => handleTrackOrder('#9921')}
              >
                <Text style={styles.buttonPrimaryText}>Track Order</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Item 2: Delivered */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardInfoContainer}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{ 
                      uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9KLEyxO3jR0NZLAoVx3k0bbqEtYrlhpI8k2Et0s9ZTbpPVjbvOwY2Xhk_b1Wk63UqcI87cVQzhmPCS-BKywLDXdwi4Lbc26Vd1B5SJio8Hr5esg8NIGBb22RlvKYAOYTdrj1wUAC1z-vmqRTO6CPMEU7nabFVBZsI-McKVC4cGQhZ5-7DMvaNY0nERUahGPBZhpv_1PKESmsVenpGUw8xK42gcZRzes5CBcMMGDAcyrnZo5hFqlFM-0oyVOSU7uzyhoLYxzSNcTfw' 
                    }}
                    style={styles.storeImage}
                  />
                </View>
                <View style={styles.textContainer}>
                  <View style={styles.titleRow}>
                    <Text style={styles.storeName}>Trader Joe's</Text>
                    <View style={[styles.statusBadge, styles.statusDelivered]}>
                      <Text style={styles.statusTextDelivered}>Delivered</Text>
                    </View>
                  </View>
                  <Text style={styles.metaText}>Oct 24 • #8812</Text>
                  <Text style={styles.itemsText} numberOfLines={1}>
                    Avocados, Salsa, Chips, Lime + 1 more
                  </Text>
                </View>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>$12.50</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.actionsContainer}>
              <TouchableOpacity 
                style={styles.buttonGhost}
                onPress={() => handleViewDetails('#8812')}
              >
                <Text style={styles.buttonGhostText}>View Receipt</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.buttonSecondary}
                onPress={() => handleReorder('#8812')}
              >
                <RefreshCw size={14} color={COLORS.textDark} style={{ marginRight: 4 }} />
                <Text style={styles.buttonSecondaryText}>Re-order</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Item 3: Cancelled */}
          <View style={[styles.card, styles.cardOpacity]}>
            <View style={styles.cardHeader}>
              <View style={styles.cardInfoContainer}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{ 
                      uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_977Z9anAOwDwZep1BxjnExcermsAUeTN-7vlLt1JuWGw0tVLF7XvW0BzhRi1qYv2n-32Dqv_nFAle48fz6rRnKOQHN3Vt5gfNPQAims9HBGyE532_fKkOQ3iENM7aI0PwnofIHYcKq-LSdbouqdmRVGWNTSghAbM7cwcma-s4MYwCV0aPIQAs54FAbFVoz4P8MLFFhHrNs9yG2AfD8woDtqAW9tLo3QVX2N6u71Eyuak8EicrukjcWAHGRrU2ZIxbnJhrC9n9BpH' 
                    }}
                    style={[styles.storeImage, styles.grayscale]}
                  />
                </View>
                <View style={styles.textContainer}>
                  <View style={styles.titleRow}>
                    <Text style={[styles.storeName, styles.textGray600]}>Local Market</Text>
                    <View style={[styles.statusBadge, styles.statusCancelled]}>
                      <Text style={styles.statusTextCancelled}>Cancelled</Text>
                    </View>
                  </View>
                  <Text style={styles.metaText}>Oct 15 • #8800</Text>
                  <Text style={[styles.itemsText, styles.textGray600]} numberOfLines={1}>
                    Apples, Oranges, Carrots...
                  </Text>
                </View>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.priceTextCancelled}>$22.00</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.actionsContainer}>
              <TouchableOpacity 
                style={[styles.buttonGhost, styles.buttonBorder]}
                onPress={() => handleViewDetails('#8800')}
              >
                <Text style={styles.buttonGhostText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(246, 248, 246, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
    zIndex: 50,
    marginTop:40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
    textAlign: 'center',
    flex: 1,
  },
  iconButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  segmentedControlContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.backgroundLight,
  },
  segmentedControl: {
    flexDirection: 'row',
    height: 48,
    backgroundColor: '#e5e7eb80', // gray-200/50
    borderRadius: 12,
    padding: 4,
  },
  segmentButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  segmentButtonActive: {
    backgroundColor: COLORS.textWhite,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
  },
  segmentTextActive: {
    color: COLORS.textDark,
  },
  segmentTextInactive: {
    color: COLORS.gray500,
  },
  listContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  card: {
    backgroundColor: COLORS.textWhite,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  cardOpacity: {
    opacity: 0.9,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardInfoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    marginRight: 8,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  storeImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.gray100,
    backgroundColor: COLORS.gray100,
  },
  grayscale: {
    opacity: 0.5, // Simulating grayscale/inactive look
  },
  iconBadge: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    backgroundColor: COLORS.textWhite,
    borderRadius: 999,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  storeName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  textGray600: {
    color: COLORS.gray600,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    borderWidth: 1,
  },
  statusProcessing: {
    backgroundColor: COLORS.blue50,
    borderColor: 'rgba(37, 99, 235, 0.2)', // blue-600/20
  },
  statusTextProcessing: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.blue700,
  },
  statusDelivered: {
    backgroundColor: 'rgba(43, 238, 108, 0.2)', // primary/20
    borderColor: 'rgba(22, 163, 74, 0.2)', // green-600/20
  },
  statusTextDelivered: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.green800,
  },
  statusCancelled: {
    backgroundColor: COLORS.gray100,
    borderColor: 'rgba(107, 114, 128, 0.1)', // gray-500/10
  },
  statusTextCancelled: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.gray600,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.gray500,
  },
  itemsText: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.textDark,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  priceTextCancelled: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.gray400,
    textDecorationLine: 'line-through',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray100,
    width: '100%',
    marginVertical: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  buttonGhost: {
    height: 36,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonBorder: {
    borderWidth: 1,
    borderColor: COLORS.gray200,
    minWidth: 84,
  },
  buttonGhostText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.gray600,
  },
  buttonPrimary: {
    height: 36,
    minWidth: 100,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  buttonPrimaryText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#102216',
  },
  buttonSecondary: {
    height: 36,
    minWidth: 100,
    backgroundColor: COLORS.gray100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonSecondaryText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textDark,
  },
});