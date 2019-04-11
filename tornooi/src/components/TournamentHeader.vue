<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'tournament-header',
    props: {
        leagues: Array,
        subPropName: {
            default:'groups'
        },
        selectedLeagueIndex: {
            default:0
        },
        selectedSubPropId:{
            default:0
        }
    },
    methods: {
        leagueClicked: function(index){
           this.$emit('leagueClicked', index);
        },
        subPropClicked: function(id){
            this.$emit('subPropClicked', id);
        },

    }
    
})
</script>
<template>
    <div class="header" v-if="leagues">
        <div class="row" v-if="selectedLeagueIndex !== undefined && leagues !== undefined">
               <div class="header-button" 
               v-bind:class="{ active: selectedLeagueIndex === index }" 
               v-for="(league,index) of leagues" 
               :key="league.id" 
               v-on:click="leagueClicked(index)">
                {{league.name}}
               </div>
        </div>
        <div class="row" v-if="selectedLeagueIndex !== undefined && leagues !== undefined">
            <div class="header-button" 
            v-bind:class="{ active: selectedSubPropId === obj.id }" 
            v-for="obj of leagues[selectedLeagueIndex][subPropName]" 
            :key="obj.id" v-on:click="subPropClicked(obj.id)">
                {{obj.name}}
            </div>
        </div>
    </div>
</template>

