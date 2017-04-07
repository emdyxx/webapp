
var localObj = window.location;

var contextPath = localObj.pathname.split("/")[1];

var basePath = localObj.protocol+"//"+localObj.host+"/"+contextPath;

var server_context=basePath;

/************************1.1进入主页*******************************/
var account = $.cookie('account')
$('.accounts').html(account)
//用户名点击事件,修改密码以及退出登录
function usernamedj(){
	var src = $('.nav-right-right-tb').attr('src')
   if(src=='img/imagess/daohangjiantoux.png'){
      $('.nav-right-right-tb').attr('src','img/imagess/daohangjiantous.png')
      $('.nav-right-right-xl').css('display','');
   }else if(src=='img/imagess/daohangjiantous.png'){
      $('.nav-right-right-tb').attr('src','img/imagess/daohangjiantoux.png')
      $('.nav-right-right-xl').css('display','none');
   }
}
//修改密码事件
function amendpsw(){
   $('.nav-right-right-xl').css('display','none');
   $('.nav-right-right-tb').attr('src','img/imagess/daohangjiantoux.png')
}
function amendpassword(){
    if($('.newpsw').val()!=$('.newpsword').val()){
       $.messager.alert("系统提示","两次密码输入不一致",'warning')
       return;
    }
    var data = {
       oldUserPwd:$('.rawpsw').val(),
       newUserPwd:$('.newpsw').val()
    }
	$.post(server_context+'/updateUserPwd',data,function(data){
	   if(data.error_code==0){
	      $.messager.alert("系统提示",'密码修改成功','info')
	      location.href='login.jsp'
	   }else{
	      $.messager.alert("系统提示",'密码修改失败','error')
	   }
	})
}
//退出登录的点击事件
function quitaccount(){
	$.ajax({
		type: "post",
		url: server_context+"/logout",
		async: false,
		success:function(data){
           if(data.error_code==0){
              window.sessionStorage.clear();
              location.href='login.jsp'
		   }
		}
	})
}


function roleremove(){
   $('.roleListtwobottom').tree('reload')
}

//进入主页直接发起一个请求,判断是否有某些权限
$.ajax({
	type: "post",
	url: server_context+"/listMenu",
	async: false,
	success: function(data) {
		for(var i = 0; i < data.data.length; i++) {
			$('<div class="panel bscolor"></div>').appendTo('#accordion')
		}
		$('<div class="panel-heading"></div>').appendTo('.panel')
		$('<div id="collapseOne" class="panel-collapse collapse"></div>').appendTo('.panel')
		$('<div></div>').appendTo('.panel-collapse')
		$('<ul class="management"></ul>').appendTo('.panel-collapse>div')
		$('<h4 class="panel-title"></h4>').appendTo('.panel-heading')
		$('<a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" class="h4-a"></a>').appendTo('.panel-title')
		for(var i = 0; i < data.data.length; i++) {
			var list = '';
			for(var j = 0; j < data.data[i].secondMenu.length; j++) {
				list += '<li name=' + data.data[i].secondMenu[j].id + ">" + data.data[i].secondMenu[j].menuName + '</li>'
			}
			document.getElementsByClassName('management')[i].innerHTML = list
		}
		for(var i = 0; i < data.data.length; i++) {
			$('.h4-a').eq(i).text(data.data[i].menuName)
		}
		$('<span class="down"></span>').appendTo('.h4-a')
		$('<img src="img/imagess/dakai.png" alt="" />').appendTo('.down') 
	}
});
//修改每个ui所指向的li
for(var i = 0; i < $('.panel').length; i++) {
	if($('.h4-a').eq(i).text() == '车主管理') {
		$('.h4-a').eq(i).attr('href', '#collapseTwo')
		$('.panel-collapse').eq(i).attr('id', 'collapseTwo')
	}
	if($('.h4-a').eq(i).text() == '设备管理') {
		$('.h4-a').eq(i).attr('href', '#collapseThree')
		$('.panel-collapse').eq(i).attr('id', 'collapseThree')
	}
	if($('.h4-a').eq(i).text() == '数据查询') {
		$('.h4-a').eq(i).attr('href', '#collapseFour')
		$('.panel-collapse').eq(i).attr('id', 'collapseFour')
	}
	if($('.h4-a').eq(i).text() == '升级管理') {
		$('.h4-a').eq(i).attr('href', '#collapseFive')
		$('.panel-collapse').eq(i).attr('id', 'collapseFive')
	}
	if($('.h4-a').eq(i).text() == '应用管理') {
		$('.h4-a').eq(i).attr('href', '#collapseSix')
		$('.panel-collapse').eq(i).attr('id', 'collapseSix')
	}
	if($('.h4-a').eq(i).text() == '呼叫中心') {
		$('.h4-a').eq(i).attr('href', '#collapseSeven')
		$('.panel-collapse').eq(i).attr('id', 'collapseSeven')
	}
	if($('.h4-a').eq(i).text()=='车型管理'){
		$('.h4-a').eq(i).attr('href','#collapseeight')
		$('.panel-collapse').eq(i).attr('id','collapseeight')
	}
}
//点击图标上下切换
var h4 = document.querySelectorAll('.h4-a')
for(var i = 0;i<h4.length;i++){
	h4[i].index = i
	h4[i].onclick = function() {
		var j = this.index
		var src = $('.down>img').eq(j).attr('src')
		if(src=='img/imagess/guanbi.png'){
			$('.down>img').eq(j).attr('src','img/imagess/dakai.png')
		}else if(src=='img/imagess/dakai.png'){
			$('.down>img').attr('src','img/imagess/dakai.png')
            $('.down>img').eq(j).attr('src','img/imagess/guanbi.png')
		}
	}
}
//点击改变背景颜色
var managementli = document.querySelectorAll(".management>li");
for(var i = 0; i < managementli.length; i++) {
	managementli[i].index = i;
	managementli[i].onclick = function() {
		$('.management>li').css('color', 'white')
		$('.management>li').removeClass('libj')
		managementli[this.index].className = 'libj';
		managementli[this.index].style.color = "black"
	}
}
//修改li的class属性以便添加点击事件
for(var i = 0; i < $('.management>li').length; i++) {
	if($('.management>li').eq(i).text() == '组织管理') {
		$('.management>li').eq(i).attr('id', 'managementli1')
	}
	if($('.management>li').eq(i).text() == '角色管理') {
		$('.management>li').eq(i).attr('id', 'managementli2')
	}
	if($('.management>li').eq(i).text() == '访问管理') {
		$('.management>li').eq(i).attr('id', 'managementli3')
	}
	if($('.management>li').eq(i).text() == '系统日志') {
		$('.management>li').eq(i).attr('id', 'managementli4')
	}
	if($('.management>li').eq(i).text() == '车主管理') {
		$('.management>li').eq(i).attr('id', 'managementli5')
	}
	if($('.management>li').eq(i).text() == '服务审核') {
		$('.management>li').eq(i).attr('id', 'managementli6')
	}
	if($('.management>li').eq(i).text() == '维保信息') {
		$('.management>li').eq(i).attr('id', 'managementli7')
	}
	if($('.management>li').eq(i).text() == '维保日志') {
		$('.management>li').eq(i).attr('id', 'managementli8')
	}
	if($('.management>li').eq(i).text() == '车载设备') {
		$('.management>li').eq(i).attr('id', 'managementli9')
	}
	if($('.management>li').eq(i).text() == 'SIM管理') {
		$('.management>li').eq(i).attr('id', 'managementli10')
	}
	if($('.management>li').eq(i).text() == '设备更换') {
		$('.management>li').eq(i).attr('id', 'managementli11')
	}
	if($('.management>li').eq(i).text() == '轨迹查询') {
		$('.management>li').eq(i).attr('id', 'managementli12')
	}
	if($('.management>li').eq(i).text() == '发动机转速') {
		$('.management>li').eq(i).attr('id', 'managementli13')
	}
	if($('.management>li').eq(i).text() == '行驶速度') {
		$('.management>li').eq(i).attr('id', 'managementli14')
	}
	if($('.management>li').eq(i).text() == '行驶里程') {
		$('.management>li').eq(i).attr('id', 'managementli15')
	}
	if($('.management>li').eq(i).text() == '剩余燃油') {
		$('.management>li').eq(i).attr('id', 'managementli16')
	}
	if($('.management>li').eq(i).text() == '车灯状态') {
		$('.management>li').eq(i).attr('id', 'managementli17')
	}
	if($('.management>li').eq(i).text() == '实时仪表') {
		$('.management>li').eq(i).attr('id', 'managementli18')
	}
	if($('.management>li').eq(i).text() == '实时定位') {
		$('.management>li').eq(i).attr('id', 'managementli19')
	}
	if($('.management>li').eq(i).text() == '姿态角度') {
		$('.management>li').eq(i).attr('id', 'managementli20')
	}
	if($('.management>li').eq(i).text() == '加速度') {
		$('.management>li').eq(i).attr('id', 'managementli21')
	}
	if($('.management>li').eq(i).text() == '查询日志') {
		$('.management>li').eq(i).attr('id', 'managementli22')
	}
	if($('.management>li').eq(i).text() == '设备升级') {
		$('.management>li').eq(i).attr('id', 'managementli23')
	}
	if($('.management>li').eq(i).text() == 'APP升级') {
		$('.management>li').eq(i).attr('id', 'managementli25')
	}
	if($('.management>li').eq(i).text() == '升级日志') {
		$('.management>li').eq(i).attr('id', 'managementli26')
	}
	if($('.management>li').eq(i).text() == '应用管理') {
		$('.management>li').eq(i).attr('id', 'managementli27')
	}
	if($('.management>li').eq(i).text() == '回拨设置') {
		$('.management>li').eq(i).attr('id', 'managementli28')
	}
	if($('.management>li').eq(i).text() == '信息推送') {
		$('.management>li').eq(i).attr('id', 'managementli29')
	}
	if($('.management>li').eq(i).text()=='车型管理'){
		$('.management>li').eq(i).attr('id','managementli31')
	}
	if($('.h4-a').eq(i).text()=='推送管理'){
		$('.h4-a').eq(i).attr('href','#collapsenine')
		$('.panel-collapse').eq(i).attr('id','collapsenine')
	}
}

$('main>div').css('display','none')
$('.background').css('display','')
$('.Yardmanagement').css('display', 'none')
/************************1.1系统管理---组织管理*******************************/
var id;
var idlever;
var url;
var rowid;
var file;//图片上传权限判断
$('.box').linkbutton({
	text: '添加组',
	iconCls: 'icon-tianjiaa'
})
$('.sox').linkbutton({
	text: '删除组',
	iconCls: 'icon-shanchu'
})

//点击车厂管理触发的事件
$('#managementli1').click(function() {
	clearInterval(seti);							   
	id=''
	$('.rightright').css('display', 'none')
	$('main>div').css('display', 'none')
	$('.Yardmanagement').css('display', '')
	//权限判断
	var data={
		id:$('#managementli1').attr('name')
	}	
	$.post(server_context+'/setMenuId',data,function(data){
		for(var i=0;i<data.data.length;i++){
			if(data.data[i]==2){
				$('.box').css('display','')
			}
			if(data.data[i]==3){
				$('.sox').css('display','')
			}
			if(data.data[i]==4){
				$('.iscompile').css('display','')
			}
			if(data.data[i]==5){
				file = 5
				$('.iscom').css('display','')
			}
			if(data.data[i]==6){
				$('.isrevise').css('display','')
			}
			if(data.data[i]==7){
				$('.isrevise2').css('display','')
			}
			if(data.data[i]==8){
				$('.isrevise3').css('display','')
			}
		}
	})
	//树菜单加载
	$('#leftleft1').tree({
		url: server_context+'/listGroupTree',
		method: 'post',
		animate: 'true',
		loadFilter: function(data) {
			var data =data.data
			return convert(data);
		},
		onSelect: function(node) {
			idlever=node.level
			return tre(node);
		}
	})
})
//找出选中的tree树的值
function tre(node) {
	$('#itemid').val('')
	$('#productid').val('')
	$('#Yardmanagementrole').val('')
	$('.rightright').css('display', '')
	tr = node.id
	id = tr
    if(node.parendId==0||node.parentId==1){
    	$('.xxbjone').css('display', 'none')
    	$('.xxbjtwo').css('display', '')
    	var data = {id:tr}
    	var Antaurin = document.querySelectorAll('.Antaurinformation')
    	 $.post(server_context+'/getGroupInfo',data,function(data){
			var data = data.rows[0];
			$('.xxbjtwobottom-left-image').attr('src',data.logoUrl)
	  		Antaurin[0].innerHTML=data.groupName;
	  		Antaurin[1].innerHTML=data.phone;
	  		Antaurin[2].innerHTML=data.address;
	  		Antaurin[3].innerHTML=data.principal;
	  		Antaurin[4].innerHTML=data.email;
	  	})
    }else{
    	$('.xxbjone').css('display', '')
    	$('.xxbjtwo').css('display', 'none')
    	$('#dg').datagrid({
			url: server_context+'/getGroupInfo',
			method: 'post',
			singleSelect: 'true',
			fit: 'true',
			fitColumns: 'true',
			rownumbers: 'true',
			queryParams: {
				id: tr
			}
		})
    }
	
	$('#dgl').datagrid({
		url: server_context+"/listGroupUser",
		singleSelect: 'true',
		rownumbers: "true",
		fit: 'true',
		fitColumns: 'true',
		nowrap: 'true',
		pageSize:50,
		pagination: "true",
		queryParams: {
			id: tr
		}
	})
}
//tree树点击添加的函数
function treeadd() {
	if(!id) {
		$.messager.alert("系统提示", "请选择用户组进行添加",'warning');
		return;
	}
	if(idlever==7){
       $.messager.alert("系统提示", "用户组最多添加七级",'warning');
	   return; 
	}
	$('#myfmmModal').modal('show')
	$('.fmm-form').form('reset')//清空表单
	$("#municipality").find("option").remove();
	$("#county").find("option").remove();
	$.ajax({
		type:"post",
		url:server_context+"/listArea",
		async:true,
		data:{
			level:1,
		},
		success:function(data){
			$("#province").find("option").remove();
			for(var i=0;i<data.data.length;i++){
				$('<option value='+data.data[i].id+'>'+data.data[i].name+'</option>').appendTo('#province')
			}
		}
	});
}
//省的onchang事件
function sheng(value){
	console.log(value)
	var id = value;
	$.ajax({
		type:"post",
		url:server_context+"/listArea",
		async:true,
		data:{
			level:2,
			pid:id
		},
		success:function(data){
			$("#municipality").find("option").remove();
			for(var i=0;i<data.data.length;i++){
				$('<option value='+data.data[i].id+'>'+data.data[i].name+'</option>').appendTo('#municipality')
			}
			var sd = $('#municipality').val()
			$.ajax({
				type:"post",
				url:server_context+"/listArea",
				async:true,
				data:{
					level:3,
					pid:sd
				},
				success:function(data){
					$("#county").find("option").remove();
					for(var i=0;i<data.data.length;i++){
						$('<option value='+data.data[i].id+'>'+data.data[i].name+'</option>').appendTo('#county')
					}
				}
			});
		}
	});
}
//市的onchange事件
function shi(value){
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
			$("#county").find("option").remove();
			for(var i=0;i<data.data.length;i++){
				$('<option value='+data.data[i].id+'>'+data.data[i].name+'</option>').appendTo('#county')
			}
		}
	});
}

function ajaxFileUpload(){
	var phone = /^1[34578]\d{9}$/;
	var email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	if($('#iscompilename').val()==''||$('#iscompilefzr').val()==''||$('#iscompileprincipal').val()==''||$('#iscompileemail').val()==''||$('#iscompilephone').val()==''){
		$.messager.alert('系统提示','必填字段不能为空','warning');
		return;
	}
	if(!phone.test($('#iscompilefzr').val())){
        $.messager.alert('系统提示','手机号不符合格式','warning');
		return;
	}
	if(!email.test($('#iscompileemail').val())){
        $.messager.alert('系统提示','邮箱不符合格式','warning');
		return;
	}
	var xhr = new XMLHttpRequest();
	var fd = new FormData();
	fd.append("fileName", document.getElementById('file_name').files[0]);
	fd.append("groupName", $('#iscompilename').val());
	fd.append("phone", $('#iscompilefzr').val());
	fd.append("address", $('#iscompilephone').val());
	fd.append("principal", $('#iscompileprincipal').val());
	fd.append("email", $('#iscompileemail').val());
	fd.append("id", id);
	xhr.addEventListener("load", uploadComplee, false);
	xhr.addEventListener("error", uploadFaile, false);
	xhr.open("POST", server_context+"/updateGroup");
	xhr.send(fd);
}
//上传成功响应
function uploadComplee(evt) {
	var message = evt.target.responseText;
	var dataObj=eval("("+message+")")
	if(dataObj.error_code==0){
        $.messager.alert('系统提示','保存成功','info')
		$('#myModalfile').modal('hide')
		$("#leftleft1").tree('reload');
		var Antaurin = document.querySelectorAll('.Antaurinformation')
		$.post(server_context+'/getGroupInfo',{id:id},function(data){
			console.log(data);
			var data = data.rows[0];
			$('.xxbjtwobottom-left-image').attr('src',data.logoUrl)
			Antaurin[0].innerHTML=data.groupName;
			Antaurin[1].innerHTML=data.phone;
			Antaurin[2].innerHTML=data.address;
			Antaurin[3].innerHTML=data.principal;
			Antaurin[4].innerHTML=data.email;
		})
	}
}
//上传失败
function uploadFaile(evt) {
	$.messager.alert("操作提示", "上传失败！","error");
}
//当点击id为3的时候编辑信息弹出框
function iscompilebj(){
	$("#myModalfile").modal();  
	var Antaurin = document.querySelectorAll('.Antaurinformation')
	$('#iscompilename').val(Antaurin[0].innerHTML)
	$('#iscompilefzr').val(Antaurin[1].innerHTML)
	$('#iscompilephone').val(Antaurin[2].innerHTML)
	$('#iscompileprincipal').val(Antaurin[3].innerHTML)
	$('#iscompileemail').val(Antaurin[4].innerHTML)
	var url = $(".xxbjtwobottom-left-image").attr('src')
	$('#file_name').val(url) 
}

        
function baocun() {
	var phone = /^1[34578]\d{9}$/;
	var email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if($('#treename').val()==''||$('#treefzr').val()==''||$('#treephone').val()==''||$('#treeemail').val()==''||$('#county').val()==''||$('#inaddress').val()==''){
        $.messager.alert('系统提示','必填字段不能为空','warning');
		return;
	}
	var treename = $('#treename').val()
	if(treename.length>10){
        $.messager.alert('系统提示','编组名称不能大于10位','warning');
		return;
	}
	if(!phone.test($('#treephone').val())){
        $.messager.alert('系统提示','手机号不符合格式','warning');
		return;
	}
	if(!email.test($('#treeemail').val())){
        $.messager.alert('系统提示','邮箱不符合格式','warning');
		return;
	}
	$.ajax({
		type: "post",
		url: server_context+"/saveGroup",
		async: true,
		data: {
			'parentId': id,
			'groupName': $('#treename').val(),
			'principal': $('#treefzr').val(),
			'phone': $('#treephone').val(),
			'email': $('#treeemail').val(),
			 'areaId':$('#county').val(),
			'address':$('#inaddress').val()
		},
		success: function(data) {
			if(data.error_code == 0) {
				$('.fmm').css('display', 'none');
				$.messager.alert("系统提示", "添加成功",'info');
				$('#myfmmModal').modal('hide');
				$("#leftleft1").tree('reload');
			}else{
				$('.fmm').css('display', 'none');
				$.messager.alert("系统提示", "添加失败",'error');
			}
		}
	});
}
//tree树点击删除的函数
function treeremoveo() {
	if(!id) {
		$.messager.alert("系统提示", "请选择需要删除的用户组",'info');
		return;
	}
	$.messager.confirm("系统提示", "您确认要删除此用户组吗？",function(r) {
		if(r) {
			console.log(123)
			$.ajax({
				type: "post",
				url: server_context+"/removeGroup",
				async: true,
				data: {
					'id': id
				},
				success: function(data) {
					if(data.error_code==0){
						// if(data.data[0].removeTotal>0){
							$.messager.alert("系统提示", "删除成功",'info');
							$("#leftleft1").tree('reload');
						// }
					}else{
                       if(data.data[0].sonGroupTotal >0) {
						  $.messager.alert("系统提示", "删除失败,或请先删除子用户组",'error');
						} else if(data.data[0].userTotal >0){
							$.messager.alert("系统提示", "删除失败,或请先删除用户",'error');
						}else if(data.data[0].roleTotal >0){
							$.messager.alert("系统提示", "删除失败,或请先删除角色",'error');
						}
					}					
				}
			})
		}
	})
}
//点击查询发起请求
function doSearch() {
	$('#dgl').datagrid('load', {
		id: id,
		userName: $('#itemid').val(),
		fullName: $('#productid').val(),
		roleName:$('#Yardmanagementrole').val()
	});
}
//点击重置密码
$('#ResetPassword').click(function(){
     $("#psw").val('123456');
})
//bottom的弹出框保存按钮
function save() {
	var phone = /^1[34578]\d{9}$/;
	var email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	var id=0;
	if(rowid==1){
		var row = $("#dgl").datagrid('getSelected');
		id=row.id
	}
	if($("#_id").val()==''||$("#psw").val()==''||$("#stuname").val()==''||$("#age").val()==''||$("#addressss").val()==''||$("#youxiang").val()==''){
        $.messager.alert('系统提示','必填字段不能为空','warning')
		return;
	}
	if(!phone.test($('#addressss').val())) {
		   $.messager.alert('系统提示','手机号不符合格式','warning')
		   $('#addressss').focus();
		   return;
	}
	if(!email.test($('#youxiang').val())){
        $.messager.alert('系统提示','邮箱不符合格式','warning');
		return;
	}
	if($("#sex").val()==''||$("#sex").val()=='undefined'||$("#sex").val()==null){
        $.messager.alert('系统提示','角色不能为空或先在角色管理页面添加角色','warning');
		return;
	}
	console.log($("#age").val())
	var data = {
		'id': id,
		'userName': $("#_id").val(),
		'userPwd': $("#psw").val(),
		'fullName': $("#stuname").val(),
		'groupId': $("#age").val(),
		'roleId': $("#sex").val(),
		'mobile': $("#addressss").val(),
		'email': $("#youxiang").val()
	}
	$.ajax({
		type: "post",
		url: url,
		async: true,
		data: data,
		success: function(data) {
			if(data.error_code == '0') {
				$.messager.alert("系统提示", "保存成功",'info');
				$('#dlmyModal').modal('hide');
				$("#dgl").datagrid("reload");
			}else if(data.error_code == '10008') {
				$.messager.alert("系统提示", "用户名重复",'warning');
				return;
			}else {
				$.messager.alert("系统提示", "保存失败",'error');
				return;
			}
		}
	});
}
//top弹出框保存按钮
function saveUser() {
	var phone = /^1[34578]\d{9}$/;
	var selected = $("#dg").datagrid('getSelected');
	var data = {
		'id':selected.id,
		'groupName': $("#id").val(),
		'principal': $("#name").val(),
		'phone': $("#phone").val(),
		'email': $("#email").val(),
		'roleId': $("#parlinglotrole").val(),
		'areaId':$("#countyn").val(),
		'address':$("#parlingaddress").val()
	}
	$.each(data,function(v,h){
		if(h==''){
			$.messager.alert('系统提示','必填字段不能为空','warning');
			return;
		}
	})
	if(!phone.test($('#phone').val())) {
		   $.messager.alert('系统提示','手机号不符合格式','warning');
		   $('#phone').focus();
		   return;
	}
	$.ajax({
		type: "post",
		url: server_context+'/updateSonGroup',
		data: data,
		async: true,
		success: function(data) {
			if(data.error_code == 0) {
				$.messager.alert("系统提示", "保存成功",'info');
				$('#mydlgModal').modal('hide')
				$("#dg").datagrid("reload");
				$("#leftleft1").tree('reload');
			} else {
				$.messager.alert("系统提示", "保存失败",'error');
				return;
			}
		}
	});
}
//top编辑按钮
function openUserAddDialog() {
	var selected = $("#dg").datagrid('getSelected');
	console.log(selected)
	if(selected == null) {
		$.messager.alert("系统提示", "请选择要编辑的数据！",'warning');
		return;
	}
	$('#mydlgModal').modal('show')
	//省请求
	$.ajax({
		type:"post",
		url:server_context+"/listArea",
		async:true,
		data:{
			level:1,
		},
		success:function(data){
			var data=data.data
			$("#provinces option").remove();
			for(var i=0;i<data.length;i++){
				if(selected.provinceId==data[i].id){
                   $('<option selected="selected" value='+data[i].id+'>'+data[i].name+'</option>').appendTo('#provinces')
				}else{
				   $('<option value='+data[i].id+'>'+data[i].name+'</option>').appendTo('#provinces')
				}
			}
		}
	});
	//市请求
	$.ajax({
		type:"post",
		url:server_context+"/listArea",
		async:true,
		data:{
			level:2,
			pid:selected.provinceId
		},
		success:function(data){
			var data = data.data
			$("#municipalityg option").remove();
			for(var i=0;i<data.length;i++){
				if(selected.cityId==data[i].id){
                   $('<option selected="selected" value='+data[i].id+'>'+data[i].name+'</option>').appendTo('#municipalityg')
				}else{
					$('<option value='+data[i].id+'>'+data[i].name+'</option>').appendTo('#municipalityg')
				}
			}
		}
	});
	//县请求
	$.ajax({
		type:"post",
		url:server_context+"/listArea",
		async:true,
		data:{
			level:3,
			pid:selected.cityId
		},
		success:function(data){
			var data = data.data
			$("#countyn option").remove();
			for(var i=0;i<data.length;i++){
				if(selected.districtId==data[i].id){
                   $('<option selected="selected" value='+data[i].id+'>'+data[i].name+'</option>').appendTo('#countyn')
				}else{
					$('<option value='+data[i].id+'>'+data[i].name+'</option>').appendTo('#countyn')
				}
			}
		}
	});
	dsValue(selected)
	//角色请求
	$.ajax({
       type: "post",
	   url: server_context+"/listGroupRole",
	   async: true,
	   data:{
		  id:id
	   },
	   success:function(data){
	      data=data.data
		  $('#parlinglotrole option').remove()
		  for(var i=0;i<data.length;i++){
			  if(selected.roleId==data[i].id){
			     $('<option selected="selected" value='+data[i].id+'>'+data[i].name+'</option>').appendTo($('#parlinglotrole'))
			  }else{
				 $('<option value='+data[i].id+'>'+data[i].name+'</option>').appendTo($('#parlinglotrole'))
			  }
		  }
	   }
	})
}
//信息编辑三级联动
function pros(value){
	var id = value;
	$.ajax({
		type:"post",
		url:server_context+"/listArea",
		async:true,
		data:{
			level:2,
			pid:id
		},
		success:function(data){
			$("#municipalityg").find("option").remove();
			for(var i=0;i<data.data.length;i++){
				$('<option value='+data.data[i].id+'>'+data.data[i].name+'</option>').appendTo('#municipalityg')
			}
			var sd = $('#municipalityg').val()
			$.ajax({
				type:"post",
				url:server_context+"/listArea",
				async:true,
				data:{
					level:3,
					pid:sd
				},
				success:function(data){
					$("#countyn").find("option").remove();
					for(var i=0;i<data.data.length;i++){
						$('<option value='+data.data[i].id+'>'+data.data[i].name+'</option>').appendTo('#countyn')
					}
				}
			});
		}
	});
}
//市的onchange事件
function municg(value){
	console.log(value)
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
			$("#countyn").find("option").remove();
			for(var i=0;i<data.data.length;i++){
				$('<option value='+data.data[i].id+'>'+data.data[i].name+'</option>').appendTo('#countyn')
			}
		}
	});
}
//top信息修改,需要往input填写数据
function dsValue(selected) {
	$("#id").val(selected.groupName);
	$("#male").val(selected.userTotal);
	$("#name").val(selected.principal);
	$("#phone").val(selected.phone);
	$("#email").val(selected.email);
	// $("#parlinglotrole").combo('setValue', selected.roleId).combo('setText', selected.roleName);;//角色
	// $("#provinces").val(selected.provinceId);//省
	// $("#municipalityg").val(selected.cityId);//市
	// $("#countyn").val(selected.areaId);//县
	$("#parlingaddress").val(selected.address);//详细地址
}

function convert(data) {
	function exists(data, parentId) {
		for(var i = 0; i < data.length; i++) {
			if(data[i].id == parentId) return true;
		}
		return false;
	}
	var nodes = [];
	// get the top level nodes
	for(var i = 0; i < data.length; i++) {
		var row = data[i];
		if(row.level==1){
            if(!exists(data, row.parentId)) {
				nodes.push({
					id: row.id,
					text: row.name,
					iconCls:'icon-one',
					parendId: row.parendId,
					parentId:row.parentId,
					type:row.type,
					actualId:row.actualId,
					checked:row.checked
				});
			}
		}else if(row.level==2){
            if(!exists(data, row.parentId)) {
				nodes.push({
					id: row.id,
					text: row.name,
					parendId: row.parendId,
					parentId:row.parentId,
					type:row.type,
					actualId:row.actualId,
					checked:row.checked,
					iconCls:'icon-two'
				});
			}
		}
		else if(row.level==3){
            if(!exists(data, row.parentId)) {
				nodes.push({
					id: row.id,
					text: row.name,
					parendId: row.parendId,
					parentId:row.parentId,
					type:row.type,
					actualId:row.actualId,
					checked:row.checked,
					iconCls:'icon-three'
				});
			}
		}
		else if(row.level==4){
            if(!exists(data, row.parentId)) {
				nodes.push({
					id: row.id,
					text: row.name,
					parendId: row.parendId,
					parentId:row.parentId,
					type:row.type,
					actualId:row.actualId,
					checked:row.checked,
					iconCls:'icon-four'
				});
			}
		}else if(row.level==5){
            if(!exists(data, row.parentId)) {
				nodes.push({
					id: row.id,
					text: row.name,
					parendId: row.parendId,
					parentId:row.parentId,
					type:row.type,
					actualId:row.actualId,
					checked:row.checked,
					iconCls:'icon-five'
				});
			}
		}else if(row.level==0||row.type==2){
            if(!exists(data, row.parentId)) {
				nodes.push({
					id: row.id,
					text: row.name,
					parendId: row.parendId,
					parentId:row.parentId,
					type:row.type,
					actualId:row.actualId,
					checked:row.checked,
					iconCls:'icon-eight'
				});
			}
		}else if(row.level==6){
            if(!exists(data, row.parentId)) {
				nodes.push({
					id: row.id,
					text: row.name,
					parendId: row.parendId,
					parentId:row.parentId,
					type:row.type,
					actualId:row.actualId,
					checked:row.checked,
					iconCls:'icon-six'
				});
			}
		}else if(row.level==7){
            if(!exists(data, row.parentId)) {
				nodes.push({
					id: row.id,
					text: row.name,
					parendId: row.parendId,
					parentId:row.parentId,
					type:row.type,
					actualId:row.actualId,
					checked:row.checked,
					iconCls:'icon-seven'
				});
			}
		}
	}
	var toDo = [];
	for(var i = 0; i < nodes.length; i++) {
		toDo.push(nodes[i]);
	}
	while(toDo.length) {
		var node = toDo.shift(); // the parent node
		// get the children nodes
		for(var i = 0; i < data.length; i++) {
			var row = data[i];
			if(row.parentId == node.id) {
				if(row.level==1){
					var child = {
						id: row.id,
						text: row.name,
						parendId: row.parendId,
						parentId:row.parentId,
						type:row.type,
						actualId:row.actualId,
						checked:row.checked,
						iconCls:'icon-one'
					};
				}else if(row.level==2){
                    var child = {
						id: row.id,
						text: row.name,
						parendId: row.parendId,
						parentId:row.parentId,
						type:row.type,
						actualId:row.actualId,
						checked:row.checked,
						iconCls:'icon-two'
					}
				}
				else if(row.level==3){
                    var child = {
						id: row.id,
						text: row.name,
						parendId: row.parendId,
						parentId:row.parentId,
						type:row.type,
						actualId:row.actualId,
						checked:row.checked,
						iconCls:'icon-three'
					}
				}else if(row.level==4){
                    var child = {
						id: row.id,
						text: row.name,
						parendId: row.parendId,
						parentId:row.parentId,
						type:row.type,
						actualId:row.actualId,
						checked:row.checked,
						iconCls:'icon-four'
					}
				}else if(row.level==5){
                    var child = {
						id: row.id,
						text: row.name,
						parendId: row.parendId,
						parentId:row.parentId,
						type:row.type,
						actualId:row.actualId,
						checked:row.checked,
						iconCls:'icon-five'
					}
				}else if(row.level==0||row.type==2){
                        var child = {
							id: row.id,
							text: row.name,
							parendId: row.parendId,
							parentId:row.parentId,
							type:row.type,
							actualId:row.actualId,
							checked:row.checked,
							iconCls:'icon-eight'
					}
				}else if(row.level==6){
                    var child = {
						id: row.id,
						text: row.name,
						parendId: row.parendId,
						parentId:row.parentId,
						type:row.type,
						actualId:row.actualId,
						checked:row.checked,
						iconCls:'icon-six'
					}
				}else if(row.level==7){
                    var child = {
						id: row.id,
						text: row.name,
						parendId: row.parendId,
						parentId:row.parentId,
						type:row.type,
						actualId:row.actualId,
						checked:row.checked,
						iconCls:'icon-seven'
					}
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
// <input type="text" class="usergroup" id="age">
//最下侧新增用户
function openUserAdd() {
	$("#fmmm").form("reset"); //打开之前先清空数据
	$('#_id').attr("disabled", false);
	$('#dlmyModal').modal('show');
	$('.dlmyModaltitle').text('新增用户')
	$('.roles option').remove()
	$('#ResetPassword').css('display','none')
    $('#psw').removeAttr('disabled','disabled')
	$('.usergroupfmm input').remove();
	$('.usergroupfmm span').remove();
	$('<input type="text" class="usergroup" id="age">').appendTo('.usergroupfmm')
	url = server_context+'/saveUser';
	rowid=0
	$('.usergroup option').remove()
	var trees = $("#leftleft1").tree('getSelected')
	//bottom弹出框的用户组树
    $('.usergroup').val(trees.text).attr('name',trees.id)
	//bottom弹出框的角色组树
	$.ajax({
		type: "post",
		url: server_context+"/listGroupRole",
		async: true,
		data:{
			id:trees.id 
		},
		success:function(data){
			data=data.data
			$('.roles option').remove()
			for(var i=0;i<data.length;i++){
				$('<option value='+data[i].id+'>'+data[i].name+'</option>').appendTo($('.roles'))
			}
		}
	})
}

//最下侧删除用户
function deleteUser() {
	var selectedrow = $("#dgl").datagrid('getSelected');
	if(selectedrow == null) {
		$.messager.alert("系统提示", "请选择要删除的数据！",'warning');
		return;
	}
	var id = selectedrow.id;
	$.messager.confirm("系统提示", "您确认要删除这条数据吗？", function(r) {
		if(r) {
			$.post(server_context+"/removeUser", {
				id: id
			}, function(data) {
				if(data.error_code == 0) {
					$.messager.alert("系统提示", "数据已成功删除",'info');
					$("#dgl").datagrid("reload");
					$("#dg").datagrid("reload");
				} else {
					$.messager.alert("系统提示", "数据删除失败！",'error');
				}
			}, "json");
		}
	});
}

function dispValue(row) {
	$("#_id").val(row.userName);
	$("#psw").val('******');
	$("#stuname").val(row.fullName);
	$("#addressss").val(row.mobile);
	$("#youxiang").val(row.email);
	// $('#age').combo('setValue', row.groupId).combo('setText', row.groupName);
	$('.usergroup').combotree({
		url:server_context+'/listGroupTree',
		method:'post',
		required:true,
		loadFilter: function(data) {
			var data =data.data
			return convert(data);
		},
		onLoadSuccess: function (node, data){
			$('#age').combo('setValue', row.groupId).combo('setText', row.groupName);  
		}
		// onSelect: function(node) {
		// 	return usergroup(node);
		// }
	})
	$.ajax({
       type: "post",
	   url: server_context+"/listGroupRole",
	   async: true,
	   data:{
		  id:row.groupId
	   },
	   success:function(data){
	      data=data.data
		  $('.roles option').remove()
		  for(var i=0;i<data.length;i++){
			  if(row.roleId==data[i].id){
			     $('<option selected="selected" value='+data[i].id+'>'+data[i].name+'</option>').appendTo($('.roles'))
			  }else{
				 $('<option value='+data[i].id+'>'+data[i].name+'</option>').appendTo($('.roles'))
			  }
			  
		  }
	   }
	})
	$.ajax({
       type: "post",
	   url: server_context+"/listGroupRole",
	   async: true,
	   data:{
		  id:row.groupId
	   },
	   success:function(data){
	      data=data.data
		  $('.roles option').remove()
		  for(var i=0;i<data.length;i++){
			  if(row.roleId==data[i].id){
			     $('<option selected="selected" value='+data[i].id+'>'+data[i].name+'</option>').appendTo($('.roles'))
			  }else{
				 $('<option value='+data[i].id+'>'+data[i].name+'</option>').appendTo($('.roles'))
			  }
			  
		  }
	   }
	})
}
//最下侧修改用户
function openUserModifyDialog() {
	$('#_id').attr("disabled", true);
	var row = $("#dgl").datagrid('getSelected');
	console.log(row)
	if(row == null) {
		$.messager.alert("系统提示", "请选择一条数据进行修改",'warning');
		return;
	}
	$('#dlmyModal').modal('show');
	$('.usergroupfmm input').remove();
	$('.usergroupfmm span').remove();
	$('<input type="text" class="usergroup" id="age">').appendTo('.usergroupfmm')
	$('.dlmyModaltitle').text('修改用户信息')
	$('#ResetPassword').css('display','')
	$('#psw').attr('disabled','disabled')
	dispValue(row);
	url = server_context+'/updateUser';
	rowid=1;
}


/************************1.2系统管理---角色管理*******************************/
/******角色列表********/
var roleId;//角色真实ID
var id1;//判断用户组，角色的ID
$('.rolemanagement').css('display', 'none') //放Js上边上边,不要最上边,在页面节点创建完之后
$('#managementli2').click(function() {
	    clearInterval(seti);
	    id1=1;
		$('.addrole').css('display', 'none')
		$('.removerole').css('display', 'none')
		$('.roleListtwobottom').css('display', 'none')
		$('.rolebasedinbottom').css('display', 'none')
		$('.roleListtwo-addmove').css('display', 'none')
		$('main>div').css('display', 'none')
		$('.rolemanagement').css('display', '')
			//权限判断
		var data = {
			id: $('#managementli2').attr('name')
		}
		$.post(server_context+'/setMenuId', data, function(data) {
			for(var i=0;i<data.data.length;i++){
				if(data.data[i]==10){
					$('.addrole').css('display', '')
				}
				if(data.data[i]==11){
					$('.removerole').css('display', '')
				}
				if(data.data[i]==12){
					
				}
			}
		})
		//角色列表树开始加载
		$('.roleListonebottom').tree({
			url: server_context+'/listRoleTree',
			method: 'post',
			animate: 'true',
			loadFilter: function(data) {
				var rows=data.data;
				return convertjs(rows);
			},
			onSelect: function(node) {
				console.log(node)
				return tree(node);
			}
		})
	})
function convertjs(rows) {
	function exists(rows, parentId) {
		for(var i = 0; i < rows.length; i++) {
			if(rows[i].id == parentId) return true;
		}
		return false;
	}
	var nodes = [];
	for(var i = 0; i < rows.length; i++) {
		var row = rows[i];
		if(row.type==1){
			if(!exists(rows, row.parentId)) {
				nodes.push({
					id: row.id,
					text: row.name,
					iconCls:'icon-juesetubiao',
					parendId: row.parendId,
					parentId:row.parentId,
					type:row.type,
					actualId:row.actualId,
					checked:row.checked
				});
			}
		}else if(row.type==2){
            if(!exists(rows, row.parentId)) {
				nodes.push({
					id: row.id,
					text: row.name,
					iconCls:'icon-bianzutubiao',
					parendId: row.parendId,
					parentId:row.parentId,
					type:row.type,
					actualId:row.actualId,
					checked:row.checked
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
				if(row.type==2){
				   var child = {
						id: row.id,
						text: row.name,
						iconCls:'icon-juesetubiao',
						parendId: row.parendId,
						parentId:row.parentId,
						type:row.type,
						actualId:row.actualId,
						checked:row.checked
					};
		    	}else if(row.type==1){
					var child = {
						id: row.id,
						text: row.name,
						iconCls:'icon-bianzutubiao',
						parendId: row.parendId,
						parentId:row.parentId,
						type:row.type,
						actualId:row.actualId,
						checked:row.checked
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
function convsss(rows) {
	function exists(rows, parentId) {
		for(var i = 0; i < rows.length; i++) {
			if(rows[i].id == parentId) return true;
		}
		return false;
	}
	var nodes = [];
	for(var i = 0; i < rows.length; i++) {
		var row = rows[i];
		if(!exists(rows, row.parentId)) {
			nodes.push({
				id: row.id,
				text: row.name,
				actualId:row.actualId,
				checked:row.checked,
				type:row.type,
				parendId:row.parendId
			});
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
				var child = {
					id: row.id,
					text: row.name,
					actualId:row.actualId,
				    checked:row.checked,
					type:row.type,
				    parendId:row.parendId
				};
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
//判断选中的值加载数据
function tree(node) {
	$('.roleListtwobottom').css('display', '')
	$('.rolebasedinbottom').css('display', '')
	$('.rightright').css('display', '')
	var tr = node.id;
	id1 = node.id;
	roleId = node.actualId;
	//规则设置选中角色获取ID发起请求
	$.ajax({
		type:"post",
		url:server_context+"/listRoleRule",
		async:true,
		data:{
			roleId:roleId
		},
		success:function(data){
			$('.ruleinput input').remove()
			$('.ruleinput').html('')
			for(var i=0;i<data.data.length;i++){
				if(data.data[i].status==0){
					$('<input name="aaa" type="radio" value='+data.data[i].id+'>'+data.data[i].ruleName+'</input>').appendTo('.ruleinput')
				}else if(data.data[i].status==1){
					$('<input name="aaa" type="radio" checked="checked" value='+data.data[i].id+'>'+data.data[i].ruleName+'</input>').appendTo('.ruleinput')
				}
			}
		}
	});
    if(node.type==2){
    	$('.roleListtwobottom').tree({
    		url: server_context+'/listRolePrivilegeTree',
    		method: 'post',
    		animate: 'true',
    		checkbox: 'true',
    		queryParams: {
    			id: node.actualId
    		},
    		loadFilter: function(data) {
    			var rows=data.data;
    			return convsss(rows);
    		},
    		onCheck:function(node,checked){
    			$('.roleListtwo-addmove').css('display', '')
    			$('.roleListtwo-addmove').css('display','')
		    	if(node.type==2){
		 	    	if(checked){
				    	var parent=$('.roleListtwobottom').tree('getParent',node.target);
				    	var allChildren=getChildren(parent.id);
				    	var children = allChildren[0];
				    	$(".roleListtwobottom").tree('check',children.target);
			    	}
		    	}
    		}
    	})
    	//某一节点下的所有子节点
		function getChildren(id/*节点ID*/){
		    var $tree = $('.roleListtwobottom');
		    var node = $tree.tree('find',id);
		    var childrenNodes = $tree.tree('getChildren',node.target);
		    return childrenNodes;
		}
    	$('#rolebasedinbottom-b').datagrid({
    		url: server_context+"/listRoleUser",
    		singleSelect: 'true',
    		rownumbers: "true",
    		fit: 'true',
    		fitColumns: 'true',
    		nowrap: 'true',
			pageSize:50,
    		pagination: "true",
    		queryParams: {
    			id: node.actualId
    		}
    	})
    }else{
    	$('.roleListtwo-addmove').css('display','none')
        $('.roleListtwobottom').css('display','none')
	    $('.rolebasedinbottom').css('display','none')
    }
}
//规则设置的点击事件
$('.rulediv').click(function(){
	if(id1 != 0){
		$.messager.alert("系统提示", "请选择角色进行规则设置",'warning');
	}
	if(id1 == 0){
		$("#rulessmyModal").modal('show');
	}
})
//规则设置的保存按钮
function ruleadd(){
	if(id1==1){
       return;
	}
	$.ajax({
		type: "post",
		url: server_context+"/saveRoleRule",
		async: true,
		data:{
			roleId:roleId,
			ruleId:$('input:radio[name="aaa"]:checked').val()
		},
		success:function(data){
			if(data.error_code==0){
				$.messager.alert("系统提示","规则保存成功",'info')
				$("#rulessmyModal").modal('hide');
			}
		}
	})
}

//添加权限的保存
function roleadd() {
	if(roleId==1){
	   $.messager.alert('系统提示','超级管理员权限不能修改','warning')
       return;
	}
	var data = $('.roleListtwobottom').tree('getChecked')
	var id = [];
	for(var i = 0; i < data.length; i++) {
		if(data[i].type == 2) {
			//			console.log(data[i])
			var idd;
			idd = data[i].actualId;
			id.push(idd)
		}
	}
	var add = {
		RoleOperationIds: id.join(","),
		roleId: roleId
	}
	console.log(add);
	$.ajax({
		type: "post",
		url: server_context+"/saveRolePrivilege",
		async: true,
		data: add, //这个地方要字符串
		success: function(data) {
			console.log(data)
			if(data.error_code==0){
				$.messager.alert('系统提示','权限保存成功','info')
			}
		}
	});
}

$('.addrole').linkbutton({
	text: '添加角色',
	iconCls: 'icon-tianjiaa'
})
$('.removerole').linkbutton({
	text: '删除角色',
	iconCls: 'icon-shanchu'
})
//添加角色按钮
function treeadds(){
	console.log(id1)
	if(!id1) {
		$.messager.alert("系统提示", "请选择用户组进行添加",'warning');
		return;
	}
	$('#myModalfmm').modal('show')
}
//添加角色保存按钮
function addrole() {
	if($('#treenameo').val()==''){
        $.messager.alert('系统提示','不能为空','warning');
		return;
	}
	$.ajax({
		type: "post",
		url: server_context+"/saveRole",
		async: true,
		data: {
			groupId: id1,
			'roleName': $('#treenameo').val()
		},
		success: function(data) {
			console.log(data)
			if(data.error_code == 0) {
				$.messager.alert("系统提示", "添加成功",'info');
				$('#myModalfmm').modal('hide');
				$(".roleListonebottom").tree('reload');
			}
		}
	});
}
//删除角色
function treeremove() {
	console.log(id1)
	if(id1!=0){
		$.messager.alert("系统提示", "请选择角色进行删除");
		return;
	}
	if(id1==0) {
		$.messager.confirm("系统提示", "您确认要删除此角色吗？", function(r) {
			if(r) {
				$.ajax({
					type: "post",
					url: server_context+"/removeRole",
					async: true,
					data: {
						roleId: roleId
					},
					success: function(data) {
						console.log(data)
						if(data.error_code == 0) {
							$.messager.alert("系统提示", "删除成功",'info');
							$(".roleListonebottom").tree('reload');
						} else {
							$.messager.alert("系统提示", "删除失败,或请先删除子角色",'error');
						}
					}
				})
			}
		})
	}
	
}

/************************1.3系统管理---IP管理*******************************/
var operateIp=0;//操作ip的权限
$('.accessmanagement').css('display', 'none')
$('#managementli3').click(function() {
		clearInterval(seti);
		$('#addressip').val('')
		$('main>div').css('display', 'none');
		$('.accessmanagement').css('display', '');
		//权限判断
        var data = {
		  id: $('#managementli3').attr('name')
		}
		$.post(server_context+'/setMenuId', data, function(data) {
			for(var i=0;i<data.data.length;i++){
				if(data.data[i]==15){
					$('#addIp').css('display', '')
				}
				if(data.data[i]==16){
					$('#removeIp').css('display', '')
				}
				if(data.data[i]==17){
                    operateIp=data.data[i]
				}
			}
		})
		//请求归属车场的请求
		$.ajax({
			type:"post",
			url:server_context+"/listTopGroup",
			async:true,
			success:function(data){
				$("#parkingip").find("option").nextAll().remove();
   	  		    $("#ddlRegType").find("option").remove();
				for(var i = 0;i<data.data.length;i++){
					$('<option value='+data.data[i].id+'>'+data.data[i].groupName+'</option>').appendTo('#parkingip')
					$('<option value='+data.data[i].id+'>'+data.data[i].groupName+'</option>').appendTo('#ddlRegType')
				}
			}
		});

		//加载下侧ip表
		$('#dgip').datagrid({
			url: server_context+'/listAccess',
			method: 'post',
			singleSelect: 'true',
			fit: 'true',
			fitColumns: 'true',
			rownumbers: 'true',
			pageSize:50,
			pagination: "true",
			queryParams: {
				ipAddress:$('#addressip').val(),
			    groupId:$('#parkingip').val()
			},
			columns:[[
			    { field:"cb",checkbox:"true",align:"center"},
				{ field:"ipAddress",title:'IP地址',align:"center",width: '25%'},
				{ field:"topGroupName",title:'归属车场',align:"center",width: '25%'},
				{ field:"status",title:'操作',align:"center",width: '24%',
				   formatter: function (value, row, index) {
  					  var value=row['status'];
  					  if(value==1){
  					  	return '<a style="background:#7DAE16;color:white;display:inline-block;width:60px" href=\javaScript:ownerVerify()>'+"已启用"+'</a>';
  					  }else{
  					  	return '<a style="background:#666666;color:white;display:inline-block;width:60px" href=\javaScript:ownerVerify()>'+"未启用"+'</a>';
  					  }
    				}
				},
				{ field:"ts",title:'创建时间',align:"center",width: '25%'}
			]]
		})
	})
	 //启动禁用ip
   function ownerVerify(){
   	  var row = $("#dgip").datagrid('getSelected');
	  if(operateIp==17){
		  $.ajax({
			type:"post",
			url:server_context+"/updateAccessStatus",
			async:true,
			data:{
				id:row.id,
				status:row.status
			},
			success:function(data){
				if(data.error_code==0){
					$("#dgip").datagrid('reload')
				}
			}
		});
	  }else{
		  $.messager.alert('系统提示','你不具备操作ip的权限','warning')
	  }
   	  
   }
//新增ip保存按钮
function saveip() {
	var ips = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
	if($('#firstname').val()==''||$('#ddlRegType').val()==''){
        $.messager.alert('系统提示','必填字段不能为空','warning')
		return;
	}
	if(!ips.test($('#firstname').val())) {
		   $.messager.alert('系统提示','请输入正确的ip地址','warning')
		   $('#firstname').focus();
		   return;
	}
	$.ajax({
		type: "post",
		url: server_context+"/saveAccess",
		async: true,
		data: {
			ipAddress:$('#firstname').val(),
	 		groupId:$('#ddlRegType').val()
		},
		success: function(data) {
			if(data.error_code==0){
				$.messager.alert("系统提示", "IP新增成功！",'info');
				$('#myModalip').modal('hide');
				$("#dgip").datagrid("reload");
			}else if(data.error_code == 10008){
                $.messager.alert("系统提示", "IP重复",'error');
			}else{
				$.messager.alert("系统提示", "IP添加失败",'error');
			}
		}
	});
	$("#dlip").dialog("close");
}
//删除ip
function deleteUserip() {
	var row = $("#dgip").datagrid('getSelected');
	if(row == null) {
		$.messager.alert("系统提示", "请选择一条IP进行删除",'warning');
		return;
	}
	var id = row.id;
	$.messager.confirm("系统提示", "您确认要删除这条IP吗？",function(r) {
		if(r) {
			$.post(server_context+"/removeAccess", {
				id: id
			}, function(data) { //result直接返回Object，所以无需转换为json
				if(data.error_code == 0) {
					$.messager.alert("系统提示", "IP删除成功",'info');
					$("#dgip").datagrid("reload");
				}else {
					$.messager.alert("系统提示", "IP删除失败",'error');
				}
			}, "json");
		}
	});
}
//查询按钮
function inquire() {
	$('#dgip').datagrid({
		url: server_context+'/listAccess',
		method: 'post',
		singleSelect: 'true',
		fit: 'true',
		fitColumns: 'true',
		rownumbers: 'true',
		queryParams: {
			ipAddress:$('#addressip').val(),
	        groupId:$('#parkingip').val()
		}
	})
}

/************************1.4系统管理---日志管理*******************************/
$('.systemLog').css('display','none')
$('.systemLog-bottom-bottomtwo').css('display','none');
$('#managementli4').click(function(){
	clearInterval(seti);
	$('.LoguserName').val(''),
	$('.Logstarttime').val(''),
	$('.Logfinishtime').val(''),
	$('.Logaddress').val('')
	$('main>div').css('display', 'none')
	$('.systemLog').css('display','')
	//登陆日志表的请求
	$('#Logform').datagrid({
		url:server_context+'/listLoginLog',
		method: 'post',
		singleSelect: 'true',
		fit: 'true',
		fitColumns: 'true',
		rownumbers: 'true',
		pageSize:50,
		pagination: "true",
		columns:[[
		    {field:"userName",title:'用户名',align:"center",width: '20%'},
		    {field:"ipAddress",title:'ip地址',align:"center",width: '20%'},
		    {field:"content",title:'内容',align:"center",width: '20%'},
		    {field:"status",title:'状态',align:"center",width: '20%',
		        formatter:function(value, rows, index){
		        	var value = rows['status']
		        	if(value==1){
		        		return '<a>'+"成功"+'</a>';
		        	}else{
		        		return '<a style="color:red">'+"失败"+'</a>';
		        	}
		        }
		    },
		    { field:"ts",title:'时间',align:"center",width: '20%'}
		]]
	})
})
$('#Logs').click(function(){
	$('#Logs').css('background','white');
	$('#operates').css('background','#E5E5E5');
	$('.systemLog-bottom-bottomone').css('display','');
    $('.systemLog-bottom-bottomtwo').css('display','none');
})

$('#operates').click(function(){
   $('#operates').css('background','white');
   $('#Logs').css('background','#E5E5E5');
   $('.systemLog-bottom-bottomtwo').css('display','');
   $('.systemLog-bottom-bottomone').css('display','none');
   //操作日志
	//操作模块树
	$('.operatemenuName').combotree({
		url:server_context+'/',
		method:'post',
		required:true,
		loadFilter: function(data) {
			return convert(data);
		}
	})
	//操作日志表的请求
	$('#operateLog').datagrid({
		url:server_context+'/listOperateLog',
		method: 'post',
		singleSelect: 'true',
		fit: 'true',
		fitColumns: 'true',
		rownumbers: 'true',
		pageSize:50,
		pagination: "true",
		columns:[[
		    {field:"userName",title:'用户名',align:"center",width: '20%'},
		    {field:"menuName",title:'菜单名',align:"center",width: '20%'},
		    {field:"content",title:'内容',align:"center",width: '20%'},
		    {field:"operationType",title:'类型',align:"center",width: '20%',
		        formatter:function(value, rows, index){
		        	var value = rows['operationType']
		        	if(value==1){
		        		return '<a style="color:black">'+"增加"+'</a>';
		        	}else if(value==2){
		        		return '<a style="color:red">'+"删除"+'</a>';
		        	}else{
		        		return '<a>'+"修改"+'</a>';
		        	}
		        }
		    },
		    { field:"ts",title:'时间',align:"center",width: '20%'}
		]]
	})	
})
//登录日志查询
$('.Loginquire').click(function(){
	$('#Logform').datagrid('load',{
		userName:$('.LoguserName').val(),
		startTime:$('.Logstarttime').val(),
		endTime:$('.Logfinishtime').val(),
		ipAddress:$('.Logaddress').val()
	})
})
//操作日志查询
$('.operateinquire').click(function(){
	console.log($('.operatemenuName').val())
	$('#operateLog').datagrid('load',{
		userName:$('.operateName').val(),
		startTime:$('.operatestarttime').val(),
		endTime:$('.operatefinishtime').val(),
		type:$('.operatetype').val(),
		menuName:$('.operatemenuName').val()
	})
})



