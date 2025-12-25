import {
  Bell,
  ChevronDown,
  Heart,
  MapPin,
  Minus,
  Percent,
  Plus,
  Search,
  ShoppingBag,
  Star,
  Zap
} from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import BottomNavigation from './BottomNavigation';
import SearchOverlay from './SearchOverlay';

// Modern color palette
const COLORS = {
  primary: '#2bee6c',
  primaryDark: '#1db954',
  secondary: '#ff6b6b',
  accent: '#4ecdc4',
  background: '#f8fafc',
  surface: '#ffffff',
  surfaceElevated: '#ffffff',
  text: '#1e293b',
  textSecondary: '#64748b',
  textMuted: '#94a3b8',
  border: '#e2e8f0',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  gradient1: '#667eea',
  gradient2: '#764ba2',
  cardGreen: '#f0fdf4',
  cardBlue: '#eff6ff',
  cardPurple: '#faf5ff',
  cardOrange: '#fff7ed',
};

interface HomeScreenProps {
  onNavigate?: (screen: string) => void;
  cartCount?: number;
  onProductAdd?: (product: any) => void;
  onProductPress?: (product: any) => void;
}

const HomeScreen = ({ onNavigate, cartCount: propCartCount = 0, onProductAdd, onProductPress }: HomeScreenProps) => {
  const [cartCount, setCartCount] = useState(propCartCount);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Fresh');
  const [activeTab, setActiveTab] = useState('home');
  const [productQuantities, setProductQuantities] = useState<{[key: string]: number}>({});

  React.useEffect(() => {
    setCartCount(propCartCount);
  }, [propCartCount]);

  const updateQuantity = (productId: string, change: number) => {
    setProductQuantities(prev => {
      const newQty = (prev[productId] || 0) + change;
      if (newQty <= 0) {
        const { [productId]: removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: newQty };
    });
  };

  const addToCart = (productId: string) => {
    setProductQuantities(prev => ({ ...prev, [productId]: 1 }));
    setCartCount(prev => prev + 1);
  };

  const handleProductPress = (product: any) => {
    onProductPress?.(product);
  };

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'browse') {
      onNavigate?.('categories');
    } else if (tab === 'cart') {
      onNavigate?.('cart');
    } else if (tab === 'ai-chef') {
      onNavigate?.('ai-chef');
    } else if (tab === 'profile') {
      onNavigate?.('profile');
    }
  };

  const handleSearchPress = () => {
    setShowSearchOverlay(true);
  };

  const handleCloseSearch = () => {
    setShowSearchOverlay(false);
  };

  const handleSearchProductAdd = (product: any) => {
    onProductAdd?.(product);
    setCartCount(prev => prev + 1);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          {/* Top Bar */}
          <View style={styles.topBar}>
            <View style={styles.locationContainer}>
              <View style={styles.locationRow}>
                <MapPin size={16} color={COLORS.primary} />
                <Text style={styles.deliverLabel}>Deliver to</Text>
                <ChevronDown size={16} color={COLORS.textMuted} />
              </View>
              <Text style={styles.locationText}>New York, Manhattan</Text>
            </View>
            
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.notificationButton}>
                <Bell size={20} color={COLORS.text} />
                <View style={styles.notificationDot} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.cartButton} onPress={() => onNavigate?.('cart')}>
                <ShoppingBag size={20} color={COLORS.text} />
                {cartCount > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{cartCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>Good morning! 👋</Text>
            <Text style={styles.welcomeSubtext}>What would you like to order today?</Text>
          </View>

          {/* Search Bar */}
          <TouchableOpacity style={styles.searchContainer} onPress={handleSearchPress}>
            <Search size={20} color={COLORS.textMuted} />
            <Text style={styles.searchPlaceholder}>Search for groceries, recipes...</Text>
            <View style={styles.searchMic}>
              <Zap size={16} color={COLORS.primary} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Categories Section */}
        <View style={styles.categoriesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity onPress={() => onNavigate?.('categories')}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            <CategoryCard
              name="Fresh Fruits"
              icon="🍎"
              color={COLORS.cardGreen}
              isSelected={selectedCategory === 'Fresh'}
              onPress={() => setSelectedCategory('Fresh')}
            />
            <CategoryCard
              name="Vegetables"
              icon="🥕"
              color={COLORS.cardOrange}
              isSelected={selectedCategory === 'Vegetables'}
              onPress={() => setSelectedCategory('Vegetables')}
            />
            <CategoryCard
              name="Dairy & Eggs"
              icon="🥛"
              color={COLORS.cardBlue}
              isSelected={selectedCategory === 'Dairy'}
              onPress={() => setSelectedCategory('Dairy')}
            />
            <CategoryCard
              name="Bakery"
              icon="🍞"
              color={COLORS.cardPurple}
              isSelected={selectedCategory === 'Bakery'}
              onPress={() => setSelectedCategory('Bakery')}
            />
          </ScrollView>
        </View>

        {/* Featured Banner */}
        <View style={styles.bannerSection}>
          <View style={styles.featuredBanner}>
            <View style={styles.bannerContent}>
              <View style={styles.bannerText}>
                <Text style={styles.bannerTitle}>Free Delivery</Text>
                <Text style={styles.bannerSubtitle}>On orders over $50</Text>
                <TouchableOpacity style={styles.bannerButton}>
                  <Text style={styles.bannerButtonText}>Order Now</Text>
                </TouchableOpacity>
              </View>
              <Image 
                source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0MyPYqgrD_M_ksIcBx9bFnjWMjhjGs6BMO2GE3R_n_tHTbWGYhgEg6hQdj2bCmovTZOanmmbbxoSQ0pS1ca0vsIp3xMHeuDwYYrYfQ3u-1-iXZH1oXQuwcOuE5oza5YQoh_ItfrdHYM6APkL_I1fhR7W4DbW7PjSlh0aXbD0d3tX8Zv2DTGx528G_nIFvc3XV7OqNxWosG0PyIVK3KDJfo7-vxYZWMXiXD82Xs2hFdxc9r7-08-i_GHkPJjjkAGLhOx54s_65iVlz" }}
                style={styles.bannerImage}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        {/* Popular Products */}
        <View style={styles.productsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Products</Text>
            <TouchableOpacity onPress={() => onNavigate?.('products')}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          
          {/* Main Product Grid Container */}
          <View style={styles.mainProductGrid}>
            {/* Row 1 */}
            <View style={styles.productRow}>
              <ModernProductCard
                id="avocado"
                name="Fresh Avocado"
                subtitle="Organic • Premium"
                price="$2.99"
                originalPrice="$3.99"
                rating="4.8"
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuB0MyPYqgrD_M_ksIcBx9bFnjWMjhjGs6BMO2GE3R_n_tHTbWGYhgEg6hQdj2bCmovTZOanmmbbxoSQ0pS1ca0vsIp3xMHeuDwYYrYfQ3u-1-iXZH1oXQuwcOuE5oza5YQoh_ItfrdHYM6APkL_I1fhR7W4DbW7PjSlh0aXbD0d3tX8Zv2DTGx528G_nIFvc3XV7OqNxWosG0PyIVK3KDJfo7-vxYZWMXiXD82Xs2hFdxc9r7-08-i_GHkPJjjkAGLhOx54s_65iVlz"
                quantity={productQuantities['avocado'] || 0}
                onAdd={() => addToCart('avocado')}
                onUpdateQuantity={(change) => updateQuantity('avocado', change)}
                onPress={() => handleProductPress({
                  id: 'avocado',
                  name: 'Fresh Avocado',
                  subtitle: 'Organic • Premium',
                  price: '$2.99',
                  originalPrice: '$3.99',
                  rating: '4.8',
                  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0MyPYqgrD_M_ksIcBx9bFnjWMjhjGs6BMO2GE3R_n_tHTbWGYhgEg6hQdj2bCmovTZOanmmbbxoSQ0pS1ca0vsIp3xMHeuDwYYrYfQ3u-1-iXZH1oXQuwcOuE5oza5YQoh_ItfrdHYM6APkL_I1fhR7W4DbW7PjSlh0aXbD0d3tX8Zv2DTGx528G_nIFvc3XV7OqNxWosG0PyIVK3KDJfo7-vxYZWMXiXD82Xs2hFdxc9r7-08-i_GHkPJjjkAGLhOx54s_65iVlz"
                })}
              />
              
              <View style={styles.verticalDivider} />
              
              <ModernProductCard
                id="strawberry"
                name="Strawberries"
                subtitle="Fresh • Local"
                price="$4.99"
                rating="4.9"
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuBh_ZYt5uvhNDp40eLKHEDOaNBtv_zpELpHGte9hBrKbdNfD-zUhC7fsP7OMG9tvpPsisGP2U6DCEHnHhFlUCbcI4lUcyHyHkQPlkAwra_YrN3KLkNSuvJtzIqlvqZ4APRSYfKMTDy4zcnoJi7VyyOhgEtgvQzCiqvZqlWFxkCLNDh6VWKYrUczNxkk3oEYW-GPj7wtN0e8Q2BDf9v5MhwzCxqEBfJscYbBGh9YzHD8PPIAjhoLnnIDW8hG3VzIOp9anIzCtFqkEv5L"
                quantity={productQuantities['strawberry'] || 0}
                onAdd={() => addToCart('strawberry')}
                onUpdateQuantity={(change) => updateQuantity('strawberry', change)}
                onPress={() => handleProductPress({
                  id: 'strawberry',
                  name: 'Strawberries',
                  subtitle: 'Fresh • Local',
                  price: '$4.99',
                  rating: '4.9',
                  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBh_ZYt5uvhNDp40eLKHEDOaNBtv_zpELpHGte9hBrKbdNfD-zUhC7fsP7OMG9tvpPsisGP2U6DCEHnHhFlUCbcI4lUcyHyHkQPlkAwra_YrN3KLkNSuvJtzIqlvqZ4APRSYfKMTDy4zcnoJi7VyyOhgEtgvQzCiqvZqlWFxkCLNDh6VWKYrUczNxkk3oEYW-GPj7wtN0e8Q2BDf9v5MhwzCxqEBfJscYbBGh9YzHD8PPIAjhoLnnIDW8hG3VzIOp9anIzCtFqkEv5L"
                })}
              />
            </View>

            {/* Horizontal Divider */}
            <View style={styles.horizontalDivider} />

            {/* Row 2 */}
            <View style={styles.productRow}>
              <ModernProductCard
                id="banana"
                name="Bananas"
                subtitle="Organic • Sweet"
                price="$1.99"
                rating="4.7"
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuCdfHgbnDxNcJQS4ZczOUycUKcbD0MeQ2bKC9TSkqU0OAyHwMBUOYtTxO9esYvX3ieagPKBj1gMuUcZY0VchGYBRF6yCqzyER__Bi1ZO1Rsy6_d_tL718dZb47DafCoyAda9Wq0zkNrnk6qWkZWjgWbXxdYDZx5_e8UHxF7pv5Wg_ghwNgXeM7zEXFCp9pNw-UyHLe8TKxakJge4PyS2QiM-HT0oXIilGAabafRDHCHWGkhcDp1lb6xnW2p6iDbxkCvdpVPpVYHKaXe"
                quantity={productQuantities['banana'] || 0}
                onAdd={() => addToCart('banana')}
                onUpdateQuantity={(change) => updateQuantity('banana', change)}
                onPress={() => handleProductPress({
                  id: 'banana',
                  name: 'Bananas',
                  subtitle: 'Organic • Sweet',
                  price: '$1.99',
                  rating: '4.7',
                  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdfHgbnDxNcJQS4ZczOUycUKcbD0MeQ2bKC9TSkqU0OAyHwMBUOYtTxO9esYvX3ieagPKBj1gMuUcZY0VchGYBRF6yCqzyER__Bi1ZO1Rsy6_d_tL718dZb47DafCoyAda9Wq0zkNrnk6qWkZWjgWbXxdYDZx5_e8UHxF7pv5Wg_ghwNgXeM7zEXFCp9pNw-UyHLe8TKxakJge4PyS2QiM-HT0oXIilGAabafRDHCHWGkhcDp1lb6xnW2p6iDbxkCvdpVPpVYHKaXe"
                })}
              />

              <View style={styles.verticalDivider} />

              <ModernProductCard
                id="carrot"
                name="Baby Carrots"
                subtitle="Fresh • Crunchy"
                price="$3.49"
                rating="4.6"
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuBKhcIraaoTWYSD1IAYd4SIj8a4zGL-ZFJ-IUjE5UpWWhANl9p5fLjgzkKng7HdGw1NT2G2nbCysHLs3sVdE2dwY2mgu9urKIE2rmQsw7wEi7erPl_SowDMH044wfuzRN0fzmunJi_CNcWJWbhYyk0dRiEqQllNNBexsIp5Bu0LfsbXernQ6K4bbn03_8V4wpcO1cN3Ec9GuzG44lH0vAFkxH9oYind4P00qwDTEDNuzkpYX0UuHNovNJq6VGCI3z45piwNUWE6E3-u"
                quantity={productQuantities['carrot'] || 0}
                onAdd={() => addToCart('carrot')}
                onUpdateQuantity={(change) => updateQuantity('carrot', change)}
                onPress={() => handleProductPress({
                  id: 'carrot',
                  name: 'Baby Carrots',
                  subtitle: 'Fresh • Crunchy',
                  price: '$3.49',
                  rating: '4.6',
                  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKhcIraaoTWYSD1IAYd4SIj8a4zGL-ZFJ-IUjE5UpWWhANl9p5fLjgzkKng7HdGw1NT2G2nbCysHLs3sVdE2dwY2mgu9urKIE2rmQsw7wEi7erPl_SowDMH044wfuzRN0fzmunJi_CNcWJWbhYyk0dRiEqQllNNBexsIp5Bu0LfsbXernQ6K4bbn03_8V4wpcO1cN3Ec9GuzG44lH0vAFkxH9oYind4P00qwDTEDNuzkpYX0UuHNovNJq6VGCI3z45piwNUWE6E3-u"
                })}
              />
            </View>

            {/* Horizontal Divider */}
            <View style={styles.horizontalDivider} />

            {/* Row 3 */}
            <View style={styles.productRow}>
              <ModernProductCard
                id="broccoli"
                name="Fresh Broccoli"
                subtitle="Organic • Healthy"
                price="$2.49"
                rating="4.5"
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuDR0PUEz5dV9VqC11HvSARBayzKYwyOj5eb1nIIYcX08ZSCXvetanXnuzI7PisS1zXDM50amsf0fowrf60Xjcp6usJnbDep01t_ZLFRFp40_AmlkouqH4Brqnbs1aYHAfyULJmRPM-ONWkDkNCabWZGN4SXWJ16ekbJQuNbVdDrBix0ZGpfTB92_pdYdc37M5CM7r8GIDEtUnho706l-GfALctMiEHpCMqqJ-1bPNj_jtqJpzEhOAhFgZXqsRJc-G57iJyvdur0ELGC"
                quantity={productQuantities['broccoli'] || 0}
                onAdd={() => addToCart('broccoli')}
                onUpdateQuantity={(change) => updateQuantity('broccoli', change)}
                onPress={() => handleProductPress({
                  id: 'broccoli',
                  name: 'Fresh Broccoli',
                  subtitle: 'Organic • Healthy',
                  price: '$2.49',
                  rating: '4.5',
                  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDR0PUEz5dV9VqC11HvSARBayzKYwyOj5eb1nIIYcX08ZSCXvetanXnuzI7PisS1zXDM50amsf0fowrf60Xjcp6usJnbDep01t_ZLFRFp40_AmlkouqH4Brqnbs1aYHAfyULJmRPM-ONWkDkNCabWZGN4SXWJ16ekbJQuNbVdDrBix0ZGpfTB92_pdYdc37M5CM7r8GIDEtUnho706l-GfALctMiEHpCMqqJ-1bPNj_jtqJpzEhOAhFgZXqsRJc-G57iJyvdur0ELGC"
                })}
              />
              
              <View style={styles.verticalDivider} />
              
              <ModernProductCard
                id="tomato"
                name="Cherry Tomatoes"
                subtitle="Fresh • Juicy"
                price="$3.99"
                originalPrice="$4.99"
                rating="4.8"
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuBUcTygvZq5VsXUx2nTgUSaGg9YayfZv7HcoxYLm2aH12aeS8XEHXZ-i1aZ95QDW5iIHEhcdQEtQj9cEAHiGYYEZWMIC-5lfR-kO_-rpMNvyR34oN9EfrXpNE5yc49W4ohLlOre4EltgqhsaV93_vkfjoxb9VB9QFWYzPnmb9HR2vqnry6sSQIYNOH4-OMXLBZiFTZ2dyhOqCJWMWkNmMlfr5FTpGh_oEFDkwuV1O8CqPx19kqDQY7v2FW75GuzDqn1SoKq83Zs3Xnd"
                quantity={productQuantities['tomato'] || 0}
                onAdd={() => addToCart('tomato')}
                onUpdateQuantity={(change) => updateQuantity('tomato', change)}
                onPress={() => handleProductPress({
                  id: 'tomato',
                  name: 'Cherry Tomatoes',
                  subtitle: 'Fresh • Juicy',
                  price: '$3.99',
                  originalPrice: '$4.99',
                  rating: '4.8',
                  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUcTygvZq5VsXUx2nTgUSaGg9YayfZv7HcoxYLm2aH12aeS8XEHXZ-i1aZ95QDW5iIHEhcdQEtQj9cEAHiGYYEZWMIC-5lfR-kO_-rpMNvyR34oN9EfrXpNE5yc49W4ohLlOre4EltgqhsaV93_vkfjoxb9VB9QFWYzPnmb9HR2vqnry6sSQIYNOH4-OMXLBZiFTZ2dyhOqCJWMWkNmMlfr5FTpGh_oEFDkwuV1O8CqPx19kqDQY7v2FW75GuzDqn1SoKq83Zs3Xnd"
                })}
              />
            </View>
          </View>
        </View>

        {/* Today's Deals Section */}
        <View style={styles.dealsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Deals</Text>
            <TouchableOpacity onPress={() => onNavigate?.('products')}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dealsScroll}
          >
            <View style={styles.dealCard}>
              <View style={styles.dealBadge}>
                <Text style={styles.dealBadgeText}>30% OFF</Text>
              </View>
              <Text style={styles.dealTitle}>Fresh Produce</Text>
              <Text style={styles.dealSubtitle}>Fruits & Vegetables</Text>
              <TouchableOpacity style={styles.dealButton}>
                <Text style={styles.dealButtonText}>Shop Now</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.dealCard}>
              <View style={styles.dealBadge}>
                <Text style={styles.dealBadgeText}>Buy 2 Get 1</Text>
              </View>
              <Text style={styles.dealTitle}>Dairy & Eggs</Text>
              <Text style={styles.dealSubtitle}>Premium quality</Text>
              <TouchableOpacity style={styles.dealButton}>
                <Text style={styles.dealButtonText}>Shop Now</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.dealCard}>
              <View style={styles.dealBadge}>
                <Text style={styles.dealBadgeText}>Free Delivery</Text>
              </View>
              <Text style={styles.dealTitle}>Bakery Items</Text>
              <Text style={styles.dealSubtitle}>Fresh baked daily</Text>
              <TouchableOpacity style={styles.dealButton}>
                <Text style={styles.dealButtonText}>Shop Now</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {/* Special Offers */}
        <View style={styles.offersSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Special Offers</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.offersScroll}
          >
            <OfferCard
              title="Buy 2 Get 1 Free"
              subtitle="On all organic fruits"
              discount="50% OFF"
              color={COLORS.cardGreen}
              icon="🍎"
            />
            <OfferCard
              title="Fresh Vegetables"
              subtitle="Up to 30% discount"
              discount="30% OFF"
              color={COLORS.cardOrange}
              icon="🥕"
            />
            <OfferCard
              title="Dairy Products"
              subtitle="Special weekend deals"
              discount="25% OFF"
              color={COLORS.cardBlue}
              icon="🥛"
            />
            <OfferCard
              title="Bakery Items"
              subtitle="Fresh baked daily"
              discount="20% OFF"
              color={COLORS.cardPurple}
              icon="🍞"
            />
          </ScrollView>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeTab}
        onTabPress={handleTabPress}
        cartCount={cartCount}
      />

      {/* Search Overlay */}
      <SearchOverlay 
        isVisible={showSearchOverlay}
        onClose={handleCloseSearch}
        onProductAdd={handleSearchProductAdd}
      />
    </View>
  );
};

// Category Card Component
interface CategoryCardProps {
  name: string;
  icon: string;
  color: string;
  isSelected?: boolean;
  onPress?: () => void;
}

const CategoryCard = ({ name, icon, color, isSelected, onPress }: CategoryCardProps) => (
  <TouchableOpacity 
    style={[
      styles.categoryCard, 
      { backgroundColor: color },
      isSelected && styles.categoryCardSelected
    ]} 
    onPress={onPress}
  >
    <Text style={styles.categoryIcon}>{icon}</Text>
    <Text style={[styles.categoryName, isSelected && styles.categoryNameSelected]}>
      {name}
    </Text>
  </TouchableOpacity>
);

// Modern Product Card Component
interface ModernProductCardProps {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  rating: string;
  image: string;
  quantity: number;
  onAdd: () => void;
  onUpdateQuantity: (change: number) => void;
  onPress?: () => void;
}

const ModernProductCard = ({ 
  name, subtitle, price, originalPrice, rating, image, quantity, onAdd, onUpdateQuantity, onPress 
}: ModernProductCardProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const addButtonScale = useRef(new Animated.Value(1)).current;

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateAddButton = () => {
    Animated.sequence([
      Animated.timing(addButtonScale, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(addButtonScale, {
        toValue: 1.1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(addButtonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleAddPress = () => {
    animateAddButton();
    onAdd();
  };

  const handleCardPress = () => {
    animatePress();
    onPress?.();
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.9}
      onPress={handleCardPress}
    >
      <Animated.View 
        style={[
          styles.modernProductCard,
          { transform: [{ scale: scaleAnim }] }
        ]}
      >
        <View style={styles.productImageContainer}>
          <Image source={{ uri: image }} style={styles.productImage} resizeMode="cover" />
          <TouchableOpacity style={styles.favoriteButton}>
            <Heart size={16} color={COLORS.textMuted} />
          </TouchableOpacity>
          {originalPrice && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountBadgeText}>SALE</Text>
            </View>
          )}
        </View>
        
        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={1}>{name}</Text>
          <Text style={styles.productSubtitle} numberOfLines={1}>{subtitle}</Text>
          
          <View style={styles.ratingContainer}>
            <Star size={12} color={COLORS.warning} fill={COLORS.warning} />
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
          
          <View style={styles.priceRow}>
            <View style={styles.priceContainer}>
              <Text style={styles.currentPrice}>{price}</Text>
              {originalPrice && (
                <Text style={styles.originalPrice}>{originalPrice}</Text>
              )}
            </View>
            
            {quantity > 0 ? (
              <View style={styles.quantityControls}>
                <TouchableOpacity 
                  style={styles.quantityButton}
                  onPress={() => onUpdateQuantity(-1)}
                >
                  <Minus size={14} color={COLORS.primary} />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity 
                  style={styles.quantityButton}
                  onPress={() => onUpdateQuantity(1)}
                >
                  <Plus size={14} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity 
                style={styles.addToCartButton} 
                onPress={handleAddPress}
                activeOpacity={0.8}
              >
                <Animated.View style={{ transform: [{ scale: addButtonScale }] }}>
                  <Plus size={16} color={COLORS.surface} />
                </Animated.View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

// Offer Card Component
interface OfferCardProps {
  title: string;
  subtitle: string;
  discount: string;
  color: string;
  icon: string;
}

const OfferCard = ({ title, subtitle, discount, color, icon }: OfferCardProps) => (
  <TouchableOpacity style={[styles.offerCard, { backgroundColor: color }]} activeOpacity={0.8}>
    <View style={styles.offerHeader}>
      <Text style={styles.offerIcon}>{icon}</Text>
      <View style={styles.offerDiscountBadge}>
        <Percent size={12} color={COLORS.error} />
        <Text style={styles.discountText}>{discount}</Text>
      </View>
    </View>
    <Text style={styles.offerTitle}>{title}</Text>
    <Text style={styles.offerSubtitle}>{subtitle}</Text>
    <TouchableOpacity style={styles.offerButton}>
      <Text style={styles.offerButtonText}>Claim Now</Text>
    </TouchableOpacity>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  
  // Header Styles
  header: {
    backgroundColor: COLORS.surface,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 16 : 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationContainer: {
    flex: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  deliverLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  locationText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.error,
  },
  cartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.surface,
  },
  
  // Welcome Section
  welcomeSection: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  welcomeSubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  
  // Search Styles
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textMuted,
  },
  searchMic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Categories Section
  categoriesSection: {
    paddingTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  categoriesScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryCard: {
    width: 120,
    height: 100,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryCardSelected: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
  },
  categoryNameSelected: {
    color: COLORS.primary,
  },
  
  // Banner Section
  bannerSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  featuredBanner: {
    borderRadius: 20,
    padding: 20,
    height: 140,
    backgroundColor: COLORS.primary,
  },
  bannerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  bannerText: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.surface,
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: COLORS.surface,
    opacity: 0.9,
    marginBottom: 12,
  },
  bannerButton: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
  bannerImage: {
    width: 80,
    height: 80,
  },
  
  // Products Section
  productsSection: {
    paddingTop: 32,
    paddingHorizontal: 20,
  },
  mainProductGrid: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  modernProductCard: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 0,
    padding: 12,
    borderWidth: 0,
  },
  verticalDivider: {
    width: 1,
    backgroundColor: COLORS.border,
    alignSelf: 'stretch',
  },
  productImageContainer: {
    height: 130,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
    position: 'relative',
    backgroundColor: COLORS.background,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: COLORS.error,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  discountBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.surface,
  },
  productInfo: {
    gap: 4,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  productSubtitle: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: 2,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  originalPrice: {
    fontSize: 12,
    color: COLORS.textMuted,
    textDecorationLine: 'line-through',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 16,
    paddingHorizontal: 2,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    paddingHorizontal: 10,
  },
  addToCartButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // Today's Deals Section
  dealsSection: {
    paddingTop: 32,
  },
  dealsScroll: {
    paddingHorizontal: 20,
    gap: 16,
  },
  dealCard: {
    width: 160,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  dealBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  dealBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.surface,
  },
  dealTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  dealSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  dealButton: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  dealButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },

  // Offers Section
  offersSection: {
    paddingTop: 32,
  },
  offersScroll: {
    paddingHorizontal: 20,
    gap: 16,
  },
  offerCard: {
    width: 200,
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  offerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  offerIcon: {
    fontSize: 24,
  },
  offerDiscountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  discountText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.error,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  offerSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  offerButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  offerButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.surface,
  },
});

export default HomeScreen;