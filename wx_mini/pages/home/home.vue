<template>

		<view class="container"  @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
				
			<image class="background" mode="widthFix" src="../../static/tjut-zixiba/tjut.png"></image>
			<!-- 通知公告 -->
			<uni-notice-bar v-if="notice" show-icon show-close scrollable :text="notice" />
			
			<!-- 中部文字 -->
			<view class="text_middle" style="opacity: 0.8;">
				<text decode>抓铁有痕&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</text>
				<text decode class="text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;踏石留印</text>
			</view>

			<!-- 底部文字 -->
			<view class="text_bottom">
				<view class="pic-1">
					<image class="picture1" src="../../static/tjut-zixiba/begin.png"></image>
				</view>
				<view class="index-start">
					<text>开启自习之旅</text>
				</view>
			</view>

			<!-- 版本号 -->
			<view class="version">
				<text>version 1.0.0
				All Rights Reserved</text>
			</view>

		</view>
		

</template>

<script>
	
	var startX, endX;  //首先创建2个变量 来记录触摸时的原点
	var moveFlag = true;// 判断执行滑动事件
	
	export default {
		data() {
			return {
				notice:""
			};
		},

		onLoad() {
			this.getNotice();
		},

		methods: {
			
			async getNotice(){
				const { data: res } = await uni.$http.get('/notice')
				//有通知
				if (res.code === "00000") {
					this.notice = res.message;
				} else { // 没有通知
					this.notice = null;
					console.log("没有通知")
				}
			},
			
			touchStart: function (e) {
			 
			    startX = e.touches[0].pageX; // 获取触摸时的原点
				
			    moveFlag = true;
			 
			},
			// 触摸移动事件
			touchMove: function (e) {
			endX = e.touches[0].pageX; // 获取触摸时的原点
			if (moveFlag) {
					if (startX - endX > 50) {
					console.log("move left");
					this.move2left();
					moveFlag = false;
			  }
			}
			},
			// 触摸结束事件
			touchEnd: function (e) {
			    moveFlag = true; // 回复滑动事件
			},

			move2left: function(){
				uni.redirectTo({
					url:"../building/building"
				})
			}

		},
		
		
	}	
</script>

<style lang="scss" scoped>

	// .building-container {
	// 	background-image: url('https://static01.imgkr.com/temp/5aa8f2bc6cd242bfaeb1ce3a00f565da.png');
	// 	background-repeat: no-repeat;
	// 	 background-attachment: fixed ;
	// 	background-size: contain;
	// 	background-position: 100% 100%;
	// }
	.background{
	  width: 100%;
	  position: fixed;
	  bottom: 0;
	  right: 0;
	  z-index: -1;
	}
	
	.text_middle{
	  width: 100%;
	  writing-mode: vertical-lr;
	  margin-top: 30%;
	  margin-left: 43%;
	  font-size: 40rpx;
	  font-family: serif;
	  letter-spacing: 30rpx;
	  color: #444;
	  font-weight: lighter;
	}
	.text{
		text-indent: 4em;
	}
	.text_middle text{
	  display: block;
	}
	/* 底部文字 */
	.text_bottom{
	    width: 100%;
	    position: fixed;
	    text-align: center;
	    bottom: 18%;
	    font-size: 30rpx;
		color: #444;
		display: flex;
		justify-content: center;
		align-content: center;
	}
	/* 左箭头 */
	.picture1{
		height: 40rpx;
		width: 35rpx;
		overflow: visible;
	}
	.index-start {
		margin-left: 0.3rem;
	}
	/* 版本 */
	.version{
	  width: 100%;
	  position: fixed;
	  text-align: center;
	  bottom: 30rpx;
	  font-size: 26rpx;
	  color: #444;
	}
	
</style>
