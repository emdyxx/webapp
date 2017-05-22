/***************5.3设备管理---设备更换********************/
   var replaceurl;
   $('#managementli11').click(function(){
	   clearInterval(seti);
	   clearInterval(Realtimeconditionset);
	   $('main>div').css('display','none') 
	   $('.equipmentreplacement').css('display','')
	   $('.devicemanagementsearchcriteria input').val('')
        //权限判断
        var data={
            id:$('#managementli11').attr('name')
        }
        $.post(server_context+'/setMenuId',data,function(data){
			if(data.error_code!=0){
				Statuscodeprompt(data.error_code)
			}
            for(var i=0;i<data.data.length;i++){  
                if(data.data[i]==81){
                    $('.addequipmentreplacementrecord').css('display','')
                }
                if(data.data[i]==82){
                    $('.Modifyequipmentreplacementrecord').css('display','')
                }
                if(data.data[i]==83){  
                    $('.removeequipmentreplacementrecord').css('display','')
                }
                if(data.data[i]==84){
                    $('.Lookequipmentreplacementrecord').css('display','')
                }
            }
        })
       $('.equipmentreplacementmastermeter').datagrid({
		    url: server_context+'/listReplaces', 
			method: 'post',
			// singleSelect: 'true',
			singSelect:false,
			fit:'true',
			fitColumns: 'true',
			rownumbers: 'true',
			pageSize:50,
			pagination: "true",
			queryParams: {
				originalDeviceId:$('#initialequipmentnumber').val(),
				oldDeviceId:$('#originalequipmentnumber').val(),
				newDeviceId:$('#newequipmentnumber').val(),
				userName:$('#changepersonnel').val()
			},
			columns:[[
				{ field:"originalDeviceId",title:'初始设备编号',align:"center",width: '8%'},
				{ field:"oldDeviceId",title:'原设备编号',align:"center",width: '8%'},
				{ field:"newDeviceId",title:'新设备编号',align:"center",width: '8%'},
				{ field:"oldEcuSerialNum",title:'原电控单元序列号',align:"center",width: '21%'},
				{ field:"newEcuSerialNum",title:'新电控单元序列号',align:"center",width: '21%'},
				{ field:"userName",title:'更换人员',align:"center",width: '8%'},
				{ field:"dateTime",title:'更换日期',align:"center",width: '14%'},
				{ field:"ts",title:'登记日期',align:"center"}
			]],
			onLoadSuccess:function(data){
				if(data.error_code!=0){
					Statuscodeprompt(data.error_code)
				}
			}
	   })
   })
   //主表查询按钮
   $('#equipmentreplacementinquire1').click(function(){
	   $('.equipmentreplacementmastermeter').datagrid('load',{
		    originalDeviceId:$('#initialequipmentnumber').val(),
			oldDeviceId:$('#originalequipmentnumber').val(),
			newDeviceId:$('#newequipmentnumber').val(),
			userName:$('#changepersonnel').val()
	   })
   })     
   //添加设备更换记录
   $('.addequipmentreplacementrecord').click(function(){
	   $('#addequipmentreplacementrecordModal').modal('show');
	   $('.equipmentreplacementtitle').text('添加设备更换记录')
	   $('#repairfm input').removeAttr('disabled','disabled')
	   $('#repairfm').form('reset')
       $('#Modalusergroup').text(localStorage.groupName);  //用户组
       $('#Modalrole').text(localStorage.roleName);   //角色
	   $('#Modalusergroupoperationstaff').text($.cookie('account'));   //操作人员
	   replaceurl = server_context+'/addReplaces';
   })
   //修改设备更换记录
   $('.Modifyequipmentreplacementrecord').click(function(){
	   var row = $('.equipmentreplacementmastermeter').datagrid('getSelected')
	   var rows = $('.equipmentreplacementmastermeter').datagrid('getChecked');
	   if(row==null){
		   $.messager.alert('系统提示','请选择数据进行修改','warning');
		   return;
	   }
	   if(rows.length>=2){
           $.messager.alert('系统提示','请选择一条数据进行修改','warning');
		   return;
	   }  
	   $('#addequipmentreplacementrecordModal').modal('show');
	   $('.equipmentreplacementtitle').text('修改设备更换记录')
	   $('#repairfm input').attr('disabled','disabled')
	   $('#Modalusergroup').text(row.groupName);  //用户组
       $('#Modalrole').text(row.roleName);   //角色
	   $('#Modalusergroupoperationstaff').text(row.userName);   //操作人员
	   $('#Modalreplacementtime').datetimebox('setValue',row.dateTime); //更换时间
       $('#Modalrawserialnumber').val(row.oldEcuSerialNum)  //原电控单元序列号
	   $('#Modalnewserialnumber').val(row.newEcuSerialNum)  //新电控单元序列号
	   $('#Modalsummary').val(row.summary)  //维修内容
	   replaceurl = server_context+'/changeReplaces?id='+row.id;
   })
   //保存设备/修改设备更换记录
   function saveequipmentreplacement(){
	    $.ajax({
			url:replaceurl,
			type:'post',
			async:'true',
			data:{    
			   oldEcuSerialNum:$('#Modalrawserialnumber').val().trim(),
			   newEcuSerialNum:$('#Modalnewserialnumber').val().trim(),
			   dateTime:$('#Modalreplacementtime').val(),
			   summary:$('#Modalsummary').val().trim()
			},
			success:function(data){
				if(data.error_code==0){
                    $.messager.alert('系统提示','保存成功','info');
					$('#addequipmentreplacementrecordModal').modal('hide');
					$('.equipmentreplacementmastermeter').datagrid('reload');
				}else{
					Statuscodeprompt(data.error_code,"保存失败...",'error')
				}
			}
		})
   }
   //删除设备更换记录
   $('.removeequipmentreplacementrecord').click(function(){
	    var row = $('.equipmentreplacementmastermeter').datagrid('getChecked');
		if(row==null||row==''||row==undefined){
		   $.messager.alert('系统提示','请选择需要删除的数据','warning');
		   return;
	   }
	   var id = [];
	   for(var i=0;i<row.length;i++){
           id.push(row[i].id)
	   }
	   $.messager.confirm('系统提示','确认删除',function(r){
		   if(r){
               $.ajax({
				   url:server_context+'/deleteReplaces',
				   type:'post',
				   async:'true',
				   data:{
					   id:id.join(',')
				   },
				   success:function(data){
					   if(data.error_code == 0){
						   $.messager.alert('系统提示','删除成功','info');
						   $('.equipmentreplacementmastermeter').datagrid('reload');
					   }else{
						   Statuscodeprompt(data.error_code,"删除失败...",'error')
					   }
				   }
			   })
		   }
	   })
   })
   //查看设备更换记录
   $('.Lookequipmentreplacementrecord').click(function(){
	   var row = $('.equipmentreplacementmastermeter').datagrid('getSelected');
	   var rows = $('.equipmentreplacementmastermeter').datagrid('getChecked');
	   if(row==null){
		   $.messager.alert('系统提示','请选择需要查看的数据','warning');
		   return;
	   }   
	   if(rows.length>=2){
           $.messager.alert('系统提示','请选择一条数据进行查看','warning');
		   return;
	   }         
       $('#LookequipmentreplacementModal').modal('show');
       $('#LookModalusergroup').text(row.groupName);
	   $('#LookModalrole').text(row.roleName);
	   $('#LookModalusergroupoperationstaff').text(row.userName);
	   $('#LookModalreplacementtime').text(row.dateTime);
	   $('#LookModalrawserialnumber').text(row.oldEcuSerialNum);
	   $('#LookModalnewserialnumber').text(row.newEcuSerialNum);
	   $('#Lookinitialnumber').text(row.originalDeviceId);
	   $('#Lookrawnumber').text(row.oldDeviceId);
	   $('#Looknewnumber').text(row.newDeviceId);
	   $('#LookModalsummary').text(row.summary);
   })
