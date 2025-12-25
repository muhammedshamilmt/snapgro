import {
    CheckCheck,
    CheckCircle,
    ChevronLeft,
    CreditCard,
    PartyPopper,
    Percent,
    Settings,
    ShoppingBag,
    Tag,
    Truck,
} from 'lucide-react-native';
import React from 'react';
import {
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

// --- Theme Configuration ---
const COLORS = {
  primary: '#2bee6c',
  primaryDark: '#25cf5e',
  backgroundLight: '#f6f8f6',
  backgroundDark: '#102216',
  surfaceLight: '#ffffff',
  surfaceDark: '#1a2c20',
  textLight: '#111813',
  textDark: '#ffffff',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  orange100: '#ffedd5',
  orange600: '#ea580c',
  orange900: '#7c2d12',
  blue50: '#eff6ff',
  blue600: '#2563eb',
  blue900: '#1e3a8a',
  purple50: '#faf5ff',
  purple600: '#9333ea',
  purple900: '#581c87',
};

interface NotificationsScreenProps {
  onBack?: () => void;
}

// --- Components ---
const FilterChip = ({ label, icon: Icon, active, isDark }) => {
  const bg = active
    ? isDark
      ? COLORS.primary
      : COLORS.textLight
    : isDark
    ? COLORS.surfaceDark
    : COLORS.surfaceLight;
  const borderColor = active
    ? 'transparent'
    : isDark
    ? COLORS.gray700
    : COLORS.gray200;
  const textColor = active
    ? isDark
      ? COLORS.textLight
      : COLORS.surfaceLight
    : isDark
    ? COLORS.gray200
    : COLORS.textLight;
  const iconColor = isDark ? COLORS.gray400 : COLORS.gray500;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.chip,
        { backgroundColor: bg, borderColor, borderWidth: active ? 0 : 1 },
      ]}
    >
      {Icon && <Icon size={18} color={iconColor} style={styles.chipIcon} />}
      <Text style={[styles.chipText, { color: textColor }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const SectionHeader = ({ title, isDark }) => (
  <Text
    style={[
      styles.sectionHeader,
      { color: isDark ? COLORS.gray200 : COLORS.textLight },
    ]}
  >
    {title}
  </Text>
);

const NotificationCard = ({
  isDark,
  unread,
  icon: Icon,
  iconBgColor,
  iconColor,
  title,
  description,
  time,
  actionButton,
  secondaryAction,
  opacity = 1,
}) => {
  const cardBg = isDark ? COLORS.surfaceDark : COLORS.surfaceLight;
  const borderColor = isDark ? 'rgba(31, 41, 55, 0.5)' : COLORS.gray100;
  const titleColor = isDark ? COLORS.textDark : COLORS.textLight;
  const descColor = isDark ? COLORS.gray400 : COLORS.gray500;
  const timeColor = isDark ? COLORS.gray500 : COLORS.gray400;

  return (
    <View style={[styles.cardWrapper, { opacity }]}>
      {unread && <View style={styles.unreadDot} />}
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.card,
          { backgroundColor: cardBg, borderColor },
        ]}
      >
        <View style={styles.cardContent}>
          <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
            <Icon size={20} color={iconColor} />
          </View>
          <View style={styles.textContainer}>
            <View style={styles.headerRow}>
              <Text style={[styles.cardTitle, { color: titleColor }]}>
                {title}
              </Text>
            </View>
            <Text style={[styles.cardDesc, { color: descColor }]}>
              {description}
            </Text>
            <View style={styles.footerRow}>
              <Text style={[styles.timeText, { color: timeColor }]}>{time}</Text>
              {secondaryAction && (
                <TouchableOpacity>
                  <Text
                    style={[
                      styles.secondaryActionText,
                      { color: isDark ? COLORS.gray200 : COLORS.gray600 },
                    ]}
                  >
                    {secondaryAction}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        {actionButton && (
          <View style={styles.actionArea}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>{actionButton}</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default function NotificationsScreen({ onBack }: NotificationsScreenProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const bgStyle = {
    backgroundColor: isDark ? COLORS.backgroundDark : COLORS.backgroundLight,
  };

  return (
    <SafeAreaView style={[styles.container, bgStyle]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? COLORS.backgroundDark : COLORS.backgroundLight}
      />

      {/* Header */}
      <View
        style={[
          styles.header,
          { borderBottomColor: isDark ? COLORS.gray800 : COLORS.gray100 },
        ]}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <ChevronLeft
              size={24}
              color={isDark ? COLORS.textDark : COLORS.textLight}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.headerTitle,
              { color: isDark ? COLORS.textDark : COLORS.textLight },
            ]}
          >
            Notifications
          </Text>
          <TouchableOpacity style={styles.iconButton}>
            <Settings
              size={24}
              color={isDark ? COLORS.textDark : COLORS.textLight}
            />
          </TouchableOpacity>
        </View>

        {/* Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsContainer}
        >
          <FilterChip label="All" active isDark={isDark} />
          <FilterChip label="Orders" icon={ShoppingBag} isDark={isDark} />
          <FilterChip label="Promos" icon={Tag} isDark={isDark} />
        </ScrollView>
      </View>

      {/* Mark as Read */}
      <View style={styles.markReadContainer}>
        <TouchableOpacity style={styles.markReadButton}>
          <CheckCheck
            size={16}
            color={isDark ? COLORS.gray400 : COLORS.gray500}
            style={{ marginRight: 4 }}
          />
          <Text
            style={[
              styles.markReadText,
              { color: isDark ? COLORS.gray400 : COLORS.gray500 },
            ]}
          >
            MARK ALL AS READ
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content Feed */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Today Section */}
        <View style={styles.section}>
          <SectionHeader title="Today" isDark={isDark} />

          {/* Item 1 */}
          <NotificationCard
            isDark={isDark}
            unread
            icon={Truck}
            iconBgColor={
              isDark
                ? 'rgba(43, 238, 108, 0.2)'
                : 'rgba(43, 238, 108, 0.2)'
            }
            iconColor={isDark ? COLORS.primary : '#166534'}
            title="Order #12345 is out for delivery!"
            description="Your driver is nearby. Get ready!"
            time="2 mins ago"
            actionButton="Track Order"
          />

          {/* Item 2 */}
          <NotificationCard
            isDark={isDark}
            unread
            icon={Percent}
            iconBgColor={
              isDark ? 'rgba(124, 45, 18, 0.3)' : COLORS.orange100
            }
            iconColor={isDark ? COLORS.orange600 : COLORS.orange600}
            title="Flash Sale Alert!"
            description="Fresh Avocados are 50% off for the next 4 hours."
            time="2 hours ago"
          />
        </View>

        {/* Yesterday Section */}
        <View style={styles.section}>
          <SectionHeader title="Yesterday" isDark={isDark} />

          {/* Item 3 */}
          <NotificationCard
            isDark={isDark}
            icon={CreditCard}
            iconBgColor={isDark ? 'rgba(30, 58, 138, 0.2)' : COLORS.blue50}
            iconColor={isDark ? COLORS.blue600 : COLORS.blue600}
            title="Payment Methods Updated"
            description="We've added Apple Pay support for faster checkout."
            time="Yesterday"
            opacity={0.8}
          />

          {/* Item 4 */}
          <NotificationCard
            isDark={isDark}
            icon={CheckCircle}
            iconBgColor={isDark ? COLORS.gray800 : COLORS.gray100}
            iconColor={isDark ? COLORS.gray400 : COLORS.gray600}
            title="Order #12340 Delivered"
            description="Ideally left at the front door as requested."
            time="Yesterday"
            secondaryAction="Rate Order"
            opacity={0.8}
          />
        </View>

        {/* Last Week Section */}
        <View style={styles.section}>
          <SectionHeader title="Last Week" isDark={isDark} />

          {/* Item 5 */}
          <NotificationCard
            isDark={isDark}
            icon={PartyPopper}
            iconBgColor={isDark ? 'rgba(88, 28, 135, 0.2)' : COLORS.purple50}
            iconColor={isDark ? COLORS.purple600 : COLORS.purple600}
            title="Welcome to Grocery+"
            description="Thanks for joining! Here is a tip to get started."
            time="5 days ago"
            opacity={0.6}
          />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.3,
    flex: 1,
    textAlign: 'center',
    marginRight: 40, // Balance the back button
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  chipsContainer: {
    paddingHorizontal: 16,
    paddingTop: 4,
    gap: 12,
  },
  chip: {
    flexDirection: 'row',
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 9999,
  },
  chipIcon: {
    marginRight: 8,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  markReadContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  markReadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  markReadText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  section: {
    marginBottom: 8,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    opacity: 0.7,
  },
  cardWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  unreadDot: {
    position: 'absolute',
    left: 8,
    top: '50%',
    marginTop: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    zIndex: 10,
  },
  card: {
    marginHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  textContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    width: '100%',
  },
  timeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  secondaryActionText: {
    fontSize: 14,
    fontWeight: '700',
  },
  actionArea: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
    paddingLeft: 56, // Align with text content (40px icon + 16px gap)
  },
  primaryButton: {
    height: 32,
    paddingHorizontal: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 84,
  },
  primaryButtonText: {
    color: '#102216',
    fontSize: 14,
    fontWeight: '700',
  },
});