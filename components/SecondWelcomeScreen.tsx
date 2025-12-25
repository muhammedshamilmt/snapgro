import { HelpCircle, Leaf, Tractor } from 'lucide-react-native';
import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// Theme Colors based on Tailwind config
const COLORS = {
  primary: '#2bee6c',
  backgroundDark: '#09130cff',
  surfaceLight: '#ffffff',
  textMainDark: '#e0e7e2',
  textSecondaryDark: '#8fa898',
  white: '#ffffff',
};

interface SecondWelcomeScreenProps {
  onSignUp?: () => void;
  onSignIn?: () => void;
  onContinueAsGuest?: () => void;
  onHelp?: () => void;
}

export default function SecondWelcomeScreen({ 
  onSignUp, 
  onSignIn, 
  onContinueAsGuest, 
  onHelp 
}: SecondWelcomeScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Background Image */}
      <View style={styles.backgroundContainer}>
        <Image
          source={{
            uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0MyPYqgrD_M_ksIcBx9bFnjWMjhjGs6BMO2GE3R_n_tHTbWGYhgEg6hQdj2bCmovTZOanmmbbxoSQ0pS1ca0vsIp3xMHeuDwYYrYfQ3u-1-iXZH1oXQuwcOuE5oza5YQoh_ItfrdHYM6APkL_I1fhR7W4DbW7PjSlh0aXbD0d3tX8Zv2DTGx528G_nIFvc3XV7OqNxWosG0PyIVK3KDJfo7-vxYZWMXiXD82Xs2hFdxc9r7-08-i_GHkPJjjkAGLhOx54s_65iVlz',
          }}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        
        {/* Gradient Simulation Overlays */}
        {/* <View style={styles.overlayTop} /> */}
        <View style={styles.overlayBottom} />
      </View>

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Leaf size={20} color={COLORS.primary} fill={COLORS.primary} />
              <Text style={styles.logoText}>GrocerGo</Text>
            </View>
            <TouchableOpacity style={styles.iconButton} onPress={onHelp}>
              <HelpCircle size={24} color="rgba(255,255,255,0.8)" />
            </TouchableOpacity>
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            {/* Text Section */}
            <View style={styles.textSection}>
              {/* Tag */}
              <View style={styles.tag}>
                <Tractor size={18} color={COLORS.backgroundDark} />
                <Text style={styles.tagText}>FRESH PRODUCE</Text>
              </View>

              {/* Heading */}
              <View style={styles.headingContainer}>
                <Text style={styles.headingText}>
                  Quality you{'\n'}
                  <Text style={styles.headingHighlight}>can taste</Text>
                </Text>
              </View>

              {/* Description */}
              <Text style={styles.description}>
                Hand-picked fresh vegetables and fruits delivered from local farms to your table.
              </Text>
            </View>

            {/* Pagination Dots */}
            <View style={styles.pagination}>
              <View style={[styles.dot, styles.dotActive]} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>

            {/* Action Buttons */}
            <View style={styles.actionsContainer}>
              <View style={styles.buttonRow}>
                {/* Sign Up Button */}
                <TouchableOpacity 
                  style={styles.buttonPrimary} 
                  activeOpacity={0.9}
                  onPress={onSignUp}
                >
                  <Text style={styles.buttonPrimaryText}>Sign Up</Text>
                </TouchableOpacity>

                {/* Sign In Button */}
                <TouchableOpacity 
                  style={styles.buttonSecondary} 
                  activeOpacity={0.9}
                  onPress={onSignIn}
                >
                  <Text style={styles.buttonSecondaryText}>Login</Text>
                </TouchableOpacity>
              </View>

              {/* Guest Link */}
              <TouchableOpacity style={styles.guestButton} onPress={onContinueAsGuest}>
                <Text style={styles.guestText}>Continue as Guest</Text>
              </TouchableOpacity>
            </View>

            {/* Home Indicator */}
            <View style={styles.homeIndicatorContainer}>
              <View style={styles.homeIndicator} />
            </View>
          </View>
        </View>
      </SafeAreaView>
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
    zIndex: 0,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    transform: [{ scale: 1.05 }], // Matching scale-105
  },
  // Simulating gradients with solid semi-transparent views
  // overlayTop: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   // height: height * 0.3,
  //   backgroundColor: 'rgba(0,0,0,0.3)',
  // },
  overlayBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 10,
    backgroundColor: COLORS.backgroundDark,
    opacity: 0.75, // Simulating the fade to dark background
  },
  safeArea: {
    flex: 1,
    zIndex: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 20 : 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  logoText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  iconButton: {
    padding: 8,
    borderRadius: 9999,
    backgroundColor: 'transparent',
  },
  mainContent: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    justifyContent: 'flex-end',
    flex: 1,
  },
  textSection: {
    marginBottom: 32,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
    backgroundColor: 'rgba(43, 238, 108, 0.9)', // Primary with opacity
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  tagText: {
    color: COLORS.backgroundDark,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  headingContainer: {
    marginBottom: 16,
  },
  headingText: {
    fontSize: 48,
    fontWeight: '700',
    color: COLORS.white,
    lineHeight: 52,
  },
  headingHighlight: {
    color: COLORS.primary,
  },
  description: {
    fontSize: 18,
    color: '#d1d5db', // Gray-300 equivalent
    lineHeight: 28,
    maxWidth: 320,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 32,
  },
  dot: {
    height: 6,
    width: 8,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dotActive: {
    width: 32,
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  actionsContainer: {
    gap: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
  },
  buttonPrimary: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  buttonPrimaryText: {
    color: COLORS.backgroundDark,
    fontSize: 16,
    fontWeight: '700',
  },
  buttonSecondary: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondaryText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  guestButton: {
    width: '100%',
    paddingVertical: 8,
    alignItems: 'center',
  },
  guestText: {
    color: COLORS.textSecondaryDark,
    fontSize: 14,
    fontWeight: '500',
  },
  homeIndicatorContainer: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 8,
  },
  homeIndicator: {
    width: width * 0.33,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
  },
});