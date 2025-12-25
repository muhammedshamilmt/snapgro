import {
    ChevronLeft,
    CreditCard,
    FileText,
    HelpCircle,
    Mail,
    MessageCircle,
    Phone,
    Search,
    ShoppingCart,
    Truck,
    User
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
  blue50: '#eff6ff',
  blue600: '#2563eb',
  purple50: '#faf5ff',
  purple600: '#9333ea',
};

interface HelpScreenProps {
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

const HelpCard = ({
  isDark,
  icon: Icon,
  iconBgColor,
  iconColor,
  title,
  description,
  actionButton,
  onPress,
}) => {
  const cardBg = isDark ? COLORS.surfaceDark : COLORS.surfaceLight;
  const borderColor = isDark ? 'rgba(31, 41, 55, 0.5)' : COLORS.gray100;
  const titleColor = isDark ? COLORS.textDark : COLORS.textLight;
  const descColor = isDark ? COLORS.gray400 : COLORS.gray500;

  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.card,
          { backgroundColor: cardBg, borderColor },
        ]}
        onPress={onPress}
      >
        <View style={styles.cardContent}>
          <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
            <Icon size={20} color={iconColor} />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.cardTitle, { color: titleColor }]}>
              {title}
            </Text>
            <Text style={[styles.cardDesc, { color: descColor }]}>
              {description}
            </Text>
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

const ContactCard = ({
  isDark,
  icon: Icon,
  iconBgColor,
  iconColor,
  title,
  subtitle,
  onPress,
}) => {
  const cardBg = isDark ? COLORS.surfaceDark : COLORS.surfaceLight;
  const borderColor = isDark ? 'rgba(31, 41, 55, 0.5)' : COLORS.gray100;
  const titleColor = isDark ? COLORS.textDark : COLORS.textLight;
  const subtitleColor = isDark ? COLORS.gray400 : COLORS.gray500;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.contactCard,
        { backgroundColor: cardBg, borderColor },
      ]}
      onPress={onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
        <Icon size={20} color={iconColor} />
      </View>
      <View style={styles.contactTextContainer}>
        <Text style={[styles.contactTitle, { color: titleColor }]}>
          {title}
        </Text>
        <Text style={[styles.contactSubtitle, { color: subtitleColor }]}>
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function HelpScreen({ onBack }: HelpScreenProps) {
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
            Help & Support
          </Text>
          <TouchableOpacity style={styles.iconButton}>
            <Search
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
          <FilterChip label="Orders" icon={ShoppingCart} isDark={isDark} />
          <FilterChip label="Account" icon={User} isDark={isDark} />
          <FilterChip label="Payment" icon={CreditCard} isDark={isDark} />
        </ScrollView>
      </View>

      {/* Content Feed */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Contact Us Section */}
        <View style={styles.section}>
          <SectionHeader title="Contact Us" isDark={isDark} />
          
          <View style={styles.contactGrid}>
            <ContactCard
              isDark={isDark}
              icon={MessageCircle}
              iconBgColor={isDark ? 'rgba(43, 238, 108, 0.2)' : 'rgba(43, 238, 108, 0.2)'}
              iconColor={isDark ? COLORS.primary : '#166534'}
              title="Live Chat"
              subtitle="Available 24/7"
              onPress={() => console.log('Live chat pressed')}
            />
            
            <ContactCard
              isDark={isDark}
              icon={Phone}
              iconBgColor={isDark ? 'rgba(30, 58, 138, 0.2)' : COLORS.blue50}
              iconColor={isDark ? COLORS.blue600 : COLORS.blue600}
              title="Call Us"
              subtitle="1-800-GROCERY"
              onPress={() => console.log('Call pressed')}
            />
            
            <ContactCard
              isDark={isDark}
              icon={Mail}
              iconBgColor={isDark ? 'rgba(124, 45, 18, 0.3)' : COLORS.orange100}
              iconColor={isDark ? COLORS.orange600 : COLORS.orange600}
              title="Email"
              subtitle="support@grocery.com"
              onPress={() => console.log('Email pressed')}
            />
          </View>
        </View>

        {/* Frequently Asked Questions */}
        <View style={styles.section}>
          <SectionHeader title="Frequently Asked Questions" isDark={isDark} />

          <HelpCard
            isDark={isDark}
            icon={ShoppingCart}
            iconBgColor={isDark ? 'rgba(43, 238, 108, 0.2)' : 'rgba(43, 238, 108, 0.2)'}
            iconColor={isDark ? COLORS.primary : '#166534'}
            title="How do I track my order?"
            description="Learn how to track your order status and delivery updates in real-time."
            actionButton="View Guide"
            onPress={() => console.log('Track order help pressed')}
          />

          <HelpCard
            isDark={isDark}
            icon={CreditCard}
            iconBgColor={isDark ? 'rgba(30, 58, 138, 0.2)' : COLORS.blue50}
            iconColor={isDark ? COLORS.blue600 : COLORS.blue600}
            title="Payment & Billing Issues"
            description="Get help with payment methods, billing questions, and refunds."
            actionButton="Get Help"
            onPress={() => console.log('Payment help pressed')}
          />

          <HelpCard
            isDark={isDark}
            icon={Truck}
            iconBgColor={isDark ? 'rgba(124, 45, 18, 0.3)' : COLORS.orange100}
            iconColor={isDark ? COLORS.orange600 : COLORS.orange600}
            title="Delivery Information"
            description="Find out about delivery times, areas, and special instructions."
            actionButton="Learn More"
            onPress={() => console.log('Delivery help pressed')}
          />

          <HelpCard
            isDark={isDark}
            icon={User}
            iconBgColor={isDark ? 'rgba(88, 28, 135, 0.2)' : COLORS.purple50}
            iconColor={isDark ? COLORS.purple600 : COLORS.purple600}
            title="Account Management"
            description="Manage your profile, preferences, and account settings."
            actionButton="Manage"
            onPress={() => console.log('Account help pressed')}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <SectionHeader title="Quick Actions" isDark={isDark} />

          <HelpCard
            isDark={isDark}
            icon={FileText}
            iconBgColor={isDark ? COLORS.gray800 : COLORS.gray100}
            iconColor={isDark ? COLORS.gray400 : COLORS.gray600}
            title="Terms & Conditions"
            description="Read our terms of service and privacy policy."
            onPress={() => console.log('Terms pressed')}
          />

          <HelpCard
            isDark={isDark}
            icon={HelpCircle}
            iconBgColor={isDark ? COLORS.gray800 : COLORS.gray100}
            iconColor={isDark ? COLORS.gray400 : COLORS.gray600}
            title="Report a Problem"
            description="Let us know about any issues you're experiencing."
            actionButton="Report"
            onPress={() => console.log('Report problem pressed')}
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
    padding:10,
  },
  header: {
    borderBottomWidth: 1,
    paddingBottom: 16,
    marginTop:40,
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
  scrollContent: {
    paddingBottom: 32,
  },
  section: {
    marginBottom: 24,
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
    marginBottom: 12,
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
  contactGrid: {
    gap: 12,
    paddingHorizontal: 8,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 16,
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
  contactTextContainer: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  contactSubtitle: {
    fontSize: 14,
    fontWeight: '500',
  },
});