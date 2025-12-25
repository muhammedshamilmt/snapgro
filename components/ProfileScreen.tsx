import {
  Bell,
  Camera,
  ChevronRight,
  CircleHelp,
  CreditCard,
  Leaf,
  LogOut,
  MapPin,
  Package,
  User,
} from 'lucide-react-native';
import React from 'react';
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
import BottomNavigation from './BottomNavigation';

// Color Palette
const COLORS = {
  primary: '#2bee6c',
  primaryDark: '#078829',
  backgroundLight: '#f6f8f6',
  backgroundDark: '#102216',
  surfaceLight: '#ffffff',
  surfaceDark: '#1a3826',
  textMain: '#0d1b12',
  textMuted: '#4c9a66',
  white: '#ffffff',
  gray100: '#f3f4f6',
  gray400: '#9ca3af',
  red100: '#fee2e2',
  red500: '#ef4444',
  red600: '#dc2626',
};

// Mock Data
const USER_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuAogb-4vI9qCuVglIDZeifmXVCkSnErvnVKiK_RIhdf-2fHaVzvHFtke-6Xdn1-LgrMA_j9YHmdkGfYDvj2yEEno7fEm8zUbEXqWrcwRcTF6WgYzVfPVrGdSiSNsulblyVuXEdraSzpVVXpGb46tpxgscOSalCWMpr_7caMjO-AL9fYNVr3rWR2pu7nyaXGA56Oaqhijqqaq0WdnvEX7By8Xdozw6petT1gnLDMGilpsN4g8wGTS-YXnicBwZIXAzNYSuZ-GLiBR4hl";

interface ProfileScreenProps {
  onNavigate?: (screen: string) => void;
  onEditProfile?: () => void;
  onLogout?: () => void;
  onNavigateToOrders?: () => void;
  onNavigateToPaymentMethods?: () => void;
  onNavigateToDeliveryAddresses?: () => void;
  onNavigateToPersonalDetails?: () => void;
  onNavigateToNotifications?: () => void;
  onNavigateToHelp?: () => void;
  onNavigateToRewards?: () => void;
  cartCount?: number;
}

export default function ProfileScreen({ 
  onNavigate, 
  onEditProfile, 
  onLogout,
  onNavigateToOrders,
  onNavigateToPaymentMethods,
  onNavigateToDeliveryAddresses,
  onNavigateToPersonalDetails,
  onNavigateToNotifications,
  onNavigateToHelp,
  onNavigateToRewards,
  cartCount = 0 
}: ProfileScreenProps) {
  // Theme configuration (Defaulting to Light Mode as per HTML class)
  const isDark = false;
  const bg = isDark ? COLORS.backgroundDark : COLORS.backgroundLight;
  const surface = isDark ? COLORS.surfaceDark : COLORS.surfaceLight;
  const textMain = isDark ? COLORS.white : COLORS.textMain;
  const textMuted = isDark ? COLORS.textMuted : COLORS.textMuted;

  const handleTabPress = (tab: string) => {
    if (tab === 'home') {
      onNavigate?.('home');
    } else if (tab === 'browse') {
      onNavigate?.('categories');
    } else if (tab === 'cart') {
      onNavigate?.('cart');
    } else if (tab === 'ai-chef') {
      onNavigate?.('ai-chef');
    }
    // Profile tab is already active, no navigation needed
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={bg} />
      
      {/* Top App Bar */}
      <View style={[styles.topBar, { backgroundColor: bg }]}>
        <View style={styles.topBarSpacer} />
        <Text style={[styles.topBarTitle, { color: textMain }]}>My Profile</Text>
        <TouchableOpacity style={styles.editButton} onPress={onEditProfile}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: USER_IMAGE }} style={styles.avatar} />
            <View style={styles.cameraButton}>
              <Camera size={18} color={COLORS.backgroundDark} />
            </View>
          </View>
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: textMain }]}>Jane Doe</Text>
            <Text style={styles.userJoined}>Fresh Member since 2021</Text>
          </View>
        </View>

        {/* Loyalty Card */}
        <View style={styles.sectionPadding}>
          <View style={[styles.loyaltyCard, { backgroundColor: surface }]}>
            {/* Decorative Blobs */}
            <View style={styles.blob1} />
            <View style={styles.blob2} />
            <View style={styles.loyaltyContent}>
              <View style={styles.loyaltyHeader}>
                <View>
                  <Text style={styles.loyaltyLabel}>LOYALTY STATUS</Text>
                  <Text style={[styles.loyaltyTier, { color: textMain }]}>Silver Tier</Text>
                </View>
                <View style={styles.loyaltyIconContainer}>
                  <Leaf size={28} color={COLORS.primaryDark} fill={COLORS.primaryDark} />
                </View>
              </View>
              <View style={styles.pointsContainer}>
                <View style={styles.pointsRow}>
                  <Text style={[styles.pointsText, { color: textMain }]}>450 Points</Text>
                  <Text style={styles.pointsSubtext}>50 pts to $5 off</Text>
                </View>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: '90%' }]} />
                </View>
              </View>
              <TouchableOpacity style={styles.rewardsButton} onPress={onNavigateToRewards}>
                <Text style={styles.rewardsButtonText}>View Rewards</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Account & Orders */}
        <View style={styles.menuGroup}>
          <Text style={[styles.menuGroupTitle, { color: textMain }]}>Account & Orders</Text>
          <View style={[styles.menuList, { backgroundColor: surface }]}>
            <MenuItem 
              icon={<Package size={20} color={COLORS.primaryDark} />}
              title="My Orders"
              subtitle="1 Active Order"
              badge="1"
              isLast={false}
              textMain={textMain}
              onPress={onNavigateToOrders}
            />
            <MenuItem 
              icon={<CreditCard size={20} color={COLORS.primaryDark} />}
              title="Payment Methods"
              subtitle="Visa ending in 4242"
              isLast={true}
              textMain={textMain}
              onPress={onNavigateToPaymentMethods}
            />
          </View>
        </View>

        {/* Settings */}
        <View style={styles.menuGroup}>
          <Text style={[styles.menuGroupTitle, { color: textMain }]}>Settings</Text>
          <View style={[styles.menuList, { backgroundColor: surface }]}>
            <MenuItem 
              icon={<MapPin size={20} color={COLORS.primaryDark} />}
              title="Delivery Addresses"
              subtitle="Home: 123 Apple St."
              isLast={false}
              textMain={textMain}
              onPress={onNavigateToDeliveryAddresses}
            />
            <MenuItem 
              icon={<User size={20} color={COLORS.primaryDark} />}
              title="Personal Details"
              subtitle="jane.doe@email.com"
              isLast={false}
              textMain={textMain}
              onPress={onNavigateToPersonalDetails}
            />
            <MenuItem 
              icon={<Bell size={20} color={COLORS.primaryDark} />}
              title="Notifications"
              isLast={true}
              textMain={textMain}
              onPress={onNavigateToNotifications}
            />
          </View>
        </View>

        {/* Help & Logout */}
        <View style={styles.footerActions}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: surface }]} onPress={onNavigateToHelp}>
            <CircleHelp size={20} color={COLORS.gray400} />
            <Text style={[styles.actionButtonText, { color: textMain }]}>Help & Support</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.logoutButton, { backgroundColor: surface }]}
            onPress={onLogout}
          >
            <LogOut size={20} color={COLORS.red600} />
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
          <Text style={styles.versionText}>Version 1.0.2</Text>
        </View>

        {/* Spacer for Bottom Nav */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab="profile"
        onTabPress={handleTabPress}
        cartCount={cartCount}
      />
    </SafeAreaView>
  );
}

// Helper Components
const MenuItem = ({ 
  icon, 
  title, 
  subtitle, 
  badge, 
  isLast, 
  textMain,
  onPress 
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  badge?: string;
  isLast: boolean;
  textMain: string;
  onPress?: () => void;
}) => (
  <TouchableOpacity 
    style={[styles.menuItem, !isLast && styles.menuItemBorder]}
    onPress={onPress}
  >
    <View style={styles.menuItemLeft}>
      <View style={styles.menuIconContainer}>
        {icon}
      </View>
      <View style={styles.menuTextContainer}>
        <Text style={[styles.menuTitle, { color: textMain }]} numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text style={styles.menuSubtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
    </View>
    <View style={styles.menuItemRight}>
      {badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
      <ChevronRight size={20} color={COLORS.gray400} />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  // Top Bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop:40,
    zIndex: 10,
  },
  topBarSpacer: {
    width: 48,
  },
  topBarTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
  },
  editButton: {
    width: 48,
    alignItems: 'flex-end',
  },
  editButtonText: {
    color: COLORS.primaryDark,
    fontSize: 16,
    fontWeight: '700',
  },
  // Profile Header
  profileHeader: {
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: COLORS.white,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: COLORS.primary,
    padding: 6,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  userJoined: {
    color: COLORS.textMuted,
    fontSize: 14,
    fontWeight: '500',
  },
  // Loyalty Card
  sectionPadding: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    width: '100%',
  },
  loyaltyCard: {
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  blob1: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: COLORS.primary,
    opacity: 0.1,
  },
  blob2: {
    position: 'absolute',
    bottom: -32,
    left: -32,
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.primary,
    opacity: 0.2,
  },
  loyaltyContent: {
    padding: 20,
    zIndex: 1,
  },
  loyaltyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  loyaltyLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  loyaltyTier: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 4,
  },
  loyaltyIconContainer: {
    backgroundColor: 'rgba(43, 238, 108, 0.2)',
    padding: 8,
    borderRadius: 8,
  },
  pointsContainer: {
    marginTop: 8,
    gap: 8,
  },
  pointsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  pointsText: {
    fontSize: 16,
    fontWeight: '600',
  },
  pointsSubtext: {
    color: COLORS.textMuted,
    fontSize: 12,
  },
  progressBarBg: {
    width: '100%',
    height: 10,
    backgroundColor: COLORS.gray100,
    borderRadius: 5,
  },
  progressBarFill: {
    height: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  rewardsButton: {
    marginTop: 16,
    backgroundColor: COLORS.primary,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rewardsButtonText: {
    color: COLORS.backgroundDark,
    fontSize: 14,
    fontWeight: '700',
  },
  // Menu Groups
  menuGroup: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },
  menuGroupTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  menuList: {
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(43, 238, 108, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  menuSubtitle: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.red500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '700',
  },
  // Footer Actions
  footerActions: {
    padding: 16,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.red100,
    marginTop: 8,
  },
  logoutButtonText: {
    color: COLORS.red600,
    fontSize: 16,
    fontWeight: '500',
  },
  versionText: {
    textAlign: 'center',
    color: COLORS.gray400,
    fontSize: 12,
    marginTop: 16,
  },
});