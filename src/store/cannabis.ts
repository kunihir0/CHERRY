// store/cannabis.ts
import { defineStore } from "pinia";
import { computed, ref, watchEffect } from "vue";

export const useCannabisStore = defineStore("cannabis", () => {
  const price = ref(0);
  const paid = ref(0);
  const difference = computed(() => price.value - paid.value);

  type Unit =
    | "0.1gram"
    | "0.2gram"
    | "0.3gram"
    | "0.4gram"
    | "0.5gram"
    | "0.6gram"
    | "0.7gram"
    | "0.8gram"
    | "0.9gram"
    | "gram"
    | "eighth"
    | "quarter"
    | "half"
    | "ounce"
    | "pound";

  const unit = ref<Unit>("gram");
  const weight = ref(0);

  const units: Record<Unit, number> = {
    "0.1gram": 0.1,
    "0.2gram": 0.2,
    "0.3gram": 0.3,
    "0.4gram": 0.4,
    "0.5gram": 0.5,
    "0.6gram": 0.6,
    "0.7gram": 0.7,
    "0.8gram": 0.8,
    "0.9gram": 0.9,
    "gram": 1,
    "eighth": 3.5,
    "quarter": 7,
    "half": 14,
    "ounce": 28,
    "pound": 448,
  };

  watchEffect(() => {
    if (unit.value && units[unit.value]) {
      weight.value = units[unit.value];
    }
  });

  const profitPerUnit = computed(() => {
    if (unit.value && units[unit.value] && weight.value !== 0) {
      const profitPerSelectedUnit = difference.value / weight.value;
      return Object.fromEntries(
        Object.entries(units).map(([unit, unitWeight]) => [
          unit,
          profitPerSelectedUnit * unitWeight,
        ]),
      );
    }
    return {};
  });

  const pricePerUnit = computed(() => {
    if (unit.value && units[unit.value] && weight.value !== 0) {
      const pricePerSelectedUnit = price.value / weight.value;
      return Object.fromEntries(
        Object.entries(units).map(([unit, unitWeight]) => [unit, pricePerSelectedUnit * unitWeight]),
      );
    }
    return {};
  });

  return {
    price, paid, difference, unit, weight, units, profitPerUnit, pricePerUnit,
  };
});
