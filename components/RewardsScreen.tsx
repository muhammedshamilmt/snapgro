import {
  Apple,
  ArrowLeft,
  BadgeCheck,
  History,
  Info,
  Leaf,
  ShoppingCart,
  Star,
  Ticket,
  Truck,
  UserPlus
} from 'lucide-react-native';
import React from 'react';
import {
  Dimensions,
  Image,
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

const COLORS = {
  light: {
    primary: '#2bee6c',
    background: '#f6f8f6',
    surface: '#ffffff',
    surfaceDark: '#1a2c20', // For hero card base in light mode
    textPrimary: '#111813',
    textSecondary: '#61896f',
    border: '#e5e7eb',
    cardBorder: '#f3f4f6',
    gray100: '#f3f4f6',
    orangeBg: '#fff7ed',
    orangeText: '#f97316',
    orangeBorder: '#ffedd5',
    blueBg: '#eff6ff',
    blueText: '#3b82f6',
    blueBorder: '#dbeafe',
    white: '#ffffff',
    black: '#000000',
  },
  dark: {
    primary: '#2bee6c',
    background: '#102216',
    surface: '#1a2c20',
    surfaceDark: '#1a2c20',
    textPrimary: '#e0e6e2',
    textSecondary: '#8fa898',
    border: '#374151',
    cardBorder: '#2a3c30',
    gray100: '#1f2937',
    orangeBg: 'rgba(124, 45, 18, 0.1)',
    orangeText: '#f97316',
    orangeBorder: 'rgba(124, 45, 18, 0.3)',
    blueBg: 'rgba(30, 58, 138, 0.1)',
    blueText: '#3b82f6',
    blueBorder: 'rgba(30, 58, 138, 0.3)',
    white: '#ffffff',
    black: '#000000',
  },
};

interface RewardsScreenProps {
  onBack?: () => void;
}

export default function RewardsScreen({ onBack }: RewardsScreenProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? COLORS.dark : COLORS.light;
  const styles = getStyles(theme, isDark);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />

      {/* Top App Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={onBack}>
          <ArrowLeft size={24} color={theme.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Rewards</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Info size={24} color={theme.textPrimary} />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Card */}
          <View style={styles.heroSection}>
            <View style={styles.heroCard}>
              {/* Decorative Shapes */}
              <View style={styles.heroShapeTop} />
              <View style={styles.heroShapeBottom} />
              <View style={styles.heroContent}>
                <View style={styles.heroHeader}>
                  <Star size={20} color={COLORS.light.primary} fill={COLORS.light.primary} />
                  <Text style={styles.heroLabel}>AVAILABLE BALANCE</Text>
                </View>
                <Text style={styles.heroPoints}>
                  2,450 <Text style={styles.heroPointsUnit}>pts</Text>
                </Text>
                <View style={styles.progressSection}>
                  <View style={styles.progressLabels}>
                    <Text style={styles.progressTextWhite}>Silver Member</Text>
                    <Text style={styles.progressTextPrimary}>150 pts to Gold</Text>
                  </View>
                  <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: '85%' }]} />
                  </View>
                  <Text style={styles.unlockText}>
                    Unlock free delivery on all orders with Gold status.
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Filter Chips */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipsContainer}
            style={styles.chipsScroll}
          >
            <TouchableOpacity style={styles.chipActive}>
              <BadgeCheck size={18} color={isDark ? theme.background : theme.white} />
              <Text style={styles.chipTextActive}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.chip}>
              <Ticket size={18} color={theme.textPrimary} />
              <Text style={styles.chipText}>Coupons</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.chip}>
              <Apple size={18} color={theme.textPrimary} />
              <Text style={styles.chipText}>Free Items</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.chip}>
              <Truck size={18} color={theme.textPrimary} />
              <Text style={styles.chipText}>Delivery</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Redeem Rewards Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Redeem Rewards</Text>
              <TouchableOpacity>
                <Text style={styles.linkText}>See all</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cardsGrid}>
              {/* Card 1 */}
              <TouchableOpacity style={styles.rewardCard}>
                <View style={styles.rewardImageContainer}>
                  <Image
                    source={{
                      uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCC7GIY3A4B9d1DbQyGgl8llHqU_3fYN_L0LdYw5ejNCVX4aN6Ri4JYNxy86G9Vb9NE3FE4jR79H2tt5ga_EkYbmrLOFmjB9LkV63zKdE2ilcn0H3bJSuuooA_fazGViFGBxn3HN0HATkmxUxuv4bzJ_5153xV-0DW_u5vLdjtoTQjwor2J6A5mullmtM7CiEyB_ebKVWQB-mXWZuE7DHN0kQA93jFBPkjzKtPyYxh1lN3JvhN5xahiMpoQ0IZPRwMIcVM4imj5TvMj',
                    }}
                    style={styles.rewardImage}
                  />
                </View>
                <View style={styles.rewardContent}>
                  <View>
                    <Text style={styles.rewardTitle} numberOfLines={1}>
                      $5 Off Your Next Order
                    </Text>
                    <Text style={styles.rewardDesc} numberOfLines={2}>
                      Valid on any purchase over $25. Fresh produce included.
                    </Text>
                  </View>
                  <View style={styles.rewardFooter}>
                    <Text style={styles.pointsCost}>500 pts</Text>
                    <TouchableOpacity style={styles.redeemButton}>
                      <Text style={styles.redeemButtonText}>Redeem</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Card 2 */}
              <TouchableOpacity style={styles.rewardCard}>
                <View style={styles.rewardImageContainer}>
                  <View style={styles.rewardIconPlaceholder}>
                    <Truck size={36} color={COLORS.light.primary} />
                  </View>
                </View>
                <View style={styles.rewardContent}>
                  <View>
                    <Text style={styles.rewardTitle} numberOfLines={1}>
                      Free Delivery
                    </Text>
                    <Text style={styles.rewardDesc} numberOfLines={2}>
                      Get free delivery on your next grocery run. No minimum.
                    </Text>
                  </View>
                  <View style={styles.rewardFooter}>
                    <Text style={styles.pointsCost}>800 pts</Text>
                    <TouchableOpacity style={styles.redeemButton}>
                      <Text style={styles.redeemButtonText}>Redeem</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Card 3 */}
              <TouchableOpacity style={styles.rewardCard}>
                <View style={styles.rewardImageContainer}>
                  <Image
                    source={{
                      uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7YLJhRoQUlnoZaQZ0w7Hh1JnXvQmOp6th-DLS9CTX20oQN324L48268wPqWj-T6yA-tX1eqaEdYsWoJXu6EW2iXF6ydeuizIHXgPmutfaVQ4xFC84uWZrxYwG2UaB_2FJbhWwqwuRG4UlJaWdGO9s6HTJkbbXDi7mf3SoWq8LFmb4U8EfJl_TdRnZjSIVCqe6p6wZM_Q-NxUyouCj106bkytEh7MDq5OoGE-J-ZzHI7r6UgAKwpIIle4bCGn2grHM23m-OdyDOSI4',
                    }}
                    style={styles.rewardImage}
                  />
                </View>
                <View style={styles.rewardContent}>
                  <View>
                    <Text style={styles.rewardTitle} numberOfLines={1}>
                      Free Avocados (3 Pack)
                    </Text>
                    <Text style={styles.rewardDesc} numberOfLines={2}>
                      Add a 3-pack of ripe Hass avocados to your cart for free.
                    </Text>
                  </View>
                  <View style={styles.rewardFooter}>
                    <Text style={styles.pointsCost}>300 pts</Text>
                    <View style={styles.lockedButton}>
                      <Text style={styles.lockedButtonText}>Locked</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* How to Earn Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { paddingHorizontal: 4, marginBottom: 16 }]}>
              How to Earn Points
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.earnContainer}
            >
              {/* Earn Card 1 */}
              <View style={styles.earnCardPrimary}>
                <View style={styles.earnIconContainer}>
                  <ShoppingCart size={24} color={COLORS.light.primary} />
                </View>
                <Text style={styles.earnTitle}>Shop Groceries</Text>
                <Text style={styles.earnDesc}>10 pts for every $1 spent</Text>
              </View>

              {/* Earn Card 2 */}
              <View style={styles.earnCardOrange}>
                <View style={styles.earnIconContainer}>
                  <Leaf size={24} color={COLORS.light.orangeText} />
                </View>
                <Text style={styles.earnTitle}>Buy Organic</Text>
                <Text style={styles.earnDesc}>2x pts on all organic items</Text>
              </View>

              {/* Earn Card 3 */}
              <View style={styles.earnCardBlue}>
                <View style={styles.earnIconContainer}>
                  <UserPlus size={24} color={COLORS.light.blueText} />
                </View>
                <Text style={styles.earnTitle}>Refer a Friend</Text>
                <Text style={styles.earnDesc}>500 pts for each referral</Text>
              </View>
            </ScrollView>
          </View>

          {/* History Link */}
          <View style={styles.historyContainer}>
            <TouchableOpacity style={styles.historyButton}>
              <History size={20} color={theme.textSecondary} />
              <Text style={styles.historyText}>View Redemption History</Text>
            </TouchableOpacity>
          </View>

          {/* Spacer for Bottom Nav */}
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>

      
    </SafeAreaView>
  );
}

const getStyles = (theme, isDark) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginTop:40,
      backgroundColor: isDark ? 'rgba(16, 34, 22, 0.95)' : 'rgba(246, 248, 246, 0.95)',
      zIndex: 10,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.textPrimary,
      flex: 1,
      textAlign: 'center',
    },
    iconButton: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      backgroundColor: 'transparent',
    },
    mainContainer: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: 16,
      paddingBottom: 24,
    },
    // Hero Section
    heroSection: {
      marginTop: 8,
      marginBottom: 24,
    },
    heroCard: {
      backgroundColor: '#15261A', // Dark green gradient approximation
      borderRadius: 12,
      padding: 24,
      overflow: 'hidden',
      position: 'relative',
      shadowColor: COLORS.light.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
    heroShapeTop: {
      position: 'absolute',
      top: -40,
      right: -40,
      width: 160,
      height: 160,
      borderRadius: 80,
      backgroundColor: 'rgba(43, 238, 108, 0.2)',
    },
    heroShapeBottom: {
      position: 'absolute',
      bottom: -40,
      left: -40,
      width: 128,
      height: 128,
      borderRadius: 64,
      backgroundColor: 'rgba(43, 238, 108, 0.1)',
    },
    heroContent: {
      zIndex: 10,
    },
    heroHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
      opacity: 0.9,
      gap: 8,
    },
    heroLabel: {
      color: '#ffffff',
      fontSize: 14,
      fontWeight: '500',
      letterSpacing: 0.5,
      textTransform: 'uppercase',
    },
    heroPoints: {
      fontSize: 36,
      fontWeight: '700',
      color: '#ffffff',
      letterSpacing: -0.5,
    },
    heroPointsUnit: {
      fontSize: 18,
      fontWeight: '500',
      opacity: 0.8,
    },
    progressSection: {
      marginTop: 24,
    },
    progressLabels: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginBottom: 8,
    },
    progressTextWhite: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: 14,
      fontWeight: '500',
    },
    progressTextPrimary: {
      color: COLORS.light.primary,
      fontSize: 12,
      fontWeight: '500',
    },
    progressBarBg: {
      height: 8,
      width: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: 999,
      overflow: 'hidden',
    },
    progressBarFill: {
      height: '100%',
      backgroundColor: COLORS.light.primary,
      borderRadius: 999,
    },
    unlockText: {
      marginTop: 8,
      fontSize: 12,
      color: 'rgba(255, 255, 255, 0.6)',
    },
    // Chips
    chipsScroll: {
      marginBottom: 24,
      flexGrow: 0,
    },
    chipsContainer: {
      gap: 12,
      paddingBottom: 4, // for shadow visibility
    },
    chipActive: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 36,
      paddingHorizontal: 16,
      backgroundColor: isDark ? theme.white : theme.textPrimary,
      borderRadius: 999,
      gap: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    chipTextActive: {
      color: isDark ? theme.background : theme.white,
      fontSize: 14,
      fontWeight: '700',
    },
    chip: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 36,
      paddingHorizontal: 16,
      backgroundColor: theme.surface,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: isDark ? theme.border : '#e5e7eb',
      gap: 8,
    },
    chipText: {
      color: theme.textPrimary,
      fontSize: 14,
      fontWeight: '500',
    },
    // Rewards Section
    section: {
      marginBottom: 32,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.textPrimary,
    },
    linkText: {
      fontSize: 14,
      fontWeight: '500',
      color: COLORS.light.primary,
    },
    cardsGrid: {
      gap: 16,
    },
    rewardCard: {
      flexDirection: 'row',
      backgroundColor: theme.surface,
      borderRadius: 12,
      padding: 12,
      gap: 16,
      borderWidth: 1,
      borderColor: isDark ? theme.border : '#f3f4f6',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    rewardImageContainer: {
      width: 96,
      height: 96,
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: isDark ? '#1f2937' : '#f3f4f6',
    },
    rewardImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    rewardIconPlaceholder: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(43, 238, 108, 0.2)',
    },
    rewardContent: {
      flex: 1,
      justifyContent: 'space-between',
      paddingVertical: 4,
    },
    rewardTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.textPrimary,
      marginBottom: 4,
    },
    rewardDesc: {
      fontSize: 12,
      color: theme.textSecondary,
      lineHeight: 16,
    },
    rewardFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 12,
    },
    pointsCost: {
      fontSize: 14,
      fontWeight: '700',
      color: isDark ? COLORS.light.primary : '#102216',
    },
    redeemButton: {
      backgroundColor: COLORS.light.primary,
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
    redeemButtonText: {
      fontSize: 12,
      fontWeight: '700',
      color: '#102216',
    },
    lockedButton: {
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: isDark ? theme.border : '#e5e7eb',
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 8,
      opacity: 0.6,
    },
    lockedButtonText: {
      fontSize: 12,
      fontWeight: '700',
      color: theme.textSecondary,
    },
    // Earn Section
    earnContainer: {
      gap: 16,
      paddingRight: 16,
    },
    earnCardPrimary: {
      minWidth: 160,
      backgroundColor: isDark ? 'rgba(43, 238, 108, 0.05)' : 'rgba(43, 238, 108, 0.1)',
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'rgba(43, 238, 108, 0.2)',
    },
    earnCardOrange: {
      minWidth: 160,
      backgroundColor: theme.orangeBg,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.orangeBorder,
    },
    earnCardBlue: {
      minWidth: 160,
      backgroundColor: theme.blueBg,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.blueBorder,
    },
    earnIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: isDark ? theme.background : theme.white,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    earnTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.textPrimary,
      marginBottom: 4,
      textAlign: 'center',
    },
    earnDesc: {
      fontSize: 12,
      color: theme.textSecondary,
      textAlign: 'center',
    },
    // History Link
    historyContainer: {
      alignItems: 'center',
      paddingBottom: 24,
    },
    historyButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingVertical: 8,
    },
    historyText: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.textSecondary,
    },
    // Bottom Nav
    bottomNav: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.surface,
      borderTopWidth: 1,
      borderTopColor: isDark ? theme.border : '#f3f4f6',
      paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    },
    tabBar: {
      flexDirection: 'row',
      height: 64,
      alignItems: 'center',
    },
    tabItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
    },
    tabLabel: {
      fontSize: 10,
      fontWeight: '500',
      color: theme.textSecondary,
    },
    tabLabelActive: {
      fontSize: 10,
      fontWeight: '500',
      color: COLORS.light.primary,
    },
    fabContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: '100%',
    },
    fab: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: COLORS.light.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: -24,
      shadowColor: COLORS.light.primary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.4,
      shadowRadius: 12,
      elevation: 8,
    },
  });