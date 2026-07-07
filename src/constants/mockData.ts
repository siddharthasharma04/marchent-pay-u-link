import { THalLoan, TInvoice } from "../model";

export const MOCK_INVOICES: TInvoice[] = [
    { id: 'INV-8831', customerName: 'Ahmed Al-Balushi', amount: 45.500, description: 'Web Consulting Services', status: 'Paid', createdAt: '2026-07-01' },
    { id: 'INV-8832', customerName: 'Fatima Al-Zadjali', amount: 120.000, description: 'E-commerce Setup', status: 'Pending', createdAt: '2026-07-01' },
    { id: 'INV-8833', customerName: 'Salim Shinas', amount: 15.000, description: 'Domain Renewal', status: 'Failed', createdAt: '2026-06-30' },
    { id: 'INV-8834', customerName: 'Layla Al-Harthy', amount: 75.250, description: 'SEO Optimization', status: 'Paid', createdAt: '2026-06-29' },
    { id: 'INV-8835', customerName: 'Hassan Al-Maawali', amount: 200.000, description: 'Mobile App Development', status: 'Pending', createdAt: '2026-06-28' },
    { id: 'INV-8836', customerName: 'Aisha Al-Kharusi', amount: 50.000, description: 'Social Media Management', status: 'Paid', createdAt: '2026-06-27' },
    { id: 'INV-8837', customerName: 'Omar Al-Salmi', amount: 30.000, description: 'Graphic Design Services', status: 'Failed', createdAt: '2026-06-26' },
    { id: 'INV-8838', customerName: 'Noura Al-Mukhaini', amount: 90.000, description: 'Content Writing Services', status: 'Pending', createdAt: '2026-06-25' },
    { id: 'INV-8839', customerName: 'Khalid Al-Busaidi', amount: 150.000, description: 'Video Production Services', status: 'Paid', createdAt: '2026-06-24' },
    { id: 'INV-8840', customerName: 'Sara Al-Hinai', amount: 60.000, description: 'Email Marketing Campaign', status: 'Pending', createdAt: '2026-06-23' },
    { id: 'INV-8841', customerName: 'Yousef Al-Maawali', amount: 80.000, description: 'Website Maintenance', status: 'Paid', createdAt: '2026-06-22' },
    { id: 'INV-8842', customerName: 'Mariam Al-Kharusi', amount: 25.000, description: 'Logo Design Services', status: 'Failed', createdAt: '2026-06-21' }
];

export const MOCK_HAL_DATA: THalLoan[] = [
    { id: 'HAL-LN-4091', loanAmount: 25000, pendingTenure: '18 Months', status: 'Active', interestRate: '4.5%', nextInstallmentDate: '2026-08-01' },
    { id: 'HAL-LN-8821', loanAmount: 5000, pendingTenure: '4 Months', status: 'Active', interestRate: '3.9%', nextInstallmentDate: '2026-07-25' },
    { id: 'HAL-LN-1034', loanAmount: 60000, pendingTenure: '0 Months', status: 'Settled', interestRate: '4.2%', nextInstallmentDate: 'N/A' },
  ];