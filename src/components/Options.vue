<template>
	<div class="container slightpurple z-depth-5">
		<h2 class="bold neblue">Edit Questions</h2>

			<!-- Login modal -->
			<modals-container/>
			<modal name="warning" @before-open="beforeOpen"
			height="auto" :scrollable="true"
			adaptive='true' resizable='true'>
				<div class="modal-wrapper container">
					<div class="row">
						<div class="col">

						<p class="bold">You are about to delete the following question:</p> 
						<blockquote>{{questionName}}</blockquote>
						<p class="bold">Are you sure you want to do this? 
						This action is permanent! (Confirm if you wish to crush this 
						question, see it deleted before you, and hear the lamentation 
						of the database)</p>
						<div class="btn-container center">
							<div class="btn btn-orange btn-modal" @click="hide">
								Cancel
							</div>
							<div class="btn btn-modal" @click="deleteQuestion(questionIndex)">
								Yes, I'm Sure
							</div>
						</div>

						</div>
					</div>
				</div>
			</modal>

		<!-- Edit Questions -->
		<div v-if="!retrieved">
			<LoadingBar />
		</div>

		<div class="options">
			<div v-if="retrieved" class="card-wrapper"
			v-for="(question, index) in questions"
			:key="index">

				<!-- Icons -->
				<i class="material-icons delete circle hoverable"
				title="Delete Question"
				@click="show({questionNameModal: question.prompt,
											questionIndexModal: index})">
					clear
				</i>

				<i class="material-icons edit circle hoverable" 
				title="Edit Question"
				@click="editQuestion(question)">
					edit
				</i>

				<!-- Question card -->
				<div class="card z-depth-2">
					<div class="question-title  ">
						<h6 class="bold">{{question.prompt}}</h6>
					</div>
					<ul>
						<li class="response" 
						v-for="(response, index) in question.responses">
							{{question.responses[index]}}
						</li>
					</ul>
				</div>

		</div>

			<!-- New Question -->
			<div class="card-wrapper"">
				<router-link  :to="{name: 'NewQuestion'}" class="tooltipped"
				data-position="top" data-tooltip="Create New Question">
					<div class="card add-card z-depth-2 hoverable">
						<div class="question-title new bold"><h5>New Question</h5></div>
						<ul class="">
								<li class="response">Response</li>
								<li class="response">Another Response</li>
						</ul>
						<i class="material-icons add circle">add</i>
					</div>
				</router-link>
			</div>

		</div>
	</div>
</template>


<script>
	import db from '@/firebase/init'
	import LoadingBar from '@/components/LoadingBar'

	export default {
		name: 'Options',
		components: {LoadingBar},
		data() {
			return {
				retrieved: false,
				questions: [],
				questionName: null, 
				questionIndex: null 
				// questionsBackup: [] //Uncomment when backing up
			}
		},
		methods: {
			test(param="Testing") {
				console.log(param)
			},
			show (dataObj=null) {
		    this.$modal.show('warning', dataObj)
		  },
		  hide (modalName=null) {
		    this.$modal.hide('warning')
		  },
		  beforeOpen(event) {
		  	this.questionName = event.params.questionNameModal
		  	this.questionIndex = event.params.questionIndexModal
		  },
			importQuestions(snapshot) {
				this.retrieved = true
				snapshot.forEach(doc => {
					let question = doc.data()
					question.id = doc.id
					this.questions.push(question)

				})
				//Uncomment only when you want to backup! Will alter db!
				// this.backupQuestions() // To do: drop question.id first
			},
			backupQuestions() {
				for (let questionObj of this.questions) {
					db.collection('questions-backup').add(questionObj)
					.then(() => {
						console.log("Questions have been backed up!")
						M.toast({html: 'Questions backed up!'})
						.catch(err => console.log(err))
					})
				}

			},
			test(param="Test") {
				console.log(param)
			},
			deleteQuestion(index) {
				console.log(this.questions[index].id) //
				db.collection('questions').doc(this.questions[index].id)
				.delete().then(() => this.questions.splice(index, 1))
				.catch(err => console.log(err))
				this.hide()
			},
			editQuestion(question) {
				this.$router.push({
					name: 'EditQuestion', 
					params: {question_slug: question.id}
				})
			}
		},
		created() {
			db.collection('questions').get().then(this.importQuestions)
			.catch(err => console.log(err))
		},
		mounted() {
    	M.AutoInit()
  	}
	}
</script>

<style scoped>
	.test {
		border: 1px red dotted;
	}
	.options {
		padding: 1rem;
		display: inline-flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}
	.card-wrapper {
		position: relative;
		margin: 0 1rem;
	}
	.card {
		position: relative;
		display: inline-block;
		padding: .5rem 2.5rem;
		width: 250px;
		height: 300px;
		overflow: auto;
		flex: 0 2 auto;
	}
	.icon-wrapper-wrapper {
		position: fixed;
		top: 100px;
		right: 0;
		left: 0;
	}
	.delete-wrapper {
		position: absolute;
	}
	.material-icons.delete {
		right: 1.3rem;
    top: 1rem;
		z-index: 10;
		font-size: 1.5rem;
		color: white;
		background-color: #ea79ad;
		position: absolute;
		cursor: pointer;
		padding: .1rem;
		transition: .4s;
	}
	.material-icons.delete:hover {
		background-color: #cb3f7f;
	}
	.material-icons.edit {
		right: 1.3rem;
    bottom: 2rem;
		z-index: 10;
		font-size: 1.5rem;
		color: white;
		background-color: #3dc889;
		transition: .4s;
		position: absolute;
		cursor: pointer;
		padding: .1rem;
	}
	.material-icons.edit:hover {
		background-color: #17AC67;
	}
	.material-icons.add {
		right: .5rem;
    bottom: .5rem;
		color: white;
		font-size: 2rem;
		background-color: #17AC67;
		position: absolute;
		cursor: pointer;
	}
	.add-card {
		position: relative;
	}
	.question-title {
		color: black;
		margin-right: .5rem;
	}
	.question-title.new {
		text-align: center;
	}
	.edit-question {
		position: absolute;
		bottom: 5px;
		right: 5px;
		cursor: pointer;
	}
	.modal-wrapper {
		padding: 1rem 0;
	}
	.btn-modal {
		margin: 1rem;
	}
	a {
		display: inline-block;
	}
	li.response {
		font-size: 1rem;
		list-style-type: square;
		list-style-position: inside;
		color: black;
	}
	h2 {
		text-align: center;
		margin-top: 1rem;
		margin-bottom: 0;
	}
</style>