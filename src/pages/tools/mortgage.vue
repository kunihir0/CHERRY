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
  return roundResults.value ? Math.round(interest) : interest;
});

const value1 = ref(0); // First value
const value2 = ref(0); // Second value

const difference = computed(() => {
  return roundResults.value ? Math.round(value1.value - value2.value) : Number.parseFloat((value1.value - value2.value).toFixed(2));
});

const amortizationSchedule = computed(() => {
  const schedule = [];
  let principalBalance = mortgageAmount.value;
  const monthlyInterestRate = ref(annualInterestRate.value / 12 / 100);

  for (let i = 1; i <= 3; i++) {
    const interestPaid = principalBalance * monthlyInterestRate.value;
    const principalPaid = monthlyPayment.value - interestPaid;
    principalBalance -= principalPaid;
    schedule.push({
      paymentNumber: i,
      interest: roundResults.value ? Math.round(interestPaid) : interestPaid,
      principal: roundResults.value ? Math.round(principalPaid) : principalPaid,
      loanBalance: roundResults.value ? Math.round(principalBalance) : principalBalance,
    });
  }
  return schedule;
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
      <hr>
      <!-- Input fields for the two values -->
      <h1 class="text-xl font-bold mb-2">
        Difference THINGY
      </h1>
      <label>Value 1: <input v-model="value1" type="number"></label>
      <label>Value 2: <input v-model="value2" type="number"></label>
      <!-- Display the difference in a box -->
      <div class="border p-4 mt-4">
        <p><strong>Difference:</strong> {{ difference }}</p>
      </div>
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
      <p><strong>Total Interest Over {{ numberOfYears }} Years:</strong> {{ totalInterest }}</p>
      <p>
        <strong>Regular Payment Amount:</strong> {{ regularPaymentAmount }} (Calculated using the formula PMT = [r(1 +
        r)^nt]/[(1 + r)^nt - 1])
      </p>
    </div>
    <h2 class="text-xl font-bold mb-2 mt-4">
      Amortization Schedule
    </h2>
    <table class="table-auto">
      <thead>
        <tr>
          <th>Payment Number</th>
          <th>Interest</th>
          <th>Principal</th>
          <th>Loan Balance</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="payment in amortizationSchedule" :key="payment.paymentNumber">
          <td>{{ payment.paymentNumber }}</td>
          <td>{{ payment.interest }}</td>
          <td>{{ payment.principal }}</td>
          <td>{{ payment.loanBalance }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
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

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: .5;
  }
}

.table-auto {
  width: 100%;
  border-collapse: collapse;
}

th {
  border: 1px solid #999;
  padding: 0.5rem;
}

td {
  border: 1px solid #999;
  padding: 0.5rem;
}
</style>
