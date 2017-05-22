  var equipmentnumber;//设备编号
  var startingtime//起始时间
  var endtime//结束时间
  var canLookUp;//查看权限
  var canSettingUp;//录制设置权限
  var canRouseUp=0;//唤醒按钮权限
  var canonline;//判断设备是否在线
  var candata;//判断设备是否在录制中
  //7.1录制管理--录制管理
  $('#managementli32').click(function(){
    clearInterval(seti);
	clearInterval(Realtimeconditionset);
  	$('main>div').css('display','none');
  	$('.Recordmanagement').css('display','')
	$('#Recordmanagement-number').val('')
	$('#Recordmanagement-vin').val('')
	$('#Recordmanagement-Electronic').val('')
	//权限判断
	var data={
		id:$('#managementli32').attr('name')
	}	
	$.post(server_context+'/setMenuId',data,function(data){
		if(data.error_code!=0){
			Statuscodeprompt(data.error_code)
		}
		for(var i=0;i<data.data.length;i++){
			if(data.data[i]=='121'){
				canLookUp=121
			}
			if(data.data[i]=='122'){
				canSettingUp=122
			}
			if(data.data[i]=='123'){
				canRouseUp=123
			}
		}
	})
  	$('.Recordmanagement-primarymeter').datagrid({
  		url: server_context+'/listCanDevice',
		method: 'get',
		singleSelect: 'true',
		fit: 'true',
		fitColumns: 'true',
		rownumbers: 'true',
        pageSize:50,
		pagination: "true",
		queryParams:{
           deviceId:'',
		   vin:'',
		   ecuSerialNum:''
		},
		columns:[[
		    { field:"cb",checkbox:"true",align:"center"},
			{ field:"deviceId",title:'设备编号',align:"center",width:'10%'},
			{ field:"vin",title:'车架号',align:"center",width:'12%'},
			{ field:"ecuSerialNum",title:'电控单元号',align:"center",width:'18%'},
			{ field:"iccid",title:'iccid',align:"center",width:'15%'},
			{ field:"modelAlias",title:'车系代码',align:"center",width:'10%'},
			{ field:"one6",title:'录制状态',align:"center",width:'10%',
		        formatter:function(value, rows, index){
					var status = rows.status;
					if(status==0){
                       return '<a style="color:#EC5759">'+"录制中"+'</a>';
					}else{
                       return '<a style="color:#7CAD16">'+"录制结束"+'</a>';
					}
		        }
			},
			{ field:"one7",title:'录制信息',align:"center",width:'10%',
		        formatter:function(value, rows, index){
		        	return '<a href="javaScript:LookRecordmanagement('+index+')" style="display:inline-block;line-height:20px;width:60px;height:20px;background:#00AAFF;color:white">'+"查看"+'</a>';
		        }
			},
			{ field:"one8",title:'操作',align:"center",
		        formatter:function(value, rows, index){
					var value = rows.online;
					var list='';
					if(value == false){
						 list += '<a href="javaScript:canawakena('+index+')" style="background: #00AAFF;color: white;display: inline-block;width: 40px;height: 18px;">唤醒</a>'
						 list += '<a style="display:inline-block;line-height:20px;width:60px;height:20px;background:#989898;color:white;margin-left: 5%;">'+"录制设置"+'</a>';
					}else{
						 list += '<a style="background: #989898;color: white;display: inline-block;width: 40px;height: 18px;">在线</a>'
						 list += '<a href="javaScript:Recordingoptions('+index+')" style="display:inline-block;line-height:20px;width:60px;height:20px;margin-left: 5%;background:#00AAFF;color:white">'+"录制设置"+'</a>';
					}
		        	return list;
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
	$('.management>li').css('color', '#bbe0fb')
	$('.management>li').removeClass('libj')
	$('.management>li>img').attr('src','img/leftimg/yuanhuanw.png')
	$('#managementli33').addClass('libj').css('color','#00aaff')
	$('#managementli33').find('img').attr('src','img/leftimg/yuanhuanx.png')
	$('#queryandpivot-number').val(equipmentnumber)
	$('#queryandpivot-startElectronic').datetimebox('setValue',startingtime);	
	$('#queryandpivot-oldElectronic').datetimebox('setValue',endtime);
    $('#queryandpivotLogs').css('background','white');
	$('#queryandpivotoperates').css('background','#E5E5E5');
	$('.queryandpivot-bottom-one').css('display','');
	$('.queryandpivot-bottom-two').css('display','none');
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
		$('.out').css('display','')
		$('.outTest').css('display','')
        //获取设备的在线信息
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
					   $('#canawaken').removeAttr('disabled','disabled')
					   $('#Bustorecordsend').attr('disabled','disabled')
					   //$('#cancelrecording').attr('disabled','disabled')
					   $('#canIDduqu').attr('disabled','disabled')
					   listCnId()
				   }else{
					   $('#CANdeviceIdzt').text('在线')
					   $('#CANdeviceIdzt').css('color','#7EB00E')
					   $('#canawaken').attr('disabled','disabled')
					   $('#Bustorecordsend').removeAttr('disabled','disabled')
					   //$('#cancelrecording').removeAttr('disabled','disabled')
					   $('#canIDduqu').removeAttr('disabled','disabled')
						var ajaxTimeout = $.ajax({
							timeout:10000, //超时时间设置，单位毫秒
							type:'post',
							async:'true',
							url:server_context+'/readCanRecord',
							data:{
								'deviceId':row.deviceId
							},
							success:function(data){
						       if(data.error_code==0){
						    	   $('.out').css('display','none')
								   $('.outTest').css('display','none')
							   }else{
								   Statuscodeprompt(data.error_code);
								   $('.out').css('display','none')
								   $('.outTest').css('display','none')
							   }
						       listCnId()
							},
							complete:function(XMLHttpRequest,status){ //请求完成后最终执行参数
								//超时,status还有success,error等值的情况
								if(status=='timeout'){
									ajaxTimeout.abort(); //取消请求
									$('.out').css('display','none');
									$('.outTest').css('display','none')
								}
							}
						})
				   }
				}else{
                   Statuscodeprompt(data.error_code);
                   listCnId();
				}
			}
		})
		
  }
  function listCnId(){
     $.ajax({
        	type:'post',
        	async:'true',
        	url:server_context+'/listCanId',
        	data:{
        		deviceId:$('#Recordmanagementtdd1').text()
        	},
        	success:function(data){
                candata = data.data;
				/*if(canonline==true){
                    if(candata!=''){
                     	 $('#Bustorecordsend').attr('disabled','disabled')
						 $('#cancelrecording').removeAttr('disabled','disabled')
					}else{
						$('#Bustorecordsend').removeAttr('disabled','disabled')
						$('#cancelrecording').attr('disabled','disabled')
					}
				}*/
				var inputeight1 = [];
				var inputeight2 = [];
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
					var list = '';
					var selected ='';
					var checked = '';
					for(var j=0;j<8;j++){
                       list += '<input maxlength="2" onkeyup="inputteshu(this)" style="width:22px;margin-left:10px;" value='+inputeight2[i][j]+'>'
					}
					if(data[i].channel=='11'){
                       selected = "<select id=''>"+"<option value='11' selected='selected'>"+'CAN1'+"</option>"+
					   "<option value='12'>"+'CAN2'+"</option>"+"</select>"
					}else if(data[i].channel=='12'){
						selected = "<select>"+"<option value='11'>"+'CAN1'+"</option>"+
					   "<option value='12' selected='selected'>"+'CAN2'+"</option>"+"</select>"
					}else{
						selected = "<select>"+"<option value='11'>"+'CAN1'+"</option>"+
					   "<option value='12'>"+'CAN2'+"</option>"+"</select>"
					}
					if(data[i].deleted=="1"){
						checked = 'checked';
					}
					var arr=[];
        			$("<tr id='cantr'>"+"<td style='width: 40px;'>"
        			+"<input type='checkbox' id='cancheckbox' name='cancheckbox' style='width: 22px;'>"+"</td>"
        			+"<td id='canIds'>"+data[i].canId+"</td>"+"<td>"+data[i].canName+"</td>"
        			+"<td>"+"<input id='canIdIntervals' onkeyup='inputteshu(this)' style='width:80px;' value='"+data[i].interval+"' type='text'>"+"</td>"
					+"<td id='masks'>"+list
					+"</td>"+"<td id='CANchannelnumber'>"+selected+"</td>"+"<td style='width: 40px;'>"
        			+"<input type='checkbox' id='candeleted' name='candeleted' "+checked+" style='width: 35px;'>"+"</td>"+"</tr>").appendTo($('#cantable'))
        		}
				var canchcked = document.querySelectorAll('#cancheckbox');
				for(var i=0;i<canchcked.length;i++){
					canchcked[i].index=i;
					canchcked[i].onclick = function(){
						var j = this.index;
						if(canchcked[j].checked==true){
                            $("#cantable tr").eq(j+1).addClass('success')
						}else if(canchcked[j].checked==false){
							$("#cantable tr").eq(j+1).removeClass('success')
						}
					}
				}
				if(candata!=''){
					for(var i=0;i<candata.filter.length;i++){
                         for(var j=0;j<$('#cantable tr').length;j++){
                             if(candata.filter[i].canId.toUpperCase()==$('#cantable tr').eq(j).find('td').eq(1).text()){
                                 $("#cantable tr").eq(j).addClass('success');
								 $('#cantable tr').eq(j).find('td').eq(0).find('input').attr('checked',true);
							 }
						 }
					}
				}
        	}
        })
  }
  
 //can录制设备唤醒按钮
function canawakena(index){
	if(canRouseUp==0){
		$.messager.alert('系统提示','你没有唤醒权限','warning');
		return;
	}
	var row = 	$('.Recordmanagement-primarymeter').datagrid('getRows');
	var rows = row[index];
 	var deviceId = rows.deviceId;
    status = 'true';
    $.messager.confirm("操作提示", "第" + n + "次尝试唤醒设备,请稍候。。。", function (data) {
        if (data) {

        } else {
            n = 1;
            status = 'false';
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
                    status = 'true';
                    clearTimeout(set);
                    $(".messager-body").window('close');
                    $.messager.alert("操作提示", "唤醒命令发送成功,等待设备上线！", "info");
					n=1;
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
 }
 //can录制设备唤醒重试
function deviceWeupRetry(deviceId){
	if (status == 'true') {
        $.messager.confirm("操作提示", "第" + n + "次尝试唤醒设备,请稍候。。。", function (data) {
            if (data) {

            } else {
                n = 1;
                status = 'false';
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
                    status = 'true';
                    clearTimeout(set);
					n=1;
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
                            status = 'true';
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
	/*if(candata!=''){
       $.messager.alert('系统提示','设备正在录制中,请先取消录制再进行发送...','error');
	   return;
	}*/
	var row = $('.Recordmanagement-primarymeter').datagrid('getSelected')
	var a=[];
	var dt;
	for(var i=0;i<$('#cantable input[name="cancheckbox"]').length;i++){
		if($('#cantable input[name="cancheckbox"]').eq(i).is(':checked')==true){
			dt = 1;
			var filters=[];
			var deleted = "0";
			if($('#cantable input[name="candeleted"]').eq(i).is(':checked')==true){
				deleted = "1";
			}
			for(var s=0;s<$("#cantable tr").eq(i+1).find('td').eq(4).find('input').length;s++){
                 filters.push($("#cantable tr").eq(i+1).find('td').eq(4).find('input').eq(s).val());
			}
			a.push({
				canId:$("#cantable tr").eq(i+1).find('td').eq(1).text(),
				interval:$("#cantable tr").eq(i+1).find('td').eq(3).find('input').val(),
				filter:filters.join(' '),
				channel:$("#cantable tr").eq(i+1).find('td').eq(5).find('select').val(),
				deleted:deleted,
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
	   if(a[i].filter.length!=23){
          $.messager.alert('系统提示','所选设备掩码不得低于16位!','error')
		  return;
	   }
	}
	if($('#CANstoptime').val()==''){
        $.messager.alert('系统提示','结束时间不能为空!','error')
		return;
	}
	$('.out').css('display','')
	$.ajax({
		type:'post',
    	async:'true',
    	url:server_context+'/sendCanRecord',
    	traditional: true,
		data:{
			'deviceId':$('#Recordmanagementtdd1').text(),
			// 'channel':$('#CANchannelnumber').val(),
			'endTime':$('#CANstoptime').val(),
			'filter':JSON.stringify(a)
		},
    	dataType:"json",
    	success:function(data){
			$('.out').css('display','none')
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
/*$('#cancelrecording').click(function(){
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
})*/
//can读取按钮
$('#canIDduqu').click(function(){
	$('.out').css('display','')
	var ajaxTimeout1 = $.ajax({
		timeout:10000, //超时时间设置，单位毫秒
		type:'post',
    	async:'true',
    	url:server_context+'/readCanRecord',
		data:{
			'deviceId':$('#Recordmanagementtdd1').text()
		},
		success:function(data){
           if(data.error_code==0){
			  /* setTimeout(function() {
				   listCnId()
				   $.messager.alert('系统提示','读取成功','info');
				   $('.out').css('display','none')
			   }, 2000);*/
			   listCnId()
			   $.messager.alert('系统提示','读取成功','info');
			   $('.out').css('display','none')
		   }else{
			   Statuscodeprompt(data.error_code);
			   $('.out').css('display','none')
		   }
		},
		complete:function(XMLHttpRequest,status){ //请求完成后最终执行参数
			//超时,status还有success,error等值的情况
			if(status=='timeout'){
				ajaxTimeout1.abort(); //取消请求
				$.messager.alert('系统提示','读取失败','error');
				$('.out').css('display','none');
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
var canDataDetails=0;
$('#managementli33').click(function(){   
	clearInterval(seti);
	$('main>div').css('display','none');
  	$('.queryandpivot').css('display','');
	$('#queryandpivot-number').val('');
	$('#queryandpivot-startElectronic').datetimebox('setValue', '');
	$('#queryandpivot-oldElectronic').datetimebox('setValue', '');
	$('#queryandpivotLogs').css('background','white');
	$('#queryandpivotoperates').css('background','#E5E5E5');
	$('.queryandpivot-bottom-one').css('display','');
	$('.queryandpivot-bottom-two').css('display','none');
	
	//权限请求
	var data={
		id:$('#managementli33').attr('name')
	}
	$.post(server_context+'/setMenuId',data,function(data){
		if(data.error_code!=0){
			Statuscodeprompt(data.error_code)
		}
		for(var i=0;i<data.data.length;i++){
			if(data.data[i]=='125'){
				//列表查看权限
			}
			if(data.data[i]=='126'){
				// can数据导出
				$('.canDataExport').css('display','');
			}
			if(data.data[i]=='127'){
				//can数据导出详情查看
				canDataDetails=127;
			}
		}
	})
	
	$('.queryandpivot-datagrid').datagrid({
		url: server_context+'/listCanData',
		method: 'get',
		singleSelect: 'true',
		fit: 'true',
		fitColumns: 'true',
		rownumbers: 'true',
		queryParams: {
			deviceId:'',
            startTime:'',
            endTime:''
		},
		columns:[[
		    // { field:"cb",checkbox:"true",align:"center"},
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
		queryParams: {
			deviceId:equipmentnumber,
            startTime:startingtime,
            endTime:endtime
		},
		columns:[[
		    // { field:"cb",checkbox:"true",align:"center"},
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
//数据查询点击事件
$('#queryandpivotLogs').click(function(){
	$('#queryandpivotLogs').css('background','white');
	$('#queryandpivotoperates').css('background','#E5E5E5');
	$('.queryandpivot-bottom-one').css('display','');
	$('.queryandpivot-bottom-two').css('display','none');
	$('.queryandpivot-datagrid').datagrid({
		url: server_context+'/listCanData',
		method: 'get',
		singleSelect: 'true',
		fit: 'true',
		fitColumns: 'true',
		rownumbers: 'true',
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
		]]
	})
})
function queryandpivotoperatesxq(index){
	if(canDataDetails!=127){
		$.messager.alert('系统提示','你没有查看详情权限','warning');
		return;
	}
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
			]]
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



