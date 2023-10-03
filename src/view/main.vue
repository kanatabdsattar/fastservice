<template>
  <div class="container">
  <div class="main">
    <div class="main-info">
      <div class="main-logo">
        <logo class="main-icon" />
        <h3>FastService</h3>
      </div>
      <div class="main-cost">
        <p class="big-text">Delivery cost</p>
        <p class="small-text">Enter name of the city to count delivery cost</p>
      </div>
      <div class="main-search">
        <form action="" class="input-form">
          <input
            type="text"
            v-model="cityName"
            placeholder="Enter the name of the city"
          />
          <div v-if="closeSearch" class="submit" @click="chooseDelivery">ENTER</div>
          <div v-else class="close" @click="clearSearch">
            <close/>
          </div>
        </form>
      </div>
      <div class="main-list">
        <p class="small-text">Most popular cities</p>
        <table style="width: 100%">
          <tr>
            <td  @click="setCity('Nur - Sultan')">Nur - Sultan</td>
            <td  @click="setCity('Aktau')">Aktau</td>
          </tr>
          <tr>
            <td @click="setCity('Almaty')">Almaty</td>
            <td @click="setCity('Karaganda')">Karaganda</td>
          </tr>
          <tr>
            <td @click="setCity('Shymkent')">Shymkent</td>
            <td @click="setCity('Kentau')">Kentau</td>
          </tr>
          <tr>
            <td @click="setCity('Atyrau')">Atyrau</td>
            <td @click="setCity('London')">London</td>
          </tr>
          <tr>
            <td @click="setCity('Aktau')">Aktau</td>
            <td @click="setCity('Pavlodar')">Pavlodar</td>
          </tr>
        </table>
      </div>
      <div class="main-footer">
        All rights reserved <br />
        Fast service 2021
      </div>
    </div>
    <div v-if="showOption" class="main-option">
      <div v-if="apiResponse">
        <div v-for="(delivery, index) in apiResponse" :key="index">
          <!-- Check if the delivery type is "pick up" -->
          <template v-if="delivery.type === 'pickup'">
            <pickUp
              @chosenDelivery = "chosenType"
              :delivery-city="delivery.city"
              :delivery-type="delivery.type"
              :is-available="delivery.available"
              :delivery-price="delivery.price"
            />
          </template>
          <template v-if="delivery.type === 'courier'">
            <courier
              @chosenDelivery2 = "chosenType2"
              :delivery-city="delivery.city"
              :delivery-type="delivery.type"
              :is-available="delivery.available"
              :delivery-price="delivery.price"
            />
          </template>
          <template v-if="delivery.type === 'post'">
            <post
               @chosenDelivery = "chosenType3"
              :delivery-city="delivery.city"
              :delivery-type="delivery.type"
              :is-available="delivery.available"
              :delivery-price="delivery.price"
            />
          </template>
        </div>
      </div>
      <div v-else-if="apiError">
        <h2>Error:</h2>
        <div>{{ apiError }}</div>
      </div>
    </div>
    <div v-else class="main-image">
      <Image class="image" />
      <Road class="road" />
      <Lines class="line" />
    </div>
  </div>
  <footer>
    All rights reserved <br />
        Fast service 2021
  </footer>
  </div>
</template>

<script setup lang="ts">
import post from '../components/post.vue';
import close from '../icons/closeIcon.vue';
import courier from '../components/courier.vue'
import pickUp from '../components/pickUp.vue';
import logo from '../icons/logo.vue';
import Image from '../icons/track.vue';
import Road from '../icons/road.vue';
import Lines from '../icons/lines.vue';
import { ref } from 'vue';

import axios from 'axios';

const apiUrl = 'https://test-frontend.stage.mechta.market/delivery/check';
const cityName = ref('');
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

const isDisabled1 = ref(false);
const isDisabled2 = ref(false);
const isDisabled3 = ref(false);
const chosenType = () => { 
  isDisabled1.value = !isDisabled1.value;
  isDisabled2.value = true;
  isDisabled3.value = true;
}
const chosenType2 = () => { 
  isDisabled1.value = true;
  isDisabled2.value = !isDisabled2.value;
  isDisabled3.value = true;
}
const chosenType3 = () => { 
  isDisabled1.value = true;
  isDisabled2.value = true;
  isDisabled3.value = !isDisabled3.value;
}
const fetchData = () => {
  apiError.value = null;
  apiResponse.value = null;
  const params = {
    search: cityName.value.toLowerCase(),
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
const closeSearch = ref(true)
const clearSearch = () => {
  cityName.value = '';
  showOption.value = false;
  apiResponse.value = null;
  closeSearch.value = !closeSearch.value;
}
const setCity = (city:string) => {
  cityName.value = city;
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
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
.main-cost {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 30px;
}
td{
  cursor: pointer;
}
.big-text {
  font-size: 42px;
  font-weight: 700;
  display: flex;
  justify-content: flex-start;
}
.small-text {
  font-size: 20px;
  font-weight: 400;
  display: flex;
  justify-content: flex-start;
}
.main {
  font-family: 'Roboto', sans-serif;
  overflow: hidden;
  overflow-y: hidden;
  display: flex;
  justify-content: space-between;
  width: 100vw;
  color: #283044;
  background-color: #fff;
}
.main-logo {
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 20px;
  gap: 10px;
  margin-top: 20px;
}

.main-icon {
  height: 41px;
  width: 41px;
}
.main-info {
  height: 100vh;
  width: 50%;
}

td {
  padding-bottom: 15px;
  color: rgba(40, 48, 68, 0.5);
}
.close{
  background: linear-gradient(280deg, #65B3E4 15.15%, rgba(120, 161, 187, 0.00) 171.55%);
  position: absolute;
  right: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border-radius: 50%;
}
.close:hover{
  opacity: 0.8;
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
.image {
  width: 45%;
  position: relative;
  top: 10%;
  z-index: 3;
}
.way {
  position: relative;
}
.line {
  position: absolute;
  top: 55%;
  right: 10%;
}
.road {
  width: 85%;
  position: absolute;
  left: 30%;
  z-index: -1;
}
.main-footer {
  bottom: 0;
}
.main-search {
  margin-bottom: 25px;
}
.input-form {
  justify-content: flex-start;
  position: relative;
  display: flex;
  align-items: center;
}
input[type='text'] {
  background-color: #fff;
  width: 80%;
  padding: 10px;
  font-weight: 700;
  border: 1px solid #e9f0eb;
  border-radius: 50px;
  color: black;
  font-size: 24px;
}
.submit {
  cursor: pointer;
  color: #fff;
  display: flex;
  justify-content: center;
  padding: 10px 24px;
  width: 15%;
  border: none;
  font-size: 24px;
  font-weight: 700;
  position: absolute;
  right: 15%;
  border-radius: 50px;
  background: linear-gradient(
    280deg,
    #65b3e4 15.15%,
    rgba(120, 161, 187, 0) 171.55%
  );
}
.submit:hover{
  opacity: 0.8;
}
input:focus {
  outline: none; /* Remove the default outline */
  border: none; /* Remove the border */
  /* Add any other styling you want for the focused state */
}
.main-list {
  margin-bottom: 20px;
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
footer{
  display: none;

}
@media (max-width: 850px) {
  .main-info {
    margin-left: 20px;
    height: 100%;
    width: 100%;
}
  .main {
    flex-direction: column;
  }
  input[type='text'] {
  background-color: #fff;
  width: 80%;
  padding: 10px;
  border: 1px solid #e9f0eb;
  border-radius: 50px;
  color: black;
  font-size: 18px;
}
.submit{
  font-size: 18px;
}
.close{
  padding: 10px;
}
  .main-image {
    width: 100%;
    border-radius: 10% 10% 0 0;
  }
  .image {
    margin-top: 60px;
    right: 15%;
}
.big-text {
  font-size: 36px
}
.small-text {
  font-size: 18px;
}
.road{
  left: 30%;
  margin-top: 30px;
}
  .main-option {
    width: 100%;
}
.main-footer {
  visibility: hidden;
}
footer{
  padding: 10px;
  display: flex;
  text-align: start;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff;
  color: #283044;
}
}
</style>
