import {
    Check,
    MapPin,
    Tag,
    Timer,
    Truck,
    X,
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
    useColorScheme,
    View
} from 'react-native';

interface OrderSuccessScreenProps {
  onClose?: () => void;
  onTrackOrder?: () => void;
  onContinueShopping?: () => void;
  onNeedHelp?: () => void;
  orderItems?: string[];
}

export default function OrderSuccessScreen({
  onClose,
  onTrackOrder,
  onContinueShopping,
  onNeedHelp,
  orderItems = []
}: OrderSuccessScreenProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const colors = {
    primary: '#2bee6c',
    backgroundLight: '#f6f8f6',
    backgroundDark: '#102216',
    textDark: '#111813',
    textLight: '#ffffff',
    borderLight: '#dbe6df',
    borderDark: 'rgba(255,255,255,0.1)',
    cardBgLight: '#ffffff',
    cardBgDark: 'rgba(255,255,255,0.05)',
  };

  const theme = {
    bg: isDark ? colors.backgroundDark : colors.backgroundLight,
    text: isDark ? colors.textLight : colors.textDark,
    textSecondary: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(17, 24, 19, 0.7)',
    textMuted: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(17, 24, 19, 0.6)',
    textMutedLight: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(17, 24, 19, 0.5)',
    cardBg: isDark ? colors.cardBgDark : colors.cardBgLight,
    border: isDark ? colors.borderDark : colors.borderLight,
    iconHover: isDark ? 'rgba(255,255,255,0.1)' : '#f3f4f6',
  };

  const defaultItems = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAG_rJx2g_7YPcenu9QvCj1Nh9N9D59paD13zxxLJp05uCnBseOCnqwyQfiokFO4eGI5LAlzbQSOmBaxdI_DmilXTSb2w6SxdtsjxmG69rqlOYUgfAvH4uWuZPGMLqKIoWOuregrIhortyhsRe5cnomfw0YAvgtYIkNStTlrnBGOZJrmtjhz-l7JEsLHdZ1KewFv-abNRrfKfZVVobSKUXQcoP6yempO5asVhq0mtivU891d9AM1mMiMMwrr7i7_xWzMmgaL3I9CT3y",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBUKjeTJ7YWzeak7CvdNaPExy89K037D8TRypGp630fpB8N5K-U3twceBFPsjXb0rWcc3No-vODIisEqgczhUKJrH4jw9bOoxOuYGfJdoQ-u43d_cDiK8Gu1JBmdGbQ-ovErJnvtAbV2EqBC22gWd8tDALYgb4f3t-_JKBLmj6BpplshblnckLJJDYuo3aiU-7GnR8TKX8k1WFPjcMci_g0Phc7o3nnHMviE-tU6iyuzRv2vRzMHmz7xUwMQLDxyOMtqquedGSxDBQM",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDcrf8qknGDFlhP5aeq4Skdl3fHSZrvGxvt2pAi5vzi2ys_g3HP65HiSPt9x3w8vfYI3ksNB_esNWZDUFM8wJAmjGuPjXzNT0NEVw2Fwi-C-hbeH_lBH7b2YcvUE-8B1yGhu7LpeGvE8iyHiJKrKmMmFIvRUFRom27g5yUqS5FxW6yV97XKR88s4Bsp217UtbIiLEmGmEfWEKtYaw1plwZZebuXWqcwifmq23ZtahXBZhwC-nDGA5oo5nmoCqOVFD0EWMb9g56JGEwX",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAevdYcSIeGxyXU8dR_T-qqquacgp8hxGIMY8C3qzRu67mRT-kKAJSfxIvAo2wdCxUusMGy-uPOdxOXAu0utk_uyJ_dv6-KDseYIES_Q_8dhgwxCm8NC352P5hySwNpeTQNrIcyWOrfQQJ4pHfjIV5ylnKmYSmX2MFlFhZ7GmmS_2-ZWIFv5wHJ3kkuWdUVSSrP0eJQZkyMncGLuOtcw40UEbRbixkpywN501hhDOhN8gz7mKb-AilfW3vaKCWRV7xkVC24G4Q38hFx"
  ];

  const items = orderItems.length > 0 ? orderItems : defaultItems;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar 
        barStyle={isDark ? 'light-content' : 'dark-content'} 
        backgroundColor={theme.bg} 
      />
      
      {/* Top Bar */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={[styles.closeButton, { backgroundColor: 'transparent' }]}
          onPress={onClose}
        >
          <X color={theme.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Confirmation</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={{ flex: 1 }}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Success Section */}
          <View style={styles.heroSection}>
            <View style={styles.heroIconWrapper}>
              {/* Glow Effect */}
              <View style={styles.glow} />
              <View style={styles.checkCircle}>
                <Check color="#102216" size={64} strokeWidth={3} />
              </View>
            </View>
            <Text style={[styles.heroTitle, { color: theme.text }]}>
              Order Placed Successfully!
            </Text>
            <Text style={[styles.heroSubtitle, { color: theme.textSecondary }]}>
              Thank you for your purchase. Your groceries are being picked and will be on the way soon.
            </Text>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <View style={[
              styles.statCard, 
              { backgroundColor: theme.cardBg, borderColor: theme.border }
            ]}>
              <View style={styles.statHeader}>
                <Tag color={colors.primary} size={20} />
                <Text style={[styles.statLabel, { color: theme.textMuted }]}>Order ID</Text>
              </View>
              <Text style={[styles.statValue, { color: theme.text }]}>#ORD-39201</Text>
            </View>
            <View style={[
              styles.statCard, 
              { backgroundColor: theme.cardBg, borderColor: theme.border }
            ]}>
              <View style={styles.statHeader}>
                <Timer color={colors.primary} size={20} />
                <Text style={[styles.statLabel, { color: theme.textMuted }]}>Est. Delivery</Text>
              </View>
              <Text style={[styles.statValue, { color: theme.text }]}>15 - 25 Mins</Text>
            </View>
          </View>

          {/* Items Preview */}
          <View style={styles.itemsSection}>
            <View style={styles.itemsHeader}>
              <Text style={[styles.itemsTitle, { color: theme.text }]}>Items Ordered</Text>
              <TouchableOpacity>
                <Text style={styles.viewReceipt}>View Receipt</Text>
              </TouchableOpacity>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.itemsList}
            >
              {items.map((url, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.itemImageContainer, 
                    { borderColor: theme.border, backgroundColor: theme.cardBg }
                  ]}
                >
                  <Image 
                    source={{ uri: url }} 
                    style={styles.itemImage} 
                    resizeMode="cover" 
                  />
                </View>
              ))}
              <View style={[
                styles.moreItemsContainer, 
                { 
                  borderColor: theme.border, 
                  backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f6f8f6' 
                }
              ]}>
                <Text style={[styles.moreItemsText, { color: theme.text }]}>+2</Text>
              </View>
            </ScrollView>
          </View>

          {/* Delivery Location Card */}
          <View style={[
            styles.locationCard, 
            { backgroundColor: theme.cardBg, borderColor: theme.border }
          ]}>
            <View style={[
              styles.locationIconContainer, 
              { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#f6f8f6' }
            ]}>
              <MapPin color={theme.text} size={24} />
            </View>
            <View style={styles.locationInfo}>
              <Text style={[styles.locationLabel, { color: theme.textMuted }]}>
                DELIVERING TO
              </Text>
              <Text 
                style={[styles.locationAddress, { color: theme.text }]} 
                numberOfLines={1}
              >
                Home • 428 Highland Ave, Apt 4B
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Actions */}
        <View style={[styles.footer, { backgroundColor: theme.bg }]}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.primaryButton} 
              activeOpacity={0.9}
              onPress={onTrackOrder}
            >
              <Truck color="#102216" size={24} style={{ marginRight: 8 }} />
              <Text style={styles.primaryButtonText}>Track Order</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.secondaryButton, { borderColor: theme.border }]} 
              activeOpacity={0.8}
              onPress={onContinueShopping}
            >
              <Text style={[styles.secondaryButtonText, { color: theme.text }]}>
                Continue Shopping
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.helpLink} onPress={onNeedHelp}>
            <Text style={[styles.helpLinkText, { color: theme.textMutedLight }]}>
              Need help with this order?
            </Text>
          </TouchableOpacity>
        </View>
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
    paddingVertical: 8,
    marginTop:40,
    paddingBottom:20,
  },
  closeButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
    marginRight: 48, // Balance the close button width
  },
  headerSpacer: {
    width: 0,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    alignItems: 'center',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
    width: '100%',
    maxWidth: 400,
  },
  heroIconWrapper: {
    position: 'relative',
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(43, 238, 108, 0.3)',
    transform: [{ scale: 1.1 }],
  },
  checkCircle: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: '#2bee6c',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2bee6c',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 38,
  },
  heroSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  statsGrid: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 400,
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  itemsSection: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 24,
  },
  itemsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  itemsTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  viewReceipt: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2bee6c',
  },
  itemsList: {
    gap: 12,
    paddingBottom: 8,
  },
  itemImageContainer: {
    width: 72,
    height: 72,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  moreItemsContainer: {
    width: 72,
    height: 72,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreItemsText: {
    fontSize: 14,
    fontWeight: '700',
  },
  locationCard: {
    width: '100%',
    maxWidth: 400,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  locationIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationInfo: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  locationAddress: {
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    padding: 16,
    paddingBottom:20,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    gap: 12,
    marginBottom: 16,
  },
  primaryButton: {
    height: 56,
    backgroundColor: '#2bee6c',
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2bee6c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#102216',
    fontSize: 18,
    fontWeight: '700',
  },
  secondaryButton: {
    height: 56,
    backgroundColor: 'transparent',
    borderRadius: 999,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
  },
  helpLink: {
    alignItems: 'center',
    marginBottom: 8,
  },
  helpLinkText: {
    fontSize: 14,
    fontWeight: '500',
  },
});