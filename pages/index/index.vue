<template>
	<view >
		<Search/>
		<Ticket/>
		<Classify/>
		<Content id='boxFixed' :isFixed="isFixed"/>
		<view style="height:2000upx">
			
		</view>
	</view>
</template>

<script>
	import Search from './components/search.vue';
	import Ticket from './components/ticket.vue';
	import Classify from './components/classify.vue';
	import Content from './components/content.vue';
	export default {
		components:{
			Search,
			Ticket,
			Classify,
			Content
		},
		data() {
			return {
			isFixed:false,
			rect:'',
			menutop:''
			}
		},
		onPageScroll(e){
			this.rect = e.scrollTop
			if(this.rect > this.menutop){
				this.isFixed = true
			}else{
				this.isFixed = false
						
			}
		},
		onLoad() {
			const query = wx.createSelectorQuery()
			query.select('#boxFixed').boundingClientRect()
			query.exec((res)=>{
			  this.menutop = res[0].top - 20
			})
		},
	
	
	}
</script>

<style scoped>

</style>
