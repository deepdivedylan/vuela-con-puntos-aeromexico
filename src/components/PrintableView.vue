<template>
  <div class="hidden print:block print:w-full print:bg-white text-gray-900">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-center mb-2">{{ $t('creditcardcalculator.results_title') }}</h1>
      <div class="text-sm border-b pb-4 mb-4 grid grid-cols-2 gap-4">
        <div>
          <p><strong>{{ $t('creditcardcalculator.total_spending') }}:</strong> {{ totalSpending.toLocaleString() }} MXN</p>
          <p><strong>{{ $t('creditcardcalculator.usdToMxnRate') }}:</strong> {{ params.usdToMxnRate }}</p>
        </div>
        <div class="text-right">
          <p><strong>{{ $t('creditcardcalculator.includeWelcomeOffers') }}</strong> {{ params.includeWelcomeOffers ? '✓' : '✕' }}</p>
          <p><strong>{{ $t('creditcardcalculator.includeInactiveCards') }}</strong> {{ params.includeInactiveCards ? '✓' : '✕' }}</p>
        </div>
      </div>
    </div>

    <table class="w-full text-left border-collapse text-xs">
      <thead>
        <tr class="border-b border-gray-400">
          <th class="py-1 px-1 font-semibold uppercase tracking-wider">{{ $t('creditcardcalculator.table_rank') }}</th>
          <th class="py-1 px-1 font-semibold uppercase tracking-wider">{{ $t('creditcardcalculator.table_card') }}</th>
          <th class="py-1 px-1 font-semibold uppercase tracking-wider">{{ $t('creditcardcalculator.table_bank') }}</th>
          <th class="py-1 px-1 font-semibold uppercase tracking-wider text-right">{{ $t('creditcardcalculator.table_points') }}</th>
          <th class="py-1 px-1 font-semibold uppercase tracking-wider text-right">{{ $t('creditcardcalculator.table_cost_per_point') }}</th>
          <th class="py-1 px-1 font-semibold uppercase tracking-wider text-right">{{ $t('creditcardcalculator.table_effective_annual_fee') }}</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="card in results.cards" :key="card.name" :class="[!card.active ? 'text-gray-500 italic' : '']">
          <td class="py-1 px-1">{{ card.rank }}</td>
          <td class="py-1 px-1 break-words max-w-[150px]">{{ card.name }}</td>
          <td class="py-1 px-1">
            <div class="flex items-center gap-1">
              <img :src="card.logo" :alt="card.bank" class="h-3 w-auto grayscale" />
              <span>{{ card.bank }}</span>
            </div>
          </td>
          <td class="py-1 px-1 text-right">{{ card.totalAeromexicoPoints.toLocaleString() }}</td>
          <td class="py-1 px-1 text-right">{{ card.costPerPoint }}</td>
          <td class="py-1 px-1 text-right">{{ card.effectiveAnnualFeeMXN.toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type CreditCardEfficiencyResult from '../interfaces/CreditCardEfficiencyResult.ts';

const props = defineProps<{
  results: CreditCardEfficiencyResult;
  params: any;
  totalSpending: number;
}>();
</script>
