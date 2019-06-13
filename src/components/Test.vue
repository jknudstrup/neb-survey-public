<template>
	<div class="parent white">
		<pie-chart></pie-chart>
	</div>
</template>

<script>
	import PieChart from './PieChart.js'

	export default {

		name: 'Test',
		components: {
			PieChart
		},
		data() {
			return {

			}
		}
	}
	
</script>

<style scoped>
</style>