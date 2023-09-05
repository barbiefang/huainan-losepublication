<template>
	<view class="content">
		<image class="logo" :src="img?img:'/static/banner.png'"></image>
		<view class='box'>
			<view class='loseItem' v-for="(item,index) in loseList" @click='loseListDetail(item,index)'>
				<text class='text'>{{item.lostCateName}}</text>
				<image class="left" src="/static/left.png"></image>
			</view>
		</view>
		<!-- 登报须知 -->
		<view class='tips'>
			<view class='title'>
				<image class='icon' src='/static/tips2.png'></image>
				<text style='padding-left:30rpx;'>登报须知</text>
			</view>
			<view :class="[showAll?'':'contentHeight', 'tipscontent']">
				<view v-html='text'></view>
				
				<!-- <text>1、学生证、残疾证、老年证、退休证等，每件收费50元(提供姓名、证件编号等相关信息 )</text><br>
				<text>2、身份证，每件收费80元(提供姓名、证件编号等相关信息 )</text><br>
				<text>3、技能证、毕业证、工作证、户口簿、结业证、出生医学证明、准生证、就业协议书、研究生证、公墓证、骨灰盒存放证、迁移证、准考证、警官证、结婚证、报到证等每件收费150元(提供个人身份证、发证机关证明和编号 )</text><br>
				<text>4、教师资格证、保险代理人员资格证书、会计证、医师证、护士证等各类职业资格证书、驾驶证(证号和档案号)、钢瓶证、道路从业资格证、道路运输证、车牌号、线路牌、收费站月票卡等有关车船证件等，每件收费200元(提供个人身份证、发证机关证明和编号 )</text><br>
				<text>5、营业执照、发票( 收据)、保险保单(收据)、住户公积金证、事业法人证书(正、副)、企业法人证、组织机构代码证(正、副)、文化经营许可证(正、副)、税务登记证(正、副)、发票领购簿、企业资质证、银行开户许可证、土地使用证、房产证、贷款卡、公章、合同章、财务章、印鉴章、分户卡、护照、预先核准通知书、现金支票、道路运输经营许可证(正、副)等，每件收费300元(提供个人身份证或单位证明和编号)</text><br>
				<text>注：淮南日报、淮河早报版面刊登公告、声明、通知、启事等广告起价2000元</text> -->
			</view>
			<view>
				<view class='btn' v-if='showAll' @click='showAll=!showAll'>
					收起
					<image src='/static/up.png'></image>
				</view>
				<view class='btn' v-else @click='showAll=!showAll'>
					展开
					<image src='/static/down.png'></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import urlConfig from '../../common/config.js'
	
	export default {
		data() {
			return {
				loseInfo: [],  //遗失刊登信息
				img: '',
				text: '',
				loseList: [],  //遗失列表
				showAll: false,
			}
		},
		onLoad() {
			this.getInfo()
			this.getList()
		},
		methods: {
			// 获取遗失刊登信息
			getInfo(){
				let that = this
				uni.request({
					url: urlConfig+'/api/app/cmsGlobalSetting/list/LOST',
					data: {
						appId: '319',
					},
					success: function (res){
						that.loseInfo = res.data.rows
						that.img = res.data.rows[0].settingValue
						that.text = res.data.rows[1].settingValue
						console.log('loseInfo',that.loseInfo)
					},
					fail: function (res){
						
					}
				})
			},
			// 遗失刊登类型列表
			getList(){
				let that = this
				uni.request({
					url: urlConfig+'/api/app/cmsLostCategory/list',
					data: {
						appId: '319',
					},
					success: function (res){
						console.log('list',res)
						that.loseList = res.data.rows
					},
					fail: function (res){
						
					}
				})
			},
			// 分类列表
			loseListDetail(item, index){
				uni.navigateTo({
					url: '/pages/loselist/loselist?loseList='+JSON.stringify(this.loseList)+"&index="+index+"&img="+this.img
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
	.loseItem {
		width: 94%;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 8rpx;
		background: white;
		margin: 20rpx 3% 20rpx 3%;
	}
	.loseItem .text{
		display: inline-block;
		width: 85%;
		position: relative;
		top: -15rpx;
		text-align: left;
		text-indent: 1em;
	}
	.loseItem .left{
		display: inline-block;
		width: 10%;
		text-align: right;
		width: 60rpx;
		height: 50rpx;
		padding-top: 15rpx;
	}
	
	.tips{
		display: inline-block;
		width:94%;
		margin-top: 10rpx;
		margin-left: 3%;
		border-radius: 8rpx;
		background-color: #e7e7e7;
		font-size: 26rpx;
		padding: 10rpx 0;
		margin-bottom: 20upx;
	}
	
	.tips .title{
		height: 60rpx;
		line-height: 60rpx;
		border-bottom: 1px solid #c6c4c4;
		font-size: 28rpx;
	}
	
	.title .icon{
		width: 30rpx;
		height: 30rpx;
		position: relative;
		top: 5rpx;
		left: 20rpx;
	}
	
	.tipscontent{
		display: inline-block;
		width: 94%;
		margin: 20rpx 3%;
		line-height: 35rpx;
	}
	
	.contentHeight{
		height: 100rpx;
		overflow: hidden;
		line-height: 35rpx;
	}
	
	.btn{
		float:right;
		position: relative;
		right: 10rpx;
		bottom: 10rpx;
	}
	.btn image{
		width: 30rpx;
		height: 30rpx;
		padding-left: 10rpx;
		position: relative;
		top: 5rpx;
	}

</style>
