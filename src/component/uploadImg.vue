<template>
	<view class='box' v-if='status'>
		<view class='modalContent'>
			<view class='title'>
				图片上传
				<img class='close' @click='hide()' src="/static/close1.png" alt="">
			</view>
			<view class='content'>
				<image class='img' :src='previewImg' mode='aspectFit'></image>
			</view>
			<view class='bottom'>
				<button class='cancle' @click='choseImg()'>选择图片</button>
				<button class='confirm' @click='confirm()'>确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name: 'uploadImg',
		data() {
			return{
				status: false,
				previewImg: '/static/img_default_long.jpg',
			}
		},
		onload(){
			
		},
		methods: {
			show(){
				this.status = true;
			},
			hide(){
				this.status = false;
			},
			choseImg(){
				this.$emit("chooseImage", '');
			},
			changeImg(src){
				this.previewImg = src;
			},
			confirm(){
				this.$emit("uploadImg", '');
			}
		}
	}
</script>

<style scoped>
	.box{
		position: absolute;
		top:0;
		left:0;
		background-color: rgba(0,0,0,.6);
		width: 100%;
		height: 100%;
		overflow: hidden;
		z-index: 100;
	}
	.modalContent{
		position: absolute;
		width: 80%;
		height: 510rpx;
		background-color: white;
		border-radius: 8rpx;
		left:0;
		right:0;
		top:0;
		bottom:0;
		margin: auto;
	}
	.title{
		text-indent: 1em;
	}
	.close{
		width: 50rpx;
		height: 50rpx;
		float:right;
		position: relative;
		top: 15rpx;
		right: 10rpx;
	}
	.content{
		display: inline-block;
		width: 100%;
		height: 330rpx;
		text-align: center;
	}
	.content .img{
		max-width: 100%;
		max-height: 330rpx;
	}
	.bottom{
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
	}
	.bottom button{
		display: inline-block;
		width: 40%;
		height: 60rpx;
		line-height: 58rpx;
		text-align: center;
		margin: 0 30rpx;
		position: relative;
		top: -10rpx;
		font-size: 26rpx;
	}
	.cancle{
		border: 1px solid #E03326;
		color: #E03326;
		background-color: white;
	}
	.confirm{
		background-color: #E03326;
		color: white;
		border: 1px solid #E03326;
	}
	button::after{
		border: none;
	}
</style>