<template>
  <form @submit.prevent class="print:hidden">
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
            <div class="flex items-center pt-5">
              <input type="checkbox" id="includeInactiveCards" v-model="params.includeInactiveCards" @change="calculate" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
              <label for="includeInactiveCards" class="ml-2 block text-sm text-gray-900">{{ $t('creditcardcalculator.includeInactiveCards') }}</label>
            </div>
          </div>
        </fieldset>
        
      </div>
    </form>

    <div v-if="totalSpending > 0 && results" class="mt-10 print:hidden">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold">{{ $t('creditcardcalculator.results_title') }}</h2>
        <div class="relative flex items-center gap-2">
          <button @click="shareResults" class="p-2 text-2xl hover:scale-110 transition-transform focus:outline-none" :title="$t('creditcardcalculator.share_results')">
            🔗
            <span class="sr-only">{{ $t('creditcardcalculator.share_results') }}</span>
          </button>
          <div v-if="showCopiedMessage" class="absolute top-full left-0 mt-1 w-max bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 animate-fade-in-out">
            {{ $t('creditcardcalculator.link_copied') }}
          </div>
          <button @click="printResults" class="p-2 text-2xl hover:scale-110 transition-transform focus:outline-none" :title="$t('creditcardcalculator.print_results')">
            🖨️
            <span class="sr-only">{{ $t('creditcardcalculator.print_results') }}</span>
          </button>
        </div>
      </div>
      <div class="overflow-x-auto shadow-md sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">{{ $t('creditcardcalculator.table_rank') }}</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">{{ $t('creditcardcalculator.table_card') }}</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">{{ $t('creditcardcalculator.table_bank') }}</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">{{ $t('creditcardcalculator.table_points') }}</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">{{ $t('creditcardcalculator.table_cost_per_point') }}</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">{{ $t('creditcardcalculator.table_effective_annual_fee') }}</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="card in results.cards" :key="card.name" :class="[!card.active ? 'bg-gray-200 italic hover:bg-gray-300' : 'hover:bg-gray-100']">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ card.rank }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ card.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div class="flex items-center gap-2">
                  <img :src="card.logo" :alt="card.bank" class="h-[1em] w-auto" />
                  <span>{{ card.bank }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{{ card.totalAeromexicoPoints.toLocaleString() }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{{ card.costPerPoint }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{{ card.effectiveAnnualFeeMXN.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-if="flightSuggestion" class="mt-6 text-center text-lg text-gray-700 italic">
        <template v-if="flightSuggestion.premierDestination">
          {{ $t('creditcardcalculator.flight_suggestion_both', { bestCard: flightSuggestion.bestCardName, turistaDestination: $i18n.locale === 'es' ? flightSuggestion.turistaDestination.es : flightSuggestion.turistaDestination.en, premierDestination: $i18n.locale === 'es' ? flightSuggestion.premierDestination.es : flightSuggestion.premierDestination.en }) }}
        </template>
        <template v-else>
          {{ $t('creditcardcalculator.flight_suggestion_economy_only', { bestCard: flightSuggestion.bestCardName, turistaDestination: $i18n.locale === 'es' ? flightSuggestion.turistaDestination.es : flightSuggestion.turistaDestination.en }) }}
        </template>
      </p>
    </div>
    <div v-else class="mt-10 text-center print:hidden">
      <h2 class="text-2xl font-semibold text-gray-600">{{ $t('creditcardcalculator.start_journey_prompt') }}</h2>
    </div>
    <PrintableView v-if="totalSpending > 0 && results" :results="results" :params="params" :totalSpending="totalSpending" />
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted, watch } from 'vue';
import calculateCreditCardEfficiency from '../calculateCreditCardEfficiency.ts';
import type CreditCardEfficiencyResult from '../interfaces/CreditCardEfficiencyResult.ts';
import PrintableView from './PrintableView.vue';
import { Destino } from '../interfaces/Destino.ts';
import { redemptionsData } from '../data/redemptions.ts';
import { useUrlSearchParams } from '@vueuse/core';

const apiRate = ref(17.01);
const apiTimestamp = ref(new Date(2063, 3, 5).getTime() / 1000);

const urlParams = useUrlSearchParams('history', { removeNullishValues: true });
const showCopiedMessage = ref(false);

const sanitizeInput = (val: any) => {
  const num = Number(val);
  return (isNaN(num) || num < 0) ? 0 : num;
};

const params = ref({
  spending: {
    aeromexicoTickets: sanitizeInput(urlParams.aeromexicoTickets),
    airlineTickets: sanitizeInput(urlParams.airlineTickets),
    foreignSpending: sanitizeInput(urlParams.foreignSpending),
    restaurants: sanitizeInput(urlParams.restaurants),
    hotels: sanitizeInput(urlParams.hotels),
    other: sanitizeInput(urlParams.other),
  },
  usdToMxnRate: Number(urlParams.usdToMxnRate) || 17.01,
  includeWelcomeOffers: urlParams.includeWelcomeOffers === 'true',
  includeInactiveCards: urlParams.includeInactiveCards === 'true',
});

watch(params, (val) => {
  if (val.spending.aeromexicoTickets) urlParams.aeromexicoTickets = String(val.spending.aeromexicoTickets); else delete urlParams.aeromexicoTickets;
  if (val.spending.airlineTickets) urlParams.airlineTickets = String(val.spending.airlineTickets); else delete urlParams.airlineTickets;
  if (val.spending.foreignSpending) urlParams.foreignSpending = String(val.spending.foreignSpending); else delete urlParams.foreignSpending;
  if (val.spending.restaurants) urlParams.restaurants = String(val.spending.restaurants); else delete urlParams.restaurants;
  if (val.spending.hotels) urlParams.hotels = String(val.spending.hotels); else delete urlParams.hotels;
  if (val.spending.other) urlParams.other = String(val.spending.other); else delete urlParams.other;
  if (val.usdToMxnRate !== apiRate.value) urlParams.usdToMxnRate = String(val.usdToMxnRate); else delete urlParams.usdToMxnRate;
  if (val.includeWelcomeOffers) urlParams.includeWelcomeOffers = 'true'; else delete urlParams.includeWelcomeOffers;
  if (val.includeInactiveCards) urlParams.includeInactiveCards = 'true'; else delete urlParams.includeInactiveCards;
}, { deep: true });

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
    if (!urlParams.usdToMxnRate) {
      params.value.usdToMxnRate = data.rate;
    }
  } catch (error) {
    console.error('Failed to fetch exchange rate:', error);
    // Fallback to default values if API fails
  }

  if (totalSpending.value > 0) {
    calculate();
  }

  const handlePrintShortcut = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
      e.preventDefault();
      printResults();
    }
  };

  window.addEventListener('keydown', handlePrintShortcut);

  onUnmounted(() => {
    window.removeEventListener('keydown', handlePrintShortcut);
  });
});

const printResults = () => {
  window.print();
};

const shareResults = async () => {
  const url = new URL(window.location.href);
  url.searchParams.delete('usdToMxnRate');
  try {
    await navigator.clipboard.writeText(url.href);
    showCopiedMessage.value = true;
    setTimeout(() => {
      showCopiedMessage.value = false;
    }, 5000);
  } catch (err) {
    console.error('Failed to copy link: ', err);
  }
};

const results = ref<CreditCardEfficiencyResult | null>(null);

function calculate() {
  results.value = calculateCreditCardEfficiency(params.value);
}

const priorityDestinations = [
  Destino.MEXICO,
  Destino.NORTEAMERICA_1,
  Destino.NORTEAMERICA_2,
  Destino.AMERICA_CENTRAL_Y_EL_CARIBE,
  Destino.SUDAMERICA_NORTE,
  Destino.SUDAMERICA_SUR,
  Destino.NORESTE_DE_ASIA,
  Destino.EUROPA
];

const flightSuggestion = computed(() => {
  if (!results.value || !results.value.cards || results.value.cards.length === 0) return null;
  
  const bestCard = results.value.cards[0];
  if (!bestCard) return null;
  
  const points = bestCard.totalAeromexicoPoints;
  
  let maxTurista = null;
  let maxPremier = null;

  for (let i = priorityDestinations.length - 1; i >= 0; i--) {
    const dest = priorityDestinations[i];
    const data = redemptionsData.find(r => r.destinoEnum === dest);
    if (!data) continue;

    if (!maxTurista && points >= data.cabina_turista.temporada_baja) {
      maxTurista = data.destino;
    }
    if (!maxPremier && points >= data.cabina_premier.temporada_baja) {
      maxPremier = data.destino;
    }
    
    if (maxTurista && maxPremier) break;
  }

  if (!maxTurista) return null;

  return {
    bestCardName: bestCard.name,
    turistaDestination: maxTurista,
    premierDestination: maxPremier
  };
});
</script>
