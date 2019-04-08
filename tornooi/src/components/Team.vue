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
<div class="team-container team-data">
    <div class="header">
        <div class="row">
            <div class="team-name-container">Team: {{teamData.name}}</div>
            <div>
            <md-button v-if="selectedTeam" class="md-icon-button md-dense" v-on:click="changeTeamClicked()">
                <md-icon>swap_horiz</md-icon>
            </md-button>
           <md-button class="md-icon-button md-dense">
                <md-icon>cached</md-icon>
            </md-button>
            </div>  
        </div>
        <div class="row header-button-bar">
            <div v-if="teamData.group" class="header-button">
                <router-link :to="{ name: 'group', params: { id: teamData.group.id }}">
                <div>
                <md-icon>list</md-icon>  Group {{teamData.group.name}}
                </div> 
                </router-link>
            </div>
            <div class="header-button">
                <md-icon>timer</md-icon> Matchen
            </div>
            <div class="header-button">
                <md-icon>equalizer</md-icon> Statistieken
            </div>
        </div>
       
    </div>
    <h5>Volgende Matchen:</h5>
    <match-list v-bind:matches="unPlayedMatches"></match-list>
    <h6>Voorbije Matchen:</h6>
    <match-list v-bind:matches="playedMatches"></match-list>
</div>
</template>
<style>

    .team-data{
        display: flex;
        flex-direction: column;
    }
    .header{
        display: flex;
        flex-direction: column;
    }
    .row{
        display: flex;
        flex-direction: row;
        align-items: center
    }
    .team-name-container{
        flex-grow: 1;
        text-align: start;
        font-size: 1.1em;
    }

    .header-button-bar{
        flex-grow: 1;
        align-items: flex-end;
    }
    .header-button{
        display: flex;
        align-items: center;
        flex-grow: 1;
        align-items: center;
        flex-basis: 100%;
    }

    .header a{
        color: darkslategray;
    }

</style>


