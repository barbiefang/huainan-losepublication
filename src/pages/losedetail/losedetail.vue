<template>
	<view class="content">
		<image class="logo" :src="img?img:'/static/banner.png'"></image>
		<view class='box'>
			<view class='loseItem border lineheight'>
				<text class='text'>登报业务</text>
				<text class='right businiss'>{{loseInfo.lostBizName?loseInfo.lostBizName:''}}</text>
			</view>
			
			<view class='loseItem'>
				<text class='text lineheight'>登报正文</text>
				<textarea class='textarea' v-model='content' name="" id="" cols="40" rows="4" 
				placeholder="遗失声明:×××于××年××月××日不慎遗失身份证件,证号×××现声明作废." maxlength="500"></textarea>
			</view>
			
			<view class='loseItem border lineheight'>
				<text class='text'>办理日期</text>
				<text class='right'>{{ applyTime }}</text>
			</view>
			
			<view class='loseItem border lineheight'>
				<text class='text'>上传附件</text>
					<button class='upload' @click='showModal()'>上传图片</button>
					<uploadImg ref='uploadImg' @chooseImage='chooseImage()' @uploadImg='uploadImg()'></uploadImg>
				<!-- <text class='right'>
					<uni-file-picker v-model="imageValue" title="" limit="1" file-mediatype="image" sourceType="['album', 'camera']"><button>选择文件</button></uni-file-picker>
				</text> -->
			</view>
			
			<view class='loseItem tipscontent'>
				<image class='icon' src='/static/tips.png'></image>
				<view>请提供单位介绍信并加盖公章，营业执照复印件一份，并以附件形式上传。</view>
			</view>
			
			<view class='btns'>
				<button class='goback' @click='goback()'>返回</button>
				<button class='confirm' @click='nextStep()'>确认消息</button>
			</view>
		</view>
	</view>
</template>

<script>
	import moment from 'moment'
	import uploadImg from '../../component/uploadImg.vue'
	import urlConfig from '../../common/config.js'
	
	export default {
		components:{
			uploadImg
		},
		data() {
			return {
				lostCateId: '',
				lostCateName: '',
				lostBizName: '',
				lostBizId: '',
				content: '', //正文
				loseInfo: {},
				applyTime:'', // 申请时间
				previewSrc: '',  //图片预览地址
				uploadImgSrc: '', //图片线上地址
				img: ''
			}
		},
		onLoad(option) {
			this.loseInfo = JSON.parse(option.list)
			this.lostCateName = option.lostCateName
			this.lostCateId = this.loseInfo.lostCateId
			this.lostBizId = this.loseInfo.lostBizId
			this.lostBizName = this.loseInfo.lostBizName
			this.img = option.img
			this.getTime();
		},
		methods: {
			//获取当前时间
			getTime(){
				this.applyTime = moment().format('YYYY-MM-DD')
			},
			showModal(){
				this.$refs.uploadImg.show();
			},
			// 选择图片本地预览
			chooseImage(){
				let that = this;
				wx.chooseMedia({
				  count: 1,
				  mediaType: 'image',
				  sourceType: ['album', 'camera'],
				  camera: 'back',
				  success(res) {
					  uni.showToast({
						title: '选取图片成功',
						icon: 'success',
						duration: 1500
					  });
					  console.log('选择图片',res)
					  that.$refs.uploadImg.changeImg(res.tempFiles[0].tempFilePath)
					  that.previewSrc = res.tempFiles[0].tempFilePath
					  uni.showToast({
						title: '选取图片成功',
						icon: 'success',
						duration: 1500
					  });
				  },
				  fail(err){
					  uni.showToast({
						title: '选取图片失败',
						icon: 'error',
						duration: 1500
					  });
				  }
				})
			},
			// 上传图片
			uploadImg(){
				if(!this.previewSrc){
					uni.showToast({
						title: '请选择图片',
						icon: 'error',
						duration: 1500
					});
					return;
				}
				let that = this;
				wx.uploadFile({
				  filePath: that.previewSrc,
				  name: 'file',
				  url: urlConfig+'/api/dfs/common/osb/obsUploadFile',
				  formData:{
					  desc: '图片'
				  },
				  success(res1){
					  console.log('上传成功',res1)
					  let result = JSON.parse(res1.data)
					  that.uploadImgSrc = result.msg
					  uni.showToast({
						title: '图片上传成功',
						icon: 'success',
						duration: 1500
					  });
					  that.$refs.uploadImg.hide();
				  },
				  fail(err){
					  console.log('上传失败',err)
					  uni.showToast({
						title: '图片上传失败',
						icon: 'error',
						duration: 1500
					  });
				  }
				})
			},
			// 确认消息下一步
			nextStep(){
				if(!this.lostBizName){
					uni.showToast({
						title: '登报业务名称不能为空',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				if(!this.lostBizId){
					uni.showToast({
						title: '登报业务id不能为空',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				if(!this.lostCateId){
					uni.showToast({
						title: '业务分类id不能为空',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				if(!this.lostCateName){
					uni.showToast({
						title: '业务分类名称不能为空',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				if(!this.content){
					uni.showToast({
						title: '登报正文不能为空',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				if(!this.uploadImgSrc){
					uni.showToast({
						title: '图片地址不能为空',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				var obj = {};
				obj.appId = '319'
				obj.content = this.content
				obj.lostBizId = this.lostBizId
				obj.lostBizName = this.lostBizName
				obj.lostCateId = this.lostCateId
				obj.lostCateName = this.lostCateName
				obj.materialPath = this.uploadImgSrc
				obj.applyTime = this.applyTime
				uni.navigateTo({
					url: '/pages/order/order?params='+JSON.stringify(obj)+"&img="+this.img
				});
			},
			goback(){
				uni,uni.navigateBack({
					delta: 1
				});
			}
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
	.box {
		width: 94%;
		margin-left: 3%;
		background-color: white;
		border-radius: 8rpx;
	}
	.businiss{  
		/* display: inline-blocl;
		white-space:nowrap; 
		overflow:hidden; 
		text-overflow:ellipsis;
		position: relative;
		top: 30rpx; */
	}
	.loseItem {
		width: 94%;
		margin: 20rpx 3%;
		min-height: 80rpx;
	}
	.border{
		border-bottom: 1px solid #ccc;
	}
	.lineheight{
		line-height: 80rpx;
	}
	.loseItem .text{
		display: inline-block;
		width: 40%;
		text-align: left;
	}
	.loseItem .left{
		display: inline-block;
		width: 30%;
		text-align: right;
		width: 60rpx;
		height: 50rpx;
		padding-top: 15rpx;
	}
	.loseItem .right{
		display: inline-block;
		width: 60%;
		text-align: right;
	}
	.textarea{
		width: 94%;
		height: 200rpx;
		background-color: #f5f5f5;
		border-radius: 8rpx;
		padding: 10rpx 20rpx;
	}
	.tipscontent{
		width: 80%;
		color: white;
		background-color: #FF9658;
		padding: 20rpx 20rpx 20rpx 80rpx;
		line-height: 40rpx;
		position: relative;
		border-radius: 8rpx;
	}
	.tipscontent .icon{
		position: absolute;
		width: 40rpx;
		height: 40rpx;
		top: 37rpx;
		left: 20rpx;
	}
		
	.btns{
		text-align: center;
	}
	.btns button{
		display: inline-block;
		width: 300rpx;
		height: 90rpx;
		line-height: 88rpx;
		border-radius: 8rpx;
		margin: 30rpx 20rpx;
		border: 1px solid #E03326;
	}
	.goback{
		color: #E03326;
		background-color: white;
	}
	.confirm{
		background-color: #E03326;
		color: white;
	}
	.upload{
		width: 200rpx;
		height: 50rpx;
		line-height: 48rpx;
		background-color: white;
		color: #E03326;
		border-radius: 8rpx;
		display: inline-block;
		position: relative;
		top: 15rpx;
		font-size: 26rpx;
		float:right;
		border: 1px solid #E03326;
	}
	button::after{
		border: none;
	}
	
</style>
