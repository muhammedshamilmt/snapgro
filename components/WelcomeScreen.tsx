import { ArrowRight, Leaf } from 'lucide-react-native';
import React from 'react';
import { Dimensions, Image, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const COLORS = {
  primary: '#2bee6c',
  backgroundDark: '#102216',
  white: '#ffffff',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  primaryTransparent: 'rgba(43, 238, 108, 0.2)',
  primaryBorder: 'rgba(43, 238, 108, 0.3)',
  glass: 'rgba(255, 255, 255, 0.1)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
};

interface WelcomeScreenProps {
  onGetStarted?: () => void;
  onLogin?: () => void;
}

export default function WelcomeScreen({ onGetStarted, onLogin }: WelcomeScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Background Image with Scale Effect */}
      <View style={styles.backgroundContainer}>
        <Image 
          source={{ 
            uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0MyPYqgrD_M_ksIcBx9bFnjWMjhjGs6BMO2GE3R_n_tHTbWGYhgEg6hQdj2bCmovTZOanmmbbxoSQ0pS1ca0vsIp3xMHeuDwYYrYfQ3u-1-iXZH1oXQuwcOuE5oza5YQoh_ItfrdHYM6APkL_I1fhR7W4DbW7PjSlh0aXbD0d3tX8Zv2DTGx528G_nIFvc3XV7OqNxWosG0PyIVK3KDJfo7-vxYZWMXiXD82Xs2hFdxc9r7-08-i_GHkPJjjkAGLhOx54s_65iVlz' 
          }}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        
        {/* Gradient Simulation Overlays */}
        <View style={styles.overlayBase} />
        <View style={styles.overlayBottom} />
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        {/* Header / Logo */}
        <View style={styles.header}>
          <View style={styles.logoPill}>
            <Leaf size={20} color={COLORS.primary} fill={COLORS.primary} />
            <Text style={styles.logoText}>FRESHGROCER</Text>
          </View>
        </View>

        {/* Bottom Content */}
        <View style={styles.bottomSection}>
          {/* Text Content */}
          <View style={styles.textWrapper}>
            <View style={styles.taglineContainer}>
              <Text style={styles.taglineText}>WAIT LESS, EAT FRESH</Text>
            </View>
            
            <Text style={styles.headline}>
              Organic food{'\n'}
              <Text style={styles.headlineHighlight}>right at your</Text>{'\n'}
              doorstep.
            </Text>
            
            <Text style={styles.description}>
              We deliver the freshest vegetables and fruits directly from local farms to your table in minutes.
            </Text>
          </View>

          {/* Actions */}
          <View style={styles.actionWrapper}>
            <TouchableOpacity 
              style={styles.button} 
              activeOpacity={0.9}
              onPress={onGetStarted}
            >
              <Text style={styles.buttonText}>Get Started</Text>
              <ArrowRight size={24} color={COLORS.backgroundDark} strokeWidth={2.5} />
            </TouchableOpacity>
            
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>
                Have an account? 
                <Text style={styles.loginLink} onPress={onLogin}> Log in</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Home Indicator */}
      <View style={styles.homeIndicatorContainer}>
        <View style={styles.homeIndicator} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    transform: [{ scale: 1.05 }],
  },
  // Simulates: bg-gradient-to-b from-black/40 via-black/20 to-black/90
  overlayBase: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  overlayBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)', // Darker gradient at bottom
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 60 : 56,
    paddingBottom: 40,
    zIndex: 10,
  },
  header: {
    alignItems: 'center',
  },
  logoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.glass,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  logoText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginLeft: 8,
  },
  bottomSection: {
    gap: 32,
    marginBottom: 16,
  },
  textWrapper: {
    gap: 16,
  },
  taglineContainer: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primaryTransparent,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    marginBottom: 8,
  },
  taglineText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  headline: {
    fontSize: 48,
    fontWeight: '700',
    color: COLORS.white,
    lineHeight: 52,
    letterSpacing: -1,
  },
  headlineHighlight: {
    color: COLORS.primary,
  },
  description: {
    fontSize: 18,
    color: COLORS.gray300,
    fontWeight: '300',
    lineHeight: 28,
    maxWidth: 320,
  },
  actionWrapper: {
    gap: 16,
  },
  button: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  buttonText: {
    color: COLORS.backgroundDark,
    fontSize: 18,
    fontWeight: '700',
    marginRight: 8,
  },
  loginContainer: {
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: COLORS.gray400,
  },
  loginLink: {
    color: COLORS.white,
    fontWeight: '500',
    marginLeft: 4,
  },
  homeIndicatorContainer: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 20,
  },
  homeIndicator: {
    width: 128,
    height: 6,
    borderRadius: 9999,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});