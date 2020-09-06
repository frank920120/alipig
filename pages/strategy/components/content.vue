<template>
	<view class="active">
			<view class="conteng">
				<block>
				<view class="conteng-article newing" >
					<view  class="conteng-img">
						<block >
							<image :src="itemimg" mode="aspectFill"></image>	
						</block>
					</view>
					<!-- 文字介绍 -->
					<view class="active-introduce">
						<view class="active-name">222</view>
						<view class="active-title">222</view>
					</view>	
						<view class="purchase userinfo">
							<!-- <image :src="item.datainfo.avatarUrl" mode="widthFix"></image>
							<text class="active-purchase">222</text> -->
						</view>
				</view>
				</block>
			</view>
		</view> 
</template>

<script>
	export default{
		name:'cont',
		props:{
			localdata:Array
		},
		data() {
			return {
				
			}
		},
		methods:{
		
		}
	}
</script>

<style scoped>
	/* @import "../../../common/uni.css"; */
	/* 用户 */
	.userinfo image{width: 50upx; height: 50upx; border-radius: 50upx;}
	.userinfo text{padding-left: 20upx;}
	.userinfo{padding-top: 20upx;}
	.newing{padding-bottom: 30upx;}
</style>
