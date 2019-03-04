<template>
  <div class="container">
    <p class="stack_name title">{{index}}. {{item.title}}</p>
    <div class="milestones" v-for="(item, index) in item.milestones" :key="index">
      <div class="marker">
        <v-icon color="#65c279">flag</v-icon>
      </div>
      <div class="description" v-html="item"></div>
    </div>
    <div class="stats">
      <p
        class="subheading font-weight-bold"
      >Proficiency Level - {{item.level}}% ({{getLevel(item.level)}})</p>
      <v-progress-linear color="#65c279" height="15" :value="item.level"/>
      <v-layout wrap>
        <v-flex xs6 md3>
          <p class="label subheading font-weight-bold">Top Projects</p>
          <div class="information">Tensorflow - 20 commits
            <br>Superset - 320 commits
            <br>Yapf - 17 commits
          </div>
        </v-flex>
        <v-flex xs6 md3>
          <p class="label subheading font-weight-bold">{{item.questions}}</p>
          <p class="information">Stackoverflows
            <br>Questions
          </p>
        </v-flex>
        <v-flex xs6 md3>
          <p class="label subheading font-weight-bold">{{item.answers}}</p>
          <p class="information">Stackoverflows
            <br>Answers
          </p>
        </v-flex>
        <v-flex xs6 md3>
          <p class="label subheading font-weight-bold">{{item.commits}}</p>
          <p class="information">Github
            <br>Commits
          </p>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contribution",
  props: {
    item: Object,
    index: Number
  },
  methods: {
    getLevel(level) {
      switch (true) {
        case level >= 0 && level <= 19:
          return "Novice";

        case level >= 20 && level <= 49:
          return "Beginner";

        case level >= 50 && level <= 74:
          return "Competent";

        case level >= 74 && level <= 89:
          return "Proficient";

        case level >= 90:
          return "Expert";

        default:
          return "Novice";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  border-bottom: 1px #e4e4e4 solid;
}
.v-progress-linear {
  border-radius: 10px;
}
.milestones {
  display: flex;
  padding-bottom: 20px;
}
.stats {
  background-color: #f2f3f5;
  padding: 10px;
}
.label {
  margin-bottom: 0;
}
.information {
  color: #8b8b8b;
}
</style>
