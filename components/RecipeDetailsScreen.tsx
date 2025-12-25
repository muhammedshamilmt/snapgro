import {
    ArrowLeft,
    Check,
    Clock,
    Droplet,
    Flame,
    Heart,
    Share2,
    ShoppingBasket,
    Star,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#2bee6c',
  backgroundDark: '#0a0f0c',
  surfaceDark: '#161b18',
  surfaceDarkLighter: '#1f2622',
  white: '#ffffff',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  orange400: '#fb923c',
  yellow400: '#facc15',
};

interface IngredientRowProps {
  image?: string;
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
  checked?: boolean;
}

interface InstructionStepProps {
  step: number;
  title: string;
  description: string;
  isActive?: boolean;
  isLast?: boolean;
}

interface RecipeDetailsProps {
  onBack?: () => void;
  recipe?: {
    title: string;
    image: string;
    time: string;
    kcal: string;
    rating: string;
    description: string;
  };
}

const IngredientRow: React.FC<IngredientRowProps> = ({ 
  image, 
  icon, 
  title, 
  subtitle, 
  checked = false 
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => setIsChecked(!isChecked)}
      style={styles.ingredientRow}
    >
      <View style={styles.ingredientLeft}>
        {image ? (
          <Image source={{ uri: image }} style={styles.ingredientImage} />
        ) : (
          <View style={styles.ingredientIconContainer}>
            {icon}
          </View>
        )}
        <View>
          <Text style={[styles.ingredientTitle, isChecked && { color: COLORS.primary }]}>
            {title}
          </Text>
          <Text style={styles.ingredientSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
        {isChecked && <Check size={14} color={COLORS.primary} strokeWidth={3} />}
      </View>
    </TouchableOpacity>
  );
};

const InstructionStep: React.FC<InstructionStepProps> = ({ 
  step, 
  title, 
  description, 
  isActive = false, 
  isLast = false 
}) => {
  return (
    <View style={styles.instructionRow}>
      <View style={styles.timelineColumn}>
        <View
          style={[
            styles.stepCircle,
            isActive ? styles.stepCircleActive : styles.stepCircleInactive,
            step === 2 && styles.stepCircleBordered,
          ]}
        >
          <Text
            style={[
              styles.stepText,
              isActive ? styles.stepTextActive : styles.stepTextInactive,
              step === 2 && { color: COLORS.primary },
            ]}
          >
            {step}
          </Text>
        </View>
        {!isLast && <View style={styles.timelineLine} />}
      </View>
      <View style={styles.instructionContent}>
        <Text style={[styles.instructionTitle, !isActive && { color: COLORS.gray300 }]}>
          {title}
        </Text>
        <Text style={styles.instructionDescription}>{description}</Text>
      </View>
    </View>
  );
};

export default function RecipeDetailsScreen({ onBack, recipe }: RecipeDetailsProps) {
  const defaultRecipe = {
    title: 'Spicy Basil Chicken',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYEU_K2QAoYMoCuZQb0MAWE3H7_Wws2ZqDHbVJjf4cQTZnn8frnj9kbiVnehPsYmwrXQlxTimB59TlVgHrboFTgq4nr6ldqKAmQ_1Oa77y4HZc6ZcxNmfY_Nqzx_e9pTSl4Xis8mKg2B4R0H-i2TQY7RpNThQDmX3Gdm_phmtjqMsrP_BGr5e_2mLHVLxWJXwDMmJxw104d2zXJKnzmxrxhkAhjhwhgFxPh6mw4phLbXs-AC1xVgAeC7DUfV5HqniU5eF5xkQdvM-T",
    time: '20 mins',
    kcal: '450 kcal',
    rating: '4.8',
    description: 'A classic Thai street food dish that packs a punch of flavor. Fresh basil, chili, and savory sauces come together in just 20 minutes.',
  };

  const currentRecipe = recipe || defaultRecipe;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Image Section */}
        <View style={styles.headerContainer}>
          <ImageBackground
            source={{ uri: currentRecipe.image }}
            style={styles.headerImage}
            resizeMode="cover"
          >
            {/* Gradient Simulation Overlay */}
            <View style={styles.headerOverlay} />
            {/* Top Navigation */}
            <View style={styles.topNav}>
              <TouchableOpacity style={styles.iconButton} onPress={onBack}>
                <ArrowLeft size={24} color={COLORS.white} />
              </TouchableOpacity>
              <View style={styles.topNavRight}>
                <TouchableOpacity style={styles.iconButton}>
                  <Share2 size={24} color={COLORS.white} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                  <Heart size={24} color={COLORS.white} />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* Main Content */}
        <View style={styles.contentContainer}>
          <View style={styles.contentHeader}>
            <Text style={styles.title}>{currentRecipe.title}</Text>
            {/* Stats Row */}
            <View style={styles.statsRow}>
              <View style={styles.statBadge}>
                <Clock size={18} color={COLORS.primary} />
                <Text style={styles.statText}>{currentRecipe.time}</Text>
              </View>
              <View style={styles.statBadge}>
                <Flame size={18} color={COLORS.orange400} />
                <Text style={styles.statText}>{currentRecipe.kcal}</Text>
              </View>
              <View style={styles.statBadge}>
                <Star size={18} color={COLORS.yellow400} fill={COLORS.yellow400} />
                <Text style={styles.statText}>{currentRecipe.rating}</Text>
              </View>
            </View>
            <Text style={styles.description}>{currentRecipe.description}</Text>
            <View style={styles.divider} />

            {/* Ingredients Section */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Ingredients</Text>
              <Text style={styles.itemCount}>8 items</Text>
            </View>
            <View style={styles.ingredientsList}>
              <IngredientRow
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuDlaT6_jVtDoTiRgEvBDtNcsljFveYcPRBxWgVtatqyPVaxEnaXTr29O-kSA0tHzzg3k71xSU8xBXgjpEZ-gUpOjYYDEfwswN_HWA5piOPgg-FB0BZTOfI1ZCOw0H_M7Loy1DmtwAKt4-UPV1A1wXUKmNLyWnu2So9dJbxqHXqnko-SIc2D4yaKO7p7eFqFTARIfv7I-6PwsiHgy7TLeL7TVKXuLmxKd711WlJfGuLRsUfAN0GGHhdeLEeiR2aJC56FY8QNi4Y3FXQ3"
                title="Chicken Breast"
                subtitle="500g, sliced"
                checked={true}
              />
              <IngredientRow
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuC8Y6gEgR-SbbDTRdZGJXVZHCNBamQtbeShatIhjURJXQ2ngsYyydwurKAyXKBah4kvbKGxERcZecVIqKvBgMfkyzHqT0rSJ0hUCZRv-ICUq8B0hi_WfKOjJQl6M1Ar82Srg99gROks3eknkmZetZED7fJEWoP1-4T7C9ueSvtquFCGUwLMNTwYoiO6V6_SpdLrxwUt9kFE7Fmj_q9rcC2BhNbIABFPGww3h1gQs9SlYAtzYAIDsay9UJR1ntAWFnls_TTBHZSIG0BI"
                title="Thai Basil"
                subtitle="1 cup, fresh"
                checked={true}
              />
              <IngredientRow
                icon={<Droplet size={24} color={COLORS.gray400} />}
                title="Soy Sauce"
                subtitle="2 tbsp"
                checked={false}
              />
              <TouchableOpacity style={styles.showMoreButton}>
                <Text style={styles.showMoreText}>+ Show 5 more items</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />

            {/* Instructions Section */}
            <Text style={[styles.sectionTitle, { marginBottom: 32 }]}>Instructions</Text>
            <View style={styles.instructionsList}>
              <InstructionStep
                step={1}
                title="Prep the ingredients"
                description="Slice the chicken into bite-sized pieces. Finely chop the garlic and bird's eye chilies. Pluck the basil leaves from the stems."
                isActive={true}
              />
              <InstructionStep
                step={2}
                title="Sauté aromatics"
                description="Heat oil in a wok over medium-high heat. Add garlic and chilies, stir-frying until fragrant (about 30 seconds). Be careful not to burn the garlic."
                isActive={true}
              />
              <InstructionStep
                step={3}
                title="Cook the chicken"
                description="Add the chicken and stir-fry until cooked through. Add the sauces and sugar. Stir to coat everything evenly. Finally, toss in the basil leaves."
                isActive={false}
                isLast={true}
              />
            </View>
          </View>
        </View>
        {/* Spacer for bottom bar */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Fixed Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.addToCartButton} activeOpacity={0.9}>
          <View style={styles.addToCartContent}>
            <ShoppingBasket size={24} color={COLORS.backgroundDark} />
            <Text style={styles.addToCartText}>Add Ingredients</Text>
          </View>
          <View style={styles.priceTag}>
            <Text style={styles.priceText}>$12.50</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  headerContainer: {
    height: 360,
    width: '100%',
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  topNav: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 16 : 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 20,
  },
  topNavRight: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  contentContainer: {
    marginTop: -32,
    backgroundColor: COLORS.backgroundDark,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 8,
    zIndex: 10,
  },
  contentHeader: {
    paddingTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 16,
    letterSpacing: -0.5,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    paddingHorizontal: 16,
    backgroundColor: COLORS.surfaceDarkLighter,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    gap: 8,
  },
  statText: {
    color: COLORS.gray200,
    fontSize: 14,
    fontWeight: '500',
  },
  description: {
    color: COLORS.gray400,
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 32,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray800,
    width: '100%',
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.white,
  },
  itemCount: {
    fontSize: 14,
    color: COLORS.gray500,
    fontWeight: '500',
  },
  ingredientsList: {
    gap: 12,
    marginBottom: 32,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: COLORS.surfaceDark,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  ingredientLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ingredientImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: COLORS.surfaceDarkLighter,
  },
  ingredientIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: COLORS.surfaceDarkLighter,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ingredientTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.white,
    marginBottom: 2,
  },
  ingredientSubtitle: {
    fontSize: 12,
    color: COLORS.gray400,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.gray600,
    backgroundColor: COLORS.surfaceDarkLighter,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    borderColor: COLORS.primary,
  },
  showMoreButton: {
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  showMoreText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.8,
  },
  instructionsList: {
    paddingBottom: 32,
  },
  instructionRow: {
    flexDirection: 'row',
    gap: 16,
  },
  timelineColumn: {
    alignItems: 'center',
    width: 32,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  stepCircleActive: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 5,
  },
  stepCircleBordered: {
    backgroundColor: COLORS.surfaceDark,
    borderWidth: 2,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },
  stepCircleInactive: {
    backgroundColor: COLORS.surfaceDark,
    borderWidth: 2,
    borderColor: COLORS.gray700,
  },
  stepText: {
    fontSize: 14,
    fontWeight: '700',
  },
  stepTextActive: {
    color: COLORS.backgroundDark,
  },
  stepTextInactive: {
    color: COLORS.gray500,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: COLORS.gray800,
    marginVertical: 8,
    borderRadius: 1,
  },
  instructionContent: {
    flex: 1,
    paddingBottom: 24,
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 8,
  },
  instructionDescription: {
    fontSize: 14,
    color: COLORS.gray400,
    lineHeight: 22,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(10, 15, 12, 0.9)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    zIndex: 50,
    paddingBottom:40,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: 12,
    paddingHorizontal: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  addToCartContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addToCartText: {
    color: COLORS.backgroundDark,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  priceTag: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  priceText: {
    color: COLORS.backgroundDark,
    fontSize: 16,
    fontWeight: '700',
  },
});