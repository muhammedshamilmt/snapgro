import { Award, ChevronLeft, Heart, Leaf, Minus, Plus, ShoppingCart, Sprout, Star, Store, Zap } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, Platform, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import ShopSelectionOverlay from './ShopSelectionOverlay';

const COLORS = {
  dark: '#022c2b',
  green: '#a6eb76',
  white: '#ffffff',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  red500: '#ef4444',
  purple500: '#a855f7',
  blue50: '#eff6ff',
  blue600: '#2563eb',
  green50: '#f0fdf4',
  green600: '#16a34a',
};

const SHADOWS = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  }
};

const FeatureIcon = ({ color, icon }: { color: string; icon: React.ReactNode }) => (
  <View style={{ 
    width: 32, 
    height: 32, 
    borderRadius: 16, 
    backgroundColor: color, 
    alignItems: 'center', 
    justifyContent: 'center' 
  }}>
    {icon}
  </View>
);

const StoreCard = ({ 
  name, 
  price, 
  delivery, 
  fee, 
  iconBg, 
  iconColor, 
  isZap 
}: {
  name: string;
  price: string;
  delivery: string;
  fee: string;
  iconBg: string;
  iconColor: string;
  isZap?: boolean;
}) => (
  <View style={{ 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 12, 
    borderRadius: 16, 
    borderWidth: 1, 
    borderColor: COLORS.gray100, 
    backgroundColor: COLORS.white, 
    ...SHADOWS.card 
  }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <View style={{ 
        width: 40, 
        height: 40, 
        borderRadius: 12, 
        backgroundColor: iconBg, 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <Store color={iconColor} size={20} />
      </View>
      <View>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: COLORS.dark }}>{name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          {isZap && <Zap size={10} color={iconColor} fill={iconColor} />}
          <Text style={{ 
            fontSize: 10, 
            color: isZap ? iconColor : COLORS.gray500, 
            fontWeight: '500' 
          }}>
            {delivery}
          </Text>
        </View>
      </View>
    </View>
    <View style={{ alignItems: 'flex-end' }}>
      <Text style={{ fontSize: 14, fontWeight: 'bold', color: COLORS.dark }}>{price}</Text>
      <Text style={{ fontSize: 10, color: COLORS.gray400 }}>{fee}</Text>
    </View>
  </View>
);

const ProductCard = ({ 
  image, 
  title, 
  weight, 
  price 
}: {
  image: string;
  title: string;
  weight: string;
  price: string;
}) => (
  <View style={{ 
    width: 150, 
    padding: 12, 
    borderRadius: 16, 
    backgroundColor: COLORS.white, 
    borderWidth: 1, 
    borderColor: COLORS.gray100, 
    ...SHADOWS.card 
  }}>
    <View style={{ 
      height: 112, 
      width: '100%', 
      marginBottom: 8, 
      backgroundColor: COLORS.gray50, 
      borderRadius: 12, 
      alignItems: 'center', 
      justifyContent: 'center', 
      position: 'relative' 
    }}>
      <Image 
        source={{ uri: image }} 
        style={{ width: 80, height: 80, resizeMode: 'contain' }} 
      />
      <TouchableOpacity style={{ 
        position: 'absolute', 
        top: 8, 
        right: 8, 
        width: 28, 
        height: 28, 
        borderRadius: 14, 
        backgroundColor: COLORS.white, 
        alignItems: 'center', 
        justifyContent: 'center', 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 1 }, 
        shadowOpacity: 0.1, 
        shadowRadius: 2, 
        elevation: 2 
      }}>
        <Heart color={COLORS.gray400} size={16} />
      </TouchableOpacity>
    </View>
    <Text style={{ fontSize: 14, fontWeight: 'bold', color: COLORS.dark }} numberOfLines={1}>
      {title}
    </Text>
    <Text style={{ fontSize: 12, color: COLORS.gray400, marginBottom: 8 }}>
      {weight}
    </Text>
    <View style={{ 
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      marginTop: 'auto' 
    }}>
      <Text style={{ fontSize: 14, fontWeight: 'bold', color: COLORS.dark }}>{price}</Text>
      <TouchableOpacity style={{ 
        width: 28, 
        height: 28, 
        borderRadius: 8, 
        backgroundColor: COLORS.green, 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <Plus color={COLORS.dark} size={18} />
      </TouchableOpacity>
    </View>
  </View>
);

interface ProductDetailScreenProps {
  onBack?: () => void;
  product?: any;
}

export default function ProductDetailScreen({ onBack, product }: ProductDetailScreenProps) {
  const [quantity, setQuantity] = useState(1);
  const [showShopSelection, setShowShopSelection] = useState(false);
  const [selectedShop, setSelectedShop] = useState<string | null>(null);

  const handleAddToCart = () => {
    if (!selectedShop) {
      setShowShopSelection(true);
    } else {
      // Add to cart logic here
      console.log(`Added ${quantity} items to cart from shop ${selectedShop}`);
    }
  };

  const handleShopConfirm = (storeId: string) => {
    setSelectedShop(storeId);
    // Add to cart after shop selection
    console.log(`Added ${quantity} items to cart from shop ${storeId}`);
  };

  const incrementQuantity = () => {
    setQuantity((prev: number) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev: number) => Math.max(1, prev - 1));
  };
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.dark }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.dark} />
      
      {/* Fixed Header */}
      <SafeAreaView style={{ backgroundColor: COLORS.dark, zIndex: 10 }}>
        <View style={{ 
          height: 100, 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          paddingHorizontal: 30, 
          paddingTop:40,
        }}>
          <TouchableOpacity 
            style={{ 
              width: 40, 
              height: 40, 
              borderRadius: 20, 
              backgroundColor: COLORS.white, 
              alignItems: 'center', 
              justifyContent: 'center' 
            }} 
            activeOpacity={0.8}
            onPress={onBack}
          >
            <ChevronLeft color={COLORS.dark} size={20} strokeWidth={3} />
          </TouchableOpacity>
          
          <Text style={{ 
            fontSize: 20, 
            fontWeight: '600', 
            color: COLORS.white, 
            letterSpacing: 0.5 
          }}>
            Product Details
          </Text>
          
          <TouchableOpacity 
            style={{ 
              width: 40, 
              height: 40, 
              borderRadius: 20, 
              backgroundColor: COLORS.white, 
              alignItems: 'center', 
              justifyContent: 'center' 
            }} 
            activeOpacity={0.8}
          >
            <ShoppingCart color={COLORS.dark} size={22} />
            <View style={{ 
              position: 'absolute', 
              top: -2, 
              right: -2, 
              backgroundColor: COLORS.red500, 
              width: 16, 
              height: 16, 
              borderRadius: 8, 
              alignItems: 'center', 
              justifyContent: 'center', 
              borderWidth: 2, 
              borderColor: COLORS.white 
            }}>
              <Text style={{ color: COLORS.white, fontSize: 9, fontWeight: 'bold' }}>2</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Scrollable Content */}
      <View style={{ flex: 1 }}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
          style={{ flex: 1 }}
        >
          {/* White Card Container */}
          <View style={{ 
            backgroundColor: COLORS.white, 
            borderTopLeftRadius: 40, 
            borderTopRightRadius: 40, 
            marginTop: 10, 
            minHeight: 800,
            paddingBottom: 40,
            overflow: 'hidden'
          }}>
            {/* Handle Indicator */}
            <View style={{ alignItems: 'center', marginTop: 12 }}>
              <View style={{ 
                width: 64, 
                height: 4, 
                backgroundColor: COLORS.gray200, 
                borderRadius: 2 
              }} />
            </View>

            {/* Product Image */}
            <View style={{ alignItems: 'center', paddingTop: 32, paddingBottom: 16 }}>
              <View style={{ 
                width: 256, 
                height: 256, 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <Image 
                  source={{ 
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0MyPYqgrD_M_ksIcBx9bFnjWMjhjGs6BMO2GE3R_n_tHTbWGYhgEg6hQdj2bCmovTZOanmmbbxoSQ0pS1ca0vsIp3xMHeuDwYYrYfQ3u-1-iXZH1oXQuwcOuE5oza5YQoh_ItfrdHYM6APkL_I1fhR7W4DbW7PjSlh0aXbD0d3tX8Zv2DTGx528G_nIFvc3XV7OqNxWosG0PyIVK3KDJfo7-vxYZWMXiXD82Xs2hFdxc9r7-08-i_GHkPJjjkAGLhOx54s_65iVlz" 
                  }}
                  style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                />
              </View>
            </View>

            {/* Content Padding */}
            <View style={{ paddingHorizontal: 24 }}>
              {/* Title Row */}
              <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start', 
                marginBottom: 4 
              }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ 
                    fontSize: 24, 
                    fontWeight: 'bold', 
                    color: COLORS.dark, 
                    lineHeight: 30 
                  }}>
                    Beef Mixed Cut Bone{'\n'}In 50 gm
                  </Text>
                  <Text style={{ 
                    color: COLORS.gray400, 
                    fontSize: 14, 
                    fontWeight: '500', 
                    marginTop: 4 
                  }}>
                    1000 gm
                  </Text>
                </View>
                <TouchableOpacity style={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: 20, 
                  borderWidth: 1, 
                  borderColor: COLORS.gray200, 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginTop: 4 
                }}>
                  <Heart color={COLORS.dark} size={20} />
                </TouchableOpacity>
              </View>

              {/* Price Row */}
              <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginTop: 24, 
                marginBottom: 24 
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  <Text style={{ fontSize: 30, fontWeight: 'bold', color: COLORS.dark }}>23.</Text>
                  <Text style={{ 
                    fontSize: 18, 
                    fontWeight: 'bold', 
                    color: COLORS.dark, 
                    marginTop: 6 
                  }}>
                    46$
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <View style={{ 
                    width: 20, 
                    height: 20, 
                    borderRadius: 10, 
                    backgroundColor: COLORS.purple500, 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <Zap color={COLORS.white} size={12} fill={COLORS.white} />
                  </View>
                  <Text style={{ color: COLORS.gray500, fontSize: 14 }}>
                    Available on fast delivery
                  </Text>
                </View>
              </View>

              {/* Features Row */}
              <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: 24 
              }}>
                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <FeatureIcon 
                    color="#8B1D4F" 
                    icon={<Leaf color={COLORS.white} size={16} />} 
                  />
                  <FeatureIcon 
                    color="#D97736" 
                    icon={<Award color={COLORS.white} size={16} />} 
                  />
                  <FeatureIcon 
                    color="#1D4A8B" 
                    icon={<Sprout color={COLORS.white} size={16} />} 
                  />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Star color={COLORS.dark} size={18} fill={COLORS.dark} />
                  <Text style={{ 
                    color: COLORS.dark, 
                    fontWeight: 'bold', 
                    fontSize: 14 
                  }}>
                    4.5 Rating
                  </Text>
                </View>
              </View>

              {/* Description */}
              <Text style={{ 
                color: COLORS.gray500, 
                fontSize: 14, 
                lineHeight: 22, 
                marginBottom: 8 
              }}>
                100% satisfaction guarantee. If you experience any of the following issues, missing, poor item, late arrival, unprofessional servic...
                <Text style={{ color: COLORS.dark, fontWeight: 'bold' }}>Read more</Text>
              </Text>
              
              <View style={{ 
                height: 1, 
                backgroundColor: COLORS.gray100, 
                marginVertical: 24 
              }} />

              {/* Other Stores */}
              <View style={{ marginBottom: 32 }}>
                <View style={{ 
                  flexDirection: 'row', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: 16 
                }}>
                  <Text style={{ 
                    fontSize: 18, 
                    fontWeight: 'bold', 
                    color: COLORS.dark 
                  }}>
                    Available at Other Stores
                  </Text>
                  <Text style={{ fontSize: 12, color: COLORS.gray400 }}>
                    Compare Prices
                  </Text>
                </View>
                <View style={{ gap: 12 }}>
                  <StoreCard 
                    name="Whole Foods" 
                    price="$23.46" 
                    delivery="15 min delivery" 
                    fee="Free delivery"
                    iconBg={COLORS.green50}
                    iconColor={COLORS.green600}
                    isZap
                  />
                  <StoreCard 
                    name="Fresh Mart" 
                    price="$24.10" 
                    delivery="25 min delivery" 
                    fee="+$1.50 fee"
                    iconBg={COLORS.blue50}
                    iconColor={COLORS.blue600}
                  />
                </View>
              </View>

              {/* Similar Products */}
              <View style={{ marginBottom: 24 }}>
                <View style={{ 
                  flexDirection: 'row', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: 16 
                }}>
                  <Text style={{ 
                    fontSize: 18, 
                    fontWeight: 'bold', 
                    color: COLORS.dark 
                  }}>
                    Similar Products
                  </Text>
                  <Text style={{ 
                    fontSize: 14, 
                    fontWeight: '500', 
                    color: COLORS.dark, 
                    opacity: 0.6 
                  }}>
                    See all
                  </Text>
                </View>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false} 
                  contentContainerStyle={{ paddingRight: 24, gap: 16 }} 
                  style={{ marginHorizontal: -24, paddingHorizontal: 24 }}
                >
                  <ProductCard 
                    image="https://lh3.googleusercontent.com/aida-public/AB6AXuCdfHgbnDxNcJQS4ZczOUycUKcbD0MeQ2bKC9TSkqU0OAyHwMBUOYtTxO9esYvX3ieagPKBj1gMuUcZY0VchGYBRF6yCqzyER__Bi1ZO1Rsy6_d_tL718dZb47DafCoyAda9Wq0zkNrnk6qWkZWjgWbXxdYDZx5_e8UHxF7pv5Wg_ghwNgXeM7zEXFCp9pNw-UyHLe8TKxakJge4PyS2QiM-HT0oXIilGAabafRDHCHWGkhcDp1lb6xnW2p6iDbxkCvdpVPpVYHKaXe"
                    title="Valencia Oranges"
                    weight="1kg bag"
                    price="$3.50"
                  />
                  <ProductCard 
                    image="https://lh3.googleusercontent.com/aida-public/AB6AXuDR0PUEz5dV9VqC11HvSARBayzKYwyOj5eb1nIIYcX08ZSCXvetanXnuzI7PisS1zXDM50amsf0fowrf60Xjcp6usJnbDep01t_ZLFRFp40_AmlkouqH4Brqnbs1aYHAfyULJmRPM-ONWkDkNCabWZGN4SXWJ16ekbJQuNbVdDrBix0ZGpfTB92_pdYdc37M5CM7r8GIDEtUnho706l-GfALctMiEHpCMqqJ-1bPNj_jtqJpzEhOAhFgZXqsRJc-G57iJyvdur0ELGC"
                    title="Mixed Veggies"
                    weight="500g pack"
                    price="$4.20"
                  />
                  <ProductCard 
                    image="https://lh3.googleusercontent.com/aida-public/AB6AXuDS8LgHVXPsaasZ3lAhUACgHDSdRPGrVV1TFnSrcT7UwyNoJvw0aL1728bE2g2qakcbGXhWBPolXXOr1eqVsSq0G_8uwfIxwfe9e0i5gPhfq5_0PCxU0fAvzeLA5cjHikbKPuGmGBo-0OPAiS_b0L-UVkAYpuaqlWf-76QDMW06sn2OrXbqUdjWAZVhpKdqj3B78tXxZnbGHCErdXAq1DEA_hysqTbttwbYAtzy3xW5RtE2NCDMmJIprzJQh5539TFeQePz4lrKfa24"
                    title="Sourdough Bread"
                    weight="Fresh baked"
                    price="$5.99"
                  />
                </ScrollView>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Footer */}
      <View style={{ 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        backgroundColor: COLORS.white, 
        borderTopWidth: 1, 
        borderTopColor: COLORS.gray50, 
        paddingHorizontal: 24, 
        paddingTop: 12, 
        paddingBottom: Platform.OS === 'ios' ? 34 : 20 
      }}>
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          gap: 24 
        }}>
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            backgroundColor: '#f0f4ef', 
            borderRadius: 24, 
            height: 48, 
            width: 128, 
            paddingHorizontal: 4 
          }}>
            <TouchableOpacity 
              style={{ 
                width: 40, 
                height: 40, 
                borderRadius: 20, 
                backgroundColor: COLORS.white, 
                alignItems: 'center', 
                justifyContent: 'center', 
                borderWidth: 1, 
                borderColor: COLORS.gray300, 
                ...SHADOWS.sm 
              }}
              onPress={decrementQuantity}
            >
              <Minus color={COLORS.dark} size={18} />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.dark }}>{quantity}</Text>
            <TouchableOpacity 
              style={{ 
                width: 40, 
                height: 40, 
                borderRadius: 20, 
                backgroundColor: COLORS.white, 
                alignItems: 'center', 
                justifyContent: 'center', 
                borderWidth: 1, 
                borderColor: COLORS.gray300, 
                ...SHADOWS.sm 
              }}
              onPress={incrementQuantity}
            >
              <Plus color={COLORS.dark} size={18} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style={{ 
              flex: 1, 
              height: 56, 
              backgroundColor: COLORS.green, 
              borderRadius: 28, 
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: 8, 
              shadowColor: '#a6eb76', 
              shadowOffset: { width: 0, height: 4 }, 
              shadowOpacity: 0.5, 
              shadowRadius: 8, 
              elevation: 4 
            }}
            onPress={handleAddToCart}
          >
            <ShoppingCart color={COLORS.dark} size={20} />
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.dark }}>
              {selectedShop ? 'Add to cart' : 'Select shop & add'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Shop Selection Overlay */}
      <ShopSelectionOverlay
        visible={showShopSelection}
        onClose={() => setShowShopSelection(false)}
        onConfirm={handleShopConfirm}
      />
    </View>
  );
}