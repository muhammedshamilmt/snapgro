import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import 'react-native-reanimated';


import AddNewAddressScreen from '@/components/AddNewAddressScreen';
import AddNewCardScreen from '@/components/AddNewCardScreen';
import AIChefScreen from '@/components/AIChefScreen';
import CartScreen from '@/components/CartScreen';
import CategoriesScreen from '@/components/CategoriesScreen';
import CheckoutScreen from '@/components/CheckoutScreen';
import DeliveryAddressesScreen from '@/components/DeliveryAddressesScreen';
import HelpScreen from '@/components/HelpScreen';
import HomeScreen from '@/components/HomeScreen';
import LoginScreen from '@/components/LoginScreen';
import NotificationsScreen from '@/components/NotificationsScreen';
import OnboardingOne from '@/components/OnboardingOne';
import OnboardingThree from '@/components/OnboardingThree';
import OnboardingTwo from '@/components/OnboardingTwo';
import OrdersScreen from '@/components/OrdersScreen';
import OrderSuccessScreen from '@/components/OrderSuccessScreen';
import PaymentMethodsScreen from '@/components/PaymentMethodsScreen';
import PaymentScreen from '@/components/PaymentScreen';
import PersonalDetailsScreen from '@/components/PersonalDetailsScreen';
import ProductDetailScreen from '@/components/ProductDetailScreen';
import ProductsScreen from '@/components/ProductsScreen';
import ProfileScreen from '@/components/ProfileScreen';
import RewardsScreen from '@/components/RewardsScreen';
import SecondWelcomeScreen from '@/components/SecondWelcomeScreen';
import SignUpScreen from '@/components/SignUpScreen';
import SplashScreen from '@/components/SplashScreen';
import TrackOrderScreen from '@/components/TrackOrderScreen';
import WelcomeScreen from '@/components/WelcomeScreen';
import { AuthProvider } from '@/contexts/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutContent />
    </AuthProvider>
  );
}

function RootLayoutContent() {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showSecondWelcome, setShowSecondWelcome] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showOnboardingOne, setShowOnboardingOne] = useState(false);
  const [showOnboardingTwo, setShowOnboardingTwo] = useState(false);
  const [showOnboardingThree, setShowOnboardingThree] = useState(false);
  const [showHome, setShowHome] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [showTrackOrder, setShowTrackOrder] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [showDeliveryAddresses, setShowDeliveryAddresses] = useState(false);
  const [showPersonalDetails, setShowPersonalDetails] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showAddNewCard, setShowAddNewCard] = useState(false);
  const [showAddNewAddress, setShowAddNewAddress] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [showAIChef, setShowAIChef] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [orderItems, setOrderItems] = useState<string[]>([]);
  const [currentOrderId, setCurrentOrderId] = useState<string>('#29301');

  useEffect(() => {
    // Hide splash screen after 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    setShowWelcome(false);
    setShowSecondWelcome(true);
  };

  const handleLogin = () => {
    // Handle login navigation from first welcome - go to login screen
    setShowWelcome(false);
    setShowSecondWelcome(false);
    setShowLogin(true);
  };

  const handleSignUp = () => {
    // Handle sign up from second welcome - go to signup screen
    setShowSecondWelcome(false);
    setShowSignUp(true);
  };

  const handleSignIn = () => {
    // Handle sign in from second welcome - go to login screen
    setShowSecondWelcome(false);
    setShowLogin(true);
  };

  const handleContinueAsGuest = () => {
    // Handle guest mode - go to home screen
    setShowSecondWelcome(false);
    setShowLogin(false);
    setShowSignUp(false);
    setShowOnboardingOne(false);
    setShowOnboardingTwo(false);
    setShowOnboardingThree(false);
    setShowHome(true);
  };

  const handleHelp = () => {
    // Handle help action
    console.log('Help pressed');
  };

  // Login screen handlers
  const handleBackFromLogin = () => {
    // Go back to second welcome screen
    setShowLogin(false);
    setShowSecondWelcome(true);
  };

  const handleLoginSuccess = () => {
    // Handle successful login - go directly to home screen
    setShowLogin(false);
    setShowHome(true);
  };

  const handleForgotPassword = () => {
    // Handle forgot password
    console.log('Forgot password pressed');
  };

  const handleGoogleLogin = () => {
    // Handle Google login - go directly to home screen
    setShowLogin(false);
    setShowHome(true);
  };

  const handleGuestLoginFromLogin = () => {
    // Handle guest login from login screen - go to home screen
    setShowLogin(false);
    setShowHome(true);
  };

  const handleSignUpFromLogin = () => {
    // Handle sign up from login screen - go to signup screen
    setShowLogin(false);
    setShowSignUp(true);
  };

  // SignUp screen handlers
  const handleBackFromSignUp = () => {
    // Go back to second welcome screen
    setShowSignUp(false);
    setShowSecondWelcome(true);
  };

  const handleSignUpSuccess = () => {
    // Handle successful signup - go directly to home screen
    setShowSignUp(false);
    setShowHome(true);
  };

  const handleGoogleSignUp = () => {
    // Handle Google signup - go directly to home screen
    setShowSignUp(false);
    setShowHome(true);
  };

  const handleFacebookSignUp = () => {
    // Handle Facebook signup - go directly to home screen
    setShowSignUp(false);
    setShowHome(true);
  };

  const handleLoginFromSignUp = () => {
    // Handle login from signup screen - go to login screen
    setShowSignUp(false);
    setShowLogin(true);
  };

  // Onboarding One screen handlers
  const handleSkipOnboardingOne = () => {
    // Skip onboarding - go to home screen
    setShowOnboardingOne(false);
    setShowHome(true);
  };

  const handleNextOnboardingOne = () => {
    // Next to second onboarding screen
    setShowOnboardingOne(false);
    setShowOnboardingTwo(true);
  };

  // Onboarding Two screen handlers
  const handleSkipOnboardingTwo = () => {
    // Skip onboarding - go to home screen
    setShowOnboardingTwo(false);
    setShowHome(true);
  };

  const handleNextOnboardingTwo = () => {
    // Next to third onboarding screen
    setShowOnboardingTwo(false);
    setShowOnboardingThree(true);
  };

  const handleBackOnboardingTwo = () => {
    // Go back to first onboarding
    setShowOnboardingTwo(false);
    setShowOnboardingOne(true);
  };

  // Onboarding Three screen handlers
  const handleSkipOnboardingThree = () => {
    // Skip onboarding - go to home screen
    setShowOnboardingThree(false);
    setShowHome(true);
  };

  const handleStartShopping = () => {
    // Complete onboarding - go to home screen
    setShowOnboardingThree(false);
    setShowHome(true);
  };

  const handleLoginFromOnboardingThree = () => {
    // Go to login from onboarding three
    setShowOnboardingThree(false);
    setShowLogin(true);
  };

  // Home screen handlers
  const handleNavigateFromHome = (screen: string) => {
    if (screen === 'categories') {
      setShowHome(false);
      setShowCategories(true);
    } else if (screen === 'products') {
      setShowHome(false);
      setShowProducts(true);
    } else if (screen === 'cart') {
      setShowHome(false);
      setShowCart(true);
    } else if (screen === 'ai-chef') {
      setShowHome(false);
      setShowAIChef(true);
    } else if (screen === 'profile') {
      setShowHome(false);
      setShowProfile(true);
    } else {
      console.log(`Navigate to ${screen}`);
    }
  };

  // Categories screen handlers
  const handleBackFromCategories = () => {
    setShowCategories(false);
    setShowHome(true);
  };

  const handleCategorySelect = (category: any) => {
    console.log('Selected category:', category.title);
    // You can add navigation to category products here
  };

  const handleSearchFromCategories = () => {
    console.log('Search pressed from categories');
    // You can add search functionality here
  };

  const handleNavigateFromCategories = (screen: string) => {
    if (screen === 'home') {
      setShowCategories(false);
      setShowHome(true);
    } else if (screen === 'cart') {
      setShowCategories(false);
      setShowCart(true);
    } else if (screen === 'ai-chef') {
      setShowCategories(false);
      setShowAIChef(true);
    } else if (screen === 'profile') {
      setShowCategories(false);
      setShowProfile(true);
    } else {
      console.log(`Navigate to ${screen} from categories`);
    }
  };

  // Products screen handlers
  const handleBackFromProducts = () => {
    setShowProducts(false);
    setShowHome(true);
  };

  const handleCartFromProducts = () => {
    setShowProducts(false);
    setShowCart(true);
  };

  const handleProductAdd = (product: any) => {
    setCartItems((prev: any[]) => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { 
        ...product, 
        qty: 1,
        desc: product.subtitle || product.description || 'Fresh product',
        price: parseFloat(product.price) || 0
      }];
    });
    console.log('Product added:', product.title || product.name);
  };

  const handleSearchFromProducts = () => {
    console.log('Search pressed from products');
    // You can add search functionality here
  };

  const handleFilterFromProducts = () => {
    console.log('Filter pressed from products');
    // You can add filter functionality here
  };

  const handleProductPress = (product: any) => {
    console.log('Product pressed:', product.name);
    setSelectedProduct(product);
    setShowProducts(false);
    setShowProductDetail(true);
  };

  // Product detail screen handlers
  const handleBackFromProductDetail = () => {
    setShowProductDetail(false);
    setShowProducts(true);
    setSelectedProduct(null);
  };

  // Cart screen handlers
  const handleBackFromCart = () => {
    setShowCart(false);
    setShowHome(true);
  };

  const handleCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  // Checkout screen handlers
  const handleBackFromCheckout = () => {
    setShowCheckout(false);
    setShowCart(true);
  };

  const handlePlaceOrder = () => {
    setShowCheckout(false);
    setShowPayment(true);
  };

  // Payment screen handlers
  const handleBackFromPayment = () => {
    setShowPayment(false);
    setShowCheckout(true);
  };

  const handleConfirmPayment = (paymentMethod: string) => {
    console.log(`Payment confirmed with ${paymentMethod}`);
    // Store order items for success screen
    setOrderItems(cartItems.map(item => item.image).filter(Boolean));
    // Clear cart and show success screen
    setCartItems([]);
    setShowPayment(false);
    setShowOrderSuccess(true);
  };

  // Order success screen handlers
  const handleCloseOrderSuccess = () => {
    setShowOrderSuccess(false);
    setShowHome(true);
  };

  const handleTrackOrder = () => {
    console.log('Track order pressed');
    setShowOrderSuccess(false);
    setShowTrackOrder(true);
  };

  const handleContinueShopping = () => {
    setShowOrderSuccess(false);
    setShowHome(true);
  };

  const handleNeedHelp = () => {
    console.log('Need help pressed');
    // You can add help/support functionality here
  };

  // Track order screen handlers
  const handleBackFromTrackOrder = () => {
    setShowTrackOrder(false);
    setShowHome(true);
  };

  const handleChatDriver = () => {
    console.log('Chat with driver pressed');
    // You can add chat functionality here
  };

  const handleCallDriver = () => {
    console.log('Call driver pressed');
    // You can add call functionality here
  };

  const handleTrackOrderHelp = () => {
    console.log('Track order help pressed');
    // You can add help/support functionality here
  };

  // Profile screen handlers
  const handleNavigateFromProfile = (screen: string) => {
    if (screen === 'home') {
      setShowProfile(false);
      setShowHome(true);
    } else if (screen === 'categories') {
      setShowProfile(false);
      setShowCategories(true);
    } else if (screen === 'cart') {
      setShowProfile(false);
      setShowCart(true);
    } else if (screen === 'ai-chef') {
      setShowProfile(false);
      setShowAIChef(true);
    } else {
      console.log(`Navigate to ${screen} from profile`);
    }
  };

  const handleEditProfile = () => {
    console.log('Edit profile pressed');
    // You can add edit profile functionality here
  };

  const handleLogout = () => {
    console.log('Logout pressed');
    // Clear all state and go back to welcome screen
    setCartItems([]);
    setOrderItems([]);
    setSelectedProduct(null);
    setShowProfile(false);
    setShowWelcome(true);
  };

  // Orders screen handlers
  const handleNavigateToOrders = () => {
    setShowProfile(false);
    setShowOrders(true);
  };

  const handleBackFromOrders = () => {
    setShowOrders(false);
    setShowProfile(true);
  };

  // Payment Methods screen handlers
  const handleNavigateToPaymentMethods = () => {
    setShowProfile(false);
    setShowPaymentMethods(true);
  };

  const handleBackFromPaymentMethods = () => {
    setShowPaymentMethods(false);
    setShowProfile(true);
  };

  // Delivery Addresses screen handlers
  const handleNavigateToDeliveryAddresses = () => {
    setShowProfile(false);
    setShowDeliveryAddresses(true);
  };

  const handleBackFromDeliveryAddresses = () => {
    setShowDeliveryAddresses(false);
    setShowProfile(true);
  };

  // Personal Details screen handlers
  const handleNavigateToPersonalDetails = () => {
    setShowProfile(false);
    setShowPersonalDetails(true);
  };

  const handleBackFromPersonalDetails = () => {
    setShowPersonalDetails(false);
    setShowProfile(true);
  };

  // Notifications screen handlers
  const handleNavigateToNotifications = () => {
    setShowProfile(false);
    setShowNotifications(true);
  };

  const handleBackFromNotifications = () => {
    setShowNotifications(false);
    setShowProfile(true);
  };

  // Help screen handlers
  const handleNavigateToHelp = () => {
    setShowProfile(false);
    setShowHelp(true);
  };

  const handleBackFromHelp = () => {
    setShowHelp(false);
    setShowProfile(true);
  };

  // Add New Card screen handlers
  const handleNavigateToAddNewCard = () => {
    setShowPaymentMethods(false);
    setShowAddNewCard(true);
  };

  const handleBackFromAddNewCard = () => {
    setShowAddNewCard(false);
    setShowPaymentMethods(true);
  };

  // Add New Address screen handlers
  const handleNavigateToAddNewAddress = () => {
    setShowDeliveryAddresses(false);
    setShowAddNewAddress(true);
  };

  const handleBackFromAddNewAddress = () => {
    setShowAddNewAddress(false);
    setShowDeliveryAddresses(true);
  };

  // Rewards screen handlers
  const handleNavigateToRewards = () => {
    setShowProfile(false);
    setShowRewards(true);
  };

  const handleBackFromRewards = () => {
    setShowRewards(false);
    setShowProfile(true);
  };

  // AI Chef screen handlers
  const handleNavigateToAIChef = () => {
    setShowHome(false);
    setShowAIChef(true);
  };

  const handleBackFromAIChef = () => {
    setShowAIChef(false);
    setShowHome(true);
  };

  const handleTrackOrderFromOrders = (orderId: string) => {
    console.log(`Track order ${orderId} from orders screen`);
    setCurrentOrderId(orderId);
    setShowOrders(false);
    setShowTrackOrder(true);
  };

  const handleViewOrderDetails = (orderId: string) => {
    console.log(`View details for order ${orderId}`);
    // You can add order details functionality here
  };

  const handleReorderFromOrders = (orderId: string) => {
    console.log(`Reorder ${orderId}`);
    // You can add reorder functionality here
    // This could navigate back to cart with previous items
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  if (showWelcome) {
    return (
      <WelcomeScreen 
        onGetStarted={handleGetStarted}
        onLogin={handleLogin}
      />
    );
  }

  if (showSecondWelcome) {
    return (
      <SecondWelcomeScreen 
        onSignUp={handleSignUp}
        onSignIn={handleSignIn}
        onContinueAsGuest={handleContinueAsGuest}
        onHelp={handleHelp}
      />
    );
  }

  if (showLogin) {
    return (
      <LoginScreen 
        onBack={handleBackFromLogin}
        onHelp={handleHelp}
        onLogin={handleLoginSuccess}
        onForgotPassword={handleForgotPassword}
        onGoogleLogin={handleGoogleLogin}
        onGuestLogin={handleGuestLoginFromLogin}
        onSignUp={handleSignUpFromLogin}
      />
    );
  }

  if (showSignUp) {
    return (
      <SignUpScreen 
        onBack={handleBackFromSignUp}
        onSignUp={handleSignUpSuccess}
        onGoogleSignUp={handleGoogleSignUp}
        onFacebookSignUp={handleFacebookSignUp}
        onLogin={handleLoginFromSignUp}
      />
    );
  }

  if (showOnboardingOne) {
    return (
      <OnboardingOne 
        onSkip={handleSkipOnboardingOne}
        onNext={handleNextOnboardingOne}
      />
    );
  }

  if (showOnboardingTwo) {
    return (
      <OnboardingTwo 
        onSkip={handleSkipOnboardingTwo}
        onNext={handleNextOnboardingTwo}
        onBack={handleBackOnboardingTwo}
      />
    );
  }

  if (showOnboardingThree) {
    return (
      <OnboardingThree 
        onSkip={handleSkipOnboardingThree}
        onStartShopping={handleStartShopping}
        onLogin={handleLoginFromOnboardingThree}
      />
    );
  }

  if (showHome) {
    return (
      <HomeScreen 
        onNavigate={handleNavigateFromHome}
        cartCount={cartItems.reduce((sum, item) => sum + (item.qty || item.quantity || 1), 0)}
        onProductAdd={handleProductAdd}
        onProductPress={(product) => {
          setSelectedProduct(product);
          setShowHome(false);
          setShowProductDetail(true);
        }}
      />
    );
  }

  if (showCategories) {
    return (
      <CategoriesScreen 
        onBack={handleBackFromCategories}
        onCategorySelect={handleCategorySelect}
        onSearch={handleSearchFromCategories}
        onNavigate={handleNavigateFromCategories}
        cartCount={cartItems.reduce((sum, item) => sum + (item.qty || item.quantity || 1), 0)}
      />
    );
  }

  if (showProducts) {
    return (
      <ProductsScreen 
        onBack={handleBackFromProducts}
        onCartPress={handleCartFromProducts}
        onProductAdd={handleProductAdd}
        onProductPress={handleProductPress}
        onSearch={handleSearchFromProducts}
        onFilter={handleFilterFromProducts}
      />
    );
  }

  if (showOrders) {
    return (
      <OrdersScreen 
        onBack={handleBackFromOrders}
        onTrackOrder={handleTrackOrderFromOrders}
        onViewDetails={handleViewOrderDetails}
        onReorder={handleReorderFromOrders}
      />
    );
  }

  if (showProfile) {
    return (
      <ProfileScreen 
        onNavigate={handleNavigateFromProfile}
        onEditProfile={handleEditProfile}
        onLogout={handleLogout}
        onNavigateToOrders={handleNavigateToOrders}
        onNavigateToPaymentMethods={handleNavigateToPaymentMethods}
        onNavigateToDeliveryAddresses={handleNavigateToDeliveryAddresses}
        onNavigateToPersonalDetails={handleNavigateToPersonalDetails}
        onNavigateToNotifications={handleNavigateToNotifications}
        onNavigateToHelp={handleNavigateToHelp}
        onNavigateToRewards={handleNavigateToRewards}
        cartCount={cartItems.reduce((sum, item) => sum + (item.qty || item.quantity || 1), 0)}
      />
    );
  }

  if (showPaymentMethods) {
    return (
      <PaymentMethodsScreen 
        onBack={handleBackFromPaymentMethods}
        onAddNewCard={handleNavigateToAddNewCard}
      />
    );
  }

  if (showDeliveryAddresses) {
    return (
      <DeliveryAddressesScreen 
        onBack={handleBackFromDeliveryAddresses}
        onAddNewAddress={handleNavigateToAddNewAddress}
      />
    );
  }

  if (showPersonalDetails) {
    return (
      <PersonalDetailsScreen 
        onBack={handleBackFromPersonalDetails}
      />
    );
  }

  if (showNotifications) {
    return (
      <NotificationsScreen 
        onBack={handleBackFromNotifications}
      />
    );
  }

  if (showHelp) {
    return (
      <HelpScreen 
        onBack={handleBackFromHelp}
      />
    );
  }

  if (showAddNewCard) {
    return (
      <AddNewCardScreen 
        onBack={handleBackFromAddNewCard}
      />
    );
  }

  if (showAddNewAddress) {
    return (
      <AddNewAddressScreen 
        onBack={handleBackFromAddNewAddress}
      />
    );
  }

  if (showRewards) {
    return (
      <RewardsScreen 
        onBack={handleBackFromRewards}
      />
    );
  }

  if (showAIChef) {
    return (
      <AIChefScreen 
        onBack={handleBackFromAIChef}
      />
    );
  }

  if (showTrackOrder) {
    return (
      <TrackOrderScreen 
        onBack={handleBackFromTrackOrder}
        onChatDriver={handleChatDriver}
        onCallDriver={handleCallDriver}
        onNeedHelp={handleTrackOrderHelp}
        orderId={currentOrderId}
      />
    );
  }

  if (showOrderSuccess) {
    return (
      <OrderSuccessScreen 
        onClose={handleCloseOrderSuccess}
        onTrackOrder={handleTrackOrder}
        onContinueShopping={handleContinueShopping}
        onNeedHelp={handleNeedHelp}
        orderItems={orderItems}
      />
    );
  }

  if (showPayment) {
    return (
      <PaymentScreen 
        onBack={handleBackFromPayment}
        onConfirmPayment={handleConfirmPayment}
      />
    );
  }

  if (showCheckout) {
    return (
      <CheckoutScreen 
        onBack={handleBackFromCheckout}
        onPlaceOrder={handlePlaceOrder}
        cartItems={cartItems}
      />
    );
  }

  if (showCart) {
    return (
      <CartScreen 
        onBack={handleBackFromCart}
        onCheckout={handleCheckout}
        cartItems={cartItems}
      />
    );
  }

  if (showProductDetail && selectedProduct) {
    return (
      <ProductDetailScreen 
        onBack={handleBackFromProductDetail}
        product={selectedProduct}
      />
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
