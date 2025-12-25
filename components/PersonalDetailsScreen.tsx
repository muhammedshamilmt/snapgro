import {
    Camera,
    CheckCircle2,
    ChevronLeft,
    Eye,
    EyeOff,
    Lock,
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
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const COLORS = {
  primary: '#2bee6c',
  primaryDark: '#1fb351', // Active state approximation
  primaryText: '#052e12',
  background: '#f6f8f6',
  surface: '#ffffff',
  border: '#dbe6df',
  textMain: '#111813',
  textSecondary: '#61896f',
  textSecondaryLight: 'rgba(97, 137, 111, 0.5)',
};

const { width } = Dimensions.get('window');

interface PersonalDetailsScreenProps {
  onBack?: () => void;
}

export default function PersonalDetailsScreen({ onBack }: PersonalDetailsScreenProps) {
  const [firstName, setFirstName] = useState('Sarah');
  const [lastName, setLastName] = useState('Jenkins');
  const [email, setEmail] = useState('sarah.jenkins@example.com');
  const [phone, setPhone] = useState('(555) 123-4567');
  const [password, setPassword] = useState('Password123');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Sticky Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={onBack}>
          <ChevronLeft color={COLORS.textMain} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Header */}
          <View style={styles.profileSection}>
            <TouchableOpacity style={styles.profileImageContainer}>
              <Image
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHrRgivH-5PY2fZfQ_E7VnEBHb-wOjxEKBUwLlebHu9LcOEVN9ocr9QXLJr1_dHdRSezADsnurskSukEnHcfgjGYOQJPnbyH21kfEpTfTo29WIfgw6D_zPf2naposQSssVVhLgG-eFlV5HiGu41WJMs-TqfSMgvllINhmQ1Zxk86iF-QQ3H4a8HEIpcjnvS8neGTaLOu5-MvxTOMupoKIMPr_0OYZP0Of9grjL46CZqfKfRZ_aEnqLnL9HoXdAusY6mkQwpAnyKI9P',
                }}
                style={styles.profileImage}
              />
              <View style={styles.editBadge}>
                <Camera color={COLORS.textMain} size={18} strokeWidth={2.5} />
              </View>
            </TouchableOpacity>
            <Text style={styles.changePhotoText}>Change Profile Photo</Text>
          </View>

          {/* Form Fields */}
          <View style={styles.form}>
            {/* Name Section */}
            <View style={styles.row}>
              <View style={styles.halfInputContainer}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  style={styles.input}
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="First Name"
                  placeholderTextColor={COLORS.textSecondaryLight}
                />
              </View>
              <View style={styles.halfInputContainer}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  style={styles.input}
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="Last Name"
                  placeholderTextColor={COLORS.textSecondaryLight}
                />
              </View>
            </View>

            {/* Email Section */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[styles.input, styles.inputWithIcon]}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="name@example.com"
                  placeholderTextColor={COLORS.textSecondaryLight}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <View style={styles.inputIconRight}>
                  <CheckCircle2 color={COLORS.primary} size={20} />
                </View>
              </View>
            </View>

            {/* Phone Section */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="(555) 000-0000"
                placeholderTextColor={COLORS.textSecondaryLight}
                keyboardType="phone-pad"
              />
            </View>

            {/* Password Section */}
            <View style={styles.passwordSection}>
              <View style={styles.passwordHeader}>
                <Text style={styles.label}>Password</Text>
                <TouchableOpacity>
                  <Text style={styles.resetPasswordText}>Reset Password</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[styles.input, styles.inputWithIcon]}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="********"
                  placeholderTextColor={COLORS.textSecondaryLight}
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity
                  style={styles.inputIconRight}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? (
                    <Eye color={COLORS.textSecondary} size={20} />
                  ) : (
                    <EyeOff color={COLORS.textSecondary} size={20} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Security Badge */}
          <View style={styles.securityBadge}>
            <Lock color={COLORS.textMain} size={14} style={{ opacity: 0.6 }} />
            <Text style={styles.securityText}>Your data is encrypted and secure.</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Floating Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.saveButton} activeOpacity={0.9}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(246, 248, 246, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginTop:40,
    zIndex: 50,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textMain,
    textAlign: 'center',
    flex: 1,
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 120, // Space for bottom bar
  },
  profileSection: {
    alignItems: 'center',
    gap: 16,
    paddingVertical: 16,
  },
  profileImageContainer: {
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: COLORS.surface,
    backgroundColor: '#e0e0e0',
  },
  editBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  changePhotoText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '500',
    marginTop: 12,
  },
  form: {
    gap: 20,
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  halfInputContainer: {
    flex: 1,
    gap: 8,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textMain,
    paddingLeft: 4,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.textMain,
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  inputWithIcon: {
    paddingRight: 48,
  },
  inputIconRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passwordSection: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  resetPasswordText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primaryDark,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 24,
    opacity: 0.6,
  },
  securityText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textMain,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(246, 248, 246, 0.8)',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 30,
  },
  saveButton: {
    width: '100%',
    height: 56,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    color: COLORS.primaryText,
    fontSize: 18,
    fontWeight: '700',
  },
});