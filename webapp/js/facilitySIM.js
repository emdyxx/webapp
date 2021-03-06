/*******************4.2设备管理---SIM卡******************/
    var faclitySIM;
	$('#managementli10').click(function(){
		clearInterval(seti);
		clearInterval(Realtimeconditionset);
		$('main>div').css('display','none')
		$('.facilitySIM').css('display','')
		$('.facilitySIMseek input').val('')
		//权限请求
		var data={
			id:$('#managementli10').attr('name')
		}
		$.post(server_context+'/setMenuId',data,function(data){
			if(data.error_code!=0){
				Statuscodeprompt(data.error_code)
			}
			for(var i=0;i<data.data.length;i++){
				if(data.data[i]==71){
					faclitySIM=71
				}
				if(data.data[i]==72){
					$('.seeSim').css('display','')
				}
				if(data.data[i]==73){
					$('.seeSimInvoice').css('display','')
				}
				if(data.data[i]==74){
					$('.refreshSim').css('display','')
				}
				if(data.data[i]==75){
					$('.informations').css('display','')
				}
			}
		})
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
			    { field: 'deviceId', title: '设备编号',width:'9%', align: 'center',formatter: function (value) {return dataProcessing(value);}},
				{ field: 'iccid', title: 'ICCID', width:'17%',align: 'center',formatter: function (value) {return dataProcessing(value);}},
				{ field: 'ratePlan', title: '套餐',width:'28%', align: 'center',formatter: function (value) {return dataProcessing(value);}},
       			{ field: 'dataUsage', title: '当月数据(MB)',width:'7%', align: 'center',formatter: function (value) {return dataProcessing(value);}},
       			{ field: 'smsUsage', title: '当月短信(条)',width:'6%', align: 'center',formatter: function (value) {return dataProcessing(value);}},
       			{ field: 'voiceUsage', title: '当月语音(秒)',width:'7%', align: 'center',formatter: function (value) {return dataProcessing(value);}},
				{ field: 'simStatus', title: 'SIM卡当前状态',width:'7%', align: 'center',
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
				{ field: 'syncTime', title: '同步时间',width:'12%', align: 'center',formatter: function (value) {return dataProcessing(value);}},
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
			]],
			onLoadSuccess:function(data){
				if(data.error_code!=0){
					Statuscodeprompt(data.error_code)
				}
			}
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
			onLoadSuccess:function(data){
				if(data.error_code!=0){
					Statuscodeprompt(data.error_code)
				}
			}
	    })
    }
    //sim明细
	var pageNumbers;
	var SIMRows;
    function simdetails(index){
		pageNumbers = 1;
    	var rows = $('.SIMhistorysdetailsone-data').datagrid('getRows');
	    var row = rows[index];
		SIMRows = row;
	    $('.SIMhistorysdetailsone').css('display','none');
	    $('.SIMhistorysdetailsonetwo').css('display','');
	    $('.SIMhistorysdetailsonetwo-data').datagrid({
			url: server_context+'/listSimDetails',
			method: 'get',
			pagination: true,
	        fit:true,
		    fitColumns:true,
		    autoRowHeight:true,
		    rownumbers:true,
		    singleSelect:true,
		    scrollbarSize:0,
	        pageSize: 50,
			pageNumber:pageNumbers,
	        remoteSort:false,
			queryParams: {
				iccid:row.iccid,
                startTime:row.billingCycle,
				page:pageNumbers
			},
			columns:[[
			    { field: 'iccid', title: 'ICCID',align: 'center',width:'25%'},
				{ field: 'sessionStartTime', title: '时间',align: 'center',width:'20%'},
				{ field: 'dataVolume', title: '数据(KB)',align: 'center',width:'10%'},
       			{ field: 'billable', title: '是否计费',align: 'center',width:'18%'},
       			{ field: 'serviceType', title: '服务类型',align: 'center'}
			]],
			onLoadSuccess:function(data){
				if(data.error_code!=0){
					Statuscodeprompt(data.error_code)
				}
				// $('.SIMhistorysdetailsonetwo-data').datagrid('doCellTip',{'max-width':'400px','delay':500});
				$('.SIMhistorysdetailsonetwo-data').datagrid('getPager').pagination({
					 layout:[],
					 buttons:buttons,
				 });
			}
	    })
    }
	var buttons = [{
		text:'上一页',
		//iconCls:'icon-add',
		handler:function(){
			if(pageNumbers>1){
				pageNumbers--;
				$('.SIMhistorysdetailsonetwo-data').datagrid({
					url: server_context+'/listSimDetails',
					method: 'get',
					pagination: true,
					fit:true,
					fitColumns:true,
					autoRowHeight:true,
					rownumbers:true,
					singleSelect:true,
					scrollbarSize:0,
					pageSize: 50,
					pageNumber:pageNumbers,
					remoteSort:false,
					queryParams: {
						iccid:SIMRows.iccid,
						startTime:SIMRows.billingCycle,
						page:pageNumbers
					},
					columns:[[
						{ field: 'iccid', title: 'ICCID',align: 'center',width:'25%'},
						{ field: 'sessionStartTime', title: '时间',align: 'center',width:'20%'},
						{ field: 'dataVolume', title: '数据(KB)',align: 'center',width:'10%'},
						{ field: 'billable', title: '是否计费',align: 'center',width:'18%'},
						{ field: 'serviceType', title: '服务类型',align: 'center'}
					]],
					onLoadSuccess:function(data){
						if(data.error_code!=0){
							Statuscodeprompt(data.error_code)
						}
						// $('.SIMhistorysdetailsonetwo-data').datagrid('doCellTip',{'max-width':'400px','delay':500});
						$('.SIMhistorysdetailsonetwo-data').datagrid('getPager').pagination({
							layout:[],
							buttons:buttons,
						});
					}
				})
			}
		}
	},{
		text:'下一页',
		//iconCls:'icon-cut',
		handler:function(){
			if(pageNumbers>=1){
				pageNumbers++;
				$('.SIMhistorysdetailsonetwo-data').datagrid({
					url: server_context+'/listSimDetails',
					method: 'get',
					pagination: true,
					fit:true,
					fitColumns:true,
					autoRowHeight:true,
					rownumbers:true,
					singleSelect:true,
					scrollbarSize:0,
					pageSize: 50,
					pageNumber:pageNumbers,
					remoteSort:false,
					queryParams: {
						iccid:SIMRows.iccid,
						startTime:SIMRows.billingCycle,
						page:pageNumbers
					},
					columns:[[
						{ field: 'iccid', title: 'ICCID',align: 'center',width:'25%'},
						{ field: 'sessionStartTime', title: '时间',align: 'center',width:'20%'},
						{ field: 'dataVolume', title: '数据(KB)',align: 'center',width:'10%'},
						{ field: 'billable', title: '是否计费',align: 'center',width:'18%'},
						{ field: 'serviceType', title: '服务类型',align: 'center'}
					]],
					onLoadSuccess:function(data){
						if(data.error_code!=0){
							Statuscodeprompt(data.error_code)
						}
						// $('.SIMhistorysdetailsonetwo-data').datagrid('doCellTip',{'max-width':'400px','delay':500});
						$('.SIMhistorysdetailsonetwo-data').datagrid('getPager').pagination({
							layout:[],
							buttons:buttons,
						});
					}
				})
			}
		}
	}];
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
		$('.out').css('display','')
		$.ajax({
			url:server_context+'/updateSim',
			type:'POST',
			data:{
				'iccid':row.iccid
			},
			success:function(data){
				$('.out').css('display','none')
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
		if(faclitySIM!=71){
           $.messager.alert('系统提示','你没有此权限','error');
		   return;
		}
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
	//SIM卡信息同步
	function informations(){
		$('.out').css('display','')
		$.ajax({
			url:server_context+'/synchronizationSim',
			type:'POST',
			async:true,
			success:function(data){
				$('.out').css('display','none')
				if(data.error_code==0){
                    $.messager.alert('系统提示','信息同步成功','info');
					$('.facilitySIMbottomdata').datagrid('reload');
				}else{
					Statuscodeprompt(data.error_code);
				}
			}
		})
	}