import type Card from './interfaces/Card.ts';
import type CreditCardEfficiencyParams from './interfaces/CreditCardEfficiencyParams.ts';
import type CreditCardEfficiencyResult from './interfaces/CreditCardEfficiencyResult.ts';
import type SpendingByCategory from './interfaces/SpendingByCategory.ts';
export default (params: CreditCardEfficiencyParams) : CreditCardEfficiencyResult => {
    // Extract parameters
    const spendingByCategory = params.spending || {};
    const usdToMxnRate = params.usdToMxnRate || 18.43; // Default value if not provided
    const includeWelcomeOffers = params.includeWelcomeOffers || false;

    // Handle missing categories by providing defaults
    const spending: SpendingByCategory = {
        aeromexicoTickets: 0,
        airlineTickets: 0,
        foreignSpending: 0,
        restaurants: 0,
        hotels: 0,
        other: 0,
        ...spendingByCategory
    };

    // TypeScript fix: Explicitly type the accumulator in reduce function
    const totalSpendMXN: number = Object.values(spending).reduce(
        (sum: number, amount: number | undefined) => sum + (amount || 0),
        0
    );

    // Constants
    const BBVA_TO_AEROMEXICO = 1.6; // 1.6 BBVA points = 1 Aeroméxico point
    const INBURSA_TO_AEROMEXICO = 1; // 1 Inbursa point = 1 Aeroméxico point (can be adjusted for promotions)
    const IVA_TAX_RATE = 1.16; // 16% IVA tax

    // Card definitions
    const cards: Card[] = [
        {
            name: "BBVA Azúl",
            bank: "BBVA",
            earnRatePercent: 9, // 9% BBVA points per MXN
            annualFee: 748,
            feeCurrency: "MXN",
            directAeromexico: false,
            categoryBased: false
        },
        {
            name: "BBVA Oro",
            bank: "BBVA",
            earnRatePercent: 11,
            annualFee: 1151,
            feeCurrency: "MXN",
            directAeromexico: false,
            categoryBased: false
        },
        {
            name: "BBVA Platino",
            bank: "BBVA",
            earnRatePercent: 15,
            annualFee: 2579,
            feeCurrency: "MXN",
            directAeromexico: false,
            categoryBased: false
        },
        {
            name: "BBVA Negra",
            bank: "BBVA",
            earnRatePercent: 23,
            annualFee: 6247,
            feeCurrency: "MXN",
            directAeromexico: false,
            categoryBased: false
        },
        {
            name: "Santander Blanca",
            bank: "Santander",
            annualFee: 0,
            feeCurrency: "MXN",
            directAeromexico: true,
            categoryBased: true,
            earnRatesByCategory: {
                aeromexicoTickets: 1.6,
                other: 1
            },
            bonuses: [
                { threshold: 50000, points: 5000 }
            ],
            welcomeOffer: {
                points: 5000,
                spendingRequirement: 250,
                spendingRequirementCurrency: "USD"
            }
        },
        {
            name: "Santander Platino",
            bank: "Santander",
            annualFee: 4000,
            feeCurrency: "MXN",
            directAeromexico: true,
            categoryBased: true,
            earnRatesByCategory: {
                aeromexicoTickets: 2,
                other: 1.6
            },
            bonuses: [
                { threshold: 150000, points: 16000 }
            ],
            welcomeOffer: {
                points: 16000,
                spendingRequirement: 500,
                spendingRequirementCurrency: "USD"
            }
        },
        {
            name: "Santander Negra",
            bank: "Santander",
            annualFee: 6000,
            feeCurrency: "MXN",
            directAeromexico: true,
            categoryBased: true,
            earnRatesByCategory: {
                aeromexicoTickets: 3,
                other: 2
            },
            bonuses: [
                { threshold: 300000, points: 24000 },
                { threshold: 700000, points: 24000 }
            ],
            welcomeOffer: {
                points: 32000,
                spendingRequirement: 1000,
                spendingRequirementCurrency: "USD"
            }
        },
        {
            name: "Inbursa Black",
            bank: "Inbursa",
            annualFee: 2500,
            feeCurrency: "MXN",
            directAeromexico: false,
            categoryBased: true,
            earnRatesByCategory: {
                aeromexicoTickets: 3,
                airlineTickets: 3,
                foreignSpending: 3,
                restaurants: 2,
                hotels: 2,
                other: 1
            }
        },
        {
            name: "Inbursa Clásica",
            bank: "Inbursa",
            annualFee: 390,
            feeCurrency: "MXN",
            directAeromexico: false,
            categoryBased: true,
            earnRatesByCategory: {
                aeromexicoTickets: 1,
                airlineTickets: 1,
                foreignSpending: 1,
                restaurants: 1,
                hotels: 1,
                other: 1
            }
        },
        {
            name: "Inbursa Oro",
            bank: "Inbursa",
            annualFee: 540,
            feeCurrency: "MXN",
            directAeromexico: false,
            categoryBased: true,
            earnRatesByCategory: {
                aeromexicoTickets: 1,
                airlineTickets: 1,
                foreignSpending: 1,
                restaurants: 1,
                hotels: 1,
                other: 1
            }
        },
        {
            name: "Inbursa Platino",
            bank: "Inbursa",
            annualFee: 1320,
            feeCurrency: "MXN",
            directAeromexico: false,
            categoryBased: true,
            earnRatesByCategory: {
                aeromexicoTickets: 1,
                airlineTickets: 1,
                foreignSpending: 1,
                restaurants: 1,
                hotels: 1,
                other: 1
            }
        },
        {
            name: "American Express Aeroméxico Azúl",
            bank: "American Express",
            annualFee: 160,
            feeCurrency: "USD",
            directAeromexico: true,
            categoryBased: true,
            earnRatesByCategory: {
                aeromexicoTickets: 2.4,
                other: 1.6
            },
            welcomeOffer: {
                cashback: 1500,
                cashbackCurrency: "MXN",
                points: 9600,
                spendingRequirement: 80000,
                spendingRequirementCurrency: "MXN"
            }
        },
        {
            name: "American Express Aeroméxico Oro",
            bank: "American Express",
            annualFee: 540,
            feeCurrency: "USD",
            directAeromexico: true,
            categoryBased: true,
            earnRatesByCategory: {
                aeromexicoTickets: 3.2,
                foreignSpending: 1.84,
                other: 1.6
            },
            welcomeOffer: {
                cashback: 4000,
                cashbackCurrency: "MXN",
                points: 16000,
                spendingRequirement: 150000,
                spendingRequirementCurrency: "MXN"
            }
        },
        {
            name: "American Express Aeroméxico Platino",
            bank: "American Express",
            annualFee: 1300,
            feeCurrency: "USD",
            directAeromexico: true,
            categoryBased: true,
            earnRatesByCategory: {
                aeromexicoTickets: 4.8,
                foreignSpending: 2.08,
                other: 1.6
            },
            welcomeOffer: {
                cashback: 30000,
                cashbackCurrency: "MXN",
                points: 32000,
                spendingRequirement: 400000,
                spendingRequirementCurrency: "MXN"
            }
        }
    ];

    // Calculate results for each card
    const results = cards.map(card => {
        let totalPoints = 0;

        // Convert annual fee to MXN if it's in USD
        let annualFeeMXN = card.annualFee;
        if (card.feeCurrency === "USD") {
            annualFeeMXN = card.annualFee * usdToMxnRate;
        }

        // Apply IVA tax (16%) to all annual fees
        annualFeeMXN = annualFeeMXN * IVA_TAX_RATE;

        // Apply welcome offer cashback if applicable
        let effectiveAnnualFeeMXN = annualFeeMXN;
        let welcomeOfferPoints = 0;
        let welcomeOfferCashback = 0;

        if (includeWelcomeOffers && card.welcomeOffer) {
            // Check if spending requirement is met for welcome offer
            let qualifiesForWelcomeOffer = false;

            if (card.welcomeOffer.spendingRequirementCurrency === "MXN") {
                // totalSpendMXN is now definitely a number
                qualifiesForWelcomeOffer = totalSpendMXN >= card.welcomeOffer.spendingRequirement;
            } else if (card.welcomeOffer.spendingRequirementCurrency === "USD") {
                // Convert USD requirement to MXN
                const requiredSpendMXN = card.welcomeOffer.spendingRequirement * usdToMxnRate;
                qualifiesForWelcomeOffer = totalSpendMXN >= requiredSpendMXN;
            }

            if (qualifiesForWelcomeOffer) {
                // Add welcome offer points
                welcomeOfferPoints = card.welcomeOffer.points;

                // Apply cashback to reduce effective annual fee if applicable
                if (card.welcomeOffer.cashback) {
                    welcomeOfferCashback = card.welcomeOffer.cashback;

                    // Convert cashback to MXN if needed
                    if (card.welcomeOffer.cashbackCurrency === "USD") {
                        welcomeOfferCashback *= usdToMxnRate;
                    }

                    // Reduce effective annual fee (can't go below zero)
                    effectiveAnnualFeeMXN = Math.max(0, annualFeeMXN - welcomeOfferCashback);
                }
            }
        }

        let totalCost = totalSpendMXN + effectiveAnnualFeeMXN;

        // Calculate regular points
        if (card.bank === "BBVA") {
            const earnRate = card.earnRatePercent || 0;
            const bbvaPoints = totalSpendMXN * (earnRate / 100);
            totalPoints = bbvaPoints / BBVA_TO_AEROMEXICO;
        } else if (card.categoryBased) {
            let cardPoints = 0;

            // Process each spending category
            Object.keys(spending).forEach(category => {
                // Get category spending in USD
                const categorySpendMXN = spending[category] || 0;
                const categorySpendUSD = categorySpendMXN / usdToMxnRate;

                // Get the earn rate for this category
                let earnRate = 0;

                const ratesByCategory = card.earnRatesByCategory;
                if (ratesByCategory) {
                    if (category in ratesByCategory) {
                        // If card has a specific rate for this category
                        earnRate = ratesByCategory[category] || 0;
                    } else if ('other' in ratesByCategory) {
                        // If category not specified in card, use the "other" rate
                        earnRate = ratesByCategory.other || 0;
                    }
                }

                // Add points for this category
                cardPoints += categorySpendUSD * earnRate;
            });

            // Add bonuses if applicable
            if (card.bonuses) {
                card.bonuses.forEach(bonus => {
                    if (totalSpendMXN >= bonus.threshold) {
                        cardPoints += bonus.points;
                    }
                });
            }

            // Convert card points to Aeroméxico points if necessary
            if (card.bank === "Inbursa") {
                totalPoints = cardPoints / INBURSA_TO_AEROMEXICO;
            } else {
                totalPoints = cardPoints; // For Santander and AmEx, points are already Aeroméxico points
            }
        }

        // Add welcome offer points to total
        totalPoints += welcomeOfferPoints;

        const costPerPoint = totalPoints > 0 ? totalCost / totalPoints : Infinity;

        return {
            name: card.name,
            bank: card.bank,
            annualFee: card.annualFee,
            feeCurrency: card.feeCurrency,
            annualFeeMXN: Math.round(annualFeeMXN), // Now includes IVA
            effectiveAnnualFeeMXN: Math.round(effectiveAnnualFeeMXN),
            welcomeOfferPoints: welcomeOfferPoints,
            welcomeOfferCashback: welcomeOfferCashback,
            totalAeromexicoPoints: Math.round(totalPoints),
            costPerPoint: costPerPoint === Infinity ? "Infinity" : costPerPoint.toFixed(2),
            totalCost: totalCost
        };
    });

    // Sort results by cost per point
    results.sort((a, b) => {
        const aCost = a.costPerPoint === "Infinity" ? Infinity : parseFloat(a.costPerPoint);
        const bCost = b.costPerPoint === "Infinity" ? Infinity : parseFloat(b.costPerPoint);
        return aCost - bCost;
    });

    // Add ranking
    const rankedResults = results.map((card, index) => {
        return {
            ...card,
            rank: index + 1
        };
    });

    const bestOption = rankedResults.length > 0 ? rankedResults[0]?.name || "No name" : "No cards found";

    return {
        totalSpend: totalSpendMXN,
        spendingByCategory: spending,
        usdToMxnRate: usdToMxnRate,
        ivaTaxRate: IVA_TAX_RATE,
        conversionRates: {
            BBVA_TO_AEROMEXICO: BBVA_TO_AEROMEXICO,
            INBURSA_TO_AEROMEXICO: INBURSA_TO_AEROMEXICO
        },
        includeWelcomeOffers: includeWelcomeOffers,
        exchangeRate: {
            USD_TO_MXN: usdToMxnRate,
            BBVA_TO_AEROMEXICO: BBVA_TO_AEROMEXICO
        },
        cards: rankedResults,
        bestOption: bestOption
    };
};
