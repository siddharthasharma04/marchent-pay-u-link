import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Modal, 
  Share, 
  Clipboard, 
  Alert 
} from 'react-native';
import { useTheme } from '../../../hooks/useTheme'; // The style context hook[cite: 4]
import { useCreateInvoiceStyles } from '../create-invoice/styles';
import { useAppStore } from '../../../store/useAppStore';
import { Copy, CrossIcon, Link, ShareIcon, X } from 'lucide-react-native';

export default function QuickPayScreen() {
  const styles = useCreateInvoiceStyles(); // Instantiating your standard structural theme layouts[cite: 4]
  const { colors } = useTheme(); // Pull colors directly for inline color overrides[cite: 4]
  const { addQuickPayLink } = useAppStore();

  // Field states
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [discount, setDiscount] = useState('');

  // Validation feedback states
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Output Modal visibility parameters
  const [modalVisible, setModalVisible] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState('');

  // Helper to update text and clear errors immediately when the user starts typing
  const handleInputChange = (field: string, value: string, setter: (val: string) => void) => {
    setter(value);
    if (errors[field]) {
      setErrors(prev => {
        const updatedErrors = { ...prev };
        delete updatedErrors[field];
        return updatedErrors;
      });
    }
  };

  // Resets the entire form and error states cleanly upon closing the modal
  const handleCloseModal = () => {
    setModalVisible(false);
    setGeneratedUrl('');
    setCustomerName('');
    setPhone('');
    setEmail('');
    setDescription('');
    setAmount('');
    setDiscount('');
    setErrors({});
  };

  const validateForm = () => {
    let activeErrors: Record<string, string> = {};

    if (!customerName.trim()) {
      activeErrors.customerName = "Customer Name is required.";
    }

    // Omani phone rule verification (+968 validation or 8 digits layout match)
    // const phoneRegex = /^(?:\+968)?\s?[79]\d{7}$/;
    const phoneRegex = /^[0-9]+$/;
    if (!phone.trim()) {
      activeErrors.phone = "Customer Mobile Number is required.";
    } else if (!phoneRegex.test(phone.trim().replace(/\s/g, ''))) {
      // activeErrors.phone = "Enter a valid Omani mobile number (e.g., 91234567).";
      activeErrors.phone = "Enter a valid Omani mobile number.";
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      activeErrors.email = "Please enter a valid email address structure.";
    }

    const parsedAmount = parseFloat(amount);
    if (!amount.trim()) {
      activeErrors.amount = "Base transaction amount is required.";
    } else if (isNaN(parsedAmount) || parsedAmount <= 0) {
      activeErrors.amount = "Amount must be a numeric value greater than 0.";
    }

    const parsedDiscount = parseFloat(discount);
    if (discount.trim() && (isNaN(parsedDiscount) || parsedDiscount < 0)) {
      activeErrors.discount = "Discount value must be a valid positive number.";
    } else if (parsedDiscount >= parsedAmount) {
      activeErrors.discount = "Discount cannot completely exceed or match the total amount.";
    }

    setErrors(activeErrors);
    return Object.keys(activeErrors).length === 0;
  };

  const handleGenerateGateway = () => {
    if (!validateForm()) return;

    const gatewayUrl = addQuickPayLink({
      customerName: customerName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      description: description.trim(),
      amount: parseFloat(amount),
      discount: parseFloat(discount) || 0,
    });

    setGeneratedUrl(gatewayUrl);
    setModalVisible(true); // Bring up the detailed response action sheet[cite: 4]
  };

  const copyToClipboard = () => {
    Clipboard.setString(generatedUrl);
    Alert.alert("Link Copied", "Gateway destination reference appended to clipboard.");
  };

  const handleNativeShare = async () => {
    try {
      await Share.share({
        message: `Qafeer Pay Invoice Link generated for ${customerName}. Secure Checkout URL: ${generatedUrl}`,
        title: 'Qafeer Payment Request',
      });
    } catch (error) {
      console.error("Native share dialog error: ", error);
    }
  };

  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <Text style={styles.label}>Customer Name *</Text>
        <TextInput 
          style={[styles.input, errors.customerName ? { borderColor: colors.error } : { borderColor: colors.border }]} 
          value={customerName} 
          onChangeText={(val) => handleInputChange('customerName', val, setCustomerName)} 
          placeholder="e.g. Salim Al-Busaidi" 
          placeholderTextColor={colors.textMuted}
        />
        {errors.customerName && <Text style={styles.errorText}>{errors.customerName}</Text>}

        <Text style={styles.label}>Customer Mobile Number *</Text>
        <TextInput 
          style={[styles.input, errors.phone ? { borderColor: colors.error } : { borderColor: colors.border }]} 
          value={phone} 
          onChangeText={(val) => handleInputChange('phone', val, setPhone)} 
          keyboardType="phone-pad" 
          placeholder="e.g. 9123 4567" 
          placeholderTextColor={colors.textMuted}
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

        <Text style={styles.label}>Customer Email ID</Text>
        <TextInput 
          style={[styles.input, errors.email ? { borderColor: colors.error } : { borderColor: colors.border }]} 
          value={email} 
          onChangeText={(val) => handleInputChange('email', val, setEmail)} 
          keyboardType="email-address" 
          autoCapitalize="none"
          placeholder="customer@domain.om" 
          placeholderTextColor={colors.textMuted}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <Text style={styles.label}>Service / Item Description</Text>
        <TextInput 
          style={[styles.input, { height: 75, textAlignVertical: 'top' }]} 
          value={description} 
          onChangeText={setDescription} 
          multiline 
          placeholder="Describe items or contract terms..." 
          placeholderTextColor={colors.textMuted}
        />

        <Text style={styles.label}>Amount *</Text>
        <TextInput 
          style={[styles.input, errors.amount ? { borderColor: colors.error } : { borderColor: colors.border }]} 
          value={amount} 
          onChangeText={(val) => handleInputChange('amount', val, setAmount)} 
          keyboardType="decimal-pad" 
          placeholder="0.000" 
          placeholderTextColor={colors.textMuted}
        />
        {errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}

        <Text style={styles.label}>Discount Coupon</Text>
        <TextInput 
          style={[styles.input, errors.discount ? { borderColor: colors.error } : { borderColor: colors.border }]} 
          value={discount} 
          onChangeText={setDiscount} 
          placeholder="e.g. ABC1234" 
          placeholderTextColor={colors.textMuted}
        />
        {errors.discount && <Text style={styles.errorText}>{errors.discount}</Text>}

        {/* Generate Button utilizing your primary color settings[cite: 4] */}
        <TouchableOpacity 
          style={[styles.submitBtn, { backgroundColor: colors.primary, marginTop: 24 }]} 
          onPress={handleGenerateGateway}
        >
          <Link color="#FFF" size={18} />
          <Text style={styles.submitBtnText}>Generate Payment Gateway URL</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Gateway Presentation Slide Up Modal Layer[cite: 4] */}
      <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={handleCloseModal}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.textMain }]}>Gateway Transaction Link</Text>
              <TouchableOpacity onPress={handleCloseModal}>
                <X size={24} color={colors.textMuted} />
              </TouchableOpacity>
            </View>

            {/* Input Row containing Side-by-Side Icon Copy Activation[cite: 4] */}
            <View style={[styles.linkBox, { borderColor: colors.border, backgroundColor: colors.background }]}>
              <TextInput 
                style={[styles.linkInput, { color: colors.textMain }]} 
                value={generatedUrl} 
                editable={false} 
                selectTextOnFocus={true}
              />
              <TouchableOpacity onPress={copyToClipboard} style={{ padding: 4 }}>
                <Copy size={22} color={colors.primary} />
              </TouchableOpacity>
            </View>

            {/* Native Share Platform UI System Hook Trigger[cite: 4] */}
            <TouchableOpacity 
              style={[styles.modalCta, { backgroundColor: colors.primary, borderColor: colors.primary }]} 
              onPress={handleNativeShare}
            >
              <ShareIcon size={20} color="#FFF" />
              <Text style={[styles.modalCtaText, { color: '#FFF' }]}>Share Link</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </View>
  );
}