<script setup lang="ts">
import { computed, ref } from "vue";

const totalPrice = ref(0);
const downPaymentPercentage = ref(0);
const annualInterestRate = ref(0);
const paymentsPerYear = ref(0);
const numberOfYears = ref(0);
const roundResults = ref(false);

const downPayment = computed(() => {
  const value = totalPrice.value * downPaymentPercentage.value / 100;
  return roundResults.value ? Math.round(value) : Number.parseFloat(value.toFixed(2));
});

const mortgageAmount = computed(() => {
  const value = totalPrice.value - downPayment.value;
  return roundResults.value ? Math.round(value) : Number.parseFloat(value.toFixed(2));
});

const totalNumberOfPayments = computed(() => {
  const value = paymentsPerYear.value * numberOfYears.value;
  return roundResults.value ? Math.round(value) : Number.parseFloat(value.toFixed(2));
});

const points = ref(0);
const costOfPoints = computed(() => {
  const value = mortgageAmount.value * points.value / 100;
  return roundResults.value ? Math.round(value) : Number.parseFloat(value.toFixed(2));
});

const regularPaymentAmount = computed(() => {
  const r = annualInterestRate.value / 12 / 100;
  const nt = Number.parseFloat(totalNumberOfPayments.value.toFixed(2));
  const numerator = r * (1 + r) ** nt;
  const denominator = (1 + r) ** nt - 1;
  const value = mortgageAmount.value * (numerator / denominator);

  if (roundResults.value) {
    return Number(value.toFixed(0));
  } else {
    return Number(value.toFixed(2));
  }
});

const monthlyPayment = computed(() => {
  const principal = totalPrice.value - downPayment.value;
  const monthlyInterestRate1 = annualInterestRate.value / 12 / 100;

  const numerator = principal * monthlyInterestRate1;
  const denominator = 1 - (1 + monthlyInterestRate1) ** -totalNumberOfPayments.value;

  const result = numerator / denominator;

  return roundResults.value ? Math.round(result) : result;
});

const totalInterest = computed(() => {
  const totalPaid = monthlyPayment.value * totalNumberOfPayments.value;
  const interest = totalPaid - mortgageAmount.value;
  return roundResults.value ? Math.round(interest) : Number.parseFloat(interest.toFixed(2));
});
</script>

<template>
  <div class="max-w-screen-md mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">
      🏠 Mortgage Calculator
    </h1>
    <h2 class="text-xl font-bold mb-2">
      Input
    </h2>
    <div>
      <label>Total Price: <input v-model="totalPrice" type="number"></label>
      <label>Down Payment Percentage: <input v-model="downPaymentPercentage" type="number"></label>
      <label>Annual Interest Rate: <input v-model="annualInterestRate" type="number"></label>
      <label>Payments Per Year: <input v-model="paymentsPerYear" type="number"></label>
      <label>Number of Years: <input v-model="numberOfYears" type="number"></label>
      <label>Points at Closing: <input v-model="points" type="number"></label>
    </div>
    <h2 class="text-xl font-bold mb-2 mt-4">
      Results
    </h2>
    <div>
      <input id="roundResults" v-model="roundResults" type="checkbox">
      <label for="roundResults">Round Results</label>
    </div>
    <div class="animate-pulse">
      <p><strong>Monthly Payment:</strong> {{ monthlyPayment }}</p>
      <p><strong>Down Payment:</strong> {{ downPayment }} (Calculated as Total Price * Down Payment Percentage)</p>
      <p><strong>Mortgage Amount:</strong> {{ mortgageAmount }} (Calculated as Total Price - Down Payment)</p>
      <p><strong>Cost of Points at Closing:</strong> {{ costOfPoints }} (Calculated as Mortgage Amount * Points / 100)</p>
      <p><strong>Total Interest Over 30 Years:</strong> {{ totalInterest }}</p>
      <p><strong>Regular Payment Amount:</strong> {{ regularPaymentAmount }} (Calculated using the formula PMT = [r(1 + r)^nt]/[(1 + r)^nt - 1])</p>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: #1f2937;
}
h2 {
  color: #374151;
}
label {
  display: block;
  margin-bottom: 10px;
}
input {
  margin-top: 5px;
}
.animate-pulse {
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
</style>
