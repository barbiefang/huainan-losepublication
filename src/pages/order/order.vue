
<template>
	<view class="content">
		<image class="logo" :src="img?img:'/static/banner.png'"></image>
		<view class='box2'>
			<view class='item'>
				遗失声明：{{ params.content }}
			</view>
			<view class='item'>
				<view class='left'>办理日期</view>
				<view class='right'>{{params.applyTime}}</view>
			</view>
			<view class='item'>
				<view class='itemInner'>
					<view class='left'>姓名<view class='red'>*</view></view>
					<view class='right'>
						<input type="text" v-model='contact' placeholder="请输入姓名" maxlength="20">
					</view>
				</view>
				<view class='line'></view>
				<view class='itemInner'>
					<view class='left'>手机号码<view class='red'>*</view></view>
					<view class='right'>
						<input type="tel" v-model='contacts' placeholder="请输入收件人手机号码" maxlength='11'>
					</view>
				</view>
			</view>
			<view class='item'>
				<view class='left'>报纸选项</view>
				<view class='right'>
					<radio-group @change="newspaperChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in newspaperList" :key="item.id">
							<radio :value="item.id" :checked="index === newspaper" color='#E03326' />{{item.name}}
						</label>
					</radio-group>
				</view>
			</view>
			<view class='item'>
				<view class='left'>发票选项</view>
				<view class='right'>
					<radio-group @change="invoiceChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in invoiceList" :key="item.id">
							<radio :value="item.id" :checked="index === invoice" color='#E03326' />{{item.name}}
						</label>
					</radio-group>
				</view>
			</view>
			<view>
				<button class='confirm' @click='submit'>提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	import urlConfig from '../../common/config.js'
	
	export default {
		data() {
			return {
				params: {},
				newspaper: 0,
				newspaperList: [
					{name: '不需要', id: 0},
					{name: '需要', id: 1}
				],
				invoice: 0,
				invoiceList: [
					{name: '不开票', id: 0},
					{name: '个人', id: 1},
					{name: '对公', id: 2}
				],
				contact: '',
				contacts: '',
				submitStatus: false,
				img: ''
			}
		},
		onLoad(option) {
			this.params = JSON.parse(option.params)
			console.log('params',this.params)
			this.img = option.img
		},
		methods: {
			newspaperChange(e){
				console.log('newspaperChange',e)
				for (let i = 0; i < this.newspaperList.length; i++) {
					if (this.newspaperList[i].id == e.detail.value) {
						this.newspaper = parseInt(e.detail.value);
						console.log(this.newspaper)
						break;
					}
				}
			},
			invoiceChange(e){
				console.log('invoiceChange',e)
				for (let i = 0; i < this.invoiceList.length; i++) {
					if (this.invoiceList[i].id == e.detail.value) {
						this.invoice = parseInt(e.detail.value);
						console.log(this.invoice)
						break;
					}
				}
			},
			// 遗失刊登类型列表
			submit(){
				if(this.submitStatus){return;}
				if(!this.params.lostBizId){
					uni.showToast({
						title: '登报业务id不能为空',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				if(!this.contact){
					uni.showToast({
						title: '姓名不能为空',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				if(!/^[\u4e00-\u9fa5]+$/.test(this.contact)){
					uni.showToast({
						title: '姓名只能输入中文',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				if(!this.contacts){
					uni.showToast({
						title: '手机号不能为空',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				if(!/^1[3-9]\d{9}$/.test(this.contacts)){
					uni.showToast({
						title: '手机号格式不正确',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				this.params.contact = this.contact;
				this.params.contacts = this.contacts;
				this.params.invoice = this.invoice.toString();
				this.params.newspaper = this.newspaper.toString();
				let that = this
				that.submitStatus = true;
				uni.request({
					url: urlConfig+'/api/app/cmsLostInfo/save',
					method: 'POST',
					header: {
						"custom-header": 'application/json'
					},
					data: this.params,
					success: function (res){
						console.log('saveres',res)
						if(res.data.code == 0){
							uni.showToast({
								title: '提交成功',
								icon: 'success',
								duration: 2000
							});
							setTimeout(() => {
								uni.navigateTo({
									url: '/pages/index/index'
								});
							}, 2000)
						}else{
							uni.showToast({
								title: res.data.code+':提交失败',
								icon: 'error',
								duration: 2000
							});
							that.submitStatus = false;
						}
					},
					fail: function (res){
						uni.showToast({
							title: '提交失败',
							icon: 'error',
							duration: 2000
						});
						that.submitStatus = false;
					}
				})
			},
		}
	}
</script>

<style scoped>
	page{
		background-color: #f5f5f5;
	}
	.logo {
		width: 100%;
		height: 380rpx;
	}
	.box2 {
		width: 94%;
		margin-left: 3%;
	}
	.item{
		width: 94%;
		padding: 20rpx;
		background-color: white;
		border-radius: 8rpx;
		margin: 20rpx 0;
	}
	.item .left{
		display: inline-block;
		width: 23%;
		height: 70rpx;
		line-height: 70rpx;
	}
	.itemInner{
		height: 70rpx;
		line-height: 70rpx;
		
	}
	.line{
		border-top: 1px solid #dddddd;
		margin: 20rpx 0;
	}
	.red{
		display: inline-block;
		color:#E03326;
	}
	.item .right{
		display: inline-block;
		width: 75%;
		text-align: right;
	}
	input{
		position: relative;
		top: 15rpx;
	}
	label{
		margin-right: 20rpx;
	}
	.confirm{
		background-color: #E03326;
		color: white;
		margin-top: 40rpx;
	}

</style>
