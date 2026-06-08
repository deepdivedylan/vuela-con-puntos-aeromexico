<template>
  <div class="mb-6">
    <h2 @click="toggleTable" class="text-lg font-semibold cursor-pointer text-aeromexico inline-flex items-center">
      <span class="mr-2 w-4 text-center" v-html="isExpanded ? '&#x25BC;' : '&#x25B6;&#xFE0E;'"></span>
      {{ $i18n.locale === 'es' ? 'Tabla de Redenciones' : 'Redemptions Table' }}
    </h2>
    
    <div v-if="isExpanded" class="mt-4 overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
        <thead class="bg-gray-50">
          <tr>
            <th class="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">
              {{ $i18n.locale === 'es' ? 'Destino' : 'Destination' }}
            </th>
            <th class="py-2 px-4 border-b text-right text-sm font-semibold text-gray-700">
              {{ $i18n.locale === 'es' ? 'Turista (Baja)' : 'Economy (Low)' }}
            </th>
            <th class="py-2 px-4 border-b text-right text-sm font-semibold text-gray-700">
              {{ $i18n.locale === 'es' ? 'Turista (Alta)' : 'Economy (High)' }}
            </th>
            <th class="py-2 px-4 border-b text-right text-sm font-semibold text-gray-700">
              {{ $i18n.locale === 'es' ? 'Premier (Baja)' : 'Premier (Low)' }}
            </th>
            <th class="py-2 px-4 border-b text-right text-sm font-semibold text-gray-700">
              {{ $i18n.locale === 'es' ? 'Premier (Alta)' : 'Premier (High)' }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in redemptionsData" :key="index" class="hover:bg-gray-50">
            <td class="py-2 px-4 border-b text-sm text-gray-700">{{ $i18n.locale === 'es' ? row.destino.es : row.destino.en }}</td>
            <td class="py-2 px-4 border-b text-sm text-gray-700 text-right">{{ row.cabina_turista.temporada_baja.toLocaleString() }}</td>
            <td class="py-2 px-4 border-b text-sm text-gray-700 text-right">{{ row.cabina_turista.temporada_alta.toLocaleString() }}</td>
            <td class="py-2 px-4 border-b text-sm text-gray-700 text-right">{{ row.cabina_premier.temporada_baja.toLocaleString() }}</td>
            <td class="py-2 px-4 border-b text-sm text-gray-700 text-right">{{ row.cabina_premier.temporada_alta.toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
      <p class="px-4 py-4 text-sm text-gray-700">{{ $i18n.locale === 'es' ? 'Fuente' : 'Source' }}: <a href="https://www.aeromexico.com/es-mx/aeromexico-rewards/boleto-rewards">Aeroméxico Rewards</a></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { redemptionsData } from '../data/redemptions';

const isExpanded = ref(false);

const toggleTable = () => {
  isExpanded.value = !isExpanded.value;
};
</script>
