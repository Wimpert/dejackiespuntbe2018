vue.<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'group-rank',
    props:{
        teams: Array
    }
})
</script>
<template>
    <div id="table-container">
    <table>
        <thead>
            <tr>
                <th>
                    #
                </th>
                <th>
                </th>
                <th>P</th>
                <th>M</th>
                <th>W</th>
                <th>V</th>
                <th>G</th>
                <th>GS</th>
                <th>GT</th>
            </tr>
        </thead>
        <tbody>
             <tr v-for="(team, index) in teams" :key="team.id">
                <td>{{index + 1 }}.</td>
                <td class="text-container">{{team.name}}</td>
                <td class="number-container">{{team.points}}</td>
                <td class="number-container">{{team.matchesPlayed}}</td>
                <td class="number-container">{{team.matchesWon}}</td>
                <td class="number-container">{{team.matchesLost}}</td>
                <td class="number-container">{{team.matchesDrawed}}</td>
                <td class="number-container">{{team.goalsScored}}</td>
                <td class="number-container">{{team.goalsConcieved}}</td>
            </tr>
        </tbody>
    </table>
    </div>
</template>
<style>
td{
   text-align: start
}
#table-container{
    margin: 4px;
}
table{
    width: 100%;
}
.number-container{
    width: 2em;
    text-align: end;
}
.text-container{
    text-overflow: ellipsis;
    overflow: hidden; 
    white-space: nowrap;
}
th{
    text-align: end;
}
</style>


