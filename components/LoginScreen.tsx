import { ArrowLeft, CircleHelp, Eye, EyeOff, Lock, Mail, User } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Alert,
    Image,
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

const COLORS = {
  primary: '#2bee6c',
  primaryLight: 'rgba(43, 238, 108, 0.1)',
  primaryRing: 'rgba(43, 238, 108, 0.3)',
  backgroundLight: '#f6f8f6',
  slate900: '#0f172a',
  slate700: '#334155',
  slate600: '#475569',
  slate500: '#64748b',
  slate400: '#94a3b8',
  slate200: '#e2e8f0',
  white: '#ffffff',
};

interface LoginScreenProps {
  onBack?: () => void;
  onHelp?: () => void;
  onLogin?: () => void;
  onForgotPassword?: () => void;
  onGoogleLogin?: () => void;
  onGuestLogin?: () => void;
  onSignUp?: () => void;
}

export default function LoginScreen({
  onBack,
  onHelp,
  onLogin,
  onForgotPassword,
  onGoogleLogin,
  onGuestLogin,
  onSignUp,
}: LoginScreenProps) {
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Basic validation
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter your password');
      return;
    }

    setLoading(true);
    
    try {
      const { data, error } = await signIn(
        email.trim().toLowerCase(),
        password
      );

      if (error) {
        Alert.alert('Login Failed', error.message || 'Invalid email or password');
        return;
      }

      if (data?.user) {
        onLogin?.();
      }
    } catch (err: any) {
      Alert.alert('Error', err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.backgroundLight} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.iconButton} onPress={onBack}>
              <ArrowLeft size={24} color={COLORS.slate900} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={onHelp}>
              <CircleHelp size={24} color={COLORS.slate500} />
            </TouchableOpacity>
          </View>

          <View style={styles.contentContainer}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <View style={styles.logoWrapper}>
                <Image
                  source={{
                    uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeUOsdnYFeT4lU_NgKxA_ZyAvwxwhNDVcj8nczJUAIU1RO4yfSqPZKzADxmbbDuRh6NqzEBueCwwIQ-sbe18RauyE64MLVfY0gPTE1pUc7yL5qSsDm28WfMQwBn5AUv5b7Hsd_70zi5vjwkBvBsd4iEfRa8QfZLQ_fWYDfn3ZsObB3xjVzZBO5pFL15GlgkmumSepHM1kgrleKZmO97IPbzku1_Cc8EFc-99BUy1yLCwUcDXY4R76g0PigewhlQKj6BvainyCPpJQj',
                  }}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </View>
            </View>

            {/* Welcome Text */}
            <View style={styles.textContainer}>
              <Text style={styles.title}>Welcome Back!</Text>
              <Text style={styles.subtitle}>Login to continue shopping for fresh groceries.</Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              {/* Email Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email or Username</Text>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputIconLeft}>
                    <Mail size={20} color={COLORS.slate400} />
                  </View>
                  <TextInput
                    style={[
                      styles.input,
                      emailFocused && styles.inputFocused,
                    ]}
                    placeholder="you@example.com"
                    placeholderTextColor={COLORS.slate400}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputIconLeft}>
                    <Lock size={20} color={COLORS.slate400} />
                  </View>
                  <TextInput
                    style={[
                      styles.input,
                      passwordFocused && styles.inputFocused,
                      { paddingRight: 48 }
                    ]}
                    placeholder="••••••••"
                    placeholderTextColor={COLORS.slate400}
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                  />
                  <TouchableOpacity
                    style={styles.inputIconRight}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={20} color={COLORS.slate400} />
                    ) : (
                      <Eye size={20} color={COLORS.slate400} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Forgot Password */}
              <View style={styles.forgotPasswordContainer}>
                <TouchableOpacity onPress={onForgotPassword}>
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              {/* Login Button */}
              <TouchableOpacity 
                style={[styles.loginButton, loading && styles.loginButtonDisabled]} 
                activeOpacity={0.8}
                onPress={handleLogin}
                disabled={loading}
              >
                <Text style={styles.loginButtonText}>
                  {loading ? 'Logging In...' : 'Log In'}
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
            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity 
                style={styles.socialButton} 
                activeOpacity={0.8}
                onPress={onGoogleLogin}
              >
                <View style={styles.socialIconWrapper}>
                  <GoogleIcon size={24} />
                </View>
                <Text style={styles.socialButtonText}>Continue with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.socialButton} 
                activeOpacity={0.8}
                onPress={onGuestLogin}
              >
                <View style={styles.socialIconWrapper}>
                  <User size={24} color={COLORS.slate500} />
                </View>
                <Text style={styles.socialButtonText}>Continue as Guest</Text>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account?</Text>
              <TouchableOpacity onPress={onSignUp}>
                <Text style={styles.signUpText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  logoWrapper: {
    width: 96,
    height: 96,
    borderRadius: 24,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.primaryRing,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  logoImage: {
    width: 56,
    height: 56,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    color: COLORS.slate900,
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    color: COLORS.slate500,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    color: COLORS.slate900,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  inputWrapper: {
    position: 'relative',
    height: 56,
  },
  input: {
    flex: 1,
    height: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.slate200,
    paddingLeft: 48,
    paddingRight: 16,
    fontSize: 16,
    color: COLORS.slate900,
  },
  inputFocused: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  inputIconLeft: {
    position: 'absolute',
    left: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
  },
  inputIconRight: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    color: COLORS.slate600,
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    height: 56,
    backgroundColor: COLORS.primary,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  loginButtonDisabled: {
    backgroundColor: COLORS.slate400,
    opacity: 0.6,
  },
  loginButtonText: {
    color: COLORS.slate900,
    fontSize: 18,
    fontWeight: '700',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.slate200,
  },
  dividerText: {
    marginHorizontal: 16,
    color: COLORS.slate400,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  socialButtonsContainer: {
    gap: 12,
  },
  socialButton: {
    height: 56,
    backgroundColor: COLORS.white,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: COLORS.slate200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  googleIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    left: 24,
  },
  socialIconWrapper: {
    position: 'absolute',
    left: 24,
  },
  socialButtonText: {
    color: COLORS.slate700,
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    marginTop: 32,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  footerText: {
    color: COLORS.slate500,
    fontSize: 14,
    fontWeight: '500',
  },
  signUpText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
  },
});