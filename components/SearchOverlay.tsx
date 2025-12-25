import {
  Clock,
  Mic,
  Plus,
  Search,
  TrendingUp,
  X
} from 'lucide-react-native';
import React, { useState } from 'react';

import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Theme Colors based on provided Tailwind config
const COLORS = {
  primary: '#2bee6c',
  backgroundLight: '#f6f8f6',
  backgroundDark: '#102216',
  surfaceLight: '#ffffff',
  surfaceDark: '#1a2e22',
  textMain: '#0f172a', // slate-900
  textSecondary: '#334155', // slate-700
  textMuted: '#9ca3af', // gray-400
  border: '#e5e7eb', // gray-200
  green100: '#dcfce7',
  green900: '#14532d',
  green700: '#15803d',
  red500: '#ef4444',
};

// Border Radius from config
const RADIUS = {
  DEFAULT: 4,
  lg: 8,
  xl: 12,
  '2xl': 16,
  full: 9999,
};

interface SearchOverlayProps {
  isVisible: boolean;
  onClose: () => void;
  onProductAdd?: (product: any) => void;
}

interface RecentItemProps {
  text: string;
  onRemove?: () => void;
}

interface TrendingItemProps {
  text: string;
  icon?: boolean;
  onPress?: () => void;
}

interface ProductCardProps {
  title: string;
  price: string;
  originalPrice?: string;
  unit?: string;
  image: string;
  onAdd?: () => void;
}

const RecentItem: React.FC<RecentItemProps> = ({ text, onRemove }) => (
  <TouchableOpacity style={styles.recentItem} activeOpacity={0.7}>
    <View style={styles.recentIconContainer}>
      <Clock size={20} color={COLORS.textMuted} />
    </View>
    <Text style={styles.recentText} numberOfLines={1}>
      {text}
    </Text>
    <TouchableOpacity style={styles.closeButton} onPress={onRemove}>
      <X size={20} color={COLORS.textMuted} />
    </TouchableOpacity>
  </TouchableOpacity>
);

const TrendingItem: React.FC<TrendingItemProps> = ({ text, icon, onPress }) => (
  <TouchableOpacity style={styles.trendingItem} activeOpacity={0.7} onPress={onPress}>
    {icon && <TrendingUp size={16} color={COLORS.primary} style={{ marginRight: 6 }} />}
    <Text style={styles.trendingText}>{text}</Text>
  </TouchableOpacity>
);

const ProductCard: React.FC<ProductCardProps> = ({ 
  title, 
  price, 
  originalPrice, 
  unit, 
  image, 
  onAdd 
}) => (
  <View style={styles.productCard}>
    <View style={styles.productImageContainer}>
      <Image source={{ uri: image }} style={styles.productImage} />
      <TouchableOpacity style={styles.addButton} activeOpacity={0.8} onPress={onAdd}>
        <Plus size={20} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
    <View style={styles.productInfo}>
      <Text style={styles.productTitle} numberOfLines={2}>
        {title}
      </Text>
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>{price}</Text>
        {originalPrice && <Text style={styles.originalPriceText}>{originalPrice}</Text>}
        {unit && <Text style={styles.unitText}>{unit}</Text>}
      </View>
    </View>
  </View>
);

export default function SearchOverlay({ isVisible, onClose, onProductAdd }: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    'Organic Bananas',
    'Almond Milk Unsweetened'
  ]);

  const handleRemoveRecent = (index: number) => {
    setRecentSearches(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    setRecentSearches([]);
  };

  const handleProductAdd = (product: any) => {
    onProductAdd?.(product);
    console.log('Product added:', product.title);
  };

  const handleTrendingPress = (text: string) => {
    setSearchQuery(text);
    console.log('Trending item pressed:', text);
  };

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Overlay Backdrop */}
      <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />

      {/* Search Overlay Sheet */}
      <View style={styles.overlay}>
        {/* Handle */}
        <View style={styles.handleContainer}>
          <View style={styles.handle} />
        </View>

        {/* Search Header */}
        <View style={styles.searchHeader}>
          <View style={styles.searchInputWrapper}>
            <View style={styles.searchIconWrapper}>
              <Search size={24} color={COLORS.primary} />
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="Search milk, bread, veggies..."
              placeholderTextColor={COLORS.textMuted}
              autoFocus={true}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.micIconWrapper}>
              <Mic size={20} color={COLORS.textMuted} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          style={styles.contentContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent</Text>
                <TouchableOpacity onPress={handleClearAll}>
                  <Text style={styles.clearAllText}>CLEAR ALL</Text>
                </TouchableOpacity>
              </View>
              <View>
                {recentSearches.map((item, index) => (
                  <RecentItem 
                    key={index} 
                    text={item} 
                    onRemove={() => handleRemoveRecent(index)}
                  />
                ))}
              </View>
            </View>
          )}

          {/* Trending Now */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { marginBottom: 12 }]}>Trending Now</Text>
            <View style={styles.trendingContainer}>
              <TrendingItem 
                text="Avocados" 
                icon={true} 
                onPress={() => handleTrendingPress('Avocados')}
              />
              <TrendingItem 
                text="Sourdough Bread" 
                onPress={() => handleTrendingPress('Sourdough Bread')}
              />
              <TrendingItem 
                text="Eggs" 
                onPress={() => handleTrendingPress('Eggs')}
              />
              <TrendingItem 
                text="Toilet Paper" 
                onPress={() => handleTrendingPress('Toilet Paper')}
              />
              <TrendingItem 
                text="Greek Yogurt" 
                onPress={() => handleTrendingPress('Greek Yogurt')}
              />
              <TrendingItem 
                text="Ice Cream" 
                onPress={() => handleTrendingPress('Ice Cream')}
              />
            </View>
          </View>

          {/* You might like */}
          <View style={[styles.section, { paddingBottom: 40 }]}>
            <Text style={[styles.sectionTitle, { marginBottom: 16 }]}>You might like</Text>
            <View style={styles.productsGrid}>
              <ProductCard
                title="Organic Strawberries, 1lb"
                price="$4.99"
                originalPrice="$5.99"
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuBh_ZYt5uvhNDp40eLKHEDOaNBtv_zpELpHGte9hBrKbdNfD-zUhC7fsP7OMG9tvpPsisGP2U6DCEHnHhFlUCbcI4lUcyHyHkQPlkAwra_YrN3KLkNSuvJtzIqlvqZ4APRSYfKMTDy4zcnoJi7VyyOhgEtgvQzCiqvZqlWFxkCLNDh6VWKYrUczNxkk3oEYW-GPj7wtN0e8Q2BDf9v5MhwzCxqEBfJscYbBGh9YzHD8PPIAjhoLnnIDW8hG3VzIOp9anIzCtFqkEv5L"
                onAdd={() => handleProductAdd({
                  id: 'strawberries',
                  title: 'Organic Strawberries, 1lb',
                  price: 4.99,
                  originalPrice: 5.99,
                  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBh_ZYt5uvhNDp40eLKHEDOaNBtv_zpELpHGte9hBrKbdNfD-zUhC7fsP7OMG9tvpPsisGP2U6DCEHnHhFlUCbcI4lUcyHyHkQPlkAwra_YrN3KLkNSuvJtzIqlvqZ4APRSYfKMTDy4zcnoJi7VyyOhgEtgvQzCiqvZqlWFxkCLNDh6VWKYrUczNxkk3oEYW-GPj7wtN0e8Q2BDf9v5MhwzCxqEBfJscYbBGh9YzHD8PPIAjhoLnnIDW8hG3VzIOp9anIzCtFqkEv5L"
                })}
              />
              <ProductCard
                title="Whole Grain Artisan Bread"
                price="$3.49"
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuCzRuAw_p3xtXrJ9uTnyLphIxzpitgYCz7GwfwVaSYd3AmvkusGpAs2bRwLReiOUYvnjVpwhXV8dzzIanOAlQHzoCYScGWm04tTlLP6d0oRVBkYEcZG2yA6xUdetaYM-Tdkuds5W-bnKiCvnvILaEZLsgpgl5IqHvcf65pYmdBY8RJpla_cjhpzDjbscYPXHY3SnzzPVTFxzEY4pnSFTyf7511eFcdWATzqfMnZIJcyGRKyR5o6JHjX9bFcLX8O-Z2vo0J35RwIk-eu"
                onAdd={() => handleProductAdd({
                  id: 'bread',
                  title: 'Whole Grain Artisan Bread',
                  price: 3.49,
                  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzRuAw_p3xtXrJ9uTnyLphIxzpitgYCz7GwfwVaSYd3AmvkusGpAs2bRwLReiOUYvnjVpwhXV8dzzIanOAlQHzoCYScGWm04tTlLP6d0oRVBkYEcZG2yA6xUdetaYM-Tdkuds5W-bnKiCvnvILaEZLsgpgl5IqHvcf65pYmdBY8RJpla_cjhpzDjbscYPXHY3SnzzPVTFxzEY4pnSFTyf7511eFcdWATzqfMnZIJcyGRKyR5o6JHjX9bFcLX8O-Z2vo0J35RwIk-eu"
                })}
              />
              <ProductCard
                title="Hass Avocado, Large"
                price="$1.29"
                unit="ea"
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuB1SYhmjny58fb2MkyhqpfQRLv33yKNcDE5MxsrpZwSf3pUhTMhIO0531A7lIRPf73fI04Me06JOUSAyhqrf-6au7uAc2s8rUhr4x4Qhn46L12egy6xwWdN58Dq5XK67uN22E0mAwpcnqbsr0tTcln3h3ctr-jGWipn4FgHFdkp3SMJHEsXAS2uT-GkWeIxe2ytvrFiJuKa0hnZe0Ot0J0J_a5xc1ChXioYqpXz4Jog6WaousAnUIR_uGoGKwkMM-vT7zWix6eIman2"
                onAdd={() => handleProductAdd({
                  id: 'avocado-large',
                  title: 'Hass Avocado, Large',
                  price: 1.29,
                  unit: 'ea',
                  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1SYhmjny58fb2MkyhqpfQRLv33yKNcDE5MxsrpZwSf3pUhTMhIO0531A7lIRPf73fI04Me06JOUSAyhqrf-6au7uAc2s8rUhr4x4Qhn46L12egy6xwWdN58Dq5XK67uN22E0mAwpcnqbsr0tTcln3h3ctr-jGWipn4FgHFdkp3SMJHEsXAS2uT-GkWeIxe2ytvrFiJuKa0hnZe0Ot0J0J_a5xc1ChXioYqpXz4Jog6WaousAnUIR_uGoGKwkMM-vT7zWix6eIman2"
                })}
              />
              <ProductCard
                title="Farm Fresh Whole Milk"
                price="$4.49"
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuBtSSv_7Qwp_xJO2HnOF2Xcoq1MWdNt-I9x274AyqJiFBKc6lMyjV5lk0GsaARXaEqKE09lI8F20jCX-8Y3JL61px-51JrPyngLtXF80OoJ25XdxkAJoMvdakmCcCspwnDC_lNTrSzwMkqkOO_RYF6wzQ7R0sqEV_34APPhBGsSDnyipo3UODmq5EXZA_H-fd4TpDuJ3FZSzR7twuUlgyaoFyZBLBi2E76sVlxxc1N4dhq9g9-oFF7J6vSshLNQACpPil-AW5NY0En-"
                onAdd={() => handleProductAdd({
                  id: 'milk',
                  title: 'Farm Fresh Whole Milk',
                  price: 4.49,
                  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtSSv_7Qwp_xJO2HnOF2Xcoq1MWdNt-I9x274AyqJiFBKc6lMyjV5lk0GsaARXaEqKE09lI8F20jCX-8Y3JL61px-51JrPyngLtXF80OoJ25XdxkAJoMvdakmCcCspwnDC_lNTrSzwMkqkOO_RYF6wzQ7R0sqEV_34APPhBGsSDnyipo3UODmq5EXZA_H-fd4TpDuJ3FZSzR7twuUlgyaoFyZBLBi2E76sVlxxc1N4dhq9g9-oFF7J6vSshLNQACpPil-AW5NY0En-"
                })}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}const
 styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  // Overlay Backdrop
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 30,
  },
  // Overlay Sheet
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '92%',
    backgroundColor: COLORS.backgroundLight,
    borderTopLeftRadius: RADIUS['2xl'],
    borderTopRightRadius: RADIUS['2xl'],
    zIndex: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  handleContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    paddingBottom: 4,
  },
  handle: {
    height: 6,
    width: 48,
    borderRadius: RADIUS.full,
    backgroundColor: '#d1d5db', // gray-300
  },
  searchHeader: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(229, 231, 235, 0.5)', // gray-200/50
  },
  searchInputWrapper: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
  },
  searchInput: {
    width: '100%',
    backgroundColor: COLORS.surfaceLight,
    color: COLORS.textMain,
    paddingLeft: 40,
    paddingRight: 40,
    paddingVertical: 12,
    borderRadius: RADIUS.xl,
    fontSize: 16,
    // Shadow for input
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchIconWrapper: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  micIconWrapper: {
    position: 'absolute',
    right: 12,
    zIndex: 1,
  },
  cancelButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    paddingTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textMain,
    paddingHorizontal: 16,
  },
  clearAllText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  // Recent Items
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  recentIconContainer: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surfaceLight,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  closeButton: {
    padding: 4,
  },
  // Trending Items
  trendingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 16,
  },
  trendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surfaceLight,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  trendingText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  // Product Grid
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingHorizontal: 16,
  },
  productCard: {
    width: (width - 48) / 2,
    backgroundColor: COLORS.surfaceLight,
    padding: 12,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  productImageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#f9fafb',
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    marginBottom: 12,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  addButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    height: 32,
    width: 32,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textMain,
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    marginTop: 'auto',
    paddingTop: 4,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  originalPriceText: {
    fontSize: 12,
    color: COLORS.textMuted,
    textDecorationLine: 'line-through',
    marginBottom: 2,
  },
  unitText: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: 2,
  },
});