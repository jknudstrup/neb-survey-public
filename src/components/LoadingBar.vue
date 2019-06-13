<template>
			<div>
			Querying Database...
			<div class="progress">
      	<div class="indeterminate"></div>
  		</div>
		</div>
</template>

<script>
	export default {
		name: 'LoadingBar',
		data() {
			return {

			}
		},
		mounted() {
    	M.AutoInit();
  	}
	}
</script>