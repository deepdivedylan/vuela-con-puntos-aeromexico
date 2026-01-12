export default interface EarnRatesByCategory {
    aeromexicoTickets?: number;
    airlineTickets?: number;
    foreignSpending?: number;
    restaurants?: number;
    hotels?: number;
    other?: number;
    [key: string]: number | undefined;
}
