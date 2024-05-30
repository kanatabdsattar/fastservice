<template>
    <div class="main-block" @click="chosenDelivery" :class="{ 'disabled': !isAvailable }">
        <div class="main-info">
            <p class="header">{{ props.deliveryType }}</p>
            <p class="price">{{ props.deliveryPrice.toFixed(2)}}$</p>
        </div>
        <div class="main-image">
            <img :src="logoPath" class="icon" alt="Delivery Logo" />
        </div>
        <div v-show="visible" class="chosen-type">
            <check/>
        </div>
    </div>
</template>

<script setup lang="ts">
import check from '../icons/check.vue';
import { ref,defineEmits } from "vue";
const  emit  = defineEmits(['chosenDelivery']);

const props = defineProps({
    deliveryCity: {
        type: String,
        default: ''
    },
    deliveryType: {
        type: String,
        default: ''
    },
    isAvailable: {
        type: Boolean,
        default: false
    },
    deliveryPrice: {
        type: Number,
        default: 0
    },
    logoPath: {
        type: String,
        default: ''
    },
});
const visible = ref(false)
const chosenDelivery = () => {
    visible.value = !visible.value;
    emit('chosenDelivery');
}
</script>

<style scoped>
.main-block{
    width: 25vw;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    border-radius: 22px;
    border: 1px solid #E9F0EB;
    margin-bottom: 20px;
}
.icon{
    width: 80%;
}
.disabled {
  opacity: 0.6; 
  pointer-events: none; 
}
.header{
    font-size: 28px;
    font-weight: 700;
    color: #283044;
}
.price{
    font-size: 36px;
    font-weight: 700;
    color: #78A1BB;
}
.main-info{
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
    justify-content: space-between;
}
.chosen-type{
    background: linear-gradient(310deg, #65B3E4 23.89%, rgba(255, 255, 255, 0.00) 81.27%);
    border-radius: 0px 22px 22px 0px;
    box-shadow: 0px 0px 20px 0px rgba(120, 161, 187, 0.30);
    padding: 8px;
    display: flex;
    align-items: center;
}
@media (max-width: 850px) {
    .main-block{
    width: 75vw;
}
.icon{
    width: 70%;
}
}
</style>