<template>
	<view class="building-container">

		<image class="background" mode="widthFix" src="../../static/tjut-zixiba/tjut.png"></image>

		<!--全局-->
		
		<view class="container">
		    <!--顶框-->
		    <view class="row">
			  
				<!--left-->
				<view class="row1">
					<image src="../../static/tjut-zixiba/line1.png" class="image0"></image>
					<view class="rowtext">
						<text class="text0">{{building}}&nbsp;号楼</text>
						<text class="text1">{{year}}/{{month}}/{{day}}&nbsp;{{week}}</text>
					</view>
				</view>
			
				<!--right-->
				<view class="right-classroom">
				    <text class="text2">{{classroom}}</text>
				</view>
		    </view>
		
		
			<view class="rownum" v-for="(item,i) in classes" :key="i" >
				<!--left--> 
				<view class="row2">
					
					<view :class="[i + 1 === nowSection ? 'xiaotiao2':'xiaotiao']" :style="" ></view>
					
				    <view class="rowtext2">
						<text  class="text3">第&nbsp;{{i+1}}&nbsp;节</text>
						<text  class="text1">{{classes[i].title}}&nbsp;&nbsp;&nbsp;&nbsp;{{classes[i].subTitle}}&nbsp;&nbsp;&nbsp;&nbsp;{{classes[i].person}}</text>
						<!-- <text class="text1"></text> -->
				    </view>
				</view>
			</view>
		 
		</view>
		
		<navigator :url="'/pages/book/book?building='+ building+ '&classroom=' + classroom +'&classBook='+ 1 +'&id=' + id" class="butt"><button class="button">预约</button></navigator>
		
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				id:0,
				building: 0,
				year:'',
				month:'',
				day:'',
				week:'',
				classroom: '101',
				classes: [],
				nowSection:0
			};
			
		},
		onLoad(option) {
			this.building = option.classBuildingId
			this.classroom = option.classroom
			this.id = option.id
			this.getDateTime()
			this.getClasses(option.id)		
		},
		onReady() {
			
		},
		methods:{
			async getClasses(option) {
				
				const { data: res } = await uni.$http.get('/classroom?id='+option) 
					
					this.classes = res.data.classes
					this.nowSection = res.data.nowSection
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
			
		}
		
		
	}
</script>

<style lang="scss" scoped>
	
	.background{
	  width: 100%;
	  position: fixed;
	  bottom: 0;
	  right: 0;
	  z-index: -1;
	}
	
	
	.tjut-logo{
	  width: 90%;
	  position: fixed;
	  bottom: 0;
	  right: 0;
	  /* z-index: -1; */
	}
	
	.container{
	  margin-top: 2%;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	}
	
	.row{
	  width: 90%;
	  height: 170rpx;
	  padding-left: 12%;
	  padding-right: 12%;
	  display: flex;
	  flex-direction: row;
	  justify-content: space-between;
	  align-items: center;
	}
	
	.right-classroom{
		margin-right: 1%;
	}
	
	.rownum{
	  width: 90%;
	  height: 150rpx;
	  display: flex;
	  flex-direction: row;
	  justify-content: space-between;
	  align-items: center;
	  margin-top: 5%;
	  border-radius: 15rpx;
	  box-shadow:0rpx 0rpx 10rpx 3rpx rgb(203,203,207);
	}
	
	.row2{
		display: flex;
		// flex-direction: row;
		// justify-content: center;
		align-items: center;
	  
		.xiaotiao{
			width: 10rpx;
			height: 100rpx;
			content: '';
			background-color: grey;
			margin-left: 16rpx;
		}
		
		.xiaotiao2{
			width: 10rpx;
			height: 100rpx;
			content: '';
			background-color: #B20103;
			margin-left: 16rpx;
		}
		
		
	}
	

	
	.row1{
	  display: flex;
	  flex-direction: row;
	  justify-content: center;
	  align-items: center;
	  margin-left: 2%;
	}
	
	.row1 image{
	  width: 10rpx;
	  height: 100rpx;
	}
	
	.rowtext{
	  display: flex;
	  flex-direction: column;
	  margin-left: 20rpx;
	}
	
	.rowtext2{
	  display: flex;
	  flex-direction: column;
	  margin-left: 20rpx;
	}
	
	.text0{
	  font-size: 50rpx;
	}
	
	.text1{
	  
	  color: #888;
	}
	
	.text2{
	  font-size: 70rpx;
	}
	
	.text3{
	  
	  color: #888;
	}
	
	
	.butt{
		width: 100%;
		
		margin-top: 100rpx;
		margin-bottom: 120rpx;
	}
	
	.button{
		width: 80%;
	}
</style>
