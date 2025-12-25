import {
  ArrowLeft,
  Check,
  CreditCard,
  Eye,
  HelpCircle,
  Lock,
  Nfc,
  Plus
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

interface AddNewCardScreenProps {
  onBack?: () => void;
}

export default function AddNewCardScreen({ onBack }: AddNewCardScreenProps) {
  const [cardNumber, setCardNumber] = useState('4255 12');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(true);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f6f8f6" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ArrowLeft size={24} color="#111813" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Card</Text>
        <View style={{ width: 40 }} />
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
          {/* Card Preview Section */}
          <View style={styles.cardSection}>
            <View style={styles.cardContainer}>
              {/* Background Effects */}
              <View style={[styles.blob, styles.blob1]} />
              <View style={[styles.blob, styles.blob2]} />

              {/* Card Content */}
              <View style={styles.cardInner}>
                <View style={styles.cardHeader}>
                  {/* Chip */}
                  <View style={styles.chip}>
                    <View style={styles.chipLineH} />
                    <View style={styles.chipLineV} />
                    <View style={styles.chipInnerRect} />
                  </View>
                  <Nfc size={28} color="rgba(255,255,255,0.7)" />
                </View>

                <View style={styles.cardBody}>
                  <Text style={styles.cardNumberDisplay}>4255 •••• •••• 1234</Text>
                  <View style={styles.cardFooter}>
                    <View>
                      <Text style={styles.cardLabel}>CARD HOLDER</Text>
                      <Text style={styles.cardValue}>JONATHAN DOE</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={styles.cardLabel}>EXPIRES</Text>
                      <Text style={styles.cardValue}>12/28</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Decorative Circles Bottom Right */}
              <View style={styles.decorativeCircles}>
                <View style={styles.decoCircle} />
                <View style={[styles.decoCircle, { marginLeft: -16 }]} />
              </View>
            </View>

            <View style={styles.secureBadge}>
              <Lock size={14} color="#2bee6c" />
              <Text style={styles.secureText}>Payments are securely encrypted</Text>
            </View>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            {/* Card Number Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Card Number</Text>
              <View style={[
                styles.inputWrapper,
                focusedField === 'cardNumber' && styles.inputWrapperFocused
              ]}>
                <View style={styles.inputIconLeft}>
                  <CreditCard
                    size={20}
                    color={focusedField === 'cardNumber' ? '#2bee6c' : '#9ca3af'}
                  />
                </View>
                <TextInput
                  style={[styles.input, styles.inputCardNumber]}
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  placeholder="0000 0000 0000 0000"
                  placeholderTextColor="#9ca3af"
                  keyboardType="numeric"
                  maxLength={19}
                  onFocus={() => setFocusedField('cardNumber')}
                  onBlur={() => setFocusedField(null)}
                />
                <View style={styles.cardLogos}>
                  {/* Amex */}
                  <View style={styles.logoWrapper}>
                    <View style={styles.amexBox}>
                      <Text style={styles.amexText}>AM{'\n'}EX</Text>
                    </View>
                  </View>
                  {/* Mastercard */}
                  <View style={styles.logoWrapper}>
                    <View style={styles.mcContainer}>
                      <View style={styles.mcCircleRed} />
                      <View style={styles.mcCircleOrange} />
                    </View>
                  </View>
                  {/* Visa (Selected) */}
                  <View style={styles.visaWrapper}>
                    <Text style={styles.visaText}>VISA</Text>
                    <View style={styles.checkBadge}>
                      <Check size={8} color="#000" strokeWidth={4} />
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Cardholder Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Cardholder Name</Text>
              <TextInput
                style={[
                  styles.input,
                  styles.inputSimple,
                  focusedField === 'cardHolder' && styles.inputFocused
                ]}
                value={cardHolder}
                onChangeText={setCardHolder}
                placeholder="JONATHAN DOE"
                placeholderTextColor="#9ca3af"
                autoCapitalize="characters"
                onFocus={() => setFocusedField('cardHolder')}
                onBlur={() => setFocusedField(null)}
              />
            </View>

            {/* Expiry & CVV */}
            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 16 }]}>
                <Text style={styles.label}>Expiry Date</Text>
                <TextInput
                  style={[
                    styles.input,
                    styles.inputSimple,
                    { textAlign: 'center' },
                    focusedField === 'expiry' && styles.inputFocused
                  ]}
                  value={expiry}
                  onChangeText={setExpiry}
                  placeholder="MM / YY"
                  placeholderTextColor="#9ca3af"
                  keyboardType="numeric"
                  maxLength={5}
                  onFocus={() => setFocusedField('expiry')}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
              <View style={[styles.inputGroup, { width: '35%' }]}>
                <View style={styles.labelRow}>
                  <Text style={styles.label}>CVV / CVC</Text>
                  <HelpCircle size={14} color="#9ca3af" style={{ marginLeft: 4 }} />
                </View>
                <View style={[
                  styles.inputWrapper,
                  focusedField === 'cvv' && styles.inputWrapperFocused
                ]}>
                  <TextInput
                    style={[styles.input, { textAlign: 'center', paddingRight: 30 }]}
                    value={cvv}
                    onChangeText={setCvv}
                    placeholder="123"
                    placeholderTextColor="#9ca3af"
                    keyboardType="numeric"
                    secureTextEntry
                    maxLength={3}
                    onFocus={() => setFocusedField('cvv')}
                    onBlur={() => setFocusedField(null)}
                  />
                  <TouchableOpacity style={styles.inputIconRight}>
                    <Eye size={18} color="#9ca3af" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Checkbox */}
            <TouchableOpacity
              style={styles.checkboxRow}
              activeOpacity={0.8}
              onPress={() => setSaveCard(!saveCard)}
            >
              <View style={[styles.checkbox, saveCard && styles.checkboxChecked]}>
                {saveCard && <Check size={14} color="#fff" strokeWidth={3} />}
              </View>
              <Text style={styles.checkboxLabel}>
                Save this card securely for future payments
              </Text>
            </TouchableOpacity>

            <View style={{ height: 100 }} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} activeOpacity={0.9}>
          <Plus size={24} color="#102216" style={{ marginRight: 8 }} />
          <Text style={styles.saveButtonText}>Save Card</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8f6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#f6f8f6',
    marginTop:40,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111813',
    textAlign: 'center',
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  cardSection: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  cardContainer: {
    width: '100%',
    aspectRatio: 1.586,
    backgroundColor: '#1a2e22',
    borderRadius: 16,
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  blob: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.1,
  },
  blob1: {
    width: 200,
    height: 200,
    backgroundColor: '#2bee6c',
    top: -50,
    right: -50,
  },
  blob2: {
    width: 200,
    height: 200,
    backgroundColor: '#2bee6c',
    bottom: -50,
    left: -50,
    opacity: 0.05,
  },
  cardInner: {
    flex: 1,
    justifyContent: 'space-between',
    zIndex: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  chip: {
    width: 48,
    height: 36,
    borderRadius: 6,
    backgroundColor: '#d4d4d4',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
  },
  chipLineH: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  chipLineV: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  chipInnerRect: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    transform: [{ translateX: -8 }, { translateY: -8 }],
  },
  cardBody: {
    marginTop: 8,
  },
  cardNumberDisplay: {
    fontSize: 22,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    color: 'rgba(255,255,255,0.9)',
    letterSpacing: 2,
    marginBottom: 24,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardLabel: {
    fontSize: 10,
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.9)',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  decorativeCircles: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
    opacity: 0.1,
  },
  decoCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    gap: 8,
  },
  secureText: {
    fontSize: 12,
    color: '#6b7280',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.03,
    shadowRadius: 20,
    elevation: 5,
    gap: 24,
  },
  inputGroup: {
    marginBottom: 0,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    backgroundColor: '#f9fafb',
    height: 52,
  },
  inputWrapperFocused: {
    borderColor: '#2bee6c',
    borderWidth: 1,
    backgroundColor: '#fff',
    shadowColor: '#2bee6c',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111813',
  },
  inputSimple: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    backgroundColor: '#f9fafb',
    height: 52,
  },
  inputFocused: {
    borderColor: '#2bee6c',
    backgroundColor: '#fff',
  },
  inputCardNumber: {
    paddingLeft: 44,
    paddingRight: 100,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    letterSpacing: 1,
  },
  inputIconLeft: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  inputIconRight: {
    position: 'absolute',
    right: 12,
    padding: 4,
  },
  cardLogos: {
    position: 'absolute',
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoWrapper: {
    width: 36,
    height: 24,
    borderRadius: 4,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.4,
  },
  amexBox: {
    width: 32,
    height: 20,
    backgroundColor: '#006FCF',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amexText: {
    color: '#fff',
    fontSize: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 5,
  },
  mcContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mcCircleRed: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#EB001B',
    opacity: 0.9,
    zIndex: 1,
  },
  mcCircleOrange: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#F79E1B',
    opacity: 0.9,
    marginLeft: -6,
  },
  visaWrapper: {
    width: 44,
    height: 28,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(43,238,108,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2bee6c',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  visaText: {
    color: '#1A1F71',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 14,
    letterSpacing: -0.5,
  },
  checkBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#2bee6c',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  row: {
    flexDirection: 'row',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#2bee6c',
    borderColor: '#2bee6c',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#4b5563',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingBottom:30,
    zIndex: 20,
  },
  saveButton: {
    backgroundColor: '#2bee6c',
    borderRadius: 12,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2bee6c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#102216',
  },
});