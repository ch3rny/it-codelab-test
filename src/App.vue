<template>
  <v-app>
    <v-content>
      <!-- text-xs-center -->
      <v-layout wrap>
        <!-- logo -->
        <v-flex xs12>
          <v-flex xs12>
            <v-img :src="require('@/assets/logo.svg')" class="my-3" contain height="20" id="anchor"></v-img>
          </v-flex>
        </v-flex>
        <!-- content -->
        <!-- back_button -->
        <v-flex xs12 md1>
          <v-card class="elevation-0 section pa-2">
            <a href="#">
              <v-layout wrap justify-center class="body-2 text-xs-left text-md-center">
                <v-flex xs6 md12>
                  <v-icon>arrow_back</v-icon>
                </v-flex>
                <v-flex xs6 md12>Back</v-flex>
              </v-layout>
            </a>
          </v-card>
        </v-flex>
        <!-- back_button end -->
        <!-- main info -->
        <v-flex xs12 md9 lg9>
          <v-card class="elevation-0 section">
            <v-tabs fixed-tabs slider-color="black" v-model="activeTab">
              <v-tab>Full Profile</v-tab>
              <v-tab-item>
                <!-- user-info -->
                <div class="profile block">
                  <div class="profile-bio">
                    <v-layout wrap justify-center>
                      <div class="profile_avatar">
                        <v-avatar size="90px">
                          <v-img :src="userInfo.profile.avatar" alt="Avatar"/>
                        </v-avatar>
                      </div>
                      <div class="profile_name">
                        <div class="title">{{userInfo.profile.name}}</div>
                        <div class="body-2">{{userInfo.profile.position}}</div>
                        <div class="body-2">{{userInfo.profile.city}}</div>
                      </div>
                    </v-layout>
                  </div>
                  <div class="experience">
                    <div class="title pb-3">EXPERIENCE STORY</div>
                    <v-layout wrap>
                      <v-flex xs12 lg6>
                        <!-- jobs -->
                        <job-map :items="userInfo.experience"/>
                      </v-flex>
                      <v-flex xs12 lg6>
                        <mile-stones :items="userInfo.milestones"></mile-stones>
                      </v-flex>
                    </v-layout>
                  </div>
                </div>
                <div class="skill-stack block">
                  <div class="title pb-3">SARATH'S SKILL STACK</div>
                  <v-layout wrap>
                    <v-flex xs12>
                      <mile-stones :items="userInfo.skills"></mile-stones>
                    </v-flex>
                    <v-flex
                      class="skill_container"
                      xs12
                      sm6
                      md4
                      v-for="(item, index) in userInfo.skillStack"
                      :key="index"
                    >
                      <skill-stack :item="item" :colors="stackColors[index]"></skill-stack>
                    </v-flex>
                  </v-layout>
                </div>
                <div class="contribution block">
                  <v-layout wrap>
                    <v-flex md3 lg2>
                      <div class="nav" v-for="(item,index) in contributionNav" :key="index">
                        <a :href="`#${item}`">
                          <div
                            @click="$vuetify.goTo($refs[item][0])"
                            :class="{ link: true, active: item==activeContribution}"
                          >{{index+1}}. {{item}}</div>
                        </a>
                      </div>
                    </v-flex>
                    <v-flex md9 lg10 id="contribution_wrap">
                      <div
                        v-for="(item, index) in userInfo.contributions"
                        :id="item.title"
                        :key="index"
                        v-waypoint="{ active: true, callback: onWaypoint, options: intersectionOptions}"
                      >
                        <contribution :item="item" :index="index+1"/>
                      </div>
                    </v-flex>
                  </v-layout>
                </div>
              </v-tab-item>
              <v-tab>Status and Notes</v-tab>
              <v-tab-item>
                <v-layout wrap justify-center>
                  <v-flex xs12 md8 lg7 class="block">
                    <v-card class="elevation-0 block" color="#f2f3f5">
                      <v-layout wrap justify-center>
                        <div class="profile_avatar">
                          <v-avatar size="90px">
                            <img :src="userInfo.profile.avatar" alt="Avatar">
                          </v-avatar>
                        </div>
                        <div>
                          <div class="title">{{userInfo.profile.name}}</div>
                          <div class="body-2 blue-text">
                            <v-icon class="mr-1" color="#3f9cf9">mail_outline</v-icon>Share Profile with Hiring Manager
                          </div>
                          <div class="body-2">
                            <v-icon class="mr-1">mail_outline</v-icon>
                            Email Candidate ({{userInfo.profile.email}})
                          </div>
                          <div class="body-2">
                            <v-icon class="mr-1">phone</v-icon>
                            {{userInfo.profile.phone}}
                          </div>
                        </div>
                      </v-layout>
                    </v-card>
                    <v-card class="elevation-0 block mt-3" color="#f2f3f5">
                      <p class="title">NOTES</p>
                      <div v-for="(item,index) in userInfo.notes" :key="index">
                        <note :item="item"/>
                      </div>
                      <textarea v-model="textNote"/>
                      <div class="tags">
                        <v-layout align-start wrap>
                          <v-flex class="add-tag body-2">Add tags:</v-flex>
                          <v-flex>
                            <span
                              v-for="(item,index) in tags"
                              :class="{tag_btn:true, active_tag: tags[index].selected}"
                              :key="index"
                              @click="toggleTag(index)"
                            >{{item.title}}</span>
                          </v-flex>
                          <v-btn
                            depressed
                            color="#3f9cf9"
                            @click="submitNote()"
                            class="submit-button"
                          >Submit</v-btn>
                        </v-layout>
                      </div>
                    </v-card>
                  </v-flex>
                  <v-flex xs12 md4 lg5 class="block">
                    <v-card class="elevation-0 bb" color="#f2f3f5">
                      <div class="status block">
                        <p class="title">STATUS HISTORY</p>
                        <div class="status-buttons">
                          <div class="line"></div>
                          <v-btn color="#be2e39" depressed>Rejected
                            <v-icon>arrow_drop_down</v-icon>
                          </v-btn>
                          <p>Tobias Funke, CTO • 30 Dec, 2017</p>
                          <v-btn color="#adaeb1" depressed>Shortlisted</v-btn>
                          <p>Tobias Funke, CTO • 23 Dec, 2017</p>
                        </div>
                        <v-divider></v-divider>
                        <div class="status-history pt-3">
                          <p class="title">Add a New Status</p>
                          <div
                            class="body-2"
                            v-for="(item,index) in userInfo.statusHistory"
                            :key="index"
                          >
                            <v-icon v-if="item.positive" class="mr-1" color="#65c279">add</v-icon>
                            <v-icon v-else class="mr-1" color="#d43328">add</v-icon>
                            {{item.status}}
                          </div>
                          <div class="body-2">
                            <v-icon class="mr-1" color="#898a8c">add</v-icon>Add New Status
                          </div>
                        </div>
                      </div>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-tab-item>
            </v-tabs>
          </v-card>
        </v-flex>
        <v-flex xs12 md2>
          <v-card class="elevation-0 section text-xs-center text-md-left">
            <div
              v-for="(item, index) in rightMenu"
              v-show="activeTab in item.showOnTabs"
              :key="index"
              class="menu_item body-2"
            >
              <v-icon>{{item.icon}}</v-icon>
              <div>{{item.title}}</div>
            </div>
            <div class="links">
              <div v-for="(item, index) in userInfo.links" :key="index">
                <a :href="item.link">{{item.title}}</a>
              </div>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script>
import JobMap from "./components/JobMap";
import MileStones from "./components/MileStones";
import SkillStack from "./components/SkillStack";
import Contribution from "./components/Contribution";
import Note from "./components/Note";

export default {
  name: "App",
  components: {
    JobMap,
    MileStones,
    SkillStack,
    Contribution,
    Note
  },
  data() {
    return {
      intersectionOptions: {
        root: document.querySelector("#contribution_wrap"),
        rootMargin: "0px 0px 0px 0px",
        threshold: [1, 1]
      },
      activeTab: 0,
      activeContribution: "",
      stackColors: [
        ["#499658", "#ecf2ed"],
        ["#bd9e1b", "#f4f1e4"],
        ["#5c00bb", "#ede9f0"],
        ["#499658", "#ecf2ed"],
        ["#bd9e1b", "#f4f1e4"],
        ["#5c00bb", "#ede9f0"]
      ],
      userInfo: {},
      contributionNav: [],
      textNote: "",
      rightMenu: [
        {
          icon: "bookmark_border",
          title: "Shortlist",
          showOnTabs: [0]
        },
        {
          icon: "cancel",
          title: "Not Interested",
          showOnTabs: [0]
        },
        {
          icon: "mail_outline",
          title: "Email Candidate",
          showOnTabs: [0, 1]
        },
        {
          icon: "mail_outline",
          title: "Share Profile",
          showOnTabs: [0, 1]
        }
      ],
      tags: [
        { title: "friendly", selected: false },
        { title: "pleasant to interact", selected: false },
        { title: "not responsive", selected: false },
        { title: "unprofessional", selected: false },
        { title: "late for interview", selected: true },
        { title: "didn't show for interview", selected: false },
        { title: "frequent resheduling", selected: false },
        { title: "unreasonable negotiation", selected: false },
        { title: "rude", selected: false }
      ]
    };
  },

  methods: {
    onWaypoint({ el, going, direction }) {
      if (going === this.$waypointMap.GOING_IN) {
        this.activeContribution = el.id;
      }
    },
    toggleTag(index) {
      this.tags[index].selected = !this.tags[index].selected;
    },
    submitNote() {
      let tagsArray = [];
      this.tags.forEach(item => {
        if (item.selected) {
          tagsArray.push(item.title);
        }
      });
      let payload = {
        text: this.textNote,
        data: "Hiring Manager • today",
        tags: tagsArray
      };
      this.userInfo.notes.push(payload);
      this.tags.forEach(item => (item.selected = false));
    }
  },
  created() {
    fetch("/data.json")
      .then(resp => resp.json())
      .then(json => {
        this.userInfo = json;
        json.contributions.forEach(item =>
          this.contributionNav.push(item.title)
        );
      });
  }
};
</script>

 <style lang="scss" scoped>
.v-content {
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
}
.v-card {
  border: 1px #e4e5e6 solid;
  border-radius: 5px;
}
.block {
  border-top: 1px solid #dadada;
  padding: 20px 25px;
}
.v-avatar {
  border: 3px solid #dadada;
}
.profile_avatar {
  width: 96px;
}
.profile_name {
  padding: 15px;
}
.skill_container {
  padding: 25px 10px;
}
.skill_container:first-child {
  padding-left: 0px;
}
.skill_container:last-child {
  padding-right: 0px;
}
a {
  text-decoration: none;
  color: #8b8b8b;
}
.nav {
  a {
    color: #3f9cf9;
  }
}
.link {
  border-radius: 3px;
  margin: 5px 0;
  height: 36px;
  line-height: 36px;
  padding-left: 10px;
}
.active {
  color: #fff;
  background-color: #3f9cf9;
}
.contribution {
  padding: 20px 0;
  margin: 0 25px;
}
.section {
  margin: 5px 7px;
}
.menu_item {
  height: 48px;
  border-bottom: 1px solid #dadada;
  line-height: 48px;
  display: flex;
  i {
    padding: 12px;
  }
}
.menu_item:first-child {
  color: #3f9cf9;
  i: {
    color: #3f9cf9 !important;
  }
}
.links {
  padding: 25px 12px;
}
textarea {
  width: 100%;
  height: 96px;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  outline: none;
}
textarea:focus {
  border: 2px #3f9cf9 solid;
  caret-color: #3f9cf9;
}
.add-tag {
  height: 40px;
  line-height: 40px;
}
.tag-note {
  color: #8c8d8f;
  background-color: #fff;
  text-transform: uppercase;
}
.v-btn {
  border-radius: 5px;
  color: #fff;
  text-transform: none;
}

.status-buttons {
  position: relative;
  .line {
    position: absolute;
    height: 82px;
    width: 2px;
    background-color: #adaeb1;
    left: -2px;
    top: 24px;
  }
  .v-btn:before {
    width: 10px;
    height: 2px;
    background-color: #adaeb1;
    opacity: 1;
    left: -10px;
    top: 18px;
  }
  p {
    margin: 6px;
  }
}
.blue-text {
  color: #3f9cf9;
}
#contribution_wrap {
  max-height: 60vh;
  overflow: auto;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}
.contribution_wrap::-webkit-scrollbar {
  width: 0 !important;
}
.links {
  div {
    margin-bottom: 10px;
  }
  div:last-child {
    margin-bottom: 0;
  }
}
.tag_btn {
  align-items: center;
  border-radius: 28px;
  cursor: pointer;
  display: inline-flex;
  justify-content: space-between;
  height: 24px;
  padding: 4px 12px;
  vertical-align: middle;
  white-space: nowrap;
  z-index: 1;
  background-color: #fff;
  margin: 3px;
  text-transform: uppercase;
}
.active_tag {
  background-color: #0c0c0c;
  color: #fff;
}
</style>
