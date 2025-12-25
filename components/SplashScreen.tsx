import { ShoppingBag } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen() {
  const animValue = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo entrance animation
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 600,
        delay: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    // Loading bar animation
    const runLoadingAnimation = () => {
      animValue.setValue(0);
      Animated.loop(
        Animated.timing(animValue, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        })
      ).start();
    };

    const timer = setTimeout(runLoadingAnimation, 1000);
    return () => clearTimeout(timer);
  }, [animValue, logoScale, logoOpacity, titleOpacity]);

  const widthInterp = animValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['20%', '60%', '20%'],
  });

  const translateInterp = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 250],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Top Spacer */}
      <View style={styles.spacer} />
      
      {/* Logo Section */}
      <Animated.View 
        style={[
          styles.logoSection,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }]
          }
        ]}
      >
        <View style={styles.logoWrapper}>
          {/* Rotated Background Layers */}
          <View style={[styles.logoBg, styles.logoBgRotatePos]} />
          <View style={[styles.logoBg, styles.logoBgRotateNeg]} />
          
          {/* Main Logo */}
          <View style={styles.logoMain}>
            <ShoppingBag color="#ffffff" size={64} strokeWidth={2} />
          </View>
        </View>
        
        <Animated.Text 
          style={[
            styles.title,
            { opacity: titleOpacity }
          ]}
        >
          FreshGrocery
        </Animated.Text>
      </Animated.View>
      
      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.loaderContainer}>
          <View style={styles.track}>
            <Animated.View 
              style={[
                styles.indicator, 
                { 
                  width: widthInterp,
                  transform: [{ translateX: translateInterp }] 
                }
              ]} 
            />
          </View>
          <Text style={styles.loadingText}>Loading Resources...</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  spacer: {
    flex: 1,
  },
  logoSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48,
    zIndex: 10,
  },
  logoWrapper: {
    width: 128,
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  logoBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 32,
  },
  logoBgRotatePos: {
    backgroundColor: 'rgba(43, 238, 108, 0.1)',
    transform: [{ rotate: '3deg' }],
  },
  logoBgRotateNeg: {
    backgroundColor: 'rgba(43, 238, 108, 0.2)',
    transform: [{ rotate: '-3deg' }],
  },
  logoMain: {
    width: '100%',
    height: '100%',
    backgroundColor: '#2bee6c',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 10,
  },
  title: {
    marginTop: 32,
    fontSize: 30,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.5,
  },
  bottomSection: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 64,
    paddingHorizontal: 48,
  },
  loaderContainer: {
    width: '100%',
    maxWidth: 240,
  },
  track: {
    height: 6,
    width: '100%',
    backgroundColor: '#f3f4f6',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  indicator: {
    height: '100%',
    backgroundColor: '#2bee6c',
    borderRadius: 9999,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 16,
    fontWeight: '500',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});