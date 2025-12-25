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

const COLORS = {
  primary: '#2bee6c',
  light: {
    background: '#f6f8f6',
    text: '#111813',
    textSecondary: 'rgba(17, 24, 19, 0.6)',
    textTertiary: 'rgba(17, 24, 19, 0.7)',
    indicatorInactive: 'rgba(17, 24, 19, 0.2)',
  },
  dark: {
    background: '#102216',
    text: '#f6f8f6',
    textSecondary: 'rgba(246, 248, 246, 0.6)',
    textTertiary: 'rgba(246, 248, 246, 0.7)',
    indicatorInactive: 'rgba(255, 255, 255, 0.2)',
  },
};

// Helper component to simulate a gradient fade using stacked views with varying opacity
const GradientFade = ({ color }: { color: string }) => {
  const steps = 24;
  return (
    <View style={styles.gradientContainer} pointerEvents="none">
      {Array.from({ length: steps }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.gradientSlice,
            {
              backgroundColor: color,
              // Quadratic easing for smoother fade from transparent (top) to opaque (bottom)
              opacity: Math.pow(i / (steps - 1), 2),
            },
          ]}
        />
      ))}
    </View>
  );
};

interface OnboardingThreeProps {
  onSkip?: () => void;
  onStartShopping?: () => void;
  onLogin?: () => void;
}

export default function OnboardingThree({ onSkip, onStartShopping, onLogin }: OnboardingThreeProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? COLORS.dark : COLORS.light;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      {/* Skip Button */}
      <View style={styles.skipWrapper}>
        <SafeAreaView>
          <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
            <Text style={[styles.skipText, { color: theme.textSecondary }]}>Skip</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>

      {/* Hero Image Section */}
      <View style={styles.heroSection}>
        <Image
          source={{
            uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIBgMEAH3YmLkRXam5qE9iX0JsOQug1hCMjSIiEr4KiVU5cMFE_hNMTXX4SwRxeAX4Jp2uB2sr5YOLrjg3UKB3oi0Y-Np2W_0Ro84uF6zM-Y_N_4wV5CbdRUSjfs-GpKKuqcYzx2l6w3kGYWLBI5FZfGDlvDBMZO8NpfM8TbtYBkkTpethVsWP-BZJmvvWNYuBfjU-ZeUu5pQG2XnJwnWClex57PmpaI7Ihwigc1BM6ZdzoCHH9Cyu4iralXKjeSbfb4UmJdP-g6l0',
          }}
          style={styles.heroImage}
          resizeMode="cover"
        />

        {/* Top Overlay (Simulating gradient from white/20 to transparent) */}
        <View 
          style={[styles.topOverlay, { backgroundColor: isDark ? '#000' : '#fff' }]} 
          pointerEvents="none" 
        />

        {/* Bottom Gradient Simulation (Fade to background) */}
        <GradientFade color={theme.background} />
      </View>

      {/* Content Section */}
      <View style={styles.contentSection}>
        {/* Indicators */}
        <View style={styles.indicatorsContainer}>
          <View style={[styles.dot, { backgroundColor: theme.indicatorInactive }]} />
          <View style={[styles.dot, { backgroundColor: theme.indicatorInactive }]} />
          <View style={[styles.activeDot, { backgroundColor: COLORS.primary }]} />
        </View>

        {/* Headline */}
        <View style={styles.headlineContainer}>
          <Text style={[styles.headline, { color: theme.text }]}>
            Ready to fill{'\n'}your fridge?
          </Text>
        </View>

        {/* Body Text
        <View style={styles.bodyContainer}>
          <Text style={[styles.bodyText, { color: theme.textTertiary }]}>
            Experience the freshest way to shop. No lines, no heavy bags, just joy delivered to your door in minutes.
          </Text>
        </View> */}

        {/* Primary Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: COLORS.primary }]}
            activeOpacity={0.9}
            onPress={onStartShopping}
          >
            <Text style={styles.primaryButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={onLogin}>
            <Text style={[styles.linkText, { color: theme.text }]}>Log in</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Spacer for Safe Area */}
        <SafeAreaView />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 20,
    width: '100%',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
  },
  skipButton: {
    // paddingVertical: 0,
    marginTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 10,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  heroSection: {
    flex: 1,
    minHeight: height * 0.55, // min-h-[55vh]
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  topOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    opacity: 0.2,
  },
  gradientContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 160, // Height of the fade transition
    flexDirection: 'column',
  },
  gradientSlice: {
    flex: 1,
    width: '100%',
  },
  contentSection: {
    marginTop: -48, // -mt-12
    paddingHorizontal: 24, // px-6
    paddingBottom: 20, // pb-10 (adjusted)
    alignItems: 'center',
    zIndex: 10,
  },
  indicatorsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8, // gap-2
    marginBottom: 24, // mb-6
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
  },
  activeDot: {
    height: 8,
    width: 32, // w-8
    borderRadius: 4,
    shadowColor: '#2bee6c',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  headlineContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16, // mb-4
  },
  headline: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 35, // leading-[1.1]
    textAlign: 'center',
    letterSpacing: -0.5, // tracking-tight
  },
//   bodyContainer: {
//     width: '100%',
//     alignItems: 'center',
//     marginBottom: 32, // mb-8
//     paddingHorizontal: 8, // px-2
//   },
//   bodyText: {
//     fontSize: 16,
//     fontWeight: '400',
//     lineHeight: 24, // leading-relaxed
//     textAlign: 'center',
//   },
  buttonContainer: {
    width: '100%',
    marginBottom: 20, // mb-5
  },
  primaryButton: {
    width: '100%',
    height: 56, // h-14
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2bee6c',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#111813',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.27, // tracking-[0.015em]
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '500',
  },
  linkText: {
    fontSize: 14,
    fontWeight: '700',
    textDecorationLine: 'underline',
    marginLeft: 4,
  },
});