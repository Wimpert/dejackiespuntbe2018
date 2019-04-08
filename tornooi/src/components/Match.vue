Vue.<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name:'match',
    props: {
        match : Object
    },
    computed: {
        homeTeamScore: function(){
            return this.match.homeTeamScore !== undefined && this.match.homeTeamScore !== null ? this.match.homeTeamScore : '-' 
        },
        homeTeamPenaltyScore: function(){
            return this.match.homeTeamPenaltyScore !== undefined && this.match.homeTeamPenaltyScore !== null ? `(${this.match.homeTeamPenaltyScore})` : '' 
        },
        outTeamScore: function(){
            return this.match.outTeamScore !== undefined && this.match.outTeamScore !== null ? this.match.outTeamScore : '-' 
        },
        outTeamPenaltyScore: function(){
            return this.match.outTeamPenaltyScore !== undefined && this.match.outTeamPenaltyScore !== null ? `(${this.match.outTeamPenaltyScore})` : '' 
        },
    }
})
</script>
<template>
    <md-card class="match-container">
        <div>
            <div>
                {{match.hour.toString().padStart(2,'0')}}:{{match.minutes.toString().padStart(2,'0')}}  T{{match.terrain}} 
            </div>
            <div class="match-team-name-container">
                <router-link :to="{ name: 'team', params: { id: match.homeTeam.id }}">{{match.homeTeam.name}}</router-link>
            </div>
            <div>
                {{homeTeamScore}} {{homeTeamPenaltyScore}}
            </div>
        </div> 
        <div>
              <div>
               {{match.comment}}
            </div>
            <div class="match-team-name-container">
                <router-link :to="{ name: 'team', params: { id: match.outTeam.id }}">{{match.outTeam.name}}</router-link>
            </div>
            <div>
             {{outTeamScore}} {{outTeamPenaltyScore}}
            </div>
        </div>
    </md-card>
</template>
<style>
.match-container{
    display: flex;
    flex-direction: column;
    padding: 5px;
    margin: 6px 3px;
    width: 100%;
}
.match-container > div{
    display: flex;
    flex-direction: row;
    width: 100%;
}

.match-container > div > div{
  text-align: start;
  padding: 2px 4px;
  border-right: 1px solid lightblue;
}

.match-team-name-container{
    flex-grow: 1;
}

.match-container > div > div:first-of-type{
    width: 20%;
    text-align: start;
}

.match-container > div > div:last-of-type{
    width: 2.7em;
    text-align: start;
    border-right: none;
}
</style>

