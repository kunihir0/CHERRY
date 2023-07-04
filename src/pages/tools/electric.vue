<script setup lang="ts">
import appstore from "../../store";

const rows = computed(() => [
  { label: "Total daily:", value: appstore.useElectricStore.totalDailyCost },
  { label: "Total weekly:", value: appstore.useElectricStore.totalWeeklyCost },
  { label: "Total monthly:", value: appstore.useElectricStore.totalMonthlyCost },
  { label: "Total half-yearly:", value: appstore.useElectricStore.totalHalfYearlyCost },
  { label: "Total yearly:", value: appstore.useElectricStore.totalYearlyCost },
]);

const cols = [
  { label: "Cost/day", value: device => appstore.useElectricStore.calculateCost(device).dailyCost },
  { label: "Cost/week", value: device => appstore.useElectricStore.calculateCost(device).weeklyCost },
  { label: "Cost/month", value: device => appstore.useElectricStore.calculateCost(device).monthlyCost },
  { label: "Cost/half year", value: device => appstore.useElectricStore.calculateCost(device).halfYearlyCost },
  { label: "Cost/year", value: device => appstore.useElectricStore.calculateCost(device).yearlyCost },
];

onMounted(() => {
  appstore.useElectricStore.loadDevices();
});
</script>

<template>
  <div class="max-w-screen-md mx-175 p-4">
    <h1 class="text-2xl font-bold mb-4">
      Electricity Cost Calculator
    </h1>
    <div class="card mb-4">
      <div class="card-body">
        <h2 class="card-title">
          Add a device
        </h2>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Device name:</span>
          </label>
          <input
            v-model="appstore.useElectricStore.newDevice.name" type="text" placeholder="Device name"
            class="input input-bordered"
          >
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Power consumption (W):</span>
          </label>
          <input
            v-model.number="appstore.useElectricStore.newDevice.power" type="number" placeholder="Power consumption"
            class="input input-bordered"
          >
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Hours used per day:</span>
          </label>
          <input
            v-model.number="appstore.useElectricStore.newDevice.hours" type="range" min="1" max="24"
            class="slider w-full"
          >
          {{ appstore.useElectricStore.newDevice.hours }} hours
        </div>
        <button class="btn btn-accent mt-4" @click="appstore.useElectricStore.addDevice">
          Add device
        </button>
      </div>
    </div>

    <div class="card mb-4">
      <div class="card-body">
        <h2 class="card-title">
          Remove selected devices
        </h2>
        <button class="btn btn-error mt-4" @click="appstore.useElectricStore.removeSelectedDevices">
          Remove selected devices
        </button>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <h2 class="card-title">
          Devices
        </h2>
        <table class="table w-full table-compact table-zebra">
          <thead>
            <tr>
              <th>Select</th>
              <th>Device Name</th>
              <th>Power (W)</th>
              <th>Hours/day</th>
              <th>Cost/kWh</th>
              <th>Cost/day</th>
              <th>Cost/week</th>
              <th>Cost/month</th>
              <th>Cost/half year</th>
              <th>Cost/year</th>
              <th />
            </tr>
          </thead>

          <tbody>
            <tr v-for="(device, index) in appstore.useElectricStore.devices" :key="index">
              <td>
                <label>
                  <input type="checkbox" class="checkbox" @click="appstore.useElectricStore.toggleDeviceSelection(index)">
                </label>
              </td>
              <td>{{ device.name }}</td>
              <td>{{ device.power }}</td>
              <td>{{ device.hours }}</td>
              <td>${{ appstore.useElectricStore.costPerKWh }}</td>
              <td v-for="col in cols" :key="col.label">
                ${{ col.value(device) }}
              </td>
              <td>
                <button class="btn btn-xs btn-error" @click="appstore.useElectricStore.removeDevice(index)">
                  Remove
                </button>
              </td>
            </tr>
            <tr v-for="row in rows" :key="row.label">
              <td colSpan="4">
                {{ row.label }}
              </td>
              <td colSpan="6">
                ${{ row.value }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
