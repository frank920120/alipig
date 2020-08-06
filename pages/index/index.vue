<template>
	<view >
		<Search/>
		<Ticket/>
		<Classify/>
	</view>
</template>

<script>
	import Search from './components/search.vue';
	import Ticket from './components/ticket.vue';
	import Classify from './components/classify.vue';
	export default {
		data() {
			return {
		
			}
		},
		components:{
			Search,
			Ticket,
			Classify
		}
	}
</script>

<style>

</style>
