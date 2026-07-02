export type TInvoice = {
  id: string;
  customerName: string;
  amount: number;
  description: string;
  status: 'Paid' | 'Pending' | 'Failed';
  createdAt: string;
}