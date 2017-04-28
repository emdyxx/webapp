  var equipmentnumber;//设备编号
  var vin;//车架号
  var startingtime//起始时间
  var endtime//结束时间
  var canLookUp;//查看权限
  var canSettingUp;//录制设置权限
  var canonline;//判断设备是否在线
  var candata;//判断设备是否在录制中
  //7.1录制管理--录制管理
  $('#managementli32').click(function(){
    clearInterval(seti);
	clearInterval(Realtimeconditionset);
  	$('main>div').css('display','none');
  	$('.Recordmanagement').css('display','')
	//权限判断
	var data={
		id:$('#managementli32').attr('name')
	}	
	$.post(server_context+'/setMenuId',data,function(data){
		if(data.error_code!=0){
			Statuscodeprompt(data.error_code)
		}
		for(var i=0;i<data.data.length;i++){
			if(data.data[i]==121){
				canLookUp=121
			}
			if(data.data[i]==122){
				canSettingUp=122
			}
		}
	})
  	$('.Recordmanagement-primarymeter').datagrid({
  		url: server_context+'/listDevice',
		method: 'get',
		singleSelect: 'true',
		fit: 'true',
		fitColumns: 'true',
		rownumbers: 'true',
        pageSize:50,
		pagination: "true",
		columns:[[
		    { field:"cb",checkbox:"true",align:"center"},
			{ field:"deviceId",title:'设备编号',align:"center",width:'12%'},
			{ field:"vin",title:'车架号',align:"center",width:'12%'},
			{ field:"ecuSerialNum",title:'电控单元号',align:"center",width:'25%'},
			{ field:"iccid",title:'iccid',align:"center",width:'18%'},
			{ field:"modelAlias",title:'车系代码',align:"center",width:'12%'},
			{ field:"one7",title:'录制信息',align:"center",width:'10%',
		        formatter:function(value, rows, index){
		        	return '<a href="javaScript:LookRecordmanagement('+index+')" style="display:inline-block;line-height:20px;width:60px;height:20px;background:#00AAFF;color:white">'+"查看"+'</a>';
		        }
			},
			{ field:"one8",title:'录制设置',align:"center",width:'10%',
		        formatter:function(value, rows, index){
		        	return '<a href="javaScript:Recordingoptions('+index+')" style="display:inline-block;line-height:20px;width:60px;height:20px;background:#00AAFF;color:white">'+"录制设置"+'</a>';
		        }
			},
		]]
  	})
  })
  //查看
  function LookRecordmanagement(index){
	   if(canLookUp==''){
          $.messager.alert('系统提示','你不具备此权限','error');
		  return;
	   }
  	   var rows = $('.Recordmanagement-primarymeter').datagrid('getRows');
	   var row = rows[index];
	   $('#RecordmanagementModal').modal('show');
	   $('#Recordmanagementtd1').text(row.deviceId);
	   $('#Recordmanagementtd2').text(row.ecuSerialNum);
	   $('#Recordmanagementtd3').text(row.vin);
	   $('#Recordmanagementtd4').text(row.iccid);
	   $('#Recordmanagementtd5').text(row.modelAlias);
	   setTimeout(function(){
		   	$('.RecordmanagementModal-datagrid').datagrid({
		   	    url: server_context+'/listCanRecord',
				method: 'get',
				singleSelect: 'true',
				fit: 'true',
				fitColumns: 'true',
				rownumbers: 'true',
				pagination: "true",
				queryParams: {
					deviceId:row.deviceId
				},
				columns:[[
					{ field:"startTime",title:'录制起始时间',align:"center",width:'25%'},
					{ field:"endTime",title:'录制结束时间',align:"center",width:'25%'},
					{ field:"userName",title:'操作用户',align:"center",width:'25%'},
					{ field:"one5",title:'操作',align:"center",
					    formatter:function(value, rows, index){
				        	return '<a href="javaScript:Recordingoptionsdata('+index+')" style="display:inline-block;line-height:20px;width:60px;height:20px;background:#00AAFF;color:white">'+"查询数据"+'</a>';
				        }
					}
				]]
		   })
	   },500)
  }
  //查询数据
  function Recordingoptionsdata(index){
  	var rows = $('.RecordmanagementModal-datagrid').datagrid('getRows');
	var row = rows[index];
	equipmentnumber=$('#Recordmanagementtd1').text();
	vin=$('#Recordmanagementtd3').text();
	startingtime=row.startTime;
	endtime=row.endTime;
	$('#RecordmanagementModal').modal('hide');
	$('main>div').css('display','none');
  	$('.queryandpivot').css('display','')
	candatagrid()
	candatarid()
  }
  //录制设置
  function Recordingoptions(index){
	  if(canSettingUp==''){
          $.messager.alert('系统提示','你不具备此权限','error');
		  return;
	   }
	  	var rows = $('.Recordmanagement-primarymeter').datagrid('getRows');
	    var row = rows[index];
	    $('#RecordingoptionsModal').modal('show');
	    $('#Recordmanagementtdd1').text(row.deviceId);
	    $('#Recordmanagementtdd2').text(row.ecuSerialNum);
	    $('#Recordmanagementtdd3').text(row.vin);
	    $('#Recordmanagementtdd4').text(row.iccid);
	    $('#Recordmanagementtdd5').text(row.modelAlias);
        $.ajax({
			type:'post',
        	async:'true',
        	url:server_context+'/getDeviceInfo',
			data:{
				deviceId:row.deviceId
			},
			success:function(data){
				if(data.error_code==0){
                   canonline=data.data[0].online
				   if(data.data[0].online==false){
					   $('#CANdeviceIdzt').text('未在线')
					   $('#CANdeviceIdzt').css('color','gray')
				   }else{
					   $('#CANdeviceIdzt').text('在线')
					   $('#CANdeviceIdzt').css('color','#7EB00E')
				   }
				}else{
                   Statuscodeprompt(data.error_code)
				}
			}
		})
		$.ajax({
        	type:'post',
        	async:'true',
        	url:server_context+'/listCanId',
        	data:{
        		deviceId:row.deviceId
        	},
        	success:function(data){
                candata = data.data;
				$('#CANchannelnumber').find('option').remove();
				if(data.data.channel==11){
                   $('<option value="11" checked>11</option>').appendTo($('#CANchannelnumber'))
				   $('<option value="12">12</option>').appendTo($('#CANchannelnumber'))
				}else{
					$('<option value="11">11</option>').appendTo($('#CANchannelnumber'))
				    $('<option value="12" checked>12</option>').appendTo($('#CANchannelnumber'))
				}
				$('#CANstoptime').datetimebox('setValue', data.data.endTime);
        		var data = data.rows;
				$('#cantable').find('tr').nextAll().remove();
        		for(var i=0;i<data.length;i++){
					var list = ''
					var arr=[];
        			$("<tr id='cantr'>"+"<td style='width: 40px;'>"
        			+"<input type='checkbox' name='cancheckbox' style='width: 22px;'>"+"</td>"
        			+"<td id='canIds'>"+data[i].canId+"</td>"+"<td>"+data[i].canName+"</td>"
        			+"<td>"+"<input id='canIdIntervals' value='"+data[i].interval+"' type='text'>"+"</td>"
					+"<td id='masks'>"+"<input type='text' value='"+data[i].filter+"' maxlength='16'>"
					+"</td>"+"</tr>").appendTo($('#cantable'))
        		}
        	}
        })
  }
 //can录制设备唤醒按钮
 $('#canawaken').click(function(){
 	var deviceId = $('#Recordmanagementtdd1').text();
    status = true;
    $.messager.confirm("操作提示", "第" + n + "次尝试唤醒设备,请稍候。。。", function (data) {
        if (data) {

        } else {
            n = 1;
            status = false;
            clearTimeout(set);
        }
    });
    $.ajax({
        type: "post",
        url: server_context+"/networkWakeup",
        data: { deviceId: deviceId },
        success: function (data) {
            if (data.error_code == 0) {
                setTimeout(function () {
                    status = true;
                    clearTimeout(set);
                    $(".messager-body").window('close');
                    $.messager.alert("操作提示", "唤醒命令发送成功,等待设备上线！", "info");
                }, 3000);
            } else {
                if (n < 5) {
                    n = n + 1;
                    set = setTimeout(function () {
                        $(".messager-body").window('close');
                        deviceWeupRetry(deviceId);
                    }, 5000);
                } else {
                    setTimeout(function () {
                        n = 1;
                        $(".messager-body").window('close');
                        $.messager.alert("操作提示", "唤醒失败！", "error");
                    }, 5000);
                }
            }
        },
        error: function () {
            $.messager.alert("操作提示", "系统错误，请稍后重试！", "error");
        }
    });
 })
 //can录制设备唤醒重试
function deviceWeupRetry(deviceId){
	if (status == 'true') {
        $.messager.confirm("操作提示", "第" + n + "次尝试唤醒设备,请稍候。。。", function (data) {
            if (data) {

            } else {
                n = 1;
                status = false;
                clearTimeout(set);
            }
        });
        $.ajax({
            type: "post",
            url: server_context+"/networkWakeup",
            data: { deviceId: deviceId },
            success: function (data) {
                if (data.error_code == 0) {
                    $(".messager-body").window('close');
                    status = true;
                    clearTimeout(set);
                    $.messager.alert("操作提示", "唤醒命令发送成功,等待设备上线！", "info");
                } else {
                    if (n < 5) {
                        n = n + 1;
                        set = setTimeout(function () {
                            $(".messager-body").window('close');
                            deviceWeupRetry(deviceId);
                        }, 5000);
                    } else {
                        setTimeout(function () {
                            n = 1;
                            status = true;
                            $(".messager-body").window('close');
                            $.messager.alert("操作提示", "唤醒失败！", "error");
                        }, 4000);
                    }
                }
            },
            error: function () {
                $.messager.alert("操作提示", "系统错误，请稍后重试！", "error");
            }
        });
    }
}
 //录制设置发送按钮
$('#Bustorecordsend').on('click',function(){
	if(canonline!=true){
       $.messager.alert('系统提示','设备不在线不能保存发送...','error');
	   return;
	}
	if(candata!=''){
       $.messager.alert('系统提示','设备正在录制中,请先取消录制再进行发送...','error');
	   return;
	}
	var row = $('.Recordmanagement-primarymeter').datagrid('getSelected')
	var a=[];
	var dt;
	for(var i=0;i<$('#cantable input[name="cancheckbox"]').length;i++){
		if($('#cantable input[name="cancheckbox"]').eq(i).is(':checked')==true){
			dt = 1;
			a.push({
				canId:$("#cantable tr").eq(i+1).find('td').eq(1).text(),
				interval:$("#cantable tr").eq(i+1).find('td').eq(3).find('input').val(),
				filter:$("#cantable tr").eq(i+1).find('td').eq(4).find('input').val(),
			})
		}
	}
	if(a.length==0){
          $.messager.alert('系统提示','请选择CANID!','error')
		  return;
	}
	for(var i=0;i<a.length;i++){
       if(a[i].interval==''){
          $.messager.alert('系统提示','所选设备采集时间不能为空!','error')
		  return;
	   }
	   if(a[i].filter==''){
          $.messager.alert('系统提示','所选设备掩码不能为空!','error')
		  return;
	   }
	   if(a[i].filter.length!=16){
          $.messager.alert('系统提示','所选设备掩码不得低于16位!','error')
		  return;
	   }
	}
	if($('#CANstoptime').val()==''){
        $.messager.alert('系统提示','结束时间不能为空!','error')
		return;
	}
	$.ajax({
		type:'post',
    	async:'true',
    	url:server_context+'/sendCanRecord',
    	traditional: true,
		data:{
			'deviceId':$('#Recordmanagementtdd1').text(),
			'channel':$('#CANchannelnumber').val(),
			'endTime':$('#CANstoptime').val(),
			'filter':JSON.stringify(a)
		},
    	dataType:"json",
    	success:function(data){
    		if(data.error_code==0){
 				$.messager.alert('系统提示','保存成功','info')
 			}else{
				 Statuscodeprompt(data.error_code)
			 }
    	}
	})
	
})
//can取消录制按钮
$('#cancelrecording').click(function(){
    if(canonline!=true){
       $.messager.alert('系统提示','设备不在线不能取消录制...','error');
	   return;
	}
	if(candata==''){
       $.messager.alert('系统提示','该设备暂无录制信息...','error');
	   return;
	}
	if(candata.id==''){
        return;
	}
	$.ajax({
		type:'post',
    	async:'true',
    	url:server_context+'/overCanRecord',
        data:{
            id:candata.id
		},
		success:function(data){
			if(data.error_code==0){
				$.messager.alert('系统提示','设备取消录制成功','info');
			}else{
                Statuscodeprompt(data.error_code)
			}
		}
	})
})
//主表查询按钮
function Recordmnagement(){
	$('.Recordmanagement-primarymeter').datagrid('load',{
		deviceId:$('#Recordmanagement-number').val(),
	  	vin:$('#Recordmanagement-vin').val(),
	  	ecuSerialNum:$('#Recordmanagement-Electronic').val()
	})
}

//7.2 总线录制---录制查询
$('#managementli33').click(function(){
	clearInterval(seti);
	$('main>div').css('display','none');
  	$('.queryandpivot').css('display','')
	candatagrid()
	candatarid()
})

function candatagrid(){
	$.ajax({
		type:"post",
		url:server_context+"/listCanName",
		async:true,
		success:function(data){
			if(data.error_code==0){
				$('.queryandpivot-bottom-left-bottom').find('button').nextAll().remove();
				for(var i=0;i<data.data.length;i++){
					$('<button onclick="candatarid()" name='+data.data[i].canId+'>'+data.data[i].canName+'</button>').appendTo($('.queryandpivot-bottom-left-bottom'))
				}
			}else{
				Statuscodeprompt(data.error_code)
			}
		}
	});
	
}
function candatarid(){
	$('.queryandpivot-datagrid').datagrid({
		url: server_context+'/getCanData',
		method: 'post',
		singleSelect: 'true',
		fit: 'true',
		fitColumns: 'true',
		rownumbers: 'true',
		pagination: "true",
		queryParams: {
			deviceId:equipmentnumber,
			vin:vin,
            startTime:startingtime,
            endTime:endtime
		},
		columns:[[
		    { field:"cb",checkbox:"true",align:"center"},
			{ field:"one1",title:'CAN-ID',align:"center",width:'10%'},
			{ field:"one2",title:'Column 3',align:"center",width:'14%'},
			{ field:"one3",title:'数据长度',align:"center",width:'25%'},
			{ field:"one4",title:'数据长传时间',align:"center",width:'10%'},
			{ field:"one5",title:'设备类型',align:"center",width:'10%'},
			{ field:"one6",title:'设备编号',align:"center",width:'10%'}
		]]
	})
}
function queryandpivotmanagement(){
	$('.queryandpivot-datagrid').datagrid('load',{
		deviceId:equipmentnumber,
		vin:vin,
		startTime:startingtime,
		endTime:endtime
	})
}


//8.1应用管理--应用管理
var appliedmanagementurl;
$('#managementli34').click(function(){
	clearInterval(seti);
	clearInterval(Realtimeconditionset);
	$('main>div').css('display','none');
	$('.appliedmanagement').css('display','');
	//权限请求
	var data={
		id:$('#managementli34').attr('name')
	}
	$.post(server_context+'/setMenuId',data,function(data){
		if(data.error_code!=0){
			Statuscodeprompt(data.error_code)
		}
		for(var i=0;i<data.data.length;i++){
			if(data.data[i]==141){
				$('.appliedmanagement-top-one').css('display','')
			}
			if(data.data[i]==142){
				$('.appliedmanagement-top-two').css('display','')
			}
			if(data.data[i]==143){
				$('.appliedmanagement-top-thr').css('display','')
			}
		}
	})
	$('.appliedmanagement-datagrid').datagrid({
		url:server_context+'/listOpenApp',
		method: 'post',
		singleSelect: 'true',
		fit: 'true',
		fitColumns: 'true',
		rownumbers: 'true',
		pageSize:50,
		pagination: "true",
		columns:[[
			{ field:"cb",checkbox:"true",align:"center"},
			{ field:"appId",title:'应用ID',align:"center",width:'12%'},
			{ field:"secret",title:'唯一标示密钥',align:"center",width:'16%'},
			{ field:"active",title:'状态',align:"center",width:'12%',
		        formatter:function(value, rows, index){
                    var active = rows.active;
					if(active==1){
                       return '启用';
					}else{
                       return '禁用';
					}
				}
		    },
			{ field:"provider",title:'设备供应商',align:"center",width:'12%'},
			{ field:"ts",title:'最后请求时间戳',align:"center",width:'16%'},
			{ field:"uuid",title:'UUID',align:"center"}
		]]
	})
})
//添加应用
function appliedmanagementadd(){
	$('#appliedmanagementModal').modal('show')
	$('#appliedmanagement-ID').val('');
	$('#appliedmanagement-supplier').val('')
	$('#appliedmanagement-state').find('option').remove()
	$('<option value="0" selected>禁用</option>').appendTo($('#appliedmanagement-state'))
	$('<option value="1">启用</option>').appendTo($('#appliedmanagement-state'))
	appliedmanagementurl=server_context+"/saveOpenApp"
}
//保存
$('#appliedmanagement-save').click(function(){
	if($('#appliedmanagement-ID').val()==''||$('#appliedmanagement-supplier').val()==''){
		$.messager.alert('系统提示','必填字段不能为空','error');
		return;
	}
	var id='';
	var uuid='';
	if(appliedmanagementurl==server_context+"/updateOpenApp"){
        var row = $('.appliedmanagement-datagrid').datagrid('getSelected')
		id=row.id
		uuid=row.uuid
	}
	$.ajax({
		type:"post",
		url:appliedmanagementurl,
		async:true,
		data:{
            id:id,
			uuid:uuid,
			active:$('#appliedmanagement-state').val(),
			appId:$('#appliedmanagement-ID').val(),
			provider:$('#appliedmanagement-supplier').val()
		},
		success:function(data){
			if(data.error_code==0){
				$.messager.alert('系统提示','保存成功','info')
				$('#appliedmanagementModal').modal('hide')
				$('.appliedmanagement-datagrid').datagrid('reload')
			}else{
			    Statuscodeprompt(data.error_code)
			}
		}
	});
})
//编辑应用
function appliedmanagementModify(){
	var row = $('.appliedmanagement-datagrid').datagrid('getSelected');
	if(row == null){
		$.messager.alert('系统提示','请选择需要编辑的应用','error')
		return;
	}
	$('#appliedmanagementModal').modal('show')
	$('#appliedmanagement-state').find('option').remove()
	if(row.active==0){
		$('<option value="0" selected>禁用</option>').appendTo($('#appliedmanagement-state'))
		$('<option value="1">启用</option>').appendTo($('#appliedmanagement-state'))
	}else{
		$('<option value="0">禁用</option>').appendTo($('#appliedmanagement-state'))
		$('<option value="1" selected>启用</option>').appendTo($('#appliedmanagement-state'))
	}
	$('#appliedmanagement-ID').val(row.appId);
	$('#appliedmanagement-supplier').val(row.provider)
	appliedmanagementurl=server_context+"/updateOpenApp"
}
//删除应用
function appliedmanagementremove(){
	var row = $('.appliedmanagement-datagrid').datagrid('getSelected');
	if(row == null){
		$.messager.alert('系统提示','请选择需要删除的应用','error')
		return;
	}
	$.messager.confirm('系统提示','确认删除?',function(r){
		if(r){
             $.ajax({
				type:"post",
				url:server_context+"/removeOpenApp",
				async:true,
				data:{
					id:row.id
				},
				success:function(data){
					if(data.error_code==0){
						$.messager.alert('系统提示','应用删除成功','info')
						$('#appliedmanagementModal').modal('hide')
						$('.appliedmanagement-datagrid').datagrid('reload')
					}else{
						Statuscodeprompt(data.error_code)
					}
				}
			});
		}
	})
}