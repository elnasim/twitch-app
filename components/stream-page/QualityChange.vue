<template>
  <div v-if="isShow" class="quality-change">
    <div
      v-for="item of qualities"
      :key="item.group"
      @click="changeQuality(item.group)"
      :class="{ active: currQuality === item.group }"
      class="quality"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    qualities: {
      type: Array,
      default: null
    },
    isShow: {
      type: Boolean,
      default: false
    },
    changeQuality: {
      type: Function,
      default: null
    },
    currQuality: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.quality-change {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  z-index: 10;
}

.quality {
  padding: 5px 20px;
  color: #ffffff;
  cursor: pointer;
  &.active {
    color: #000000;
    background-color: #fff;
  }
}
</style>
