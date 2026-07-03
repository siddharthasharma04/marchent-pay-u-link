import React, { useState } from 'react';
import {
    Text, View, ScrollView, TextInput, TouchableOpacity,
    Modal, Alert, Clipboard, ToastAndroid, Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useCreateInvoiceStyles, usePickerSelectStyles } from './styles';
import { ArrowLeft, Plus, Trash2, Link, Copy, Share2, FileText, X } from 'lucide-react-native';
import { useAppStore } from '../../../store/useAppStore';
import { useTheme } from '../../../hooks/useTheme';
import { CurrencyIcon } from '../../../components/atoms/CurrencyIcon';

// Mock inventory item records as if delivered by backend API
const MOCK_API_PRODUCTS = [
    { id: 'prod_1', name: 'A4 Paper Ream (500 sheets)', defaultPrice: 2.500 },
    { id: 'prod_2', name: 'Printing - B&W (per page)', defaultPrice: 0.020 },
    { id: 'prod_3', name: 'Printing - Color (per page)', defaultPrice: 0.060 },
    { id: 'prod_4', name: 'Office Stapler HD', defaultPrice: 4.100 }
];

interface SelectedItemLine {
    productId: string;
    unitPrice: number;
    quantity: number;
}

export default function CreateInvoiceScreen({ onBack }: { onBack: () => void }) {
    const { colors, borderRadius } = useTheme();
    const addInvoice = useAppStore((state) => state.addInvoice);

    const styles = useCreateInvoiceStyles();
    const pStyles = usePickerSelectStyles();

    // Core Fields State
    const [customerName, setCustomerName] = useState('');
    const [description, setDescription] = useState('');
    const [lineItems, setLineItems] = useState<SelectedItemLine[]>([]);

    // Form Field Validation states
    const [customerError, setCustomerError] = useState('');
    const [itemsError, setItemsError] = useState('');

    // Modal and Output states
    const [showModal, setShowModal] = useState(false);
    const [generatedInvoiceId, setGeneratedInvoiceId] = useState('');
    const [generatedPdfUri, setGeneratedPdfUri] = useState('');
    const [isWebBlob, setIsWebBlob] = useState(false);

    // Calculations
    const subtotal = lineItems.reduce((acc, current) => acc + (current.unitPrice * current.quantity), 0);
    const taxAmount = subtotal * 0.05; // 5% Omani VAT
    const totalAmount = subtotal + taxAmount;
    const paymentLink = `https://pay.qafeer.com/${generatedInvoiceId}`;

    const handleAddProductLine = () => {
        setItemsError('');
        // Find first product item that hasn't been selected yet
        const nextAvailable = MOCK_API_PRODUCTS.find(p => !lineItems.some(li => li.productId === p.id));
        if (!nextAvailable) {
            Alert.alert("Notice", "All inventory items have already been selected.");
            return;
        }
        setLineItems([...lineItems, { productId: nextAvailable.id, unitPrice: nextAvailable.defaultPrice, quantity: 1 }]);
    };

    const handleUpdateItem = (index: number, key: keyof SelectedItemLine, value: any) => {
        const updated = [...lineItems];
        if (key === 'productId') {
            const targetProd = MOCK_API_PRODUCTS.find(p => p.id === value);
            updated[index].productId = value;
            updated[index].unitPrice = targetProd ? targetProd.defaultPrice : 0.000;
        } else {
            updated[index][key] = Number(value);
        }
        setLineItems(updated);
    };

    const handleRemoveItem = (index: number) => {
        setLineItems(lineItems.filter((_, i) => i !== index));
    };

    // Generate dynamic native PDF matching image template parameters
    const generatePdfBlob = async (invoiceId: string) => {
        const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

        const itemsHtmlHtml = lineItems.map(item => {
            const prod = MOCK_API_PRODUCTS.find(p => p.id === item.productId);
            return `
        <tr>
          <td>${prod?.name || 'Unknown Item'}</td>
          <td style="text-align: right;">OMR ${item.unitPrice.toFixed(3)}</td>
          <td style="text-align: center;">${item.quantity}</td>
          <td style="text-align: right;">OMR ${(item.unitPrice * item.quantity).toFixed(3)}</td>
        </tr>
      `;
        }).join('');

        const htmlContent = `
      <html>
      <head>
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 30px; color: #1E293B; }
          .header { text-align: center; margin-bottom: 30px; }
          .title { font-size: 26px; font-weight: 800; color: #0B4F6C; margin: 5px 0; }
          .meta-table, .items-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          .items-table th { background-color: #F1F5F9; padding: 10px; font-weight: 700; text-align: left; font-size: 13px; border-bottom: 2px solid #E2E8F0; }
          .items-table td { padding: 12px 10px; border-bottom: 1px solid #E2E8F0; font-size: 14px; }
          .summary-box { float: right; width: 40%; margin-top: 20px; border-top: 2px solid #0B4F6C; padding-top: 10px; }
          .summary-row { display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 6px; }
          .total-row { font-size: 18px; font-weight: 800; color: #0B4F6C; margin-top: 10px; }
          .qr-zone { text-align: center; margin-top: 50px; border-top: 1px dashed #CBD5E1; padding-top: 20px; }
          .footer-note { text-align: center; margin-top: 40px; font-size: 11px; color: #94A3B8; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">Qafeer</div>
          <div style="font-size:12px; color:#64748B;">Secure Merchant Access Receipt</div>
        </div>
        <hr style="border: 0; border-top: 1px solid #E2E8F0;" />
        <table class="meta-table">
          <tr>
            <td><strong>BILL TO:</strong><br/>${customerName}</td>
            <td style="text-align: right;">
              <strong>INVOICE:</strong> ${invoiceId}<br/>
              <strong>DATE:</strong> ${dateStr}
            </td>
          </tr>
        </table>
        <p><strong>DESCRIPTION:</strong><br/>${description || 'N/A'}</p>
        
        <table class="items-table">
          <thead>
            <tr>
              <th>ITEM</th>
              <th style="text-align: right;">UNIT PRICE</th>
              <th style="text-align: center;">QTY</th>
              <th style="text-align: right;">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtmlHtml}
          </tbody>
        </table>

        <div class="summary-box">
          <div class="summary-row"><span>Subtotal</span><span>OMR ${subtotal.toFixed(3)}</span></div>
          <div class="summary-row"><span>Tax (5%)</span><span>OMR ${taxAmount.toFixed(3)}</span></div>
          <div class="summary-row total-row"><span>Total</span><span>OMR ${totalAmount.toFixed(3)}</span></div>
        </div>
        
        <div style="clear: both;"></div>

        <div class="qr-zone">
          <div style="font-weight: 700; font-size: 14px; margin-bottom: 8px;">Scan to Pay</div>
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(paymentLink)}" width="120" height="120" alt="Payment QR" />
          <div style="font-size: 12px; color: #64748B; margin-top: 8px;">${paymentLink}</div>
        </div>

        <div class="footer-note">Your data is encrypted and always secure. Thank you for your business.</div>
      </body>
      </html>
    `;

        if (Platform.OS === 'web') {
    // WEB SPECIFIC ENGINE: Create a self-contained Data URI base64 string
    // This bypasses window.print() completely on button press!
    const base64Html = btoa(unescape(encodeURIComponent(htmlContent)));
    const webPdfUri = `data:text/html;base64,${base64Html}`;
    
    setGeneratedPdfUri(webPdfUri);
    setIsWebBlob(true);
  } else {
    // MOBILE SPECIFIC ENGINE: Compiles to system cache storage file reference
    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    setGeneratedPdfUri(uri);
    setIsWebBlob(false);
  }
    };
    const handleGeneratePaymentLink = async () => {
        let passed = true;
        if (!customerName.trim()) {
            setCustomerError('Customer name profile validation failed.');
            passed = false;
        }
        if (lineItems.length === 0) {
            setItemsError('Please add at least one line product item.');
            passed = false;
        }

        if (!passed) return;

        let currentInvoiceId = generatedInvoiceId;

        // ONLY create a new record in the global store if we haven't made one for this session yet!
        if (!currentInvoiceId) {
            const targetId = addInvoice(customerName, totalAmount, description || 'Multi-Item Bill');
            setGeneratedInvoiceId(targetId);
            currentInvoiceId = targetId;
        } else {
            // OPTIONAL: If your global store supports updating entries, you could sync changes here.
            // Otherwise, this safely prevents creating duplicate, redundant IDs in your history list.
            console.log("Refreshing existing invoice session:", currentInvoiceId);
        }

        try {
            // Generate/regenerate the PDF document using the locked invoice ID
            await generatePdfBlob(currentInvoiceId);
            setShowModal(true);
        } catch (err) {
            Alert.alert("Error", "Could not generate invoice document compiled layout.");
        }
    };

    // 3. IMPORTANT: Clear the session token when the user closes the modal or leaves the page
    const handleCloseModal = () => {
        setShowModal(false);
        // Reset session tracking so the NEXT invoice form wizard starts completely fresh
        setGeneratedInvoiceId('');
        setGeneratedPdfUri('');

        // Optional: Reset form fields here if you want to clear the screen for the next input
        setCustomerName('');
        setDescription('');
        setLineItems([]);
    };

    const handleCopyToClipboard = () => {
        Clipboard.setString(paymentLink);
        if (Platform.OS === 'android') {
            ToastAndroid.show('Link copied to clipboard!', ToastAndroid.SHORT);
        } else {
            Alert.alert('Success', 'Link copied to clipboard!');
        }
    };

    const handleNativeShare = async () => {
        if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(generatedPdfUri, { dialogTitle: `Share Invoice ${generatedInvoiceId}` });
        } else {
            Alert.alert("Error", "Native platform link sharing layer is unavailable.");
        }
    };

    const handleSaveInvoicePdf = async () => {
        try {
            if (!generatedPdfUri) {
                Alert.alert("Error", "Invoice document source was not found.");
                return;
            }

            if (Platform.OS === 'android') {
                // Direct, safe execution for Android platform threads
                await Print.printAsync({
                    uri: generatedPdfUri
                });
            } else {
                // iOS / Web fallback engines
                await Print.printAsync({ filePath: generatedPdfUri });
            }
        } catch (error) {
            console.error("PDF Engine Crash Intercepted: ", error);
            Alert.alert(
                "Print Service Unavailable",
                "Could not open system print manager. Try using the 'Share Payment Receipt' option to save it instead."
            );
        }
    };

    return (
        <View style={styles.container}>
            {/* Top Header Layer */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack}>
                    <ArrowLeft color={colors.textMain} size={22} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Create New Invoice</Text>
                <View style={{ width: 22 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {/* Customer Input */}
                <Text style={styles.label}>Customer Name *</Text>
                <TextInput
                    style={[styles.input, { borderColor: customerError ? colors.error : colors.border }]}
                    placeholder="e.g. Salim Al-Harthy"
                    placeholderTextColor={colors.textMuted}
                    value={customerName}
                    onChangeText={(text) => {
                        setCustomerName(text);
                        if (text.trim()) setCustomerError('');
                    }}
                />
                {customerError ? <Text style={styles.errorText}>{customerError}</Text> : null}

                {/* Description Input */}
                <Text style={styles.label}>Generic Description</Text>
                <TextInput
                    style={[styles.input, { height: 60, textAlignVertical: 'top' }]}
                    placeholder="Provide explicit context for this billing link..."
                    placeholderTextColor={colors.textMuted}
                    multiline
                    value={description}
                    onChangeText={setDescription}
                />

                {/* Dynamic Items Array Feed Header */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
                    <Text style={[styles.label, { marginTop: 0 }]}>Line Items *</Text>
                    {itemsError ? <Text style={[styles.errorText, { marginTop: 0 }]}>{itemsError}</Text> : null}
                </View>

                {lineItems.map((item, index) => {

                    return (
                        <View key={index} style={styles.itemRow}>
                            <TouchableOpacity style={styles.deleteItemBtn} onPress={() => handleRemoveItem(index)}>
                                <Trash2 color={colors.error} size={18} />
                            </TouchableOpacity>

                            <Text style={[styles.label, { marginTop: 0, fontSize: 12, color: colors.textMuted }]}>Select Inventory Product</Text>

                            <View style={[styles.nativePickerWrapper, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                                <Picker
                                    selectedValue={item.productId}
                                    onValueChange={(value) => {
                                        if (value && lineItems.some((li, i) => li.productId === value && i !== index)) {
                                            Alert.alert("Invalid Action", "This product item has already been selected inside another row line item.");
                                            return;
                                        }
                                        if (value) handleUpdateItem(index, 'productId', value);
                                    }}
                                    style={{ color: colors.textMain, width: '100%', borderWidth: 0 }}
                                    dropdownIconColor={colors.textMain} // Custom arrow coloring for Android
                                >
                                    {/* Placeholder choice */}
                                    <Picker.Item label="-- Choose an item --" value="" color={colors.textMuted} />

                                    {MOCK_API_PRODUCTS.map((p) => {
                                        const isAlreadySelected = lineItems.some((li) => li.productId === p.id);
                                        const isCurrentSelection = item.productId === p.id;

                                        return (
                                            <Picker.Item
                                                key={p.id}
                                                label={p.name}
                                                value={p.id}
                                                // Automatically disable selection options on web browsers if already chosen elsewhere
                                                enabled={!(isAlreadySelected && !isCurrentSelection)}
                                                style={{ color: isAlreadySelected && !isCurrentSelection ? colors.textMuted : colors.textMain }}
                                            />
                                        );
                                    })}
                                </Picker>
                            </View>

                            <View style={styles.itemInlineGrid}>
                                <View style={styles.gridCol}>
                                    <Text style={[styles.label, { marginTop: 6, fontSize: 12 }]}>Unit Price</Text>
                                    <TextInput
                                        style={styles.input}
                                        keyboardType="numeric"
                                        value={item.unitPrice.toString()}
                                        onChangeText={(val) => handleUpdateItem(index, 'unitPrice', val)}
                                    />
                                </View>
                                <View style={styles.gridCol}>
                                    <Text style={[styles.label, { marginTop: 6, fontSize: 12 }]}>Quantity</Text>
                                    <TextInput
                                        style={styles.input}
                                        keyboardType="number-pad"
                                        value={item.quantity.toString()}
                                        onChangeText={(val) => handleUpdateItem(index, 'quantity', val)}
                                    />
                                </View>
                            </View>
                        </View>
                    );
                })}

                {/* Append New Row Card Control */}
                <TouchableOpacity style={styles.addItemContainer} onPress={handleAddProductLine}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Plus color={colors.primary} size={18} />
                        <Text style={styles.addItemText}>Add Product Line Item</Text>
                    </View>
                </TouchableOpacity>

                {/* Dynamic Accounting Totals Card */}
                <View style={styles.totalCard}>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Subtotal</Text>
                        <View style={styles.totalValWrap}>
                            <Text><CurrencyIcon color={styles.totalVal.color} /></Text>
                            <Text style={styles.totalVal}>{subtotal.toFixed(3)}</Text>
                        </View>
                    </View>

                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>VAT (5%)</Text>
                        <View style={styles.totalValWrap}>
                            <Text><CurrencyIcon color={styles.totalVal.color} /></Text>
                            <Text style={styles.totalVal}>{taxAmount.toFixed(3)}</Text>
                        </View>
                    </View>

                    {/* Replacing <hr> with a clean native horizontal separator view */}
                    <View style={{ borderTopWidth: 1, borderColor: colors.border, marginVertical: 8 }} />

                    <View style={styles.totalRow}>
                        <Text style={styles.grandTotalLabel}>Total Amount</Text>
                        <View style={styles.grandTotalValWrap}>
                            <Text><CurrencyIcon color={styles.grandTotalVal.color} size={24} /></Text>
                            <Text style={styles.grandTotalVal}>{totalAmount.toFixed(3)}</Text>
                        </View>
                    </View>
                </View>

                {/* Submit action button CTA */}
                <TouchableOpacity style={[styles.submitBtn, { backgroundColor: colors.primary }]} onPress={handleGeneratePaymentLink}>
                    <Link color="#FFF" size={18} />
                    <Text style={styles.submitBtnText}>Generate Payment Link</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Action Options Modal Overlay */}
            <Modal visible={showModal} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <View style={styles.modalHeader}>
                            <Text style={[styles.modalTitle, { color: colors.textMain }]}>Link Generated Successfully</Text>
                            <TouchableOpacity onPress={handleCloseModal}>
                                <X color={colors.textMain} size={22} />
                            </TouchableOpacity>
                        </View>

                        {/* Read-only link box container wrapper layout with copy icon sidecar */}
                        <View style={[styles.linkBox, { backgroundColor: colors.background, borderColor: colors.border }]}>
                            <TextInput style={[styles.linkInput, { color: colors.textMain }]} value={paymentLink} editable={false} />
                            <TouchableOpacity onPress={handleCopyToClipboard}>
                                <Copy color={colors.primary} size={20} />
                            </TouchableOpacity>
                        </View>

                        {/* Share CTA using native device sharing framework */}
                        <TouchableOpacity style={[styles.modalCta, { backgroundColor: colors.primary, borderColor: colors.primary }]} onPress={handleNativeShare}>
                            <Share2 color="#FFF" size={18} />
                            <Text style={[styles.modalCtaText, { color: '#FFF' }]}>Share Payment Receipt</Text>
                        </TouchableOpacity>

                        {/* Save PDF CTA to trigger platform download managers execution */}
                        <TouchableOpacity style={[styles.modalCta, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={handleSaveInvoicePdf}>
                            <FileText color={colors.textMain} size={18} />
                            <Text style={[styles.modalCtaText, { color: colors.textMain }]}>Save Invoice PDF</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}