<template>
  <v-card class="elevation-0 note" color="#fff">
    <v-layout>
      <div class="mr-1">
        <v-avatar color="indigo">
          <v-icon dark>account_circle</v-icon>
        </v-avatar>
      </div>
      <div>
        <div class="body-2">{{item.text}}</div>
        <v-chip v-for="(item,index) in item.tags" :key="index">{{item}}</v-chip>
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
.v-chip {
  text-transform: uppercase;
}
</style>
