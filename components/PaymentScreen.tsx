import {
  ArrowLeft,
  ArrowRight,
  CreditCard,
  HelpCircle,
  Lock,
  MoreHorizontal,
  Wallet
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

// Color Palette based on Tailwind Config
const COLORS = {
  primary: '#2bee6c',
  backgroundLight: '#f6f8f6',
  surfaceLight: '#ffffff',
  textMain: '#111813',
  textSecondary: '#61896f',
  border: '#e5e7eb', // gray-200
  inputBorder: '#e5e7eb',
  placeholder: '#9ca3af', // gray-400
  radioBorder: '#dbe6df',
  black: '#000000',
  white: '#ffffff',
  green700: '#15803d',
};

interface PaymentScreenProps {
  onBack?: () => void;
  onConfirmPayment?: (paymentMethod: string) => void;
}

export default function PaymentScreen({ 
  onBack, 
  onConfirmPayment 
}: PaymentScreenProps) {
  const [selectedMethod, setSelectedMethod] = useState('apple-pay');
  const [saveCard, setSaveCard] = useState(true);

  // Input Focus States
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  
  const handleFocus = (field: string) => setFocusedInput(field);
  const handleBlur = () => setFocusedInput(null);

  const getInputStyle = (field: string) => [
    styles.inputContainer,
    focusedInput === field && styles.inputContainerFocused,
  ];

  const handleConfirmPayment = () => {
    onConfirmPayment?.(selectedMethod);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.backgroundLight} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={onBack}>
          <ArrowLeft size={24} color={COLORS.textMain} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <TouchableOpacity style={styles.iconButton}>
          <MoreHorizontal size={24} color={COLORS.textMain} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Saved Methods Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Saved Methods</Text>
            <View style={styles.methodsList}>
              {/* Apple Pay */}
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setSelectedMethod('apple-pay')}
                style={[
                  styles.methodCard,
                  selectedMethod === 'apple-pay' && styles.methodCardSelected,
                ]}
              >
                <View style={styles.applePayIcon}>
                  <Wallet size={20} color={COLORS.white} />
                </View>
                <View style={styles.methodInfo}>
                  <Text style={styles.methodTitle}>Apple Pay</Text>
                  <Text style={styles.methodSubtitle}>Linked to Wallet</Text>
                </View>
                <View style={styles.radioContainer}>
                  <View style={[
                    styles.radioOuter,
                    selectedMethod === 'apple-pay' && styles.radioOuterSelected
                  ]}>
                    {selectedMethod === 'apple-pay' && <View style={styles.radioInner} />}
                  </View>
                </View>
              </TouchableOpacity>

              {/* Visa Card */}
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setSelectedMethod('visa')}
                style={[
                  styles.methodCard,
                  selectedMethod === 'visa' && styles.methodCardSelected,
                ]}
              >
                <View style={styles.cardIconContainer}>
                  <Image
                    source={{ 
                      uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6P1P51GmbrwCyYcWsBBGRL7H-XPlPjRjD24FFCIesi1GbqQSAm8rMRXFId8fHUqT0-_Spxzxd8shskX0KIWle-MgyBocUhtatwV3mFxcNV-zEPhKjE5hoHkmXVpqPxCUVgpxKeoAXYYLuMaro7WnJUVWihAjGPZx56sXsmDotN0IRXQBnqaUHUpaQWwBh8xv2RoAr7HRi4xJ9SO83cp1y8dHHDhSvPjQ76BwCWA3sPe5WemLkZjybxV8lOP40DXF-Q9G7154DoVjG" 
                    }}
                    style={styles.cardImage}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.methodInfo}>
                  <Text style={styles.methodTitle} numberOfLines={1}>
                    Visa ending in 4242
                  </Text>
                  <Text style={styles.methodSubtitle}>Expires 12/25</Text>
                </View>
                <View style={styles.radioContainer}>
                  <View style={[
                    styles.radioOuter,
                    selectedMethod === 'visa' && styles.radioOuterSelected
                  ]}>
                    {selectedMethod === 'visa' && <View style={styles.radioInner} />}
                  </View>
                </View>
              </TouchableOpacity>

              {/* Mastercard */}
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setSelectedMethod('mastercard')}
                style={[
                  styles.methodCard,
                  selectedMethod === 'mastercard' && styles.methodCardSelected,
                ]}
              >
                <View style={styles.cardIconContainer}>
                  <Image
                    source={{ 
                      uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCP9Lwf766It2EAcnVyJN4jLYkGo5xpDyf4BHSwH2eyeDTMzxP83Qd2UU3LM8NBLeXMMHvmDlZ3INrDOitwfFpi2EOQYrZVrvl-J-2SKEIsD_G_06Mn4sOO7z8oCJvui_QSvK8lI7Ec1mqvKCTnSrhkP4soXGZmMPcAOKrsQCidwvli3id-vMReXHki5A7EtEpmehDoOj4P04BPejfKWl1G2nD-wUhb2nJeLTJVSXZb8xhsVJv-U08IpCJSxfHbDpC8pc-XgY8SCeW4" 
                    }}
                    style={styles.cardImage}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.methodInfo}>
                  <Text style={styles.methodTitle} numberOfLines={1}>
                    Mastercard ending in 8899
                  </Text>
                  <Text style={styles.methodSubtitle}>Expires 09/24</Text>
                </View>
                <View style={styles.radioContainer}>
                  <View style={[
                    styles.radioOuter,
                    selectedMethod === 'mastercard' && styles.radioOuterSelected
                  ]}>
                    {selectedMethod === 'mastercard' && <View style={styles.radioInner} />}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or pay with new card</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* New Card Form */}
          <View style={styles.formCard}>
            <View style={styles.formHeader}>
              <CreditCard size={24} color={COLORS.primary} style={{ marginRight: 8 }} />
              <Text style={styles.formTitle}>Add New Card</Text>
            </View>
            <View style={styles.formContent}>
              {/* Card Number */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>CARD NUMBER</Text>
                <View style={getInputStyle('cardNumber')}>
                  <TextInput
                    style={styles.input}
                    placeholder="0000 0000 0000 0000"
                    placeholderTextColor={COLORS.placeholder}
                    keyboardType="numeric"
                    onFocus={() => handleFocus('cardNumber')}
                    onBlur={handleBlur}
                  />
                  <CreditCard size={20} color={COLORS.placeholder} />
                </View>
              </View>

              {/* Expiry & CVV Row */}
              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 16 }]}>
                  <Text style={styles.label}>EXPIRY DATE</Text>
                  <View style={getInputStyle('expiry')}>
                    <TextInput
                      style={styles.input}
                      placeholder="MM/YY"
                      placeholderTextColor={COLORS.placeholder}
                      keyboardType="numeric"
                      onFocus={() => handleFocus('expiry')}
                      onBlur={handleBlur}
                    />
                  </View>
                </View>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>CVV</Text>
                  <View style={getInputStyle('cvv')}>
                    <TextInput
                      style={styles.input}
                      placeholder="123"
                      placeholderTextColor={COLORS.placeholder}
                      keyboardType="numeric"
                      secureTextEntry
                      onFocus={() => handleFocus('cvv')}
                      onBlur={handleBlur}
                    />
                    <HelpCircle size={20} color={COLORS.placeholder} />
                  </View>
                </View>
              </View>

              {/* Cardholder Name */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>CARDHOLDER NAME</Text>
                <View style={getInputStyle('name')}>
                  <TextInput
                    style={styles.input}
                    placeholder="John Doe"
                    placeholderTextColor={COLORS.placeholder}
                    autoCapitalize="words"
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                  />
                </View>
              </View>

              {/* Save Toggle */}
              <View style={styles.toggleContainer}>
                <Switch
                  value={saveCard}
                  onValueChange={setSaveCard}
                  trackColor={{ false: '#e5e7eb', true: COLORS.primary }}
                  thumbColor={COLORS.white}
                  ios_backgroundColor="#e5e7eb"
                />
                <Text style={styles.toggleText}>Save card for future payments</Text>
              </View>
            </View>
          </View>

          {/* Secure Badge */}
          <View style={styles.secureBadge}>
            <Lock size={18} color={COLORS.green700} style={{ marginRight: 6 }} />
            <Text style={styles.secureText}>Payments are 100% secure and encrypted</Text>
          </View>

          {/* Spacer for fixed footer */}
          <View style={{ height: 100 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Action */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPayment}>
          <Text style={styles.confirmButtonText}>Confirm Payment</Text>
          <ArrowRight size={24} color="#102216" />
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
    marginTop:40,
    backgroundColor: COLORS.backgroundLight,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textMain,
    letterSpacing: -0.3,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textMain,
    marginBottom: 16,
    textAlign: 'left',
  },
  methodsList: {
    gap: 12,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLight,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  methodCardSelected: {
    borderColor: 'rgba(43, 238, 108, 0.5)', // primary/50
  },
  applePayIcon: {
    width: 56,
    height: 40,
    backgroundColor: COLORS.black,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardIconContainer: {
    width: 56,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    overflow: 'hidden',
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: '80%',
    height: '80%',
  },
  methodInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textMain,
    marginBottom: 2,
  },
  methodSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.textSecondary,
  },
  radioContainer: {
    marginLeft: 12,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.radioBorder,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  radioOuterSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.white,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 24,
    gap: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  dividerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280', // gray-500
  },
  formCard: {
    backgroundColor: COLORS.surfaceLight,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6', // gray-100
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  formContent: {
    gap: 16,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: COLORS.textSecondary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  inputContainerFocused: {
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textMain,
    height: '100%',
  },
  row: {
    flexDirection: 'row',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    gap: 12,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textMain,
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
    opacity: 0.6,
    paddingBottom:20,
  },
  secureText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    height:130,
    paddingTop:20,
    backgroundColor: 'rgba(246, 248, 246, 0.95)',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'center',
  },
  confirmButton: {
    width: '100%',
    maxWidth: 448,
    backgroundColor: COLORS.primary,
    height: 60,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    gap: 8,
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#102216',
  },
});