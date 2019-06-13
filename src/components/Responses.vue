<template>
	<div class="neblue">
		<div class="container slightpurple black-text center-align z-depth-5">
			<h2 class="bold neblue">Thank You!</h2>
			<p>Here's how everyone has answered those questions:</p>
			<div v-if="retrieved">

				<div v-for="(responses, question) of results" 
				:key='question' class="row section white z-depth-1">

					<div class="col s0 l4 offset-l1  xl4 offset-xl2">
						<p class="leftalign prompt-text flow-text">Question: {{questionLookup[question]}}</p>

						<p v-if='yourResponse' class="strong neblue leftalign flow-text response-text">
								Your response: 
								<span class="" v-if='yourResponse[question]'>
									{{yourResponse[question]}}
								</span>
								<span v-else>(None Selected)</span>
						</p>
					</div>

					<div class="col s12 l7 xl6 nopad">
						<div class="chart-wrapper nopad">
							<GChart type="PieChart" class="gchart"
										:settings="{packages: ['corechart']}"
									  :data="chartData[question]" 
										:options="chartOptions"/>   
						</div>
					</div>
					
				</div>
			</div>
			<div v-else>
				<LoadingBar />
			</div>

		</div>
	</div>
</template>

<script>
	import LoadingBar from '@/components/LoadingBar'
	import { GChart } from 'vue-google-charts'
	import db from '@/firebase/init'
	import PieChart from './PieChart.js'
	export default{
		name: 'Responses',
		props: ['yourResponse'],
		components: {LoadingBar, GChart, PieChart},
		data() {
			return {
				retrieved: false,
				responses: [],
				results: {},
				questionLookup: {},
				chartOptions: {
					pieHole: .2,
					chartArea: {
						backgroundColor: 'blue',
						left: 10
					},
					tooltip: {
						trigger: 'selection' 
					}
				},
				chartData: {}
			}
		},
		computed: {
			questions() {
				return Object.keys(this.results)
			}
		},
		methods: {
			populateResponses(snapshot) {
				snapshot.forEach(doc => {
					let entry = doc.data()
					let snapKeys = Object.keys(entry)
					if (snapKeys.every(key => Object.keys(this.questionLookup)
						.includes(key))){
							this.responses.push(entry) 
							this.tallyResponses(entry)
					}
				})
				this.buildChartData()
				this.retrieved = true 
			},
			tallyResponses(entry) {
				let questionIDs = Object.keys(entry)
				let tallyIDs = Object.keys(this.results)

				questionIDs.forEach(id => {
					if (!tallyIDs.includes(id)) {
						this.results[id] = {} //Initialize particular question
					}
					let response = entry[id]
					
					if (!response) {
						return null
					} else if (!Object.keys(this.results[id]).includes(response)) {
						this.results[id][response] = 1 //Initialize particular answer
					} else {
						this.results[id][response] += 1
					}
				})
			},
			buildChartData() {
				for (let questionID of Object.keys(this.results)) {
					this.chartData[questionID] = this.makeDonutArray(questionID)
				}
			},
			makeDonutArray(questionID) {
				let tally = Object.entries(this.results[questionID])
				tally.unshift(["Response", "Frequency"])
				return tally
			}
		},
		created() {
			db.collection('questions').get().then(snapshot => {
				snapshot.forEach(doc => {
					this.questionLookup[doc.id] = doc.data().prompt
				})
			}).catch(err => console.log(err))
			db.collection('responses').get()
			.then(this.populateResponses)
			.catch(err => console.log(err))
		},
		mounted() {
    	M.AutoInit()
  }
}

</script>

<style scoped>

	.container {
		padding: 1rem 2rem;
	}

	.section {
		padding: .1rem 0;
		margin-bottom: .1rem;
	}

	.chart-wrapper {
		margin-left: auto;
		margin-right: auto;
		overflow: hidden
	}

	.gchart {
		margin-left: auto;
		margin-right: auto;
	}
	svg {
		margin-left: auto;
		margin-right: auto;
	}

	rect {
		margin-left: auto;
		margin-right: auto;
	}

	.test {
		/*overflow: visible;*/
	}

	.leftalign {
		text-align: left;
	}

	.prompt-text {
		font-size: .9rem;
	}
	.response-text {
		font-size: .7rem;
	}

</style>




