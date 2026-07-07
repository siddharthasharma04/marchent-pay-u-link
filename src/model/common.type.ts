export type TTabType = 'home' | 'create' | 'history' | 'profile' | 'quick-pay' | 'hal-registry';

export interface THalLoan {
  id: string;
  loanAmount: number;
  pendingTenure: string; // e.g. "14 Months"
  status: 'Active' | 'Settled' | 'Under Review';
  interestRate: string;
  nextInstallmentDate: string;
}

export interface TQuickPayLink {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  description: string;
  amount: number;
  discount: number;
  finalAmount: number;
  gatewayUrl: string;
  createdAt: string;
}