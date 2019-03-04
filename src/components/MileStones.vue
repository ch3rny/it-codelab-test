<template>
  <div class="container">
    <div class="item" v-for="(item, index) in items" :key="index">
      <div class="marker">
        <v-icon color="#000">stars</v-icon>
      </div>
      <div class="description" v-html="item"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MileStones",
  props: {
    items: Array
  }
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #f2f3f5;
  padding: 20px 10px;
}
.item {
  display: flex;
  padding-top: 20px;
}
.item:first-child {
  padding-top: 0;
}
.marker {
  margin-right: 10px;
  width: 24px;
  position: relative;
}
.description {
  padding-bottom: 10px;
}
</style>
