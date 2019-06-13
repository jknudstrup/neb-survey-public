<template>
	<div class="sidebar">
    <ul class="right">
      <li><img src= '@/assets/sidestripes.svg' class="img-responsive"></li>
      <li><img src= '@/assets/sidestripes.svg' class="img-responsive"></li>
    </ul>
  </div>
</template>

<script>
	export default {
		name: 'Rightside',
		data: function() {
			return {
			}
		}
	}

</script>

<style scoped>

.img-responsive {
  margin-bottom: 120px;
  max-width: 100%;
  transform: scaleX(-1);
}

</style>