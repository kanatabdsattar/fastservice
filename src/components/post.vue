<template>
  <div
    class="main-block"
    @click="chosenDelivery"
    :class="{ disabled: !isAvailable }"
  >
    <div class="main-info">
      <p class="header">Post</p>
      <p class="price">{{ deliveryPrice.toFixed(2) }}$</p>
    </div>
    <div class="main-image">
      <logo class="icon" />
    </div>
    <div v-show="visible" class="chosen-type">
      <check />
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from '../icons/post.vue';
import check from '../icons/check.vue';
import { ref } from 'vue';
const emit = defineEmits(['chosenDelivery']);
const props = defineProps({
  deliveryCity: String,
  deliveryType: String,
  isAvailable: Boolean,
  deliveryPrice: Number,
});
const visible = ref(false);
const chosenDelivery = () => {
  visible.value = !visible.value;
  emit('chosenDelivery');
};
</script>

<style scoped>
.main-block {
  width: 25vw;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  border-radius: 22px;
  border: 1px solid #e9f0eb;
}
.icon {
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
.main-info {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  justify-content: space-between;
}
.price{
    font-size: 36px;
    font-weight: 700;
    color: #78A1BB;
}
.chosen-type {
  background: linear-gradient(
    310deg,
    #65b3e4 23.89%,
    rgba(255, 255, 255, 0) 81.27%
  );
  border-radius: 0px 22px 22px 0px;
  box-shadow: 0px 0px 20px 0px rgba(120, 161, 187, 0.3);
  padding: 8px;
  display: flex;
  align-items: center;
}
@media (max-width: 850px) {
  .main-block {
    width: 75vw;
  }
  .icon {
    width: 70%;
  }
}
</style>
