/********************5.1升级管理---设备升级**********************/
var dev; //分组升级 指定升级
$('.upgrademanage').css('display','none')
	$('#managementli23').click(function(){
		clearInterval(seti);
		$('main>div').css('display', 'none');
    	$('.upgrademanage').css('display','')
		$('.upgradetop input').val('')
    	$('.upgradebottomdata').datagrid({
			url: server_context+'/listUpdatePackage',
			method: 'get',
			singleSelect: 'true',
			fit: 'true',
			fitColumns: 'true',
			rownumbers: 'true',
			pageSize:50,
			pagination: "true",
			queryParams: {
				model:$('#upgradetopcxs1').val(),
				softVer:$('#upgradetopcxs2').val(),
				hardVer:$('#upgradetopcxs3').val(),
				pacVer:$('#upgradetopcxs4').val()
			},
			columns:[[
				{ field:"softVer",title:'软件版本',align:"center",width:'7%'},
				{ field:"hardVer",title:'硬件版本',align:"center",width:'7%'},
				{ field:"model",title:'适用型号',align:"center",width:'7%'},
				{ field:"pacVer",title:'PAC版本',align:"center",width:'9%'},
				{ field:"updateType",title:'升级包类型',align:"center",width:'8%',
				    formatter: function (value, row, index) {
  					  var value=row['updateType'];
  					  if(value==0){
  					  	return '<a>'+"OTA全文件"+'</a>';
  					  }else if(value==1){
  					  	return '<a>'+"拆分升级包"+'</a>';
  					  }else{
  					  	return '<a>'+"应用服务"+'</a>';
  					  }
    				}
				},
				{ field:"fileName",title:'文件名称',align:"center",width:'30%'},
				{ field:"url",title:'文件路径',align:"center",width:'6%',
				   formatter: function (value, row, index) {
  					  var value=row['url'];
  					  if(value==null||value==''||value=='undefined'){
  					  	return "";
  					  }
  					  return "<a style='color:#0000EE;' href=\"javaScript:downloadFile('"+value+"')\">下载</a>";
    				}
				},
				{ field:"targetType",title:'升级目标',align:"center",width:'10%',
			       formatter: function (value, row, index) {
  					  var value=row['targetType'];
  					  if(value==0){
  					  	return '通用升级';
  					  }else if(value==1){
  					  	return "<a style='color:#0000EE;' href=\"javaScript:UpgradeGroup('"+row['id']+"')\">分组升级</a>";
  					  }else if(value==2){
  					  	return "<a style='color:#0000EE;' href=\"javaScript:UpgradeDevice('"+row['id']+"')\">指定升级</a>";
  					  }
    				}
				},
				{ field:"active",title:'状态',align:"center",width:'8%',
				   formatter: function (value, row, index) {
  					  var value=row['active'];
  					  if(value==0){
  					  	return '<a style="color:#000000;">'+"禁用"+'</a>';
  					  }else{
  					  	return '<a style="color:#000000;">'+"启用"+'</a>';
  					  }
    				}
				},
				{ field:"ac",title:'操作',align:"center",width:'10%',
				    formatter: function (value, row, index) {
  					  var value=row['active'];
  					  var str = '';
  					  if(value==0){
  					  	str += "<a style='color:#0000EE;' href=\"javaScript:editActive('"+row['id']+"','"+row['active']+"')\">启用</a>";
  					  }else if(value==1){
  					  	str += "<a style='color:#0000EE;' href=\"javaScript:editActive('"+row['id']+"','"+row['active']+"')\">禁用</a>";
  					  }
  					  str += "<a style='color:#0000EE;margin-left:10px;' href=\"javaScript:deleteFile('"+row['id']+"')\">删除</a>";
  					  str += '<a style="color:#0000EE;margin-left:10px;" href="javaScript:upgradedetails('+index+')">详情</a>';
  					  return str
    				}
				}
			]]
		})
	})
	//下载文件
	function downloadFile(value){
		console.log(value)
		if(value!=''||value!=null||value!=undefined){
           window.location.href = value;
		}
	}
	//修改升级包启用状态
	function editActive(id,active){
		var operation;
		if(active=='0'){
			operation='你确定要启用升级包吗?';
			active=1;
		}else if(active=='1'){
			operation='你确定要禁用升级包吗?'; 
			active=0;
		}else{
			$.messager.alert("操作提示", "操作失败！","error");
			return;
		}
		$.messager.confirm('操作提示',operation,function(r){
			if(r){
				$.ajax({
					type:"get",
					url:server_context+"/activateUpdatePackage",
					data:{
						packageId:id,
						activated :active
					},
					success:function(data){
						if(data.error_code=='0'){
							$('.upgradebottomdata').datagrid('load');
							$.messager.alert("操作提示", "操作成功！","info");
						}else{
							Statuscodeprompt(data.error_code,"操作失败！...",'error')
						}
					}
			   });
			}
		})
	}
	//删除文件
	function deleteFile(id){
		// var row = $('.upgradebottomdata').datagrid('getData');
		$.messager.confirm("删除提示","你确定要删除吗?", function (data) {  
	        if (data) {
	        	$.ajax({
					type:"get",
					url:server_context+"/removeUpdatePackage",
					data:{
						id:id
					},
					success:function(data){
						if(data.error_code==0){
							$('.upgradebottomdata').datagrid('load');
						    $.messager.alert("操作提示", "删除成功！","info");
						}else{
							Statuscodeprompt(data.error_code,"删除失败！...",'error')
						}
					}
			   });	 
	        	
	        }else{  
	            
	        }
	    });  
	}
	//详情
	function upgradedetails(index){
		var row = $('.upgradebottomdata').datagrid('getData').rows[index];
		$('#upgradedetailsModal').modal('show');
		if(row.updataType==0){
			$('#updataTypee').text('OTA全文件')
		}else if(row.updataType==1){
			$('#updataTypee').text('拆分升级包')
		}else{
			$('#updataTypee').text('应用服务')
		}          
		$('#modell').text(row.model)
		$('#hardVerr').text(row.hardVer)
		$('#softVerss').text(row.softVer)
		$('#modemVerr').text(row.modemVer)
		$('#pacVerr').text(row.pacVer)
		$('#md55').text(row.md5)
		$('#urll').text(row.url)
		$('#fileNamee').text(row.fileName)
		$('#fileSizee').text(row.fileSize)
		$('#keyIdd').text(row.keyId)
		$('#tss').text(row.ts)
		$('#summaryy').text(row.summary)
		if(row.targetType==0){
            $('#tagetTypee').text('通用升级')
		    $('.tagetTypeeone').css('display','none')
		    $('.tagetTypeetwo').css('display','none')
		}else if(row.targetType==1){
            $('#tagetTypee').text('分组升级')
			$('.tagetTypeetwo').css('display','none')
			$('.tagetTypeeone').css('display','')
		}else if(row.targetType==2){
			$('#tagetTypee').text('指定设备升级')
			$('.tagetTypeeone').css('display','none')
			$('.tagetTypeetwo').css('display','')
		}
		setTimeout(function(){
           if(row.targetType==1){
				$('.tagetTypeeonedata').datagrid({
					url: server_context+'/listSpecifiedDeviceGroup',
					method: 'get',
					singleSelect: 'true',
					fit: 'true',
					fitColumns: 'true',
					rownumbers: 'true',
					pagination: "true",
					queryParams: {
						packageId:row.id
					},
					columns:[[
						{ field:"cb",checkbox:"true",align:"center"},
						{ field:"deviceGroupName",title:'设备组',align:"center",width:'100%'}
					]]
				})
			}else if(row.targetType==2){
				$('.tagetTypeetwodata').datagrid({
					url: server_context+'/listSpecifiedDevice',
					method: 'get',
					singleSelect: 'true',
					fit: 'true',
					fitColumns: 'true',
					rownumbers: 'true',
					pagination: "true",
					queryParams: {
						packageId:row.id
					},
					columns:[[
						{ field:"cb",checkbox:"true",align:"center",width:"20%"},
						{ field:"deviceId",title:'设备编号',align:"center",width:"20%"},
						{ field:"vin",title:'车架号',align:"center",width:"20%"},
						{ field:"iccid",title:'iccid',align:"center",width:"20%"},
						{ field:"hardVer",title:'硬件版本号',align:"center",width:"20%"},
						{ field:"model",title:'适用型号',align:"center"}
					]]
				})
			}
		},500)
	}
	//查询
	function upgradetopcx2(){
		$('.upgradebottomdata').datagrid('load',{
			model:$('#upgradetopcxs1').val(),
			softVer:$('#upgradetopcxs2').val(),
			hardVer:$('#upgradetopcxs3').val(),
			pacVer:$('#upgradetopcxs4').val()
		});
	}
	//上传升级包
	function uploadFile(){
		var xhr = new XMLHttpRequest();
		for(var i = 0;i<$('#uploadForm12 input').length;i++){
			if($('#uploadForm12 input').eq(i).val()==''){
				$.messager.alert("系统提示",'必填字段不能为空','warning');
				return;
			}
		}
		var updateType = $("#update_type").val();
		var row;
		if(updateType=='1'){
			row = $('.uploadFiledatagird1').datagrid('getChecked');
			if(row==''){
				$.messager.alert("系统提示",'请选择分组','warning')
				return;
			}
	    	var deviceGroupIds = dev.join(',');
			var deviceIds=''
		}
		if(updateType=='2'){
			row = $('.uploadFiledatagird2').datagrid('getChecked');
			if(row==''){
				$.messager.alert("系统提示",'请选择用户','warning')
				return;
			}
	    	var deviceIds = dev.join(',')
			var deviceGroupIds = ''
		}
		if(updateType=='0'){
           var deviceIds=''
		   var deviceGroupIds = ''
		}
		var fd = new FormData();
        //关联表单数据,可以是自定义参数
        fd.append("fileName", document.getElementById('file_namess').files[0]);
        fd.append("md5", document.getElementById('md5').value.toLowerCase());
        fd.append("hardVer", document.getElementById('hdversion').value);
        fd.append("softVer", document.getElementById('version').value);
        fd.append("model", document.getElementById('modelss').value);
        fd.append("summary", document.getElementById('summary').value);
        fd.append("targetType", updateType);
        fd.append("deviceIds", deviceIds);
		fd.append("deviceGroupIds", deviceGroupIds)
        //监听事件
        xhr.upload.addEventListener("progress", uploadProgress, false);
        xhr.addEventListener("load",uploadComplete,false);
        xhr.addEventListener("error", uploadFailed, false);
        xhr.addEventListener("abort", uploadCanceled, false);
        // //发送文件和表单自定义参数
        xhr.open("POST", server_context+"/saveUpdatePackage");
        xhr.send(fd);
	}
	 //上传进度
    function uploadProgress(evt) {
          if (evt.lengthComputable) {
			var percentComplete = Math.round(evt.loaded * 100 / evt.total);
			$('#progressNumber').progressbar('setValue',percentComplete);
          }else {
			
          }
    }
     //上传成功响应
    function uploadComplete(evt) {
        //服务断接收完文件返回的结果
        var message = evt.target.responseText;
		var dataObj=eval("("+message+")")
		if(dataObj.error_code==0){
            $.messager.alert("系统提示", "上传成功",'info');
			$('#upgradetopModal').modal('hide');
			$('.upgradebottomdata').datagrid('reload')
		}else{
			Statuscodeprompt(data.error_code,"上传失败...",'error')
		}
    }
    //上传失败
    function uploadFailed(evt) {
    	$.messager.alert("操作提示", "上传失败！","error");
    }
     //取消上传
    function uploadCanceled(evt){
        $.messager.confirm("操作提示", "是否取消上传？",'question', function (f) {  
            if (f) {
            	if(xhr!=null){
        			xhr.abort();
        	    	//操作提示
    				alert_totalQuery('页面跳转中,请稍后...','info',3);
    				//延时3秒跳转回车主用户
    				setTimeout(function() {
    					$('#upgradetopModal').modal('hide');
    				}, 2000);
            	}
            }
        });
    }
    // 校验上传文件是否存在
    function checkFile(){
		$.ajax({
			url:server_context+'/checkPackageName',
			type:'get',
			data:{'fileName':$("#file_namess").val()},
			success:function(data){
				if (data.error_code==10008){
					$("#file_namess").val("");
					$.messager.alert("操作提示", "该文件已经存在","error");
				} 
			}
		});	
    }
	//点击上传按钮
	function upgradetopModal(){
		$('#upgradetopModal').modal('show');
		$('#uploadForm').form("reset");
		$('#progressNumber').progressbar('setValue',0);
		dev=[];
		updatetype()
	}
	//升级类型onchange事件
	function updatetype(){
		if($("#update_type").val()==0){
			$('#uploadForm>div').css('display','none')
		}
		dev=[];
		/*1:分组升级,2:指定升级*/
		if($("#update_type").val()==1){
			$('#uploadForm>div').css('display','none')
			$('.uploadFiledatagirdone').css('display','')
			$('.uploadFiledatagird1').datagrid({
				url: server_context+'/listDeviceGroups',
				method: 'get',
				singSelect: 'false',
				fit: 'true',
				fitColumns: 'true',
				rownumbers: 'true',
				pageSize:50,
				pagination: "true",
				columns:[[
				    { field:"cb",checkbox:"true",align:"center"},
					{ field:"deviceGroupName",title:'设备组',align:"center"}
				]],
                onCheck:function(i,data){
					dev.push(data.id)
					for(var i = 0; i < dev.length; i++){
						for(var j=i+1;j<dev.length;j++){
							if(dev[i]===dev[j]){
								dev.splice(j,1);
								j--;
							}
						}
					}
				},
				onUncheck:function(i,data){
					for(var s=0;s<dev.length;s++){
						if(data.id==dev[s]){
							dev.splice(s,1)
						}
					}
				},
				onCheckAll:function(i,data){
					dev.splice(0,dev.length);
					for(var s = 0;s<i.length;s++){
						dev.push(data[s].id)
					}
				},
				onUncheckAll:function(i,data){
					dev.splice(0,dev.length);
				}
			})
		}
		if($("#update_type").val()==2){
			$('#uploadForm>div').css('display','none')
			$('.uploadFiledatagirdtwo').css('display','')
			$('.uploadFiledatagird2').datagrid({
				url: server_context+'/listDevice',
				method: 'post',
				singSelect: 'false',
				fit: 'true',
				fitColumns: 'true',
				rownumbers: 'true',
				pageSize:50,
				pagination: "true",
				columns:[[
				    { field:"cb",checkbox:"true",align:"center",width:"20%"},
				    { field:"deviceId",title:'设备编号',align:"center",width:"20%"},
				    { field:"vin",title:'车架号',align:"center",width:"20%"},
				    { field:"iccid",title:'iccid',align:"center",width:"20%"},
					{ field:"hardVer",title:'硬件版本号',align:"center",width:"20%"},
					{ field:"model",title:'适用型号',align:"center"}
				]],
				onCheck:function(i,data){
					dev.push(data.id)
					for(var i = 0; i < dev.length; i++){
						for(var j=i+1;j<dev.length;j++){
							if(dev[i]===dev[j]){
								dev.splice(j,1);
								j--;
							}
						}
					}
				},
				onUncheck:function(i,data){
					for(var s=0;s<dev.length;s++){
						if(data.id==dev[s]){
							dev.splice(s,1)
						}
					}
				},
				onCheckAll:function(i,data){
					dev.splice(0,dev.length);
					for(var s = 0;s<i.length;s++){
						dev.push(data[s].id)
					}
				},
				onUncheckAll:function(i,data){
					dev.splice(0,dev.length);
				}
			})
		}
	}
	function uploadFilecx1(){
		$('.uploadFiledatagird1').datagrid('load',{
			deviceGroupName:$('#filedevicegroup').val()
		});
	}
	function uploadFilecx2(){
		$('.uploadFiledatagird2').datagrid('load',{
			deviceId:$('#filededeviceone').val(),
			hardwareVer:$('#filededevicetwo').val(),
			model:$('#filededevicethr').val()
		});
	}
/*分组升级*/
	var removeList = [];// 设备组移除的设备
	var addList = [];// 设备组添加的设备
	var upgradepatchId;//升级包ID
    function UpgradeGroup(r){
		upgradepatchId = r;
    	$('#UpgradeGroupModal').modal('show')
    	unupgradeGroup();
    	upgradeGroup(upgradepatchId);
    	// 指定设备移除的设备
		removeList = [];
		// 指定设备添加的设备
		addList = [];
    }
    //未指定设备组
	function unupgradeGroup(){
		$('#unupgradeGroupDg').datagrid({
	        url: server_context+'/listDeviceGroups',
			method: 'get',
	        pagination: true,
	        fit:true,
		    fitColumns:true,
		    autoRowHeight:true,
		    rownumbers:true,
		    scrollbarSize:0,
	        pageSize: 50,
	        remoteSort:false,
	        queryParams: {
	        	deviceGroupName: $('#UpgradeGroupthrinput').val()
			},
			columns: [[
		       			{ field: 'id', title: 'id', align: 'center',checkbox:true},
		       			{ field: 'deviceGroupName', title: '设备组', align: 'center',sortable:true,formatter: function (value) {return dataProcessing(value);}},
		       		]]
	    });
	}
	//未指定设备查询
	function UpgradeGroupthrcxx(){
		$('#unupgradeGroupDg').datagrid('load',{deviceGroupName: $('#UpgradeGroupthrinput').val()})
	}
	//已指定设备组
	function upgradeGroup(id){
		$('#upgradeGroupDg').datagrid({
	        url: server_context+'/listSpecifiedDeviceGroup',
			method: 'get',
	        pagination: true,
	        fit:true,
		    fitColumns:true,
		    autoRowHeight:true,
		    rownumbers:true,
		    //singleSelect:true,
		    scrollbarSize:0,
	        pageSize: 50,
	        remoteSort:false,
	        queryParams: {
      	      packageId:id,
	          deviceGroupName: $('#UpgradeGrouponeinput').val()
		    },
			columns: [[
				{ field: 'id', title: 'id', align: 'center',checkbox:true},
				{ field: 'deviceGroupName', title: '设备组', align: 'center',sortable:true,formatter: function (value) {return dataProcessing(value);}}
		    ]]
	    });
	}
	//已指定设备查询
	function UpgradeGrouponecxx(){
		$('#upgradeGroupDg').datagrid('load',{
			packageId:upgradepatchId,
			deviceGroupName: $('#UpgradeGrouponeinput').val()
		})
	}
	// 导出多个设备
	function exportMore(){
		var selRows = $('#upgradeGroupDg').datagrid('getChecked');
		//添加行
		addrows("unupgradeGroupDg",selRows);
		//删除行
		delrows("upgradeGroupDg",selRows);
		var deviceIds = "";
		$.each(selRows, function(index, item){
			// 判断是否是最后一条数据
			if (index == selRows.length-1){
				deviceIds += item.id;
			}else{
				deviceIds += item.id+",";
			}
		});
		//移除设备记录
		removeOperate(deviceIds);
	}
	// 添加表格数据
	function addrows(addTableId,selRows){
		var rows =$('#'+addTableId+'').datagrid("getRows");
		$.each(selRows, function(index, item){
			var state=0;
			if(rows!=''){
				for(var i=0;i<rows.length;i++){
					if(rows[i].id==item.id){
						state=1;
					}	
				}
			}
			if(state==0){
				// 表格添加设备
				$('#'+addTableId+'').datagrid('appendRow',{
			    	id: item.id,
			    	deviceGroupName: item.deviceGroupName,
			    });
			}
		});
	}
	// 移除表格数据
	function delrows(tableId,selRows){
		$.each(selRows, function(index, item){
			// 表格移除设备设备
			// 获取所选行的索引
			var rowIndex=$('#'+tableId+'').datagrid('getRowIndex',item);
			$('#'+tableId+'').datagrid('deleteRow',rowIndex);
		});
	}
	// 移除设备操作
	function removeOperate(removeId){
		var removeArr = removeId.split(",");
		// 判断添加的设备是否存在
		if (addList.length==0){
			removeList = removeList.concat(removeArr);
		} else {
			// 添加设备存在，查看移除的设备是否在添加设备中存在，存在就删除
			for (var i=0;i< removeArr.length;i++){
				//addList.splice(jQuery.inArray(removeArr[i],addList),1);
				var bool=true;
				for (var j=0;j< addList.length;j++){
					if(removeArr[i] == addList[j]){
						addList.splice(jQuery.inArray(removeArr[i],addList),1);
						bool=false;
						break;
					}
				}
				if (bool){
					removeList.push(removeArr[i]);
				}
			}
		}
	}
    // 导入多个设备
	function importMore(){
		var selRows = $('#unupgradeGroupDg').datagrid('getChecked');
		addrows("upgradeGroupDg",selRows);
		delrows("unupgradeGroupDg",selRows);  
		
		var deviceIds = "";
		$.each(selRows, function(index, item){
			// 判断是否是最后一条数据
			if (index == selRows.length-1){
				deviceIds += item.id;
			}else{
				deviceIds += item.id+",";
			}
		});
		//移除设备记录
		addOperate(deviceIds);
	}
	// 添加操作
	function addOperate(addId){
		var addArr = addId.split(",");
		// 判断是否有移除的数据
		if (removeList.length==0){
			addList = addList.concat(addArr);
		}else {
			// 移除存在 查看移除设备是否在添加设备中存在，存在就删除
			for(var i=0;i< addArr.length;i++){
				//removeList.splice(jQuery.inArray(addArr[i],removeList),1);
				var bool = true;
				for (var j=0;j< removeList.length;j++){
					if(removeList[j] == addArr[i]){
						removeList.splice(jQuery.inArray(addArr[i],removeList),1);
						bool=false;
						break;
					}
				}
				if (bool){
					addList.push(addArr[i]);
				}
			} 
		}	
	}
    // 保存设置指定设备组
	function saveUpgradeGroupDg(){
		if(removeList.length==0&&addList.length==0){
			$.messager.alert("操作提示", "请先选择需要添加或移除的指定设备组！","error"); 
			return;
		}
		for(var i=0;i<addList.length;i++){
          for(var j=i+1;j<addList.length;j++){
              if(addList[i]==addList[j]){
                  addList.splice(j,1);
				  j--;
			  }
		  }
		}
		for(var i=0;i<removeList.length;i++){
          for(var j=i+1;j<removeList.length;j++){
              if(removeList[i]==removeList[j]){
                  removeList.splice(j,1);
				  j--;
			  }
		  }
		}
		$.ajax({
			type: 'POST',
			data:"addGroupIds="+addList.toString()+"&removeGroupIds="+removeList.toString()+"&id="+upgradepatchId,
			dataType: "json",
			url:server_context+'/reassignDeviceGroup',
			success: function(data){
				if(data.error_code==0){
					$.messager.alert("操作提示", "操作成功！","info"); 
					//已指定设备组
					upgradeGroup(upgradepatchId);
					//未指定设备组
					unupgradeGroup();
					// 指定设备移除的设备
					removeList = [];
					// 指定设备添加的设备
					addList = [];
					
				}else{
					Statuscodeprompt(data.error_code,"操作失败！...",'error')
				}
         }
     });
	}
    //取消设置指定设备
	function cancelupgradeGroupDg(){
		unupgradeGroup(row)
		upgradeGroup(row)
		// 指定设备移除的设备
		removeList = [];
		// 指定设备添加的设备
		addList = [];
	}
    //空数据处理
	function dataProcessing(value){
		if(value ==null || value =="" || value =="undefined"){
			   return "--"
		}
		return value;
	}

/****指定升级****/
	function UpgradeDevice(r){
		upgradepatchId = r
		$('#assignModal').modal('show');
		//指定升级设备
		upgradeDevice(upgradepatchId);
		//未指定升级设备
		unupgradeDevice();
		// 指定设备移除的设备
		removeList = [];
		// 指定设备添加的设备
		addList = [];
	}
	//左侧表数据
	function upgradeDevice(id){
		$('#upgradeDeviceDg').datagrid({
	        url:server_context+'/listSpecifiedDevice',
			method: 'get',
	        pagination: true,
	        fit:true,
		    fitColumns:true,
		    autoRowHeight:true,
		    rownumbers:true,
		    scrollbarSize:0,
	        pageSize: 50,
	        remoteSort:false,
	        queryParams: {
	        	packageId:id,
				deviceId:$('#UpgradeGroupone-inputone').val(),
				vin:$('#UpgradeGroupone-inputtwo').val(),
			},
			columns: [[
					{ field: 'id', title: 'id', align: 'center',checkbox:true,},
					{ field: 'deviceId', title: '设备编号', align: 'center',sortable:true,width:'18%'},
					{ field: 'model', title: '制造商', align: 'center',width:'18%',sortable:true,formatter: function (value) {return dataProcessing(value);}},
				    { field: 'vin', title: '车架号', align: 'center',width:'18%', formatter: function (value) {return dataProcessing(value);}},
					{ field: 'hardVer', title: '硬件版本号', align: 'center',width:'18%',formatter: function (value) {return dataProcessing(value);}},
					{ field: 'model', title: '适用类型', align: 'center',sortable:true,width:'18%',formatter: function (value) {return dataProcessing(value);}},      		
		       	]]
	    });
	}
	//左侧表查询
	function searchUpgradeDevice(){
	   $('#upgradeDeviceDg').datagrid('load',{
		   packageId:upgradepatchId,
		   deviceId:$('#UpgradeGroupone-inputone').val(),
		   vin:$('#UpgradeGroupone-inputtwo').val()
		})
	}
    //右侧表数据
    function unupgradeDevice(){
		$('#unupgradeDeviceDg').datagrid({
	        url:server_context+'/listDevice',
			method: 'get',
	        pagination: true,
	        fit:true,
		    fitColumns:true,
		    autoRowHeight:true,
		    rownumbers:true,
		    scrollbarSize:0,
	        pageSize: 50,
	        remoteSort:false,
	        queryParams: {
				deviceId:$('#UpgradeGroupone-inputthree').val(),
				vin:$('#UpgradeGroupone-inputfour').val(),
			},
			 columns: [[
					{ field: 'id', title: 'id', align: 'center',checkbox:true,},
					{ field: 'deviceId', title: '设备编号', align: 'center',width:'18%',sortable:true,},
					{ field: 'model', title: '制造商', align: 'center',width:'18%',sortable:true,formatter: function (value) {return dataProcessing(value);}},
				    { field: 'vin', title: '车架号', align: 'center',width:'18%',formatter: function (value) {return dataProcessing(value);}},
					{ field: 'hardVer', title: '硬件版本号', align: 'center',width:'18%',formatter: function (value) {return dataProcessing(value);}},
					{ field: 'model', title: '适用类型', align: 'center',sortable:true,width:'18%',formatter: function (value) {return dataProcessing(value);}},      		
		       	]]
	    });
	}
	//右侧表数据查询
	function searchUnupgradeDevice(){
	   $('#unupgradeDeviceDg').datagrid('load',{
			deviceId:$('#UpgradeGroupone-inputthree').val(),
			vin:$('#UpgradeGroupone-inputfour').val()						
		})
	}
    // 导出多个设备
	function exportMor(){
		var selRows = $('#upgradeDeviceDg').datagrid('getChecked');
		//添加行
		addrow("unupgradeDeviceDg",selRows);
		//删除行
		delrow("upgradeDeviceDg",selRows);
		var deviceIds = "";
		$.each(selRows, function(index, item){
			// 判断是否是最后一条数据
			if (index == selRows.length-1){
				deviceIds += item.id;
			}else{
				deviceIds += item.id+",";
			}
		});		
		//移除设备记录
		removeOperat(deviceIds);
	}
	// 导入多个设备
	function importMor(){
		var selRows = $('#unupgradeDeviceDg').datagrid('getChecked');
		addrow("upgradeDeviceDg",selRows);
		delrow("unupgradeDeviceDg",selRows);  
		var deviceIds = "";
		$.each(selRows, function(index, item){
			// 判断是否是最后一条数据
			if (index == selRows.length-1){
				deviceIds += item.id;
			}else{
				deviceIds += item.id+",";
			}
		});
		//移除设备记录
		addOperat(deviceIds);
	}
    // 添加表格数据
	function addrow(addTableId,selRows){
		var rows =$('#'+addTableId+'').datagrid("getRows");
		$.each(selRows, function(index, item){
			var state=0;
			if(rows!=''){
				for(var i=0;i<rows.length;i++){
					if(rows[i].id==item.id){
						state=1;
					}	
				}
			}
			if(state==0){
				// 表格添加设备
				$('#'+addTableId+'').datagrid('appendRow',{
			    	id: item.id,
			    	deviceId: item.deviceId,
			    	// model: item.model,
			    	vin: item.vin,
			    	hardVer: item.hardVer,
			    	model: item.model,
			    });
			}
		});
	}
	// 移除表格数据
	function delrow(tableId,selRows){
		$.each(selRows, function(index, item){
			// 表格移除设备设备
			// 获取所选行的索引
			var rowIndex=$('#'+tableId+'').datagrid('getRowIndex',item);
			$('#'+tableId+'').datagrid('deleteRow',rowIndex);	
		});
	}
    // 移除设备操作
	function removeOperat(removeId){
		var removeArr = removeId.split(",");
		// 判断添加的设备是否存在
		if (addList.length==0){
			removeList = removeList.concat(removeArr);
		} else {
			// 添加设备存在，查看移除的设备是否在添加设备中存在，存在就删除
			for (var i=0;i< removeArr.length;i++){
				//addList.splice(jQuery.inArray(removeArr[i],addList),1);
				var bool=true;
				for (var j=0;j< addList.length;j++){
					if(removeArr[i] == addList[j]){
						addList.splice(jQuery.inArray(removeArr[i],addList),1);
						bool=false;
						break;
					}
				}
				if (bool){
					removeList.push(removeArr[i]);
				}
			}
		}
	}
    // 添加操作
	function addOperat(addId){
		var addArr = addId.split(",");
		// 判断是否有移除的数据
		if (removeList.length==0){
			addList = addList.concat(addArr);
		}else {
			// 移除存在 查看移除设备是否在添加设备中存在，存在就删除
			for(var i=0;i< addArr.length;i++){
				var bool = true;
				for (var j=0;j< removeList.length;j++){
					if(removeList[j] == addArr[i]){
						removeList.splice(jQuery.inArray(addArr[i],removeList),1);
						bool=false;
						break;
					}
				}
				if (bool){
					addList.push(addArr[i]);
				}
			} 
		}	
	}	
    // 保存设置指定设备
	function saveUpgradeDeviceDg(){
		if(removeList.length==0&&addList.length==0){
			$.messager.alert("操作提示", "请先选择需要添加或移除的指定设备！","error"); 
			return;
		}
		for(var i=0;i<addList.length;i++){
          for(var j=i+1;j<addList.length;j++){
              if(addList[i]==addList[j]){
                  addList.splice(j,1);
				  j--;
			  }
		  }
		}
		for(var i=0;i<removeList.length;i++){
          for(var j=i+1;j<removeList.length;j++){
              if(removeList[i]==removeList[j]){
                  removeList.splice(j,1);
				  j--;
			  }
		  }
		}
		console.log(addList.toString())
		console.log(removeList.toString())
		$.ajax({  
         type: 'POST',
         data:"addDeviceIds="+addList.toString()+"&removeDeviceIds="+removeList.toString()+"&id="+upgradepatchId,
         dataType: "json",
         url:server_context+'/reassignDevice',
         success: function(data){
         	if(data.error_code==0){
         		$.messager.alert("操作提示", "操作成功！","info"); 
         		
         		//指定升级设备
         		upgradeDevice(upgradepatchId);
         		
         		//未指定升级设备
         		unupgradeDevice();
         		
         		// 指定设备移除的设备
         		removeList = [];
         		// 指定设备添加的设备
         		addList = [];
         		
         	}else{
				 Statuscodeprompt(data.error_code,"操作失败！...",'error')
         	}
         }
     });
	}
    //取消设置指定设备
	function cancelUpgradeDeviceDg(){
		upgradeDevice()
		unupgradeDevice()
		// 指定设备移除的设备
		removeList = [];
		// 指定设备添加的设备
		addList = [];
	}
