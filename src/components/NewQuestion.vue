<template>
	<div class="container slightpurple">
		<div class="container white form-parent z-depth-5">
			<h2 class="bold neblue">Add Question</h2>
			<form class="container" @submit.prevent="submit">

				<div class="input-field">
					<textarea id="question-title" v-model="newQuestion.prompt"
					type="text" class="validate materialize-textarea" 
					required @submit.prevent="test"></textarea>
					<label for="question-title">Question Title</label>
					<span class="helper-text" data-success=""
					data-error="Please enter a question title"></span>
				</div>

				<div class="response" v-if="newQuestion.responses.length>0" 
					v-for="(responseObj, index) in newQuestion.responses" :key="index">
					<div class="input-field" v-if="responseObj">
						<label for="answer" class="active">Response text:</label>
						<textarea type="text" name="answer" class="materialize-textarea"
						v-model="responseObj.name" @keydown.enter.prevent="test"></textarea>
						<span v-if="responseObj.name" class="helper-text"></span>
						<i class="material-icons delete neg-txt" 
						@click="deleteResponse(index)">
							delete
						</i>
					</div>
				</div>

				<div class="newResponse input-field">
					<label for="newAnswer">Add new response:</label>
					<textarea type="text" name="newAnswer" 
					class="validate materialize-textarea"
					@keydown.enter.prevent="addResponse(newQuestion.newResponse.name)"
					v-model="newQuestion.newResponse.name"></textarea>
					<span class="helper-text"
				  data-error="Please enter a valid response"></span>
				  <i class="material-icons add pos-txt circle" 
				  @click="addResponse(newQuestion.newResponse.name)">add_circle</i>
				</div>

				<div class="btn-container">
					<span>
						<button class="btn btn-orange" @click="cancel">
							&emsp; Cancel &emsp;
						</button>
					</span>

					<span>
						<button class="btn" type="submit" name="action">
							&emsp; Add Question &emsp;
						</button>
					</span>
				</div>

			</form>
		</div>

	</div>
</template>

<script>
	import db from '@/firebase/init'
	export default {
		name: 'NewQuestion',
		data() {
			return {
				newQuestion: {
					prompt: null,
					responses: [],
					newResponse: {
						name: null,
						isValid: false,
						errorMsg: null
					}
				}
			}
		},
		methods: {
			test(param="Test") {
				console.log(param)
			},
			addResponse(response) {
				this.newQuestion.responses.push({
					name: response,
					isValid: false,
					errorMsg: null
				})
				this.newQuestion.newResponse.name = null
			},
			deleteResponse(index) {
				this.newQuestion.responses.splice(index, 1)
			},
			submit() {
				let updatedResponses = []
				for (let response of this.newQuestion.responses) {
					updatedResponses.push(response.name)
				}
				updatedResponses.push(this.newQuestion.newResponse.name)
				db.collection('questions').add({
					choice: false,
					prompt: this.newQuestion.prompt,
					responses: updatedResponses
				}).then(() => this.$router.push({name: 'Options'}))
				.catch(err => console.log(err))
			},
			cancel() {
				this.$router.push({name: 'Options'})
			}
		},
		mounted() {
    M.AutoInit();
  }
	}
	
</script>

<style scoped>
	h2 {
		padding-top: 1rem;
		text-align: center;
	}
	.form-parent {
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 2rem;
		padding-bottom: 2rem;
	}
	.test {
		border: 1px red dotted;
	}
	.input-field {
		padding: 0 1rem;
	}

	.field {
		margin: 20px auto;
		position: relative;
	}
	.delete {
		position: absolute;
		right: -1rem;
		bottom: 1.3em;
		cursor: pointer;
	}
	.add {
		position: absolute;
		right: -1rem;
		bottom: 1.3em;
		cursor: pointer;
	}
	.btn-container {
		width: 100%;
		display: inline-flex;
		justify-content: space-between;
	}
</style>