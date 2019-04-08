vue.<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import MatchList from './MatchList.vue'


export default Vue.extend({
    name: 'team',
    components:{
        MatchList
    },
    data () {
        return {
            teamData:{},
            matches:[]
            }
    },
    computed: {
        selectedTeam: function() {
            if(!this.$route || !this.$route.params || !this.$route.params.id){
                    return false;
                }
            return window.localStorage.getItem(process.env.VUE_APP_LOCALSTORAGE_TEAM_ID_KEY_NAME).toString() === this.$route.params.id.toString();
        },
        matchIDs:   function () {
            let returnVal = [];
            if(this.teamData){
                if(this.teamData.homeMatches){
                    returnVal = [... returnVal, ...this.teamData.homeMatches];
                }
                if(this.teamData.outMatches){
                    returnVal = [... returnVal, ...this.teamData.outMatches];
                }
            }
            return returnVal
        },
        playedMatches: function(){
            return this.matches.filter((match) => 
            (match.outTeamScore !== undefined  &&  match.outTeamScore !== null)
            &&
            (match.homeTeamScore !== undefined &&  match.homeTeamScore !== null)
            );
        },
        unPlayedMatches: function(){
            return this.matches.filter((match) => 
                match.outTeamScore === undefined  ||  match.outTeamScore === null
                    ||
                match.homeTeamScore === undefined ||  match.homeTeamScore === null
            );
        }
    },
    mounted () {
      axios
      .get(`${process.env.VUE_APP_API_BASE_URL}/teaminfo/${this.$route.params.id}`,
                {withCredentials:false}
            )
            .then(response => 
                {
                    this.teamData = response.data
                }
                )
    },
    watch: {
       matchIDs: function() {
           const idsAsString = this.matchIDs.reduce((acc,match) =>  acc+match.id+',','');
             axios
            .get(`${process.env.VUE_APP_API_BASE_URL}/match?ids=${idsAsString}`,
                {withCredentials:false})
            .then(
                    response => {
                        this.matches = response.data
                    }
                ); 
       }
    },
    methods: {
        changeTeamClicked: function(){
            window.localStorage.removeItem(process.env.VUE_APP_LOCALSTORAGE_TEAM_ID_KEY_NAME);
            this.$router.push({path:'/team'});
        }
    }
})
</script>
<template>
<div>
    <md-button v-if="selectedTeam" class="md-icon-button" v-on:click="changeTeamClicked()">
        <md-icon>swap_horiz</md-icon>
    </md-button>
    <div>{{teamData.name}}</div>
    <div v-if="teamData.group">
        <router-link :to="{ name: 'group', params: { id: teamData.group.id }}">
            Group: {{teamData.group.name}}
        </router-link>
    </div>
    <div>Some Stats</div>
    <h5>Volgende Matchen:</h5>
    <match-list v-bind:matches="unPlayedMatches"></match-list>
    <h6>Voorbije Matchen:</h6>
    <match-list v-bind:matches="playedMatches"></match-list>
</div>
  

</template>

