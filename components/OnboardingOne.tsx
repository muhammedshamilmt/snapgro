import React from 'react';
import {
    Dimensions,
    Image,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// Theme Configuration based on Tailwind config
const COLORS = {
  primary: '#2bee6c',
  backgroundLight: '#f6f8f6',
  backgroundDark: '#102216',
  slate900: '#0f172a',
  slate800: '#1e293b',
  slate600: '#475569',
  slate500: '#64748b',
  slate400: '#94a3b8',
  slate300: '#cbd5e1',
  slate200: '#e2e8f0',
  white: '#ffffff',
  black: '#000000',
  textDark: '#102216', // Specific dark text for primary button
};

const IMAGE_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuA2DugvzcfOGOBegrwl-p9-ihIhsotVFY1GOp0ULY0JYxcePSmdeGYBNY2avagyAbdNNOtJem6EJTkDlK4_kWuv2G7FXoktmrUubvnlS0dmsgLpuuqc_p4EuXFEAkAelEZxa8dfNhKfiVr6c77Akqa4uuehQ8927NqafYT1EzVvLuMad0rFjdlrvfw5nbTjl8un1Pe6g0aR1ODD4xXG0o6ee3ALcsVNWkKTsMhGgvoxc0iNbMuMpafOCYmwX8rh--j0Wc224F4P1Zzu";

interface OnboardingOneProps {
  onSkip?: () => void;
  onNext?: () => void;
}

export default function OnboardingOne({ onSkip, onNext }: OnboardingOneProps) {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const styles = getStyles(isDarkMode);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? COLORS.backgroundDark : COLORS.backgroundLight}
      />
      
      {/* Top App Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content Area */}
      <View style={styles.contentContainer}>
        {/* Hero Illustration Container */}
        <View style={styles.heroContainer}>
          {/* Decorative Background Glow */}
          <View style={styles.glowOuter} />
          <View style={styles.glowInner} />
          
          {/* Main Hero Image */}
          <Image
            source={{ uri: IMAGE_URL }}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </View>

        {/* Headline Text */}
        <View style={styles.headlineContainer}>
          <Text style={styles.headlineText}>Freshness Delivered</Text>
        </View>

        {/* Body Text */}
        <View style={styles.bodyContainer}>
          <Text style={styles.bodyText}>
            Get high-quality fruits, vegetables, and pantry staples delivered to your door in minutes, not hours.
          </Text>
        </View>
      </View>

      {/* Footer / Navigation Controls */}
      <View style={styles.footer}>
        {/* Page Indicators */}
        <View style={styles.indicatorsContainer}>
          {/* Active Indicator */}
          <View style={styles.indicatorActive} />
          {/* Inactive Indicators */}
          <View style={styles.indicatorInactive} />
          <View style={styles.indicatorInactive} />
        </View>

        {/* Primary Action Button */}
        <TouchableOpacity 
          style={styles.primaryButton} 
          activeOpacity={0.9}
          onPress={onNext}
        >
          <Text style={styles.primaryButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const getStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? COLORS.backgroundDark : COLORS.backgroundLight,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 24 : 12,
    paddingBottom: 12,
    zIndex: 20,
  },
  skipButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  skipText: {
    color: isDark ? COLORS.slate400 : COLORS.slate500,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginTop: -32, // Matches -mt-8
  },
  heroContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: 340,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  // Simulating the blur-3xl glow using opacity layers
  glowOuter: {
    position: 'absolute',
    width: 256, // w-64
    height: 256, // h-64
    borderRadius: 128,
    backgroundColor: COLORS.primary,
    opacity: isDark ? 0.1 : 0.2,
    transform: [{ scale: 1.2 }], // Simulating spread
  },
  glowInner: {
    position: 'absolute',
    width: 192, // w-48
    height: 192, // h-48
    borderRadius: 96,
    backgroundColor: COLORS.primary,
    opacity: isDark ? 0.2 : 0.3,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    zIndex: 10,
  },
  headlineContainer: {
    width: '100%',
    paddingBottom: 12,
    paddingTop: 8,
    alignItems: 'center',
  },
  headlineText: {
    color: isDark ? COLORS.white : COLORS.slate900,
    fontSize: 32,
    fontWeight: '800', // extrabold
    lineHeight: 35.2, // leading-[1.1]
    textAlign: 'center',
    letterSpacing: -0.5, // tracking-tight
  },
  bodyContainer: {
    width: '100%',
    maxWidth: 320, // max-w-xs
    alignItems: 'center',
  },
  bodyText: {
    color: isDark ? COLORS.slate300 : COLORS.slate600,
    fontSize: 16,
    fontWeight: '400', // normal
    lineHeight: 24, // leading-relaxed
    textAlign: 'center',
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    gap: 32, // gap-8
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 8,
    zIndex: 20,
    // Fallback for gradient: solid background matching theme
    backgroundColor: isDark ? COLORS.backgroundDark : COLORS.backgroundLight,
  },
  indicatorsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12, // gap-3
  },
  indicatorActive: {
    height: 8,
    width: 32,
    borderRadius: 9999,
    backgroundColor: COLORS.primary,
    // Shadow for active indicator
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  indicatorInactive: {
    height: 8,
    width: 8,
    borderRadius: 9999,
    backgroundColor: isDark ? COLORS.slate600 : COLORS.slate300, // Adjusted for visibility
  },
  primaryButton: {
    width: '100%',
    height: 56, // h-14
    backgroundColor: COLORS.primary,
    borderRadius: 12, // rounded-xl
    alignItems: 'center',
    justifyContent: 'center',
    // Shadow
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonText: {
    color: COLORS.textDark,
    fontSize: 18, // text-lg
    fontWeight: '700', // font-bold
    letterSpacing: 0.5, // tracking-wide
  },
});