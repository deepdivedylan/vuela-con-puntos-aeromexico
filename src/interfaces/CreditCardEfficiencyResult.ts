import type ConversionRates from './ConversionRates.ts';
import type ExchangeRate from './ExchangeRate.ts';
import type RankedCard from './RankedCard.ts';
import type SpendingByCategory from './SpendingByCategory.ts';
export default interface CreditCardEfficiencyResult {
    totalSpend: number;
    spendingByCategory: SpendingByCategory;
    usdToMxnRate: number;
    ivaTaxRate: number;
    conversionRates: ConversionRates;
    includeWelcomeOffers: boolean;
    exchangeRate: ExchangeRate;
    cards: RankedCard[];
    bestOption: string;
}
