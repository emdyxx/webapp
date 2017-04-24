/***********4.1设备管理---车载设备****************/
var Dateupo;  //刷新下侧表的秒数
var seti;   //页面定时刷新的函数
var shebione='';  //设备唤醒权限
var shebitwo='';  //设备重启权限
var shebithree='';  //远程操作权限
var shebifour='';  //查看详情权限	
var is = []; //获取页面数据选中的状态id
var dgsize = 50; //刷新页面的条数
$('.MobileUnit').css('display', 'none')
$('#managementli9').click(function () {							
    Dateupo = $('#未指定设备组').val();
    $('main>div').css('display', 'none');
    $('.MobileUnit').css('display', '')
    $('.MobileSeek input').val('')
    //车载设备
    MobDatagrid();
    //每隔一段时间刷新下侧表
	MobileSele();
    //权限判断
	var data={
		id:$('#managementli9').attr('name')
	}
	$.post(server_context+'/setMenuId',data,function(data){
        if(data.error_code!=0){
            Statuscodeprompt(data.error_code)
        }
		for(var i=0;i<data.data.length;i++){
			if(data.data[i]==41){
				$('.Mobileyh-one').css('display','')
			}
			if(data.data[i]==42){
				$('.Mobileyh-two').css('display','')
			}
			if(data.data[i]==45){
				$('.Mobileyh-three').css('display','')
			}
			if(data.data[i]==44){
				$('.Mobileyh-four').css('display','')
			}
            if(data.data[i]==49){
               $('.Mobileyh-six').css('display','')
            }
            if(data.data[i]==50){
               $('.Mobileyh-five').css('display','')
            }
            if(data.data[i]==51){
               $('.Mobileyh-seven').css('display','')
            }
			if(data.data[i]==46){
				shebione=46;
			}
			if(data.data[i]==47){
				shebitwo=47;
			}
			if(data.data[i]==48){
				shebithree=48;
			}
			if(data.data[i]==43){
				shebifour=43
			}
		}
	})
	//搜素条件
	$('.MobileSeekfz').combotree({
        url: server_context+'/listGroupTree',
        method: 'post',
        required: true,
        editable:false,
        loadFilter: function (data) {
			var data =data.data
            return convert(data);
        }
    })
    $('.MobileSeeksjfz').combotree({
        url: server_context+'/listDeviceGroupTree',
        method: 'post',
        required: true,
        editable:false,
        loadFilter: function (data) {
			var rows =data.data
            return convsssss(rows);
        }
    })
})
//车载设备刷新
function MobileSele() {
    Dateupo=0
    clearInterval(seti);	
	Dateupo=$('#MobileSelect').val()
    var str = Dateupo/1000
	seti = setInterval('MobDatagrid()', Dateupo);
}
function MobileSelect() {
    Dateupo=0
    clearInterval(seti);	
	Dateupo=$('#MobileSelect').val()
    var str = Dateupo/1000
    $.messager.alert('系统提示','当前定时刷新为'+str+'秒','info')
	seti = setInterval('MobDatagrid()', Dateupo);
}
//车载设备下侧表加载
function MobDatagrid() {
    $('.MobileData').datagrid({
        url: server_context+'/listDevice',
        method: 'get',
        singSelect: 'false',
        fitColumns: 'true',
        fit: 'true',
        rownumbers: 'true',
        pagination: "true",
		pageSize:dgsize,
        onBeforeLoad:function(param){
			   dgsize=param.rows
		},
        queryParams: {
        	vin: $('.MobileID').val(),
            deviceId: $('.Mobilename').val(),
            iccid: $('.MobileICCID').val(),
            ecuSerialNum: $('.MobileSeekID').val(),
    	    userGroupId:$('.MobileSeekfz').val(),
    	    deviceGroupId:$('.MobileSeeksjfz').val()
    	},
        columns: [[
            { field: "cb", checkbox: "true", align: "center" },
            { field: "deviceId", title: '设备编号', align: "center", width: '8%',
                formatter: function (value, row, index) {
                   return row.deviceId.toUpperCase();
                }
            },
            { field: "ecuSerialNum", title: '电控单元序列号', align: "center", width: '15%' },
            { field: "vin", title: '车架号', align: "center", width: '12%' },
            { field: "iccid", title: 'ICCID', align: "center", width: '12%' },
            { field: "groupName", title: '归属分组', align: "center", width: '8%'},
            { field: "onlineTime", title: '最后上线时间', align: "center", width: '11%' },
            { field: "remoteAddr", title: '远端地址', align: "center", width: '11%' },
            { field: "online", title: '更多操作', align: "center", width: '22%',
                formatter: function (value, row, index) {
                    var value = row['online'];
                    var str = '';
                    if (value == false) {
                        str += '<a href=\javaScript:awaken(' + index + ') style="background:#00AAFF;color:white;display:inline-block;width:19%;margin-left:5%;height:18px">' + "设备唤醒" + '</a>';
                    } else {
                        str += '<a style="background:#989898;color:white;display:inline-block;width:19%;margin-left:5%;height:18px">' + "已唤醒" + '</a>';
                    }
                    if (value == false) {
                        str += '<a style="background:#989898;color:white;display:inline-block;width:19%;margin-left:5%;height:18px">' + "设备重启" + '</a>';
                    } else {
                        str += '<a href=\javaScript:restart(' + index + ') style="background:#00AAFF;color:white;display:inline-block;width:19%;margin-left:5%;height:18px">' + "设备重启" + '</a>';
                    }
                    str += '<a href=\javaScript:longdistance(' + index + ') style="background:#00AAFF;color:white;display:inline-block;width:19%;margin-left:5%;height:18px">' + "远程操作" + '</a>';
                    str += '<a href=\javaScript:particulars(' + index + ') style="background:#00AAFF;color:white;display:inline-block;width:19%;margin-left:5%;height:18px">' + "查看详情" + '</a>';
                    return str;
                }
            }
        ]],
        onCheck:function(i){
	            is.push(i)
	            for(var i = 0; i < is.length; i++){
	             	for(var j=i+1;j<is.length;j++){
	             		if(is[i]===is[j]){
	             			is.splice(j,1);
	             			j--;
	             		}
	             	}
	            }
			},
			onUncheck:function(i){
	            for(var s=0;s<is.length;s++){
	            	if(i==is[s]){
	            		is.splice(s,1)
	            	}
	            }
			},
			onCheckAll:function(i){
				is.splice(0,is.length);
                for(var s = 0;s<i.length;s++){
                	is.push(s)
                }
			},
			onUncheckAll:function(i){
				is.splice(0,is.length);
			},
			onLoadSuccess:function(data){
                for(var i=0;i<is.length;i++){
                	for(var j=0;j<data.rows.length;j++){
                		if(data.rows[i].id){
                			$(".MobileData").datagrid('selectRow',is[i]);
                		}
                	}
                }
			}
    })
}

//车载设备查询
function Mobileinput() {
    var data = {
        vin: $('.MobileID').val(),
        deviceId: $('.Mobilename').val(),
        iccid: $('.MobileICCID').val(),
        ecuSerialNum: $('.MobileSeekID').val(),
	    userGroupId:$('.MobileSeekfz').val(),
        deviceGroupId:$('.MobileSeeksjfz').val()
    }
	$('.MobileData').datagrid('load',data)
}

//添加设备
function Mobileyhone() {
    $('#MobileyhoneModal').modal('show')
    $('.Mobileyhone').attr('name', '添加')
    $('.MobileyhtwoModaltitle').text('添加设备')
	$('#deviceIds').removeAttr('disabled','disabled')
    $('#models').attr('disabled','disabled')
    $('.Mobileyhoneform>input').val('')
    // $('#makers').combotree({
    //     url:server_context+'/listVehicleModelTree',
	// 	method:'post',
	// 	required:true,
	// 	loadFilter: function(rows) {
	// 		return rows.data;
	// 	}
    // })
}
document.getElementById('deviceIds').oninput=function(){
    this.value = this.value.toUpperCase();
    if($('#deviceIds').val().length<=4){
       $('#models').val($('#deviceIds').val())
    }
}
//添加/编辑设备提交按钮
$('.Mobileyhone').click(function () {
    var row = $('.MobileData').datagrid('getSelected')
    if($('#deviceIds').val()==''||$('#hardwareVers').val()==''){
       $.messager.alert('系统提示','必填字段不能为空','error');
       return;
    }
    if ($('.Mobileyhone').attr('name') == '添加') {
        var data = {
            deviceId: $('#deviceIds').val(),
            hardVer: $('#hardwareVers').val(),
            vin: $('#vins').val(),
            modelAlias: $('#models').val(),
            softVer: $('#softVers').val(),
            serialNum: $('#serialNums').val(),
            msisdn: $('#call_nums').val(),
            ecuSerialNum: $('#ecuSerialNums').val()
        }
        if(data.deviceId==data.modelAlias){
            $.messager.alert('系统提示','设备编号和车系代码不能重复','error')
            return;
        }
        $.ajax({
            type: "post",
            url: server_context+"/saveDevice",
            async: true,
            data: data,
            success: function (data) {
                if (data.error_code == 0) {
                    $.messager.alert('系统提示', '设备添加成功','info');
                    $('.MobileData').datagrid('reload');
                    $('#MobileyhoneModal').modal('hide');
                }else {
                    Statuscodeprompt(data.error_code,"设备添加失败...",'error')
                }
            }
        });
    } else if ($('.Mobileyhone').attr('name') == '修改') {
        var row = $(".MobileData").datagrid('getSelected');
        var data = {
            id:row.id
        };
        if($('#hardwareVers').val()!=row.hardVer){
             data.hardVer=$('#hardwareVers').val()
        }
        if($('#vins').val()!=row.vin){
             data.vin=$('#vins').val()
        }
        if($('#softVers').val()!=row.softVer){
             data.softVer=$('#softVers').val()
        }
        if($('#serialNums').val()!=row.serialNum){
             data.serialNum=$('#serialNums').val()
        }
        if($('#call_nums').val()!=row.msisdn){
             data.msisdn=$('#call_nums').val()
        }
        if($('#ecuSerialNums').val()!=row.ecuSerialNum){
             data.ecuSerialNum=$('#ecuSerialNums').val()
        }
        console.log(data)
        if(data.hardVer==row.hardVer && data.vin==row.vin && data.softVer==row.softVer 
        && data.serialNum==row.serialNum && data.msisdn==row.msisdn && data.ecuSerialNum==row.ecuSerialNum){
           $.messager.alert('系统提示','您所修改的数据和历史数据重复','error');
           return;
        }
        $.ajax({
            type: "post",
            url: server_context+"/updateDevice",
            async: true,
            data: data,
            success: function (data) {
                if (data.error_code == 0) {
                    $.messager.alert('系统提示', '设备修改成功','info');
                    $('.MobileData').datagrid('reload');
                    $('#MobileyhoneModal').modal('hide');
                }else {
                    Statuscodeprompt(data.error_code,"设备修改失败...",'error')
                }
            }
        });
    }
})
//编辑设备
function compilefacility() {
    var row = $(".MobileData").datagrid('getSelected');
    var rows = $('.MobileData').datagrid('getChecked');
    if (row == null) {
        $.messager.alert("系统提示", "请选择要编辑的数据！",'warning');
        return;
    }
    if (rows.length >= 2) {
        $.messager.alert("系统提示", "请选择一条数据进行编辑！",'warning');
        return;
    }
    $('#MobileyhoneModal').modal('show');
    $('.MobileyhtwoModaltitle').text('编辑设备')
    $('.Mobileyhone').attr('name', '修改')
	$('#deviceIds').attr('disabled','disabled')
    $('#models').attr('disabled','disabled')
    compilefacili(row);
}
function compilefacili(row) {
        $('#deviceIds').val(row.deviceId.toUpperCase()),
        $('#hardwareVers').val(row.hardVer),
        $('#vins').val(row.vin),
        $('#models').val(row.modelAlias),
        $('#softVers').val(row.softVer),
        $('#serialNums').val(row.serialNum),
        $('#call_nums').val(row.msisdn),
        $('#ecuSerialNums').val(row.ecuSerialNum)
}
//归属分组
var grounpId;//选择归属分组以及升级分组时tree树的真实id
var grounp;//添加分组的父级id
var grounpss;//添加分组的id
function groupOwnershipgroup() {
    var row = $('.MobileData').datagrid('getChecked');
    if (row.length == 0) {
        $.messager.alert('系统提示', '请选择设备进行归属分组操作','warning');
        return;
    }
    $('#MobileyhtwoModal').modal('show');
    $('.Mobileyhtwoformtree').tree({
        url: server_context+'/listGroupTree',
        method: 'post',
        animate: 'true',
        loadFilter: function (data) {
			var data = data.data;
            return convert(data);
        },
        onSelect: function (node) {
            grounpId = node.id
        }
    })
}
//归属分组提交按钮
$('.Mobileyhtwo').click(function () {
    if (grounpId == ''||grounpId=='undefined'||grounpId==null) {
        $.messager.alert('系统提示', '请选择用户组','warning');
        return;
    }
    var row = $('.MobileData').datagrid('getChecked');
    var arr = [];
    for (var i = 0; i < row.length; i++) {
        arr.push(row[i].id)
    }
    var deviceIds = arr.join(',')
    $.ajax({
        type: "post",
        url: server_context+"/changeUserGroup",
        async: true,
        data: {
            ids: deviceIds,
            groupId: grounpId
        },
        success: function (data) {
            if (data.error_code == 0) {
                $.messager.alert('系统提示', '归属分组操作成功','info');
                $('#MobileyhtwoModal').modal('hide');
				$('.MobileData').datagrid('reload')
            } else {
                Statuscodeprompt(data.error_code,"归属分组操作失败...",'error')
            }
        }
    });
})
//升级分组
function UpgradeGroupss() {
    var row = $('.MobileData').datagrid('getChecked');
    if (row.length == 0) {
        $.messager.alert('系统提示', '请选择设备进行升级分组操作','warning');
        return;
    }
    console.log(row)
    for(var i=0;i<row.length;i++){
        if(row[i].topGroupId==0){
            $.messager.alert('系统提示','所选设备不在同一归属分组,请先进行归属分组操作','error');
            return false;
        }
        if(row[0].topGroupId==row[i].topGroupId){
            
        }else{
            $.messager.alert('系统提示','所选设备不在同一车厂，无法进行升级分组，请确认选择设备','error');
            return false;
        }
    }
    $('#MobileyhthreeModal').modal('show')
    $('.Mobileyhthreformdiv-divtwo').css('display','none')
    $('.Mobileyhthreeformtree').tree({
        url: server_context+'/listDeviceGroupTree2',
        method: 'post',
        animate: 'true',
        queryParams:{
            topGroupId:row[0].topGroupId
        },
        loadFilter: function (data) {
			var rows = data.data
            return convsssss(rows);
        },
        onSelect: function (node) {
            grounpId = node.id
            grounpss = node.actualId
            grounp = $('.Mobileyhthreeformtree').tree('getParent', node.target);
        }
    })
}
function convsssss(rows) {
	function exists(rows, parentId) {
		for(var i = 0; i < rows.length; i++) {
			if(rows[i].id == parentId) return true;
		}
		return false;
	}
	var nodes = [];
	for(var i = 0; i < rows.length; i++) {
		var row = rows[i];
        if(row.parendId==0){
           if(!exists(rows, row.parentId)) {
                nodes.push({
                    id: row.actualId,
                    text: row.name,
                    actualId:row.id,
                    parendId:row.parendId,
                    parentId:row.parentId,
                    iconCls:'icon-bianzutubiao'
                });
            }
        }else{
            if(!exists(rows, row.parentId)) {
                nodes.push({
                    id: row.actualId,
                    text: row.name,
                    actualId:row.id,
                    parendId:row.parendId,
                    parentId:row.parentId,
                    iconCls:'icon-shebeizutubiao'
                });
            }
        }
		
	}
	var toDo = [];
	for(var i = 0; i < nodes.length; i++) {
		toDo.push(nodes[i]);
	}
	while(toDo.length) {
		var node = toDo.shift();
		for(var i = 0; i < rows.length; i++) {
			var row = rows[i];

			if(row.parentId == node.id) {
                if(row.parendId==0){
                   var child = {
                        id: row.actualId,
                        text: row.name,
                        actualId:row.id,
                        parendId:row.parendId,
                        parentId:row.parentId,
                        iconCls:'icon-bianzutubiao'
                    };
                }else{
                   var child = {
                        id: row.actualId,
                        text: row.name,
                        actualId:row.id,
                        parendId:row.parendId,
                        parentId:row.parentId,
                        iconCls:'icon-shebeizutubiao'
                    };
                }
				
				if(node.children) {
					node.children.push(child);
				} else {
					node.children = [child];
				}
				toDo.push(child);
			}
		}
	}
	return nodes;
}
//升级分组提交按钮
$('.Mobileyhthree').click(function () {
    if (grounpId == ''||grounpId=='undefined'||grounpId==null) {
        $.messager.alert('系统提示', '请选择设备组','warning');
        return;
    }
    if(grounpss==1){
        $.messager.alert('系统提示', '请选择设备组','warning');
        return;
    }
    var row = $('.MobileData').datagrid('getChecked');
    console.log(row)
    var arr = [];
    for (var i = 0; i < row.length; i++) {
        arr.push(row[i].id)
    }
    var deviceIds = arr.join(',')
    var data = { deviceIds: deviceIds, groupId: grounpId }
    console.log(data)
    $.ajax({
        type: "post",
        url: server_context+"/changeDeviceGroup",
        async: true,
        data: {
            ids: deviceIds,
            deviceGroupId: grounpId
        },
        success: function (data) {
            if (data.error_code == 0) {
                $.messager.alert('系统提示', '升级分组操作成功','info');
                $('#MobileyhtwoModal').modal('hide');
            } else {
                Statuscodeprompt(data.error_code,"升级分组操作失败...",'error')
            }
        }
    });
})
//添加分组
function Mobileyhthreeadd() {
    if (grounpId == '') {
        $.messager.alert('系统提示', '请选择一个车场','warning');
        return;
    }
    $('.Mobileyhthreformdiv-divtwo').css('display', '');
}
//添加分组提交按钮
$('#Mobileyhthreformdiv-btone').click(function () {
    if ($('#Mobileyhthreformdiv-input').val() == '') {
        $.messager.alert('系统提示', '不能为空','warning');
        return;
    }
    if(grounpss==0){
        $.messager.alert('系统提示', '请选择一个车场','warning');
        return;
    }
    $.ajax({
        type: "post",
        url: server_context+"/addDeviceGroup",
        async: true,
        data: {
            deviceGroupName: $('#Mobileyhthreformdiv-input').val(),
            groupId: grounpId
        },
        success: function (data) {
            if (data.error_code == 0) {
                $.messager.alert('系统提示', '添加成功','info');
                $('.Mobileyhthreformdiv-divtwo').css('display', 'none');
                $('.Mobileyhthreeformtree').tree('reload')
            } else {
                Statuscodeprompt(data.error_code,"添加失败...",'error')
            }
        }
    });
})
//添加分组取消按钮
$('#Mobileyhthreformdiv-bttwo').click(function () {
    $('.Mobileyhthreformdiv-divtwo').css('display', 'none');
})
//删除分组
function Mobileyhthreemove() {
    if (grounpId == '') {
        $.messager.alert('系统提示', '请选择用户组进行删除','warning');
        return;
    }
    $.messager.confirm("系统提示", "您确认要删除此用户组吗？", function (r) {
        if (r) {
            $.ajax({
                type: "post",
                url: server_context+"/romoveDeviceGroup",
                async: true,
                data: {
                    deviceGroupId: grounpId
                },
                success: function (data) {
                    if (data.error_code == 0) {
                        $.messager.alert("系统提示", "删除成功",'info');
                        $(".Mobileyhthreeformtree").tree('reload');
                    } else {
                        Statuscodeprompt(data.error_code,"删除失败,或请先删除子用户组...",'error')
                    }
                }
            })
        }
    })
}
//模板下载
function DownloadTheTemplate(){
   $.ajax({
		type:"get",
		url:server_context+"/downloadTemplate",
		success:function(data){
			if(data!=''||data==null||data=='undefined'){
                console.log(123)
				window.location.href = data; 
			}	
		},
		error:function(){
			$.messager.alert("操作提示", "系统错误，请稍后重试！","error");
		}
	});
}
//批量导入
function bulkimport(){
    $('#bulkimportmyModal').modal('show')
    $('#bulkimportfile').val('')
    $('#bulkimportschedule').attr('style','width:0%')
}
//信息同步
function Mobileyhseven(){
    var row = $('.MobileData').datagrid('getChecked');
    if (row.length == 0) {
        $.messager.alert('系统提示', '请选择设备进行信息同步操作','warning');
        return;
    }
    var id=[];
    for(var i=0;i<row.length;i++){
       id.push(row[i].iccid)
    }
    console.log(id.join(','))
    $.ajax({
        url:server_context+"/synchronizationDeviceMsisdn",
        type:'post',
        async:true,
        data:{
            iccids:id.join(',')
        },
        success:function(data){
            if(data.error_code==0){
               $.messager.alert('系统提示','信息同步成功','info');
               $('.MobileData').datagrid('reload');
            }else{
                Statuscodeprompt(data.error_code)
            }
        }
    })
}
$('#bulkimportj').click(function(){
    var xhr = new XMLHttpRequest;
    var fd = new FormData();
	fd.append("fileName", document.getElementById('bulkimportfile').files[0]);
    xhr.upload.addEventListener("progress", uploadPrgess, false);
    xhr.addEventListener("load", uploadomplee, false);
	xhr.addEventListener("error", uploadaile, false);
	xhr.open("POST", server_context+"/importDeviceFile");
	xhr.send(fd);
})
function uploadPrgess(evt){
    if(evt.lengthComputable){
       var percentComplete = Math.round(evt.loaded * 100 / evt.total)+'%';
       $('#bulkimportschedule').attr('style','width:'+percentComplete)
    }
}
function uploadomplee(evt){
    var message = evt.target.responseText;
	var dataObj=eval("("+message+")")
	if(dataObj.error_code==0){
        $.messager.alert('系统提示','保存成功','info')
        $('#bulkimportmyModal').modal('hide')
        $('.MobileData').datagrid('reload')
    }
}
function uploadaile(evt){
   $.messager.alert("操作提示", "上传失败！","error");
}

//设备唤醒
var n = 1;
// 关闭窗口，取消操作
var status = true;
var set;
//设备唤醒
function awaken(index) {
	if(shebione==''){
		$.messager.alert('系统提示','你不具备此权限','warning');
		return;
	}
    var rows = $('.MobileData').datagrid('getRows');
    var row = rows[index];
    var deviceId = row.deviceId;
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
                    $('.MobileData').datagrid('reload');	// reload the user data
                }, 3000);
            } else {
                if (n < 5) {
                    n = n + 1;
                    set = setTimeout(function () {
                        $(".messager-body").window('close');
                        deviceWakeupRetry(deviceId);
                    }, 5000);
                } else {
                    setTimeout(function () {
                        n = 1;
                        $(".messager-body").window('close');
                        $.messager.alert("操作提示", "唤醒失败！", "error");
                    }, 5000);
                }
                $('.MobileData').datagrid('reload');	// reload the user data
            }
        },
        error: function () {
            $.messager.alert("操作提示", "系统错误，请稍后重试！", "error");
        }
    });
}

// 设备唤醒重试
function deviceWakeupRetry(deviceId) {
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
                    $('.MobileData').datagrid('reload');
                } else {
                    if (n < 5) {
                        n = n + 1;
                        set = setTimeout(function () {
                            $(".messager-body").window('close');
                            deviceWakeupRetry(deviceId);
                        }, 5000);
                    } else {
                        setTimeout(function () {
                            n = 1;
                            status = true;
                            $(".messager-body").window('close');
                            $.messager.alert("操作提示", "唤醒失败！", "error");
                        }, 4000);
                    }
                    $('.MobileData').datagrid('reload');
                }
            },
            error: function () {
                $.messager.alert("操作提示", "系统错误，请稍后重试！", "error");
            }
        });
    }
}

//设备重启
function restart(index) {
	if(shebitwo==''){
		$.messager.alert('系统提示','你不具备此权限','warning');
		return;
	}
    var rows = $('.MobileData').datagrid('getRows');
    var row = rows[index];
    var id = row.deviceId;
    $.ajax({
        type: "post",
        url: server_context+"/deviceReset",
        async: true,
        data: {
            deviceId: id
        }
    });
    $.messager.alert('系统提示', '重启命令发送成功,等待设备重启', 'info')
}
//查看详情
function particulars(index) {
	if(shebifour==''){
		$.messager.alert('系统提示','你不具备此权限','warning');
		return;
	}
    var rows = $('.MobileData').datagrid('getRows');
    var row = rows[index];
    console.log(row)
    $('#particularsModal').modal('show')
    $('.lookup1').text(row.deviceId)
    $('.lookup2').text(row.modelName)
    $('.lookup3').text(row.serialNum)
    $('.lookup4').text(row.modelAlias)
    $('.lookup5').text(row.vin)
    $('.lookup6').text(row.hardVer)
    $('.lookup7').text(row.ecuHardwareNum)
    $('.lookup8').text(row.ecuSerialNum)
    $('.lookup9').text(row.ecuPartsNum)
    $('.lookup10').text(row.ecuProductDate)
    $('.lookup12').text(row.msisdn)
    $('.lookup13').text(row.imsi)
    $('.lookup14').text(row.imei)
    $('.lookup15').text(row.iccid)
    $('.lookup16').text(row.keyId)  //升级索引
    $('.lookup17').text(row.configVer)
    $('.lookup18').text(row.softVer)
    $('.lookup19').text(row.softBuildDate)
    $('.lookup20').text(row.ts)
    $('.lookup21').text(row.onlineTime)
    $('.lookup22').text(row.offlineTime)
    $('.lookup24').text(row.activationExpireOn)
    if(row.activated==true){
       $('.lookup23').text('是')
    }else{
       $('.lookup23').text('否')
    }
}

var device;//设备编号
function longdistance(index) {
	if(shebithree==''){
		$.messager.alert('系统提示','你不具备此权限','warning');
		return;
	}
    var rows = $('.MobileData').datagrid('getRows');
    var row = rows[index];
    var id = row.id;
    device = row.deviceId;
    $('#remoteManipulationModal').modal('show')
    reulaone()
}
//配置信息点击事件
var onlin;//设备状态
var surl=server_context+"/getDeviceConfig"; //配置信息的获取接口
function reulaone() {
    $('.remoteManipulationheader>div').removeClass('reulacolor')
    $('#reulaone').addClass('reulacolor')
    $('.remoteManipulation-body>form').css('display', 'none')
    $('.configurationinformation').css('display', '')
    $.ajax({
        type: "post",
        url: surl,
        async: true,
        data: {
            deviceId: device,
        },
        success: function (data) {
			surl=server_context+"/getDeviceConfig";
            var data = data.data[0];
            onlin = data.online
            $('.equipmentnumber').text(data.deviceId);
            if (data.online == false) {
                $('.EquipmentStatus').text('未在线').css('color', 'gray')
                $('.configurationinformation input').attr('disabled', 'disabled')
                $('.compiles').css('background', 'url(img/Theowner/bianjianniuhui.png) no-repeat')
                $('.saves').css('background', 'url(img/Theowner/bacunanniuhui.png) no-repeat')
                $('.reads').css('background', 'url(img/Theowner/duquanniuhui.png) no-repeat')
            } else {
                $('.EquipmentStatus').text('在线').css('color', '#00bd28')
                $('.configurationinformation input').attr('disabled', 'disabled')
                $('.compiles').css('background', 'url(img/Theowner/bianjianniu.png) no-repeat')
                $('.saves').css('background', 'url(img/Theowner/bacunanniuhui.png) no-repeat')
                $('.reads').css('background', 'url(img/Theowner/duquanniu.png) no-repeat')
            }
            $('.config_ver').val(data.configVer);
            $('.iovdc_key').val(data.serverKey);
            $('.update_keyid').val(data.updateKeyId);
            $('.update_key').val(data.updateKey);
            $('.plate').val(data.plate);
            $('.callNum').val(data.callNum);
            $('.ecallNum').val(data.ecallNum);
            $('.bcallNum').val(data.bcallNum);
            $('.icallNum').val(data.icallNum);
            $('.ecall_sms_num').val(data.ecallSMSNum);
            $('.apn').val(data.apn);
            $('.iovdc_ip1').val(data.serverIp1);
            $('.iovdc_ip2').val(data.serverIp2);
            $('.iovdc_ip3').val(data.serverIp3);
            $('.update_time').val(data.updateTime);
        }
    });
}
//编辑点击事件
$('.compiles').click(function () {
    if (onlin == false) {
        return
    }
    if ($('.compiles').text() == '编辑') {
        $('.compiles').text('取消编辑')
        $('.saves').attr('name', '1')
        $('.configurationinformation input').removeAttr('disabled')
        $('.saves').css('background', 'url(img/Theowner/baocunanniu.png) no-repeat')
    } else if ($('.compiles').text() == '取消编辑') {
        $('.saves').attr('name', '2')
        $('.compiles').text('编辑')
        $('.configurationinformation input').attr('disabled', 'disabled')
        $('.saves').css('background', 'url(img/Theowner/bacunanniuhui.png) no-repeat')
    }

})
//保存点击事件
$('.saves').click(function () {
    if (onlin == false) {
        return
    }
    var name = $('.saves').attr('name');
    if (name == '2') {
        return
    }
    $.ajax({
        type: "post",
        url: server_context+"/sendBaseSettings",
        async: true,
        data: {
			deviceId:device,
            configVer: $('.config_ver').val(),
            dserverKey: $('.iovdc_key').val(),
            updateKeyId: $('.update_keyid').val(),
            updateKey: $('.update_key').val(),
            plate: $('.plate').val(),
            callNum: $('.callNum').val(),
            ecallNum: $('.ecallNum').val(),
            bcallNum: $('.bcallNum').val(),
            icallNum: $('.icallNum').val(),
            ecallSMSNum: $('.ecall_sms_num').val(),
            apn: $('.apn').val(),
            serverIp1: $('.iovdc_ip1').val(),
            serverIp2: $('.iovdc_ip2').val(),
            serverIp3: $('.iovdc_ip3').val(),
            updateTime: $('.update_time').val()
        },
        success: function (data) {
            if (data.error_code == 0) {
                $.messager.alert('系统提示', '保存成功','info')
                reulaone();
            } else {
                Statuscodeprompt(data.error_code,"保存失败...",'error')
            }
        }
    });

})
//读取点击事件
$('.reads').click(function () {
	$.ajax({
        type: "post",
        url: server_context+"/readBaseSettings",
        data: {deviceId: device },
        success: function (data){
            if(data.error_code==0){
               $.messager.alert('系统提示','读取成功','info')
                reulaone()
            }
        }
    })	
})
//设备激活点击事件
function reulatwo() {
    $('.remoteManipulationheader>div').removeClass('reulacolor')
    $('#reulatwo').addClass('reulacolor')
    $('.remoteManipulation-body>form').css('display', 'none')
    $('.configurationinformationtw').css('display', '')
    $.ajax({
        type: "post",
        url: server_context+"/getActivation",
        async: true,
        data: {
            deviceId: device,
        },
        success: function (data) {
            var data = data.data[0];
            onlin = data.online
            $('.equipmentnumber').text(data.deviceId);
            $('#activationDateSpan').datetimebox('setValue', data.activationExpireOn);
            if (data.online == false) {
                $('.EquipmentStatus').text('未在线').css('color', 'gray')
                $('.ensureone').css('background', 'url(img/Theowner/bacunanniuhui.png) no-repeat')
            } else {
                $('.EquipmentStatus').text('在线').css('color', '#00bd28')
            }
            if (data.activated == true) {
                $('#currentone').text('已激活')
                $('.activationoneop2').attr('selected', 'selected')
            } else {
                $('#currentone').text('未激活')
                $('.activationoneop1').attr('selected', 'selected')
            }
        }
    });
}
//设备激活确定按钮
$('.ensureone').click(function () {
	if (onlin == false) {
        return;
    }
    $.ajax({
        type: "post",
        url: server_context+"/sendActivationSettings",
        async: true,
        data: {
            deviceId: device,
            activationExpireOn: $('#activationDateSpan').datetimebox('getValue'),
            activated: $('#activationone').val()
        },
        success: function (data) {
            if (data.error_code == 0) {
                $.messager.alert('系统提示', '保存成功','info')
                reulatwo();
            } else {
                Statuscodeprompt(data.error_code,"保存失败...",'error')
            }
        }
    });
})

//陀螺仪校正点击事件
function reulathree() {
    $('.remoteManipulationheader>div').removeClass('reulacolor');
    $('#reulathree').addClass('reulacolor');
    $('.remoteManipulation-body>form').css('display', 'none')
    $('.configurationinformationthr').css('display', '')
    $.ajax({
        type: "post",
        url: surl,
        async: true,
        data: {
            deviceId: device,
        },
        success: function (data) {
			surl=server_context+"/getDeviceConfig";
            var data = data.data[0];
            onlin = data.online
            $('.equipmentnumber').text(data.deviceId);
            if (data.online == false) {
                $('.EquipmentStatus').text('未在线').css('color', 'gray')
                $('.threetbody input').attr('disabled', 'disabled')
                $('.compilethr').css('background', 'url(img/Theowner/bianjianniuhui.png) no-repeat')
                $('.savethr').css('background', 'url(img/Theowner/bacunanniuhui.png) no-repeat')
                $('.readthr').css('background', 'url(img/Theowner/duquanniuhui.png) no-repeat')
            } else {
                $('.EquipmentStatus').text('在线').css('color', '#00bd28')
                $('.threetbody input').attr('disabled', 'disabled')
                $('.savethr').css('background', 'url(img/Theowner/bacunanniuhui.png) no-repeat')
            }
            $('#xdirection').val(data.x);
            $('#ydirection').val(data.y);
            $('#traveldirection').val(data.z);
        }
    });
}
//编辑
$('.compilethr').click(function () {
    if (onlin == false) {
        return
    }
    if ($('.compilethr').text() == '编辑') {
        $('.compilethr').text('取消编辑')
        $('.savethr').attr('name', '1')
        $('.savethr').css('background', 'url(img/Theowner/baocunanniu.png) no-repeat')
        $('.threetbody input').removeAttr('disabled')
    } else if ($('.compilethr').text() == '取消编辑') {
        $('.compilethr').text('编辑')
        $('.savethr').attr('name', '2')
        $('.threetbody input').attr('disabled', 'disabled')
        $('.savethr').css('background', 'url(img/Theowner/bacunanniuhui.png) no-repeat')
    }
})
//确定
$('.savethr').click(function () {
    if (onlin == false) {
        return
    }
    var name = $('.savethr').attr('name');
    if (name == '2') {
        return
    }
    $.ajax({
        type: "post",
        url: server_context+"/sendGyroSettings",
        async: true,
        data: {
            deviceId: device,
            x: $('#xdirection').val(),
            y: $('#ydirection').val(),
            z: $('#traveldirection').val()
        },
        success: function (data) {
            if (data.error_code == 0) {
                $.messager.alert('系统提示', '保存成功','info');
            } else {
                Statuscodeprompt(data.error_code,"保存失败...",'error')
            }
        }
    });
})
//读取
$('.readthr').click(function () {
	$.ajax({
        type: "post",
        url: server_context+"/readGyroSettings",
        data: {deviceId: device },
        success: function (data){
            if(data.error_code==0){
               $.messager.alert('系统提示','读取成功','info')
               reulathree();
            }
        }
    })		
   
})
//can协议点击事件
function reulafour() {
    $('.remoteManipulationheader>div').removeClass('reulacolor')
    $('#reulafour').addClass('reulacolor')
    $('.remoteManipulation-body>form').css('display', 'none')
    $('.configurationinformationfou').css('display', '')
    $.ajax({
        type: "post",
        url: surl,
        async: true,
        data: {
            deviceId: device,
        },
        success: function (data) {
			surl = server_context+"/getDeviceConfig";
            var data = data.data[0];
            onlin = data.online
            $('.equipmentnumber').text(data.deviceId);
            if (data.online == false) {
                $('.EquipmentStatus').text('未在线').css('color', 'gray')
                $('.fourtbody input').attr('disabled', 'disabled')
                $('.compilefou').css('background', 'url(img/Theowner/bianjianniuhui.png) no-repeat')
                $('.savefou').css('background', 'url(img/Theowner/bacunanniuhui.png) no-repeat')
                $('.readfou').css('background', 'url(img/Theowner/duquanniuhui.png) no-repeat')
            } else {
                $('.EquipmentStatus').text('在线').css('color', '#00bd28')
                $('.fourtbody input').attr('disabled', 'disabled')
                $('.savefou').css('background', 'url(img/Theowner/bacunanniuhui.png) no-repeat')
            }
            $('#cangallery').val(data.channel);
            $('#pagemark').val(data.page);
            $('#canid1').val(data.canId1);
            $('#canid1jg').val(data.canId1Interval);
            $('#canid2').val(data.canId2);
            $('#canid2jg').val(data.canId2Interval);
        }
    });
}
//编辑点击事件
$('.compilefou').click(function () {
    if (onlin == false) {
        return
    }
    if ($('.compilefou').text() == '编辑') {
        $('.compilefou').text('取消编辑')
        $('.savefou').attr('name', '1')
        $('.fourtbody input').removeAttr('disabled', 'disabled')
        $('.savefou').css('background', 'url(img/Theowner/baocunanniu.png) no-repeat')
    } else if ($('.compilefou').text() == '取消编辑') {
        $('.compilefou').text('编辑')
        $('.savefou').attr('name', '2')
        $('.fourtbody input').attr('disabled', 'disabled')
        $('.savefou').css('background', 'url(img/Theowner/bacunanniuhui.png) no-repeat')
    }
})
//发送点击事件
$('.savefou').click(function () {
    if (onlin == false) {
        return
    }
    var name = $('.savefou').attr('name')
    if (name == '2') {
        return
    }
    $.ajax({
        type: "post",
        url: server_context+"/sendCANSettings",
        async: true,
        data: {
            deviceId: device,
            channel: $('#cangallery').val(),
            page: $('#pagemark').val(),
            canId1: $('#canid1').val(),
            canId1Interval: $('#canid1jg').val(),
            canId2: $('#canid2').val(),
            canId2Interval: $('#canid2jg').val()
        },
        success: function (data) {
            if (data.error_code == 0) {
                $.messager.alert('系统提示', '保存成功','info')
            } else {
                Statuscodeprompt(data.error_code,"保存失败...",'error')
            }
        }
    });
})
//读取点击事件
$('.readfou').click(function () {
	$.ajax({
        type: "post",
        url: server_context+"/readCANSettings",
        data: {deviceId: device },
        success: function (data){
            if(data.error_code==0){
               $.messager.alert('系统提示','读取成功','info')
               reulafour();
            }
        }
    })					  
    
})
//互连设备点击事件
function reulafive() {
    $('.remoteManipulationheader>div').removeClass('reulacolor')
    $('#reulafive').addClass('reulacolor')
    $('.remoteManipulation-body>form').css('display', 'none')
    $('.configurationinformationfive').css('display', '')
    $.ajax({
        type: "post",
        url: server_context+"/getInterconnectDevice",
        async: true,
        data: {
            deviceId: device,
        },
        success: function (data) {
            var data = data.data[0];
            $(".fivetbody tr").nextAll().remove();
            var friendlyDevice = data.interconnectDevice.split(",");
            if(friendlyDevice!=''||friendlyDevice!='undefined'||friendlyDevice!=null){
               for (var i = 1; i < friendlyDevice.length + 1; i++) {
                    $(".fivetbody").append("<tr id=" + i + " align='center'>"
                        + "<td>" + i + "</td>"
                        + "<td><input type='text' name='MACName" + i + "' id='MACName" + i + "' value='" + friendlyDevice[i - 1].split(":")[0] + "' /></td>"
                        + "<td><input type='text' name='MACAdress" + i + "' id='MACAdress" + i + "' value='" + friendlyDevice[i - 1].split(":")[1] + "' /></td>"
                        + "<td><a href=\'#\' onclick=\'deltr(" + i + ")\'>删除</a></td>"
                        + "</tr>");
                }
            }
            onlin = data.online;
            $('.equipmentnumber').text(data.deviceId);
            $('.serialnumberfive').text(data.serialNum);
            if (data.online == false) {
                $('.EquipmentStatus').text('未在线').css('color', 'gray')
                $('.compilefi').css('background', 'url(img/Theowner/bacunanniuhui.png) no-repeat')
                $('.compilefi').attr('name', '2')
            } else {
                $('.EquipmentStatus').text('在线').css('color', '#00bd28')
                $('.compilefi').css('background', 'url(img/Theowner/baocunanniu.png) no-repeat')
                $('.compilefi').attr('name', '1')
            }
        }
    });
}
//添加设备
$('.compilefiv').click(function () {
    var _len = $(".fivetbody tr").length;
    if (_len > 10) {
        $.messager.alert("操作提示", "互联设备已达10个上限，无法继续新增！", "error");
        return;
    }
    $(".fivetbody").append("<tr id=" + (_len) + " align='center'>"
        + "<td>" + _len + "</td>"
        + "<td><input type='text' name='MACName" + (_len) + "' id='MACName" + (_len) + "' maxlength='20'/></td>"
        + "<td><input type='text' name='MACAdress" + (_len) + "' id='MACAdress" + (_len) + "' maxlength='20'/></td>"
        + "<td><a href=\'#\' onclick=\'deltr(" + (_len) + ")\'>删除</a></td>"
        + "</tr>");
})
//删除设备
function deltr(index) {
    var _len = $(".fivetbody tr").length;
    $(".fivetbody tr[id='" + index + "']").remove();//删除当前行
    for (var i = index + 1; i < _len; i++) {
        var nextMACNameVal = $("#MACName" + i).val();
        var nextMACAdressVal = $("#MACAdress" + i).val();
        $(".fivetbody tr[id='" + i + "']").replaceWith("<tr id=" + (i - 1) + " align='center'>"
            + "<td>" + (i - 1) + "</td>"
            + "<td><input type='text' name='MACName" + (i - 1) + "' value='" + nextMACNameVal + "' id='MACName" + (i - 1) + "' maxlength='20'/></td>"
            + "<td><input type='text' name='MACAdress" + (i - 1) + "' value='" + nextMACAdressVal + "' id='MACAdress" + (i - 1) + "' maxlength='20'/></td>"
            + "<td><a href='#' onclick='deltr(" + (i - 1) + ")'>删除</a></td>"
            + "</tr>");
    }
}
//保存
//特殊字符的过滤
function stripscript(s) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？\" \"]")
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}
$('.compilefi').click(function () {
    var name = $('.compilefi').attr('name')
    if (name == '2') {
        return;
    }
    // 获取设备id、Sn
    var deviceId = $("#friendlyDeviceIdSpan").html();
    var deviceSn = $("#friendlyDeviceSnSpan").html();
    var len = $(".fivetbody tr").length;
    var friendlyDevice = "";
    var MACAdressList = [];
    for (var i = 1; i < len; i++) {
        var MACName = stripscript($("#MACName" + i).val());
        var MACAdress = stripscript($("#MACAdress" + i).val());
        if (MACName == "") {
            $.messager.alert("操作提示", "名称不能为空！",'warning');
            return;
        }
        if (MACAdress.length != 12) {
            $.messager.alert("操作提示", "MAC地址错误！", "error");
            return;
        }

        for (var j = 0; j < MACAdressList.length; j++) {
            if (MACAdressList[j] == MACAdress.toLowerCase()) {
                $.messager.alert("操作提示", "MAC地址重复！",'warning');
                return;
            }
        }
        MACAdressList[i - 1] = MACAdress.toLowerCase();
        if (i == len - 1) {
            friendlyDevice += MACName + ":" + MACAdress.toLowerCase();
        } else {
            friendlyDevice += MACName + ":" + MACAdress.toLowerCase() + ",";
        }
    }
    $.ajax({
        type: "post",
        url: server_context+"/saveInterconnectDevice",
        data: "deviceId=" + device + "&interconnectDevice=" + friendlyDevice + "&deviceSn=" + deviceSn,
        datatype: "json",
        success: function (data) {
            if (data.error_code == 0) {
                $.messager.alert("操作提示", "操作成功！", "info");
            }else{
                $.messager.alert("操作提示", "数据未变更或操作失败！", "error");
            }
        },
        error: function () {
            $.messager.alert("操作提示", "系统错误，请稍后重试！", "error");
        }
    });
})
//注册应答点击事件
function reulasix() {
    $('.remoteManipulationheader>div').removeClass('reulacolor')
    $('#reulasix').addClass('reulacolor')
    $('.remoteManipulation-body>form').css('display', 'none')
    $('.configurationinformationsix').css('display', '')
    $.ajax({
        type: "post",
        url: server_context+"/getRegistResponse",
        data: { deviceId: device },
        success: function (data) {
            var config = data.data[0].config;
            $('.equipmentnumber').text(config.deviceId);
            if (config.online == false) {
                $('.EquipmentStatus').text('未在线').css('color', 'gray')
            } else {
                $('.EquipmentStatus').text('在线').css('color', '#00bd28')
            }
            //设置设备互联网络以及用户WIFI网络的值
            if (config.interworkingNetwork != "" && config.interworkingNetwork != null) {
                $("#friendly_network").combobox('setValue', config.interworkingNetwork);

            }
            if (config.userNetwork != "" && config.userNetwork != null) {
                $("#customer_network").combobox('setValue', config.userNetwork);
            }
            // 设备信息
            var device = data.data[0].config;
            for (var key in device) {
                $("#" + key + "").val(device[key]);
            }
        },
        error: function () {
            $.messager.alert("操作提示", "系统错误，请稍后重试！", "error");
        }
    });
}
// 注册应答信息保存
function saveDeviceLoginResponse() {
    $('.configurationinformationsix').form('submit', {
        url: server_context+"/saveRegistResponse?deviceId="+device,
        onSubmit: function () {
            return $(this).form('validate');
        },
        success: function(data){
            var dataObj=eval("("+data+")")
        	console.log(dataObj)
            if (dataObj.error_code == 0) {
                $.messager.alert("操作提示", "操作成功", "info");
            } else {
                Statuscodeprompt(data.error_code,"操作失败，请稍后重试...",'error')
            }
        }
    });
}
//碰撞触发点击事件
function reulaseven() {
    $('.remoteManipulationheader>div').removeClass('reulacolor')
    $('#reulaseven').addClass('reulacolor')
    $('.remoteManipulation-body>form').css('display', 'none')
    $('.configurationinformationseven').css('display', '')
    $.ajax({
        type: "post",
        url: server_context+"/getCrash",
        data: { deviceId: device },
        success: function (data) {
            var config = data.data[0];
            $('.equipmentnumber').text(config.deviceId);
            onlin = data.online
            if (config.online == false) {
                $('.EquipmentStatus').text('未在线').css('color', 'gray')
                $('.compilesev').css('background', 'url(img/Theowner/bacunanniuhui.png) no-repeat')
                $('.seventbody input').attr('disabled', 'disabled')
            } else {
                $('.EquipmentStatus').text('在线').css('color', '#00bd28')
                $('.compilesev').css('background', 'url(img/Theowner/bacunanniuhui.png) no-repeat')
                $('.seventbody input').attr('disabled', 'disabled')
            }
			if (config.setupDirection == "" || config.setupDirection == null) {
                $("#ecallSetupMode").combobox('setValue',$('#ecallSetupMode').combobox('getData')[2].id);
            }else{
            	$("#ecallSetupMode").combobox('setValue', config.setupDirection);
            }
            if (config.ecallAutoTrigger == "" || config.ecallAutoTrigger == null) {
            	$("#ecallAutoTrigger").combobox('setValue',$('#ecallAutoTrigger').combobox('getData')[0].id);
            }else{
            	$("#ecallAutotrigger").combobox('setValue', config.ecallAutoTrigger);
            }
			var device = data.data[0];
            for (var key in device) {
                //console.log(key)
                $("#" + key + "").val(device[key]);
            }
        },
        error: function () {
            $.messager.alert("操作提示", "系统错误，请稍后重试！", "error");
        }
    });
}
//编辑点击事件
$('.compilese').click(function () {
    if (onlin == false) {
        return
    }
    if ($('.compilese').text() == '编辑') {
        $('.compilese').text('取消编辑')
        $('.compilesev').attr('id', '1')
        $('.compilesev').css('background', 'url(img/Theowner/baocunanniu.png) no-repeat')
        $('.seventbody input').removeAttr('disabled')
    } else if ($('.compilese').text() == '取消编辑') {
        $('.compilese').text('编辑')
        $('.compilesev').attr('id', '2')
        $('.seventbody input').attr('disabled', 'disabled')
        $('.compilesev').css('background', 'url(img/Theowner/bacunanniuhui.png) no-repeat')
    }
})
//发送按钮点击事件
$('.compilesev').click(function () {
    var name = $('.compilesev').attr('id');
    if (name == 2) {
        return;
    }
    $.ajax({
        type: "post",
        url: server_context+"/sendECallTriggerSettings",
        async: true,
        data: $('.configurationinformationseven').serialize() +"&deviceId="+device,
        success: function (data) {
            if (data.error_code == 0) {
                $.messager.alert('系统提示', '发送成功','info')
            } else {
                Statuscodeprompt(data.error_code,"发送失败...",'error')
            }
        }
    });
})
//读取点击事件
$('.compileseve').click(function () {
    $.ajax({
        type: "post",
        url: server_context+"/readECallTriggerSettings",
        data: {deviceId: device },
        success: function (data){
            if(data.error_code==0){
               $.messager.alert('系统提示','读取成功','info')
               reulaseven();
            }
        }
    })
})
//呼叫接入点击事件
function reulaeight() {
    $('.remoteManipulationheader>div').removeClass('reulacolor')
    $('#reulaeight').addClass('reulacolor')
    $('.remoteManipulation-body>form').css('display', 'none')
    $('.configurationinformationeight').css('display', '')
    $.ajax({
        type: "post",
        url: surl,
        data: { deviceId: device },
        success: function (data) {
			surl = server_context+"/getDeviceConfig";
            var config = data.data[0];
            $('.equipmentnumber').text(config.deviceId);
            if (config.online == false) {
                $('.EquipmentStatus').text('未在线').css('color', 'gray')
                $('.compileeigh').css('background', 'url(img/Theowner/bacunanniuhui.png) no-repeat')
            } else {
                $('.EquipmentStatus').text('在线').css('color', '#00bd28')
                $('.compileeigh').css('background', 'url(img/Theowner/baocunanniu.png) no-repeat')
            }
			$('#incomingCallAllow').val(config.incomingCallAllow)
			$('#incomingCallNumber').val(config.incomingCallNumber)
        },
        error: function () {
            $.messager.alert("操作提示", "系统错误，请稍后重试！", "error");
        }
    });
}
//发送按钮
$('.compileeigh').click(function () {
    $.ajax({
        type: "post",
        url: server_context+"/sendIncomingCallSettings",
        async: true,
        data: $('.configurationinformationeight').serialize()+"&"+"deviceId="+device,
        success: function (data) {
            if (data.error_code == 0) {
                $.messager.alert('系统提示', '发送成功','info');
            } else {
                Statuscodeprompt(data.error_code,"发送失败...",'error')
            }
        }
    });
})
//远程升级点击事件
function reulanine() {
    $('.remoteManipulationheader>div').removeClass('reulacolor')
    $('#reulanine').addClass('reulacolor')
    $('.remoteManipulation-body>form').css('display', 'none')
    $('.configurationinformationten').css('display', '')
    $.ajax({
        type: "post",
        url: server_context+"/getDeviceConfig",
        data: { deviceId: device },
        success: function (data) {
            var config = data.data[0];
            $('.equipmentnumber').text(config.deviceId);
            onlin = data.online
            if (config.online == false) {
                $('.EquipmentStatus').text('未在线').css('color', 'gray')
                $('.compilete').css('background', 'url(img/Theowner/bacunanniuhui.png) no-repeat')
            } else {
                $('.EquipmentStatus').text('在线').css('color', '#00bd28')
                $('.compilete').css('background', 'url(img/Theowner/baocunanniu.png) no-repeat')
            }
        },
        error: function () {
            $.messager.alert("操作提示", "系统错误，请稍后重试！", "error");
        }
    });
    //加载升级包下拉框内容
    $('#via_upgrade').combogrid({
        panelWidth: 600,
        idField: 'id',
        textField: 'fileName',
        url: server_context+'/listUpgradePatch',
        columns: [[
            { field: 'ck', checkbox: true, width: 20 },
            { field: 'id', title: 'ID', align: 'center', hidden: true, },
            { field: 'softVer', title: '软件版本', align: 'center', width: 70 },
            { field: 'hardVer', title: '硬件版本', align: 'center', width: 70 },
            { field: 'model', title: '适应车型', align: 'center', width: 70 },
            { field: 'fileName', title: '文件名', align: 'center', width: 370 },
        ]],
        fitColumns: true
    });
}
//升级按钮
$('.compilete').click(function () {
    if (onlin == false) {
        return;
    }
    $('.configurationinformationten').form('submit', {
        url: server_context+"/orderUpgrade",
        onSubmit: function () {
            return $(this).form('validate')+"&"+"deviceId='+device+'";
        },
        success: function (data) {
            var row = eval('(' + data + ')');
            if (row.error_code == '0') {
                $.messager.alert("操作提示", "操作成功！", "info");
                $("#btnUpgradeSend").linkbutton("disable");
            } else {
                Statuscodeprompt(data.error_code,"操作失败，请稍后重试...",'error')
            }
        }
    });
})
//关闭取消点击事件
function reulaten() {
    $('#remoteManipulationModal').modal('hide');
}