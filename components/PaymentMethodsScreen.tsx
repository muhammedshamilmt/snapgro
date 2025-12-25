import {
  Check,
  ChevronLeft,
  ChevronRight,
  Lock,
  Plus,
  PlusCircle,
  Smartphone,
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

interface PaymentMethodsScreenProps {
  onBack?: () => void;
  onAddNewCard?: () => void;
}

const PaymentMethodsScreen = ({ onBack, onAddNewCard }: PaymentMethodsScreenProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const colors = {
    primary: '#2bee6c',
    background: isDark ? '#102216' : '#f6f8f6',
    surface: isDark ? '#0f172a' : '#ffffff',
    surfaceBorder: isDark ? '#1e293b' : '#f1f5f9',
    text: isDark ? '#ffffff' : '#0f172a',
    textSecondary: isDark ? '#94a3b8' : '#64748b',
    iconDefault: isDark ? '#ffffff' : '#0f172a',
    shadow: isDark ? '#000000' : '#000000',
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: isDark ? 'rgba(16, 34, 22, 0.95)' : 'rgba(246, 248, 246, 0.95)',
      borderBottomWidth: 1,
      marginTop:40,
      borderBottomColor: isDark ? 'rgba(30, 41, 59, 0.5)' : 'transparent',
      zIndex: 10,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text,
      textAlign: 'center',
      flex: 1,
      paddingRight: 32, // Balance the back button width
    },
    backButton: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      marginLeft: -8,
    },
    editButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.primary,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
      paddingHorizontal: 20,
      paddingBottom: 12,
      marginTop: 24,
    },
    cardContainer: {
      marginHorizontal: 16,
      backgroundColor: colors.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
      overflow: 'hidden',
      marginBottom: 12,
    },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      gap: 16,
    },
    cardIcon: {
      width: 48,
      height: 32,
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    cardTextContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 2,
    },
    cardSubtitle: {
      fontSize: 14,
      fontWeight: '400',
      color: colors.textSecondary,
    },
    selectedIndicator: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 2,
    },
    unselectedIndicator: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: isDark ? '#334155' : '#e2e8f0',
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 16,
      paddingBottom: Platform.OS === 'ios' ? 32 : 30,
      backgroundColor: isDark ? 'rgba(16, 34, 22, 0.95)' : 'rgba(246, 248, 246, 0.95)',
      borderTopWidth: 1,
      borderTopColor: isDark ? '#1e293b' : '#e2e8f0'

    },
    addButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
      height: 56,
      borderRadius: 12,
      gap: 8,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
    addButtonText: {
      fontSize: 16,
      fontWeight: '700',
      color: '#0f172a',
      letterSpacing: 0.5,
    },
    securityNote: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 12,
      gap: 6,
      opacity: 0.7,
    },
    securityText: {
      fontSize: 12,
      fontWeight: '500',
      color: colors.textSecondary,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} accessibilityLabel="Go back" onPress={onBack}>
          <ChevronLeft size={24} color={colors.iconDefault} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <TouchableOpacity>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Default Payment Method */}
        <View>
          <Text style={styles.sectionTitle}>Default Payment Method</Text>
          <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.cardContent} activeOpacity={0.7}>
              {/* Visa Icon */}
              <View style={[styles.cardIcon, { backgroundColor: '#1d4ed8' }]}>
                <Text style={{ 
                  color: 'white', 
                  fontSize: 10, 
                  fontWeight: 'bold', 
                  fontStyle: 'italic', 
                  fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif' 
                }}>
                  VISA
                </Text>
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Visa **** 1234</Text>
                <Text style={styles.cardSubtitle}>Expires 12/25</Text>
              </View>
              <View style={styles.selectedIndicator}>
                <Check size={16} color="#0f172a" strokeWidth={3} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Saved Cards */}
        <View>
          <Text style={styles.sectionTitle}>Saved Cards</Text>
          
          {/* Mastercard */}
          <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.cardContent} activeOpacity={0.7}>
              <View style={[styles.cardIcon, { backgroundColor: '#1e293b' }]}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ 
                    width: 16, 
                    height: 16, 
                    borderRadius: 8, 
                    backgroundColor: '#ef4444', 
                    marginRight: -6, 
                    opacity: 0.9 
                  }} />
                  <View style={{ 
                    width: 16, 
                    height: 16, 
                    borderRadius: 8, 
                    backgroundColor: '#eab308', 
                    opacity: 0.9 
                  }} />
                </View>
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Mastercard **** 5678</Text>
                <Text style={styles.cardSubtitle}>Expires 09/24</Text>
              </View>
              <View style={styles.unselectedIndicator} />
            </TouchableOpacity>
          </View>

          {/* Amex */}
          <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.cardContent} activeOpacity={0.7}>
              <View style={[styles.cardIcon, { backgroundColor: '#06b6d4' }]}>
                <Text style={{ color: 'white', fontSize: 8, fontWeight: '900' }}>
                  AMEX
                </Text>
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Amex **** 9012</Text>
                <Text style={styles.cardSubtitle}>Expires 01/26</Text>
              </View>
              <View style={styles.unselectedIndicator} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Digital Wallets */}
        <View>
          <Text style={styles.sectionTitle}>Digital Wallets</Text>
          
          {/* Apple Pay */}
          <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.cardContent} activeOpacity={0.7}>
              <View style={[styles.cardIcon, { backgroundColor: '#000000' }]}>
                <Smartphone size={20} color="white" />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Apple Pay</Text>
                <Text style={styles.cardSubtitle}>Connected</Text>
              </View>
              <ChevronRight size={20} color={isDark ? '#475569' : '#94a3b8'} />
            </TouchableOpacity>
          </View>

          {/* PayPal */}
          <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.cardContent} activeOpacity={0.7}>
              <View style={[styles.cardIcon, { 
                backgroundColor: '#ffffff', 
                borderWidth: 1, 
                borderColor: isDark ? '#334155' : '#f1f5f9' 
              }]}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ 
                    color: '#1e40af', 
                    fontSize: 10, 
                    fontWeight: 'bold', 
                    fontStyle: 'italic' 
                  }}>
                    Pay
                  </Text>
                  <Text style={{ 
                    color: '#3b82f6', 
                    fontSize: 10, 
                    fontWeight: 'bold', 
                    fontStyle: 'italic' 
                  }}>
                    Pal
                  </Text>
                </View>
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>PayPal</Text>
                <Text style={[styles.cardSubtitle, { color: colors.primary, fontWeight: '500' }]}>
                  Link Account
                </Text>
              </View>
              <PlusCircle size={20} color={isDark ? '#475569' : '#94a3b8'} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton} activeOpacity={0.9} onPress={onAddNewCard}>
          <Plus size={24} color="#0f172a" strokeWidth={3} />
          <Text style={styles.addButtonText}>Add New Card</Text>
        </TouchableOpacity>
        <View style={styles.securityNote}>
          <Lock size={14} color={colors.textSecondary} />
          <Text style={styles.securityText}>Your payment info is stored securely</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PaymentMethodsScreen;