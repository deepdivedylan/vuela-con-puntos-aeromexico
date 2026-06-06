import type Bonus from './Bonus.ts';
import type EarnRatesByCategory from './EarnRatesByCategory.ts';
import type WelcomeOffer from './WelcomeOffer.ts';

export default interface Card {
    name: string;
    bank: 'Santander' | 'Inbursa' | 'American Express' | string;
    logo: string;
    annualFee: number;
    feeCurrency: 'MXN' | 'USD';
    directAeromexico: boolean;
    categoryBased: boolean;
    active: boolean;
    earnRatesByCategory?: EarnRatesByCategory;
    bonuses?: Bonus[];
    welcomeOffer?: WelcomeOffer;
}
