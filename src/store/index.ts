import { counter } from "./counter";
import { useElectricStore } from "./eletric";
import { useCannabisStore } from "./cannabis";

const appStore: any = {};

/**
 * 注册app状态库
 */
export const registerStore = () => {
  appStore.counter = counter();
  appStore.useElectricStore = useElectricStore();
  appStore.useCannabisStore = useCannabisStore();
};

export default appStore;
