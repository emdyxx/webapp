    /*********************3.1车型管理---车型管理****************** */
	 var id4;//左侧tree树的真实id
	 var motorcycletypelevel; //车型的等级
	 var motorcycletypeGroupId; //车型的顶级用户组id
	 var idx = [];
	 $('#managementli31').click(function(){
		clearInterval(seti);
		clearInterval(Realtimeconditionset);
	 	id4='';
	 	$('main>div').css('display', 'none');
		$('.Motorcyclebottom-right-div').css('display','none')
		$('.Motorcyclebottom-right2').css('display','')
    	$('.MotorcycleType').css('display','')
    	//权限判断
		var data={
			id:$('#managementli31').attr('name')
		}	
		$.post(server_context+'/setMenuId',data,function(data){
			if(data.error_code!=0){
				Statuscodeprompt(data.error_code)
			}
			for(var i=0;i<data.data.length;i++){
				if(data.data[i]==31){
					$('.MotorcycleAdd').css('display','');
				}
				if(data.data[i]==32){
					$('.MotorcycleMove').css('display','');
				}
				if(data.data[i]==33){
					$('.Motorcyclebaocun').css('display','');
				}
			}
		})
		//树状表
	    $('.Motorcyclebottom-tree').tree({
			url: server_context+'/listVehicleModelTree',
			method: 'post',
			animate: 'true',
			loadFilter: function(rows) {
				return rows.data;
				// return conver(rows);
			},
			onSelect: function(node) {
                id4 = node.id;
				motorcycletypelevel = node.level;
				motorcycletypeGroupId = node.topGroupId;
				return Motorcycletree(node);
			}
		})
	 })
	 //找出选中tree树的值
	 function Motorcycletree(node){
        if(motorcycletypelevel==4){
            $('.Motorcyclebottom-right-div').css('display','')
			$('.Motorcyclebottom-right2').css('display','none')
			$.ajax({
				url:server_context+'/getRemoteFeature',
				type:'post',
				async:'true',
				data:{
					id:id4
				},
				success:function(data){
					var data = data.data[0].remoteFeature
                    if(data.CENTRAL_LOCK==1){
						$('.Motorcyspanimg>img').eq(0).attr('src','img/MotorcycleType/xuanzhong.png')
					}else{
						$('.Motorcyspanimg>img').eq(0).attr('src','img/MotorcycleType/weixuanzhong.png')
					}
					if(data.ENGINE==1){
						$('.Motorcyspanimg>img').eq(1).attr('src','img/MotorcycleType/xuanzhong.png')
					}else{
						$('.Motorcyspanimg>img').eq(1).attr('src','img/MotorcycleType/weixuanzhong.png')
					}
					if(data.AC==1){
						$('.Motorcyspanimg>img').eq(2).attr('src','img/MotorcycleType/xuanzhong.png')
					}else{
						$('.Motorcyspanimg>img').eq(2).attr('src','img/MotorcycleType/weixuanzhong.png')
					}
					if(data.AC_PM==1){
						$('.Motorcyspanimg>img').eq(3).attr('src','img/MotorcycleType/xuanzhong.png')
					}else{
						$('.Motorcyspanimg>img').eq(3).attr('src','img/MotorcycleType/weixuanzhong.png')
					}
					if(data.AC_SEAT==1){
						$('.Motorcyspanimg>img').eq(4).attr('src','img/MotorcycleType/xuanzhong.png')
					}else{
						$('.Motorcyspanimg>img').eq(4).attr('src','img/MotorcycleType/weixuanzhong.png')
					}
					if(data.WINDOW_UP==1){
						$('.Motorcyspanimg>img').eq(5).attr('src','img/MotorcycleType/xuanzhong.png')
					}else{
						$('.Motorcyspanimg>img').eq(5).attr('src','img/MotorcycleType/weixuanzhong.png')
					}
					if(data.SUNROOF==1){
						$('.Motorcyspanimg>img').eq(6).attr('src','img/MotorcycleType/xuanzhong.png')
					}else{
						$('.Motorcyspanimg>img').eq(6).attr('src','img/MotorcycleType/weixuanzhong.png')
					}
					if(data.WINDOW_DOWN==1){
						$('.Motorcyspanimg>img').eq(7).attr('src','img/MotorcycleType/xuanzhong.png')
					}else{
						$('.Motorcyspanimg>img').eq(7).attr('src','img/MotorcycleType/weixuanzhong.png')
					}
					if(data.TRACKING==1){
						$('.Motorcyspanimg>img').eq(8).attr('src','img/MotorcycleType/xuanzhong.png')
					}else{
						$('.Motorcyspanimg>img').eq(8).attr('src','img/MotorcycleType/weixuanzhong.png')
					}
					if(data.TRUNK_OPEN==1){
						$('.Motorcyspanimg>img').eq(9).attr('src','img/MotorcycleType/xuanzhong.png')
					}else{
						$('.Motorcyspanimg>img').eq(9).attr('src','img/MotorcycleType/weixuanzhong.png')
					}
					if(data.TRUNK_CLOSE==1){
						$('.Motorcyspanimg>img').eq(10).attr('src','img/MotorcycleType/xuanzhong.png')
					}else{
						$('.Motorcyspanimg>img').eq(10).attr('src','img/MotorcycleType/weixuanzhong.png')
					}
					if(data.POWER==1){
						$('.Motorcyspanimg>img').eq(11).attr('src','img/MotorcycleType/xuanzhong.png')
					}else{
						$('.Motorcyspanimg>img').eq(11).attr('src','img/MotorcycleType/weixuanzhong.png')
					}
				}
			})
			// ThirdpartyEquipments()
        }else{
			$('.Motorcyclebottom-right-div').css('display','none')
            $('.Motorcyclebottom-right2').css('display','')
		}
	 }
	 //远程控制权限保存按钮
	 $('.Motorcyclebaocun').click(function(){
		 console.log('123456')
	 	for(var i=0;i<$('.Motorcyspanimg>img').length;i++){
	 		var src = $('.Motorcyspanimg>img').eq(i).attr('src');
	 		if(src=='img/MotorcycleType/xuanzhong.png'){
	 			$('.Motorcyspanimg>img').eq(i).attr('name','1')
	 		}else if(src=='img/MotorcycleType/weixuanzhong.png'){
	 			$('.Motorcyspanimg>img').eq(i).attr('name','0')
	 		}
	 	}
		// var astrilateraldClick = document.querySelectorAll('.trilaterald9')
	 	var remoteFeature = {
            CENTRAL_LOCK:$('.Motorcyspanimg>img').eq(0).attr('name'),
	 		ENGINE:$('.Motorcyspanimg>img').eq(1).attr('name'),
	 		AC:$('.Motorcyspanimg>img').eq(2).attr('name'),
	 		AC_PM:$('.Motorcyspanimg>img').eq(3).attr('name'),
	 		AC_SEAT:$('.Motorcyspanimg>img').eq(4).attr('name'),
	 		WINDOW_UP:$('.Motorcyspanimg>img').eq(5).attr('name'),
	 		SUNROOF:$('.Motorcyspanimg>img').eq(6).attr('name'),
	 		WINDOW_DOWN:$('.Motorcyspanimg>img').eq(7).attr('name'),
	 		TRACKING:$('.Motorcyspanimg>img').eq(8).attr('name'),
	 		TRUNK_OPEN:$('.Motorcyspanimg>img').eq(9).attr('name'),
	 		TRUNK_CLOSE:$('.Motorcyspanimg>img').eq(10).attr('name'),
	 		POWER:$('.Motorcyspanimg>img').eq(11).attr('name')
		}
	 	// for(var i = 0;i<astrilateraldClick.length;i++){
		// 	astrilateraldClick[i].index = i;
        //     var src = $('.trilaterald9').eq(i).attr('src')
		// 	if(src=='img/MotorcycleType/weixuanzhong.png'){
		// 		$('.trilaterald9').eq(i).attr('id','0')
		// 	    name = $('.trilaterald9').eq(i).attr('name')
		// 		statu = $('.trilaterald9').eq(i).attr('id')
		// 		remoteFeature[name]= statu
		// 	}else{
		// 		$('.trilaterald9').eq(i).attr('id','1')
        //         name = $('.trilaterald9').eq(i).attr('name')
		// 		statu = $('.trilaterald9').eq(i).attr('id')
		// 		remoteFeature[name] = statu
		// 	}
		// }
		// console.log($('.trilaterald1').length)
		// var extendParts = [];
		// for(var i = 0;i<$('.trilaterald1').length;i++){
		// 	extendParts.push($('.trilaterald1').eq(i).attr('id'))
		// }
		// var array = [];
		// array.push(remoteFeature)
		// console.log(array)
		// var data = {
			// id:id4,
			// remoteFeature:JSON.stringify(array),
			// extendParts:extendParts.join(',')
	 	// }
	 	$.ajax({
	 		type:"post",
	 		url:server_context+"/updateRemoteFeature",
	 		async:true,
	 		data:{
				 id:id4,
				 remoteFeature:JSON.stringify(remoteFeature)
			 },
	 		success:function(data){
	 			if(data.error_code==0){
	 				$.messager.alert("系统提示",'远程权限保存成功','info')
					Motorcycletree()
	 			}else{
					 Statuscodeprompt(data.error_code,"远程权限保存失败...",'error')
				 }
	 		}
	 	});
	 })
	
	$('.MotorcycleAdd').linkbutton({
		text: '添加车型',
		iconCls: 'icon-tianjiaa'
	})
	$('.MotorcycleMove').linkbutton({
		text: '删除车型',
		iconCls: 'icon-shanchu'
	})
	//点击添加车型按钮
	$('.MotorcycleAdd').click(function(){
		if(!id4){
			$.messager.alert("系统提示",'请选择车型组进行添加','warning');
			return false;
		}
		if(motorcycletypelevel==4){
            $.messager.alert("系统提示",'车型最多添加四级','warning');
			return false;
		}
		$('#MotorcycleModal').modal('show');
		$('.Motorcycleinput').val('')
		$('.Motorcycleinput-alias').val('')
		if(motorcycletypelevel==0){
            $('#motorcycletype-type').text('品牌:')
			$('#motorcycletype-alias').css('display','none')
		}
		if(motorcycletypelevel==1){
            $('#motorcycletype-type').text('系列:')
			$('#motorcycletype-alias').css('display','')
		}
		if(motorcycletypelevel==2){
            $('#motorcycletype-type').text('排量:')
			$('#motorcycletype-alias').css('display','none')
		}
		if(motorcycletypelevel==3){
            $('#motorcycletype-type').text('配置:')
			$('#motorcycletype-alias').css('display','none')
		}
	})
	//点击删除车型按钮
	$('.MotorcycleMove').click(function(){
		if(!id4){
			$.messager.alert("系统提示",'请选择车型进行删除','warning');
			return;
		}
		$.messager.confirm('系统提示','你确认删除此车型吗?',function(r){
			if(r) {
				$.ajax({
					type: "post",
					url: server_context+"/removeVehicleModel",
					async: true,
					data: {
						vehicleModelId: id4
					},
					success: function(data) {
						if(data.error_code == 0) {
							$.messager.alert("系统提示", "删除成功",'info');
							$(".Motorcyclebottom-tree").tree('reload');
						} else {
							Statuscodeprompt(data.error_code,"删除失败,或请先删除子车型...",'error')
						}
					}
				})
			}
		})
	})
	//添加车型提交按钮
	$('.Motorcyclebutton').click(function(){
		var modelAli;
		if($('.Motorcycleinput').val()==''||$('.Motorcycleinput').val()==null||$('.Motorcycleinput').val()=='undefined'){
           $.messager.alert('系统提示','必填字段不能为空','warning')
		   return;
		}
		if(motorcycletypelevel==1){
            if($('.Motorcycleinput-alias').val()==''||$('.Motorcycleinput-alias').val()==null||$('.Motorcycleinput-alias').val()=='undefined'){
                $.messager.alert('系统提示','必填字段不能为空','warning')
		        return;
			}
			modelAli=$('.Motorcycleinput-alias').val()
		}else{
			modelAli=''
		}
		var data = {
			parentId:id4,
			topGroupId:motorcycletypeGroupId,
			level:motorcycletypelevel,
			vehicleModelName:$('.Motorcycleinput').val(),
			modelAlias:modelAli
		}
		$.ajax({
			type:"post",
			url:server_context+"/saveVehicleModel",
			async:true,
			data:data,
			success:function(data){
				if(data.error_code==0){
				    $.messager.alert("系统提示",'添加车型成功','info')
				    $('#MotorcycleModal').modal('hide');
                    $('.Motorcyclebottom-tree').tree('reload')
				}else{
					Statuscodeprompt(data.error_code,"添加车型成功失败...",'error')
				}
			}
		});
	})
	//选中未选中的点击事件
	var img = document.querySelectorAll('.Motorcyspanimg>img');
	for(var i = 0;i<img.length;i++){
		img[i].index = i
		img[i].onclick = function(){
			var j = this.index;
			var src = $('.Motorcyspanimg>img').eq(j).attr('src');
			if(src=='img/MotorcycleType/xuanzhong.png'){
				$('.Motorcyspanimg>img').eq(j).attr('src','img/MotorcycleType/weixuanzhong.png')
			}else if(src=='img/MotorcycleType/weixuanzhong.png'){
	            $('.Motorcyspanimg>img').eq(j).attr('src','img/MotorcycleType/xuanzhong.png')
			}
		}
	}
	
	//第三方增加按钮
	// $('.ThirdPartyAdd').click(function(){
    //    $('#MotorcyclebottommyModal').modal('show');
	//    setTimeout(function(){
	// 	   $('#ThirdParty').datagrid({
	// 		    url: server_context+"/listNotHaveExtendParts",
	// 			singSelect: false,
	// 			rownumbers: "true",
	// 			fit: 'true',
	// 			fitColumns: 'true',
	// 			nowrap: 'true',
	// 			queryParams:{
    //                  id:id4
	// 			},
	// 			columns:[[
	// 				{ field:"cb",checkbox:"true",align:"center"},
	// 				{ field:"extendPartsName",title:'第三方名称',align:"center",width:'48%',formatter: function (value) {return dataProcessing(value);}},
	// 				{ field:"maker",title:'制造商',align:"center",formatter: function (value) {return dataProcessing(value);}}
	// 			]],
	// 			onLoadSuccess:function(data){
	// 				if(data.error_code!=0){
	// 					Statuscodeprompt(data.error_code)
	// 				}
	// 			}
	// 	   })
	//    },500)
	// })
    
    //第三方增加保存按钮
	// $('.Motorcyclebottommybc').click(function(){
	// 	var row = $('#ThirdParty').datagrid('getChecked');
	// 	var id = [];
	// 	if(row==null||row==''){
    //         $.messager.alert('系统提示','请选择设备进行保存','error');
	// 		return;
	// 	}
    //     for(var i = 0;i<row.length;i++){
	// 		id.push(row[i].id)
	// 	}
	// 	$.ajax({
	// 		url: server_context+'/saveVehicleModelExtendParts',
	// 		async:true,
	// 		type:'post',
	// 		data:{
	// 			extendPartsId:id.join(','),
	// 			id:id4
	// 		},
	// 		success:function(data){
	// 			if(data.error_code!=0){
	// 				Statuscodeprompt(data.error_code)
	// 			}
	// 			$.messager.alert('系统提示','保存成功','error');
	// 			$('#MotorcyclebottommyModal').modal('hide');
	// 			ThirdpartyEquipments()
	// 		}
	// 	})
	// })

    //第三方设备请求接口
	// function ThirdpartyEquipments(){
	// 	$('.Motorcyclebottom-right-divtwo>div').remove();
	// 	$('.Motorcyclebottom-right-divtwo').text('');
	// 	$('.Motorcyclebottom-right-divtwo').css({'font-size':'14px','color':'black'})
	// 	$.ajax({
	// 		url: server_context+'/listHaveExtendParts',
	// 		async:true,
	// 		type:'post',
	// 		data:{
	// 			id:id4
	// 		},
	// 		success:function(data){
	// 		    var list = '';
	// 			var lis = '';
	// 			if(data.error_code!=0){
    //                Statuscodeprompt(data.error_code) 
	// 			   return;
	// 			}
	// 			if(data.data==''||data.data.length==0){
	// 				$('.Motorcyclebottom-right-divtwo').text('暂无第三方设备,请添加');
	// 				$('.Motorcyclebottom-right-divtwo').css({'font-size':'30px','color':'gray'})
	// 				return;
	// 			}
    //             for(var i = 0;i<data.data.length;i++){
	// 			   list = ''
	// 			   for(var j=0;j<data.data[i].remoteFeature.length;j++){
	// 				   lis = '';
	// 				   if(data.data[i].remoteFeature[j].checked==false){
	// 					   lis = "<span class='trilaterald8'>"+"<img class='trilaterald9' src='img/MotorcycleType/weixuanzhong.png' name="+data.data[i].remoteFeature[j].code+">"+"</span>"
	// 				   }else{
	// 					   lis = "<span class='trilaterald8'>"+"<img class='trilaterald9' src='img/MotorcycleType/xuanzhong.png' name="+data.data[i].remoteFeature[j].code+">"+"</span>"
	// 				   }
    //                    list += "<div class='trilaterald4'>"+
	// 				   "<span class='trilaterald5'>"+data.data[i].remoteFeature[j].name+"</span>"
	// 				   +"<span class='trilaterald6'>"+"<img class='trilaterald7' src="+data.data[i].remoteFeature[j].img+">"
	// 				   +"</span>"+lis+"</div>"
	// 			   }
    //                $('.Motorcyclebottom-right-divtwo').append("<div class='trilaterald1' id="+data.data[i].id+">"
	// 			    +"<p class='trilaterald2'>"+"<input type='checkbox' class='trilaterald3'>"+data.data[i].extendPartsName+"</input>"+"</p>"
	// 				+list+"</div>");
	// 			}
    //             var astrilateraldClick = document.querySelectorAll('.trilaterald9')
	// 			for(var i=0;i<astrilateraldClick.length;i++){
	// 				astrilateraldClick[i].index = i;
	// 				astrilateraldClick[i].onclick = function(){
	// 					var j = this.index;
	// 					var src = $('.trilaterald9').eq(j).attr('src')
	// 					if(src=='img/MotorcycleType/weixuanzhong.png'){
    //                         $('.trilaterald9').eq(j).attr('src','img/MotorcycleType/xuanzhong.png')
	// 					}else{
	// 						$('.trilaterald9').eq(j).attr('src','img/MotorcycleType/weixuanzhong.png')
	// 					}
	// 				}
	// 			}
	// 		}
	// 	})
	// }
	//第三方设备删除按钮
    // $('.ThirdPartyRemove').click(function(){
	// 	idx = [];
	// 	for(var i = 0;i<$('.trilaterald3').length;i++){
	// 		if($('.trilaterald3').eq(i).is(':checked')==true){
	// 			idx.push(i)
	// 		}
	// 	}
	// 	if(idx.length==0){
	// 		$.messager.alert('系统提示','请选择数据进行删除','error');
	// 		return false;
	// 	}
	// 	if(idx.length>=2){
	// 		$.messager.alert('系统提示','请选择一条数据进行删除','error');
	// 		return false;
	// 	}
	// 	$.messager.confirm('系统提示','确认删除',function(r){
	// 		if(r){
	// 			$('.Motorcyclebottom-right-divtwo>div').eq(idx[0]).remove();
	// 			idx = [];
	// 		}
	// 	})
	// })
    /**************************4.4设备管理---第三方设备***************************/
	//第三方设备
	// $('#managementli12').click(function(){
	// 	clearInterval(seti);
	// 	clearInterval(Realtimeconditionset);
	// 	$('main>div').css('display', 'none');
	// 	$('.ThirdpartyEquipment').css('display','')
	// 	//权限判断
	// 	var data={
	// 		id:$('#managementli12').attr('name')
	// 	}	
	// 	$.post(server_context+'/setMenuId',data,function(data){
	// 		if(data.error_code!=0){
	// 			Statuscodeprompt(data.error_code)
	// 		}
	// 		for(var i=0;i<data.data.length;i++){
	// 			if(data.data[i]==31){
	// 				$('.MotorcycleAdd').css('display','');
	// 			}
	// 			if(data.data[i]==32){
	// 				$('.MotorcycleMove').css('display','');
	// 			}
	// 			if(data.data[i]==33){
	// 				$('.Motorcyclebaocun').css('display','');
	// 			}
	// 		}
	// 	})
	// 	//表加载
    //     $('#ThirdpartyEquipment-datagrid').datagrid({
    //         url: server_context+"/",
	// 			singSelect: false,
	// 			rownumbers: "true",
	// 			fit: 'true',
	// 			fitColumns: 'true',
	// 			nowrap: 'true',
	// 			pageSize:50,
	// 			pagination: "true",
	// 			columns:[[
	// 				{ field:"cb",checkbox:"true",align:"center"},
	// 				{ field:"deviceName",title:'第三方设备名称',align:"center",width:'24%',formatter: function (value) {return dataProcessing(value);}},
	// 				{ field:"sn",title:'设备序列号',align:"center",width:'24%',formatter: function (value) {return dataProcessing(value);}},
	// 				{ field:"mac",title:'设备MAC地址',align:"center",width:'24%',formatter: function (value) {return dataProcessing(value);}},
	// 				{ field:"status",title:'设备状态',align:"center",width:'24%',formatter: function (value) {return dataProcessing(value);}},
	// 				{ field:"bindTime",title:'绑定时间',align:"center",width:'24%',formatter: function (value) {return dataProcessing(value);}},
	// 				{ field:"deviceId",title:'绑定设备编号',align:"center",width:'24%',formatter: function (value) {return dataProcessing(value);}},
	// 				{ field:"ts",title:'创建时间',align:"center",width:'24%',formatter: function (value) {return dataProcessing(value);}},
	// 			]],
	// 			onLoadSuccess:function(data){
	// 				if(data.error_code!=0){
	// 					Statuscodeprompt(data.error_code)
	// 				}
	// 			}
	// 	})
	// })
    
	// //查询第三方设备
	// function ThirdpartyEquipmentinquire(){
	// 	 $('#ThirdpartyEquipment-datagrid').datagrid('load',{
	// 		 deviceName:$('#ThirdpartyEquipment-deviceName').val(),
	// 		 model:$('#ThirdpartyEquipment-model').val()
	// 	 })
	// }

    // //新增第三方设备
	// function ThirdpartyEquipmentadd(){
    //    $('#ThirdpartyEquipmentaddModal').modal('show');
	//    $('.ThirdpartyEquipmentaddTitle').text('新增第三方设备')
       
	// }

	// //修改第三方设备
	// function ThirdpartyEquipmentrevamp(){
	//    $('#ThirdpartyEquipmentaddModal').modal('show');
	//    $('.ThirdpartyEquipmentaddTitle').text('修改第三方设备')
       
	// }

	// //删除第三方设备
	// function ThirdpartyEquipmentremove(){
    //    var row= $('#ThirdpartyEquipment-datagrid').datagrid('getChecked');
	//    if(row.length==0||row==null||row==''){
    //         $.messager.alert('系统提示','请选择第三方设备进行删除','error');
	// 		return;
	//    }
	//    $.messager.confirm('系统提示','确认删除',function(r){
	// 	   if(r){
	// 		   $.ajax({
	// 			   url: +'',
	// 			   async:true,
	// 			   type:'post',
	// 			   data:{},
	// 			   success:function(data){
	// 				   if(data.error_code!=0){
	// 					   Statuscodeprompt(data.error_code);
	// 				   }
	// 				   $.messager.alert('系统提示','删除成功','info');
	// 				   $('#ThirdpartyEquipment-datagrid').datagrid('reload');
	// 			   }
	// 		   })
	// 	   }
	//    })
	// }