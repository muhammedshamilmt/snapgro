import { Bot, Home, List, ShoppingBasket, User } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  primaryDark: "#0d2319",
  navGreen: "#00e676",
  navIcon: "#5e806c",
  background: "#f8fcf9",
  white: "#ffffff",
  gray100: "#f3f4f6",
  gray500: "#6b7280",
  shadowNav: "rgba(0, 230, 118, 0.5)",
  shadowBar: "rgba(0,0,0,0.04)",
};

interface BottomNavigationProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
  cartCount?: number;
}

export default function BottomNavigation({ 
  activeTab, 
  onTabPress, 
  cartCount = 0 
}: BottomNavigationProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Bounce animation for center button
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bounceAnim]);

  const handleTabPress = (tab: string) => {
    // Scale animation for tab press
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onTabPress(tab);
  };

  const centerButtonTranslateY = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -5],
  });

  const NavItem = ({ 
    tab, 
    icon: Icon, 
    label, 
    fillIcon = false 
  }: {
    tab: string;
    icon: any;
    label: string;
    fillIcon?: boolean;
  }) => {
    const isActive = activeTab === tab;
    
    return (
      <TouchableOpacity 
        style={styles.navItem} 
        activeOpacity={0.7}
        onPress={() => handleTabPress(tab)}
      >
        <Animated.View style={{ transform: [{ scale: isActive ? scaleAnim : 1 }] }}>
          <Icon 
            size={28} 
            color={isActive ? COLORS.navGreen : COLORS.navIcon}
            fill={fillIcon && isActive ? COLORS.navGreen : (fillIcon ? COLORS.navIcon : 'none')}
            strokeWidth={isActive ? 2.5 : 1.5}
          />
        </Animated.View>
        <Text style={[
          styles.navLabel, 
          isActive && styles.navLabelActive
        ]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.navBarWrapper}>
      {/* Background Shadow/Border Layer */}
      <View style={styles.navBackground} />
      
      {/* Nav Items Container */}
      <SafeAreaView style={styles.navItemsContainer} edges={['bottom']}>
        {/* Home */}
        <NavItem tab="home" icon={Home} label="Home" fillIcon />
        
        {/* Category */}
        <NavItem tab="browse" icon={List} label="Category" />
        
        {/* Center Button */}
        <View style={styles.centerButtonContainer}>
          <Animated.View style={{
            transform: [{ translateY: centerButtonTranslateY }]
          }}>
            <TouchableOpacity 
              style={styles.centerButton} 
              activeOpacity={0.9}
              onPress={() => handleTabPress('cart')}
            >
              <ShoppingBasket 
                size={26} 
                color={COLORS.primaryDark} 
                fill={COLORS.primaryDark} 
              />
              {cartCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>
                    {cartCount > 99 ? '99+' : cartCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>
        </View>
        
        {/* AI Chef */}
        <NavItem tab="ai-chef" icon={Bot} label="AI Chef" fillIcon />
        
        {/* Profile */}
        <NavItem tab="profile" icon={User} label="Profile" fillIcon />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  navBarWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 88,
    backgroundColor: 'transparent',
    zIndex: 50,
  },
  navBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 88,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray100,
    // Shadow: shadow-[0_-5px_20px_rgba(0,0,0,0.04)]
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 5,
  },
  navItemsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
    paddingHorizontal: 16,
    paddingBottom: 8,
    paddingTop: 8,
    maxWidth: 448,
    width: '100%',
    alignSelf: 'center',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
    paddingBottom: 4,
    height: 50,
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.navIcon,
  },
  navLabelActive: {
    color: COLORS.navGreen,
  },
  centerButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
    zIndex: 20,
  },
  centerButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.navGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -22,
    borderWidth: 8,
    borderColor: COLORS.white,
    shadowColor: COLORS.navGreen,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#ff4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  cartBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
});