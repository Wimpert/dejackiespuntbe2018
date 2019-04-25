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
            matches:[],
            activeMenuItem: 1,
            played:0,
            won:0,
            lost:0,
            drawed:0,
            goalsScored:0,
            goalsConcieved:0
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
                        this.matches = response.data;
                        this.refreshStats();
                    }
                ); 
       }
    },
    methods: {
        changeTeamClicked: function(){
            window.localStorage.removeItem(process.env.VUE_APP_LOCALSTORAGE_TEAM_ID_KEY_NAME);
            this.$router.push({path:'/team'});
        },
        refreshStats: function (){
           this.played = 0
            this.won = 0
       this.lost = 0
     this.drawed = 0
    this.goalsScored = 0
  this.goalsConcieved = 0
  console.log(this.matches);
                this.matches.forEach(match => {
                    this.played++;
                    if(match.homeTeam.id.toString() === this.$route.params.id){
                        //is home:
                        if(match.homeTeamScore > match.outTeamScore){
                            this.won++;
                        } else if(match.homeTeamScore > match.outTeamScore){
                            this.lost++;
                        } else {
                            this.drawed++;
                        }
                        this.goalsScored =+ match.homeTeamScore;
                        this.goalsConcieved =+ match.outTeamScore;
                    } else {
                        //is out:
                        //is home:
                        if(match.homeTeamScore > match.outTeamScore){
                            this.lost++;
                        } else if(match.homeTeamScore > match.outTeamScore){
                            this.won++;
                        } else {
                            this.drawed++;
                        }
                        this.goalsScored =+ match.outTeamScore;
                        this.goalsConcieved =+ match.homeTeamScore;
                    }
                });
        }
    }
})
</script>
<template>
<div class="team-container team-data">
    <div class="header">
        <div class="row">
            <div class="header-button team-name">
                <md-button v-if="selectedTeam" class="md-icon-button md-dense" v-on:click="changeTeamClicked()">
                    <md-icon style="color:white">keyboard_arrow_left</md-icon>
                </md-button>
                {{teamData.name}}
            </div>
        </div>
        <div class="row">
            <div class="header-button" v-bind:class="{active: activeMenuItem === 1}" v-on:click="activeMenuItem = 1">
                <md-icon>timer</md-icon>
                <span>Matchen</span>  
            </div>
            <div class="header-button" v-bind:class="{active: activeMenuItem === 2}" v-on:click="activeMenuItem = 2">
                <md-icon>equalizer</md-icon>
                <span>Statistieken</span>
            </div> 
        </div>
       
    </div>
    <div v-if="activeMenuItem === 1">
        <div>
        <div v-if="teamData && teamData.group" class="group-link">
                <router-link :to="{ name: 'group', params: { id: teamData.group.id }}" class="jackies-router">
                <div>
                <md-icon>list</md-icon>  Group {{teamData.group.name}} <md-icon>zoom_in</md-icon>
                </div> 
                </router-link>
            </div>
     </div>
        <div>Volgende Matchen:</div>
        <match-list v-bind:matches="unPlayedMatches"></match-list>
         <div>Voorbije Matchen:</div>
        <match-list v-bind:matches="playedMatches"></match-list>
    </div>
    <div id="stats-container" v-if="activeMenuItem === 2">
        <h4>Statistieken:</h4>
        <div>
            Matchen gespeeld: {{this.played}}
        </div>
        <div>
            Matchen gewonnen: {{this.won}}
        </div>
        <div>
            Matchen gerloren: {{this.lost}}
        </div>
        <div>
            Matchen gelijk: {{this.drawed}}
        </div>
        <div>
            goals gemaakt: {{this.goalsScored}}
        </div>
        <div>
            goals tegen: {{this.goalsConcieved}}
        </div>
        <div>
            saldo: {{this.goalsScored - this.goalsConcieved}}
        </div>
    </div>
    
</div>
</template>
<style>

    .team-data{
        display: flex;
        flex-direction: column;
    }

    .team-name, .team-name button.md-button{
        color: white !important;
        font-size: 1.1em;
        font-weight: bold;
    }
    
    .header{
        display: flex;
        flex-direction: column;
    }
    
    .jackies-router{
        color: darkslategray !important;
        margin: 5px;
    }

    .group-link{
        font-size: 1.2em;
    }

    #stats-container > div{
        margin: 15px;
        text-align: start;
    }


</style>


