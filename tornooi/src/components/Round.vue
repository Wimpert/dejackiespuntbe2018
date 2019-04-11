<script lang="ts">
import Vue from "vue";
import axios from "axios";
import MatchList from "./MatchList.vue";
import TournamentHeader from "./TournamentHeader.vue";

export default Vue.extend({
  name: "Round",
  components: {
    MatchList,
    TournamentHeader
  },
  data() {
    return {
      round: undefined,
      selectedRoundId: undefined,
      leagues: undefined,
      selectedLeagueIndex: undefined
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.selectedRoundId = this.$route.params.id;
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
        if (!this.selectedRoundId) {
          this.selectedRoundId = this.leagues[
            this.selectedLeagueIndex
          ].rounds[0].id;
        }
      });
  },
  watch: {
    selectedRoundId: function() {
      if (this.selectedRoundId !== undefined) {
        this.loadAndSetRoundData(this.selectedRoundId);
      }
    }
  },
  methods: {
    loadAndSetRoundData: function(roundId) {
      axios
        .get(`${process.env.VUE_APP_API_BASE_URL}/round/${roundId}`, {
          withCredentials: false
        })
        .then(response => {
          this.round = response.data;
        });
    },
    handleSubPropClicked: function(id) {
      this.selectedRoundId = id;
    },
    handleLeagueClicked: function(index) {
      this.selectedLeagueIndex = index;
      this.selectedRoundId = undefined;
      this.round = undefined;
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
      v-bind:selectedSubPropId="selectedRoundId"
      v-bind:selectedLeagueIndex="selectedLeagueIndex"
      v-bind:subPropName="'rounds'"
    ></tournament-header>
    <match-list v-if="round && round.matches" v-bind:matches="round.matches"></match-list>
  </div>
</template>

