<script setup lang="ts">
import appstore from "../../store";

const cannabisStore = appstore.useCannabisStore;

const { price, paid, difference, unit, units, pricePerUnit, profitPerUnit } = toRefs(cannabisStore);
</script>

<template>
  <div class="max-w-screen-md mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">
      Cannabis Calculator
    </h1>
    <div class="card">
      <h2 class="">
        Cannabis
      </h2>
      <label for="price" class="">Amount sell price:</label>
      <input id="price" v-model.number="price" type="number" class="">
      <hr class="my-2">
      <label for="unit" class="">Unit:</label>
      <select
        id="unit"
        v-model="unit"
        class=""
      >
        <option value="">
          Select a unit
        </option>
        <option
          v-for="(weight, unit) in units"
          :key="unit"
          :value="unit"
        >
          {{ unit }} ({{ weight }}g)
        </option>
      </select>
      <hr class="my-2">
      <h3 class="">
        Price per unit:
      </h3>

      <div v-if="Object.keys(pricePerUnit).length > 0">
        <button
          v-for="(price, unit) in pricePerUnit" :key="unit" class="

          "
        >
          {{ unit }} ({{ units[unit] }}g)
          <span
            class="
              underline bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded
              dark:bg-green-900 dark:text-green-300
            "
          >
            $ {{ price }}
          </span>
        </button>
      </div>

      <div v-else>
        Please enter a price and select a weight unit to see the price per unit results.
      </div>
    </div>
    <div class="card">
      <h2 class="text-yellow-500">
        Profit Margin Calculator
      </h2>
      <label for="paid" class="text-orange-500">
        Amount Paid for {{ unit }} ({{ units[unit] }}g):
      </label>
      <input
        id="paid"
        v-model.number="paid"
        type="number"
        class="input input-bordered"
      >
      <div v-if="difference !== 0">
        <h4 class="text-yellow-500">
          Profit per Unit:
        </h4>
        <table class="table">
          <tbody>
            <tr v-for="(profit, unit) in profitPerUnit" :key="unit">
              <td class="px-4 py-2 text-cyan-500">
                {{ unit }}
              </td>
              <td class="px-4 py-2 text-emerald-500">
                {{ units[unit] }}
              </td>
              <td
                class="px-4 py-2 text-emerald-500" :class="[
                  profit >= 0 ? 'text-green' : 'text-red',
                ]
                "
                :style="{ color: profit >= 0 ? 'green' : 'red' }"
              >
                ${{ profit.toFixed(2) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style></style>
