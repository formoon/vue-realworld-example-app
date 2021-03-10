<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'home' }">
        Internal Information
      </router-link>
      <ul v-if="!isAuthenticated" class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'login' }"
          >
            <i class="ion-compose"></i>Sign in
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'register' }"
          >
            <i class="ion-compose"></i>Sign up
          </router-link>
        </li>
      </ul>
      <ul v-else class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'home' }"
          >
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <anDropMenu :config="config" @set-selected-option="setSelectedOption">
          </anDropMenu>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            :to="{ name: 'article-edit' }"
          >
            <i class="ion-compose"></i>&nbsp;New Article
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'settings' }"
          >
            <i class="ion-gear-a"></i>&nbsp;Settings
          </router-link>
        </li>
        <li class="nav-item" v-if="currentUser.username">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{
              name: 'profile',
              params: { username: currentUser.username }
            }"
          >
            {{ currentUser.username }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import anDropMenu from "@/components/DropMenu";

export default {
  name: "RwvHeader",
  data: function() {
    return {
      config: {
        options: [
          {
            value: "uploadScript",
            path: "/upload"
          },
          {
            value: "本功能停用"
          }
        ],
        prefix: "",
        backgroundColor: "white",
        placeholder: "SmartControl",
        width: 150,
        icon: "ion-briefcase",
        textColor: "#b2b2b2",
        textHoverColor: "#666666"
      }
    };
  },
  components: {
    anDropMenu
  },
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
  },
  methods: {
    setSelectedOption(o) {
      // console.log(o.path);
      if (o.path) {
        this.$router.push({ path: o.path });
      }
    }
  }
};
</script>
