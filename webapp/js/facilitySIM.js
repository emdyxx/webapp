/*******************4.2设备管理---SIM卡******************/
	$('#managementli10').click(function(){
		clearInterval(seti);
		$('main>div').css('display','none')
		$('.facilitySIM').css('display','')
		$('.facilitySIMseek input').val('')
		$('.facilitySIMbottomdata').datagrid({
			url: server_context+'/listSim',
			method: 'get',
			singleSelect: 'true',
			fit: 'true',
			fitColumns: 'true',
			rownumbers: 'true',
			pageSize:50,
			pagination: "true",
			queryParams: {
				deviceId:$('#facilitySIMseekinquire1').val(),
				iccid:$('#facilitySIMseekinquire2').val()
			},
			columns:[[
			    { field: 'deviceId', title: '设备编号',width:'10%', align: 'center',formatter: function (value) {return dataProcessing(value);}},
				{ field: 'iccid', title: 'ICCID', width:'20%',align: 'center',formatter: function (value) {return dataProcessing(value);}},
				{ field: 'ratePlan', title: '套餐',width:'20%', align: 'center',formatter: function (value) {return dataProcessing(value);}},
       			{ field: 'dataUsage', title: '当月数据(MB)',width:'10%', align: 'center',formatter: function (value) {return dataProcessing(value);}},
       			{ field: 'smsUsage', title: '当月短信(条)',width:'10%', align: 'center',formatter: function (value) {return dataProcessing(value);}},
       			{ field: 'voiceUsage', title: '当月语音(秒)',width:'10%', align: 'center',formatter: function (value) {return dataProcessing(value);}},
				{ field: 'simStatus', title: 'SIM卡当前状态',width:'10%', align: 'center',
				    formatter: function (value, row, index) {
  					  var value=row['simStatus'];
  					  if(value=="DEACTIVATED_NAME"){
  					  	return "停用";
  					  }else if(value=="ACTIVATED_NAME"){
  					  	return "激活";
  					  }else if(value=="TEST_READY_NAME"){
  					  	return "测试";
  					  }else if(value=="ACTIVATION_READY_NAME"){
  					  	return "准备激活";
  					  }else if(value=="INVENTORY_NAME"){
  					  	return "库存";
  					  }else if(value=="RETIRED_NAME"){
  					    return "注销";
  					  }else{
  					  	return dataProcessing(value);
  					  }
    				}
				},
				{ field: 'id', title: '操作', align: 'center',
				    formatter: function (value, row, index) {
  					  var value=row['simStatus'];
  					  if(value=="ACTIVATED_NAME"){
  					  	return "<a href=\"javaScript:editTerminal('"+row['iccid']+"','"+row['simStatus']+"')\"><img style='width:70px;height:20px' src=\"img/Theowner/sim_deactivated_btn.png\" /></a>";
  					  }else{
  					  	return "<a href=\"javaScript:editTerminal('"+row['iccid']+"','"+row['simStatus']+"')\"><img style='width:70px;height:20px' src=\"img/Theowner/sim_activated_btn.png\" /></a>";
  					  }
    				}
				},
			]]
		})
	})
	//sim卡详情
	function seeSim(){
		var row = $('.facilitySIMbottomdata').datagrid('getSelected');
		if(row==null){
			$.messager.alert("操作提示", "请选择需要查看的SIM卡",'warning');
			return;
		}        
		$('#SIMdetailsModal').modal('show');
		$('#simdeviceid').text(row.deviceId);
		$('#simphone').text(row.msisdn);
		$('#simiccid').text(row.iccid);
		$('#simdatausage').text(row.dataUsage);
		$('#simimei').text(row.imei);
		$('#simsmsusage').text(row.smsUsage);
		$('#simimsi').text(row.imsi);
		$('#simvoiceusage').text(row.voiceUsage);
		$('#simrateplan').text(row.ratePlan);
	}
	//sim卡历史详单
	function seeSimInvoice(){
		var row = $('.facilitySIMbottomdata').datagrid('getSelected');
		if(row==null){
			$.messager.alert("操作提示", "请选择需要查看的SIM卡",'warning');
			return;
		}
		$('#SIMhistorysModal').modal('show');
		$('.SIMhistorysdetailsonetwo').css('display','none')
		$('.SIMhistorysdetailsone').css('display','');
		$('.SIMhistorysdetailsone-data').datagrid({
			url: server_context+'/listSimHistory',
			method: 'get',
			singleSelect: 'true',
			fit: 'true',
			fitColumns: 'true',
			rownumbers: 'true',
			pageSize:50,
			pagination: "true",
			queryParams: {
				iccid:row.iccid
			},
			columns:[[
			    { field: 'deviceId', title: '设备编号',align: 'center',width:'12%',formatter: function (value) {return dataProcessing(value);}},
				{ field: 'iccid', title: 'ICCID',align: 'center',width:'26%',formatter: function (value) {return dataProcessing(value);}},
				{ field: 'billingCycle', title: '账单周期',align: 'center',width:'15%',formatter: function (value) {return dataProcessing(value);}},
       			{ field: 'dataUsage', title: '数据(MB)',align: 'center',width:'12%',formatter: function (value) {return dataProcessing(value);}},
       			{ field: 'smsUsage', title: '短信(条)',align: 'center',width:'12%',formatter: function (value) {return dataProcessing(value);}},
       			{ field: 'voiceUsage', title: '语音(秒)',align: 'center',width:'12%',formatter: function (value) {return dataProcessing(value);}},
				{ field: 's', title: '操作',align: 'center',
				    formatter: function (value, row, index) {
  					   return '<a href="javascript:simdetails('+index+')" style="display:inline-block;width:70px;height:22px;background:#00AAFF;color:white;line-height:22px;">明细</a>'
    				}
				}
			]],
	    })
    }
    //sim明细
    function simdetails(index){
    	var rows = $('.SIMhistorysdetailsone-data').datagrid('getRows');
	    var row = rows[index];
	    $('.SIMhistorysdetailsone').css('display','none');
	    $('.SIMhistorysdetailsonetwo').css('display','');
	    $('.SIMhistorysdetailsonetwo-data').datagrid({
			url: server_context+'/listSimDetails',
			method: 'get',
			singleSelect: 'true',
			fit: 'true',
			fitColumns: 'true',
			rownumbers: 'true',
			pageSize:50,
			pageList: [50],
			pagination: "true",
			remoteSort:false,
			queryParams: {
				iccid:row.iccid,
                startTime:row.billingCycle
			},
			columns:[[
			    { field: 'iccid', title: 'ICCID',align: 'center',width:'25%'},
				{ field: 'sessionStartTime', title: '时间',align: 'center',width:'20%'},
				{ field: 'dataVolume', title: '数据(KB)',align: 'center',width:'10%'},
       			{ field: 'billable', title: '是否计费',align: 'center',width:'18%'},
       			{ field: 'serviceType', title: '服务类型',align: 'center'}
			]],
	    })
    }
	//返回按钮
	function SIMhistorysdetailsonetwofh(){
	   seeSimInvoice();
	}
	//sim卡用量同步
	function refreshSim(){
		var row = $('.facilitySIMbottomdata').datagrid('getSelected');
		if(row==null){
			$.messager.alert("操作提示", "请选择需要同步的SIM卡",'warning');
			return;
		}
		$.ajax({
			url:server_context+'/updateSim',
			type:'POST',
			data:{
				'iccid':row.iccid
			},
			success:function(data){
				if(data.error_code==0){
					$.messager.alert("操作提示", "同步成功","info");
					$('.facilitySIMbottomdata').datagrid('reload');
				}else {
					Statuscodeprompt(data.error_code,"操作失败...",'error')
				}
				
			}
		});	
	}
	//SIM信息查询条件
	function facilitySIMseekinquire(){  
		$(".facilitySIMbottomdata").datagrid("load", {
			deviceId:$('#facilitySIMseekinquire1').val(),
			iccid:$('#facilitySIMseekinquire2').val()
		});
	}
	// sim卡状态修改
	function editTerminal(iccid,state){
		var hint='你确定要执行此操作吗？';
		if(state=='ACTIVATED_NAME'){
			hint='你确定要停用SIM卡吗？';
            state='DEACTIVATED_NAME';
		}else if(state=='DEACTIVATED_NAME'){
			hint='激活SIM卡将产生资费，确认激活吗？';
            state='ACTIVATED_NAME';
		}
		$.messager.confirm('操作提示',hint,function(r){
			if(r){
				$.ajax({
					url:server_context+'/changeTerminal',
					type:'POST',
					data:{
						iccid:iccid,
						targetValue:state
					},
					success:function(data){
						if(data.error_code==0){
							$.messager.alert("操作提示", "操作成功！","info");
							$('.facilitySIMbottomdata').datagrid('reload');
						}else{
							Statuscodeprompt(data.error_code,"操作失败...",'error')
						}						
					}
				});	
			}
		})
	}