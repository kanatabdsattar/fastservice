import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
export const useDeliveryStore = defineStore("delivery", () => {
  interface Delivery {
    city: String;
    type: String;
    available: Boolean;
    price: Number;
  }
  const result = ref<Delivery | null>(null);
  const apiError = ref();
  const envUrl = import.meta.env.VITE_APP_API_URL;
  const apiUrl = `${envUrl}`;

  async function getDeliveryList(city: string) {
    const cityQuery = encodeURIComponent(
      city.toLowerCase().replace(/\s+/g, "")
    );
    const params = {
      search: cityQuery,
    };
    try {
      const response = await axios.get(apiUrl, { params });
      result.value = response.data as Delivery;
    } catch (error) {
      console.error("Error fetching delivery data:", error);
      apiError.value = error;
    }
  }
  return {
    result,
    apiError,
    getDeliveryList,
  };
});
