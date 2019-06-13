<template>
	<div class="parent neblue">
		<div class="container slightpurple z-depth-5">
			<h2 class="neblue center-align">Questions</h2>
			<div v-if="questions" class="container-wide">
				
				<form @submit.prevent="submitResponses">
					<div class="question section white z-depth-2" 
					v-for="question in questions" :key="question.prompt">
						<div>
							<h4 class="flow-text bold black-text">{{question.prompt}}</h4>
							<div v-for="(response, index) in question.responses" :key="index">
								<p>
									<label>
										<input type="radio" :name="question.prompt" class="with-gap"
										:value="response" v-model="question.choice"/>
										<span class="response flow-text">{{response}}</span>
									</label>
								</p>
							</div>
							<span class="neblue" v-if="question.choice">
								Your answer: {{question.choice}}
							</span>
							<div class="divider"></div>
						</div>
					</div>

			<div class="center-align">
				<button class="btn"> 
					&emsp; &emsp; &emsp; Submit &emsp; &emsp; &emsp; 
				</button>
			</div>
		</form>

		</div>
		<div v-else>
			<LoadingBar />
		</div>

		</div>
	</div>
</template>

<script>
	import LoadingBar from '@/components/LoadingBar'
	import db from '@/firebase/init'
	export default {
		name: 'Questionnaire',
		components: { LoadingBar },
		data() {
			return {
			questions: null
			}
		},
		methods: {
			submitResponses() {
				let response = {}
				for (let question of this.questions) {
					response[question.id] = question.choice
				}
				db.collection('responses').add(response)
				.then(this.$router.push({
					name: 'Responses', 
					params: {yourResponse: response}}))
				.catch(err => console.log(err))
			}
		},
		created() {
				this.questions = []
				db.collection('questions').get().then(snapshot => {
					snapshot.forEach(doc => {
						let question = doc.data()
						question.id = doc.id
						this.questions.push(question)
					})
				}).catch(err => console.log(err))
			},
		mounted() {
    	M.AutoInit()
  	}
	}
	
</script>

<style scoped>

.btn {
	font-size: 1.5rem;
	margin: 1rem;
}

.container {
	padding-bottom: 0;
}
.container-wide {
	margin: 0 1.5rem;
}

.parent {
	padding-bottom: 0;
}

.question {
	padding: 2rem;
}
.response {
	color: #555659;
}
.response:hover {
	color: #3f4cec;
}
	h2 {
		margin: 0rem; 
		padding: 1rem;
	}
</style>