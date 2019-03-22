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
    width: 100%;
}
table{
    width: 100%;
}
.number-container{
    min-width: 1,5em;
    text-align: center;
}
.text-container{
    text-overflow: ellipsis;
    overflow: hidden; 
    white-space: nowrap;
    max-width: 80px;
}
th:first-of-type{
    text-align: start;
}
th{
    text-align: center;
}
</style>


