import {
  ArrowLeft,
  Clock,
  Heart,
  Leaf,
  Mic,
  Refrigerator,
  ShoppingCart,
  Sparkles,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import RecipeDetailsScreen from './RecipeDetailsScreen';

const { width } = Dimensions.get('window');

// Theme Configuration
const COLORS = {
  primary: '#2bee6c',
  light: {
    background: '#f6f8f6',
    surface: '#ffffff',
    text: '#111827',
    textSecondary: '#4b5563',
    border: '#e5e7eb',
    inputBg: '#ffffff',
    cardRing: 'rgba(17, 24, 39, 0.05)',
    navBg: '#ffffff',
  },
  dark: {
    background: '#102216',
    surface: '#18281e',
    text: '#ffffff',
    textSecondary: '#9ca3af',
    border: 'rgba(255, 255, 255, 0.05)',
    inputBg: '#1f3125',
    cardRing: 'rgba(255, 255, 255, 0.1)',
    navBg: '#102216',
  },
};

interface AIChefScreenProps {
  onBack?: () => void;
}

interface ChipProps {
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
  theme: typeof COLORS.dark | typeof COLORS.light;
}

interface RecipeCardProps {
  title: string;
  description: string;
  image: string;
  time: string;
  kcal?: string;
  badge?: string;
  avatars: string[];
  plusCount: number;
  theme: typeof COLORS.dark | typeof COLORS.light;
  onPress?: () => void;
}

const Chip: React.FC<ChipProps> = ({ icon, label, active = false, theme }) => (
  <TouchableOpacity
    style={[
      styles.chip,
      {
        backgroundColor: active ? 'rgba(43, 238, 108, 0.1)' : theme.surface,
        borderColor: active ? 'rgba(43, 238, 108, 0.3)' : theme.border,
      },
    ]}
  >
    {icon && <View style={styles.chipIcon}>{icon}</View>}
    <Text
      style={[
        styles.chipText,
        {
          color: active
            ? COLORS.primary
            : theme === COLORS.dark
            ? '#d1d5db'
            : '#374151',
          fontWeight: active ? '600' : '500',
        },
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const RecipeCard: React.FC<RecipeCardProps> = ({
  title,
  description,
  image,
  time,
  kcal,
  badge,
  avatars,
  plusCount,
  theme,
  onPress,
}) => (
  <TouchableOpacity
    activeOpacity={0.95}
    style={[
      styles.card,
      { backgroundColor: theme.surface, borderColor: theme.cardRing },
    ]}
    onPress={onPress}
  >
    <View style={styles.cardImageContainer}>
      <Image source={{ uri: image }} style={styles.cardImage} resizeMode="cover" />
      {/* Top Right Badges */}
      <View style={styles.cardBadgesRight}>
        <View style={styles.badge}>
          <Clock size={12} color={COLORS.primary} style={{ marginRight: 4 }} />
          <Text style={styles.badgeText}>{time}</Text>
        </View>
        {kcal && (
          <View style={[styles.badge, { marginLeft: 8 }]}>
            <Text style={styles.badgeText}>{kcal}</Text>
          </View>
        )}
      </View>
      {/* Top Left Badge (Spicy) */}
      {badge && (
        <View style={styles.cardBadgeLeft}>
          <View style={[styles.badge, { backgroundColor: 'rgba(239, 68, 68, 0.8)' }]}>
            <Text style={[styles.badgeText, { fontWeight: '700' }]}>{badge}</Text>
          </View>
        </View>
      )}
    </View>
    <View style={styles.cardContent}>
      <View style={styles.cardHeader}>
        <Text style={[styles.cardTitle, { color: theme.text }]} numberOfLines={1}>
          {title}
        </Text>
        <TouchableOpacity>
          <Heart size={24} color="#9ca3af" />
        </TouchableOpacity>
      </View>
      <Text
        style={[styles.cardDescription, { color: theme.textSecondary }]}
        numberOfLines={2}
      >
        {description}
      </Text>
      <View style={[styles.cardFooter, { borderTopColor: theme.border }]}>
        <View style={styles.avatarGroup}>
          {avatars.map((uri: string, index: number) => (
            <View
              key={index}
              style={[
                styles.avatarContainer,
                {
                  borderColor: theme.surface,
                  backgroundColor: theme === COLORS.dark ? '#374151' : '#e5e7eb',
                  marginLeft: index > 0 ? -10 : 0,
                  zIndex: avatars.length - index,
                },
              ]}
            >
              <Image source={{ uri }} style={styles.avatarImage} />
            </View>
          ))}
          {plusCount > 0 && (
            <View
              style={[
                styles.avatarContainer,
                {
                  borderColor: theme.surface,
                  backgroundColor: theme === COLORS.dark ? '#374151' : '#e5e7eb',
                  marginLeft: -10,
                  zIndex: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}
            >
              <Text style={[styles.plusCountText, { color: theme.textSecondary }]}>
                +{plusCount}
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.addAllButton}>
          <ShoppingCart size={16} color={COLORS.primary} style={{ marginRight: 6 }} />
          <Text style={styles.addAllText}>Add All</Text>
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
);

export default function AIChefScreen({ onBack }: AIChefScreenProps) {
  const systemColorScheme = useColorScheme();
  // Defaulting to dark mode to match the provided HTML class="dark"
  const isDark = true; // systemColorScheme === 'dark';
  const theme = isDark ? COLORS.dark : COLORS.light;
  const [searchQuery, setSearchQuery] = useState('');
  const [showRecipeDetails, setShowRecipeDetails] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);

  const handleRecipePress = (recipe: any) => {
    setSelectedRecipe(recipe);
    setShowRecipeDetails(true);
  };

  const handleBackFromRecipe = () => {
    setShowRecipeDetails(false);
    setSelectedRecipe(null);
  };

  if (showRecipeDetails) {
    return (
      <RecipeDetailsScreen 
        onBack={handleBackFromRecipe}
        recipe={selectedRecipe}
      />
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      {/* Fixed Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: isDark
              ? 'rgba(16, 34, 22, 0.95)'
              : 'rgba(246, 248, 246, 0.9)',
            borderBottomColor: theme.border,
          },
        ]}
      >
        <TouchableOpacity style={styles.iconButton} onPress={onBack}>
          <ArrowLeft size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Chef AI 👨‍🍳</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
      >
        {/* 0. Headline */}
        <View style={styles.headlineContainer}>
          <Text style={[styles.headline, { color: theme.text }]}>
            <Text style={{ color: COLORS.primary }}>Craving</Text> something special?
          </Text>
          <Text style={[styles.subheadline, { color: theme.textSecondary }]}>
            Tell me what ingredients you have, or describe your mood.
          </Text>
        </View>

        {/* 1. Sticky Search */}
        <View style={[styles.stickySearchContainer, { backgroundColor: theme.background }]}>
          <View style={[styles.searchWrapper, { backgroundColor: theme.inputBg }]}>
            <View style={styles.searchIconLeft}>
              <Sparkles size={20} color={isDark ? '#9db9a6' : '#9ca3af'} />
            </View>
            <TextInput
              style={[styles.searchInput, { color: theme.text }]}
              placeholder="e.g., Chicken, avocado, fast..."
              placeholderTextColor={isDark ? '#9db9a6' : '#9ca3af'}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.micButton}>
              <Mic size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 2. Chips */}
        <View style={styles.chipsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipsScroll}
          >
            <Chip
              icon={<Leaf size={14} color={COLORS.primary} />}
              label="Healthy"
              active
              theme={theme}
            />
            <Chip label="Comfort Food" theme={theme} />
            <Chip
              icon={<Clock size={14} color="#6b7280" />}
              label="Under 15 min"
              theme={theme}
            />
            <Chip label="Dessert" theme={theme} />
            <Chip label="Spicy" theme={theme} />
          </ScrollView>
        </View>

        {/* 3. Generate Button */}
        <View style={styles.generateContainer}>
          <TouchableOpacity style={styles.generateButton}>
            <View style={styles.generateButtonInner}>
              <Sparkles size={20} color="#111813" style={{ marginRight: 8 }} />
              <Text style={styles.generateButtonText}>Generate Suggestions</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* 4. Section Title */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Suggested for You</Text>
          <TouchableOpacity>
            <Text style={styles.historyLink}>View History</Text>
          </TouchableOpacity>
        </View>

        {/* 5. Cards */}
        <View style={styles.cardsList}>
          <RecipeCard
            title="Zesty Avocado Lime Chicken"
            description="A refreshing mix of grilled chicken breast, creamy avocado, and a tangy lime dressing. Perfect for a quick lunch."
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuCFCmQfPJG2WRURKhkEiDNHEd9_76O4axD2-HaSmlD9W4sZAvWqoy9ZcJva5urLPr49JJVbN43E2HbP9v9nc6UCSP3NLOZrG89on82tsLZ5krv-JQ9JN7d0kuFhOAjQ4n9jgRdDGG06c9eypNIeWkBIDg7EbBNMGUvvDixOmIO3-aN2VHsW0NREISxnXdLbOmPFde5kgF3qCoRLnplFL5G7WKm7v5k6Zmn_fVtASKnWsNs5QYiFw26NsjtYS8hR-Wi4I4bv_0RjPrPO"
            time="25m"
            kcal="450 kcal"
            avatars={[
              'https://lh3.googleusercontent.com/aida-public/AB6AXuDkbuqZ-znDt0GLIXdChMt4wh_TOwAHVFekdwTm13EakOMzjOmmQGgyQGdNLqtWOXKGK1kTMTJKE-xcshNi2yHXsgb-nGN0E-hzTyB06q5gs2HiZPzmVkpujbe8RYqbfl9xTntlYflLxKjWHbNgWJ2iQNlUkbZfdL38ZmKRT8y7JFW1oedIjhmcwrxgyvphNAlkuuvNOD-4gKyeuQm7uhcM6pYY7byKCNQqzq4rx92LUl7rGyW4gvWEQc7VTrI_OkCVia90v2ZG1X9M',
              'https://lh3.googleusercontent.com/aida-public/AB6AXuCd2J6ZPXBuLXtGTgs8OGBcQSkaP4B_Ixi4uEO5l6SL4agc82ubhXEJdcFjGnN_HkVL4uBzbq1ViKm1KkAGfl1Iqag1F5Ih8nVUiEjYZ29q6GIz3mlnn0KQYr_G9sqbb-BImS0bauKoKzDj7fP-reaWfRvpXyyFO8pmvnZvhoEadIaMqEPnMrRVZw-U1jqcHDzCUaPL-9rTRECee-GEOT_Jaz94sgdmpsmoSRLWNWrKMb5b67kUufJXGbWH7zkedlXNPU9NpEmI9CrK',
            ]}
            plusCount={3}
            theme={theme}
            onPress={() => handleRecipePress({
              title: "Zesty Avocado Lime Chicken",
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFCmQfPJG2WRURKhkEiDNHEd9_76O4axD2-HaSmlD9W4sZAvWqoy9ZcJva5urLPr49JJVbN43E2HbP9v9nc6UCSP3NLOZrG89on82tsLZ5krv-JQ9JN7d0kuFhOAjQ4n9jgRdDGG06c9eypNIeWkBIDg7EbBNMGUvvDixOmIO3-aN2VHsW0NREISxnXdLbOmPFde5kgF3qCoRLnplFL5G7WKm7v5k6Zmn_fVtASKnWsNs5QYiFw26NsjtYS8hR-Wi4I4bv_0RjPrPO",
              time: "25 mins",
              kcal: "450 kcal",
              rating: "4.8",
              description: "A refreshing mix of grilled chicken breast, creamy avocado, and a tangy lime dressing. Perfect for a quick lunch."
            })}
          />
          <RecipeCard
            title="Spicy Sriracha Tofu Bowl"
            description="Crispy tofu cubes tossed in a sweet and spicy Sriracha glaze, served over steamed rice."
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuAPzD-yG_gmlBD21QETUFg0T-YkRq1MTr98qR42acyIQUNzoCRKxWyctPe9WEPHrXLsQXeZdDCIYpmsfSXfxK3xU86jWN2aWrNeDX3F24rJBoFFvUH6XRtjVrR8-zLsoMN7N1xjKQXu2eegRLc_ODUW1rOkJMAQMlSuftpDHSLDQ8NQKj8BLrfBGzh4bk4al4-8y3HOKft9c4mdXnj-oTKhOLM9WL20h0WJopethatTI-g8bbSEYo2TsOeGcgOYFGuAZ6KvXws7oitB"
            time="15m"
            kcal="320 kcal"
            badge="Spicy"
            avatars={[
              'https://lh3.googleusercontent.com/aida-public/AB6AXuAX7FxY67NGoPDF6Zi0dEJGDETMij-JPcp_YeFX8yJChjkQK1rLvx2wD_3TjRnyVHEmZny5M1tC1dBh530Big1j5er32UFxsUAkFwJFoWOcJTXtLlJdL3Ev915QtoUK3R6oxkQVyRUUcAjqXchnlq8ssyRMp9-M48xdlZ73x-RU27kSNBkbK9NKN1BHS27Ct3DDaUwhlMcd-5K7LmOLXvbKAmkNVykADuRU3Ib2sKJ5grG1aZBWHSTtoocuLuqEm4Rd9ZFsGF6r2Y5D',
              'https://lh3.googleusercontent.com/aida-public/AB6AXuCb2iV3fbnj7xPkGC3qf_vP-b2pLObv5ANt3pDqSuDRzTIkFLBdVs9Utf_uCT_TWmrEPLYDUE3e9cSzfGjdcPM2_NXe9O_bOoGz_tAUQyb-sYEsmlbairO3skJb041xEdldZz4w1xY66vqUYXwijub6SKSZftGypPHlEL9TQW73p8cbGHuJrPGWQqhERsm9bQmd4aq4dqW7rjV1u37QD9GmSWvcp_-puE8_WjHZy4WS4khug2VdrvGjL9mMb6x16SDR3Or-4rJE4TaW',
            ]}
            plusCount={4}
            theme={theme}
            onPress={() => handleRecipePress({
              title: "Spicy Sriracha Tofu Bowl",
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPzD-yG_gmlBD21QETUFg0T-YkRq1MTr98qR42acyIQUNzoCRKxWyctPe9WEPHrXLsQXeZdDCIYpmsfSXfxK3xU86jWN2aWrNeDX3F24rJBoFFvUH6XRtjVrR8-zLsoMN7N1xjKQXu2eegRLc_ODUW1rOkJMAQMlSuftpDHSLDQ8NQKj8BLrfBGzh4bk4al4-8y3HOKft9c4mdXnj-oTKhOLM9WL20h0WJopethatTI-g8bbSEYo2TsOeGcgOYFGuAZ6KvXws7oitB",
              time: "15 mins",
              kcal: "320 kcal",
              rating: "4.5",
              description: "Crispy tofu cubes tossed in a sweet and spicy Sriracha glaze, served over steamed rice."
            })}
          />
          <RecipeCard
            title="Superfood Berry Bowl"
            description="Start your day right with antioxidants. Blueberries, strawberries, granola, and yogurt base."
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuDbFmsIvdUBiopyPZkZ0SaztAAFZrbkB7MqV_-Xvwd8hh58s1WRHMQbvRB5eerQGSi7EYjnetI-V-iFT4P_JK5e2iB05anbQajHxjSuaUm3kwDFb9XGSkZk9LMykrd7UwsRnZADSBXumPLn8DARdpADBp13eudVDHvVT-HdiXTjHikSSDLTOlmHa-0HrZB600MAVBeLpnomr-NNLDnRBalH6DlUB3_oCWdZ7W50yCtDBSpGFJv6ZZT-Tury1ilv--jAFIL0BW0RqU9J"
            time="10m"
            avatars={[
              'https://lh3.googleusercontent.com/aida-public/AB6AXuAGI0UXj-Ol0E0L4Va2t366X8QA5KVU-mV8ju43yfHETGgmFRaGEBftHE2R0lOTFkVkgRbVtbkGLWN5dhOxRRkMsnq6u6exbRIaok-3scvMcaeTxl9rfpki9f1KtDg4iH1mFyV23pDADWQkZRONkHTYg9RXTEQZoK1RWbPD-i2fZB6Isa8zzQpYVlx-KiunrpDx75Z2jV3UGDgHpdIEPqcITOvRTV7m5iB4zU9Q6P4_AxjHorskFrtuFevAPBozT_MdS17FnaiYFM0w',
            ]}
            plusCount={2}
            theme={theme}
            onPress={() => handleRecipePress({
              title: "Superfood Berry Bowl",
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbFmsIvdUBiopyPZkZ0SaztAAFZrbkB7MqV_-Xvwd8hh58s1WRHMQbvRB5eerQGSi7EYjnetI-V-iFT4P_JK5e2iB05anbQajHxjSuaUm3kwDFb9XGSkZk9LMykrd7UwsRnZADSBXumPLn8DARdpADBp13eudVDHvVT-HdiXTjHikSSDLTOlmHa-0HrZB600MAVBeLpnomr-NNLDnRBalH6DlUB3_oCWdZ7W50yCtDBSpGFJv6ZZT-Tury1ilv--jAFIL0BW0RqU9J",
              time: "10 mins",
              kcal: "280 kcal",
              rating: "4.9",
              description: "Start your day right with antioxidants. Blueberries, strawberries, granola, and yogurt base."
            })}
          />
        </View>
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      {/* <View
        style={[
          styles.bottomNav,
          { backgroundColor: theme.navBg, borderTopColor: theme.border },
        ]}
      >
        <TouchableOpacity style={styles.navItem}>
          <Home size={24} color={theme.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Utensils size={24} color={COLORS.primary} fill={COLORS.primary} />
          <View style={styles.navIndicator} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <ShoppingCart size={24} color={theme.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <User size={24} color={theme.textSecondary} />
        </TouchableOpacity>
      </View> */}

      {/* FAB */}
      <TouchableOpacity
        activeOpacity={0.9}
        style={[
          styles.fab,
          {
            backgroundColor: isDark ? '#ffffff' : '#18281e',
            borderColor: isDark ? 'transparent' : 'rgba(255,255,255,0.1)',
          },
        ]}
      >
        <Refrigerator size={20} color={isDark ? '#000000' : '#ffffff'} />
        <Text style={[styles.fabText, { color: isDark ? '#000000' : '#ffffff' }]}>
          My Pantry
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 100 : 100,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 50,
    borderBottomWidth: 1,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
  },
  scrollContent: {
    paddingTop: Platform.OS === 'ios' ? 100 : 80,
    paddingBottom: 20,
  },
  headlineContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 8,
  },
  headline: {
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 36,
  },
  subheadline: {
    fontSize: 16,
    marginTop: 8,
    lineHeight: 24,
  },
  stickySearchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    zIndex: 40,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    height: 56,
    paddingHorizontal: 16,
  },
  searchIconLeft: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  micButton: {
    padding: 8,
    backgroundColor: 'rgba(43, 238, 108, 0.2)',
    borderRadius: 12,
  },
  chipsContainer: {
    paddingBottom: 8,
  },
  chipsScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 1,
    marginRight: 8,
  },
  chipIcon: {
    marginRight: 6,
  },
  chipText: {
    fontSize: 14,
  },
  generateContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  generateButton: {
    width: '100%',
    height: 52,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
    overflow: 'hidden',
    padding: 1, // For border effect if we added inner view
  },
  generateButtonInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 15,
  },
  generateButtonText: {
    color: '#111813',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  historyLink: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  cardsList: {
    paddingHorizontal: 16,
    gap: 24,
  },
  card: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImageContainer: {
    height: 192,
    width: '100%',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardBadgesRight: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
  },
  cardBadgeLeft: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
    marginRight: 8,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
  },
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  plusCountText: {
    fontSize: 10,
    fontWeight: '700',
  },
  addAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(43, 238, 108, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addAllText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingTop: 12,
    borderTopWidth: 1,
    zIndex: 50,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  navIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 40,
    borderWidth: 1,
  },
  fabText: {
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 8,
  },
});