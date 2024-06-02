<template>
	<view class="building-container">
	
				<image class="background" mode="widthFix" src="../../static/tjut-zixiba/tjut.png"></image>
	
		<!-- floor -->
		<view class="container" v-if="buildingList">
			<!-- 教学楼 -->
			<view class="row">
				
				<!-- 左块 -->
				<view class="row1">
					 
					<!-- 竖条 -->
					<image mode="widthFix" src="/static/tjut-zixiba/line1.png"></image>
					
					<!-- 文字 -->
					<view class="row1-text">
						<view class="text1">
							<text decode="">教学楼</text>
						</view>
						<view class="text2">
							<text decode="" style="opacity: 0.6;">&nbsp;&nbsp;{{year}}/{{month}}/{{day}}&nbsp;{{week}}</text>
						</view>
					</view>
					
				</view>
				
				<!-- 右块 -->
				<view class="row2">
					<image mode="heightFix" src="/static/tjut-zixiba/tjut_logo.png"></image>
				</view>
				
			</view>
		</view>
		 
		
		<!-- 27 28 -->				<view class="LRpart">										<!-- Lpart -->					<view class="Lpart" v-for="(item,i) in buildingList" :key="i" v-if="item.id == 27" @click="navClickHandler(item.id)">											    <!-- 左块 -->						<view class="row1">														<!-- 竖条 -->							<image style="opacity: 0.5;" mode="widthFix" src="/static/tjut-zixiba/line1.png"></image>							<!-- 文字 -->							<view class="row1-text">								<view class="text3">									<view >{{item.buildingName.split("",3).join("")}}</view>									<view >教学楼</view>								</view>							</view>						</view>							<!-- 右块 -->							<view class="row2-2x">								<image mode="heightFix" src="/static/tjut-zixiba/no.27building.png"></image>							</view> 					</view>						<!-- Rpart -->					<view class="Rpart" v-for="(item,i) in buildingList" :key="i" v-if="item.id == 28" @click="navClickHandler(item.id)">												<!-- 左块 -->						<view class="row1">														<!-- 竖条 -->							<image style="opacity: 0.5;" mode="widthFix" src="/static/tjut-zixiba/line1.png"></image>							<!-- 文字 -->							<view class="row1-text">								<view class="text3">									<view  >{{item.buildingName.split("",3).join("")}}</view>									<view  >教学楼</view>								</view>							</view>						</view>												<!-- 右块 -->						<view class="row2-2x">							<image mode="heightFix" src="/static/tjut-zixiba/no.28building.png"></image>						</view> 											</view>									</view>
		
		
		<!-- 1-6 号楼 -->				<view class="rownum" v-for="(item,i) in buildingList" :key="i" v-if="item.id != 27 && item.id != 28" @click="navClickHandler(item.id)">					<!-- 左块 -->					<view class="row1">						<!-- 竖条 -->						<image style="opacity: 0.5;" mode="widthFix" src="../../static/tjut-zixiba/line1.png"></image>						    <!-- 文字 -->						<view class="building-num">							<view class="text0">							    <view  decode="">{{item.buildingName.split("",2).join("",2)}}</view>								<view  decode="">教学楼</view>							</view>						</view> 					</view>					<!-- 右块 -->					<view class="osbuildings">					    <image mode="widthFix" :src="item.url"></image>					</view>				</view>
			
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
			year: 0,
			month:0,
			day:0,
			week:0,
			buildingList: []
	
			};
		},
		onLoad() {
			this.getDateTime()
			this.getBuilding()
		},
		onReady() {
			
		},
		methods:{
			async getBuilding(){
				const { data: res } = await uni.$http.get('/buildings')
				//请求失败
				// if(res.code !== '00000') return uni.$showMsg
				this.buildingList = res.data
			},
			getDateTime:function(){
				var date = new Date()
	
				var xq = date.getDay()
				this.year = date.getFullYear()
				this.month = '0' + (date.getMonth() + 1)
				this.day = date.getDate()
				if(xq == 1){
					this.week = 'Mon'
				}else if(xq == 2){
					this.week = "Tue"
				}else if(xq == 3){
					this.week = "Wed"
				}else if(xq == 4){
					this.week = "Thu"
				}else if(xq == 5){
					this.week = "Fri"
				}else if(xq == 6){
					this.week = "Sat"
				}else{
					this.week = "Sun"
				}
			},
			navClickHandler(item) {
				
				uni.navigateTo({
					url:'../floor/floor?id='+item 
				})
			}
			
		}
		
	}
</script>

<style lang="scss" scoped>
	.building-container {
		margin-bottom: 10rem;
	}
	
	.background{
	  width: 100%;
	  position: fixed;
	  bottom: 0;
	  right: 0;
	  z-index: -1;
	}
	
	.container{

	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	  margin-top: 2%;
	  
	}
	.row{
	  width: 84%;
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	}
	
	.row1{
	
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	
	}
	
	.floor-item{
		align-items: center;
	}
	

	

	
	
	// first
	.row1 image{
	  width: 10rpx;
	}	
	.row2 image{
	  height: 60rpx;
	}
	.row1-text{
		color: #444;
		margin-left: 20rpx;
	}
	.text1{
		color: #444;
	  font-size: 62rpx;
	}
	.text2{
		color: #444;
	  font-size: 35rpx;
	}


	//second
	.LRpart{
	// margin-left: 5%;
	  width: 88%;
	  display: flex;
	  flex-direction: row;
	  justify-content: space-between;
	  margin: 7% auto 0 auto;
	}
	
	.Lpart{
	  height: 150rpx;
	  width: 43%;
	  // background-color: rgb(255, 255, 255);
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  margin-top: 4%;
	  padding: 5rpx 15rpx;
	  border-color: rgba(255, 255, 255,1) solid 3rpx;
	  border-radius: 25rpx;
		box-shadow:0rpx 0rpx 10rpx 3rpx rgb(203,203,207);
	}
	
	
	
	
	.Rpart{
	  height: 150rpx;
	  width: 43%;
	  // background-color: rgb(255, 255, 255);
	  display: flex;
	  flex-direction: row;
	  justify-content: space-between;
	  align-items: center;
	  margin-top: 4%;
	  padding: 5rpx 15rpx;
	  border-color: rgba(255, 255, 255,1) solid 3rpx;
	  border-radius: 25rpx;
		box-shadow:0rpx 0rpx 10rpx 3rpx rgb(203,203,207);
	}
	.row2-2 image{
	  padding: 50rpx;
	  padding-top: 65rpx;
	  height: 148rpx;
	}
	.row2-3 image{
	  padding: 80rpx;
	  padding-top: 90rpx;
	  height: 160rpx;
	}
	.row2-4 image{
	  padding: 95rpx;
	  padding-top: 100rpx;
	  height: 170rpx;
	}
	.row2-5 image{
	  padding: 48rpx;
	  padding-top: 58rpx;
	  height: 160rpx;
	}
	.row2-6 image{
	  padding: 15rpx;
	  height: 100rpx;
	}
	.row2-2x image{
	  height: 110rpx;
	  margin-right: 20rpx;
	}
	.text3{
		color: #444;
	  font-size: 32rpx;
	}
	
	// .page-section-spacing{
	//   margin-top: 5%;
	//   padding-left: 112rpx;
	//   width: 100%;
	//   display: flex;
	//   flex-direction: column;
	//   justify-content: center;
	//   align-items: center;
	
	// } 
	
	
	//thrid
	.rownum{
		margin:0 auto;
		height: 150rpx;
		width: 84%;
		// background-color: rgb(255, 255, 255);
		display: flex;
		// flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 6%;
		margin-bottom: 2%;
		padding: 7rpx 15rpx;
		border-color: rgba(255, 255, 255,1) solid 3rpx;
		border-radius: 25rpx;
		box-shadow:0rpx 0rpx 10rpx 3rpx rgb(203,203,207);
	}
	
	.text0{
		color: #444;
	  font-size: 36rpx;
	}
	
	
	.osbuildings image{
		margin-right: 90rpx;
		width: 150rpx;
		height: 110rpx;
	}
	
	.building-num{
		margin-left: 25rpx;
	}

	//logo
	// .tjut-logo{
	//   width: 90%;
	//   position: fixed;
	//   bottom: 0;
	//   right: 0;
	//   /* z-index: -1; */
	// }
	
</style>
