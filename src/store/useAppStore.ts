import { create } from 'zustand';
import { MOCK_HAL_DATA, MOCK_INVOICES } from '../constants/mockData';
import { TColorPallette, THalLoan, TInvoice, TQuickPayLink } from '../model';
import { ColorThemes } from '../constants/theme';
import en from '../content/en.json';
import ar from '../content/ar.json';

type TLanguage = 'English' | 'العربية';
type LanguageType = 'en' | 'ar';
interface AppState {
    isAuthenticated: boolean;
    username: string | null;
    email: string;
    phone: string;
    halLoans: THalLoan[];
    quickPayLinks: TQuickPayLink[];
    invoices: TInvoice[];
    activeTheme: TColorPallette;
    language: LanguageType;
    setLanguage: (lang: LanguageType) => void;
    login: (username: string) => void;
    logout: () => void;
    addInvoice: (customerName: string, amount: number, description: string) => string;
    addQuickPayLink: (data: Omit<TQuickPayLink, 'id' | 'finalAmount' | 'gatewayUrl' | 'createdAt'>) => string;
    updateProfile: (email: string, phone: string) => void;
    setAppTheme: (theme: TColorPallette) => void;
}

export const useAppStore = create<AppState>((set) => ({
    isAuthenticated: false, // Protected by default
    username: null,
    invoices: MOCK_INVOICES,
    email: 'info@omanmerchants.om',
    phone: '+968 9123 4567',
    language: 'en',
    activeTheme: ColorThemes.CLASSIC_BLUE,
    halLoans: MOCK_HAL_DATA,
    quickPayLinks: [],

    login: (username) => set({ isAuthenticated: true, username }),
    logout: () => set({ isAuthenticated: false, username: null }),
    
    addInvoice: (customerName, amount, description) => {
        const generatedId = `INV-${Math.floor(1000 + Math.random() * 9000)}`;
        const newInvoice: TInvoice = {
            id: generatedId,
            customerName,
            amount,
            description,
            status: 'Pending',
            createdAt: new Date().toISOString().split('T')[0], // Outputs YYYY-MM-DD
        };

        set((state) => ({
            invoices: [newInvoice, ...state.invoices],
        }));

        return generatedId;
    },
    addQuickPayLink: (payload) => {
    const generatedId = `LNK-${Math.floor(1000 + Math.random() * 9000)}`;
    const finalAmount = Math.max(0, payload.amount - payload.discount);
    // Simulate payment gateway tracking token url allocation
    const gatewayUrl = `https://pay.qafeer.om/checkout/${generatedId}`;
    
    const newLink: TQuickPayLink = {
      ...payload,
      id: generatedId,
      finalAmount,
      gatewayUrl,
      createdAt: new Date().toISOString().split('T')[0],
    };

    set((state) => ({ quickPayLinks: [newLink, ...state.quickPayLinks] }));
    return gatewayUrl;
  },
    updateProfile: (email: string, phone: string) => set({ email, phone }),
    setLanguage: (language: LanguageType) => set({ language }),
    setAppTheme: (activeTheme: TColorPallette) => set({ activeTheme }),
}));

// A clean utility hook to extract deep key notation strings natively
export function useTranslation() {
  const currentLang = useAppStore((state) => state.language);
  const translations = currentLang === 'ar' ? ar : en;

  const t = (path: string): string => {
    return path.split('.').reduce((obj, key) => (obj as any)?.[key], translations) as unknown as string || path;
  };

  // isRTL boolean flag helps handle text-align direction dynamics smoothly
  return { t, isRTL: currentLang === 'ar', language: currentLang };
}