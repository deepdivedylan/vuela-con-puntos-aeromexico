<template>
  <div class="mb-6">
    <h1 class="text-3xl font-bold mb-4 flex items-center text-aeromexico">
      <img src="/images/aeromexico.svg" alt="Aeromexico Logo" class="h-8 mr-4" />
      <span>{{ $t('creditcardcalculator.title') }}</span>
    </h1>
    
    <h2 @click="toggleExplanation" class="text-lg font-semibold cursor-pointer text-aeromexico inline-flex items-center">
      <span class="mr-2 w-4 text-center" v-html="isExpanded ? '&#x25BC;' : '&#x25B6;&#xFE0E;'"></span>
      {{ $t('introduction.what_is_this') }}
    </h2>
    
    <p v-if="isExpanded" class="text-gray-700 mt-2 ml-6 border-l-2 pl-4">
      {{ $t('introduction.explanation') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isExpanded = ref(false);

const toggleExplanation = () => {
  isExpanded.value = !isExpanded.value;
};
</script>
