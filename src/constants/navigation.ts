import { TTabType } from "../model";

  export const NavigationConfig: {id: TTabType; label: string}[] = [
    { id: 'home' as TTabType, label: 'Home',  },
    { id: 'create' as TTabType, label: 'Add Invoice',  },
    { id: 'history' as TTabType, label: 'Transactions',  },
    { id: 'profile' as TTabType, label: 'Profile',  },
    { id: 'quick-pay' as TTabType, label: 'Quick Pay',  },
    { id: 'hal-registry' as TTabType, label: 'HAL Registry',  },
  ];