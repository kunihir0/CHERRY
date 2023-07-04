import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

interface Device {
  name: string;
  power: number;
  hours: number;
}

export const useElectricStore = defineStore("electric", () => {
  const devices = ref<Device[]>([]);
  const newDevice = ref<Device>({
    name: "",
    power: 0,
    hours: 0,
  });
  const selectedDevices = ref<number[]>([]);
  const costPerKWh = 0.074;

  const savedDevices = useLocalStorage<Device[]>("devices", []);

  const saveDevices = () => {
    savedDevices.value = devices.value;
  };

  const addDevice = () => {
    if (newDevice.value.name && newDevice.value.power && newDevice.value.hours) {
      devices.value.push({
        name: newDevice.value.name,
        power: newDevice.value.power,
        hours: newDevice.value.hours,
      });
      newDevice.value.name = "";
      newDevice.value.power = 0;
      newDevice.value.hours = 0;
      saveDevices();
    }
  };

  const removeDevice = (index: number) => {
    devices.value.splice(index, 1);
    saveDevices();
  };

  const removeSelectedDevices = () => {
    const newDevices = devices.value.filter(
      (_, index) => !selectedDevices.value.includes(index),
    );
    const removedIndexes = devices.value
      .map((_, index) => index)
      .filter(index => selectedDevices.value.includes(index));
    const newSelectedDevices = selectedDevices.value
      .map((index) => {
        const removedBefore = removedIndexes.filter(i => i < index).length;
        return index - removedBefore;
      })
      .filter(index => index >= 0 && index < newDevices.length);

    devices.value = newDevices;
    selectedDevices.value = newSelectedDevices;
    saveDevices();
  };

  const loadDevices = () => {
    devices.value = savedDevices.value;
  };

  const toggleDeviceSelection = (index: number) => {
    const selectedIndex = selectedDevices.value.indexOf(index);
    if (selectedIndex === -1) {
      selectedDevices.value.push(index);
    } else {
      selectedDevices.value.splice(selectedIndex, 1);
    }
  };

  const calculateCost = (device: Device) => {
    const dailyCost = (device.power / 1000) * device.hours * costPerKWh;
    return {
      dailyCost,
      weeklyCost: dailyCost * 7,
      monthlyCost: dailyCost * 30,
      halfYearlyCost: dailyCost * 182.5,
      yearlyCost: dailyCost * 365,
    };
  };

  const totalDailyCost = computed(() =>
    devices.value.reduce(
      (total, device) => total + calculateCost(device).dailyCost,
      0,
    ).toFixed(2),
  );

  const totalWeeklyCost = computed(() =>
    devices.value.reduce(
      (total, device) => total + calculateCost(device).weeklyCost,
      0,
    ).toFixed(2),
  );

  const totalMonthlyCost = computed(() =>
    devices.value.reduce(
      (total, device) => total + calculateCost(device).monthlyCost,
      0,
    ).toFixed(2),
  );

  const totalHalfYearlyCost = computed(() =>
    devices.value.reduce(
      (total, device) => total + calculateCost(device).halfYearlyCost,
      0,
    ).toFixed(2),
  );

  const totalYearlyCost = computed(() =>
    devices.value.reduce(
      (total, device) => total + calculateCost(device).yearlyCost,
      0,
    ).toFixed(2),
  );

  return {
    devices,
    newDevice,
    selectedDevices,
    addDevice,
    removeDevice,
    removeSelectedDevices,
    toggleDeviceSelection,
    calculateCost,
    loadDevices,
    totalDailyCost,
    totalWeeklyCost,
    totalMonthlyCost,
    totalHalfYearlyCost,
    totalYearlyCost,
  };
});
