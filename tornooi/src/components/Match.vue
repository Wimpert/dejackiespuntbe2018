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
    <div class="match-container">
        <div>
            <div>
                {{match.hour.toString().padStart(2,'0')}}:{{match.minutes.toString().padStart(2,'0')}}
            </div>
            <div class="match-team-name-container">
                {{match.homeTeam.name}}
            </div>
            <div>
                {{homeTeamScore}} {{homeTeamPenaltyScore}}
            </div>
        </div> 
        <div>
              <div>
                Terrein {{match.terrain}}
            </div>
            <div class="match-team-name-container">
                {{match.outTeam.name}}
            </div>
            <div>
             {{outTeamScore}} {{outTeamPenaltyScore}}
            </div>
        </div>
    </div>
</template>
<style>
.match-container{
    display: flex;
    flex-direction: column;
    padding: 5px;
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
    width: 20%;
    text-align: end;
    border-right: none;
}
</style>

