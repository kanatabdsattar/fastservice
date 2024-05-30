<script setup lang="ts">
import close from "../icons/closeIcon.vue";
import deliver from "../components/deliver.vue";
import banner from "../components/banner.vue";
import footerIcons from "../components/footer-icons.vue";
import { ref, computed } from "vue";
import axios from "axios";
const envUrl = import.meta.env.VITE_APP_API_URL
const apiUrl = `${envUrl}/check`;
const cityName = ref("");
interface Delivery {
  city: String;
  type: String;
  available: Boolean;
  price: Number;
}
const apiResponse = ref();
const apiError = ref(null);
const showOption = ref(false);

const chooseDelivery = () => {
  console.log(showOption.value);
  if (cityName.value.length > 0) {
    showOption.value = true;
    fetchData();
    closeSearch.value = !closeSearch.value;
  }
};

const fetchData = () => {
  apiError.value = null;
  apiResponse.value = null;
  const cityQuery = encodeURIComponent(cityName.value.toLowerCase().replace(/\s+/g, ''));
  const params = {
    search: cityQuery,
  };

  axios
    .get(apiUrl, { params })
    .then((response) => {
      apiResponse.value = response.data as Delivery;
    })
    .catch((error) => {
      apiError.value = error;
    });
};
const closeSearch = ref(true);
const clearSearch = () => {
  cityName.value = "";
  showOption.value = false;
  apiResponse.value = null;
  apiError.value = null;
  closeSearch.value = !closeSearch.value;
};
const setCity = (city: string) => {
  cityName.value = city;
  filteredCities.value = [];
};
type LogoType = 'pickup' | 'courier' | 'post';

const getLogoPath = (type: LogoType): string => {
  const logoPaths: { [key in LogoType]: string } = {
    pickup: "/pickup.svg",
    courier: "/courier.svg",
    post: "/post.svg",
  };

  return logoPaths[type] || "/default-logo.svg";
};

interface City {
  name: string;
  alias: string;
}
const cities =ref<City[]>([
  { name: "Nur - Sultan", alias: "nur-sultan" },
  { name: "Aktau", alias: "aktau" },
  { name: "Almaty", alias: "almaty" },
  { name: "Karaganda", alias: "karaganda" },
  { name: "Shymkent", alias: "shymkent" },
  { name: "Kentau", alias: "kentau" },
  { name: "Aitie", alias: "aitie" },
  { name: "Pavlodar", alias: "pavlodar" },
]);
const filteredCities = ref<City[]>([]);
const filterCities = () => {
  const searchValue = cityName.value.toLowerCase();
  if (searchValue.length > 0) {
    filteredCities.value = cities.value.filter((city) =>
      city.name.toLowerCase().includes(searchValue)
    );
  } else {
    filteredCities.value = [];
  }
};
const cityPairs = computed(() => {
  let pairs = [];
  for (let i = 0; i < cities.value.length; i += 2) {
    pairs.push(cities.value.slice(i, i + 2));
  }
  return pairs;
});
</script>
<template>
  <div class="container">
    <div class="main">
      <div class="main-info">
        <div class="flex w-full items-center mb-8 font-bold text-xl gap-2 mt-2">
          <logo class="h-max-10 w-max-10" />
          <h3 class="text-2xl">FastService</h3>
        </div>
        <div class="flex flex-col gap-2 mb-8">
          <p class="text-3xl flex justify-start font-bold">Delivery cost</p>
          <p class="text-lg flex justify-start text-gray-500">
            Enter name of the city to count delivery cost
          </p>
        </div>
        <div class="mb-8">
          <form action="" class="flex lg:justify-start justify-center items-center relative">
            <input
              type="text"
              v-model="cityName"
              @input="filterCities"
              placeholder="Enter the name of the city"
              :class="[
                apiError
                  ? 'focus:border-gray-500 outline-none border-red-600 w-4/5 p-2.5 rounded-full bg-transparent border'
                  : 'outline-none border border-gray-400 w-4/5 p-2.5 rounded-full bg-transparent',
              ]"
            />
            <div v-if="closeSearch" class="submit" @click="chooseDelivery">
              ENTER
            </div>
            <div
              v-else
              :class="[
                apiError
                  ? 'bg-red-to-transparent p-2.5 rounded-full lg:right-20p right-5p flex justify-end absolute cursor-pointer'
                  : 'close cursor-pointer',
              ]"
              @click="clearSearch"
            >
              <close />
            </div>
          </form>
          <p v-if="apiError" class="text-red-500 lg:text-start text-center mt-1">
            We didn’t found such city. Please check spelling
          </p>
          <ul
            v-if="cityName.length > 0"
            class="w-[35%] md: w-[80%] bg-white text-start shadow-sm rounded-b-2xl overflow-hidden absolute"
          >
            <li
              v-for="(city, index) in filteredCities"
              class="border-b p-2 mx-4 cursor-pointer"
              :key="index"
              @click="setCity(city.name)"
            >
              {{ city.name }}
            </li>
          </ul>
        </div>
        <div>
          <p class="text-xl flex justify-start">Most popular cities</p>
          <div class="main-list">
            <table
              class="border-separate border-spacing-x-8 border-spacing-y-4 w-3/4"
            >
              <tbody>
                <tr
                  v-for="(pair, index) in cityPairs"
                  :key="index"
                  class="gap-2"
                >
                  <td
                    class="w-1/4 border-b text-start cursor-pointer pb-3 text-gray-400"
                    @click="setCity(pair[0].name)"
                  >
                    {{ pair[0].name }}
                  </td>
                  <td
                    class="w-1/4 border-b text-start cursor-pointer pb-3 text-gray-400"
                    v-if="pair.length > 1"
                    @click="setCity(pair[1].name)"
                  >
                    {{ pair[1].name }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="lg:flex md: hidden justify-evenly gap-10">
          <div>
            All rights reserved <br />
            Fast service 2021
          </div>
          <footerIcons />
        </div>
      </div>
      <div class="flex">
        <div v-if="showOption" class="main-option">
          <div v-if="apiResponse">
            <div v-for="(delivery, index) in apiResponse" :key="index">
              <deliver
                :delivery-city="delivery.city"
                :delivery-type="delivery.type"
                :is-available="delivery.available"
                :delivery-price="delivery.price"
                :logo-path="getLogoPath(delivery.type)"
              />
            </div>
          </div>
          <banner v-else-if="apiError"/>
        </div>
        <banner v-else/>
      </div>
      <div class="flex flex-col-reverse gap-4 my-6 lg:hidden">
        <div class="text-start">
          All rights reserved <br />
          Fast service 2021
        </div>
        <footerIcons />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-info {
  width: 60vw;
  margin-left: 60px;
}
.main-option {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10% 0 0 10%;
  background-color: #f7f7f7;
  overflow: hidden;
  position: relative;
  width: 45vw;
  z-index: 3;
}
.main-image {
  display: flex;
  justify-content: center;
  border-radius: 10% 0 0 10%;
  background-color: #f7f7f7;
  overflow: hidden;
  position: relative;
  width: 45vw;
  z-index: 3;
}
.main {
  font-family: "Roboto", sans-serif;
  max-height: 100svh;
  overflow-y: hidden;
  display: flex;
  justify-content: space-between;
  color: #283044;
  background-color: #fff;
}
.main-info {
  height: 100vh;
}
.close {
  background: linear-gradient(
    280deg,
    #65b3e4 15.15%,
    rgba(120, 161, 187, 0) 171.55%
  );
  position: absolute;
  right: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 50%;
}
.close:hover {
  opacity: 0.8;
}
.submit {
  cursor: pointer;
  color: #fff;
  display: flex;
  justify-content: center;
  padding: 5px 24px;
  border: none;
  font-size: 24px;
  font-weight: 700;
  position: absolute;
  right: 20%;
  border-radius: 50px;
  background: linear-gradient(
    280deg,
    #65b3e4 15.15%,
    rgba(120, 161, 187, 0) 171.55%
  );
}
.submit:hover {
  opacity: 0.8;
}
.main-list {
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
@media (max-width: 750px) {
  .main {
    flex-direction: column;
    overflow-y: auto;
    height: 100vh;
  }
  .main-option {
    width: 100%;
  }
  .main-info {
    height: 100%;
    width: 100%;
    margin-left: 0px;
  }
  input[type="text"] {
    width: 85%;
  }
  .submit {
    font-size: 20px;
    padding: 10px 14px;
    right: 5%;
  }
  .close {
    padding: 10px;
  }
  .main-image {
    width: 100%;
    border-radius: 10% 10% 0 0;
  }
  .main-option {
    width: 100%;
  }
}
</style>
