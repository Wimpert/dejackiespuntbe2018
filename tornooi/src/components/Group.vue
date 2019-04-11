Vue.<script lang="ts">
import Vue from "vue";
import axios from "axios";
import MatchList from "./MatchList.vue";
import GroupRank from "./GroupRank.vue";
import TournamentHeader from "./TournamentHeader.vue";

export default Vue.extend({
  name: "Group",
  components: {
    MatchList,
    GroupRank,
    TournamentHeader
  },
  data() {
    return {
      group: undefined,
      selectedGroupId: undefined,
      leagues: undefined,
      selectedLeagueIndex: undefined
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.selectedGroupId = this.$route.params.id;
    }
    axios
      .get(`${process.env.VUE_APP_API_BASE_URL}/all/leagues`, {
        withCredentials: false
      })
      .then(response => {
        this.leagues = response.data;
        if (this.selectedLeagueIndex === undefined) {
          this.selectedLeagueIndex = 0;
        }
        if (!this.selectedGroupId) {
          this.selectedGroupId = this.leagues[
            this.selectedLeagueIndex
          ].groups[0].id;
        }
      });
  },
  watch: {
    selectedGroupId: function() {
      if (this.selectedGroupId !== undefined) {
        this.loadAndSetGroupData(this.selectedGroupId);
      }
    }
  },
  methods: {
    loadAndSetGroupData: function(groupId) {
      axios
        .get(`${process.env.VUE_APP_API_BASE_URL}/group/${groupId}`, {
          withCredentials: false
        })
        .then(response => {
          this.group = response.data;
        });
    },
    handleSubPropClicked: function(id) {
      this.selectedGroupId = id;
    },
    handleLeagueClicked: function(index) {
      this.selectedLeagueIndex = index;
      this.selectedGroupId = undefined;
      this.group = undefined;
    }
  }
});
</script>
<template>
  <div>
    <tournament-header
      v-bind:leagues="leagues"
      @subPropClicked="handleSubPropClicked"
      @leagueClicked="handleLeagueClicked"
      v-bind:selectedSubPropId="selectedGroupId"
      v-bind:selectedLeagueIndex="selectedLeagueIndex"
    ></tournament-header>
    <div v-if="group && group.teams">
      <group-rank v-bind:teams="group.teams"></group-rank>
      <match-list v-bind:matches="group.matches"></match-list>
    </div>
  </div>
</template>

<style>
</style>


