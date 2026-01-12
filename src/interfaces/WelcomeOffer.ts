export default interface WelcomeOffer {
    points: number;
    cashback?: number;
    cashbackCurrency?: 'MXN' | 'USD';
    spendingRequirement: number;
    spendingRequirementCurrency: 'MXN' | 'USD';
}
