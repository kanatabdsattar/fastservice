<script setup lang="ts">
import Image from "../icons/track.vue";
import Road from "../icons/road.vue";
import Lines from "../icons/lines.vue";
</script>
<template>
  <div class="main-image md: h-[60vh] lg:h-screen">
    <div
      class="text-start font-bold text-gray-300 lg:text-2xl absolute lg:top-2 top-4 right-20 lg:right-28 md:text-lg"
    >
      <h1>Fast</h1>
      <h1>Service</h1>
    </div>
    <Image class="image" />
    <Road class="road" />
    <Lines class="line" />
  </div>
</template>
<style scoped>
.image {
  width: 55%;
  position: absolute;
  top: 5%;
  right: 35%;
  z-index: 3;
}
.line {
  position: absolute;
  top: 65%;
  right: 5%;
}
.road {
  width: 100%;
  position: absolute;
  top: -5%;
  left: 5%;
  z-index: -1;
}

@media (max-width: 750px) {
    .image {
    width: 55%;
    position: absolute;
    top: -15%;
    right: 40%;
    z-index: 3;
  }
  .line {
    position: absolute;
    top: 55%;
    right: 5%;
  }
  .road {
    width: 100%;
    position: absolute;
    top: -30%;
    left: 5%;
    z-index: -1;
  }
}
</style>