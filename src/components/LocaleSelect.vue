<template>
  <div class="cursor-pointer flex items-center p-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100" @click="selectLocale">
    <div class="pr-2">
      <img class="h-6" :src="'/images/flag-' + otherLocale + '.svg'" :alt="$t('nav.alt')" />
    </div>
    <div class="text-sm font-medium">
      {{ $t('nav.' + otherLocale) }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { type Ref, ref } from 'vue';
import { useStorage } from '@vueuse/core';

const { availableLocales, locale } = useI18n({ useScope: 'global' });
const getOtherLocale = (): string => {
  const result = availableLocales.find(language => language !== locale.value);
  return result ? result : '';
};
const setLocaleToHtmlTag = () => {
  const htmlTag = document.getElementsByTagName('html')[0];
  if (htmlTag) {
    htmlTag.lang = locale.value;
  }
};
setLocaleToHtmlTag();

const otherLocale: Ref<string> = ref(getOtherLocale());
const localPreference = useStorage('vueuse-i18n-locale', locale.value);

const selectLocale = () => {
  locale.value = otherLocale.value;
  localPreference.value = locale.value;
  otherLocale.value = getOtherLocale();
  setLocaleToHtmlTag();
};
</script>
