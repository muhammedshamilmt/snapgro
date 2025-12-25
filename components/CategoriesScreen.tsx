import { ArrowLeft, Search } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation from './BottomNavigation';

const { width } = Dimensions.get('window');
const GAP = 16;
const PADDING = 16;
const ITEM_WIDTH = (width - PADDING * 2 - GAP) / 2;

const COLORS = {
  primary: '#2bee6c',
  backgroundLight: '#f6f8f6',
  surfaceLight: '#ffffff',
  textMainLight: '#111813',
  textSecondaryLight: '#61896f',
  grayBorder: '#f3f4f6', // gray-100
  grayBorderDark: '#e5e7eb', // gray-200
};

const CATEGORIES = [
  {
    id: 1,
    title: 'Vegetables',
    count: '142 items',
    bg: '#E8F5E9',
    textColor: '#14532d', // green-900
    subTextColor: 'rgba(21, 128, 61, 0.7)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDR0PUEz5dV9VqC11HvSARBayzKYwyOj5eb1nIIYcX08ZSCXvetanXnuzI7PisS1zXDM50amsf0fowrf60Xjcp6usJnbDep01t_ZLFRFp40_AmlkouqH4Brqnbs1aYHAfyULJmRPM-ONWkDkNCabWZGN4SXWJ16ekbJQuNbVdDrBix0ZGpfTB92_pdYdc37M5CM7r8GIDEtUnho706l-GfALctMiEHpCMqqJ-1bPNj_jtqJpzEhOAhFgZXqsRJc-G57iJyvdur0ELGC',
    imageStyle: { bottom: -8, right: -8, width: 112, height: 112 },
  },
  {
    id: 2,
    title: 'Fruits',
    count: '85 items',
    bg: '#FFF3E0',
    textColor: '#7c2d12', // orange-900
    subTextColor: 'rgba(194, 65, 12, 0.7)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdfHgbnDxNcJQS4ZczOUycUKcbD0MeQ2bKC9TSkqU0OAyHwMBUOYtTxO9esYvX3ieagPKBj1gMuUcZY0VchGYBRF6yCqzyER__Bi1ZO1Rsy6_d_tL718dZb47DafCoyAda9Wq0zkNrnk6qWkZWjgWbXxdYDZx5_e8UHxF7pv5Wg_ghwNgXeM7zEXFCp9pNw-UyHLe8TKxakJge4PyS2QiM-HT0oXIilGAabafRDHCHWGkhcDp1lb6xnW2p6iDbxkCvdpVPpVYHKaXe',
    imageStyle: { bottom: 4, right: 4, width: 96, height: 96 },
  },
  {
    id: 3,
    title: 'Dairy & Eggs',
    count: '60 items',
    bg: '#E3F2FD',
    textColor: '#1e3a8a', // blue-900
    subTextColor: 'rgba(29, 78, 216, 0.7)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgnUNjhJeeGbGZA8xpTz90FPfHQk6ezGhJ4pWVlYR12Bm80pNtfNJoqqpnTQ-p9tZKJS-lzn5ISynYyhScBkiX0ZvA2z8OIAOx75ZH8vm37zEVtg_9hPit8VW6_NaSK0i9SMhw6PkuXR9r4WYtI6m1x-E0n2RyrZ5IiLvdfzlV6l2B_ny9cfWGX7lzpXgPTU7_bOnGiGrdmaph1A-BIsElqR4kPyjMZ0wibmIFMkYnoDPKXp4BN7g7DUBgFDZxMl6Smy0C_ZKry2DV',
    imageStyle: { bottom: 8, right: 8, width: 96, height: 96 },
  },
  {
    id: 4,
    title: 'Bakery',
    count: '45 items',
    bg: '#FFF8E1',
    textColor: '#78350f', // amber-900
    subTextColor: 'rgba(180, 83, 9, 0.7)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS8LgHVXPsaasZ3lAhUACgHDSdRPGrVV1TFnSrcT7UwyNoJvw0aL1728bE2g2qakcbGXhWBPolXXOr1eqVsSq0G_8uwfIxwfe9e0i5gPhfq5_0PCxU0fAvzeLA5cjHikbKPuGmGBo-0OPAiS_b0L-UVkAYpuaqlWf-76QDMW06sn2OrXbqUdjWAZVhpKdqj3B78tXxZnbGHCErdXAq1DEA_hysqTbttwbYAtzy3xW5RtE2NCDMmJIprzJQh5539TFeQePz4lrKfa24',
    imageStyle: { bottom: 0, right: 0, width: 112, height: 112 },
  },
  {
    id: 5,
    title: 'Organic',
    count: 'Special Deals',
    bg: '#F1F8E9',
    textColor: '#365314', // lime-900
    subTextColor: 'rgba(77, 124, 15, 0.7)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0MyPYqgrD_M_ksIcBx9bFnjWMjhjGs6BMO2GE3R_n_tHTbWGYhgEg6hQdj2bCmovTZOanmmbbxoSQ0pS1ca0vsIp3xMHeuDwYYrYfQ3u-1-iXZH1oXQuwcOuE5oza5YQoh_ItfrdHYM6APkL_I1fhR7W4DbW7PjSlh0aXbD0d3tX8Zv2DTGx528G_nIFvc3XV7OqNxWosG0PyIVK3KDJfo7-vxYZWMXiXD82Xs2hFdxc9r7-08-i_GHkPJjjkAGLhOx54s_65iVlz',
    imageStyle: { bottom: -16, right: -16, width: 128, height: 128, borderRadius: 64 },
  },
  {
    id: 6,
    title: 'Fresh Juice',
    count: '28 items',
    bg: '#FBE9E7',
    textColor: '#7f1d1d', // red-900
    subTextColor: 'rgba(185, 28, 28, 0.7)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdfHgbnDxNcJQS4ZczOUycUKcbD0MeQ2bKC9TSkqU0OAyHwMBUOYtTxO9esYvX3ieagPKBj1gMuUcZY0VchGYBRF6yCqzyER__Bi1ZO1Rsy6_d_tL718dZb47DafCoyAda9Wq0zkNrnk6qWkZWjgWbXxdYDZx5_e8UHxF7pv5Wg_ghwNgXeM7zEXFCp9pNw-UyHLe8TKxakJge4PyS2QiM-HT0oXIilGAabafRDHCHWGkhcDp1lb6xnW2p6iDbxkCvdpVPpVYHKaXe',
    imageStyle: { bottom: 8, right: 8, width: 96, height: 96 },
  },
  {
    id: 7,
    title: 'Snacks',
    count: '92 items',
    bg: '#F3E5F5',
    textColor: '#581c87', // purple-900
    subTextColor: 'rgba(126, 34, 206, 0.7)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS8LgHVXPsaasZ3lAhUACgHDSdRPGrVV1TFnSrcT7UwyNoJvw0aL1728bE2g2qakcbGXhWBPolXXOr1eqVsSq0G_8uwfIxwfe9e0i5gPhfq5_0PCxU0fAvzeLA5cjHikbKPuGmGBo-0OPAiS_b0L-UVkAYpuaqlWf-76QDMW06sn2OrXbqUdjWAZVhpKdqj3B78tXxZnbGHCErdXAq1DEA_hysqTbttwbYAtzy3xW5RtE2NCDMmJIprzJQh5539TFeQePz4lrKfa24',
    imageStyle: { bottom: 0, right: 0, width: 96, height: 96, transform: [{ rotate: '-12deg' }] },
  },
  {
    id: 8,
    title: 'Beverages',
    count: '54 items',
    bg: '#E0F7FA',
    textColor: '#164e63', // cyan-900
    subTextColor: 'rgba(14, 116, 144, 0.7)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgnUNjhJeeGbGZA8xpTz90FPfHQk6ezGhJ4pWVlYR12Bm80pNtfNJoqqpnTQ-p9tZKJS-lzn5ISynYyhScBkiX0ZvA2z8OIAOx75ZH8vm37zEVtg_9hPit8VW6_NaSK0i9SMhw6PkuXR9r4WYtI6m1x-E0n2RyrZ5IiLvdfzlV6l2B_ny9cfWGX7lzpXgPTU7_bOnGiGrdmaph1A-BIsElqR4kPyjMZ0wibmIFMkYnoDPKXp4BN7g7DUBgFDZxMl6Smy0C_ZKry2DV',
    imageStyle: { bottom: 8, right: 8, width: 96, height: 96 },
  },
];

const FILTERS = ['All', 'Weekly Offers', 'New Arrivals', 'Bundles'];

interface CategoriesScreenProps {
  onBack?: () => void;
  onCategorySelect?: (category: any) => void;
  onSearch?: () => void;
  onNavigate?: (screen: string) => void;
  cartCount?: number;
}

export default function CategoriesScreen({ 
  onBack, 
  onCategorySelect, 
  onSearch,
  onNavigate,
  cartCount = 0
}: CategoriesScreenProps) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('browse');

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'home') {
      onNavigate?.('home');
    } else if (tab === 'cart') {
      onNavigate?.('cart');
    } else if (tab === 'ai-chef') {
      onNavigate?.('ai-chef');
    } else if (tab === 'profile') {
      onNavigate?.('profile');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.backgroundLight} />
      
      <View style={styles.contentContainer}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity style={styles.backButton} onPress={onBack}>
                <ArrowLeft size={24} color={COLORS.textMainLight} />
              </TouchableOpacity>
              <View style={styles.headerTextContainer}>
                <Text style={styles.headerTitle}>All Categories</Text>
                <Text style={styles.headerSubtitle}>Find products for your daily needs</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.searchButton} onPress={onSearch}>
              <Search size={24} color={COLORS.textMainLight} />
            </TouchableOpacity>
          </View>

          {/* Filters */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.filtersContainer}
            contentContainerStyle={styles.filtersContent}
          >
            {FILTERS.map((filter) => {
              const isActive = filter === selectedFilter;
              return (
                <TouchableOpacity
                  key={filter}
                  style={[
                    styles.filterButton,
                    isActive ? styles.filterButtonActive : styles.filterButtonInactive
                  ]}
                  onPress={() => setSelectedFilter(filter)}
                >
                  <Text style={[
                    styles.filterText,
                    isActive ? styles.filterTextActive : styles.filterTextInactive
                  ]}>
                    {filter}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Grid */}
          <View style={styles.grid}>
            {CATEGORIES.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.card, { backgroundColor: item.bg }]}
                activeOpacity={0.95}
                onPress={() => onCategorySelect?.(item)}
              >
                <View style={styles.cardContent}>
                  <Text style={[styles.cardTitle, { color: item.textColor }]}>
                    {item.title}
                  </Text>
                  <View style={styles.badgeContainer}>
                    <Text style={[styles.badgeText, { color: item.subTextColor }]}>
                      {item.count}
                    </Text>
                  </View>
                </View>
                <Image
                  source={{ uri: item.image }}
                  style={[styles.cardImage, item.imageStyle]}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeTab}
        onTabPress={handleTabPress}
        cartCount={cartCount}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: PADDING,
    paddingTop: 16,
    paddingBottom: 120, // Space for bottom navigation
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.grayBorder,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textMainLight,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondaryLight,
    marginTop: 2,
  },
  searchButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.grayBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  filtersContainer: {
    marginBottom: 24,
    marginHorizontal: -PADDING, // Allow full width scroll
  },
  filtersContent: {
    paddingHorizontal: PADDING,
    gap: 8,
    paddingBottom: 8, // Space for shadow
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
  },
  filterButtonInactive: {
    backgroundColor: COLORS.surfaceLight,
    borderWidth: 1,
    borderColor: COLORS.grayBorderDark,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  filterTextActive: {
    color: COLORS.textMainLight,
    fontWeight: '700',
  },
  filterTextInactive: {
    color: COLORS.textSecondaryLight,
    fontWeight: '500',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
  },
  card: {
    width: ITEM_WIDTH,
    height: 176, // h-44
    borderRadius: 16,
    padding: 16,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardContent: {
    position: 'relative',
    zIndex: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  badgeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardImage: {
    position: 'absolute',
  },
});