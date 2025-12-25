import { ArrowLeft, Minus, Plus, Tag } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const COLORS = {
  primary: '#2bee6c',
  backgroundLight: '#f6f8f6',
  surfaceLight: '#ffffff',
  textMain: '#111813',
  textSecondary: '#61896f',
  border: '#f0f4f2',
  inputBg: '#f6f8f6',
  buttonTextDark: '#102216',
};

const DEFAULT_CART_ITEMS = [
  {
    id: 1,
    name: 'Organic Bananas',
    desc: '1 bunch (approx. 1lb)',
    price: 1.99,
    qty: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApBiIAdVARseJXlrUL6hi88DUNKg27aR81HHtqYYHwNrZX9FNrhcM3g3Rmji7ERCufU4knwDInPaAXe_0Emyiez46C4PEEYCXd3WBss3xiBUmKG3GS1Tft0Li0OXVjocxrVaI-GmCLCM06Qxs8ucf6Kq6Wp8zQI1opOLf3LUG1SG9jA9Fuy9JPXyymNc0KDmntYMHcW0J6dWx62BGFJQM29A0_8am0g13CkDvCi7bNDtYtx6znE0PEQUEFGzfXSU8mPaTZyn-UMp2l',
  },
  {
    id: 2,
    name: 'Almond Milk',
    desc: 'Unsweetened, 32oz',
    price: 4.50,
    qty: 2,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzMh-IfuRSZGiFXq8BzOXZx8HPjEvdip7l0hzJ5BBGWFJctPQBAs1K04v754EZ3u9zsKBP_JkTWJ5KEHtIKqPJBPxWtZBGEOL6-0qb30snYol87tk8IJ6M-0l8ReLnNSFF5_GN5RPu2Pbzq7VrBy8swsZUq6NIIex3_h2bT7wYyZ1jRcmwwzfbr5xY76uZ8qjjHrhFZMue2XDc1_DmBy4JIUsokf6UyGMKTXPDwCFEiGUY3CNHSIRfLkALoHp7w80dUa5SUnwN52W8',
  },
  {
    id: 3,
    name: 'Whole Wheat Bread',
    desc: 'Sliced loaf, 24oz',
    price: 3.29,
    qty: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0Da6n41GTrC7eBMPpPpsAIdjb58lRct5C3LH1lwJrG1mReRqSjQsNJVBtBbSgrGkf3-p8KUp19be-nRR0615yRzK3U4H2-X3MiWox5d2EJe5T2dCl80Ag32FnA8HU1xzeAN7b3HhT0G_AbnZw08X4iSNv7kkhJlY20WVYQI6X_UYKJFOoy03fsny1Wy60YEqPk-kWpBt03wc8SVqcS1loI6vujP1xfrQG1VcsSTOd7dXvtzESKZe1ZN5MSambietYpWTDI3y8niNb',
  },
  {
    id: 4,
    name: 'Avocados',
    desc: 'Small, bag of 4',
    price: 5.00,
    qty: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9i1ikfFefwvnyA5TOBKbH2rb2oUQGGosJxfT9rEE0wWcKpeRtvL0gs3xU0frjjzS88o_qeOB-Frlw9Q9ALFbllr_APIiYallIOyveJYmAAjGMwaGlaXDuXAB6Jts77Z4i5FxGryA9ZMnHT6TTQKGH5ADXvqNTy-CU-lP_zNcczz1E7J6TztwNxv_Benel25KY9pQ5q3cRKA7Hp9BwQNt4CgDHSm3Pgzb64XaUu8HE0KNncj_d37uo8AZv1Xw079jUViguxFMMetD_',
  },
];

interface CartScreenProps {
  onBack?: () => void;
  onCheckout?: () => void;
  cartItems?: any[];
}

export default function CartScreen({ 
  onBack, 
  onCheckout,
  cartItems = DEFAULT_CART_ITEMS 
}: CartScreenProps) {
  const [items, setItems] = useState(cartItems.length > 0 ? cartItems : DEFAULT_CART_ITEMS);

  const updateQty = (id: number, delta: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }).filter(item => item.qty > 0)); // Remove items with 0 quantity
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const deliveryFee = 2.99;
  const tax = 1.54;
  const total = subtotal + deliveryFee + tax;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surfaceLight} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={onBack}>
          <ArrowLeft color={COLORS.textMain} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
        <TouchableOpacity onPress={clearCart}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Cart Items List */}
        <View style={styles.itemsContainer}>
          {items.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemMain}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} />
                </View>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDesc}>{item.desc}</Text>
                  <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                </View>
              </View>
              <View style={styles.qtyWrapper}>
                <View style={styles.qtyContainer}>
                  <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() => updateQty(item.id, -1)}
                  >
                    <Minus size={16} color={COLORS.textMain} />
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.qty}</Text>
                  <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() => updateQty(item.id, 1)}
                  >
                    <Plus size={16} color={COLORS.textMain} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Promo Code */}
        <View style={styles.section}>
          <View style={styles.promoRow}>
            <View style={styles.inputWrapper}>
              <View style={styles.inputIcon}>
                <Tag size={20} color={COLORS.textSecondary} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Promo Code"
                placeholderTextColor={COLORS.textSecondary}
              />
            </View>
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Summary */}
        <View style={[styles.section, styles.summarySection]}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax</Text>
            <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Checkout */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}>
          <Text style={styles.checkoutText}>Checkout</Text>
          <Text style={styles.checkoutPrice}>${total.toFixed(2)}</Text>
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
    paddingVertical: 10,
    marginTop:40,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    zIndex: 30,
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
    color: COLORS.textMain,
    letterSpacing: -0.2,
  },
  clearButtonText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  scrollContent: {
    // paddingTop: 8,
    paddingBottom: 120, // Space for bottom bar
  },
  itemsContainer: {
    gap: 1, // Simulating flex-col gap-1
  },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLight,
    padding: 16,
  },
  itemMain: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    gap: 16,
  },
  imageContainer: {
    width: 72,
    height: 72,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
    height: 72,
    gap: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textMain,
    lineHeight: 20,
  },
  itemDesc: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.textSecondary,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textMain,
    marginTop: 4,
  },
  qtyWrapper: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: 16,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    padding: 4,
    borderRadius: 9999,
    gap: 12,
  },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  qtyText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textMain,
    width: 16,
    textAlign: 'center',
  },
  section: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: COLORS.surfaceLight,
  },
  promoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  inputWrapper: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: COLORS.inputBg,
    borderRadius: 12,
    paddingLeft: 40,
    paddingRight: 16,
    fontSize: 16,
    color: COLORS.textMain,
  },
  applyButton: {
    height: 48,
    paddingHorizontal: 24,
    backgroundColor: COLORS.textMain,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  summarySection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textMain,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.textSecondary,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textMain,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surfaceLight,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop:20,
    padding: 16,
    height:120,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 5,
  },
  checkoutButton: {
    width: '100%',
    height: 56,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  checkoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.buttonTextDark,
  },
  checkoutPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.buttonTextDark,
  },
});