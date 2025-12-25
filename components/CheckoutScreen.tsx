import {
    ArrowRight,
    ChevronLeft,
    Clock,
    CreditCard,
    MapPin,
    Minus,
    Navigation,
    Plus,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
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

const COLORS = {
  primary: '#2bee6c',
  backgroundLight: '#f6f8f6',
  surfaceLight: '#ffffff',
  textMain: '#111813',
  textGray: '#6b7280',
  gray100: '#f3f4f6',
  border: '#e5e7eb',
  backgroundDark: '#102216',
};

interface CheckoutScreenProps {
  onBack?: () => void;
  onPlaceOrder?: () => void;
  cartItems?: any[];
}

export default function CheckoutScreen({ 
  onBack, 
  onPlaceOrder,
  cartItems = [] 
}: CheckoutScreenProps) {
  const [itemQuantities, setItemQuantities] = useState<{[key: number]: number}>({});

  const updateQuantity = (itemId: number, delta: number) => {
    setItemQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) + delta)
    }));
  };

  const getItemQuantity = (itemId: number) => {
    return itemQuantities[itemId] || 1;
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    const quantity = getItemQuantity(item.id);
    return sum + (item.price * quantity);
  }, 0);
  
  const deliveryFee = 1.99;
  const serviceFee = 0.00;
  const total = subtotal + deliveryFee + serviceFee;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="rgba(255,255,255,0.95)"
      />

      {/* Top App Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={onBack}>
          <ChevronLeft color="#111827" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Products Section */}
        {cartItems.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Items</Text>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.productRow}>
                  {/* Product Image */}
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.productImage}
                    />
                  </View>

                  {/* Product Info */}
                  <View style={styles.productInfo}>
                    <View>
                      <Text style={styles.productTitle}>{item.name}</Text>
                      <Text style={styles.productSubtitle}>
                        {item.desc || item.subtitle || 'Fresh product'}
                      </Text>
                    </View>
                    <View style={styles.priceRow}>
                      <Text style={styles.priceText}>${item.price.toFixed(2)}</Text>
                      {/* Quantity Stepper */}
                      <View style={styles.stepper}>
                        <TouchableOpacity 
                          style={styles.stepperButton}
                          onPress={() => updateQuantity(item.id, -1)}
                        >
                          <Minus size={18} color="#111827" />
                        </TouchableOpacity>
                        <Text style={styles.stepperValue}>
                          {getItemQuantity(item.id)}
                        </Text>
                        <TouchableOpacity
                          style={[styles.stepperButton, styles.stepperButtonActive]}
                          onPress={() => updateQuantity(item.id, 1)}
                        >
                          <Plus size={18} color={COLORS.backgroundDark} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          // Default single product for demo
          <View style={styles.section}>
            <View style={styles.card}>
              <View style={styles.productRow}>
                {/* Product Image */}
                <View style={styles.imageContainer}>
                  <Image
                    source={{
                      uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8I_1g3YVwQ4BiUigD--cR8QQXl-ufnaa5LzdMQvaWiB5g7aAxhFsNfLLe5xGc0Fk_37MHWisG4p5lG_1OiIjpSrCk7KMiT9uwQVSBKEONMSxyokMKwm-5dAZSt9l2PF-3fq900JBEQ1kv5j_F555tpQwLy7IVHdjWIfFu6zHRo8WNSSvpbQPRTkTlNBKGVSdrIj_q81rR6btPDdWHDt4TS_gV7pVqCHiFmMZ9pkHZv17oXs3eo_2b_dFxlrYepJ2zqk3k2vwGKunx',
                    }}
                    style={styles.productImage}
                  />
                </View>

                {/* Product Info */}
                <View style={styles.productInfo}>
                  <View>
                    <Text style={styles.productTitle}>Organic Avocados</Text>
                    <Text style={styles.productSubtitle}>Pack of 4</Text>
                  </View>
                  <View style={styles.priceRow}>
                    <Text style={styles.priceText}>$5.99</Text>
                    {/* Quantity Stepper */}
                    <View style={styles.stepper}>
                      <TouchableOpacity style={styles.stepperButton}>
                        <Minus size={18} color="#111827" />
                      </TouchableOpacity>
                      <Text style={styles.stepperValue}>1</Text>
                      <TouchableOpacity
                        style={[styles.stepperButton, styles.stepperButtonActive]}
                      >
                        <Plus size={18} color={COLORS.backgroundDark} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Delivery Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Details</Text>
          <View style={styles.listContainer}>
            {/* Address Item */}
            <View style={styles.listItem}>
              <View style={styles.listItemLeft}>
                <View style={styles.listIcon}>
                  <MapPin size={20} color="#111827" />
                </View>
                <View style={styles.listItemTextContainer}>
                  <Text style={styles.listItemTitle}>Home</Text>
                  <Text style={styles.listItemSubtitle} numberOfLines={1}>
                    123 Green St, Apt 4B, New York
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <Text style={styles.linkText}>Change</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />
            {/* Time Item */}
            <View style={styles.listItem}>
              <View style={styles.listItemLeft}>
                <View style={styles.listIcon}>
                  <Clock size={20} color="#111827" />
                </View>
                <View style={styles.listItemTextContainer}>
                  <Text style={styles.listItemTitle}>Delivery Time</Text>
                  <Text style={styles.listItemSubtitle}>Arrives in 15-20 mins</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Map Preview */}
          <View style={styles.mapWrapper}>
            <View style={styles.mapContainer}>
              <Image
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDurIjFBox_LQFU3-QWEA4E2md0Ty0xl70R4YkR1jQ5VjFx6x5-MlmOSAU1-T2_49V0y8dUq0qzwpe2nq4ezkIORaeALUNdqIUE382ayhzN67QYKzr856sFxqylEuUdequZCStPoQ3rxHYE-eT-IdF7vjXYlP9w8eFTl4D2PR7EHkS4ODSg1HexoQnN8BEWWeaBje_JZqRzM5_E20x136gavc8gfPH5qLitLPEBxJMHmlbTgv_nMXEhn7Gm37_NA3tRwV9jSJxyaeIA',
                }}
                style={styles.mapImage}
              />
              <View style={styles.mapOverlay}>
                <View style={styles.badge}>
                  <Navigation
                    size={14}
                    color={COLORS.primary}
                    style={styles.badgeIcon}
                  />
                  <Text style={styles.badgeText}>1.2 mi away</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Payment Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <View style={styles.listItemLeft}>
                <View style={styles.listIcon}>
                  <CreditCard size={20} color="#111827" />
                </View>
                <View style={styles.listItemTextContainer}>
                  <Text style={styles.listItemTitle}>Visa ending in 4242</Text>
                  <Text style={styles.listItemSubtitle}>Expires 12/25</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Text style={styles.linkText}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Order Summary */}
        <View style={[styles.section, styles.lastSection]}>
          <View style={styles.card}>
            <Text style={styles.summaryTitle}>Order Summary</Text>
            <View style={styles.summaryContent}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>
                  ${cartItems.length > 0 ? subtotal.toFixed(2) : '5.99'}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery Fee</Text>
                <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Service Fee</Text>
                <Text style={styles.summaryValue}>${serviceFee.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>
                  ${cartItems.length > 0 ? total.toFixed(2) : '7.98'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Footer */}
      <View style={styles.footer}>
        <View style={styles.footerRow}>
          <Text style={styles.footerLabel}>Total to pay</Text>
          <Text style={styles.footerAmount}>
            ${cartItems.length > 0 ? total.toFixed(2) : '7.98'}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.checkoutButton} 
          activeOpacity={0.9}
          onPress={onPlaceOrder}
        >
          <View style={styles.checkoutButtonContent}>
            <Text style={styles.checkoutButtonText}>Place Order</Text>
            <ArrowRight size={20} color={COLORS.backgroundDark} />
          </View>
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
    paddingVertical: 12,
    marginTop:50,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    flex: 1,
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  scrollContent: {
    paddingBottom: 140,
  },
  section: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  lastSection: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.gray100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 8,
  },
  productRow: {
    flexDirection: 'row',
    gap: 16,
  },
  imageContainer: {
    width: 112,
    height: 112,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: COLORS.gray100,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 22,
  },
  productSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textGray,
    marginTop: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  priceText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray100,
    borderRadius: 8,
    padding: 4,
    height: 36,
  },
  stepperButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  stepperButtonActive: {
    backgroundColor: COLORS.primary,
  },
  stepperValue: {
    width: 32,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  listContainer: {
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.gray100,
    overflow: 'hidden',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: COLORS.surfaceLight,
  },
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 16,
  },
  listIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemTextContainer: {
    flex: 1,
    marginRight: 8,
  },
  listItemTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  listItemSubtitle: {
    fontSize: 14,
    color: COLORS.textGray,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray100,
  },
  mapWrapper: {
    marginTop: 16,
    paddingHorizontal: 0,
  },
  mapContainer: {
    height: 96,
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.6,
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  badgeIcon: {
    marginRight: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  summaryContent: {
    gap: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.textGray,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: COLORS.gray100,
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surfaceLight,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray100,
    paddingHorizontal: 16,
    paddingTop: 16,
    height:170,
    // borderTopLeftRadius:20,
    // borderTopRightRadius:20,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 10,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  footerLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textGray,
  },
  footerAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4ade80',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  checkoutButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.backgroundDark,
  },
});