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
        <!-- backbutton -->
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
        <!-- backbutton end -->
        <!-- main info -->
        <v-flex xs12 md9 lg9>
          <v-card class="elevation-0 section">
            <v-tabs fixed-tabs slider-color="black">
              <v-tab>Full Profile</v-tab>
              <v-tab-item>
                <div class="profile block">
                  <div class="profile-bio">
                    <v-layout wrap justify-center>
                      <div class="profile_avatar">
                        <v-avatar size="90px">
                          <img src="@/assets/avatar.jpg" alt="Avatar">
                        </v-avatar>
                      </div>
                      <div class="profile_name">
                        <div class="title">{{profile.name}}</div>
                        <div class="body-2">{{profile.position}}</div>
                        <div class="body-2">{{profile.city}}</div>
                      </div>
                    </v-layout>
                  </div>
                  <div class="experience">
                    <div class="title pb-3">EXPERIENCE STORY</div>
                    <v-layout wrap>
                      <v-flex xs12 lg6>
                        <!-- jobs -->
                        <job-map :items="experience"/>
                      </v-flex>
                      <v-flex xs12 lg6>
                        <mile-stones :items="milestones"></mile-stones>
                      </v-flex>
                    </v-layout>
                  </div>
                </div>
                <div class="skill-stack block">
                  <div class="title pb-3">SARATH'S SKILL STACK</div>
                  <v-layout wrap>
                    <v-flex xs12>
                      <mile-stones :items="skills"></mile-stones>
                    </v-flex>
                    <v-flex
                      class="skill_container"
                      xs12
                      sm6
                      md4
                      v-for="(item, index) in skillStack"
                      :key="index"
                    >
                      <skill-stack :item="item"></skill-stack>
                    </v-flex>
                  </v-layout>
                </div>
                <div class="contribution block">
                  <v-layout wrap>
                    <v-flex md3 lg2>
                      <div
                        class="nav"
                        v-for="(item,index) in contributionNav"
                        :key="index"
                        :id="item.title"
                      >
                        <a :href="`#${item.title}`">
                          <div
                            :class="{ link: true, active: `#${item.title}`==link}"
                          >{{index+1}}. {{item.title}}</div>
                        </a>
                      </div>
                    </v-flex>
                    <v-flex md9 lg10>
                      <div v-for="(item, index) in contributions" :key="index">
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
                            <img src="@/assets/avatar.jpg" alt="Avatar">
                          </v-avatar>
                        </div>
                        <div>
                          <div class="title">{{profile.name}}</div>
                          <div class="body-2 blue-text">
                            <v-icon class="mr-1" color="#3f9cf9">mail_outline</v-icon>Share Profile with Hiring Manager
                          </div>
                          <div class="body-2">
                            <v-icon class="mr-1">mail_outline</v-icon>
                            Email Candidate ({{profile.email}})
                          </div>
                          <div class="body-2">
                            <v-icon class="mr-1">phone</v-icon>
                            {{profile.phone}}
                          </div>
                        </div>
                      </v-layout>
                    </v-card>
                    <v-card class="elevation-0 block mt-3" color="#f2f3f5">
                      <p class="title">NOTES</p>
                      <div v-for="(item,index) in notes" :key="index">
                        <note :item="item"/>
                      </div>
                      <textarea/>
                      <div class="tags">
                        <v-layout align-start wrap>
                          <v-item-group multiple>
                            <v-flex class="add-tag body-2">Add tags:</v-flex>
                            <v-item v-for="(item,index) in tags" :key="index">
                              <v-chip
                                slot-scope="{ active, toggle }"
                                :selected="active"
                                @click="toggle"
                                class="tag-note"
                              >{{item}}</v-chip>
                            </v-item>
                          </v-item-group>
                          <v-btn depressed color="#3f9cf9" class="submit-button">Submit</v-btn>
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
                          <div class="body-2" v-for="(item,index) in statusHistory" :key="index">
                            <v-icon class="mr-1" :color="item.color">add</v-icon>
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
            <div v-for="(item, index) in rightMenu" :key="index" class="menu_item body-2">
              <v-icon>{{item.icon}}</v-icon>
              <div>{{item.title}}</div>
            </div>
            <div class="links">
              <div v-for="(item, index) in links" :key="index">
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
      profile: {
        name: "Sarath Lakshman",
        position: "Sr. Software Engineer",
        city: "BANGALORE",
        phone: "991-023-4564",
        email: "sarath@gmail.com"
      },
      experience: [
        {
          company: "Uber",
          position: "Sr. Software Engineer",
          workTime: "1 year 11 months"
        },
        {
          company: "Zlottio",
          position: "Senior Software Engineer",
          workTime: "2 year 8 months"
        },
        {
          company: "Accenture",
          position: "Software Engineer",
          workTime: "3 year 9 months"
        },
        {
          company: "Google",
          position: "Software Engineering Intern",
          workTime: "3 months"
        }
      ],
      milestones: [
        "<strong>~5 years</strong> work expirience",
        "<strong>80% time spent in Product companies</strong> (Uber, Google)"
      ],
      skills: [
        "Sarath is a <strong>strong Back End Engineer</strong>, who also possesses moderate skills in Front End development, along with some emerging skills"
      ],
      skillStack: [
        {
          name: "Back End",
          colors: ["#499658", "#ecf2ed"],
          progress: 80,
          strongest: true,
          stack: [
            {
              name: "Python",
              stack: "Tensorflow, Pyth.io",
              topSkill: true
            },
            {
              name: "R",
              stack: "Razer, Sunnyside, Pallbearer, Lochinbar, approve.io"
            },
            {
              name: "Python",
              stack: "Tensorflow, Pyth.io",
              topSkill: true
            },
            {
              name: "R",
              stack: "Razer, Sunnyside, Pallbearer, Lochinbar, approve.io"
            },
            {
              name: "Python",
              stack: "Tensorflow, Pyth.io",
              topSkill: true
            },
            {
              name: "R",
              stack: "Razer, Sunnyside, Pallbearer, Lochinbar, approve.io"
            }
          ]
        },
        {
          name: "Front End",
          colors: ["#bd9e1b", "#f4f1e4"],
          progress: 65,
          stack: [
            {
              name: "Javascript",
              stack: "Animatonics",
              topSkill: true
            },
            {
              name: "Frontscape",
              stack: "Frontaffront"
            }
          ]
        },
        {
          name: "New technologies",
          colors: ["#5c00bb", "#ede9f0"],
          progress: 50,
          stack: [
            {
              name: "Clojure",
              stack: "Clojureflow"
            },
            {
              name: "Scala",
              stack: "Scalable, Readjust, Scolio, Study.io, Downtown"
            }
          ]
        }
      ],
      contributionNav: [
        { title: "Python" },
        { title: "Javascript" },
        { title: "Scala" },
        { title: "Clojure" }
      ],
      link: "",
      contributions: [
        {
          title: "Python contribution",
          milestones: [
            "Contributed to <strong>top open source Python projects (Tensorflow, Superset)</strong> while actively <strong>working at Uber</strong> (2014-2016)",
            "Contributed to <strong>3 top Python discussions</strong> on Stackoverflow"
          ],
          level: 95,
          questions: 12,
          answers: 9,
          commits: 1232
        },
        {
          title: "Python contribution",
          milestones: [
            "Contributed to <strong>top open source Python projects (Tensorflow, Superset)</strong> while actively <strong>working at Uber</strong> (2014-2016)",
            "Contributed to <strong>3 top Python discussions</strong> on Stackoverflow"
          ],
          level: 95,
          questions: 12,
          answers: 9,
          commits: 1232
        }
      ],
      rightMenu: [
        {
          icon: "bookmark_border",
          title: "Shortlist"
        },
        {
          icon: "cancel",
          title: "Not Interested"
        },
        {
          icon: "mail_outline",
          title: "Email Candidate"
        },
        {
          icon: "mail_outline",
          title: "Share Profile"
        }
      ],
      links: [
        { title: "LinkedIn", link: "https://www.linkedin.com/" },
        { title: "StackOverflow", link: "https://www.linkedin.com/" },
        { title: "Github", link: "https://www.linkedin.com/" },
        { title: "Blog / Website", link: "https://www.linkedin.com/" }
      ],
      notes: [
        {
          text: "Current salary too high"
        },
        {
          text: "He was not that strong in Python and Swift",
          tags: [],
          data: "Tobias Funke • 26 Dec, 2017 • Edit"
        },
        {
          text:
            "Had good presentation skills but his final answer was a terrible solution",
          tags: ["Friendly", "Not Responsive"],
          data: "Hiring Manager • 23 Dec, 2017"
        }
      ],
      tags: [
        "friendly",
        "pleasant to interact",
        "not responsive",
        "unprofessional",
        "late for interview",
        "didn't show for interview",
        "frequent resheduling",
        "unreasonable negotiation",
        "rude"
      ],
      statuses: ["Rejected", "Shortlisted", "Accepted"],
      statusHistory: [
        { status: "Teleconference Scheduled", color: "#65c279" },
        { status: "Face to Face Schedules", color: "#65c279" },
        { status: "Candidate Not Interesed", color: "#d43328" },
        { status: "Offer Given", color: "#65c279" },
        { status: "Offer Declined", color: "#d43328" },
        { status: "Offer Accepted", color: "#65c279" },
        { status: "Joined", color: "#65c279" }
      ]
    };
  },
  mounted() {
    window.onscroll = function() {
      this.link = location.hash;
    };
    window.onscroll();
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
</style>
