<template>
  <form @submit.prevent>
      <div class="grid grid-cols-1 gap-6">
        <fieldset class="border p-4 rounded-md">
          <legend class="text-lg font-semibold px-2">{{ $t('creditcardcalculator.spending_title') }}</legend>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <!-- Spending Categories -->
            <div>
              <label for="aeromexicoTickets" class="block text-sm font-medium text-gray-700">{{ $t('creditcardcalculator.aeromexicoTickets') }}</label>
              <input type="number" id="aeromexicoTickets" v-model.number="params.spending.aeromexicoTickets" @keyup="calculate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>
            <div>
              <label for="airlineTickets" class="block text-sm font-medium text-gray-700">{{ $t('creditcardcalculator.airlineTickets') }}</label>
              <input type="number" id="airlineTickets" v-model.number="params.spending.airlineTickets" @keyup="calculate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>
            <div>
              <label for="foreignSpending" class="block text-sm font-medium text-gray-700">{{ $t('creditcardcalculator.foreignSpending') }}</label>
              <input type="number" id="foreignSpending" v-model.number="params.spending.foreignSpending" @keyup="calculate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>
            <div>
              <label for="restaurants" class="block text-sm font-medium text-gray-700">{{ $t('creditcardcalculator.restaurants') }}</label>
              <input type="number" id="restaurants" v-model.number="params.spending.restaurants" @keyup="calculate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>
            <div>
              <label for="hotels" class="block text-sm font-medium text-gray-700">{{ $t('creditcardcalculator.hotels') }}</label>
              <input type="number" id="hotels" v-model.number="params.spending.hotels" @keyup="calculate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>
            <div>
              <label for="other" class="block text-sm font-medium text-gray-700">{{ $t('creditcardcalculator.other') }}</label>
              <input type="number" id="other" v-model.number="params.spending.other" @keyup="calculate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>
          </div>
          <div class="mt-4 pt-4 border-t text-right">
            <span class="font-medium text-gray-700">{{ $t('creditcardcalculator.total_spending') }}: </span>
            <span class="text-lg font-bold text-gray-900">{{ totalSpending.toLocaleString() }} MXN</span>
          </div>
        </fieldset>

        <fieldset class="border p-4 rounded-md">
          <legend class="text-lg font-semibold px-2">{{ $t('creditcardcalculator.options_title') }}</legend>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <!-- Other Options -->
            <div>
              <label for="usdToMxnRate" class="block text-sm font-medium text-gray-700">{{ $t('creditcardcalculator.usdToMxnRate') }}</label>
              <input type="number" step="0.01" id="usdToMxnRate" v-model.number="params.usdToMxnRate" @keyup="calculate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              <p class="mt-1 text-xs text-gray-500" v-if="exchangeRateTimeInfo.timeUnitKey && exchangeRateTimeInfo.timeElapsed >= 0">{{ $t('creditcardcalculator.exchange_rate_info', { apiRate: apiRate, timeElapsed: exchangeRateTimeInfo.timeElapsed, timeUnit: $t(exchangeRateTimeInfo.timeUnitKey, exchangeRateTimeInfo.timeElapsed) }) }}</p>
            </div>
            <div class="flex items-center pt-5">
              <input type="checkbox" id="includeWelcomeOffers" v-model="params.includeWelcomeOffers" @change="calculate" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
              <label for="includeWelcomeOffers" class="ml-2 block text-sm text-gray-900">{{ $t('creditcardcalculator.includeWelcomeOffers') }}</label>
            </div>
          </div>
        </fieldset>
        
      </div>
    </form>

    <div v-if="totalSpending > 0 && results" class="mt-10">
      <h2 class="text-xl font-bold mb-4">{{ $t('creditcardcalculator.results_title') }}</h2>
      <div class="overflow-x-auto shadow-md sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('creditcardcalculator.table_rank') }}</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('creditcardcalculator.table_card') }}</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('creditcardcalculator.table_bank') }}</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('creditcardcalculator.table_points') }}</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('creditcardcalculator.table_cost_per_point') }}</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('creditcardcalculator.table_effective_annual_fee') }}</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="card in results.cards" :key="card.name" class="hover:bg-gray-100">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ card.rank }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ card.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ card.bank }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{{ card.totalAeromexicoPoints.toLocaleString() }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{{ card.costPerPoint }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{{ card.effectiveAnnualFeeMXN.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else class="mt-10 text-center">
      <h2 class="text-2xl font-semibold text-gray-600">{{ $t('creditcardcalculator.start_journey_prompt') }}</h2>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import calculateCreditCardEfficiency from '../calculateCreditCardEfficiency.ts';
import type CreditCardEfficiencyResult from '../interfaces/CreditCardEfficiencyResult.ts';

const apiRate = ref(17.01);
const apiTimestamp = ref(new Date(2063, 3, 5).getTime() / 1000);

const params = ref({
  spending: {
    aeromexicoTickets: 0,
    airlineTickets: 0,
    foreignSpending: 0,
    restaurants: 0,
    hotels: 0,
    other: 0,
  },
  usdToMxnRate: 17.01,
  includeWelcomeOffers: false,
});

const totalSpending = computed(() => {
  return Object.values(params.value.spending).reduce((sum, value) => sum + (Number(value) || 0), 0);
});

const exchangeRateTimeInfo = computed(() => {
  if (!apiTimestamp.value) {
    return { timeElapsed: 0, timeUnitKey: '' };
  }
  const now = Date.now();
  const lastUpdate = apiTimestamp.value * 1000;
  const diffHours = Math.round((now - lastUpdate) / (1000 * 60 * 60));

  if (diffHours < 24) {
    return {
      timeElapsed: diffHours,
      timeUnitKey: 'creditcardcalculator.time_unit_hours'
    };
  } else {
    return {
      timeElapsed: Math.round(diffHours / 24),
      timeUnitKey: 'creditcardcalculator.time_unit_days'
    };
  }
});

onMounted(async () => {
  try {
    const response = await fetch('/exchange_rates/');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    apiRate.value = data.rate;
    // The timestamp is a Unix timestamp (seconds).
    apiTimestamp.value = data.timestamp;
    params.value.usdToMxnRate = data.rate;
  } catch (error) {
    console.error('Failed to fetch exchange rate:', error);
    // Fallback to default values if API fails
  }
});

const results = ref<CreditCardEfficiencyResult | null>(null);

function calculate() {
  results.value = calculateCreditCardEfficiency(params.value);
}
</script>
