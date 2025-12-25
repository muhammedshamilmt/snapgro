import {
    Check,
    Clock,
    Search,
    Star,
    Truck,
    X,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    Modal,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// --- Theme Constants ---
const COLORS = {
  primary: '#13ec5b',
  backgroundLight: '#f6f8f6',
  surfaceLight: '#ffffff',
  inputLight: '#f0f4f2',
  textDark: '#111813',
  textMuted: '#61896f',
  border: '#e5e7eb',
  yellow: '#eab308',
  red: '#ef4444',
  redBg: '#fef2f2',
  gray200: '#e5e7eb',
  gray100: '#f3f4f6',
  overlay: 'rgba(0, 0, 0, 0.6)',
};

const FONTS = {
  display: Platform.select({ ios: 'System', android: 'sans-serif' }),
  body: Platform.select({ ios: 'System', android: 'sans-serif' }),
};

// --- Mock Data ---
const STORES = [
  {
    id: '1',
    name: 'Whole Foods Market',
    price: '$1.99',
    rating: 4.8,
    count: '1.2k',
    distance: '1.2 mi',
    time: '15-25 min',
    fee: '$1.99 Fee',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIRHjyu2mqcG_uhNs9TRfisGUMS4VMxkzMyyTu88_VaY4oxE3zsC4zBCS-m-UuYU0ZMIogkt8hgOAoa_C_xp12kU1M7JzQSQQ4FakdGn04hDi5fY-dMnXkY95g4V2ymGu5pAMHUTflJmBMj-6zBi-PZXZxZFcp_cQDuimoBIhmSXJjrwO_Ekark3sltpqrHgzp213pBfrLghEak57SrFLR5tjZGFilfsHPbRKvL4PT41KO-Dt961kULzQsu53Wn0zpvMoTi1c6IKJd',
    available: true,
    promo: null,
  },
  {
    id: '2',
    name: "Trader Joe's",
    price: '$1.99',
    rating: 4.5,
    count: '850',
    distance: '2.4 mi',
    time: '30-45 min',
    fee: 'Free Delivery',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGE3D4i1I3eXoydbe9PAUDyzL-J4q7jvtpZ86oPR7LQmxKlJpWHVmmbaDre11Rgs8kF99Bd5Ey--EJQvhq88ZpzkDbhq-LvHjI5Bcdo03J-dG7w5Clkxqii4LTbTdLDDJzdNX8DlYmwivsDFAIyWBMsf5uYbK-61sNRj3NO7m3P54EC-DR02yTvIAFrTPX-sP5V7WoG0t7eyx6RGGJDYr7CGjy6yDoJsuHyX8tJy9V77aj4OmlhiYyaFS2BK-ZOHpovuUTxNhPEzSq',
    available: true,
    promo: 'free_delivery',
  },
  {
    id: '3',
    name: 'Local Grocer',
    price: '+$0.50',
    priceColor: COLORS.red,
    priceBg: COLORS.redBg,
    rating: 4.2,
    count: '200',
    distance: '0.8 mi',
    time: '10-15 min',
    fee: '$3.99 Fee',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBA40FnVa42PvMojunx75HMTunRO_EugiVZ4RDJkKMkYn9573dAi4l4YZo0J5uHqCmKpFG8miCuLqrxKxI3kUhEHtJ8f8UMs-ods-ldEdnxcpUJdueKDDpo4SBRuCAD83N-aYlUH31T992lx4xwVA0rdnjZiWasQ0986QqopLg3ysSk7UOSqPodD4LSRpD5-hFPynKSZ-dzW7EDbnKA2uksuN9YJPMaOFOekQitvLHn2UQZtRPWAqvdWEQzyHhjX0PYFGPg0jkkUasd',
    available: true,
    promo: null,
  },
  {
    id: '4',
    name: 'City Market',
    price: 'Unavailable',
    rating: null,
    count: null,
    distance: null,
    time: '45-60 min',
    fee: null,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLdGkXEI9rr0f17CzzWZZaHidQLXTmBQfPhUe18-7AiCC10DGWL1XDZHz2UuuiTg3VlE-BpRAh4v4OQilVvAgtwyurg_SxP5y1_wAwxDD9e65C0lSy2qN3GYdxij7YKFoOXYOfXk4l2-mJUU6XiSubFb5KsLqbNCAUxa5yLIqsdKPMnwGo0-uK6aXaBzmyQWEyCunzBiM_hnXBi6ctqhwFraLXtNwhg-7NcEl-q2m_oZdg8HWMhL-Y0yb1EzIj2oS2WolswC0nplxK',
    available: false,
    promo: null,
  },
];

const FILTERS = ['Fastest', 'Lowest Fee', 'Highest Rated', 'Free Delivery'];

interface ShopSelectionOverlayProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (storeId: string) => void;
}

export default function ShopSelectionOverlay({ 
  visible, 
  onClose, 
  onConfirm 
}: ShopSelectionOverlayProps) {
  const [selectedStore, setSelectedStore] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');

  const handleConfirm = () => {
    onConfirm(selectedStore);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      statusBarTranslucent={true}
    >
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="rgba(0, 0, 0, 0.6)" />
        
        {/* --- Overlay Backdrop --- */}
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={onClose}
        >
          {/* --- Bottom Sheet --- */}
          <TouchableOpacity 
            style={styles.bottomSheet} 
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Drag Handle */}
            <View style={styles.dragHandleContainer}>
              <View style={styles.dragHandle} />
            </View>

            {/* Header */}
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>Select Store</Text>
                <Text style={styles.subtitle}>Found {STORES.filter(s => s.available).length} stores nearby with this item</Text>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <X size={24} color={COLORS.textDark} />
              </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <View style={styles.searchBar}>
                <Search size={20} color={COLORS.textMuted} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search for a shop..."
                  placeholderTextColor={COLORS.textMuted}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
            </View>

            {/* Filters */}
            <View style={styles.filtersContainer}>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filtersContent}
              >
                {FILTERS.map((filter, index) => (
                  <TouchableOpacity key={index} style={styles.filterChip}>
                    <Text style={styles.filterText}>{filter}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Store List */}
            <ScrollView 
              style={styles.listContainer} 
              contentContainerStyle={styles.listContent}
            >
              {STORES.filter(store => 
                store.name.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((store) => {
                const isSelected = selectedStore === store.id;
                const isUnavailable = !store.available;
                
                return (
                  <TouchableOpacity
                    key={store.id}
                    activeOpacity={isUnavailable ? 1 : 0.7}
                    onPress={() => !isUnavailable && setSelectedStore(store.id)}
                    style={[
                      styles.storeCard,
                      isSelected && styles.storeCardSelected,
                      isUnavailable && styles.storeCardUnavailable,
                    ]}
                  >
                    {/* Store Image */}
                    <View style={styles.storeImageContainer}>
                      <Image source={{ uri: store.image }} style={styles.storeImage} />
                    </View>

                    {/* Content */}
                    <View style={styles.storeContent}>
                      <View style={styles.storeHeader}>
                        <Text style={styles.storeName} numberOfLines={1}>
                          {store.name}
                        </Text>
                        <View style={[
                          styles.priceBadge, 
                          store.priceBg ? { backgroundColor: store.priceBg } : {},
                          isUnavailable ? { backgroundColor: 'transparent' } : {}
                        ]}>
                          <Text style={[
                            styles.priceText, 
                            store.priceColor ? { color: store.priceColor } : {},
                            isUnavailable ? { color: COLORS.textMuted, fontWeight: '500' } : {}
                          ]}>
                            {store.price}
                          </Text>
                        </View>
                      </View>

                      {isUnavailable ? (
                        <Text style={styles.outOfStockText}>
                          Out of stock at this location
                        </Text>
                      ) : (
                        <View style={styles.ratingRow}>
                          <Star size={16} color={COLORS.yellow} fill={COLORS.yellow} />
                          <Text style={styles.ratingText}>{store.rating}</Text>
                          <Text style={styles.countText}>({store.count})</Text>
                          <Text style={styles.dotText}>•</Text>
                          <Text style={styles.distanceText}>{store.distance}</Text>
                        </View>
                      )}

                      <View style={styles.metaRow}>
                        <View style={styles.metaItem}>
                          <Clock size={16} color={COLORS.textMuted} />
                          <Text style={styles.metaText}>{store.time}</Text>
                        </View>
                        {store.fee && (
                          <View style={styles.metaItem}>
                            <Truck 
                              size={16} 
                              color={store.promo === 'free_delivery' ? COLORS.primary : COLORS.textMuted} 
                            />
                            <Text style={[
                              styles.metaText,
                              store.promo === 'free_delivery' && styles.freeDeliveryText
                            ]}>
                              {store.fee}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>

                    {/* Radio/Check Indicator */}
                    <View style={styles.indicatorContainer}>
                      {isUnavailable ? (
                        <View style={styles.unavailableIndicator} />
                      ) : isSelected ? (
                        <View style={styles.selectedIndicator}>
                          <Check size={14} color="#000000" strokeWidth={3} />
                        </View>
                      ) : (
                        <View style={styles.unselectedIndicator} />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Sticky Footer */}
            <View style={styles.footer}>
              <TouchableOpacity 
                style={styles.confirmButton}
                onPress={handleConfirm}
              >
                <Text style={styles.confirmButtonText}>Confirm Shop</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // --- Overlay ---
  backdrop: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: COLORS.surfaceLight,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    maxHeight: height * 0.9,
    width: '100%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 24,
  },
  dragHandleContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 8,
  },
  dragHandle: {
    width: 48,
    height: 6,
    borderRadius: 999,
    backgroundColor: '#d1d5db', // gray-300
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textDark,
    fontFamily: FONTS.display,
    lineHeight: 30,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 4,
    fontFamily: FONTS.body,
  },
  closeButton: {
    padding: 8,
    borderRadius: 999,
    backgroundColor: 'transparent',
  },
  // --- Search ---
  searchContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputLight,
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: COLORS.textDark,
    fontWeight: '500',
    fontFamily: FONTS.body,
  },
  // --- Filters ---
  filtersContainer: {
    paddingBottom: 16,
  },
  filtersContent: {
    paddingHorizontal: 24,
    gap: 12,
  },
  filterChip: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: COLORS.inputLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
    fontFamily: FONTS.body,
  },
  // --- List ---
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 4,
  },
  storeCard: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent',
    gap: 16,
    alignItems: 'center',
  },
  storeCardSelected: {
    backgroundColor: 'rgba(19, 236, 91, 0.1)', // primary/10
    borderColor: COLORS.primary,
  },
  storeCardUnavailable: {
    opacity: 0.6,
  },
  storeImageContainer: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: COLORS.gray200,
    overflow: 'hidden',
  },
  storeImage: {
    width: '100%',
    height: '100%',
  },
  storeContent: {
    flex: 1,
    justifyContent: 'center',
  },
  storeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  storeName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
    fontFamily: FONTS.display,
    flex: 1,
    marginRight: 8,
  },
  priceBadge: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  priceText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  countText: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  dotText: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginHorizontal: 2,
  },
  distanceText: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  freeDeliveryText: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  outOfStockText: {
    fontSize: 12,
    color: COLORS.red,
    fontWeight: '500',
    marginTop: 4,
  },
  // --- Indicators ---
  indicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  unselectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#d1d5db', // gray-300
  },
  unavailableIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb', // gray-200
    backgroundColor: '#f3f4f6', // gray-100
  },
  // --- Footer ---
  footer: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 24,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray100,
    backgroundColor: COLORS.surfaceLight,
  },
  confirmButton: {
    width: '100%',
    height: 56,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: FONTS.display,
  },
});