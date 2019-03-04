<template>
  <div>
    <div class="jobs" v-for="(item, index) in items" :key="index">
      <div class="marker">
        <div class="line"></div>
        <v-icon color="#77b9fe">place</v-icon>
      </div>
      <div class="description">
        <span class="company font-weight-bold">{{item.company}}</span>
        - {{item.position}}
        <br>
        {{item.workTime}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "JobMap",
  props: {
    items: Array
  }
};
</script>

<style lang="scss" scoped>
.jobs {
  display: flex;
}
.marker {
  position: relative;
}

.line {
  position: absolute;
  border-left: 2px solid #77b9fe;
  height: calc(100% - 18px);
  left: 11px;
  top: 21px;
}
.description {
  padding-bottom: 10px;
  color: #8b8b8b;
}
.company {
  color: #000;
}
.jobs:last-child .line {
  height: 0;
}
</style>
