import { Text, View } from "react-native";
import { TInvoice } from "../../../model";
import { useInvoiceCardStyles } from "./styles";
import { useTheme } from "../../../hooks/useTheme";
import { CurrencyIcon } from "../../atoms/CurrencyIcon";

type InvoiceCardProps = {
    invoice: TInvoice
}
export default function InvoiceCard({ invoice }: InvoiceCardProps) {
    const styles = useInvoiceCardStyles();
    const { colors } = useTheme();

    return (

        <View key={invoice.id} style={styles.invoiceCard}>
            <View style={styles.invoiceLeft}>
                <Text style={styles.customerName}>{invoice.customerName}</Text>
                <Text style={styles.invoiceMeta}>{invoice.id} • {invoice.createdAt}</Text>
            </View>
            <View style={styles.invoiceRight}>
                <View style={styles.invoiceAmount}>
                    <Text><CurrencyIcon color={styles.invoiceAmount.color} /></Text>
                    <Text>{invoice.amount.toFixed(3)}</Text>
                </View>
                <View style={[
                    styles.statusBadge,
                    { backgroundColor: invoice.status === 'Paid' ? colors.success + '20' : invoice.status === 'Pending' ? '#FF980020' : colors.error + '20' }
                ]}>
                    <Text style={[
                        styles.statusText,
                        { color: invoice.status === 'Paid' ? colors.success : invoice.status === 'Pending' ? '#FB8C00' : colors.error }
                    ]}>
                        {invoice.status}
                    </Text>
                </View>
            </View>
        </View>
    )
}