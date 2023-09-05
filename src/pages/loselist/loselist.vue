<template>
	<view class="content">
		<image class="logo" :src="img?img:'/static/banner.png'"></image>
		<view class='box'>
			<view class='tabBar' :class="{'tabBarActive': index==index1?true:false}" v-for='(item,index1) in loseList' @click="getList(item.lostCateId, index1)">{{item.lostCateName}}</view>
			<view class='childrenList'>
				<view class='item' v-for='(item,index) in list' @click='loseDetail(item)'>{{item.lostBizName}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import urlConfig from '../../common/config.js'
	
	export default {
		data() {
			return {
				loseList: [],
				index: 0,
				list: [],  //列表
				img: ''
			}
		},
		onLoad(option) {
			this.loseList = JSON.parse(option.loseList)
			this.index = parseInt(option.index)
			console.log('loselist',this.loseList)
			this.getList(this.loseList[this.index].lostCateId, this.index)
			this.img = option.img
		},
		methods: {
			// 遗失刊登类型列表
			getList(id,index){
				this.index = index;
				let that = this
				uni.request({
					url: urlConfig+'/api/app/cmsLostBiz/list',
					data: {
						appId: '319',
						lostCateId: id
					},
					success: function (res){
						console.log('list',res)
						that.list = res.data.rows
					},
					fail: function (res){
						
					}
				})
			},
			// 分类列表
			loseDetail(item){
				let that = this;
				uni.navigateTo({
					url: '/pages/losedetail/losedetail?list='+JSON.stringify(item)+"&lostCateName="+that.loseList[that.index].lostCateName+"&img="+this.img
				});
			}
		}
	}
</script>

<style>
	page{
		background-color: #f5f5f5;
	}
	.logo {
		width: 100%;
		height: 380rpx;
	}
	.box {
		width: 94%;
		margin-left: 3%;
	}
	.tabBar{
		width: 200rpx;
		height: 60rpx;
		line-height: 60rpx;
		background-color: white;
		color: #515151;
		text-align: center;
		border-radius: 8rpx;
		display: inline-block;
		margin: 15rpx 20rpx 15rpx 0; 
		white-space:nowrap; 
		overflow:hidden; 
		text-overflow:ellipsis;
	}
	.tabBarActive{
		color: white;
		background-color: #E03326;
	}
	.childrenList .item{
		width: 42%;
		height: 90rpx;
		line-height: 90rpx;
		background-color: white;
		color: #515151;
		border-radius: 8rpx;
		margin: 15rpx 28rpx;
		text-align: center;
		display: inline-block;    
		white-space:nowrap; 
		overflow:hidden; 
		text-overflow:ellipsis;
	}

</style>
