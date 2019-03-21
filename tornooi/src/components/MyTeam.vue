vue.<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import Match from './Match.vue'


export default Vue.extend({
    name: 'my-team',
    components:{
        Match
    },
    data () {
        return {
            teamData:{},
            matches:[]
            }
    },
    computed: {
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
             (match.outTeamScore !== undefined  ||  match.outTeamScore !== null)
            ||
            (match.homeTeamScore !== undefined ||  match.homeTeamScore !== null)
            );
        }
    },
    mounted () {
    // fetch the data when the view is created and the data is
    // already being observed
      axios
            .get(`${process.env.VUE_APP_API_BASE_URL}/teaminfo/${this.$route.params.id}`,
                {withCredentials:true}
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
                {withCredentials:true})
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
    <md-button class="md-icon-button" v-on:click="changeTeamClicked()">
        <md-icon>loop</md-icon>
    </md-button>
    <div>{{teamData.name}}</div>
    <div v-if="teamData.group">
        <router-link :to="{ name: 'group', params: { id: teamData.group.id }}">
            Group: {{teamData.group.name}}
        </router-link>
    </div>
    <div>Some Stats</div>
    <h5>Volgende Matchen:</h5>
    <div  v-for="(unPlayedMatch) in unPlayedMatches" :key="unPlayedMatch.id">
        <match v-bind:match="unPlayedMatch"></match>
    </div>
    <h6>Voorbije Matchen:</h6>
    <div  v-for="(playedMatch) in playedMatches" :key="playedMatch.id">
        <match v-bind:match="playedMatch"></match>
    </div>
</div>
  

</template>

