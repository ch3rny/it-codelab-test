<template>
  <div>
    <div class="stack">
      <p class="stack_name font-weight-bold" :style="{color: main}">{{item.name}}</p>
      <div v-if="item.strongest" class="badge" :style="{'background-color': main}">
        <v-icon class="pr-1" small color="#fff">fas fa-trophy</v-icon>STRONGEST
      </div>
      <v-progress-linear
        :color="main"
        height="10"
        :value="item.progress"
        background-color="#d9d9d9"
      ></v-progress-linear>
      <div
        :style="{'background-color': secondary}"
        class="skill"
        v-for="(item, index) in item.stack"
        :key="index"
        v-show="index<showNumber"
      >
        <div v-if="item.topSkill" class="skill-badge" :style="{'background-color': main}">TOP SKILL</div>
        <p class="skill_name font-weight-bold">{{item.name}}</p>
        <p class="skill_stack" :style="{color: main}">{{item.stack}}</p>
      </div>
      <v-btn
        :style="{color: main}"
        depressed
        color="white"
        block
        v-show="stackLength>showNumber"
        @click="showNumber=stackLength"
      >+ {{skillNumber}} MORE</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "SkillStack",
  props: {
    item: Object
  },
  data() {
    return {
      showNumber: 2
    };
  },
  computed: {
    main() {
      return this.item.colors[0];
    },
    secondary() {
      return this.item.colors[1];
    },
    stackLength() {
      return this.item.stack.length;
    },
    skillNumber() {
      return this.item.stack.length - 2;
    }
  }
};
</script>
<style lang="scss" scoped>
.v-progress-linear {
  border-radius: 5px;
}
.stack,
.skill {
  position: relative;
}
.stack_name {
  text-transform: uppercase;
  font-size: 20px;
}
.badge {
  right: 0px;
  top: 0px;
  position: absolute;
  padding: 5px;
  font-size: 12px;
  color: #fff;
  border-radius: 3px;
}

.skill-badge {
  box-sizing: border-box;
  right: 3px;
  top: 3px;
  border-radius: 3px;
  position: absolute;
  padding: 5px;
  font-size: 12px;
  color: #fff;
}

p {
  margin: 0;
}
.skill {
  padding: 10px;
  margin-bottom: 3px;
}
.skill_name {
  color: #000;
  padding-bottom: 5px;
}
</style>
