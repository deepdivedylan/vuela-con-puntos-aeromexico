import type SpendingByCategory from './SpendingByCategory.ts';

export default interface CreditCardEfficiencyParams {
    spending: SpendingByCategory;
    usdToMxnRate?: number;
    includeWelcomeOffers?: boolean;
}
