<template>
  <HelloWorld />
</template>
<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import calculateCreditCardEfficiency from './calculateCreditCardEfficiency.ts';
const result = calculateCreditCardEfficiency({
  spending: {
    aeromexicoTickets: 50000,
    airlineTickets: 25000,
    foreignSpending: 50000,
    restaurants: 100000,
    hotels: 50000,
    other: 250000
  },
  usdToMxnRate: 18.03,
  includeWelcomeOffers: true
});
console.log(JSON.stringify(result, null, 2));
</script>
