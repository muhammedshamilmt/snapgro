import {
  Briefcase,
  CheckCircle,
  ChevronLeft,
  Dumbbell,
  Heart,
  Home,
  MapPin,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

interface DeliveryAddressesScreenProps {
  onBack?: () => void;
  onAddNewAddress?: () => void;
}

export default function DeliveryAddressesScreen({ onBack, onAddNewAddress }: DeliveryAddressesScreenProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const theme = {
    bg: isDark ? '#102216' : '#f6f8f6',
    surface: isDark ? '#18281e' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#111813',
    textSecondary: isDark ? '#9ca3af' : '#61896f',
    primary: '#2bee6c',
    border: isDark ? '#4b5563' : '#d1d5db',
    iconBg: isDark ? 'rgba(255,255,255,0.1)' : '#f0f4f2',
    headerBg: isDark ? 'rgba(16, 34, 22, 0.95)' : 'rgba(246, 248, 246, 0.95)',
    badgeBg: 'rgba(43, 238, 108, 0.2)',
    badgeText: isDark ? '#2bee6c' : '#166534',
  };

  const savedAddresses = [
    {
      id: 'work',
      label: 'Work',
      address: '500 Enterprise Way, Suite 200, San Francisco',
      icon: Briefcase,
    },
    {
      id: 'mom',
      label: "Mom's House",
      address: '45 Maple Drive, Suburban Town, NJ',
      icon: Heart,
    },
    {
      id: 'gym',
      label: 'The Gym',
      address: '88 Iron Street, Broklyn, NY',
      icon: Dumbbell,
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.bg}
      />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.headerBg }]}>
        <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7} onPress={onBack}>
          <ChevronLeft size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Delivery Addresses
        </Text>
        <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
          <Text style={[styles.editBtnText, { color: isDark ? theme.primary : '#61896f' }]}>
            Edit
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Default Address Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Default Address</Text>
          <View
            style={[
              styles.defaultCard,
              {
                backgroundColor: theme.surface,
                borderColor: theme.primary,
                shadowColor: '#000',
              },
            ]}
          >
            <ImageBackground
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCb-I9tixcCvIKt90NI6xdXj7f7OF0nJnlaoLYq_qmf9f_riF4RFhhWo40pti-8Hzoo2qwAB9cFRc4hOLB6pYEO4S0VyviNKPkJ1r13qwxbdOspSwMAtOM3_vk-hoPm4ShmdJJiULWK7QcWGYi7wvrd_5k6nkNjhN3wlvgpwgEi8Yl601Zv0tqcLrntusVg4FdubDWpR6oVt5TqaR7y7mtSColq5Ixlv01JmtbC2mVirHmcwj74sh5b1FszGsFsrgmDkMdNg3TS51m_',
              }}
              style={styles.mapImage}
              imageStyle={styles.mapImageRadius}
            >
              <View
                style={[
                  styles.mapOverlay,
                  {
                    backgroundColor: isDark
                      ? 'rgba(24, 40, 30, 0.3)'
                      : 'rgba(255,255,255,0.1)',
                  },
                ]}
              />
            </ImageBackground>
            <View style={styles.cardContent}>
              <View style={styles.cardRow}>
                <View style={styles.cardLeft}>
                  <View style={[styles.iconBox, { backgroundColor: theme.iconBg }]}>
                    <Home
                      size={24}
                      color={isDark ? theme.primary : '#111813'}
                      fill={isDark ? theme.primary : '#111813'}
                    />
                  </View>
                  <View style={styles.addressInfo}>
                    <View style={styles.labelRow}>
                      <Text style={[styles.addressLabel, { color: theme.text }]}>Home</Text>
                      <View style={[styles.badge, { backgroundColor: theme.badgeBg }]}>
                        <Text style={[styles.badgeText, { color: theme.badgeText }]}>
                          Default
                        </Text>
                      </View>
                    </View>
                    <Text
                      numberOfLines={2}
                      style={[styles.addressText, { color: theme.textSecondary }]}
                    >
                      123 Green Street, Apt 4B, New York, NY 10001
                    </Text>
                  </View>
                </View>
                <View style={styles.checkIcon}>
                  <CheckCircle size={24} color={theme.primary} fill={theme.primary} />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Saved Addresses Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Saved Addresses</Text>
          <View style={styles.listContainer}>
            {savedAddresses.map((item) => {
              const isSelected = selectedId === item.id;
              const IconComponent = item.icon;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.savedCard,
                    { backgroundColor: theme.surface },
                    isSelected && { borderColor: theme.primary, borderWidth: 1 },
                  ]}
                  onPress={() => setSelectedId(item.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.cardLeft}>
                    <View style={[styles.iconBox, { backgroundColor: theme.iconBg }]}>
                      <IconComponent size={24} color={isDark ? '#d1d5db' : '#111813'} />
                    </View>
                    <View style={styles.addressInfo}>
                      <Text style={[styles.addressLabel, { color: theme.text }]}>
                        {item.label}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={[styles.addressText, { color: theme.textSecondary }]}
                      >
                        {item.address}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.radioContainer}>
                    <View style={[styles.radioOuter, { borderColor: isDark ? '#4b5563' : '#d1d5db' }]}>
                      {isSelected && (
                        <View style={[styles.radioInner, { backgroundColor: theme.primary }]} />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Button */}
      <View style={[styles.bottomContainer, { backgroundColor: theme.bg }]}>
        <TouchableOpacity
          style={[styles.addButton, { shadowColor: theme.primary }]}
          activeOpacity={0.9}
          onPress={onAddNewAddress}
        >
          <MapPin size={20} color="#102216" style={{ marginRight: 8 }} />
          <Text style={styles.addButtonText}>Add New Address</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop:40,
    zIndex: 20,
  },
  headerBtn: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
    letterSpacing: -0.2,
  },
  editBtnText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    paddingHorizontal: 4,
    letterSpacing: -0.2,
  },
  defaultCard: {
    borderRadius: 12,
    borderWidth: 2,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  mapImage: {
    width: '100%',
    height: 112,
  },
  mapImageRadius: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  mapOverlay: {
    flex: 1,
  },
  cardContent: {
    padding: 16,
    paddingTop: 16,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    marginRight: 16,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  addressInfo: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 2,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  addressText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  checkIcon: {
    paddingTop: 8,
  },
  listContainer: {
    gap: 12,
  },
  savedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  radioContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: Platform.OS === 'ios' ? 32 : 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 10,

  },
  addButton: {
    backgroundColor: '#2bee6c',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonText: {
    color: '#102216',
    fontSize: 16,
    fontWeight: '700',
  },
});