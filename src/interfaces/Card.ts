import type Bonus from './Bonus.ts';
import type EarnRatesByCategory from './EarnRatesByCategory.ts';
import type WelcomeOffer from './WelcomeOffer.ts';

export default interface Card {
    name: string;
    bank: 'BBVA' | 'Santander' | 'Inbursa' | 'American Express' | string;
    earnRatePercent?: number; // For BBVA cards
    annualFee: number;
    feeCurrency: 'MXN' | 'USD';
    directAeromexico: boolean;
    categoryBased: boolean;
    earnRatesByCategory?: EarnRatesByCategory;
    bonuses?: Bonus[];
    welcomeOffer?: WelcomeOffer;
}
