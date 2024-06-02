<template>	<view class="building-container">						<image class="background" mode="widthFix" src="../../static/tjut-zixiba/tjut.png"></image>				<!-- floor -->		<view class="container">		<!-- 上方楼号及图标 -->					<view class="row">				<!-- 左块 -->				<view class="row1" v-if="url">					<!-- 竖条 -->					<image mode="widthFix" src="/static/tjut-zixiba/line1.png"></image>					<!-- 文字 -->					<view class="building-n">						<view class="text1">							<view decode='' style="opacity: 0.8;">&nbsp;{{buildingId}}号楼</view>						</view>						<view class="text2">							<view decode='' style="opacity: 0.6;">&nbsp;&nbsp;{{year}}/{{month}}/{{day}}&nbsp;{{week}}</view>						</view>					</view>				</view>			</view>						<view>				<!-- 右块 -->				<view class="row2-wide">					<image mode="heightFix" :src="url"></image>				</view>			</view>					</view>  				<view class="building-floor">						<!-- 楼层 -->			<view class="building" v-for="(item,i) in floor" :key="i">				<!-- 楼层号 floornum -->				<view class="floornum">					<view decode style="font-size: 45rpx;">{{item.floorNumber}}&nbsp;F</view>				</view>					<view class="floor">						<!-- 教室号1 classnum -->						<view class="classroomnum" v-for="(item2,i2) in item.classrooms" :key="i2" @click="navClickToClassroomHandler(item2.id,item2.classroomNum,item2.classBuildingId)">							<view :class="[item2.status == '3' ? 'class2' : item2.status == '1' ? 'class' : 'class3']" style="font-size: 24rpx;">{{item2.classroomNum}}</view>						</view>					</view>			</view>					</view>			</view></template><script>			export default {		data() {			return {				year: 0,				month:0,				day:0,				week:0,				url:"",				floor: [],
				buildingId:0			};		},		onLoad(option) {						this.getClassrooms(option.id)			this.getDateTime()								},		onReady() {					},		methods: {			async getClassrooms(option) {				const { data: res } = await uni.$http.get('/building?id='+option)										this.url = res.data.url
					this.floor = res.data.floor
					
					this.buildingId = res.data.buildingId			},			getDateTime:function(){				var date = new Date()								var xq = date.getDay()				this.year = date.getFullYear()				this.month = '0' + (date.getMonth() + 1)				this.day = date.getDate()				if(xq == 1){					this.week = 'Mon'				}else if(xq == 2){					this.week = "Tue"				}else if(xq == 3){					this.week = "Wed"				}else if(xq == 4){					this.week = "Thu"				}else if(xq == 5){					this.week = "Fri"				}else if(xq == 6){					this.week = "Sat"				}else{					this.week = "Sun"				}			},			navClickToClassroomHandler(item,item2,item3) {				uni.navigateTo({					url:'../classroom/classroom?id='+item+'&classroom='+item2+'&classBuildingId='+item3									})							}				},			}</script>

<style lang="scss" scoped>
	.container{
	  display: flex;
	  flex-direction: row;
	  justify-content: center;
	  align-items: center;
	  margin-top: 2%;
	} 
	
	.background{
	  width: 100%;
	  position: fixed;
	  bottom: 0;
	  right: 0;
	  z-index: -1;
	}
	
	// .building-container {
	// 	background-image: url('https://static01.imgkr.com/temp/5aa8f2bc6cd242bfaeb1ce3a00f565da.png');
	// 	background-repeat: no-repeat;
	// 	 background-attachment: fixed ;
	// 	background-size: contain;
	// 	background-position: 100% 100%;
	// }
	
	.row{
		margin-left: 8%;
		width: 84%;
		display: flex;
		flex-direction: row;
	    justify-content: space-between;
		align-items: center;
	}
	.row1{
	  display: flex;
	  flex-direction: row;
	  justify-content: center;
	  align-items: center;
	}
	.text1{
	  font-size: 62rpx;
	}
	.text2{
	  font-size: 35rpx;
	}
	.row1 image{
	  width: 10rpx;
	}
	/* 宽图标 */
	.row2-wide image{
		margin-right: 60rpx;
		height: 80rpx;
		
	}
	/* 窄图标 */
	.row2-narrow image{
	  height: 112rpx;
	}
	.building-floor{
		margin-top: 11%;
		padding-left: 7%;
		padding-right: 7%;
	}
	.building{
	  width: 100%;
	  // margin-top: 8%;
	  // margin-bottom: 12%;
	  display: flex;
	  flex-direction: column;
	}
	.building-n{
		margin-left: 20rpx;
	}
	.floor{
	  // margin-top: 9%;
	  margin-bottom: 2%;
	  padding-bottom: 20rpx;
	  display: flex;
	  // flex-direction: column;
	  align-items: center;
	  // justify-content: center;
	  border: rgb(255, 255, 255) solid 3rpx;
	  border-radius: 25rpx;
	  box-shadow:0rpx 0rpx 10rpx 3rpx rgb(203,203,207);
	  flex-wrap: wrap;
	  padding: 10rpx;
	}
	
	.floornum{
		 margin-bottom: 10rpx;
	}
	
	.floornum text{
	  position: absolute;
	  left: 8%;
	  font-size: 45rpx;
	  align-items: center;
	}
	.classroomnum{
	  width: 16%;
	  display: flex;
	  justify-content: space-around;  
	  
	  margin: 10rpx;
	} 
	/* 空教室 */ 
	// <!-- free -->
	.class{
		width:70rpx;
		height: 70rpx;		
		text-align: center;
		line-height: 70rpx;
		border: #D6CECE solid 3rpx;
		border-radius: 50%;
	}
	
	// <!-- using -->
	.class2{
		width:70rpx;
		height: 70rpx;		
		text-align: center;
		line-height: 70rpx;
		border: rgb(194, 194, 194) solid 3rpx;
		border-radius: 50%;
		background-color: #B20103;
		color: rgb(255, 255, 255);
	}
	
	// <!-- will -->
	.class3{
		width:70rpx;
		height: 70rpx;		
		text-align: center;
		line-height: 70rpx;
		border: #B20103 solid 3rpx;
		border-radius: 50%;
	}
	
	

	.class text{
		margin: 0 auto;
	}

	/* 即将使用 */
	.classwillusing{
	  margin-right: 7.5%;
	  margin-top: 8%;
	}
	.classwillusing text{
	  padding: 24% 12% 24% 12%;
	  width: 10%;
	  border: rgb(172, 0, 0) solid 3rpx;
	  border-radius: 100%;
	}
	/* 正在使用 */
	.classusing{
	  margin-right: 7.5%;
	  margin-top: 8%;
	}
	.classusing text{
	  color: white;
	  padding: 24% 12% 24% 12%;
	  width: 10%;
	  border: rgb(194, 194, 194) solid 3rpx;
	  border-radius: 100%;
	  background-color: rgb(194, 0, 0);
	}
	.tjut-logo{
	  width: 90%;
	  position: fixed;
	  bottom: 0;
	  right: 0;
	  /* z-index: -1; */
	}
	

	
		
	
</style>
