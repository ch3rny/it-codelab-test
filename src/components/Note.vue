<template>
  <v-card class="elevation-0 note" color="#fff">
    <v-layout>
      <div class="mr-2">
        <v-avatar color="indigo">
          <v-icon dark>account_circle</v-icon>
        </v-avatar>
      </div>
      <div>
        <div class="body-2">{{item.text}}</div>
        <span class="tag" v-for="(item,index) in item.tags" :key="index">{{item}}</span>
        <div v-if="item.data" class="body-1 data">{{item.data}}</div>
      </div>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: "Note",
  props: {
    item: Object
  }
};
</script>

<style lang="scss" scoped>
.note {
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}
.data {
  color: #8c8d8f;
}
.tag {
  align-items: center;
  border-radius: 28px;
  display: inline-flex;
  height: 24px;
  justify-content: space-between;
  padding: 4px 12px;
  vertical-align: middle;
  white-space: nowrap;
  z-index: 1;
  background-color: #cdcfd4;
  color: #0c0c0c;
  margin: 3px;
  text-transform: uppercase;
}
</style>
