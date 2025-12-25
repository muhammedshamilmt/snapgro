import {
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import GoogleIcon from './GoogleIcon';

// Design tokens extracted from the provided Tailwind config and HTML
const COLORS = {
  primary: '#2bee6c',
  primaryDark: '#25cf5e',
  backgroundLight: '#f6f8f6',
  surfaceLight: '#ffffff',
  textMain: '#111813',
  textMuted: '#61896f',
  border: '#dbe6df',
  googleRed: '#EA4335',
  facebookBlue: '#1877F2',
};

interface SignUpScreenProps {
  onBack?: () => void;
  onSignUp?: () => void;
  onGoogleSignUp?: () => void;
  onFacebookSignUp?: () => void;
  onGuestSignUp?: () => void;
  onLogin?: () => void;
}

export default function SignUpScreen({
  onBack,
  onSignUp,
  onGoogleSignUp,
  onFacebookSignUp,
  onGuestSignUp,
  onLogin,
}: SignUpScreenProps) {
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const InputField = ({ 
    id,
    label, 
    icon: Icon, 
    placeholder, 
    isPassword, 
    showPass, 
    togglePass,
    value,
    onChangeText,
    ...props 
  }: any) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <View style={styles.iconLeft}>
          <Icon size={20} color={COLORS.textMuted} />
        </View>
        <TextInput
          style={[
            styles.input,
            focusedField === id && styles.inputFocused
          ]}
          placeholder={placeholder}
          placeholderTextColor={`${COLORS.textMuted}B3`}
          secureTextEntry={isPassword && !showPass}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setFocusedField(id)}
          onBlur={() => setFocusedField(null)}
          selectionColor={COLORS.primaryDark}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity 
            onPress={togglePass} 
            style={styles.iconRight}
            activeOpacity={0.7}
          >
            {showPass ? (
              <Eye size={20} color={COLORS.textMuted} />
            ) : (
              <EyeOff size={20} color={COLORS.textMuted} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const handleSignUp = async () => {
    // Basic validation
    if (!formData.fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }
    if (!formData.email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    if (!formData.password.trim()) {
      Alert.alert('Error', 'Please enter a password');
      return;
    }
    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (!agreed) {
      Alert.alert('Error', 'Please agree to the Terms & Conditions');
      return;
    }

    setLoading(true);
    
    try {
      const { data, error } = await signUp(
        formData.email.trim().toLowerCase(),
        formData.password,
        formData.fullName.trim()
      );

      if (error) {
        Alert.alert('Sign Up Failed', error.message || 'An error occurred during sign up');
        return;
      }

      if (data?.user) {
        Alert.alert(
          'Success!', 
          'Account created successfully! Please check your email to verify your account.',
          [
            {
              text: 'OK',
              onPress: () => onSignUp?.()
            }
          ]
        );
      }
    } catch (err: any) {
      Alert.alert('Error', err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surfaceLight} />
      
      {/* Top App Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ArrowLeft size={24} color={COLORS.textMain} />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Sign Up</Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title}>Create your account</Text>
            <Text style={styles.subtitle}>
              Fresh groceries delivered to your door within minutes.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <InputField 
              id="fullname"
              label="Full Name" 
              icon={User} 
              placeholder="Enter your full name"
              value={formData.fullName}
              onChangeText={(text: string) => setFormData({...formData, fullName: text})}
            />
            
            <InputField 
              id="email"
              label="Email Address" 
              icon={Mail} 
              placeholder="name@example.com" 
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(text: string) => setFormData({...formData, email: text})}
            />
            
            <InputField 
              id="password"
              label="Password" 
              icon={Lock} 
              placeholder="Create a password" 
              isPassword
              showPass={showPassword}
              togglePass={() => setShowPassword(!showPassword)}
              value={formData.password}
              onChangeText={(text: string) => setFormData({...formData, password: text})}
            />
            
            <InputField 
              id="confirm"
              label="Confirm Password" 
              icon={Lock} 
              placeholder="Confirm your password" 
              isPassword
              showPass={showConfirmPassword}
              togglePass={() => setShowConfirmPassword(!showConfirmPassword)}
              value={formData.confirmPassword}
              onChangeText={(text: string) => setFormData({...formData, confirmPassword: text})}
            />

            {/* Terms Checkbox */}
            <View style={styles.termsContainer}>
              <TouchableOpacity 
                style={[styles.checkbox, agreed && styles.checkboxChecked]}
                onPress={() => setAgreed(!agreed)}
                activeOpacity={0.8}
              >
                {agreed && <Check size={14} color={COLORS.textMain} strokeWidth={3} />}
              </TouchableOpacity>
              <Text style={styles.termsText}>
                I agree to the <Text style={styles.link}>Terms & Conditions</Text> and{' '}
                <Text style={styles.link}>Privacy Policy</Text>.
              </Text>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity 
              style={[styles.signUpButton, loading && styles.signUpButtonDisabled]} 
              activeOpacity={0.9}
              onPress={handleSignUp}
              disabled={loading}
            >
              <Text style={styles.signUpButtonText}>
                {loading ? 'Creating Account...' : 'Sign Up'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Buttons */}
          <View style={styles.socialContainer}>
            <View style={styles.socialRow}>
              <TouchableOpacity 
                style={styles.socialButton} 
                activeOpacity={0.7}
                onPress={onGoogleSignUp}
              >
                <GoogleIcon size={20} />
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.socialButton} 
                activeOpacity={0.7}
                onPress={onFacebookSignUp}
              >
                <User size={20} />
                <Text style={styles.socialButtonText}>Guest</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Link */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already a member? <Text style={styles.loginLink} onPress={onLogin}>Log In</Text>
            </Text>
          </View>

          <View style={{ height: 32 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surfaceLight,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.surfaceLight,
    zIndex: 10,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textMain,
    textAlign: 'center',
    flex: 1,
  },
  placeholder: {
    width: 48,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
    marginTop: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.textMain,
    marginBottom: 8,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textMuted,
    lineHeight: 24,
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textMain,
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    height: 48,
    backgroundColor: COLORS.surfaceLight,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingLeft: 44,
    paddingRight: 44,
    fontSize: 16,
    color: COLORS.textMain,
  },
  inputFocused: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  iconLeft: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  iconRight: {
    position: 'absolute',
    right: 12,
    zIndex: 1,
    padding: 4,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surfaceLight,
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  termsText: {
    fontSize: 14,
    color: COLORS.textMuted,
    flex: 1,
    lineHeight: 20,
  },
  link: {
    fontWeight: '600',
    color: COLORS.textMain,
  },
  signUpButton: {
    height: 48,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  signUpButtonDisabled: {
    backgroundColor: COLORS.textMuted,
    opacity: 0.6,
  },
  signUpButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#102216',
    letterSpacing: 0.5,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    marginHorizontal: 16,
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  socialContainer: {
    gap: 16,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 16,
  },
  socialButton: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surfaceLight,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    gap: 8,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textMain,
  },
  guestButton: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.backgroundLight,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    gap: 8,
  },
  guestButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: COLORS.textMain,
  },
  loginLink: {
    fontWeight: '700',
    color: COLORS.primaryDark,
  },
});