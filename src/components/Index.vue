<template>
	<div class="row">  
    <div class="col l4 m6 offset-l4 offset-m3">
      <div class="card z-depth-5">
        <div class="card-content">
          <div class="descriptor">SURVEY</div>
          <span class="card-title bold">{{cardTitle}}</span>
          <p>{{cardText}}</p>
        </div>
        <div class="card-action" @click="gotoSurvey">
          <p class="white-text">Take the Survey</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		name: 'Index',
		data () {
			return {
				cardTitle: 'A moment of your time, please?',
				cardText: "Can we trouble you to ask a question or two? We'll remember your kindness when we've achieved world domination, rest assured!",
			}
    },
    methods: {
      gotoSurvey() {
        this.$router.push({name: "Questionnaire"})
      }
    },
    mounted() {
      M.AutoInit();
    }
  }
	
</script>

<style scoped>

  div.card-action {
    background-color: #3dc889;
    align-content: center;
    text-align: center;
    transition: .2s;
    padding: .1rem;
  }

  div.card-action:hover {
    background-color: #17AC67;
    cursor: pointer;
  }

  .no-side-pads {
    padding-left: 0;
    padding-right: 0;
  }

</style>