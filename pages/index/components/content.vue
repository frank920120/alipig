<template>
	<view :class="{'is_fixed':isFixed}">
		<scroll-view scroll-x="true" class="scroll" scroll-with-animation="true">
			<view>
				<block v-for="(item, index) in tab" :key="index">
					<view class="list-cont" :class="{active:index===num}" @click="handleTabClick(index)">
						<view>
							<text class="con-text-a" :class="{activeb:item.checked}">{{ item.name }}</text>
						</view>
						<view>
							<text class="con-text-b" :class="{activeb:item.checked}">{{ item.title }}</text>
						</view>
					</view>
				</block>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	// 引入攻略列表的数据库接口
	export default {
		name: "tab",
		props:['isFixed'],
		data() {
			return {
				num:0,
				tab: [{
						name: '出境游',
						title: '走遍全球',
						
					},
					{
						name: '国内游',
						title: '精选路线',
						
					},
					{
						name: '周边游',
						title: '暑假红包',
					
					},
					{
						name: '精选购',
						title: '免税预购'
					},
					{
						name: '签证/签注',
						title: '领劵',
						
					},
					{
						name: '会员',
						title: '签到',
					
					},
					{
						name: '每日福利',
						title: '领里程',
					
					},
					{
						name: '全部',
						title: '更多推荐',
						
					}
				]
			}
		},
		methods: {
			handleTabClick(index) {
				this.num = index;
			}
		}
	}
</script>

<style scoped>
	.active {
		background-image: linear-gradient(to right, #ccffff 0%, #ffcc00 100%);
		border-top-right-radius: 50upx;
	}

	.activeb {
		color: #292c33 !important;
	}

	.scroll {
		white-space: nowrap;
		width: 100%;
		position: absolute;
		left: 0;
		right: 0;
		background: #FFFFFF;
		padding: 20upx 0;
	}

	.con-text-a {
		color: #292c33;
		font-size: 30upx;
		font-weight: bold;
	}

	.con-text-b {
		color: #9ea0a5;
		font-size: 23upx;
	}

	.list-cont {
		width: 180upx;
		display: inline-block;
		text-align: center;
	}
	.is_fixed{
		  position:fixed;
		  left:0;
		  right:0;
		  top:0;
		  z-index:9999
	 }
</style>
