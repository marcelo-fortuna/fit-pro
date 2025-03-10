import { View, Text, StyleSheet, Pressable, Alert, ScrollView, Modal } from 'react-native';
import { Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { router } from 'expo-router';
import { supabase } from '../../utils/supabase';
import { useEffect, useState } from 'react';
import { useTranslation } from '../../utils/i18n';
import * as ImagePicker from 'expo-image-picker';

type UserProfile = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  birth_date: string | null;
  subscription_status: string;
  subscription_end_date: string | null;
  profile_image_url: string | null;
};

export default function Profile() {
  const { t } = useTranslation();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showImageOptions, setShowImageOptions] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data: profile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setUserProfile(profile);
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleImagePick = async (useCamera: boolean) => {
    try {
      setShowImageOptions(false);
      setUploadingImage(true);

      let result;
      if (useCamera) {
        result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });
      } else {
        result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.7,
        });
      }

      if (!result.canceled && result.assets[0]) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No user found');

        // Upload image to Supabase Storage
        const file = result.assets[0];
        const fileExt = file.uri.split('.').pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        const filePath = `profiles/${fileName}`;

        const response = await fetch(file.uri);
        const blob = await response.blob();

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, blob);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);

        // Update user profile
        const { error: updateError } = await supabase
          .from('users')
          .update({ profile_image_url: publicUrl })
          .eq('id', user.id);

        if (updateError) throw updateError;

        // Refresh profile
        fetchUserProfile();
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to update profile picture');
      console.error(err);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.replace('/');
    } catch (err) {
      Alert.alert('Error', 'Failed to log out');
    }
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('profile.title')}</Text>
      </View>

      <View style={styles.profile}>
        <Pressable
          onPress={() => setShowImageOptions(true)}
          style={styles.avatarContainer}
        >
          <Image
            source={{
              uri: userProfile?.profile_image_url ||
                'https://cdna.artstation.com/p/assets/images/images/084/124/300/large/matthew-blank-profile-photo-3.jpg',
            }}
            style={styles.avatar}
          />
          <View style={styles.editOverlay}>
            <Ionicons name="camera" size={24} color="white" />
          </View>
        </Pressable>
        <Text style={styles.name}>
          {userProfile?.first_name}{userProfile?.last_name}
        </Text>
        <Text style={styles.email}>{userProfile?.email}</Text>
        {userProfile?.birth_date && (
          <Text style={styles.age}>
            {calculateAge(userProfile.birth_date)} {t('profile.yearsOld')}
          </Text>
        )}
      </View>

      <View style={styles.subscription}>
        <Text style={styles.subscriptionTitle}>{t('profile.currentPlan')}</Text>
        <View style={styles.planCard}>
          <View style={styles.planInfo}>
            <Text style={styles.planName}>{t('profile.premiumMonthly')}</Text>
            <Text style={styles.planPrice}>$19.99/month</Text>
          </View>
          <Text style={styles.planExpiry}>
            {t('profile.expiresOn')}{' '}
            {userProfile?.subscription_end_date
              ? new Date(userProfile.subscription_end_date).toLocaleDateString()
              : 'N/A'}
          </Text>
        </View>
      </View>

      <View style={styles.menu}>
        <Pressable style={styles.menuItem}>
          <Ionicons name='settings-outline' size={24} color="#0f172a" />
          <Text style={styles.menuText}>{t('profile.settings')}</Text>
          <Ionicons name="chevron-forward" size={24} color="#64748b" />
        </Pressable>

        <Pressable style={styles.menuItem}>
          <Ionicons name="card-outline" size={24} color="#0f172a" />
          <Text style={styles.menuText}>{t('profile.paymentMethods')}</Text>
          <Ionicons name="chevron-forward" size={24} color="#64748b" />
        </Pressable>

        <Pressable style={styles.menuItem}>
          <Ionicons name="help-circle-outline" size={24} color="#0f172a" />
          <Text style={styles.menuText}>{t('profile.helpSupport')}</Text>
          <Ionicons name="chevron-forward" size={24} color="#64748b" />
        </Pressable>
      </View>

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>{t('profile.logout')}</Text>
      </Pressable>

      <Modal
        visible={showImageOptions}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowImageOptions(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowImageOptions(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t('profile.updatePhoto')}</Text>
            <Pressable
              style={styles.modalOption}
              onPress={() => handleImagePick(false)}
            >
              <Ionicons name="images-outline" size={24} color="#0f172a" />
              <Text style={styles.modalOptionText}>{t('profile.chooseFromGallery')}</Text>
            </Pressable>
            <Pressable
              style={styles.modalOption}
              onPress={() => handleImagePick(true)}
            >
              <Ionicons name="camera-outline" size={24} color="#0f172a" />
              <Text style={styles.modalOptionText}>{t('profile.takePhoto')}</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  profile: {
    alignItems: 'center',
    padding: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0f766e',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 4,
  },
  age: {
    fontSize: 16,
    color: '#64748b',
  },
  subscription: {
    padding: 24,
    paddingTop: 0,
  },
  subscriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  planCard: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
  },
  planInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  planName: {
    fontSize: 16,
    fontWeight: '600',
  },
  planPrice: {
    fontSize: 16,
    color: '#0f172a',
  },
  planExpiry: {
    fontSize: 14,
    color: '#64748b',
  },
  menu: {
    padding: 24,
    paddingTop: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  logoutButton: {
    margin: 24,
    padding: 16,
    backgroundColor: '#ef4444',
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
    color: '#0f172a',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    marginBottom: 12,
  },
  modalOptionText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#0f172a',
  },
});