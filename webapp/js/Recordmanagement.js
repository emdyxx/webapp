  var equipmentnumber;//设备编号
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
		]],
		onLoadSuccess: function (data) { 
			if(data.error_code!=0){
                Statuscodeprompt(data.error_code)
			}
		}
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
				]],
				onLoadSuccess: function (data) { 
					if(data.error_code!=0){
						Statuscodeprompt(data.error_code)
					}
				}
		   })
	   },500)
  }
  //查询数据
  function Recordingoptionsdata(index){
  	var rows = $('.RecordmanagementModal-datagrid').datagrid('getRows');
	var row = rows[index];
	equipmentnumber=$('#Recordmanagementtd1').text();
	startingtime=row.startTime;
	endtime=row.endTime;
	$('#RecordmanagementModal').modal('hide');
	$('main>div').css('display','none');
  	$('.queryandpivot').css('display','')
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
				var inputeight1 = [];
				var inputeight2 = [];
				$('#CANchannelnumber').find('option').remove();
				if(data.data.channel==11){
                   $('<option value="11" checked>CAN1</option>').appendTo($('#CANchannelnumber'))
				   $('<option value="12">CAN2</option>').appendTo($('#CANchannelnumber'))
				}else{
					$('<option value="11">CAN1</option>').appendTo($('#CANchannelnumber'))
				    $('<option value="12" checked>CAN2</option>').appendTo($('#CANchannelnumber'))
				}
				$('#CANstoptime').datetimebox('setValue', data.data.endTime);
				var data = data.rows;
				for(var j = 0;j<data.length;j++){
					inputeight1 = []
                    for(var i=0;i<8;i++){
						inputeight1.push(data[j].filter.substring(i*2,i*2+2))
					}
					inputeight2.push(inputeight1)
				}
				$('#cantable').find('tr').nextAll().remove();
        		for(var i=0;i<data.length;i++){
					var list = ''
					for(var j=0;j<8;j++){
                       list += '<input maxlength="2" style="width:22px;margin-left:10px;" value='+inputeight2[i][j]+'>'
					}
					var arr=[];
        			$("<tr id='cantr'>"+"<td style='width: 40px;'>"
        			+"<input type='checkbox' name='cancheckbox' style='width: 22px;'>"+"</td>"
        			+"<td id='canIds'>"+data[i].canId+"</td>"+"<td>"+data[i].canName+"</td>"
        			+"<td>"+"<input id='canIdIntervals' value='"+data[i].interval+"' type='text'>"+"</td>"
					+"<td id='masks'>"+list
					+"</td>"+"</tr>").appendTo($('#cantable'))
        		}
				console.log(inputeight2)
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
            url: server_context+"/phoneCallWakeup",
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
			var filters=[];
			for(var s=0;s<$("#cantable tr").eq(i+1).find('td').eq(4).find('input').length;s++){
                 filters.push($("#cantable tr").eq(i+1).find('td').eq(4).find('input').eq(s).val());
			}
			a.push({
				canId:$("#cantable tr").eq(i+1).find('td').eq(1).text(),
				interval:$("#cantable tr").eq(i+1).find('td').eq(3).find('input').val(),
				filter:filters.join('')
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
				 $('#RecordingoptionsModal').modal('hide');
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
				$('#RecordingoptionsModal').modal('hide');
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
  	$('.queryandpivot').css('display','');
	$('#queryandpivot-number').val('');
	$('#queryandpivot-startElectronic').datetimebox('setValue', '');
	$('#queryandpivot-oldElectronic').datetimebox('setValue', '');
	$('.queryandpivot-datagrid').datagrid({
		url: server_context+'/listCanData',
		method: 'get',
		singleSelect: 'true',
		fit: 'true',
		fitColumns: 'true',
		rownumbers: 'true',
		// pagination: "true",
		queryParams: {
			deviceId:'',
            startTime:'',
            endTime:''
		},
		columns:[[
		    { field:"cb",checkbox:"true",align:"center"},
			{ field:"DeviceId",title:'设备编号',align:"center",width:'11%'},
			{ field:"CanId",title:'CANID',align:"center",width:'11%'},
			{ field:"Model",title:'车型',align:"center",width:'11%'},
			{ field:"DATA",title:'数据项',align:"center",width:'11%'},
			{ field:"RxTime",title:'数据接收时间',align:"center",width:'11%'},
			{ field:"DLC",title:'数据项长度',align:"center",width:'11%'},
			{ field:"EndTime",title:'节点丢失时间',align:"center",width:'11%'},
			{ field:"MSec",title:'毫秒级时间',align:"center",width:'11%'},
			{ field:"Time_t",title:'秒级时间',align:"center"}
		]]
	})
})
function queryandpivotmanagement(){
	var statc = $('#queryandpivot-startElectronic').datetimebox('getValue');
	var oldsta = $('#queryandpivot-oldElectronic').datetimebox('getValue');
	var time1 = statc.substring(5,7);
	var time2 = oldsta.substring(5,7);
	if($('#queryandpivot-number').val()==''||statc==''||oldsta==''){
        $.messager.alert('系统提示','查询字段不能为空(全必填)','error');
		   return;
	}
	if(time1!=time2){
          $.messager.alert('系统提示','起止与结束时间必须在同一月','error');
		  return;
	}
	$('.queryandpivot-datagrid').datagrid('load',{
		deviceId:$('#queryandpivot-number').val(),
		startTime:$('#queryandpivot-startElectronic').val(),
		endTime:$('#queryandpivot-oldElectronic').val()
	})
}
function candatarid(){
	$('.queryandpivot-datagrid').datagrid({
		url: server_context+'/listCanData',
		method: 'get',
		singleSelect: 'true',
		fit: 'true',
		fitColumns: 'true',
		rownumbers: 'true',
		// pagination: "true",
		queryParams: {
			deviceId:equipmentnumber,
            startTime:startingtime,
            endTime:endtime
		},
		columns:[[
		    { field:"cb",checkbox:"true",align:"center"},
			{ field:"DeviceId",title:'设备编号',align:"center",width:'11%'},
			{ field:"CanId",title:'CANID',align:"center",width:'11%'},
			{ field:"Model",title:'车型',align:"center",width:'11%'},
			{ field:"DATA",title:'数据项',align:"center",width:'11%'},
			{ field:"RxTime",title:'数据接收时间',align:"center",width:'11%'},
			{ field:"DLC",title:'数据项长度',align:"center",width:'11%'},
			{ field:"EndTime",title:'节点丢失时间',align:"center",width:'11%'},
			{ field:"MSec",title:'毫秒级时间',align:"center",width:'11%'},
			{ field:"Time_t",title:'秒级时间',align:"center"}
		]],
		onLoadSuccess: function (data) { 
			if(data.error_code!=0){
                Statuscodeprompt(data.error_code)
			}
		}
	})
}
//导出按钮
function queryandpivotdaochu(){
	var statc = $('#queryandpivot-startElectronic').datetimebox('getValue');
	var oldsta = $('#queryandpivot-oldElectronic').datetimebox('getValue');
	var time1 = statc.substring(5,7);
	var time2 = oldsta.substring(5,7);
	if($('#queryandpivot-number').val()==''||statc==''||oldsta==''){
        $.messager.alert('系统提示','查询字段不能为空(全必填)','error');
		   return;
	}
	if(time1!=time2){
          $.messager.alert('系统提示','起止与结束时间必须在同一月','error');
		  return;
	}
	$.ajax({
		type:'post',
		async:'true',
		url: server_context+'/exportCanData',
		data:{
            deviceId:$('#queryandpivot-number').val(),
			startTime:$('#queryandpivot-startElectronic').val(),
			endTime:$('#queryandpivot-oldElectronic').val()
		},
		success:function(data){
            if(data.error_code==0){
                $.messager.alert('系统提示','数据正在导出中,请稍后于导出详情页面下载...','info');
			}else{
				row.fileUrl
			}
		}
	})
}
$('#queryandpivotLogs').click(function(){
	$('#queryandpivotLogs').css('background','white');
	$('#queryandpivotoperates').css('background','#E5E5E5');
	$('.queryandpivot-bottom-one').css('display','');
	$('.queryandpivot-bottom-two').css('display','none');
})
//导出记录点击事件
$('#queryandpivotoperates').click(function(){
	$('#queryandpivotoperates').css('background','white');
	$('#queryandpivotLogs').css('background','#E5E5E5');
	$('.queryandpivot-bottom-one').css('display','none');
	$('.queryandpivot-bottom-two').css('display','');
	$('#queryandpivot-numbertwo').val('');
	$('#queryandpivot-startElectronictwo').datetimebox('setValue', '');
	$('#queryandpivot-oldElectronictwo').datetimebox('setValue', '');
	$('.queryandpivot-datagrid-two').datagrid({
		url: server_context+'/listCanExport',
		method: 'get',
		singleSelect: 'true',
		fit: 'true',
		fitColumns: 'true',
		rownumbers: 'true',
		pageSize:50,
		pagination: "true",
		queryParams: {
			deviceId:'',
            startTime:'',
            endTime:''
		},
		columns:[[
		    { field:"cb",checkbox:"true",align:"center"},
			{ field:"fileName",title:'文件名称',align:"center",width:'17%'},
			{ field:"deviceId",title:'设备编号',align:"center",width:'11%'},
			{ field:"status",title:'导出状态',align:"center",width:'8%',
		          formatter: function (value, row, index) {
					  var status = row['status']
					  if(status==0){
                          return "<a>导出中</a>"
					  }else if(status==1){
                          return "<a>导出成功</a>"
					  }else if(status==2){
                          return "<a>无数据导出</a>"
					  }
				  }
	        },
			{ field:"fileCount",title:'文件数量',align:"center",width:'8%'},
			{ field:"startTime",title:'起始时间',align:"center",width:'13%'},
			{ field:"endTime",title:'结束时间',align:"center",width:'13%'},
			{ field:"ts",title:'创建时间',align:"center",width:'13%'},
			{ field:"duration",title:'文件导出毫秒时间',align:"center",width:'8%'},
			{ field:"duraton",title:'详情',align:"center",
		          formatter: function (value, row, index) {
                      return '<a href="javaScript:queryandpivotoperatesxq('+index+')" style="display:inline-block;background: #00AAFF;color: white;width:50px;height:20px;line-height:20px;">详情</a>'
				  }
		    }
		]],
		onLoadSuccess: function (data) { 
			if(data.error_code!=0){
                Statuscodeprompt(data.error_code)
			}
		}
	})
})
function queryandpivotoperatesxq(index){
	var rows = $('.queryandpivot-datagrid-two').datagrid('getRows');
	var row = rows[index];
	console.log(row)
    $('#systemLogmyModal').modal('show');
	setTimeout(function(){
       $('.systemLogmyModal-datagrid').datagrid({
			url: server_context+'/listCanExportDetail',
			method: 'get',
			singleSelect: 'true',
			fit: 'true',
			fitColumns: 'true',
			rownumbers: 'true',
			pageSize:50,
			pagination: "true",
			queryParams: {
				excelExportId:row.id
			},
			columns:[[
				{ field:"cb",checkbox:"true",align:"center"},
				{ field:"fileName",title:'文件名称',align:"center",width:'45%'},
				{ field:"fileUrl",title:'下载',align:"center",width:'18%',
			        formatter: function (value, row, index) {
						return '<a href="javaScript:systemLogmyModalurl('+index+')">下载</a>'
					}
		        },
				{ field:"ts",title:'创建时间',align:"center"}
			]],
			onLoadSuccess: function (data) { 
				if(data.error_code!=0){
					Statuscodeprompt(data.error_code)
				}
			}
		})
	},600)
}
//下载
function systemLogmyModalurl(index){
	var rows = $('.systemLogmyModal-datagrid').datagrid('getRows');
	var row = rows[index];
    if(row.fileUrl!=''){
         window.location.href = row.fileUrl;
	}
}
function queryandpivotmanagementtwo(){
    $('.queryandpivot-datagrid-two').datagrid('load',{
		deviceId:$('#queryandpivot-numbertwo').val(),
		startTime:$('#queryandpivot-startElectronictwo').val(),
        endTime:$('#queryandpivot-oldElectronictwo').val()
	})
}
// function candatagrid(){
// 	$.ajax({
// 		type:"post",
// 		url:server_context+"/listCanName",
// 		async:true,
// 		success:function(data){
// 			if(data.error_code==0){
// 				$('.queryandpivot-bottom-left-bottom').find('button').nextAll().remove();
// 				for(var i=0;i<data.data.length;i++){
// 					$('<button onclick="candatarid()" name='+data.data[i].canId+'>'+data.data[i].canName+'</button>').appendTo($('.queryandpivot-bottom-left-bottom'))
// 				}
// 			}else{
// 				Statuscodeprompt(data.error_code)
// 			}
// 		}
// 	});	
// }



