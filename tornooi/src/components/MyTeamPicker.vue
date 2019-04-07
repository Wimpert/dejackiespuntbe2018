vue.<script lang="ts">
import Vue from 'vue'
import axios from 'axios';
export default Vue.extend({
    name:'my-team-picker',
    data(){
        return {
            allTeams:[],
            chosenTeamId: undefined,
            err: undefined
            };
    },
    created(){
        axios
        .get(`${process.env.VUE_APP_API_BASE_URL}/all/teams`,
                {withCredentials:true}
        ).then(
            (response) => this.allTeams = response.data
        ).catch(
            (err) => this.err = err
        );
    },
    methods:{
        okClicked(){
            if(this.chosenTeamId){
                window.localStorage.setItem(process.env.VUE_APP_LOCALSTORAGE_TEAM_ID_KEY_NAME , this.chosenTeamId);
                this.$router.push({ path: `/team/${this.chosenTeamId}` }) 
            }
        }
    }
})
</script>
<template>
<div class="center-container">
    <div v-if="err">err</div>
    <h3>Kies je ploeg:</h3>
    <md-field>
     <md-select v-if="allTeams" name="my-team" v-model="chosenTeamId">
            <md-option v-for="(team) in allTeams" :key="team.id" :value="team.id">
                 {{ team.name }}
            </md-option>
          </md-select>
    </md-field>
    <md-button class="md-raised md-primary" v-on:click="okClicked()" :disabled="chosenTeamId === undefined">Ok</md-button>
</div>

</template>
<style>
.center-container{
    display: flex;
    flex-direction: column;
    padding: 10%;
}
</style>

