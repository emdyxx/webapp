
/*****************2.1车主管理---车主管理*******************/
var id3;//tree树的真实id,判断是否选中,以及发请求携带的参数
var TheOwnerIp=0;//审核状态的权限
var ownerIds; //新增车主id
var owner0;
var TheOwnertopGroupId;
var LookUpindexThe;
$('.TheOwner').css('display', 'none');
$('#managementli5').click(function() {
	clearInterval(seti);
	clearInterval(Realtimeconditionset);
	id3=''
	$('main>div').css('display', 'none');
	$('.TheOwner').css('display', '');
	$('.TheOwner-bottom-right').css('display', 'none');
	//权限判断
	var data={
		id:$('#managementli5').attr('name')
	}	
	$.post(server_context+'/setMenuId',data,function(data){
		if(data.error_code!=0){
			Statuscodeprompt(data.error_code)
		}
		for(var i=0;i<data.data.length;i++){
			if(data.data[i]==20){
				$('.isrevadd').css('display','') //新增用户权限
			}
			if(data.data[i]==21){
				$('.isrevremove').css('display','')//删除用户权限
			}
			if(data.data[i]==22){
				$('.isrevload').css('display','')//修改用户权限
			}
			if(data.data[i]==23){
				TheOwnerIp=data.data[i]  //审核权限
			}
			if(data.data[i]==24){
                $('.Theownermigration').css('display','')//车主迁移权限
			}
		}
	})
	//树状表
    $('#TheOwner-tree').tree({
		url: server_context+'/listGroupTree',
		method: 'post',
		animate: 'true',
		loadFilter: function(data) {
			var data = data.data;
			return convert(data);
		},
		onSelect: function(node) {
			return TheOwner(node);
		}
	})
	//归属分组
	$('.GroupName').combotree({
        url: server_context+'/listGroupTree',
        method: 'post',
        required: true,
        editable:false,
        loadFilter: function (data) {
			var data =data.data
            return convert(data);
        }
    })
})
//根据选中tree树的id加载右侧表
function TheOwner(node){
	TheOwnertopGroupId=node.topGroupId
	$('.TheOwner-bottom-right').css('display', '');
	$('.TheOwner-inquire input').val('')
	$('.TheOwner-inquire select').val('')
	id3 = node.id;
	//上侧表
	$('#TheOwner-datagrid-top').datagrid({
		url: server_context+'/getGroupInfo',
		method: 'post',
		singleSelect: 'true',
		fit:'true',
		fitColumns: 'true',
		rownumbers: 'true',
		queryParams: {
			id:id3
		},
		columns:[[
			{ field:"groupName",title:'编组名称',align:"center",width: '16%'},
			{ field:"principal",title:'负责人',align:"center",width: '15%'},
			{ field:"address",title:'地址',align:"center",width: '22%'},
			{ field:"phone",title:'电话',align:"center",width: '16%'},
			{ field:"email",title:'邮箱',align:"center",width: '16%'},
			{ field:"ts",title:'创建时间',align:"center"}
		]]
	})
	//下侧表
	$('#TheOwner-datagrid-bottom').datagrid({
		url: server_context+'/listOwner',
		method: 'post',
		singSelect: 'false',
		fit:'true',
		fitColumns: 'true',
		rownumbers: 'true',
		pageSize:50,
		pagination: "true",
		queryParams: {
			groupId:id3,
            vin:$('.FrameNumber').val(), //车架号
			deviceId:$('.EquipmentNumber').val(),//设备编号
			groupName:$('.GroupName').val(),//编组名称
			bindStatus:$('.TheOwner-inquire-select').val(),//注册状态
			verifyStatus:$('.TheOwner-inquire-selecttwo').val()//审核状态
		},
		columns:[[
		    { field:"cb",checkbox:"true",align:"center"},
			{ field:"ownerName",title:'车主名称',align:"center",width: '12%'},
			{ field:"deviceId",title:'设备编号',align:"center",width: '13%'},
			{ field:"vin",title:'车架号',align:"center",width: '13%'},
			{ field:"groupName",title:'归属分组',align:"center",width: '12%'},
			{ field:"bindStatus",title:'注册状态',align:"center",width: '13%',
			    formatter: function (value, row, index) {
				  var value=row['bindStatus'];
				  if(value==0){
				  	return '<a style="color:#EC5759">'+"未注册"+'</a>';
				  }else{
				  	return '<a style="color:#7CAD16">'+"已注册"+'</a>';
				  }
				}
			},
			{ field:"verifyStatus",title:'审核状态',align:"center",width: '11%',
			        formatter: function (value, row, index) {
					  var value=row['verifyStatus'];
					  if(value==0){
					  	return '<a style="color:#FF7E00">'+"待审核"+'</a>';
					  } 
					  if(value==1){
					  	return '<a style="color:#7DAE16">'+"已审核"+'</a>';
					  }else{
					  	return '<a style="color:#ED585A" href=\javaScript:()>'+"审核未通过"+'</a>';
					  }
					} 
			},
			{ field:"verifyStatu",title:'审核操作',align:"center",width: '12%',
		        formatter: function (value, row, index) {
				  var value=row['verifyStatus'];
				  if(value==0){
				  	return '<a style="background:#FF7E00;display: inline-block;width: 60px;color: white;" href=\javaScript:ReviewOperation('+ index +') id="checkpending">待审核</a>';
				  }else if(value==1){
				  	return '<a style="background: #7DAE16;display: inline-block;width: 60px;color: white;" href=\javaScript:ReviewOperation('+ index +') id="checkpending">审核通过</a>';
				  }else{
				  	return '<a style="background: #ED585A;display: inline-block;width: 60px;color: white;" href=\javaScript:ReviewOperation('+ index +') id="checkpending">未通过</a>';
				  }
				}
			},
			{ field:"t",title:'更多操作',align:"center",width: '13%',
			    formatter: function (value, row, index) {
				  return '<a style="display:inline-block;line-height:20px;width:60px;height:20px;background:#00AAFF;color:white" id="LookUp" href=\javaScript:LookUp('+ index +')>'+"查看详情"+'</a>';
				}
			}
		]]
	})
}
//查询按钮
$('.TheOwner-inquire-cs').click(function(){
	$('#TheOwner-datagrid-bottom').datagrid('load',{
		groupId:id3,
		vin:$('.FrameNumber').val(), //车架号
		deviceId:$('.EquipmentNumber').val(),//设备编号
		groupName:$('.GroupName').val(),//编组名称
		bindStatus:$('.TheOwner-inquire-select').val(),//注册状态
		verifyStatus:$('.TheOwner-inquire-selecttwo').val()//审核状态
	})
})

//新增按钮
function TheOwneradd(){
	owner0=0
	$('#TheOwnerModal').modal('show');
	startusings()
	$('.tablefuwu tr input').removeAttr('disabled','disabled');
	$('.spanerror').html('')
	$('.TheOwnertitle').html('添加车主')
	$('.TheOwnerModal-body>form').css('display','none');
	$('.TheOwnerForm').css('display','');
	$('.Nextstepbutton>button').css('display','none')
	$('#Nextstep').css('display','')
	$('.TheOwnerForm')[0].reset();
	$("#vehicleModel").find("option").nextAll().remove();
	$("#vehicleDisplacement").find("option").nextAll().remove();
	$("#vehicleConfig").find("option").nextAll().remove();
	//三级联动省的请求
	$.ajax({
		type:"post",
		url:server_context+"/listArea",
		async:true,
		data:{
			level:1,
		},
		success:function(data){
			$("#TheOwnersheng").find("option").remove();
			for(var i=0;i<data.data.length;i++){
				$('<option value='+data.data[i].id+'>'+data.data[i].name+'</option>').appendTo('#TheOwnersheng')
			}
			var id = $('#TheOwnersheng').val();
			//三级联动市的请求
			$.ajax({
				type:"post",
				url:server_context+"/listArea",
				async:true,
				data:{
					level:2,
					pid:id
				},
				success:function(data){
					$("#TheOwnershi").find("option").remove();
					for(var i=0;i<data.data.length;i++){
						$('<option value='+data.data[i].id+'>'+data.data[i].name+'</option>').appendTo('#TheOwnershi')
					}
					var sd = $('#TheOwnershi').val();
					//三级联动县的请求
					$.ajax({
						type:"post",
						url:server_context+"/listArea",
						async:true,
						data:{
							level:3,
							pid:sd
						},
						success:function(data){
							$("#TheOwnerxian").find("option").remove();
							for(var i=0;i<data.data.length;i++){
								$('<option value='+data.data[i].id+'>'+data.data[i].name+'</option>').appendTo('#TheOwnerxian')
							}
						}
					});
				}
			});
		}
	});
    //保险公司的请求
	// $.ajax({
    // 	type:"post",
    // 	url:server_context+"/listInsurerName",
    // 	async:true,
    // 	success:function(data){
    // 		$("#insurerId option").remove();
	// 		for(var i=0;i<data.data.length;i++){
    //            $('<option value='+data.data[i].id+'>'+data.data[i].insurerName+'</option>').appendTo('#insurerId')
	// 		}
    // 	}
    // });
	//车辆品牌的信息
    $.ajax({
    	type:"post",
    	url:server_context+"/getVehicleBrand",
    	async:true,
		data:{
           topGroupId:TheOwnertopGroupId
		},
    	success:function(data){
    		$("#vehicleBrand").find("option").nextAll().remove();
    		for(var i = 0;i<data.data.length;i++){
    			$('<option value='+data.data[i].id+'>'+data.data[i].modelName+'</option>').appendTo('#vehicleBrand')
    		}
    	}
    });
}

//省的onchang事件
function wners(value){
	var id = value
$.ajax({
	type:"post",
	url:server_context+"/listArea",
	async:true,
	data:{
		level:2,
		pid:id
	},
	success:function(data){
		$("#TheOwnershi").find("option").remove();
		for(var i=0;i<data.data.length;i++){
			$('<option value='+data.data[i].id+'>'+data.data[i].name+'</option>').appendTo('#TheOwnershi')
		}
		var sd = $('#TheOwnershi').val();
		$.ajax({
			type:"post",
			url:server_context+"/listArea",
			async:true,
			data:{
				level:3,
				pid:sd
			},
			success:function(data){
				$("#TheOwnerxian").find("option").remove();
				for(var i=0;i<data.data.length;i++){
					$('<option value='+data.data[i].id+'>'+data.data[i].name+'</option>').appendTo('#TheOwnerxian')
				}
			}
		});
}})}
//市的onchang事件
function wnerx(value){
	var id = value;
	$.ajax({
		type:"post",
		url:server_context+"/listArea",
		async:true,
		data:{
			level:3,
			pid:id
		},
		success:function(data){
			$("#TheOwnerxian").find("option").remove();
			for(var i=0;i<data.data.length;i++){
				$('<option value='+data.data[i].id+'>'+data.data[i].name+'</option>').appendTo('#TheOwnerxian')
			}
		}
	});
}
//车辆品牌的onchang事件
function Brand(value){
	var id=value
	if(id==''){
       return
	}
	$.ajax({
		type:"post",
		url:server_context+"/getVehicleModel",
		async:true,
		data:{
           parentId:id,
		   level:2
		},
		success:function(data){
			$("#vehicleModel").find("option").nextAll().remove();
    		for(var i = 0;i<data.data.length;i++){
    			$('<option value='+data.data[i].id+'>'+data.data[i].modelName+'</option>').appendTo('#vehicleModel')
    		}
			vecle(value)
			place(value)
    	}
    });
}
//型号的onchang事件
function vecle(value){
	var id=value
	if(id==''){
       return
	}
	$.ajax({
		type:"post",
		url:server_context+"/getVehicleModel",
		async:true,
		data:{
			parentId:id,
			level:3
		},
		success:function(data){
			$("#vehicleDisplacement").find("option").nextAll().remove();
    		for(var i = 0;i<data.data.length;i++){
    			$('<option value='+data.data[i].id+'>'+data.data[i].modelName+'</option>').appendTo('#vehicleDisplacement')
    		    place(value)
		    }
    	}
    });
}
//排量的onchang事件
function place(value){
	var id=value
	if(id==''){
       return
	}
	$.ajax({
		type:"post",
		url:server_context+"/getVehicleModel",
		async:true,
		data:{
			parentId:id,
			level:4
		},
		success:function(data){
			$("#vehicleConfig").find("option").nextAll().remove();
    		for(var i = 0;i<data.data.length;i++){
    			$('<option value='+data.data[i].id+'>'+data.data[i].modelName+'</option>').appendTo('#vehicleConfig')
    		}
    	}
    });
}
//下一步按钮	(基本信息提交)
function jbxh(judeg,url){
	console.log(url);
	var sex;
	var id;
	var groupId;  
	if($('#engineCode').val().length!=11){
       $.messager.alert('系统提示','发动机编号不得小于11位','error');
	   return;
	}
	if($('#sexx').val()==1){
       sex='男';
	}
	if($('#sexx').val()==2){
       sex='女';
	}
	if(url==server_context+"/saveOwner"){
		groupId = id3
	}else{
		var row = $("#TheOwner-datagrid-bottom").datagrid('getSelected');
		id=row.id
	}
	var data = {
		groupId:groupId,
		id:id,
    	ownerName:$('#ownerName').val(),
    	sex:sex,
		idNumber:$('#idNumber').val(),
    	mobile:$('#mobile').val(),
    	areaId:$('#TheOwnerxian').val(),
    	address:$('#address').val(),
    	insurerId:$('#insurerId').val(),
    	plate:$('#plate').val(),
    	vin:$('#vin').val().trim(),
    	engineCode:$('#engineCode').val(),
    	vehicleModelId:$('#vehicleConfig').val(),
    	// serviceEndTime:$('#serviceEndTime').val(),
    	contactsName:$('#contactsName').val(),
    	contactsMobile:$('#contactsMobile').val(),
    	relation:$('#relation').val()
    }
	$.ajax({
		type:"post",
		url:url,
		async:true,
		data:data,
		success:function(data){
			console.log(data)
			// if(!data.data[0].ownerId){
            //    ownerIds=data.data[0].ownerId
			// }
			if(data.error_code==0){
				$("#TheOwner-datagrid-bottom").datagrid("reload");
				if(judeg.id=='Nextstep'){
					$('.TheOwnerForm').css('display','none');
					$('.TheOwnerFormfour').css('display','');
					$('.Nextstepbutton>button').css('display','none');
					$('#Nextstep1').css('display','');
				}else{
					$.messager.alert('系统提示','保存成功','info');
                    $('#TheOwnerModal').modal('hide');
				}
				if(data.data.length!=0){
                    if(data.data[0].ownerId!=''||data.data[0].ownerId!='undefined'||data.data[0].ownerId!=null){
						ownerIds=data.data[0].ownerId
					}
				}
			}else{
				Statuscodeprompt(data.error_code,"保存失败...",'error')
			}
		}
	});
}
$('#Nextstep').click(function(){
	var pattern = /^[\u4E00-\u9FA5]{2,7}$/;// 验证中文名称
    var phone = /^1[34578]\d{9}$/; // 验证手机号
    var address = /^[\u4e00-\u9fa5]+$/; // 验证地址
	var isNumber = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/; //身份证号
	var str = '';
	for(var i=0;i<$('.noneNull').length;i++){
		if($('.noneNull').eq(i).val()==''){
			str += '必填字段不能为空';
			$.messager.alert('系统提示',str,'warning')
			return
		}
	}
	for(var i=0;i<$('.NoName').length;i++){
		if(!pattern.test($('.NoName').eq(i).val())) {
		   str = ''
		   str += '姓名(关系)不符合格式';
		   $('.NoName').focus();
		}
	}
	if(!isNumber.test($('#idNumber').val())){
           str = ''
		   str += '身份证号不符合格式';
		   $('#idNumber').focus();
	}
	for(var i=0;i<$('.NoPhone').length;i++){
		if(!phone.test($('.NoPhone').eq(i).val())) {
		   str = ''
		   str += '手机号不符合格式';
		   $('.NoPhone').focus();
		}
	}
	// if(!address.test($('.Noaddress').val())){
	// 	str += '详细地址不符合格式';
	// 	$('.Noaddress').focus();
	// }
    if(str!=''){
    	$('.spanerror').html(str)
    	return false;
    }
    $('.spanerror').html('')
	var url = server_context+"/saveOwner";
	jbxh(Nextstep,url)
})
//服务信息提交按钮
$('#Nextstep1').click(function(){
    var str = '';
    var phone = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/; // 验证手机号
    if(!phone.test($('#business').val())&&!phone.test($('#malfunction').val())&&!phone.test($('#Accident').val())) {
		   str += '号码不符合格式';
	}
    if(str!=''){
    	$('.spanerror').html(str)
    	return false;
    }
    $('.spanerror').html('')
	console.log(ownerIds)
    var data = {
		ownerId:ownerIds,//车主id
    	icallServiceLine:$('#business').val(),//商业服务号码
    	bcallServiceLine:$('#malfunction').val(),//故障服务号码
    	ecallServiceLine:$('#Accident').val()//事故服务号码
    }
    $.ajax({
    	type:"post",
		url:server_context+"/updateOwnerService",
		async:true,
		data:data,
		success:function(data){
			if(data.error_code==0){
				$.messager.alert('系统提示','保存成功','info')
				$('#TheOwnerModal').modal('hide');
				$("#TheOwner-datagrid-bottom").datagrid("reload");
			}else{
				Statuscodeprompt(data.error_code,"保存失败...",'error')
			}
		}
    })
})
//删除按钮
function TheOwnerremove() {
	var selectedrow = $("#TheOwner-datagrid-bottom").datagrid('getSelected');
	if(selectedrow == null) {
		$.messager.alert("系统提示", "请选择要删除的数据！",'warning');
		return;
	}
	var id = selectedrow.id;
	$.messager.confirm("系统提示", "您确认要删除这条数据吗？", function(r) {
		if(r) {
			$.post(server_context+"/removeOwner", {
				ownerId: id
			}, function(data) {
				if(data.error_code = '0') {
					$.messager.alert("系统提示", "数据已成功删除！",'info');
					$("#TheOwner-datagrid-bottom").datagrid("reload");
				} else {
					Statuscodeprompt(data.error_code,"数据删除失败...",'error')
				}
			}, "json");
		}
	});
}
//修改用户按钮
function TheOwnerbj(t){
	    owner0=0
		var row = $("#TheOwner-datagrid-bottom").datagrid('getSelected');
		var rows = $('#TheOwner-datagrid-bottom').datagrid('getChecked');
		if(row == null) {
			$.messager.alert("系统提示", "请选择需要修改的用户！",'warning');
			return;
		}
		if(rows.length>=2){
			$.messager.alert("系统提示", "请选择一条数据进行修改！",'warning');
			return;
		}
		LookUpindexThe = -1;
		$('#TheOwnerModal').modal('show');
		forbidden()
		$('.spanerror').html('')
		$('.TheOwnerModal-body>form').css('display','none');
		$('.TheOwnerForm').css('display','')
		$('.Nextstepbutton>button').css('display','none')
		$('#Nextstep2').css('display','');
		$('#Nextstep3').css('display','');
		$('#Nextstep5').css('display','');
		$('#Nextstep6').css('display','');
		$('#Nextstep2').val('基本');
		$('.TheOwnertitle').html('修改车主信息');
		$('.tablefuwu tr input').removeAttr('disabled','disabled');
		TheOwnerValue(row);
}
//禁用和隐藏某些字段
function  forbidden(){
	$('#idNumber').attr('disabled','disabled');
	$('#vin').attr('disabled','disabled');
    $('#TheOwnerFormtable-one').css('display','none');
	$('#TheOwnerFormtable-two').css('display','none');
	$('#contactsNamess').css('display','none')
}
//取消某些隐藏字段
function  startusings(){
	$('#idNumber').removeAttr('disabled','disabled');
	$('#vin').removeAttr('disabled','disabled');
    $('#TheOwnerFormtable-one').css('display','');
	$('#TheOwnerFormtable-two').css('display','');
	$('#contactsNamess').css('display','')
}
//审核操作按钮
var deviceidchezhu;  //车主的真实id
function ReviewOperation(index){
	var rows = $("#TheOwner-datagrid-bottom").datagrid('getRows');
	var row = rows[index]
    deviceidchezhu = row.id;
	startusings()
	owner0=1
	$('#TheOwnerModal').modal('show');
	$('.spanerror').html('')
	$('.TheOwnertitle').html('审核状态');
	$('.TheOwnerModal-body>form').css('display','none');
	$('.TheOwnerForm2').css('display','');
	$('.Nextstepbutton>button').css('display','none');
	$('#Nextstep7').css('display','');
	$('#Nextstep8').css('display','');
	$('#Nextstep9').css('display','');
	$('.owner1').text(row.ownerName)
	$('.owner2').text(row.sex)
	$('.owner3').text(row.idNumber)
	$('.owner4').text(row.mobile)
	$('.owner5').text(row.province)
	$('.owner6').text(row.city)
	$('.owner7').text(row.district)
	$('.owner8').text(row.address)
	$('.owner9').text(row.insurerName)
	$('.owner10').text(row.plate)
	$('.owner11').text(row.vin)
	$('.owner12').text(row.engineCode)
	$('.owner13').text(row.vehicleBrand)
	$('.owner14').text(row.vehicleModel)
	$('.owner15').text(row.vehicleDisplacement)
	$('.owner16').text(row.vehicleConfig)
	// $.ajax({
	// 	url:server_context+'/listOwnerContacts',
	// 	async:'true',
	// 	type:'post',
	// 	data:{
    //        ownerId:row.id
	// 	},
	// 	success:function(data){
	// 		var data = data.data;
	// 		$('#contactsName').val(data[0].contactsName),
	// 		$('#contactsMobile').val(data[0].contactsMobile),
	// 		$('#relation').val(data[0].relation)
	// 	}
	// })
}
//审核按钮
$('.Nextstep7').click(function(){
	if(TheOwnerIp!=23){
		$.messager.alert('系统提示','你没有此权限','warning');
		return;
	}
	console.log(123)
	var states=$(this).attr('name')
	$.ajax({
		type:"post",
		url:server_context+"/updateVerifyStatus",
		async:true,
		data:{
			ownerId:deviceidchezhu,
			verifyStatus:states
		},
		success:function(data){
			if(data.error_code==0){
				$.messager.alert('系统提示','状态修改成功','info');
				$('#TheOwnerModal').modal('hide');
				$("#TheOwner-datagrid-bottom").datagrid("reload");
			}else{
				Statuscodeprompt(data.error_code,"状态修改失败...",'error')
			}
		}
	});
})
//审核关闭按钮
$('#Nextstep9').click(function(){
	$('#TheOwnerModal').modal('hide');
})
//查看详情
function LookUp(index){
	LookUpindexThe = index;
    owner0=1;
	var rows = $("#TheOwner-datagrid-bottom").datagrid('getRows');
	var row = rows[index];
	$('#TheOwnerModal').modal('show');
	$('.spanerror').html('')
	$('.TheOwnertitle').html('查看详情');
	$('.TheOwnerModal-body>form').css('display','none');
	$('.tablefuwu tr input').attr('disabled','disabled');
	$('.TheOwnerForm2').css('display','');
	$('.Nextstepbutton>button').css('display','none');
	$('#Nextstep3').css('display','');
	$('#Nextstep5').css('display','');
	$('#Nextstep6').css('display','');
	$('.owner1').text(row.ownerName)
	$('.owner2').text(row.sex)
	$('.owner3').text(row.idNumber)
	$('.owner4').text(row.mobile)
	$('.owner5').text(row.province)
	$('.owner6').text(row.city)
	$('.owner7').text(row.district)
	$('.owner8').text(row.address)
	$('.owner9').text(row.insurerName)
	$('.owner10').text(row.plate)
	$('.owner11').text(row.vin)
	$('.owner12').text(row.engineCode)
	$('.owner13').text(row.vehicleBrand)
	$('.owner14').text(row.vehicleModel)
	$('.owner15').text(row.vehicleDisplacement)
	$('.owner16').text(row.vehicleConfig)
	// $('.owner17').text(row.)
	// $('.owner18').text(row.)
	// $('.owner19').text(row.)
}
//修改用户往基本信息输入框添加数据
function TheOwnerValue(row){
	$('#ownerName').val(row.ownerName),
	$('#mobile').val(row.mobile),
	// $('#TheOwnerxian').val(row.TheOwnerxian),
	$('#address').val(row.address),
	$('#insurerId').val(row.insurerId),
	$('#plate').val(row.plate),
	$('#vin').val(row.vin),
	$('#engineCode').val(row.engineCode),
	$('#vehicleModelId').val(row.vehicleModelId),
	// $('#serviceEndTime').datetimebox('setValue', row.serviceEndTime); //服务截止时间
	$('#contactsName').val(row.contactsName),
	$('#contactsMobile').val(row.contactsMobile),
	$('#relation').val(row.relation)
	$('#idNumber').val(row.idNumber)
	//性别添加
	$('#sexx option').remove();
	if(row.sex=='男'){
		$('<option selected="selected" value="1">男</option>').appendTo('#sexx');
		$('<option value="2">女</option>').appendTo('#sexx');
	}
	if(row.sex=='女'){
		$('<option value="1">男</option>').appendTo('#sexx');
		$('<option selected="selected" value="2">女</option>').appendTo('#sexx');
	}
	requestadd()
}
//请求省市县,保险公司,车辆配置信息等的接口
function requestadd(){
   var row = $("#TheOwner-datagrid-bottom").datagrid('getSelected');
   $.ajax({
		type:"post",
		url:server_context+"/listArea",
		async:true,
		data:{
			level:1,
		},
		success:function(data){
			var data = data.data;
			$("#TheOwnersheng>option").remove();
			for(var i=0;i<data.length;i++){
				if(row.provinceId==data[i].id){
			     $('<option selected="selected" value='+data[i].id+'>'+data[i].name+'</option>').appendTo($('#TheOwnersheng'))
			  }else{
				 $('<option value='+data[i].id+'>'+data[i].name+'</option>').appendTo($('#TheOwnersheng'))
			  }
			}
		}
	});
	$.ajax({
		type:"post",
		url:server_context+"/listArea",
		async:true,
		data:{
			level:2,
			pid:row.provinceId
		},
		success:function(data){
			var data = data.data;
			$("#TheOwnershi>option").remove();
			for(var i=0;i<data.length;i++){
				if(row.cityId==data[i].id){
			     $('<option selected="selected" value='+data[i].id+'>'+data[i].name+'</option>').appendTo($('#TheOwnershi'))
			  }else{
				 $('<option value='+data[i].id+'>'+data[i].name+'</option>').appendTo($('#TheOwnershi'))
			  }
			}
		}
	});
	$.ajax({
		type:"post",
		url:server_context+"/listArea",
		async:true,
		data:{
			level:3,
			pid:row.cityId
		},
		success:function(data){
			var data = data.data;
			$("#TheOwnerxian>option").remove();
			for(var i=0;i<data.length;i++){
			  if(row.districtId==data[i].id){
			     $('<option selected="selected" value='+data[i].id+'>'+data[i].name+'</option>').appendTo($('#TheOwnerxian'))
			  }else{
				 $('<option value='+data[i].id+'>'+data[i].name+'</option>').appendTo($('#TheOwnerxian'))
			  }
			}
		}
	});    
    //保险公司的请求
	$.ajax({
    	type:"post",
    	url:server_context+"/listInsurerName",
    	async:true,
    	success:function(data){
			var data = data.data;
    		$("#insurerId option").remove();
			for(var i=0;i<data.length;i++){
				if(row.insurerId==data[i].id){
                   $('<option selected="selected" value='+data[i].id+'>'+data[i].insurerName+'</option>').appendTo('#insurerId')
				}else{
                   $('<option value='+data[i].id+'>'+data[i].insurerName+'</option>').appendTo('#insurerId')
				}
			}
    	}
    });
    //车辆品牌的请求
	$.ajax({
    	type:"post",
    	url:server_context+"/getVehicleBrand",
    	async:true,
		data:{
           topGroupId:TheOwnertopGroupId
		},
    	success:function(data){
			var data = data.data;
    		$("#vehicleBrand").find("option").nextAll().remove();
    		for(var i = 0;i<data.length;i++){
				if(row.vehicleBrandId==data[i].id){
                    $('<option selected="selected" value='+data[i].id+'>'+data[i].modelName+'</option>').appendTo('#vehicleBrand')
				}else{
					$('<option value='+data[i].id+'>'+data[i].modelName+'</option>').appendTo('#vehicleBrand')
				}
    		}
    	}
    });
	//车辆型号的请求
	$.ajax({
		type:"post",
		url:server_context+"/getVehicleModel",
		async:true,
		data:{
			parentId:row.vehicleBrandId,
			level:2
		},
		success:function(data){
			var data = data.data;
			$("#vehicleModel").find("option").nextAll().remove();
    		for(var i = 0;i<data.length;i++){
				if(row.vehicleModelId==data[i].id){
                    $('<option selected="selected" value='+data[i].id+'>'+data[i].modelName+'</option>').appendTo('#vehicleModel')
				}else{
                    $('<option value='+data[i].id+'>'+data[i].modelName+'</option>').appendTo('#vehicleModel')
				}
    		}
    	}
    });
	//车辆排量的请求
	$.ajax({
		type:"post",
		url:server_context+"/getVehicleModel",
		async:true,
		data:{
			parentId:row.vehicleModelId,
			level:3
		},
		success:function(data){
			var data = data.data;
			$("#vehicleDisplacement").find("option").nextAll().remove();
    		for(var i = 0;i<data.length;i++){
				if(row.vehicleDisplacementId==data[i].id){
                     $('<option selected="selected" value='+data[i].id+'>'+data[i].modelName+'</option>').appendTo('#vehicleDisplacement')
				}else{
					 $('<option value='+data[i].id+'>'+data[i].modelName+'</option>').appendTo('#vehicleDisplacement')
				}
    			
    		}
    	}
    });
	//车辆配置的请求
	$.ajax({
		type:"post",
		url:server_context+"/getVehicleModel",
		async:true,
		data:{
			parentId:row.vehicleDisplacementId,
			level:4
		},
		success:function(data){
			var data = data.data;
			$("#vehicleConfig").find("option").nextAll().remove();
    		for(var i = 0;i<data.length;i++){
				if(row.vehicleConfigId==data[i].id){
                   $('<option selected="selected" value='+data[i].id+'>'+data[i].modelName+'</option>').appendTo('#vehicleConfig')
				}else{
                   $('<option value='+data[i].id+'>'+data[i].modelName+'</option>').appendTo('#vehicleConfig')
				}
    		}
    	}
    });
}

//新增紧急联系人
$('.addphone').click(function(){
	var length = $('.Phonetbody>tr').length;
	if(length>2){
		$.messager.alert('系统提示','最多设置三个','warning');
		return;
	}
	var trcls = 'addphone' + length;
	var tdone = trcls + 'td1';
	var tdtwo = trcls + 'td2';
	var tdthree = trcls + 'td3';
	var inputone = trcls +'ip1';
	var inputtwo = trcls +'ip2';
	var inputthree = trcls +'ip3';
	$('<tr class='+trcls+'></tr>').appendTo('.Phonetbody');
	$('<td class='+tdone+'></td>').appendTo('.'+trcls);
	$('<td class='+tdtwo+'></td>').appendTo('.'+trcls);
	$('<td class='+tdthree+'></td>').appendTo('.'+trcls);
	$('<td style="cursor: pointer;" id='+trcls+' onclick="addphone(this)">删除</td>').appendTo('.'+trcls);
	$('<input type="text" maxlength="20" name="one" id="inputName" class='+inputone+'>').appendTo('.'+tdone);
	$('<input type="text" maxlength="20" name="two" id="inputphone" class='+inputtwo+'>').appendTo('.'+tdtwo);
	$('<input type="text" maxlength="20" name="three" id="inputName" class='+inputthree+'>').appendTo('.'+tdthree);
})
//删除紧急联系人
function addphone(t){
	var i = $('.Phonetbody>tr').length
	if(i<2){
		$.messager.alert('系统提示','最少保留一个联系人','warning')
		return false;
	}
	if(t.id=='addphone0'){
		$('.addphone0').remove();
		$('.addphone1').attr('class','addphone0')
		$('.addphone1td1').attr('class','addphone0td1')
		$('.addphone2td1').attr('class','addphone1td1')
		$('.addphone1td2').attr('class','addphone0td2')
		$('.addphone2td2').attr('class','addphone1td2')
		$('.addphone1td3').attr('class','addphone0td3')
		$('.addphone2td3').attr('class','addphone1td3')
		$('#addphone1').attr('id','addphone0')
		$('.addphone2').attr('class','addphone1')
		$('#addphone2').attr('id','addphone1')
	}
	if(t.id=='addphone1'){
		$('.addphone1').remove();
		$('.addphone2').attr('class','addphone1')
		$('.addphone2td1').attr('class','addphone1td1')
		$('.addphone2td2').attr('class','addphone1td2')
		$('.addphone2td3').attr('class','addphone1td3')
		$('#addphone2').attr('id','addphone1')
	}
	if(t.id=='addphone2'){
		$('.addphone2').remove();
	}
}
//保存紧急联系人
function TheOwnerphone(){
	var row = $("#TheOwner-datagrid-bottom").datagrid('getSelected');
	var str= '';
	var pattern = /^[\u4E00-\u9FA5]{2,7}$/;// 验证中文名称
    var phone = /^1[34578]\d{9}$/; // 验证手机号
	for(var i=0;i<$('.Phonetbody tr').length;i++){
		if(!pattern.test($('.Phonetbody tr').eq(i).find('input').eq(0).val())) {
		   str = ''
		   str += '姓名不符合格式';
		}
	}
	for(var i=0;i<$('.Phonetbody tr').length;i++){
		if(!pattern.test($('.Phonetbody tr').eq(i).find('input').eq(2).val())) {
		   str = ''
		   str += '关系不符合格式';
		}
	}
	for(var i=0;i<$('.Phonetbody tr').length;i++){
		if(!phone.test($('.Phonetbody tr').eq(i).find('input').eq(1).val())) {
		   str = ''
		   str += '手机号不符合格式';
		}
	}
	for(var i=0;i<$('.Phonetbody tr input').length;i++){
      if($('.Phonetbody tr input').eq(i).val()==''){
         str = ''
		    str += '必填字段不能为空';
		}
	}
	console.log($('.Phonetbody tr').length);
	// console.log(str)
	if(str!=''){
		$.messager.alert('系统提示',str,'warning');
		return;
	}
	var one=[];
	var two=[];  
	var three=[];
	for(var i=0;i<$('.Phonetbody tr').length;i++){
       one.push($('.Phonetbody tr input[name="one"]').eq(i).val())
	   two.push($('.Phonetbody tr input[name="two"]').eq(i).val())
	   three.push($('.Phonetbody tr input[name="three"]').eq(i).val())
	}

	var data = {
        ownerId:row.id,
		contactsName:one.join(','),
		contactsMobile:two.join(','),
		relation:three.join(',')
	};
	$.ajax({
		type:"post",
		url:server_context+"/updateOwnerContacts",
		async:true,
		data:data,
		success:function(data){
			if(data.error_code==0){
				$.messager.alert('系统提示','添加成功','warning')
				// $('#TheOwnerModal').modal('hide');
			}else{
				Statuscodeprompt(data.error_code,"添加失败...",'error')
			}
		}
	});
}
//基本信息点击事件
$('#Nextstep3').click(function(){
	$('.TheOwnerModal-body>form').css('display','none');
	if(owner0==0){
      $('.TheOwnerForm').css('display','');
	  $('#Nextstep2').val('基本')
	}else{
		$('.TheOwnerForm2').css('display','');
	    $('#Nextstep2').val('基本')
	}
	
})

//紧急联系人信息点击事件
$('#Nextstep5').click(function(){
	var row;
	$('.TheOwnerModal-body>form').css('display','none');
	$('.TheOwnerFormthree').css('display','');
	$('#Nextstep2').val('联系人')
	if(LookUpindexThe==-1){
		row = $("#TheOwner-datagrid-bottom").datagrid('getSelected');
	}else{
        var rows = $("#TheOwner-datagrid-bottom").datagrid('getRows');
		row = rows[LookUpindexThe];
	}
	if(owner0==1){
       $('.phoneaddremove').css('display','none');
	   $('#TheOwnercaozuo').css('display','none');
        $.ajax({
			url:server_context+'/listOwnerContacts',
			async:'true',
			type:'post',
			data:{
			ownerId:row.id
			},
			success:function(data){
				var data = data.data;
				$('.Phonetbody tr').remove()
				for(var i=0;i<data.length;i++){
					var trcls = 'addphone' + i;
					var tdone = trcls + 'td1';
					var tdtwo = trcls + 'td2';
					var tdthree = trcls + 'td3';
					var inputone = trcls +'ip1';
					var inputtwo = trcls +'ip2';
					var inputthree = trcls +'ip3';
					$('<tr class='+trcls+'></tr>').appendTo('.Phonetbody');
					$('<td class='+tdone+'></td>').appendTo('.'+trcls);
					$('<td class='+tdtwo+'></td>').appendTo('.'+trcls);
					$('<td class='+tdthree+'></td>').appendTo('.'+trcls);
					// $('<td style="cursor: pointer;" id='+trcls+' onclick="addphone(this)">删除</td>').appendTo('.'+trcls);
					$('<input type="text" id="inputName" disabled="disabled" name="one" class='+inputone+' value='+data[i].contactsName+'></input>').appendTo('.'+tdone);
					$('<input type="text" id="inputphone" disabled="disabled" name="two" class='+inputtwo+' value='+data[i].contactsMobile+'></input>').appendTo('.'+tdtwo);
					$('<input type="text" id="inputName" disabled="disabled" name="three" class='+inputthree+' value='+data[i].relation+'></input>').appendTo('.'+tdthree);
				}
			}
		})
	}else{
		$('.phoneaddremove').css('display','');
		$('#TheOwnercaozuo').css('display','');
        $.ajax({
			url:server_context+'/listOwnerContacts',
			async:'true',
			type:'post',
			data:{
			ownerId:row.id
			},
			success:function(data){
				var data = data.data;
				$('.Phonetbody tr').remove()
				for(var i=0;i<data.length;i++){
					var trcls = 'addphone' + i;
					var tdone = trcls + 'td1';
					var tdtwo = trcls + 'td2';
					var tdthree = trcls + 'td3';
					var inputone = trcls +'ip1';
					var inputtwo = trcls +'ip2';
					var inputthree = trcls +'ip3';
					$('<tr class='+trcls+'></tr>').appendTo('.Phonetbody');
					$('<td class='+tdone+'></td>').appendTo('.'+trcls);
					$('<td class='+tdtwo+'></td>').appendTo('.'+trcls);
					$('<td class='+tdthree+'></td>').appendTo('.'+trcls);
					$('<td style="cursor: pointer;" id='+trcls+' onclick="addphone(this)">删除</td>').appendTo('.'+trcls);
					$('<input type="text" id="inputName" name="one" class='+inputone+' value='+data[i].contactsName+'></input>').appendTo('.'+tdone);
					$('<input type="text" id="inputphone" name="two" class='+inputtwo+' value='+data[i].contactsMobile+'></input>').appendTo('.'+tdtwo);
					$('<input type="text" id="inputName" name="three" class='+inputthree+' value='+data[i].relation+'></input>').appendTo('.'+tdthree);
				}
			}
		})
	}
	
})
//服务信息点击事件
$('#Nextstep6').click(function(){
	var row;
	if(LookUpindexThe==-1){
       row = $("#TheOwner-datagrid-bottom").datagrid('getSelected');
	}else{
       var rows = $("#TheOwner-datagrid-bottom").datagrid('getRows');
	   row = rows[LookUpindexThe];
	}
	$('.TheOwnerModal-body>form').css('display','none');
	$('.TheOwnerFormfour').css('display','');
	$('#Nextstep2').val('服务信息')
	$.ajax({
		url:server_context+'/getOwnerService',
		async:'true',
		type:'post',
		data:{
           ownerId:row.id
		},    
		success:function(data){
			var data = data.data;
            $('#business').val(data[0].icallServiceLine);  //商业服务电话
			$('#malfunction').val(data[0].bcallServiceLine); //故障服务电话
			$('#Accident').val(data[0].ecallServiceLine); //事故服务电话
		}
	})
})
//保存按钮
$('#Nextstep2').click(function(){
	var row = $("#TheOwner-datagrid-bottom").datagrid('getSelected');
	if($('#Nextstep2').val()=='基本'){
		var pattern = /^[\u4E00-\u9FA5]{2,7}$/;// 验证中文名称
	    var phone = /^1[34578]\d{9}$/; // 验证手机号
	    var address = /^[\u4e00-\u9fa5]+$/ // 验证地址
		var str = '';
		for(var i=0;i<$('.noneNull').length;i++){
			if($('.noneNull').eq(i).val()==''){
				str += '必填字段不能为空';
				$.messager.alert('系统提示',str,'warning')
				return
			}
		}
		// for(var i=0;i<$('.NoName').length;i++){
			if(!pattern.test($('.NoName').eq(0).val())) {
			   str = ''
			   str += '姓名(关系)不符合格式';
			   $('.NoName').focus();
			}
		// }
		// for(var i=0;i<$('.NoPhone').length;i++){
			if(!phone.test($('.NoPhone').eq(0).val())) {
			   str = ''
			   str += '手机号不符合格式';
			   $('.NoPhone').focus();
			}
		// }
		// if(!address.test($('.Noaddress').val())){
		// 	str += '详细地址不符合格式';
		// 	$('.Noaddress').focus();
		// }
		
	    if(str!=''){
	    	$('.spanerror').html(str)
	    	return false;
	    }
	    $('.spanerror').html('')
		var url = server_context+"/updateOwner";
		jbxh(Nextstep2,url)
	}

	if($('#Nextstep2').val()=='服务信息'){
		console.log(123456)
		var phone =  /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/; // 验证手机号,座机
		var str= '';
		if(!phone.test($('#malfunction').val())&&!phone.test($('#Accident').val())) {
		   str += '服务号码不符合格式';
		}
	    if(str!=''){
	    	$('.spanerror').html(str)
	    	return false;
	    }
	    $('.spanerror').html('')
	    var data = {
			ownerId:row.id,
	    	icallServiceLine:$('#business').val(),
	    	bcallServiceLine:$('#malfunction').val(),
	    	ecallServiceLine:$('#Accident').val()
	    }
	    $.ajax({
	    	type:"post",
			url:server_context+"/updateOwnerService",
			async:true,
			data:data,
			success:function(data){
				if(data.error_code==0){
					$.messager.alert('系统提示','保存成功','info')
					$('#TheOwnerModal').modal('hide');
					$("#TheOwner-datagrid-bottom").datagrid("reload");
				}else{
					Statuscodeprompt(data.error_code,"保存失败...",'error')
				}
			}
	    })
	}
})
var Theownermigrationid;//车主迁移tree树id
//车主迁移
function Theownermigration(){
    var row = $('#TheOwner-datagrid-bottom').datagrid('getChecked')
	if(row.length==0){
        $.messager.alert('系统提示', '请选择车主进行车主迁移操作','warning');
        return;
	}
	$('#TheownermigrationModal').modal('show')
	$('#TheownermigrationModal-tree').tree({
		url: server_context+'/listGroupTree',
		method: 'post',
		animate: 'true',
		loadFilter: function(data) {
			var data = data.data;
			return convert(data);
		},
		onSelect: function(node) {
			Theownermigrationid=node.id;
		}
	})
}
//车主迁移保存
function Theownermigrationsave(){
	console.log(Theownermigrationid)
   if(Theownermigrationid==''||Theownermigrationid=='undefined'||Theownermigrationid==null){
	   $.messager.alert('系统提示', '请选择用户组','warning');
        return;
    }
	var row = $('#TheOwner-datagrid-bottom').datagrid('getChecked');
	var arr = [];
    for (var i = 0; i < row.length; i++) {
        arr.push(row[i].id)
    }
    var deviceIds = arr.join(',')
	$.ajax({
        type: "post",
        url: server_context+"/updateOwnerGroup",
        async: true,
        data: {
            ownerIds: deviceIds,
            groupId: Theownermigrationid
        },
        success: function (data) {
            if (data.error_code == 0) {
                $.messager.alert('系统提示', '车主迁移操作成功','info');
                $('#TheownermigrationModal').modal('hide');
				$('#TheOwner-datagrid-bottom').datagrid('reload')
            } else {
				Statuscodeprompt(data.error_code,"车主迁移操作失败...",'error')
            }
        }
    });
}
//保险信息点击事件
/*$('#Nextstep4').click(function(){
	$('.TheOwnerModal-body>form').css('display','none');
	$('.TheOwnerFormtwo').css('display','');
	var row = $("#TheOwner-datagrid-bottom").datagrid('getSelected');
	$('#agent').val(row.agent),
	$('#applicant').val(row.applicant),
	$('#insured').val(row.insured),
	$('#insurerId').val(row.insurerId),
	$('#commercialInsuranceNo').val(row.commercialInsuranceNo),
	$('#compulsoryInsuranceNo').val(row.compulsoryInsuranceNo),
	$('#insureDate').val(row.insureDate),
	$('#expireDate').val(row.expireDate),
	$('#commercialPremium').val(row.commercialPremium),
	$('#commercialIncome').val(row.commercialIncome),
	$('#commercialDiscount').val(row.commercialDiscount),
	$('#compulsoryPremium').val(row.compulsoryPremium),
	$('#compulsoryIncome').val(row.compulsoryIncome),
	$('#compulsoryDiscount').val(row.compulsoryDiscount),
	$('#premium').val(row.premium),
	$('#remarks').val(row.remarks),
	$('#premium').val(row.premium),
	$('#income').val(row.income),
	$('#damageAmount').val(row.damageAmount),
	$('#damageReceivable').val(row.damageReceivable),
	$('#damageIncome').val(row.damageIncome),
	$('#tplAmount ').val(row.tplAmount),
	$('#tplReceivable').val(row.tplReceivable),
	$('#tplIncome').val(row.tplIncome),
	$('#passengerAmount').val(row.passengerAmount),
	$('#passengerReceivable').val(row.passengerReceivable),
	$('#passengerIncome').val(row.passengerIncome),
	$('#theftAmount').val(row.theftAmount),
	$('#theftReceivable').val(row.theftReceivable),
	$('#theftIncome').val(row.theftIncome),
	$('#glassBreakageAmount').val(row.glassBreakageAmount),
	$('#glassBreakageReceivable').val(row.glassBreakageReceivable),
	$('#glassBreakageIncome').val(row.glassBreakageIncome),
	$('#combustionAmount').val(row.combustionAmount),
	$('#combustionReceivable').val(row.combustionReceivable),
	$('#combustionIncome').val(row.combustionIncome),
	$('#wadeAmount').val(row.wadeAmount),
	$('#wadeReceivable').val(row.wadeReceivable),
	$('#wadeIncome').val(row.wadeIncome),
	$('#scratchAmount').val(row.scratchAmount),
	$('#scratchReceivable').val(row.scratchReceivable),
	$('#scratchIncome').val(row.scratchIncome),
	$('#waiverAmount').val(row.waiverAmount),
    $('#waiverReceivable').val(row.waiverReceivable),
	$('#waiverIncome').val(row.waiverIncome),
	$('#compelsoryAmount').val(row.compelsoryAmount),
	$('#compelsoryReceivable').val(row.compelsoryReceivable),
	$('#compelsoryIncome').val(row.compelsoryIncome),
	$('#vehicleTax').val(row.vehicleTax),
	$('#other').val(row.other),
	$('#remark').val(row.remark)
	$('#Nextstep2').val('保险')
})*/

//保险信息提交按钮
//function bxxh(judeg){
//	console.log(judeg)
//	for(var i=0;i<$('.undefined').length;i++){
//		if(!$('.undefined').eq(i).val()){
//			$('.undefined').eq(i).val('0')
//		}
//	}
//	var data = {
//		agent:$('#agent').val(),
//		applicant:$('#applicant').val(),
//		insured:$('#insured').val(),
//		insurerId:$('#insurerId').val(),
//		commercialInsuranceNo:$('#commercialInsuranceNo').val(),
//		compulsoryInsuranceNo:$('#compulsoryInsuranceNo').val(),
//		insureDate:$('#insureDate').val(),
//		expireDate:$('#expireDate').val(),
//		commercialPremium:$('#commercialPremium').val(),
//		commercialIncome:$('#commercialIncome').val(),
//		commercialDiscount:$('#commercialDiscount').val(),
//		compulsoryPremium:$('#compulsoryPremium').val(),
//		compulsoryIncome:$('#compulsoryIncome').val(),
//		compulsoryDiscount:$('#compulsoryDiscount').val(),
//		premium:$('#premium').val(),
//		remarks:$('#remarks').val(),
//		premium:$('#premium').val(),
//		income:$('#income').val(),
//		damageAmount:$('#damageAmount').val(),
//		damageReceivable:$('#damageReceivable').val(),
//		damageIncome:$('#damageIncome').val(),
//		tplAmount :$('#tplAmount ').val(),
//		tplReceivable:$('#tplReceivable').val(),
//		tplIncome:$('#tplIncome').val(),
//		passengerAmount:$('#passengerAmount').val(),
//		passengerReceivable:$('#passengerReceivable').val(),
//		passengerIncome:$('#passengerIncome').val(),
//		theftAmount:$('#theftAmount').val(),
//		theftReceivable:$('#theftReceivable').val(),
//		theftIncome:$('#theftIncome').val(),
//		glassBreakageAmount:$('#glassBreakageAmount').val(),
//		glassBreakageReceivable:$('#glassBreakageReceivable').val(),
//		glassBreakageIncome:$('#glassBreakageIncome').val(),
//		combustionAmount:$('#combustionAmount').val(),
//		combustionReceivable:$('#combustionReceivable').val(),
//		combustionIncome:$('#combustionIncome').val(),
//		wadeAmount:$('#wadeAmount').val(),
//		wadeReceivable:$('#wadeReceivable').val(),
//		wadeIncome:$('#wadeIncome').val(),
//		scratchAmount:$('#scratchAmount').val(),
//		scratchReceivable:$('#scratchReceivable').val(),
//		scratchIncome:$('#scratchIncome').val(),
//		waiverAmount:$('#waiverAmount').val(),
//		waiverReceivable:$('#waiverReceivable').val(),
//		waiverIncome:$('#waiverIncome').val(),
//		compelsoryAmount:$('#compelsoryAmount').val(),
//		compelsoryReceivable:$('#compelsoryReceivable').val(),
//		compelsoryIncome:$('#compelsoryIncome').val(),
//		vehicleTax:$('#vehicleTax').val(),
//		other:$('#other').val(),
//		remark:$('#remark').val()
//	}
//  $.ajax({
//  	type:"post",
//		url:"/asdf",
//		async:true,
//		data:data,
//		success:function(data){
//			console.log(data);
//			if(judeg.id=='Nextstep1'){
//				$('#TheOwnerModal').modal('hide');
//			}
//		}
//  })
//}