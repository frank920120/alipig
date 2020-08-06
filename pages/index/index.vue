<template>
	<view >
		<Search/>
		<Ticket/>
	</view>
</template>

<script>
	import Search from './components/search.vue';
	import Ticket from './components/ticket.vue'
	export default {
		data() {
			return {
		
			}
		},
		components:{
			Search,
			Ticket
		}
	}
</script>

<style>

</style>
