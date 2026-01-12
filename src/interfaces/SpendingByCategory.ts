export default interface SpendingByCategory {
    aeromexicoTickets?: number;
    airlineTickets?: number;
    foreignSpending?: number;
    restaurants?: number;
    hotels?: number;
    other?: number;
    [key: string]: number | undefined;
}
