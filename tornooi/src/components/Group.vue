Vue.<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import MatchList from './MatchList.vue'
import GroupRank from './GroupRank.vue'

export default Vue.extend({
    name:'Group',
    components:{
        MatchList, GroupRank
    },
    data(){
        return{
            group:undefined,
            selectedGroupId:undefined,
            leagues:undefined,
            selectedLeagueIndex:undefined


        }
    },
    mounted(){
        if(this.$route.params.id){
            this.selectedGroupId = this.$route.params.id;
        }
        axios.get(`${process.env.VUE_APP_API_BASE_URL}/all/leagues`,{withCredentials:false})
        .then(response => {
            this.leagues = response.data;
            if(this.selectedLeagueIndex === undefined){
                this.selectedLeagueIndex = 0;
            }
            if(!this.selectedGroupId){
                this.selectedGroupId = this.leagues[this.selectedLeagueIndex].groups[0].id;
            }
        })
    },
    watch:{
        selectedGroupId: function(){
            this.loadAndSetGroupData(this.selectedGroupId);
        }
    },
    methods:{
        loadAndSetGroupData : function (groupId) {
            axios.get(`${process.env.VUE_APP_API_BASE_URL}/group/${groupId}`,
                {withCredentials:false}
            )
            .then(response => 
                {
                    this.group = response.data
                }
        );
        }
    }

})
</script>
<template>
<div>
    <div class="header">
        <div class="row" v-if="selectedLeagueIndex !== undefined && leagues !== undefined">
               <div class="header-button" 
               v-bind:class="{ active: selectedLeagueIndex === index }" 
               v-for="(league,index) of leagues" 
               :key="league.id" 
               v-on:click="selectedLeagueIndex = index">
                {{league.name}}
               </div>
        </div>
        <div class="row" v-if="selectedLeagueIndex !== undefined && leagues !== undefined">
            <div class="header-button" 
            v-bind:class="{ active: selectedGroupId === group.id }" 
            v-for="group of leagues[selectedLeagueIndex].groups" 
            :key="group.id" v-on:click="selectedGroupId = group.id">
                {{group.name}}
            </div>
        </div>
        
    </div>
    <div v-if="group && group.teams">
        <group-rank v-bind:teams="group.teams"></group-rank>
        <match-list v-bind:matches="group.matches"></match-list>
    </div>
</div>
</template>

<style>
.active{
    color: white;
    font-weight: bold;
}
</style>


