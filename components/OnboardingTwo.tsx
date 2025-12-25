import { ArrowRight, History } from 'lucide-react-native';
import React from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#2bee6c',
  backgroundLight: '#f6f8f6',
  backgroundDark: '#102216',
  textLight: '#111813',
  textDark: '#ffffff',
  grayLight: '#4b5563', // gray-600
  grayDark: '#d1d5db', // gray-300
  inactiveLight: '#d1d5db', // gray-300
  inactiveDark: '#374151', // gray-700
  buttonTextDark: '#102216',
};

interface OnboardingTwoProps {
  onSkip?: () => void;
  onNext?: () => void;
  onBack?: () => void;
}

export default function OnboardingTwo({ onSkip, onNext, onBack }: OnboardingTwoProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const themeStyles = {
    container: {
      backgroundColor: isDark ? COLORS.backgroundDark : COLORS.backgroundLight,
    },
    text: {
      color: isDark ? COLORS.textDark : COLORS.textLight,
    },
    subText: {
      color: isDark ? COLORS.grayDark : COLORS.grayLight,
    },
    skipButton: {
      backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'transparent',
    },
    badgeBorder: {
      borderColor: isDark ? COLORS.backgroundDark : COLORS.backgroundLight,
    },
    inactiveDot: {
      backgroundColor: isDark ? COLORS.inactiveDark : COLORS.inactiveLight,
    },
    secondaryButtonText: {
      color: isDark ? '#9ca3af' : '#6b7280', // gray-400 : gray-500
    },
  };

  return (
    <SafeAreaView style={[styles.container, themeStyles.container]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? COLORS.backgroundDark : COLORS.backgroundLight}
      />

      {/* Header: Skip Button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={[styles.skipButton, themeStyles.skipButton]}
          activeOpacity={0.7}
          onPress={onSkip}
        >
          <Text style={[styles.skipText, themeStyles.text]}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Hero Illustration */}
        <View style={styles.heroContainer}>
          <View style={[styles.imageCard, styles.shadow]}>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAsSL-J3QfxBdta11e6YLQmrtpaGm1iHWHiKDXYkcNRUE5s7gq7WBEaOk4n5Mzj9SvO0U23F9J4WLxFugMf0cj1hM68dxSOWHlM5O4r4IkI9uOYgFtfRDIFUzL0mcVF4SwWRM_pwqcP0cgPTtjSI_qAS4CbGzfMT3QLjo7U5ifdPpspIEHzdv8WuF2L_eO43Vi_FRuEjtaHD4VoZX5pVeagYGAwQf8i1f4iHuTxEXUzce8g05E8r20S7pwhsMn0aikdzTxLDeIP66s',
              }}
              style={styles.heroImage}
              resizeMode="cover"
            />
            {/* Subtle Overlay */}
            <View style={styles.imageOverlay} />
          </View>

          {/* Floating Badge Icon */}
          <View style={[styles.badge, themeStyles.badgeBorder]}>
            <History color="#102216" size={32} strokeWidth={2} />
          </View>
        </View>

        {/* Content */}
        <View style={styles.textContent}>
          {/* Page Indicators */}
          <View style={styles.indicators}>
            <View style={[styles.dot, themeStyles.inactiveDot]} />
            <View style={[styles.activeBar, styles.activeBarShadow]} />
            <View style={[styles.dot, themeStyles.inactiveDot]} />
          </View>

          {/* Headline */}
          <Text style={[styles.headline, themeStyles.text]}>
            Easy Shopping &{'\n'}Quick Reorders
          </Text>

          {/* Body Text */}
          <Text style={[styles.bodyText, themeStyles.subText]}>
            Save your favorite lists and reorder your weekly essentials in just one tap. We make keeping your pantry full effortless.
          </Text>
        </View>
      </ScrollView>

      {/* Footer: Navigation Buttons */}
      <View style={[styles.footer, themeStyles.container]}>
        <View style={styles.footerContent}>
          {/* Primary Action: Next */}
          <TouchableOpacity 
            style={styles.primaryButton} 
            activeOpacity={0.9}
            onPress={onNext}
          >
            <Text style={styles.primaryButtonText}>Next</Text>
            <ArrowRight 
              color="#102216" 
              size={20} 
              strokeWidth={2.5} 
              style={styles.iconSpacing} 
            />
          </TouchableOpacity>

          {/* Secondary Action: Back */}
          <TouchableOpacity 
            style={styles.secondaryButton}
            activeOpacity={0.7}
            onPress={onBack}
          >
            <Text style={[styles.secondaryButtonText, themeStyles.secondaryButtonText]}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
    alignItems: 'flex-end',
    zIndex: 20,
  },
  skipButton: {
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipText: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.25,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
  },
  heroContainer: {
    width: '100%',
    marginBottom: 32,
    position: 'relative',
  },
  imageCard: {
    width: '100%',
    aspectRatio: 0.8, // 4/5
    borderRadius: 24,
    backgroundColor: '#fff',
    overflow: 'hidden',
    position: 'relative',
  },
  shadow: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.05)', // Subtle darkening
  },
  badge: {
    position: 'absolute',
    bottom: -24,
    right: 24,
    width: 64,
    height: 64,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    transform: [{ rotate: '3deg' }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 10,
  },
  textContent: {
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    marginTop: 16,
  },
  indicators: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activeBar: {
    width: 32,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  activeBarShadow: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  headline: {
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 20,
  },
  bodyText: {
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 10,
    paddingTop: 16,
    zIndex: 20,
  },
  footerContent: {
    flexDirection: 'column',
    gap: 12,
  },
  primaryButton: {
    width: '100%',
    height: 56,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: COLORS.buttonTextDark,
    fontSize: 18,
    fontWeight: '700',
  },
  iconSpacing: {
    marginLeft: 8,
  },
  secondaryButton: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});