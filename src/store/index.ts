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
  const apiUrl = `https://frontend-test.dev.mechta.kz/delivery/check`;

  async function getDeliveryList(city: string) {
    const cityQuery = encodeURIComponent(
      city.toLowerCase().replace(/\s+/g,'')
    );
    const params = {
      search: cityQuery,
    };
    try {
      const response = await axios.get(apiUrl, { params })
      result.value = response.data as Delivery;
    } catch (error) {
      console.error("Error fetching delivery data:", error);
      result.value = null;
    }
  }
  return {
    result,
    getDeliveryList,
  };
});
