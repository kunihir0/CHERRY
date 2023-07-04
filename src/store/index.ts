import { counter } from "./counter";
import { useElectricStore } from "./eletric";

const appStore: any = {};

/**
 * 注册app状态库
 */
export const registerStore = () => {
  appStore.counter = counter();
  appStore.useElectricStore = useElectricStore();
};

export default appStore;
