import {
    BadgeCheck,
    Check,
    ChevronLeft,
    ChevronUp,
    Headphones,
    Home,
    MessageCircle,
    MoreHorizontal,
    Phone,
    Star,
    Truck,
} from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

// Colors from Tailwind Config & Defaults
const COLORS = {
  primary: '#2bee6c',
  backgroundLight: '#f6f8f6',
  surfaceLight: '#ffffff',
  gray900: '#111827',
  gray800: '#1f2937',
  gray500: '#6b7280',
  gray400: '#9ca3af',
  gray200: '#e5e7eb',
  gray100: '#f3f4f6',
  yellow500: '#eab308',
  blackAlpha5: 'rgba(0,0,0,0.05)',
  whiteAlpha90: 'rgba(255,255,255,0.9)',
};

// Animation Components
const PulsingDot = () => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(anim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [anim]);

  const scale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2.5],
  });

  const opacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.75, 0],
  });

  return (
    <View style={styles.pulsingDotContainer}>
      <Animated.View
        style={[
          styles.pulsingDotRing,
          {
            transform: [{ scale }],
            opacity,
          },
        ]}
      />
      <View style={styles.pulsingDotCore} />
    </View>
  );
};

const PulsingRing = ({ children }: { children: React.ReactNode }) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [anim]);

  const opacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 0.6],
  });

  return (
    <View style={styles.pulsingRingWrapper}>
      <Animated.View
        style={[
          styles.pulsingRingBackground,
          { opacity },
        ]}
      />
      {children}
    </View>
  );
};

interface TrackOrderScreenProps {
  onBack?: () => void;
  onChatDriver?: () => void;
  onCallDriver?: () => void;
  onNeedHelp?: () => void;
  orderId?: string;
}

export default function TrackOrderScreen({
  onBack,
  onChatDriver,
  onCallDriver,
  onNeedHelp,
  orderId = '#29301'
}: TrackOrderScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.backgroundLight} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={onBack}>
          <ChevronLeft color={COLORS.gray900} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Order {orderId}</Text>
        <TouchableOpacity style={styles.iconButton}>
          <MoreHorizontal color={COLORS.gray900} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Map Section */}
        <View style={styles.mapContainer}>
          <Image
            source={{ 
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8BqrCMcMSmGZmDCItPlqACCE5zhArlBcZ3p_UI9-sfzm3ZNIQq8OmW3H9PO9z59X5Rus6r_O1sqZZduluZn-0re83Wyyeuwgpc68x2G9JEZ5RDGOXM_6IHtCwDqMIDowqGsHHU50nQB0ypfsFlVB9vlFyiIEVhU0TMhq6knP3PwigQejlMTo73SAT8oPNo9R4FJbt02BoAnvfUC31agVvW7TGB9Ot9tQhvBMF--EN7dot12USA4DXyGSPRZ1pEzU_MjTYboU6lkzA" 
            }}
            style={styles.mapImage}
            resizeMode="cover"
          />
          <View style={styles.liveTrackingBadge}>
            <PulsingDot />
            <Text style={styles.liveTrackingText}>Live Tracking</Text>
          </View>
        </View>

        {/* ETA Headline */}
        <View style={styles.etaContainer}>
          <Text style={styles.etaTitle}>Arriving in 15 mins</Text>
          <Text style={styles.etaSubtitle}>Estimated 10:15 AM - 10:30 AM</Text>
        </View>

        {/* Driver Card */}
        <View style={styles.card}>
          <View style={styles.driverRow}>
            <View style={styles.driverInfo}>
              <View style={styles.avatarContainer}>
                <Image
                  source={{ 
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuChCumIUi98-3DKRr9-xFVk8-hWOn3eFTHqGaVH7xgaM3szaf3HxGvVKRxF17ir6DvrKb6u4WiDDsZyIdLmSr4CkrjkS2h3TDgT0ZjBkwn3T-GNCUy-FiWbLfvM_3g_9jXhYRclsZndEyNnlcwzPcj1Qw_M1S5BnuFOzOFRAWRPoEJmCGaOFzXbNYaXETRNmOeo4Db4ATSmtfeuAft4LxSv83hl0xbSFaa78qbhlWqlpMAfMxIV9vK6cwNGJAWk_f2KCDdQnWgRPT6B" 
                  }}
                  style={styles.avatar}
                />
                <View style={styles.verifiedBadge}>
                  <BadgeCheck size={14} color={COLORS.primary} fill={COLORS.surfaceLight} />
                </View>
              </View>
              <View>
                <Text style={styles.driverName}>Michael</Text>
                <View style={styles.ratingContainer}>
                  <Star size={14} color={COLORS.yellow500} fill={COLORS.yellow500} />
                  <Text style={styles.ratingText}>4.9 • Toyota Prius</Text>
                </View>
              </View>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.chatButton} onPress={onChatDriver}>
                <MessageCircle size={20} color={COLORS.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.callButton} onPress={onCallDriver}>
                <Phone size={20} color={COLORS.gray900} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Timeline */}
        <View style={styles.timelineContainer}>
          <Text style={styles.sectionTitle}>Order Status</Text>
          
          {/* Step 1: Order Placed */}
          <View style={styles.timelineRow}>
            <View style={styles.timelineLeft}>
              <View style={styles.timelineIconCompleted}>
                <Check size={18} color={COLORS.gray900} strokeWidth={3} />
              </View>
              <View style={styles.timelineLineCompleted} />
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>Order Placed</Text>
              <Text style={styles.timelineSubtitle}>We have received your order.</Text>
            </View>
          </View>

          {/* Step 2: Packing */}
          <View style={styles.timelineRow}>
            <View style={styles.timelineLeft}>
              <View style={styles.timelineIconCompleted}>
                <Check size={18} color={COLORS.gray900} strokeWidth={3} />
              </View>
              <View style={styles.timelineLineCompleted} />
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>Packing</Text>
              <Text style={styles.timelineSubtitle}>Store is packing your items.</Text>
            </View>
          </View>

          {/* Step 3: On the Way */}
          <View style={styles.timelineRow}>
            <View style={styles.timelineLeft}>
              <PulsingRing>
                <View style={styles.timelineIconActive}>
                  <Truck size={18} color={COLORS.gray900} />
                </View>
              </PulsingRing>
              <View style={styles.timelineLinePending} />
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>On the Way</Text>
              <Text style={[styles.timelineSubtitle, { color: COLORS.primary, fontWeight: '500' }]}>
                Michael is driving to you.
              </Text>
            </View>
          </View>

          {/* Step 4: Delivered */}
          <View style={styles.timelineRowLast}>
            <View style={styles.timelineLeft}>
              <View style={styles.timelineIconPending}>
                <Home size={18} color={COLORS.gray400} />
              </View>
            </View>
            <View style={styles.timelineContentLast}>
              <Text style={[styles.timelineTitle, { color: COLORS.gray400 }]}>Delivered</Text>
            </View>
          </View>
        </View>

        {/* Order Summary Accordion */}
        <View style={styles.accordionCard}>
          <TouchableOpacity style={styles.accordionHeader}>
            <Text style={styles.accordionTitle}>Order Items (3)</Text>
            <ChevronUp size={20} color={COLORS.gray400} />
          </TouchableOpacity>
          <View style={styles.accordionContent}>
            {/* Item 1 */}
            <View style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Image 
                  source={{ 
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAI989ItY4PFzhY7ItK-F9CyinVGPxyyfiG_uRoCM4T9cxDLERTYiP__pdEG5L3_fNWtyoNUDIDx-E1aZggf72eJz64abc2_YijqbCvcxnvalKs46q7a8jGC1g-v6dlCsL3bOu5xnK3aMt67ktp0_zkh0zMqzq9pEsEBqJ_IBwheoefyyM4tGq2MDG6xcSc4X2z2hSuk56km-TCJospUYi0_i4DjMUtGxGf_aAPzQTE4avPkmI6AkzPfZrddvipx9AzlzHcNMgyKVh0" 
                  }}
                  style={styles.itemImage}
                />
                <View>
                  <Text style={styles.itemName}>Organic Bananas</Text>
                  <Text style={styles.itemMeta}>2 bunches</Text>
                </View>
              </View>
              <Text style={styles.itemPrice}>$2.40</Text>
            </View>

            {/* Item 2 */}
            <View style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Image 
                  source={{ 
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTIEbkxdWZnpGfxKBS38nEc9mcwWtQX2rPudJ9ZS2fv4yY3nL0CGS6lUAzKUe9S3oM_zzwUXV_zOwomB1U2wLMLDOunC6SsoscQWH7EUED6vjuGrsrLfoXnaN3bBCFWs4FHGlyB7e9V-SS8_7KBFGHtfZLFbpezOsPt_4LLcdYexs2qtFRTJlqn434fdJJE9iMP5dPtVv1Z5PGxckcIBoyqdCyyGEhDIeWAlKyJkDJNtcBXnVrteKMH02a-BSVT6K8XKLE1Pnmr01e" 
                  }}
                  style={styles.itemImage}
                />
                <View>
                  <Text style={styles.itemName}>Whole Milk</Text>
                  <Text style={styles.itemMeta}>1 gallon</Text>
                </View>
              </View>
              <Text style={styles.itemPrice}>$3.50</Text>
            </View>

            {/* Item 3 */}
            <View style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Image 
                  source={{ 
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbVda9NSlf0Jk0NSIygGMPi0KH5jElDZsK5sETnGr7KXftXO7JhrLSW6OcOTLul9CKyeZtl2qWvTNFENr7AFaShEoAvTnP8klpJXYLh_aoXa-LivD-ovoUbYKclz58UtkaXHtCxwKDeYdUpTUNg9RSPx1NpzP1oaANLZxSsqcd8mFHpQEhyslmqsFOmeeAL41DFjEO14LSoux-Bbuc2MLII-pv-WVgowFQ9jI8pNwMC3oSl_JW0iDip4mcvuqCFZQKoE396ygwZPFH" 
                  }}
                  style={styles.itemImage}
                />
                <View>
                  <Text style={styles.itemName}>Sourdough Bread</Text>
                  <Text style={styles.itemMeta}>1 loaf</Text>
                </View>
              </View>
              <Text style={styles.itemPrice}>$5.00</Text>
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>$10.90</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Action */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.helpButton} onPress={onNeedHelp}>
          <Headphones size={20} color={COLORS.gray900} style={{ marginRight: 8 }} />
          <Text style={styles.helpButtonText}>Need Help?</Text>
        </TouchableOpacity>
      </View>
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
    paddingVertical: 16,
    marginTop:35,
    backgroundColor: 'rgba(246, 248, 246, 0.95)', // Simulating backdrop blur
    zIndex: 50,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.gray900,
    letterSpacing: -0.5,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100, // Space for bottom bar
  },
  mapContainer: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    backgroundColor: COLORS.gray200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  liveTrackingBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: COLORS.whiteAlpha90,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  pulsingDotContainer: {
    width: 10,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  pulsingDotRing: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  pulsingDotCore: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  liveTrackingText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.gray800,
  },
  etaContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  etaTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.gray900,
    marginBottom: 4,
  },
  etaSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.gray500,
  },
  card: {
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: COLORS.gray100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.gray200,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 8,
    padding: 2,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.gray900,
    marginBottom: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: COLORS.gray500,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  chatButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(43, 238, 108, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  timelineContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    paddingHorizontal: 4,
    color: COLORS.gray900,
  },
  timelineRow: {
    flexDirection: 'row',
    minHeight: 64,
  },
  timelineRowLast: {
    flexDirection: 'row',
    minHeight: 32,
  },
  timelineLeft: {
    width: 32,
    alignItems: 'center',
    marginRight: 12,
  },
  timelineContent: {
    flex: 1,
    paddingTop: 4,
    paddingBottom: 24,
  },
  timelineContentLast: {
    flex: 1,
    paddingTop: 4,
  },
  timelineIconCompleted: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  timelineIconActive: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  timelineIconPending: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.gray100,
    borderWidth: 2,
    borderColor: COLORS.gray200,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  timelineLineCompleted: {
    width: 2,
    flex: 1,
    backgroundColor: COLORS.primary,
    marginVertical: -2, // Connect dots seamlessly
  },
  timelineLinePending: {
    width: 2,
    flex: 1,
    backgroundColor: COLORS.gray200,
    marginVertical: -2,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '700', // Changed to bold to match design better
    color: COLORS.gray900,
    lineHeight: 20,
  },
  timelineSubtitle: {
    fontSize: 14,
    color: COLORS.gray500,
    marginTop: 4,
  },
  pulsingRingWrapper: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulsingRingBackground: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(43, 238, 108, 0.4)',
  },
  accordionCard: {
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.gray100,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    marginBottom:20,
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: COLORS.surfaceLight,
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.gray900,
  },
  accordionContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: COLORS.gray100,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray900,
  },
  itemMeta: {
    fontSize: 12,
    color: COLORS.gray500,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray900,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.gray100,
    paddingTop: 12,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 14,
    color: COLORS.gray500,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.gray900,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.backgroundLight,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray100,
    padding: 16,
    height:110,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gray200,
    paddingVertical: 14,
    borderRadius: 12,
  },
  helpButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray900,
  },
});