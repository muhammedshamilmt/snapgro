import {
  ChevronLeft,
  Plus,
  Search,
  ShoppingCart,
  SlidersHorizontal,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ShopSelectionOverlay from './ShopSelectionOverlay';

const { width } = Dimensions.get('window');

// Colors from Tailwind config
const COLORS = {
  primaryDark: '#052d27',
  primaryLight: '#bce5ab',
  bgPage: '#f8fcf9',
  cardLight: '#f4f6f5',
  accentGreen: '#4ade80',
  white: '#ffffff',
  gray700: '#374151',
  gray400: '#9ca3af',
  gray200: '#e5e7eb',
  inputBg: '#f0f4f2',
};

const PRODUCTS = [
  {
    id: 1,
    name: 'Beetroot',
    sub: '(Local shop)',
    weight: '500 gm.',
    price: '14.29',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUcTygvZq5VsXUx2nTgUSaGg9YayfZv7HcoxYLm2aH12aeS8XEHXZ-i1aZ95QDW5iIHEhcdQEtQj9cEAHiGYYEZWMIC-5lfR-kO_-rpMNvyR34oN9EfrXpNE5yc49W4ohLlOre4EltgqhsaV93_vkfjoxb9VB9QFWYzPnmb9HR2vqnry6sSQIYNOH4-OMXLBZiFTZ2dyhOqCJWMWkNmMlfr5FTpGh_oEFDkwuV1O8CqPx19kqDQY7v2FW75GuzDqn1SoKq83Zs3Xnd',
  },
  {
    id: 2,
    name: 'Italian Avocado',
    sub: '(Local shop)',
    weight: '450 gm.',
    price: '14.29',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0MyPYqgrD_M_ksIcBx9bFnjWMjhjGs6BMO2GE3R_n_tHTbWGYhgEg6hQdj2bCmovTZOanmmbbxoSQ0pS1ca0vsIp3xMHeuDwYYrYfQ3u-1-iXZH1oXQuwcOuE5oza5YQoh_ItfrdHYM6APkL_I1fhR7W4DbW7PjSlh0aXbD0d3tX8Zv2DTGx528G_nIFvc3XV7OqNxWosG0PyIVK3KDJfo7-vxYZWMXiXD82Xs2hFdxc9r7-08-i_GHkPJjjkAGLhOx54s_65iVlz',
  },
  {
    id: 3,
    name: 'Beef Mixed',
    sub: '(Cut Bone)',
    weight: '1000 gm.',
    price: '14.29',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgnUNjhJeeGbGZA8xpTz90FPfHQk6ezGhJ4pWVlYR12Bm80pNtfNJoqqpnTQ-p9tZKJS-lzn5ISynYyhScBkiX0ZvA2z8OIAOx75ZH8vm37zEVtg_9hPit8VW6_NaSK0i9SMhw6PkuXR9r4WYtI6m1x-E0n2RyrZ5IiLvdfzlV6l2B_ny9cfWGX7lzpXgPTU7_bOnGiGrdmaph1A-BIsElqR4kPyjMZ0wibmIFMkYnoDPKXp4BN7g7DUBgFDZxMl6Smy0C_ZKry2DV',
  },
  {
    id: 4,
    name: 'Plant Hunter',
    sub: '(Frozen pack)',
    weight: '250 gm.',
    price: '14.29',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDR0PUEz5dV9VqC11HvSARBayzKYwyOj5eb1nIIYcX08ZSCXvetanXnuzI7PisS1zXDM50amsf0fowrf60Xjcp6usJnbDep01t_ZLFRFp40_AmlkouqH4Brqnbs1aYHAfyULJmRPM-ONWkDkNCabWZGN4SXWJ16ekbJQuNbVdDrBix0ZGpfTB92_pdYdc37M5CM7r8GIDEtUnho706l-GfALctMiEHpCMqqJ-1bPNj_jtqJpzEhOAhFgZXqsRJc-G57iJyvdur0ELGC',
  },
  {
    id: 5,
    name: 'Sprite',
    sub: '(Can & Bottle)',
    weight: '250 gm.',
    price: '14.29',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdfHgbnDxNcJQS4ZczOUycUKcbD0MeQ2bKC9TSkqU0OAyHwMBUOYtTxO9esYvX3ieagPKBj1gMuUcZY0VchGYBRF6yCqzyER__Bi1ZO1Rsy6_d_tL718dZb47DafCoyAda9Wq0zkNrnk6qWkZWjgWbXxdYDZx5_e8UHxF7pv5Wg_ghwNgXeM7zEXFCp9pNw-UyHLe8TKxakJge4PyS2QiM-HT0oXIilGAabafRDHCHWGkhcDp1lb6xnW2p6iDbxkCvdpVPpVYHKaXe',
  },
  {
    id: 6,
    name: 'Szam amm',
    sub: '(Process food)',
    weight: '300 gm.',
    price: '14.29',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS8LgHVXPsaasZ3lAhUACgHDSdRPGrVV1TFnSrcT7UwyNoJvw0aL1728bE2g2qakcbGXhWBPolXXOr1eqVsSq0G_8uwfIxwfe9e0i5gPhfq5_0PCxU0fAvzeLA5cjHikbKPuGmGBo-0OPAiS_b0L-UVkAYpuaqlWf-76QDMW06sn2OrXbqUdjWAZVhpKdqj3B78tXxZnbGHCErdXAq1DEA_hysqTbttwbYAtzy3xW5RtE2NCDMmJIprzJQh5539TFeQePz4lrKfa24',
  },
  {
    id: 7,
    name: 'Beetroot',
    sub: '(Local shop)',
    weight: '500 gm.',
    price: '14.29',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUcTygvZq5VsXUx2nTgUSaGg9YayfZv7HcoxYLm2aH12aeS8XEHXZ-i1aZ95QDW5iIHEhcdQEtQj9cEAHiGYYEZWMIC-5lfR-kO_-rpMNvyR34oN9EfrXpNE5yc49W4ohLlOre4EltgqhsaV93_vkfjoxb9VB9QFWYzPnmb9HR2vqnry6sSQIYNOH4-OMXLBZiFTZ2dyhOqCJWMWkNmMlfr5FTpGh_oEFDkwuV1O8CqPx19kqDQY7v2FW75GuzDqn1SoKq83Zs3Xnd',
  },
  {
    id: 8,
    name: 'Italian Avocado',
    sub: '(Local shop)',
    weight: '450 gm.',
    price: '14.29',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0MyPYqgrD_M_ksIcBx9bFnjWMjhjGs6BMO2GE3R_n_tHTbWGYhgEg6hQdj2bCmovTZOanmmbbxoSQ0pS1ca0vsIp3xMHeuDwYYrYfQ3u-1-iXZH1oXQuwcOuE5oza5YQoh_ItfrdHYM6APkL_I1fhR7W4DbW7PjSlh0aXbD0d3tX8Zv2DTGx528G_nIFvc3XV7OqNxWosG0PyIVK3KDJfo7-vxYZWMXiXD82Xs2hFdxc9r7-08-i_GHkPJjjkAGLhOx54s_65iVlz',
  },
  {
    id: 9,
    name: 'Beef Mixed',
    sub: '(Cut Bone)',
    weight: '1000 gm.',
    price: '14.29',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgnUNjhJeeGbGZA8xpTz90FPfHQk6ezGhJ4pWVlYR12Bm80pNtfNJoqqpnTQ-p9tZKJS-lzn5ISynYyhScBkiX0ZvA2z8OIAOx75ZH8vm37zEVtg_9hPit8VW6_NaSK0i9SMhw6PkuXR9r4WYtI6m1x-E0n2RyrZ5IiLvdfzlV6l2B_ny9cfWGX7lzpXgPTU7_bOnGiGrdmaph1A-BIsElqR4kPyjMZ0wibmIFMkYnoDPKXp4BN7g7DUBgFDZxMl6Smy0C_ZKry2DV',
  },
  {
    id: 10,
    name: 'Plant Hunter',
    sub: '(Frozen pack)',
    weight: '250 gm.',
    price: '14.29',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDR0PUEz5dV9VqC11HvSARBayzKYwyOj5eb1nIIYcX08ZSCXvetanXnuzI7PisS1zXDM50amsf0fowrf60Xjcp6usJnbDep01t_ZLFRFp40_AmlkouqH4Brqnbs1aYHAfyULJmRPM-ONWkDkNCabWZGN4SXWJ16ekbJQuNbVdDrBix0ZGpfTB92_pdYdc37M5CM7r8GIDEtUnho706l-GfALctMiEHpCMqqJ-1bPNj_jtqJpzEhOAhFgZXqsRJc-G57iJyvdur0ELGC',
  },
  {
    id: 11,
    name: 'Sprite',
    sub: '(Can & Bottle)',
    weight: '250 gm.',
    price: '14.29',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdfHgbnDxNcJQS4ZczOUycUKcbD0MeQ2bKC9TSkqU0OAyHwMBUOYtTxO9esYvX3ieagPKBj1gMuUcZY0VchGYBRF6yCqzyER__Bi1ZO1Rsy6_d_tL718dZb47DafCoyAda9Wq0zkNrnk6qWkZWjgWbXxdYDZx5_e8UHxF7pv5Wg_ghwNgXeM7zEXFCp9pNw-UyHLe8TKxakJge4PyS2QiM-HT0oXIilGAabafRDHCHWGkhcDp1lb6xnW2p6iDbxkCvdpVPpVYHKaXe',
  },
  {
    id: 12,
    name: 'Szam amm',
    sub: '(Process food)',
    weight: '300 gm.',
    price: '14.29',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS8LgHVXPsaasZ3lAhUACgHDSdRPGrVV1TFnSrcT7UwyNoJvw0aL1728bE2g2qakcbGXhWBPolXXOr1eqVsSq0G_8uwfIxwfe9e0i5gPhfq5_0PCxU0fAvzeLA5cjHikbKPuGmGBo-0OPAiS_b0L-UVkAYpuaqlWf-76QDMW06sn2OrXbqUdjWAZVhpKdqj3B78tXxZnbGHCErdXAq1DEA_hysqTbttwbYAtzy3xW5RtE2NCDMmJIprzJQh5539TFeQePz4lrKfa24',
  },
];

const CATEGORIES = ['Frozen', 'Fresh', 'Drink & Water', 'Meat', 'Vegetables'];

interface ProductsScreenProps {
  onBack?: () => void;
  onCartPress?: () => void;
  onProductAdd?: (product: any) => void;
  onProductPress?: (product: any) => void;
  onSearch?: () => void;
  onFilter?: () => void;
}

export default function ProductsScreen({
  onBack,
  onCartPress,
  onProductAdd,
  onProductPress,
  onSearch,
  onFilter,
}: ProductsScreenProps) {
  const [activeCategory, setActiveCategory] = useState('Fresh');
  const [searchQuery, setSearchQuery] = useState('');
  const [showShopSelection, setShowShopSelection] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleAddProduct = (product: any) => {
    setSelectedProduct(product);
    setShowShopSelection(true);
  };

  const handleShopConfirm = (storeId: string) => {
    if (selectedProduct) {
      onProductAdd?.(selectedProduct);
      console.log(`Added ${selectedProduct.name} to cart from shop ${storeId}`);
    }
    setSelectedProduct(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primaryDark}
        translucent={false}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity 
              style={styles.iconButton} 
              activeOpacity={0.8}
              onPress={onBack}
            >
              <ChevronLeft size={20} color={COLORS.primaryDark} strokeWidth={2.5} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Daily foods</Text>
            <TouchableOpacity 
              style={styles.iconButton} 
              activeOpacity={0.8}
              onPress={onCartPress}
            >
              <ShoppingCart size={22} color={COLORS.primaryDark} strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {CATEGORIES.map((cat, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setActiveCategory(cat)}
                style={styles.categoryItem}
              >
                <Text
                  style={[
                    styles.categoryText,
                    activeCategory === cat
                      ? styles.categoryTextActive
                      : styles.categoryTextInactive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Search size={22} color={COLORS.primaryDark} />
            <TextInput
              style={styles.searchInput}
              placeholder='Search for "Grocery"'
              placeholderTextColor={COLORS.gray400}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={onSearch}
            />
          </View>
          <TouchableOpacity 
            style={styles.filterButton} 
            activeOpacity={0.8}
            onPress={onFilter}
          >
            <SlidersHorizontal size={22} color={COLORS.primaryDark} />
          </TouchableOpacity>
        </View>

        {/* Product Grid */}
        <View style={styles.productsSection}>
          {/* Main Product Grid Container */}
          <View style={styles.mainProductGrid}>
            {/* Create rows of 3 products each */}
            {Array.from({ length: Math.ceil(PRODUCTS.length / 3) }, (_, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <View style={styles.productRow}>
                  {PRODUCTS.slice(rowIndex * 3, (rowIndex + 1) * 3).map((item, colIndex) => (
                    <React.Fragment key={item.id}>
                      <TouchableOpacity 
                        style={styles.productCard}
                        activeOpacity={0.9}
                        onPress={() => onProductPress?.(item)}
                      >
                        <View style={styles.imageContainer}>
                          <Image source={{ uri: item.image }} style={styles.productImage} />
                        </View>
                        <View style={styles.textContainer}>
                          <Text style={styles.productName} numberOfLines={1}>
                            {item.name}
                          </Text>
                          <Text style={styles.productSub} numberOfLines={1}>
                            {item.sub}
                          </Text>
                          <Text style={styles.productWeight}>{item.weight}</Text>
                        </View>
                        <View style={styles.bottomContainer}>
                          <Text style={styles.priceText}>
                            {item.price.split('.')[0]}.
                            <Text style={styles.priceDecimal}>{item.price.split('.')[1]}$</Text>
                          </Text>
                          <TouchableOpacity 
                            style={styles.addButton} 
                            activeOpacity={0.8}
                            onPress={(e) => {
                              e.stopPropagation();
                              handleAddProduct(item);
                            }}
                          >
                            <Plus size={18} color={COLORS.primaryDark} strokeWidth={3} />
                          </TouchableOpacity>
                        </View>
                      </TouchableOpacity>
                      
                      {/* Vertical Divider - only between columns, not after last column */}
                      {colIndex < 2 && PRODUCTS.slice(rowIndex * 3, (rowIndex + 1) * 3).length > colIndex + 1 && (
                        <View style={styles.verticalDivider} />
                      )}
                    </React.Fragment>
                  ))}
                </View>
                
                {/* Horizontal Divider - only between rows, not after last row */}
                {rowIndex < Math.ceil(PRODUCTS.length / 3) - 1 && (
                  <View style={styles.horizontalDivider} />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Shop Selection Overlay */}
      <ShopSelectionOverlay
        visible={showShopSelection}
        onClose={() => {
          setShowShopSelection(false);
          setSelectedProduct(null);
        }}
        onConfirm={handleShopConfirm}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgPage,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    backgroundColor: COLORS.primaryDark,
    paddingTop: Platform.OS === 'android' ? 20 : 56, // pt-14 approx
    paddingBottom: 32, // pb-8
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    zIndex: 10,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24, // px-6
    marginBottom: 32, // mb-8
  },
  iconButton: {
    width: 44, // w-11
    height: 44, // h-11
    backgroundColor: COLORS.white,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  categoriesContainer: {
    paddingHorizontal: 24, // px-6
    paddingBottom: 8, // pb-2
    gap: 28, // gap-7
  },
  categoryItem: {
    marginRight: 28,
  },
  categoryText: {
    fontSize: 15,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: COLORS.primaryLight,
  },
  categoryTextInactive: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  searchSection: {
    paddingHorizontal: 20, // px-5
    marginTop: 24, // mt-6
    marginBottom: 24, // mb-6
    flexDirection: 'row',
    gap: 12, // gap-3
  },
  searchBar: {
    flex: 1,
    height: 48, // h-12
    backgroundColor: COLORS.white,
    borderRadius: 12, // rounded-xl
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16, // px-4
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray700,
    paddingVertical: 0, // Remove default Android padding
  },
  filterButton: {
    width: 48, // w-12
    height: 48, // h-12
    backgroundColor: COLORS.white,
    borderRadius: 12, // rounded-xl
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  // Products Section
  productsSection: {
    paddingHorizontal: 20,
  },
  mainProductGrid: {
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 15,
    elevation: 3,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: COLORS.gray200,
  },
  verticalDivider: {
    width: 1,
    backgroundColor: COLORS.gray200,
    alignSelf: 'stretch',
  },
  productCard: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 0,
    padding: 12,
    borderWidth: 0,
    alignItems: 'center',
  },
  imageContainer: {
    height: 80,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  productImage: {
    width: 56,
    height: 56,
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },
  productName: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primaryDark,
    textAlign: 'center',
    lineHeight: 14,
    marginBottom: 2,
  },
  productSub: {
    fontSize: 9,
    fontWeight: '400',
    color: COLORS.gray400,
    textAlign: 'center',
  },
  productWeight: {
    fontSize: 9,
    color: COLORS.gray400,
    textAlign: 'center',
    marginTop: 2,
  },
  bottomContainer: {
    marginTop: 'auto',
    width: '100%',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primaryDark,
    marginBottom: 8,
  },
  priceDecimal: {
    fontSize: 9,
    textAlignVertical: 'top',
  },
  addButton: {
    width: '100%',
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORS.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});