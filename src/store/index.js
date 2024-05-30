// stores/useDeliveryStore.ts
import { defineStore } from 'pinia'
import axios from 'axios'

export const useDeliveryStore = defineStore('delivery', {
  state: () => ({
    apiUrl: "https://frontend-test.dev.mechta.kz/delivery/check",
    cities: [],
    cityName: "",
    apiResponse: null,
    apiError: null,
    showOption: false,
  }),
  actions: {
    fetchCities(query) {
      const citySearchUrl = `https://your-api-endpoint/cities?search=${query}`;
      axios.get(citySearchUrl)
        .then(response => {
          this.cities = response.data;
        })
        .catch(error => {
          console.error("Failed to fetch cities:", error);
          this.cities = [];
        });
    },
    fetchData() {
      this.apiError = null;
      this.apiResponse = null;
      const cityQuery = encodeURIComponent(this.cityName.toLowerCase().replace(/\s+/g, ''));
      const params = {
        search: cityQuery,
      };

      axios.get(this.apiUrl, { params })
        .then(response => {
          this.apiResponse = response.data;
          this.showOption = true;
        })
        .catch(error => {
          this.apiError = error;
          this.showOption = false;
        });
    },
    clearSearch() {
      this.cityName = "";
      this.showOption = false;
      this.apiResponse = null;
      this.apiError = null;
      this.cities = [];
    },
    setCity(city) {
      this.cityName = city;
      this.fetchData();
    },
  }
});
