<template>
	<div class="container slightpurple">
		<div class="container form-parent white z-depth-5">
			<h2 class="neblue bold">Edit Question</h2>
				<form v-if="retrieved" @submit.prevent="submit">
					<div class="container">

						<!-- Question Title --> 
						<div class="question-title input-field">
							<label for="question-title" class="active">Question Text:</label>
							<textarea type="text" name="question-title" 
							class="validate materialize-textarea"
							@keypress.enter="" v-model="question.prompt">
							</textarea>
						</div>

						<!-- Editing a response -->
						<div class="response input-field" 
						v-for="(responseObj, index) in question.responses" :key="index">
							<label for="answer" class="active">Response text:</label>
							<textarea type="text" class="materialize-textarea" name="answer" 
							v-model="responseObj.name" @keydown.enter.prevent="test">
							</textarea>
							<i class="material-icons delete neg-txt" 
							@click="deleteResponse(index)">
								delete
							</i>
						</div>


						<!-- Create new response -->
						<div class="newResponse input-field">
							<label for="newAnswer">Add new response:</label>
							<textarea type="text" name="newAnswer" 
							class="materialize-textarea"
							@keydown.enter.prevent="addResponse(question)"
							v-model="question.newResponse.name"></textarea>
							<i class="material-icons add pos-txt circle" 
						  @click="addResponse(question)">add_circle</i>
						</div>

						<!-- Submit/Cancel Buttons -->
						<div class="btn-container">
							<span>
								<button class="btn btn-orange" @click="cancel">
									&emsp; Cancel &emsp;
								</button>
							</span>
							<span>
								<button class="btn" type="submit" name="action">
									Submit Edits
								</button>
							</span>
						</div>

					</div>
				</form>

			<div v-else>
			Loading...
			</div>

		</div>
	</div>
</template>

<script>
	import db from '@/firebase/init'
	export default {
		name: 'EditQuestion',
		data() {
			return {
				id: null,
				question: null,
				retrieved: false
			}
		},
		methods: {
			test(param=null) {
				console.log("testing")
			},
			testState(input) {
				console.log(input)
			},
			parseQuestion(snapshot) {
				this.question = snapshot.data()
				this.question.responses = this.objectifyResponses(
					this.question.responses)
				this.question.newResponse = {
					name: null, 
					isValid: false, 
					errorMsg: null}
				this.retrieved = true
			},
			objectifyResponses(responseArray) {
				let output = []
				for (let response of responseArray) {
					output.push({
						name: response,
						isValid: true,
						errorMsg: null})}
					return output
			},
			addResponse(question) {
				question.responses.push({
					name: this.question.newResponse.name,
					isValid: true,
					errorMsg: false
				})
				question.newResponse.name = null
			},
			deleteResponse(index) {
				this.question.responses.splice(index, 1)
			},
			submit() {
				let updatedResponses = []
				for (let response of this.question.responses) {
					updatedResponses.push(response.name)
				}
				db.collection('questions').doc(this.id).update({
					responses: updatedResponses
				}).then(() => this.$router.push({name: 'Options'}))
				.catch(err => console.log(err))
			},
			cancel() {
				this.$router.push({name: 'Options'})
			}
		},
		created() {
			this.id = this.$route.params.question_slug
			this.question = db.collection('questions').doc(this.id).get()
				.then(this.parseQuestion)
				.catch(err => console.log(err))
		},
		mounted() {
    	M.AutoInit();
  }
}

</script>

<style scoped>
	.form-parent {
		margin: 2rem auto;
		padding-bottom: 2rem;
	}
	.test {
		border: 1px red dotted;
	}
	.field {
		margin: 20px auto;
		position: relative;
	}
	.add {
		position: absolute;
		right: -1.8rem;
		bottom: .6em;
		cursor: pointer;
	}
	.delete {
		position: absolute;
		right: -1.8rem;
		bottom: .6em;
		cursor: pointer;
	}
	.btn-container {
		width: 100%;
		display: inline-flex;
		justify-content: space-between;
	}

	h2 {
		margin: 0;
		text-align: center;
		padding-top: 1rem;
	}
</style>