import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { UserData } from '@/src/types/types';
import { STYLES } from '@/src/constants';
import { MODAL_STYLES } from '@/src/constants/Style';

interface InputManifestModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: UserData) => void;
}

const InputManifestModal: React.FC<InputManifestModalProps> = ({ visible, onClose, onSave }) => {
  const [userInfo, setUserInfo] = useState<UserData>({
    fullName: '',
    twitter: '',
    instagram: '',
    facebook: '',
  });

  const handleChange = (name: keyof UserData, value: string) => {
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSave = () => {
    onSave(userInfo);
    onClose();
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={MODAL_STYLES.modalOverlay}>
        <View style={MODAL_STYLES.modalContent}>
          <Text style={MODAL_STYLES.modalTitle}>Manifest Work Assertion</Text>

          <View style={MODAL_STYLES.inputContainer}>
            <Text style={MODAL_STYLES.label}>Full Name</Text>
            <TextInput
              style={MODAL_STYLES.input}
              value={userInfo.fullName}
              onChangeText={(value) => handleChange('fullName', value)}
            />
          </View>

          <View style={MODAL_STYLES.inputContainer}>
            <Text style={MODAL_STYLES.label}>Twitter Account</Text>
            <TextInput
              style={MODAL_STYLES.input}
              value={userInfo.twitter}
              onChangeText={(value) => handleChange('twitter', value)}
            />
          </View>

          <View style={MODAL_STYLES.inputContainer}>
            <Text style={MODAL_STYLES.label}>Instagram Account</Text>
            <TextInput
              style={MODAL_STYLES.input}
              value={userInfo.instagram}
              onChangeText={(value) => handleChange('instagram', value)}
            />
          </View>

          <View style={MODAL_STYLES.inputContainer}>
            <Text style={MODAL_STYLES.label}>Facebook Account</Text>
            <TextInput
              style={MODAL_STYLES.input}
              value={userInfo.facebook}
              onChangeText={(value) => handleChange('facebook', value)}
            />
          </View>

          <Pressable
            style={[STYLES.button, { alignItems: 'center', marginVertical: 10 }]}
            onPress={handleSave}>
            <Text style={[STYLES.text, { alignItems: 'center', paddingHorizontal: 50 }]}>Save</Text>
          </Pressable>
          <Pressable
            style={[STYLES.button, { alignItems: 'center', marginVertical: 10 }]}
            onPress={onClose}>
            <Text style={[STYLES.text, { alignItems: 'center', paddingHorizontal: 50 }]}>
              Close
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default InputManifestModal;
