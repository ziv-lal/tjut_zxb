<template>
	<view>
		<image class="background" mode="widthFix" src="../../static/tjut-zixiba/tjut.png"></image>
		
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
			
			<uni-section class="apply-form-container" title="预约信息" type="line">
				<uni-forms ref="applyForm" :rules="rules" :modelValue="applyData" label-position="top">
					<view class="apply-form">
						<uni-forms-item label="教室id">
							<uni-easyinput v-model="applyData.classroomId" :placeholder="classroomId" disabled/>
						</uni-forms-item>
						<uni-forms-item label="事件" required name="event">
							<uni-easyinput v-model="applyData.event" placeholder="请输入事件" />
						</uni-forms-item>
						<uni-forms-item label="理由" required name="reason">
							<uni-easyinput v-model="applyData.reason" placeholder="请输入理由" />
						</uni-forms-item>
						<uni-forms-item label="预约日期" required name="dateString">
							<uni-datetime-picker type="date" :clear-icon="false" v-model="applyData.dateString"/>
						</uni-forms-item>
						<uni-forms-item label="预约节次" required name="sections">
							<uni-data-checkbox mode="tag" multiple v-model="applyData.sections" :localdata="sections"></uni-data-checkbox>
						</uni-forms-item>
						<uni-forms-item label="预约人" required name="applyUser">
							<uni-easyinput v-model="applyData.applyUser" placeholder="请输入您的姓名" />
						</uni-forms-item>
						<uni-forms-item label="联系方式" required name="contact">
							<uni-easyinput v-model="applyData.contact" placeholder="请输入您的联系方式" />
						</uni-forms-item>
					</view>
				</uni-forms>
				<button type="primary" @click="submit('applyForm')">提交</button>
			</uni-section>
		</view> 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				year:'',
				month:'',
				day:'',
				week:'',
				classroomId:0,
				classroom:0,
				building:0,
				
				applyData:{
					classroomId:0,
					sections:"",
					event:"",
					reason:"",
					dateString:"",
					applyUser:"",
					contact:"",
					status:0
				},
				
				sections:[{
					text:"1",
					value:1
				},{
					text:"2",
					value:2
				},{
					text:"3",
					value:3
				},{
					text:"4",
					value:4
				},{
					text:"5",
					value:5
				},{
					text:"6",
					value:6
				},{
					text:"7",
					value:7
				},{
					text:"8",
					value:8
				},{
					text:"9",
					value:9
				},{
					text:"10",
					value:10
				},{
					text:"11",
					value:11
				}],
				// 校验规则
				rules: {
					event: {
						rules: [{
							required: true,
							errorMessage: '事件不能为空'
						}]
					},
					reason: {
						rules: [{
							required: true,
							errorMessage: '理由不能为空'
						}]
					},
					dateString: {
						rules: [{
							required: true,
							errorMessage: '日期不能为空'
						}]
					},
					applyUser: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空'
						}]
					},
					contact: {
						rules: [{
							required: true,
							errorMessage: '联系方式不能为空'
						}]
					},
					sections: {
						rules: [{
							required: true,
							errorMessage: '至少选择一节'
						}]
					},
				},
				book:{
				    id: 0, // 删除用的id
				    className: "",
				    classUseTimeEnd: 0,
				    classUseTimeStart: 0,
				    teacher: ""
				  },
				datetimerange:''
			}
		}, 
		onLoad(option) {
			this.classroomId = option.id
			this.building = option.building
			this.classroom = option.classroom
			this.applyData.classroomId = option.id
			this.getDateTime()
		}, 
		methods: {
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
			bindDateChange: function(e) {
				this.applyData.dateString = e.detail.value;
			},
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					console.log(this.applyData);
					// 发送请求
					uni.request({
						url:"http://localhost:8080/wm/add",
						method:'POST',
						data: this.applyData,
						header:{
							"content-type":"application/x-www-form-urlencoded"
						},
						success: (res) => {
							console.log("数据" + res.data);
							if (res.data.code === '00000'){
								setTimeout(() => {
									console.log('Action executed after 800ms');
									uni.showToast({
										title: `预约申请已提交`
									})
								}, 800);
								uni.navigateBack()
							} else {
								setTimeout(() => {
									console.log('Action executed after 800ms');
									uni.showToast({
										title: res.data.message,
										icon:'error'
									})
								}, 800);
								uni.navigateBack()
							}
						}
					})
					
				}).catch(err => {
					console.log('err', err);
				})
			},
		},

		onReady() {
			
		},
	}
</script>

<style>
	.background{
	  width: 100%;
	  position: fixed;
	  bottom: 0;
	  right: 0;
	  z-index: -1;
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
	.text0{
	  font-size: 50rpx;
	}
	
	.text1{
	  
	  color: #888;
	}
	
	.text2{
	  font-size: 70rpx;
	}
	
	.right-classroom{
		margin-right: 1%;
	}
	.uni-form-item .title {
		padding: 20rpx 0;
	}
	.uni-btn-v{
		position: absolute;
		display: flex;
		width: 100%;
		bottom: 140rpx;
	}
	.uni-btn-v .button{
		width: 50rpx;
	}
	.basicInfo{
		align-items: center;
		flex-direction: column;
		width: 100%;
		height: 700rpx;
	}
	
	.uni-input{
		border-radius: 1rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		height: 130rpx;
		font-size: 50rpx;
	}
	.apply-form{
		padding: 16px;
	}
	.apply-form-container{
		width:90%;
	}

</style>