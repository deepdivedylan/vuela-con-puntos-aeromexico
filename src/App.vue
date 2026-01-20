<template>
  <div class="p-8 max-w-5xl mx-auto">
    <div class="flex justify-end mb-4">
      <LocaleSelect />
    </div>
    <Introduction />
    <CreditCardCalculator />
    <Footer />
  </div>
</template>
<script setup lang="ts">
import CreditCardCalculator from './components/CreditCardCalculator.vue';
import Introduction from './components/Introduction.vue';
import LocaleSelect from './components/LocaleSelect.vue';
import Footer from './components/Footer.vue';
</script>
