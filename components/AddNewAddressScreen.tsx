import {
  ArrowLeft,
  Bookmark,
  Briefcase,
  CheckCircle,
  ChevronDown,
  Home,
  Locate,
  MapPin,
  Search,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
const HEADER_HEIGHT = 60;
const SAFE_TOP = Platform.OS === 'ios' ? 48 : StatusBar.currentHeight || 0;
const TOTAL_HEADER_HEIGHT = HEADER_HEIGHT + SAFE_TOP;

const COLORS = {
  primary: '#2bee6c',
  backgroundLight: '#f6f8f6',
  backgroundDark: '#102216',
  textDark: '#111813',
  white: '#ffffff',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  green600: '#16a34a',
  green800: '#166534',
};

interface AddNewAddressScreenProps {
  onBack?: () => void;
}

interface TagButtonProps {
  label: string;
  icon: React.ComponentType<any>;
  active: boolean;
  onPress: () => void;
}

export default function AddNewAddressScreen({ onBack }: AddNewAddressScreenProps) {
  const [street, setStreet] = useState('123 Green Street');
  const [apt, setApt] = useState('');
  const [zip, setZip] = useState('10012');
  const [city] = useState('New York');
  const [instructions, setInstructions] = useState('');
  const [selectedTag, setSelectedTag] = useState('Home');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Fixed Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerSafeArea}>
          <View style={styles.headerContent}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <ArrowLeft size={24} color={COLORS.textDark} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Add New Address</Text>
            <View style={styles.headerRightPlaceholder} />
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Map Section */}
        <View style={styles.mapSection}>
          <ImageBackground
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2uZkmnoHlndC9J8gexGvw7hVdd0S7XgOpRre3Clh0Zh7HH1CTr9NO9g9XcJzs8g6ei_PrCV3tWsTnAEo3U3I8ISxqw6X-JC5KQayI_PlUiPhw6YjKelc-0dfOBvSzoCLP3Vub3dhb5PG3oUPahV79S2fRXWo3UQBQIqT_lyHX-emNOgdEZsm4AbcQfw8SrvFlUfGCjHjq60XzBymmewLSw84NnIHXTmTorw0t7-n3ZiNnG75s_vhe5jmVK_p4Lw2CCp8ynlDIata5',
            }}
            style={styles.mapImage}
          >
            {/* Floating Search Bar */}
            <View style={styles.searchContainer}>
              <View style={styles.searchBar}>
                <View style={styles.searchIconContainer}>
                  <Search size={20} color={COLORS.gray400} />
                </View>
                <TextInput
                  style={styles.searchInput}
                  value="123 Green Street"
                  placeholder="Search for a new address"
                  placeholderTextColor={COLORS.gray400}
                />
                <TouchableOpacity style={styles.locateButton}>
                  <Locate size={20} color={COLORS.gray400} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Central Pin */}
            <View style={styles.pinContainer}>
              <View style={styles.pinWrapper}>
                <MapPin size={48} color={COLORS.primary} fill={COLORS.primary} />
                <View style={styles.pinShadow} />
              </View>
            </View>

            {/* Context Pill */}
            <View style={styles.pillContainer}>
              <View style={styles.pill}>
                <Text style={styles.pillText}>Move map to adjust location</Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>Location Details</Text>
            <Text style={styles.formSubtitle}>Please ensure the pin is accurate.</Text>
          </View>

          <View style={styles.inputsContainer}>
            {/* Street Address */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Street Address</Text>
              <View style={styles.inputWrapper}>
                <TextInput style={styles.input} value={street} onChangeText={setStreet} />
                <CheckCircle size={20} color={COLORS.green600} style={styles.inputIcon} />
              </View>
            </View>

            {/* Section Divider */}
            <View style={styles.sectionDivider} />

            {/* Apt & Zip */}
            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 16 }]}>
                <Text style={styles.label}>
                  Apt / Suite <Text style={styles.labelOptional}>(Optional)</Text>
                </Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g. 4B"
                    placeholderTextColor={COLORS.gray400}
                    value={apt}
                    onChangeText={setApt}
                  />
                </View>
              </View>
              <View style={[styles.inputGroup, { width: '35%' }]}>
                <Text style={styles.label}>Zip Code</Text>
                <View style={styles.inputWrapper}>
                  <TextInput style={styles.input} value={zip} onChangeText={setZip} />
                </View>
              </View>
            </View>

            {/* City & State */}
            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 16 }]}>
                <Text style={styles.label}>City</Text>
                <View style={[styles.inputWrapper, styles.readOnlyBg]}>
                  <TextInput style={styles.input} value={city} editable={false} />
                </View>
              </View>
              <View style={[styles.inputGroup, { width: '35%' }]}>
                <Text style={styles.label}>State</Text>
                <View style={[styles.inputWrapper, styles.readOnlyBg]}>
                  <Text style={styles.selectValue}>NY</Text>
                  <ChevronDown size={20} color={COLORS.gray400} style={styles.inputIcon} />
                </View>
              </View>
            </View>

            {/* Section Divider */}
            <View style={styles.sectionDivider} />

            {/* Delivery Instructions */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Delivery Instructions</Text>
              <View style={[styles.inputWrapper, { height: 100, alignItems: 'flex-start' }]}>
                <TextInput
                  style={[
                    styles.input,
                    { height: '100%', textAlignVertical: 'top', paddingTop: 12 },
                  ]}
                  placeholder="Gate code, leave at door, call upon arrival..."
                  placeholderTextColor={COLORS.gray400}
                  multiline
                  value={instructions}
                  onChangeText={setInstructions}
                />
              </View>
            </View>
          </View>

          {/* Main Section Divider */}
          <View style={styles.mainDivider} />

          {/* Save As Tags */}
          <View style={styles.tagsSection}>
            <Text style={[styles.label, { marginBottom: 12 }]}>Save as</Text>
            <View style={styles.tagsRow}>
              <TagButton
                label="Home"
                icon={Home}
                active={selectedTag === 'Home'}
                onPress={() => setSelectedTag('Home')}
              />
              <TagButton
                label="Work"
                icon={Briefcase}
                active={selectedTag === 'Work'}
                onPress={() => setSelectedTag('Work')}
              />
              <TagButton
                label="Other"
                icon={Bookmark}
                active={selectedTag === 'Other'}
                onPress={() => setSelectedTag('Other')}
              />
            </View>
          </View>

          {/* Bottom Spacer for Footer */}
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Sticky Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} activeOpacity={0.9}>
          <Text style={styles.saveButtonText}>Save Address</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const TagButton = ({ label, icon: Icon, active, onPress }: TagButtonProps) => (
  <TouchableOpacity
    style={[styles.tag, active ? styles.tagActive : styles.tagInactive]}
    onPress={onPress}
  >
    <Icon
      size={20}
      color={active ? COLORS.green800 : COLORS.gray600}
      fill={active ? COLORS.green800 : 'none'}
    />
    <Text style={[styles.tagText, active ? styles.tagTextActive : styles.tagTextInactive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: 'rgba(246, 248, 246, 0.95)',
  },
  headerSafeArea: {
    paddingTop: SAFE_TOP,
  },
  headerContent: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
    textAlign: 'center',
    flex: 1,
  },
  headerRightPlaceholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: TOTAL_HEADER_HEIGHT,
  },
  mapSection: {
    height: 256,
    width: '100%',
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  searchIconContainer: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: COLORS.textDark,
  },
  locateButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: COLORS.gray100,
  },
  pinContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  pinShadow: {
    width: 8,
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 4,
    marginTop: 2,
  },
  pillContainer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  pill: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.gray600,
  },
  formSection: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
    marginTop: -16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  formHeader: {
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textDark,
    letterSpacing: -0.5,
  },
  formSubtitle: {
    fontSize: 14,
    color: COLORS.gray500,
    marginTop: 4,
  },
  inputsContainer: {
    // Container for inputs
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray700,
    marginBottom: 6,
  },
  labelOptional: {
    color: COLORS.gray400,
    fontWeight: '400',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    height: 50,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textDark,
    height: '100%',
  },
  inputIcon: {
    marginLeft: 8,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  readOnlyBg: {
    backgroundColor: COLORS.gray50,
  },
  selectValue: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textDark,
  },
  tagsSection: {
    marginTop: 8,
    marginBottom: 15,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    gap: 8,
  },
  tagActive: {
    backgroundColor: 'rgba(43, 238, 108, 0.1)',
    borderColor: COLORS.primary,
  },
  tagInactive: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray200,
  },
  tagText: {
    fontSize: 14,
    fontWeight: '500',
  },
  tagTextActive: {
    color: COLORS.green800,
  },
  tagTextInactive: {
    color: COLORS.gray600,
  },
  // Divider Styles
  sectionDivider: {
    height: 1,
    backgroundColor: COLORS.gray100,
    marginVertical: 16,
    marginHorizontal: -4,
  },
  mainDivider: {
    height: 1,
    backgroundColor: COLORS.gray200,
    marginVertical: 24,
    marginHorizontal: -20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.backgroundLight,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray100,
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 30,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#102216',
  },
});