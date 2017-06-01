
var localObj = window.location;

var contextPath = localObj.pathname.split("/")[1];

var basePath = localObj.protocol+"//"+localObj.host+"/"+contextPath;

var server_context=basePath;

function Statuscodeprompt(code,msg,img){
    if(code==10001){
        $.messager.alert('系统提示','未知错误','error');
	}else if(code==10002){
		$.messager.alert('系统提示','验证码验证失败','error');
	}else if(code==10003){
		$.messager.alert('系统提示','登录失败','error');
	}else if(code==10004){
		$.messager.alert('系统提示','查询失败','error');
	}else if(code==10005){
		$.messager.alert('系统提示','保存失败','error');
	}else if(code==10006){
		$.messager.alert('系统提示','修改失败','error');
	}else if(code==10007){
		$.messager.alert('系统提示','删除失败','error');
	}else if(code==10008){
		$.messager.alert('系统提示','名称重复','error');
	}else if(code==10009){
		$.messager.alert('系统提示','存在关系','error');
	}else if(code==10010){
		$.messager.alert('系统提示','注销失败（用户退出）','error');
	}else if(code==10011){
		$.messager.alert('系统提示','系统错误','error');
	}else if(code==10012){
		$.messager.alert('系统提示','文件保存失败','error');
	}else if(code==10013){
		$.messager.alert('系统提示','原设备无信息','error');
	}else if(code==10014){
		$.messager.alert('系统提示','新设备无信息','error');
	}else if(code==10015){
		$.messager.alert('系统提示','原设备未绑定车主','error');
	}else if(code==10016){
		$.messager.alert('系统提示','新设备已绑定车主','error');
	}else if(code==10017){
		$.messager.alert('系统提示','手机号码重复','error');
	}else if(code==10018){
		$.messager.alert('系统提示','车架号重复','error');
	}else if(code==10019){
		$.messager.alert('系统提示','车牌号重复','error');
	}else if(code==10020){
		$.messager.alert('系统提示','格式错误','error');
	}else if(code==10021){
		$.messager.alert('系统提示','设备编号重复','error')
	}else if(code==10022){
		$.messager.alert('系统提示','电控单元序列号重复','error');
	}else if(code==10023){
		$.messager.alert('系统提示','车系代码重复','error');
	}else if(code==10024){
		$.messager.confirm('系统提示','会话超时,重新登录',function(r){
			if(r){
                location.href='login.jsp'
			}
		});
	}else if(code==10025){
		$.messager.alert('系统提示','文件名称格式不正确','error');
	}else if(code==10026){
		$.messager.alert('系统提示','发送失败','error');
	}else if(code==10027){
		$.messager.alert('系统提示','Redis无数据','error');
	}else if(code==10028){
		$.messager.alert('系统提示','导出失败','error');
	}else if(code==10029){
		$.messager.alert('系统提示','未找到设备','error');
	}else if(code==10030){
		$.messager.alert('系统提示','读取失败','error');
	}else{
		$.messager.alert('系统提示',msg,img);
	}
}
function inputteshu(obj){
	obj.value = obj.value.replace(/\s+/g,'');   //空格验证替换
	obj.value = obj.value.replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')  //特殊字符正则替换
}
function dataProcessing(value){
	if(value ==null || value =="" || value =="undefined"){
			return "--"
	}
	return value;
}
/************************1.1进入主页*******************************/
var account = $.cookie('account');
$('.accounts').html(account);
//用户名点击事件,修改密码以及退出登录
$('#pswquit').click(function(event){
	var src = $('.nav-right-right-tb').attr('src')
	if(src=='img/imagess/daohangjiantoux.png'){
		$('.nav-right-right-tb').attr('src','img/imagess/daohangjiantous.png')
		$('.nav-right-right-xl').css('display','');
	}else if(src=='img/imagess/daohangjiantous.png'){
		$('.nav-right-right-tb').attr('src','img/imagess/daohangjiantoux.png')
		$('.nav-right-right-xl').css('display','none');
	}
	event.stopPropagation();
})
$(document).on("click", function () {
	//对document绑定一个隐藏Div方法
	$('.nav-right-right-tb').attr('src','img/imagess/daohangjiantoux.png');
	$('.nav-right-right-xl').css('display','none');
});

//修改密码事件
function amendpsw(){
    $('#myModal').modal('show');
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
		   Statuscodeprompt(data.error_code,'密码修改失败','error')
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
		   }else{
			   Statuscodeprompt(data.error_code)
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
			$('<div class="panel bscolor" style="position:relative"></div>').appendTo('#accordion')
		}
		$("<div class='panel-img'>"+'<img src="">'+"</div>").appendTo('.panel')
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
		$('<img src="img/leftimg/shouqi.png" alt="" />').appendTo('.down') 
		$('<img src="img/leftimg/yuanhuanw.png">').appendTo($('.management>li'))
	}
});
//修改每个ui所指向的li
for(var i = 0; i < $('.panel').length; i++) {
	if($('.h4-a').eq(i).text() == '系统管理') {
		$('.h4-a').eq(i).attr('name','collapseOne')
        $('.panel-img').eq(i).find('img').attr('src','img/leftimg/xitongguanliw.png')
		$('.panel-img').eq(i).attr('id','panel-img1')
	}
	if($('.h4-a').eq(i).text() == '车主管理') {
		$('.h4-a').eq(i).attr('name','collapseTwo')
		$('.h4-a').eq(i).attr('href', '#collapseTwo')
		$('.panel-collapse').eq(i).attr('id', 'collapseTwo')
		$('.panel-img').eq(i).find('img').attr('src','img/leftimg/chezhuw.png')
		$('.panel-img').eq(i).attr('id','panel-img2')
	}
	if($('.h4-a').eq(i).text() == '设备管理') {
		$('.h4-a').eq(i).attr('name','collapseThree')
		$('.h4-a').eq(i).attr('href', '#collapseThree')
		$('.panel-collapse').eq(i).attr('id', 'collapseThree')
		$('.panel-img').eq(i).find('img').attr('src','img/leftimg/shebeiw.png')
		$('.panel-img').eq(i).attr('id','panel-img3')
	}
	if($('.h4-a').eq(i).text() == '数据查询') {
		$('.h4-a').eq(i).attr('name','collapseFour')
		$('.h4-a').eq(i).attr('href', '#collapseFour')
		$('.panel-collapse').eq(i).attr('id', 'collapseFour')
		$('.panel-img').eq(i).find('img').attr('src','img/leftimg/shebeichaw.png')
		$('.panel-img').eq(i).attr('id','panel-img4')
	}
	if($('.h4-a').eq(i).text() == '升级管理') {
		$('.h4-a').eq(i).attr('name','collapseFive')
		$('.h4-a').eq(i).attr('href', '#collapseFive')
		$('.panel-collapse').eq(i).attr('id', 'collapseFive')
		$('.panel-img').eq(i).find('img').attr('src','img/leftimg/shengjiw.png')
		$('.panel-img').eq(i).attr('id','panel-img5')
	}
	if($('.h4-a').eq(i).text() == '应用管理') {
		$('.h4-a').eq(i).attr('name','collapseSix')
		$('.h4-a').eq(i).attr('href', '#collapseSix')
		$('.panel-collapse').eq(i).attr('id', 'collapseSix')
		$('.panel-img').eq(i).find('img').attr('src','img/leftimg/yingyongw.png')
		$('.panel-img').eq(i).attr('id','panel-img6')
	}
	if($('.h4-a').eq(i).text() == '呼叫中心') {
		$('.h4-a').eq(i).attr('name','collapseSeven')
		$('.h4-a').eq(i).attr('href', '#collapseSeven')
		$('.panel-collapse').eq(i).attr('id', 'collapseSeven')
		$('.panel-img').eq(i).find('img').attr('src','img/leftimg/hujiaow.png')
		$('.panel-img').eq(i).attr('id','panel-img7')
	}
	if($('.h4-a').eq(i).text()=='车型管理'){
		$('.h4-a').eq(i).attr('name','collapseeight')
		$('.h4-a').eq(i).attr('href','#collapseeight')
		$('.panel-collapse').eq(i).attr('id','collapseeight')
		$('.panel-img').eq(i).find('img').attr('src','img/leftimg/chexingw.png')
		$('.panel-img').eq(i).attr('id','panel-img8')
	}
	if($('.h4-a').eq(i).text()=='总线录制'){
		$('.h4-a').eq(i).attr('name','collapseten')
		$('.h4-a').eq(i).attr('href','#collapseten')
		$('.panel-collapse').eq(i).attr('id','collapseten')
		$('.panel-img').eq(i).find('img').attr('src','img/leftimg/zongxianw.png')
		$('.panel-img').eq(i).attr('id','panel-img9')
	}
	if($('.h4-a').eq(i).text()=='推送管理'){
		$('.h4-a').eq(i).attr('name','collapseeleven')
		$('.h4-a').eq(i).attr('href','#collapseeleven')
		$('.panel-collapse').eq(i).attr('id','collapseeleven')
		$('.panel-img').eq(i).find('img').attr('src','img/leftimg/tuisongw.png')
		$('.panel-img').eq(i).attr('id','panel-img10')
	}
}
$('.h4-a[name=collapseOne]').click(function(){
	$('.h4-a').css('color','#bbe0fb')
	if($('#panel-img1').find('img').attr('src')=='img/leftimg/xitongguanlix.png'){
        $('#panel-img1').find('img').attr('src','img/leftimg/xitongguanliw.png')
		$('.h4-a[name=collapseOne]').css('color','#bbe0fb')
	}else{
		$('#panel-img1').find('img').attr('src','img/leftimg/xitongguanlix.png')
		$('.h4-a[name=collapseOne]').css('color','#ff7e00')
	}
	$('#panel-img2').find('img').attr('src','img/leftimg/chezhuw.png')
	$('#panel-img3').find('img').attr('src','img/leftimg/shebeiw.png')
	$('#panel-img4').find('img').attr('src','img/leftimg/shebeichaw.png')
	$('#panel-img5').find('img').attr('src','img/leftimg/shengjiw.png')
	$('#panel-img6').find('img').attr('src','img/leftimg/yingyongw.png')
	$('#panel-img7').find('img').attr('src','img/leftimg/hujiaow.png')
	$('#panel-img8').find('img').attr('src','img/leftimg/chexingw.png')
	$('#panel-img9').find('img').attr('src','img/leftimg/zongxianw.png')
	$('#panel-img10').find('img').attr('src','img/leftimg/tuisongw.png')
})
$('.h4-a[name=collapseTwo]').click(function(){
	$('.h4-a').css('color','#bbe0fb')
	if($('#panel-img2').find('img').attr('src')=='img/leftimg/chezhux.png'){
        $('#panel-img2').find('img').attr('src','img/leftimg/chezhuw.png')
		$('.h4-a[name=collapseTwo]').css('color','#bbe0fb')
	}else{
		$('#panel-img2').find('img').attr('src','img/leftimg/chezhux.png')
		$('.h4-a[name=collapseTwo]').css('color','#ff7e00')
	}
    $('#panel-img1').find('img').attr('src','img/leftimg/xitongguanliw.png')
	$('#panel-img3').find('img').attr('src','img/leftimg/shebeiw.png')
	$('#panel-img4').find('img').attr('src','img/leftimg/shebeichaw.png')
	$('#panel-img5').find('img').attr('src','img/leftimg/shengjiw.png')
	$('#panel-img6').find('img').attr('src','img/leftimg/yingyongw.png')
	$('#panel-img7').find('img').attr('src','img/leftimg/hujiaow.png')
	$('#panel-img8').find('img').attr('src','img/leftimg/chexingw.png')
	$('#panel-img9').find('img').attr('src','img/leftimg/zongxianw.png')
	$('#panel-img10').find('img').attr('src','img/leftimg/tuisongw.png')
})
$('.h4-a[name=collapseThree]').click(function(){
	$('.h4-a').css('color','#bbe0fb')
	if($('#panel-img3').find('img').attr('src')=='img/leftimg/shebeix.png'){
        $('#panel-img3').find('img').attr('src','img/leftimg/shebeiw.png')
		$('.h4-a[name=collapseThree]').css('color','#bbe0fb')
	}else{
		$('#panel-img3').find('img').attr('src','img/leftimg/shebeix.png')
		$('.h4-a[name=collapseThree]').css('color','#ff7e00')
	}
	$('#panel-img1').find('img').attr('src','img/leftimg/xitongguanliw.png')
	$('#panel-img2').find('img').attr('src','img/leftimg/chezhuw.png')
	$('#panel-img4').find('img').attr('src','img/leftimg/shebeichaw.png')
	$('#panel-img5').find('img').attr('src','img/leftimg/shengjiw.png')
	$('#panel-img6').find('img').attr('src','img/leftimg/yingyongw.png')
	$('#panel-img7').find('img').attr('src','img/leftimg/hujiaow.png')
	$('#panel-img8').find('img').attr('src','img/leftimg/chexingw.png')
	$('#panel-img9').find('img').attr('src','img/leftimg/zongxianw.png')
	$('#panel-img10').find('img').attr('src','img/leftimg/tuisongw.png')
})
$('.h4-a[name=collapseFour]').click(function(){
	$('.h4-a').css('color','#bbe0fb')
	if($('#panel-img4').find('img').attr('src')=='img/leftimg/shebeichax.png'){
        $('#panel-img4').find('img').attr('src','img/leftimg/shebeichaw.png')
		$('.h4-a[name=collapseFour]').css('color','#bbe0fb')
	}else{
		$('#panel-img4').find('img').attr('src','img/leftimg/shebeichax.png')
		$('.h4-a[name=collapseFour]').css('color','#ff7e00')
	}
	$('#panel-img1').find('img').attr('src','img/leftimg/xitongguanliw.png')
	$('#panel-img2').find('img').attr('src','img/leftimg/chezhuw.png')
	$('#panel-img3').find('img').attr('src','img/leftimg/shebeiw.png')
	$('#panel-img5').find('img').attr('src','img/leftimg/shengjiw.png')
	$('#panel-img6').find('img').attr('src','img/leftimg/yingyongw.png')
	$('#panel-img7').find('img').attr('src','img/leftimg/hujiaow.png')
	$('#panel-img8').find('img').attr('src','img/leftimg/chexingw.png')
	$('#panel-img9').find('img').attr('src','img/leftimg/zongxianw.png')
	$('#panel-img10').find('img').attr('src','img/leftimg/tuisongw.png')
})
$('.h4-a[name=collapseFive]').click(function(){
	$('.h4-a').css('color','#bbe0fb')
	if($('#panel-img5').find('img').attr('src')=='img/leftimg/shengjix.png'){
        $('#panel-img5').find('img').attr('src','img/leftimg/shengjiw.png')
		$('.h4-a[name=collapseFive]').css('color','#bbe0fb')
	}else{
		$('#panel-img5').find('img').attr('src','img/leftimg/shengjix.png')
		$('.h4-a[name=collapseFive]').css('color','#ff7e00')
	}
	$('#panel-img1').find('img').attr('src','img/leftimg/xitongguanliw.png')
	$('#panel-img2').find('img').attr('src','img/leftimg/chezhuw.png')
	$('#panel-img3').find('img').attr('src','img/leftimg/shebeiw.png')
	$('#panel-img4').find('img').attr('src','img/leftimg/shebeichaw.png')
	$('#panel-img6').find('img').attr('src','img/leftimg/yingyongw.png')
	$('#panel-img7').find('img').attr('src','img/leftimg/hujiaow.png')
	$('#panel-img8').find('img').attr('src','img/leftimg/chexingw.png')
	$('#panel-img9').find('img').attr('src','img/leftimg/zongxianw.png')
	$('#panel-img10').find('img').attr('src','img/leftimg/tuisongw.png')
})
$('.h4-a[name=collapseSix]').click(function(){
	$('.h4-a').css('color','#bbe0fb')
	if($('#panel-img6').find('img').attr('src')=='img/leftimg/yingyongx.png'){
        $('#panel-img6').find('img').attr('src','img/leftimg/yingyongw.png')
		$('.h4-a[name=collapseSix]').css('color','#bbe0fb')
	}else{
		$('#panel-img6').find('img').attr('src','img/leftimg/yingyongx.png')
		$('.h4-a[name=collapseSix]').css('color','#ff7e00')
	}
	$('#panel-img1').find('img').attr('src','img/leftimg/xitongguanliw.png')
	$('#panel-img2').find('img').attr('src','img/leftimg/chezhuw.png')
	$('#panel-img3').find('img').attr('src','img/leftimg/shebeiw.png')
	$('#panel-img4').find('img').attr('src','img/leftimg/shebeichaw.png')
	$('#panel-img5').find('img').attr('src','img/leftimg/shengjiw.png')
	$('#panel-img7').find('img').attr('src','img/leftimg/hujiaow.png')
	$('#panel-img8').find('img').attr('src','img/leftimg/chexingw.png')
	$('#panel-img9').find('img').attr('src','img/leftimg/zongxianw.png')
	$('#panel-img10').find('img').attr('src','img/leftimg/tuisongw.png')
})
$('.h4-a[name=collapseSeven]').click(function(){
	$('.h4-a').css('color','#bbe0fb')
	if($('#panel-img7').find('img').attr('src')=='img/leftimg/hujiaox.png'){
        $('#panel-img7').find('img').attr('src','img/leftimg/hujiaow.png')
		$('.h4-a[name=collapseSeven]').css('color','#bbe0fb')
	}else{
		$('#panel-img7').find('img').attr('src','img/leftimg/hujiaox.png')
		$('.h4-a[name=collapseSeven]').css('color','#ff7e00')
	}
	$('#panel-img1').find('img').attr('src','img/leftimg/xitongguanliw.png')
	$('#panel-img2').find('img').attr('src','img/leftimg/chezhuw.png')
	$('#panel-img3').find('img').attr('src','img/leftimg/shebeiw.png')
	$('#panel-img4').find('img').attr('src','img/leftimg/shebeichaw.png')
	$('#panel-img5').find('img').attr('src','img/leftimg/shengjiw.png')
	$('#panel-img6').find('img').attr('src','img/leftimg/yingyongw.png')
	$('#panel-img8').find('img').attr('src','img/leftimg/chexingw.png')
	$('#panel-img9').find('img').attr('src','img/leftimg/zongxianw.png')
	$('#panel-img10').find('img').attr('src','img/leftimg/tuisongw.png')
})
$('.h4-a[name=collapseeight]').click(function(){
	$('.h4-a').css('color','#bbe0fb')
	if($('#panel-img8').find('img').attr('src')=='img/leftimg/chexingx.png'){
        $('#panel-img8').find('img').attr('src','img/leftimg/chexingw.png')
		$('.h4-a[name=collapseeight]').css('color','#bbe0fb')
	}else{
		$('#panel-img8').find('img').attr('src','img/leftimg/chexingx.png')
		$('.h4-a[name=collapseeight]').css('color','#ff7e00')
	}
	$('#panel-img1').find('img').attr('src','img/leftimg/xitongguanliw.png')
	$('#panel-img2').find('img').attr('src','img/leftimg/chezhuw.png')
	$('#panel-img3').find('img').attr('src','img/leftimg/shebeiw.png')
	$('#panel-img4').find('img').attr('src','img/leftimg/shebeichaw.png')
	$('#panel-img5').find('img').attr('src','img/leftimg/shengjiw.png')
	$('#panel-img6').find('img').attr('src','img/leftimg/yingyongw.png')
	$('#panel-img7').find('img').attr('src','img/leftimg/hujiaow.png')
	$('#panel-img9').find('img').attr('src','img/leftimg/zongxianw.png')
	$('#panel-img10').find('img').attr('src','img/leftimg/tuisongw.png')
})
$('.h4-a[name=collapseten]').click(function(){
	$('.h4-a').css('color','#bbe0fb')
	if($('#panel-img9').find('img').attr('src')=='img/leftimg/zongxianx.png'){
        $('#panel-img9').find('img').attr('src','img/leftimg/zongxianw.png')
		$('.h4-a[name=collapseten]').css('color','#bbe0fb')
	}else{
		$('#panel-img9').find('img').attr('src','img/leftimg/zongxianx.png')
		$('.h4-a[name=collapseten]').css('color','#ff7e00')
	}
	$('#panel-img1').find('img').attr('src','img/leftimg/xitongguanliw.png')
	$('#panel-img2').find('img').attr('src','img/leftimg/chezhuw.png')
	$('#panel-img3').find('img').attr('src','img/leftimg/shebeiw.png')
	$('#panel-img4').find('img').attr('src','img/leftimg/shebeichaw.png')
	$('#panel-img5').find('img').attr('src','img/leftimg/shengjiw.png')
	$('#panel-img6').find('img').attr('src','img/leftimg/yingyongw.png')
	$('#panel-img7').find('img').attr('src','img/leftimg/hujiaow.png')
	$('#panel-img8').find('img').attr('src','img/leftimg/chexingw.png')
	$('#panel-img10').find('img').attr('src','img/leftimg/tuisongw.png')
})
$('.h4-a[name=collapseeleven]').click(function(){
	$('.h4-a').css('color','#bbe0fb');
	if($('#panel-img10').find('img').attr('src')=='img/leftimg/tuisongx.png'){
		$('#panel-img10').find('img').attr('src','img/leftimg/tuisongw.png')
		$('.h4-a[name=collapseeleven]').css('color','#bbe0fb')
	}else{
		$('#panel-img10').find('img').attr('src','img/leftimg/tuisongx.png')
		$('.h4-a[name=collapseeleven]').css('color','#ff7e00')
	}
	$('#panel-img1').find('img').attr('src','img/leftimg/xitongguanliw.png')
	$('#panel-img2').find('img').attr('src','img/leftimg/chezhuw.png')
	$('#panel-img3').find('img').attr('src','img/leftimg/shebeiw.png')
	$('#panel-img4').find('img').attr('src','img/leftimg/shebeichaw.png')
	$('#panel-img5').find('img').attr('src','img/leftimg/shengjiw.png')
	$('#panel-img6').find('img').attr('src','img/leftimg/yingyongw.png')
	$('#panel-img7').find('img').attr('src','img/leftimg/hujiaow.png')
	$('#panel-img8').find('img').attr('src','img/leftimg/chexingw.png')
	$('#panel-img9').find('img').attr('src','img/leftimg/zongxianw.png')
})
//点击图标上下切换
var h4 = document.querySelectorAll('.h4-a')
for(var i = 0;i<h4.length;i++){
	h4[i].index = i
	h4[i].onclick = function() {
		var j = this.index
		var src = $('.down>img').eq(j).attr('src')
		if(src=='img/leftimg/shouqi.png'){
			$('.down>img').attr('src','img/leftimg/shouqi.png')
			$('.down>img').eq(j).attr('src','img/leftimg/xiala.png')
		}else if(src=='img/leftimg/xiala.png'){
			$('.down>img').attr('src','img/leftimg/shouqi.png')
            $('.down>img').eq(j).attr('src','img/leftimg/shouqi.png')
		}
	}
}
//点击改变背景颜色
var managementli = document.querySelectorAll(".management>li");
for(var i = 0; i < managementli.length; i++) {
	managementli[i].index = i;
	managementli[i].onclick = function() {
		$('.management>li').css('color', '#bbe0fb')
		$('.management>li').removeClass('libj')
		managementli[this.index].className = 'libj';
		managementli[this.index].style.color = "#00aaff"
		$('.management>li>img').attr('src','img/leftimg/yuanhuanw.png')
        $('.management>li').eq(this.index).find('img').attr('src','img/leftimg/yuanhuanx.png')
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
	if($('.management>li').eq(i).text() == '第三方设备') {
		$('.management>li').eq(i).attr('id', 'managementli12')
	}
	// if($('.management>li').eq(i).text() == '轨迹查询') {
	// 	$('.management>li').eq(i).attr('id', 'managementli12')
	// }
	// if($('.management>li').eq(i).text() == '发动机转速') {
	// 	$('.management>li').eq(i).attr('id', 'managementli13')
	// }
	// if($('.management>li').eq(i).text() == '行驶速度') {
	// 	$('.management>li').eq(i).attr('id', 'managementli14')
	// }
	// if($('.management>li').eq(i).text() == '行驶里程') {
	// 	$('.management>li').eq(i).attr('id', 'managementli15')
	// }
	// if($('.management>li').eq(i).text() == '剩余燃油') {
	// 	$('.management>li').eq(i).attr('id', 'managementli16')
	// }
	// if($('.management>li').eq(i).text() == '车灯状态') {
	// 	$('.management>li').eq(i).attr('id', 'managementli17')
	// }
	// if($('.management>li').eq(i).text() == '实时仪表') {
	// 	$('.management>li').eq(i).attr('id', 'managementli18')
	// }
	if($('.management>li').eq(i).text() == '实时车况') {
		$('.management>li').eq(i).attr('id', 'managementli19')
	}
	// if($('.management>li').eq(i).text() == '姿态角度') {
	// 	$('.management>li').eq(i).attr('id', 'managementli20')
	// }
	// if($('.management>li').eq(i).text() == '加速度') {
	// 	$('.management>li').eq(i).attr('id', 'managementli21')
	// }
	// if($('.management>li').eq(i).text() == '查询日志') {
	// 	$('.management>li').eq(i).attr('id', 'managementli22')
	// }
	if($('.management>li').eq(i).text() == '设备升级') {
		$('.management>li').eq(i).attr('id', 'managementli23')
	}
	if($('.management>li').eq(i).text() == 'APP升级') {
		$('.management>li').eq(i).attr('id', 'managementli25')
	}
	if($('.management>li').eq(i).text() == '升级日志') {
		$('.management>li').eq(i).attr('id', 'managementli26')
	}
	// if($('.management>li').eq(i).text() == '回拨设置') {
	// 	$('.management>li').eq(i).attr('id', 'managementli28')
	// }
	if($('.management>li').eq(i).text() == '信息推送') {
		$('.management>li').eq(i).attr('id', 'managementli29')
	}
	if($('.management>li').eq(i).text()=='车型管理'){
		$('.management>li').eq(i).attr('id','managementli31')
	}
	if($('.management>li').eq(i).text()=='录制管理'){
		$('.management>li').eq(i).attr('id','managementli32')
	}
	if($('.management>li').eq(i).text()=='数据查询'){
		$('.management>li').eq(i).attr('id','managementli33')
	}
	if($('.management>li').eq(i).text()=='应用管理'){
		$('.management>li').eq(i).attr('id','managementli34')
	}
	if($('.management>li').eq(i).text()=='总线设置'){
		$('.management>li').eq(i).attr('id','managementli36')
	}
}

$('main>div').css('display','none')
$('.background').css('display','')
$('.Yardmanagement').css('display', 'none')
/************************1.1系统管理---组织管理*******************************/
var id;
var idparentid;
var idlever;
var url;
var rowid;
// var file;//图片上传权限判断
var operateUserStatus = 0;//用户启用与禁用按钮的状态
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
	operateUserStatus=0
	clearInterval(seti);
	clearInterval(Realtimeconditionset);							   
	id=''
	$('.rightright').css('display', 'none')
	$('main>div').css('display', 'none')
	$('.Yardmanagement').css('display', '')
	//权限判断
	var data={
		id:$('#managementli1').attr('name')
	}	
	$.post(server_context+'/setMenuId',data,function(data){
		if(data.error_code!=0){
			Statuscodeprompt(data.error_code)
		}
		for(var i=0;i<data.data.length;i++){
			if(data.data[i]==2){
				$('.box').css('display','')
			}
			if(data.data[i]==3){
				$('.sox').css('display','')
			}
			if(data.data[i]==4){
				$('.iscompile').css('display','')
				// file = 5
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
			if(data.data[i]==39){
				operateUserStatus=39;
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
			idparentid = node.parentId
			return tre(node);
		},
		onLoadSuccess(data){
			if(id!=''&&id!=null){
                var node = $('#leftleft1').tree('find', id);  
            	$('#leftleft1').tree('expandTo', node.target).tree('select', node.target);  
			}
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
		singSelect: false,
		rownumbers: "true",
		fit: 'true',
		fitColumns: 'true',
		nowrap: 'true',
		pageSize:50,
		pagination: "true",
		queryParams: {
			id: tr
		},
		columns:[[
			{ field:"cb",checkbox:"true",align:"center"},
			{ field:"userName",title:'用户名',align:"center",width: '14.8%',formatter: function (value) {return dataProcessing(value);}},
			{ field:"fullName",title:'姓名',align:"center",width: '14%',formatter: function (value) {return dataProcessing(value);}},
			{ field:"groupName",title:'用户组',align:"center",width: '14%',formatter: function (value) {return dataProcessing(value);}},
			{ field:"roleName",title:'角色',align:"center",width: '13%',formatter: function (value) {return dataProcessing(value);}},
			{ field:"mobile",title:'联系方式',align:"center",width: '16%',formatter: function (value) {return dataProcessing(value);}},
			{ field:"status",title:'操作',align:"center",width: '10%',
				formatter: function (value, row, index) {
					var value=row['status'];
					if(value==0){
						return '<a style="background:#7DAE16;color:white;display:inline-block;width:60px" href=\javaScript:userStatus('+ index +')>'+"启用"+'</a>';
					}else{
						return '<a style="background:#666666;color:white;display:inline-block;width:60px" href=\javaScript:userStatus('+ index +')>'+"禁用"+'</a>';
					}
				}
			},
			{ field:"ts",title:'创建时间',align:"center",width: '15%',formatter: function (value) {return dataProcessing(value);}}
		]],
		onLoadSuccess:function(data){
			if(data.error_code!=0){
				Statuscodeprompt(data.error_code)
			}
		}
	})
}
//启动禁用用户
function userStatus(index){
	  var rows = $("#dgl").datagrid('getRows');
	  var row = rows[index]
	  if(operateUserStatus!=39){
		  $.messager.alert('系统提示','你不具备此操作权限','warning');
		  return;
	  }
	  $.messager.confirm('系统提示','确认进行此操作..',function(r){
		  if(r){
            $.ajax({
				type:"post",
				url:server_context+"/updateUserStatus",
				async:true,
				data:{
					id:row.id,
					status:row.status
				},
				success:function(data){
					if(data.error_code==0){
						$("#dgl").datagrid('reload')
					}
				}
			}); 
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
       $.messager.alert("系统提示", "无法添加组织架构，超过系统限制层级。",'warning');
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
			if(data.error_code!=0){
				Statuscodeprompt(data.error_code);
				return;
			}
			$("#province").find("option").remove();
			for(var i=0;i<data.data.length;i++){
				$('<option value='+data.data[i].id+'>'+data.data[i].name+'</option>').appendTo('#province')
			}
		}
	});
}
//省的onchang事件
function sheng(value){
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
	var phone = /^((0[0-9]{1,3}-\d{5,8})|(1[3584]\d{9}))$/;
	var email = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
	if($('#iscompilename').val()==''||$('#iscompilefzr').val()==''||$('#iscompileprincipal').val()==''||$('#iscompileemail').val()==''||$('#iscompilephone').val()==''){
		$.messager.alert('系统提示','必填字段不能为空','warning');
		return;
	}
	if(!phone.test($('#iscompilefzr').val())){
        $.messager.alert('系统提示','联系电话不符合格式','warning');
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
			var data = data.rows[0];
			$('.xxbjtwobottom-left-image').attr('src',data.logoUrl)
			Antaurin[0].innerHTML=data.groupName;
			Antaurin[1].innerHTML=data.phone;
			Antaurin[2].innerHTML=data.address;
			Antaurin[3].innerHTML=data.principal;
			Antaurin[4].innerHTML=data.email;
		})
	}else{
		Statuscodeprompt(data.error_code,'保存失败','error')
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
	var phone = /^((0[0-9]{1,3}-\d{5,8})|(1[3584]\d{9}))$/;
	var email = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if($('#treename').val()==''||$('#treefzr').val()==''||$('#treephone').val()==''||$('#treeemail').val()==''||$('#county').val()==''||$('#inaddress').val()==''){
        $.messager.alert('系统提示','必填字段不能为空','warning');
		return;
	}
	if(!phone.test($('#treephone').val())){
        $.messager.alert('系统提示','联系电话不符合格式','warning');
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
				Statuscodeprompt(data.error_code)
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
			$.ajax({
				type: "post",
				url: server_context+"/removeGroup",
				async: true,
				data: {
					'id': id
				},
				success: function(data) {
					if(data.error_code==0){
							$.messager.alert("系统提示", "删除成功",'info');
							$("#leftleft1").tree('reload');
							$('.rightright').css('display', 'none')
					}else{
                        Statuscodeprompt(data.error_code)
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
	var phone = /^((0[0-9]{1,3}-\d{5,8})|(1[3584]\d{9}))$/;
	var email = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
	var pattern = /^[\u4E00-\u9FA5]{1,10}$/;// 验证中文名称
	var ids=0;
	var groupd;
	if(rowid==1){
		var row = $("#dgl").datagrid('getSelected');
		ids=row.id;
        groupd = $("#age").val();
	}
	if(rowid==0){
        groupd = id;
	}
	if($("#_id").val()==''||$("#psw").val()==''||$("#stuname").val()==''||$("#age").val()==''||$("#addressss").val()==''||$("#youxiang").val()==''){
        $.messager.alert('系统提示','必填字段不能为空','warning')
		return;
	}
	if(!phone.test($('#addressss').val())) {
		   $.messager.alert('系统提示','联系电话不符合格式','warning')
		   $('#addressss').focus();
		   return;
	}
	if(!email.test($('#youxiang').val())){
        $.messager.alert('系统提示','邮箱不符合格式','warning');
		return;
	}
	for(var i=0;i<$("#_id").val().length;i++){
		if(pattern.test($("#_id").val()[i])){
			 $.messager.alert('系统提示','用户名不能包含中文','warning');
			 return;
		}
	}
	if($("#sex").val()==''||$("#sex").val()=='undefined'||$("#sex").val()==null){
        $.messager.alert('系统提示','角色不能为空或先在角色管理页面添加角色','warning');
		return;
	}
	var data = {
		'id': ids,
		'userName': $("#_id").val(),
		'userPwd': $("#psw").val(),
		'fullName': $("#stuname").val(),
		'groupId': groupd,
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
			}else {
				Statuscodeprompt(data.error_code)
			}
		}
	});
}
//top弹出框保存按钮
function saveUser() {
	var phone = /^((0[0-9]{1,3}-\d{5,8})|(1[3584]\d{9}))$/;
	var selected = $("#dg").datagrid('getSelected');
	if($("#id").val()==''||$("#name").val()==''||$("#phone").val()==''||$("#email").val()==''||$("#countyn").val()==''||$("#parlingaddress").val()==''){
         $.messager.alert('系统提示','必填字段不能为空','warning');
		 return;
	}
	if(!phone.test($('#phone').val())) {
		   $.messager.alert('系统提示','联系电话不符合格式','warning');
		   $('#phone').focus();
		   return;
	}
	var data = {
		'id':selected.id,
		'groupName': $("#id").val(),
		'principal': $("#name").val(),
		'phone': $("#phone").val(),
		'email': $("#email").val(),
		'areaId':$("#countyn").val(),
		'address':$("#parlingaddress").val()
	}
	if($("#parlinglotrole").val()!=-1){
        data.roleId = $("#parlinglotrole").val()
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
				Statuscodeprompt(data.error_code,"保存失败",'error')
			}
		}
	});
}
//top编辑按钮
function openUserAddDialog() {
	var selected = $("#dg").datagrid('getSelected');
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
				if(selected.areaId==data[i].id){
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
		  id:idparentid
	   },
	   success:function(data){
	      data=data.data
		  $('#parlinglotrole').find('option').nextAll().remove();
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
					level:row.level,
					checked:row.checked,
					topGroupId:row.topGroupId
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
					level:row.level,
					iconCls:'icon-two',
					topGroupId:row.topGroupId
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
					level:row.level,
					iconCls:'icon-three',
					topGroupId:row.topGroupId
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
					level:row.level,
					iconCls:'icon-four',
					topGroupId:row.topGroupId
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
					level:row.level,
					iconCls:'icon-five',
					topGroupId:row.topGroupId
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
					level:row.level,
					iconCls:'icon-eight',
					topGroupId:row.topGroupId
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
					level:row.level,
					iconCls:'icon-six',
					topGroupId:row.topGroupId
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
					level:row.level,
					iconCls:'icon-seven',
					topGroupId:row.topGroupId
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
						level:row.level,
						iconCls:'icon-one',
						topGroupId:row.topGroupId
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
						level:row.level,
						iconCls:'icon-two',
						topGroupId:row.topGroupId
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
						level:row.level,
						iconCls:'icon-three',
						topGroupId:row.topGroupId
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
						level:row.level,
						iconCls:'icon-four',
						topGroupId:row.topGroupId
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
						level:row.level,
						iconCls:'icon-five',
						topGroupId:row.topGroupId
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
							level:row.level,
							iconCls:'icon-eight',
							topGroupId:row.topGroupId
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
						level:row.level,
						iconCls:'icon-six',
						topGroupId:row.topGroupId
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
						level:row.level,
						iconCls:'icon-seven',
						topGroupId:row.topGroupId
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
	$('<input type="text" disabled="disabled" class="usergroup" id="age">').appendTo('.usergroupfmm')
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
	var selectedrow = $("#dgl").datagrid('getChecked');
	if(selectedrow == null) {
		$.messager.alert("系统提示", "请选择要删除的数据！",'warning');
		return;
	}
	var id = [];
	for(var i=0;i<selectedrow.length;i++){
       id.push(selectedrow[i].id)
	}
	$.messager.confirm("系统提示", "您确认要删除这条数据吗？", function(r) {
		if(r) {
			$.post(server_context+"/removeUser", {
				id: id.join(',')
			}, function(data) {
				if(data.error_code == 0) {
					$.messager.alert("系统提示", "数据已成功删除",'info');
					$("#dgl").datagrid("reload");
					$("#dg").datagrid("reload");
				} else {
					Statuscodeprompt(data.error_code,"数据删除失败！",'error')
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
		},
		onSelect: function(node) {
			return roles(node);
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
function roles(node){
	$.ajax({
       type: "post",
	   url: server_context+"/listGroupRole",
	   async: true,
	   data:{
		  id:node.id
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
//最下侧修改用户
function openUserModifyDialog() {
	$('#_id').attr("disabled", true);
	var row = $("#dgl").datagrid('getSelected');
	var rows = $("#dgl").datagrid('getChecked'); 
	if(row == null) {
		$.messager.alert("系统提示", "请选择一条数据进行修改",'warning');
		return;
	}
	if(rows.length>=2) {
		$.messager.alert("系统提示", "请选择一条数据进行修改",'warning');
		return;
	}
	$('#dlmyModal').modal('show');
	$('.usergroupfmm input').remove();
	$('.usergroupfmm span').remove();
	$('<input type="text" class="usergroup" id="age">').appendTo('.usergroupfmm');
	$('.dlmyModaltitle').text('修改用户信息');
	$('#ResetPassword').css('display','');
	$('#psw').attr('disabled','disabled');
	dispValue(row);
	url = server_context+'/updateUser';
	rowid=1;
}

/************************1.2系统管理---角色管理*******************************/
var roleId;//角色真实ID
var id1;//判断用户组，角色的ID
var jurisdictionlist;//权限列表权限
var IDnodetipe;   //判断是用户组还是角色
$('.rolemanagement').css('display', 'none') //放Js上边上边,不要最上边,在页面节点创建完之后
$('#managementli2').click(function() {
	    clearInterval(seti);
		clearInterval(Realtimeconditionset);
	    id1=1;
		IDnodetipe=''
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
			if(data.error_code!=0){
				Statuscodeprompt(data.error_code)
			}
			for(var i=0;i<data.data.length;i++){
				if(data.data[i]==10){
					$('.addrole').css('display', '')
				}
				if(data.data[i]==11){
					$('.removerole').css('display', '')
				}
				if(data.data[i]==12){
					jurisdictionlist=12
				}
				if(data.data[i]==13){
					$('.rule').css('display', '')
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
					iconCls:'icon-bianzutubiao',
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
					iconCls:'icon-juesetubiao',
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
				if(row.type==1){
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
				}else if(row.type==2){
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
		if(row.type==1){
           if(!exists(rows, row.parentId)) {
				nodes.push({
					id: row.id,
					text: row.name,
					actualId:row.actualId,
					checked:row.checked,
					type:row.type,
					parendId:row.parendId,
					parentId:row.parentId,
					iconCls:'icon-suo'
				});
			}
		}else if(row.type==2){
            if(!exists(rows, row.parentId)) {
				nodes.push({
					id: row.id,
					text: row.name,
					actualId:row.actualId,
					checked:row.checked,
					type:row.type,
					parendId:row.parendId,
					parentId:row.parentId,
					iconCls:'icon-yaoshi'
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
				if(row.type==1){
                    var child = {
						id: row.id,
						text: row.name,
						actualId:row.actualId,
						checked:row.checked,
						type:row.type,
						parendId:row.parendId,
						parentId:row.parentId,
						iconCls:'icon-suo'
					};
				}else if(row.type==2){
					var child = {
						id: row.id,
						text: row.name,
						actualId:row.actualId,
						checked:row.checked,
						type:row.type,
						parendId:row.parendId,
						parentId:row.parentId,
						iconCls:'icon-yaoshi'
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
//判断选中的值加载数据
function tree(node) {
	$('.roleListtwobottom').css('display', '')
	$('.rolebasedinbottom').css('display', '')
	$('.rightright').css('display', '')
	var tr = node.id;
	id1 = node.id;
	roleId = node.actualId;
	IDnodetipe = node.type;
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
    		},
			onLoadSuccess:function(data){
				if(data.error_code!=0){
					Statuscodeprompt(data.error_code)
				}
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
	if(roleId==1){
		$.messager.alert('系统提示','系统管理员角色规则无法修改','warning')
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
			}else{
				Statuscodeprompt(data.error_code)
			}
		}
	})
}

//添加权限的保存
function roleadd() {
	if(jurisdictionlist!=12){
	       $.messager.alert('系统提示','你没有修改权限','warning')
	       return;
	}
	if(roleId==1){
	   $.messager.alert('系统提示','超级管理员权限不能修改','warning')
       return;
	}
	var data = $('.roleListtwobottom').tree('getChecked')
	var id = [];
	for(var i = 0; i < data.length; i++) {
		if(data[i].type == 2) {
			var idd;
			idd = data[i].actualId;
			id.push(idd)
		}
	}
	var add = {
		RoleOperationIds: id.join(","),
		roleId: roleId
	}
	$.ajax({
		type: "post",
		url: server_context+"/saveRolePrivilege",
		async: true,
		data: add, //这个地方要字符串
		success: function(data) {
			if(data.error_code==0){
				$.messager.alert('系统提示','权限保存成功','info')
			}else{
				Statuscodeprompt(data.error_code)
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
	if(IDnodetipe==2||IDnodetipe=='') {
		$.messager.alert("系统提示", "请选择用户组进行添加",'warning');
		return;
	}
	$('#treenameo').val('');
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
			if(data.error_code == 0) {
				$.messager.alert("系统提示", "添加成功",'info');
				$('#myModalfmm').modal('hide');
				$(".roleListonebottom").tree('reload');
			}else{
				Statuscodeprompt(data.error_code)
			}
		}
	});
}
//删除角色
function treeremove() {
	if(id1!=0){
		$.messager.alert("系统提示", "请选择角色进行删除",'warning');
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
						if(data.error_code == 0) {
							$.messager.alert("系统提示", "删除成功",'info');
							$(".roleListonebottom").tree('reload');
						} else {
							Statuscodeprompt(data.error_code,"删除失败,或请先删除子角色！",'error')
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
		clearInterval(Realtimeconditionset);
		$('#addressip').val('')
		$('main>div').css('display', 'none');
		$('.accessmanagement').css('display', '');
		//权限判断
        var data = {
		  id: $('#managementli3').attr('name')
		}
		$.post(server_context+'/setMenuId', data, function(data) {
			if(data.error_code!=0){
				Statuscodeprompt(data.error_code)
			}
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
			// singleSelect: 'true',
			singSelect: false,
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
				{ field:"ipAddress",title:'IP地址',align:"center",width: '25%',formatter: function (value) {return dataProcessing(value);}},
				{ field:"topGroupName",title:'归属车场',align:"center",width: '25%',formatter: function (value) {return dataProcessing(value);}},
				{ field:"status",title:'操作',align:"center",width: '24%',
				   formatter: function (value, row, index) {
  					  var value=row['status'];
  					  if(value==1){
  					  	return '<a style="background:#7DAE16;color:white;display:inline-block;width:60px" href=\javaScript:ownerVerify('+ index +')>'+"已启用"+'</a>';
  					  }else{
  					  	return '<a style="background:#666666;color:white;display:inline-block;width:60px" href=\javaScript:ownerVerify('+ index +')>'+"未启用"+'</a>';
  					  }
    				}
				},
				{ field:"ts",title:'创建时间',align:"center",width: '25%',formatter: function (value) {return dataProcessing(value);}}
			]],
			onLoadSuccess:function(data){
				if(data.error_code!=0){
					Statuscodeprompt(data.error_code)
				}
			}
		})
	})
	 //启动禁用ip
   function ownerVerify(index){
	  var rows = $("#dgip").datagrid('getRows');
	  var row = rows[index]
	  if(operateIp!=17){
		  $.messager.alert('系统提示','你不具备操作ip的权限','warning');
		  return;
	  }
	  $.messager.confirm('系统提示','确认进行此操作..',function(r){
		  if(r){
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
		  }
	  })
		
   }
//新增ip保存按钮
function saveip() {
	var ips = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]|[*])$/;
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
			}else{
				Statuscodeprompt(data.error_code)
			}
		}
	});
	$("#dlip").dialog("close");
}
//删除ip
function deleteUserip() {
	var row = $("#dgip").datagrid('getChecked');
	if(row==''||row==null||row==undefined) {
		$.messager.alert("系统提示", "请选择IP进行删除",'warning');
		return;
	}
	var id = [];
	for(var i=0;i<row.length;i++){
       id.push(row[i].id)
	}
	$.messager.confirm("系统提示", "您确认要删除这条IP吗？",function(r) {
		if(r) {
			$.post(server_context+"/removeAccess", {
				id: id.join(',')
			}, function(data) { //result直接返回Object，所以无需转换为json
				if(data.error_code == 0) {
					$.messager.alert("系统提示", "IP删除成功",'info');
					$("#dgip").datagrid("reload");
				}else {
					Statuscodeprompt(data.error_code,"IP删除失败",'error')
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
	clearInterval(Realtimeconditionset);
	$('main>div').css('display', 'none');
	$('.systemLog').css('display','');
	$('.LoguserName').val('');
	$('.Logaddress').val('');
	$('.Logstarttime').datetimebox('setValue', '');
	$('.Logfinishtime').datetimebox('setValue', '');
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
		queryParams:{
            userName:'',
			startTime:'',
			endTime:'',
			ipAddress:''
		},
		columns:[[
		    {field:"userName",title:'用户名',align:"center",width: '20%',formatter: function (value) {return dataProcessing(value);}},
		    {field:"ipAddress",title:'ip地址',align:"center",width: '20%',formatter: function (value) {return dataProcessing(value);}},
		    {field:"content",title:'内容',align:"center",width: '20%',formatter: function (value) {return dataProcessing(value);}},
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
		    { field:"ts",title:'时间',align:"center",width: '20%',formatter: function (value) {return dataProcessing(value);}}
		]],
		onLoadSuccess:function(data){
			if(data.error_code!=0){
				Statuscodeprompt(data.error_code)
			}
		}
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
		    {field:"userName",title:'用户名',align:"center",width: '20%',formatter: function (value) {return dataProcessing(value);}},
		    {field:"menuName",title:'菜单名',align:"center",width: '20%',formatter: function (value) {return dataProcessing(value);}},
		    {field:"content",title:'内容',align:"center",width: '20%',formatter: function (value) {return dataProcessing(value);}},
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
		    { field:"ts",title:'时间',align:"center",width: '20%',formatter: function (value) {return dataProcessing(value);}}
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
//登录日志查询取消
$('.Loginquiretwo').click(function(){
	$('.LoguserName').val('');
	$('.Logaddress').val('');
	$('.Logstarttime').datetimebox('setValue','');
	$('.Logfinishtime').datetimebox('setValue','');
	$('#Logform').datagrid({
		url:server_context+'/listLoginLog',
		method: 'post',
		singleSelect: 'true',
		fit: 'true',
		fitColumns: 'true',
		rownumbers: 'true',
		pageSize:50,
		pagination: "true",
		queryParams:{
            userName:'',
			startTime:'',
			endTime:'',
			ipAddress:''
		},
		columns:[[
		    {field:"userName",title:'用户名',align:"center",width: '20%',formatter: function (value) {return dataProcessing(value);}},
		    {field:"ipAddress",title:'ip地址',align:"center",width: '20%',formatter: function (value) {return dataProcessing(value);}},
		    {field:"content",title:'内容',align:"center",width: '20%',formatter: function (value) {return dataProcessing(value);}},
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
		    { field:"ts",title:'时间',align:"center",width: '20%',formatter: function (value) {return dataProcessing(value);}}
		]]
	})
})
//操作日志查询
$('.operateinquire').click(function(){
	$('#operateLog').datagrid('load',{
		userName:$('.operateName').val(),
		startTime:$('.operatestarttime').val(),
		endTime:$('.operatefinishtime').val(),
		type:$('.operatetype').val(),
		menuName:$('.operatemenuName').val()
	})
})

/************************7.3总线录制---总线设置*******************************/
var canidSeturl;
var canidSetmodelAlias;
var canidSettopGroupId;
$('#managementli36').click(function(){
	clearInterval(seti);
	clearInterval(Realtimeconditionset);
	$('main>div').css('display','none');
	$('.canidSet').css('display','');
	$('#canidSetinver').css('display','none');
	//权限请求
	var data={
		id:$('#managementli36').attr('name')
	}	
	$.post(server_context+'/setMenuId',data,function(data){
		if(data.error_code!=0){
			Statuscodeprompt(data.error_code)
		}   
		for(var i=0;i<data.data.length;i++){
			if(data.data[i]==131){
				$('.canidSet-top-one').css('display','')
			}
			if(data.data[i]==132){
				$('.canidSet-top-two').css('display','')
			}
			if(data.data[i]==133){
				$('.canidSet-top-thr').css('display','')
			}
		}
	})
	$('.canidSet-tree').tree({
		url: server_context+'/listModelAliasTree',
		method: 'post',
		animate: 'true',
		loadFilter: function(rows) {
			return rows.data;
		},
		onSelect: function(node) {
			return canidSetree(node);
		}
	})
})
//获取选中树的值
function canidSetree(node){
    $('#canidSetinver').css('display','');
	if(node.level!=2){
       $('#canidSetinver').css('display','none');
	   return;
	}
	canidSetmodelAlias = node.modelAlias
	canidSettopGroupId = node.topGroupId
    
	$('.canidSet-datagrid').datagrid({
		url: server_context+'/listModelAliseCanId',
        method: 'get',
		// singleSelect: 'true',
		singSelect:false,
        fitColumns: 'true',
        fit: 'true',
        rownumbers: 'true',
        pagination: "true",
		pageSize:50,
        queryParams: {
        	modelAlias:node.modelAlias,
			topGroupId:node.topGroupId
    	},
        columns:[[
            { field: "cb", checkbox: "true", align: "center" },
            { field: "canId", title: 'CANID', align: "center", width: '30%',formatter: function (value) {return dataProcessing(value);}},
            { field: "canName", title: 'CAN名称', align: "center", width: '30%',formatter: function (value) {return dataProcessing(value);}},
            { field: "filter", title: '掩码', align: "center",
            	formatter:function(value, rows, index){
            		// 掩码显示每2个字符之间加上空格
		        	var value = rows['filter']
		        	if(value.length=16){
		        		var showValue="";
		        		for(var i=0;i<8;i++){
		        			showValue += value.substring(i*2,i*2+2)+" ";
		        		}

		        		return showValue;
		        	}else{
		        		return value;
		        	}
		        }
            },
		]]
	})
}
//新增
function addcanidSet(){
	$('#canidSetModal').modal('show');
	$('.canidSet-title').text('新增CANID');
	$('#canidSetSubmit').attr('name','1');
	$('#canidSet-myid').val('');
	$('#canidSet-myname').val('');
	$('#canidSet-mymask>input').remove();
    for(var i = 0;i<8;i++){
        $("<input maxlength='2' onkeyup='inputteshu(this)' style='width:22px;margin-left:5px;'></input>").appendTo($('#canidSet-mymask'))
	}
	canidSeturl = server_context+'/saveCanId';
}
//编辑
function editorcanidSet(){
	var row = $('.canidSet-datagrid').datagrid('getSelected');
	var rows = $('.canidSet-datagrid').datagrid('getChecked');
	if(row == null){
       $.messager.alert('系统提示','请选择需要修改的数据','error');
	   return;
	}
	if(rows.length>=2){
		$.messager.alert('系统提示','请选择一条数据进行编辑','error');
	   return;
	}
	$('#canidSetModal').modal('show');
	$('.canidSet-title').text('修改CANID');
	$('#canidSetSubmit').attr('name','2');
	$('#canidSet-myid').val(row.canId);
	$('#canidSet-myname').val(row.canName);
    var input = [];
	for(var i=0;i<8;i++){
        input.push(row.filter.substring(i*2,i*2+2))
	}
    $('#canidSet-mymask>input').remove();
    for(var i = 0;i<8;i++){
       $("<input maxlength='2' onkeyup='inputteshu(this)' value="+input[i]+" style='width:22px;margin-left:10px;'></input>").appendTo($('#canidSet-mymask'))
	}
	canidSeturl = server_context+'/updateCanId';
}
//删除
function removecanidSet(){
	var row = $('.canidSet-datagrid').datagrid('getChecked');
	if(row == null || row ==undefined || row==''){
       $.messager.alert('系统提示','请选择需要删除的数据','error');
	   return;
	}
	var id = [];
	for(var i=0;i<row.length;i++){
        id.push(row[i].id)
	}
	$.messager.confirm('系统提示','确认删除',function(r){
		if(r){
			$.ajax({
				type:"post",
				url: server_context+'/removeCanId',
				async:true,
				data:{
					ids:id.join(',')
				},
				success:function(data){
					if(data.error_code==0){
					$.messager.alert('系统提示','删除成功','info');
				      	$('.canidSet-datagrid').datagrid('reload')
					}else{
					    Statuscodeprompt(data.error_code)
					}
				}
			})
		}
	})
	
}
$('#canidSetSubmit').click(function(){
	var input = /^[A-Fa-f0-9]+$/
	if($('#canidSet-myid').val()==''||$('#canidSet-myname').val()==''){
		$.messager.alert('系统提示','必填字段不能为空','error');
		return;
	}
	var ym = [];
	for(var i=0;i<$('#canidSet-mymask').find('input').length;i++){
		if($('#canidSet-mymask').find('input').eq(i).val()==''){
          	$.messager.alert('系统提示','掩码输入框不能为空','error');
		  	return;
		}
        ym.push($('#canidSet-mymask').find('input').eq(i).val());
	}
	if(ym.join('').length!=16){
        $.messager.alert('系统提示','掩码应为16位','error');
		return;
	}
    if(!input.test(ym.join(''))) {
		   $.messager.alert('系统提示','字符错误,请输入0-9,a-f的字符','error')
		   return;
	}
	console.log(ym)
	var data;
	if($('#canidSetSubmit').attr('name')==1){
		data = {
			modelAlias:canidSetmodelAlias,
			topGroupId:canidSettopGroupId,
			canId:$('#canidSet-myid').val(),
			canName:$('#canidSet-myname').val(),
			filter:ym.join(' ')
		}
	}else{
		var row = $('.canidSet-datagrid').datagrid('getSelected');
		data = {
			id:row.id,
			canId:$('#canidSet-myid').val(),
			canName:$('#canidSet-myname').val(),
			filter:ym.join(' ')
		}
	}
	$.ajax({
		type:"post",
		url:canidSeturl,
		async:true,
		data:data,
		success:function(data){
			if(data.error_code==0){
				$.messager.alert('系统提示','保存成功','info');
				$('#canidSetModal').modal('hide');
				$('.canidSet-datagrid').datagrid('reload');
			}else{
				Statuscodeprompt(data.error_code);
			}
		}
	});
})

/************************9.2数据查询--实时车况*******************************/
var RealtimeconditionSerial; //实时车况设备编号
var RealtimeconditionTime;   //实时车况定时刷新时间                                                                                                                                                                                                   时车况刷新时间
var Realtimeconditionset;   //实时车况定时刷新
var map;//百度地图实例
var carMk;//上一次请求的车图片
var points=[]//上一次和这一次的坐标点
$('#managementli19').click(function(){
	clearInterval(seti);
	clearInterval(Realtimeconditionset);
	$('main>div').css('display','none');
	$('.Realtimecondition').css('display','')
	$('#RealtimeconditionSerial').val('')
	for(var i=0;i<$('.Realtimecondition-relaTime-top>div').length;i++){
       $('.Realtimecondition-relaTime-top>div').eq(i).find('p').eq(0).text('')
	}
	for(var i=0;i<$('.lushushuju>p').length;i++){
       $('.lushushuju>p').eq(i).find('span').eq(1).text('')
	}
	for(var i=0;i<$('.Realtimecondition-relaTime-main-one>div').length;i++){
       $('.Realtimecondition-relaTime-main-one>div').eq(i).find('p').eq(1).text('')
	}
	points = [];
	$('#lushuslider').slider({
		min:3,
		max:15,
		step:1,
		showTip:true,
		tipFormatter: function(value){
			return value+'s';
		}
	})
	$('.lushushuju>p>span').eq(1).text('')
	map = new BMap.Map("allmap");    // 创建Map实例
	map.centerAndZoom('杭州', 12);  // 初始化地图,设置中心点坐标和地图级别
	var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT});  //右上角，添加默认缩放平移控件      
	map.addControl(top_right_navigation);
	map.setCurrentCity('杭州');          // 设置地图显示的城市 此项是必须设置的
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
	$('.Realtimecondition-relaTime-top>div>p').eq(0).text('');
	$('.Realtimecondition-relaTime-main div>p').eq(1).text('');
	$('.Realtimecondition-xiabottom>div').find('span').find('img').attr('src','img/relatime/guanbi.png');
	$('.Realtimecondition-xiabottom').eq(4).find('div').find('span').find('img').attr('src','img/relatime/dakai.png');
    $('.leftanterior>span').eq(0).text('左前胎压')
	$('.leftanterior>span').eq(1).text('右前胎压')
	$('.rightanterior>span').eq(0).text('左后胎压')
	$('.rightanterior>span').eq(1).text('右后胎压')      
	$('.leftTiretemperature>span').eq(0).text('左前胎温度')
	$('.leftTiretemperature>span').eq(1).text('右前胎温度')
	$('.rightTiretemperature>span').eq(0).text('左后胎温度')
	$('.rightTiretemperature>span').eq(1).text('右后胎温度')
})

function Realtimeconditionqinquire(){
	if($('#RealtimeconditionSerial').val()==''){
		$.messager.alert('系统提示','设备编号不能为空','error');
		return;
	}
	points = [];
	//权限判断
	$.ajax({
		type:"post",
		url:server_context+'/verifyDevice',
		async:false,
		data:{
			vin:$('#RealtimeconditionSerial').val()
		},
		success:function(data){
			if(data.error_code!=0){
				Statuscodeprompt(data.error_code)
			}
			var data = data.data[0];
			$('#Realtimecondition-equipmentnumber').text(data.deviceId);//设备编号
			$('#Realtimecondition-username').text(data.ownerName);//车主姓名
			$('#Realtimecondition-userphone').text(data.mobile);//联系电话
			$('#Realtimecondition-platenumber').text(data.plate);//车牌号
			$('#Realtimecondition-vin').text(data.vin);//车架号
			$('#Realtimecondition-name').text(data.contactsName);//紧急联系人
			$('#Realtimecondition-phone').text(data.contactsMobile);//紧急联系人电话
			RealtimeconditionSerial = data.deviceId;
			RealtimeconditionTime = $('#lushuslider').slider('getValue')
			clearInterval(Realtimeconditionset);
			RealtimeconditionTime = RealtimeconditionTime*1000
			Realtimeconditionset = setInterval('relatimels()',RealtimeconditionTime)
			$('.Realtimecondition-xiabottom span img').attr('src','img/relatime/guanbi.png')
			$('.Realtimecondition-xiabottom').eq(4).find('span').find('img').attr('src','img/relatime/dakai.png')
			relatimels();
		}
	})
}

function relatimels(){
	$.ajax({
		type:"get",
		url:server_context+"/getRealtimeData",
		async:false,
		data:{
			deviceId:RealtimeconditionSerial
		},
		success:function(data){
			if(data.error_code!=0){
				Statuscodeprompt(data.error_code)
			}
			var data = data.data[0]
			// 下侧数据
			//第一栏
			$('#fadongji').text(data.rpm);
			$('#shisu').text(data.speed);
			$('#youliang').text(data.residualfuel);
			$('#shuiwen').text(data.coolant);
			// $('#dianya').text(data.lowbattery);
			if(data.lowbattery==0){
				$('#dianya').text('正常')
			}else{
                $('#dianya').text('低压')
			}
			$('#youhao').text(data.fuelconsumption);
			//第二栏
			$('#vehiclestate1').text(data.drivingduration)
			$('#vehiclestate2').text(data.totalodometer)
			if(data.acc==0){
				$('#vehiclestate3').text('关闭')
			}else{
				$('#vehiclestate3').text('开启')
			}
			if(data.clutchpedal==0){
				$('#vehiclestate4').text('未踩')
			}else{
				$('#vehiclestate4').text('踩下')
			}
			$('#vehiclestate5').text(data.steeringangle)
			if(data.parkingbrake==0){
				$('#vehiclestate6').text('关闭')
			}else{
				$('#vehiclestate6').text('开启')
			}
			if(data.brake==0){
				$('#vehiclestate7').text('未踩')
			}else{
				$('#vehiclestate7').text('踩下')
			}
			if(data.accelerationpedal==0){
				$('#vehiclestate8').text('未踩')
			}else{
				$('#vehiclestate8').text('踩下')
			}
			$('#vehiclestate9').text(data.gear)
			$('#vehiclestate10').text(data.autocruise)
			if(data.abs==0){
				$('#vehiclestate11').text('关闭')
			}else{
				$('#vehiclestate11').text('打开')
			}
			if(data.esp==0){
				$('#vehiclestate12').text('关闭')
			}else{
				$('#vehiclestate12').text('打开')
			}
			if(data.burglaralarm==0){
				$('#vehiclestate13').text('关闭')
			}else{
				$('#vehiclestate13').text('打开')
			}
			if(data.hood==0){
				$('#vehiclestate14').text('关闭')
			}else{
				$('#vehiclestate14').text('打开')
			}
			if(data.fueltankcap==0){
				$('#vehiclestate15').text('关闭')
			}else{
				$('#vehiclestate15').text('打开')
			}
			$('#vehiclestate16').text(data.insidepm25)
			$('#vehiclestate17').text(data.outsidepm25)
			$('#vehiclestate18').text(data.insidetemperature)
			$('#vehiclestate19').text(data.outsidetemperature)
			$('#vehiclestate20').text(data.keyposition)
			if(data.engine==1){
               $('#vehiclestate21').text('开启')
			}else{
				$('#vehiclestate21').text('关闭')
			}
			//第三栏
			//车灯
			if(data.turnleft==1){  
				$('.turnlight>img').eq(0).attr('src','img/relatime/dakai.png')
			}else{
				$('.turnlight>img').eq(0).attr('src','img/relatime/guanbi.png')
			}
			if(data.turnright==1){
				$('.turnlight>img').eq(1).attr('src','img/relatime/dakai.png')
			}else{
				$('.turnlight>img').eq(1).attr('src','img/relatime/guanbi.png')
			}
			if(data.leftanglelight==1){
				$('.cornerlamp>img').eq(0).attr('src','img/relatime/dakai.png')
			}else{
				$('.cornerlamp>img').eq(0).attr('src','img/relatime/guanbi.png')
			}
			if(data.rightanglelight==1){
				$('.cornerlamp>img').eq(1).attr('src','img/relatime/dakai.png')
			}else{
				$('.cornerlamp>img').eq(1).attr('src','img/relatime/guanbi.png')
			}
			if(data.lowbeam==1){  
				$('.actiniclamp>img').eq(0).attr('src','img/relatime/dakai.png')
			}else{
				$('.actiniclamp>img').eq(0).attr('src','img/relatime/guanbi.png')
			}
			if(data.highbeam==1){
				$('.actiniclamp>img').eq(1).attr('src','img/relatime/dakai.png')
			}else{
				$('.actiniclamp>img').eq(1).attr('src','img/relatime/guanbi.png')
			}
			if(data.frontfoglamp==1){
				$('.foglight>img').eq(0).attr('src','img/relatime/dakai.png')
			}else{
				$('.foglight>img').eq(0).attr('src','img/relatime/guanbi.png')
			}
			if(data.rearfoglamp==1){
				$('.foglight>img').eq(1).attr('src','img/relatime/dakai.png')
			} else{
				$('.foglight>img').eq(1).attr('src','img/relatime/guanbi.png')
			}
			if(data.brakelight==1){
				$('.stoplight>img').eq(0).attr('src','img/relatime/dakai.png')
			}else{
				$('.stoplight>img').eq(0).attr('src','img/relatime/guanbi.png')
			}
			if(data.hazardwarning==1){
				$('.stoplight>img').eq(1).attr('src','img/relatime/dakai.png')
			}else{
				$('.stoplight>img').eq(1).attr('src','img/relatime/guanbi.png')
			}
			if(data.readinglamp==1){
				$('.readinglamp>img').eq(0).attr('src','img/relatime/dakai.png')
			}else{
				$('.readinglamp>img').eq(0).attr('src','img/relatime/guanbi.png')
			}
			if(data.parkinglamp==1){
				$('.readinglamp>img').eq(1).attr('src','img/relatime/dakai.png')
			}else{
				$('.readinglamp>img').eq(1).attr('src','img/relatime/guanbi.png')
			}
			if(data.widthlamp==1){
				$('.clearancelamp>img').eq(0).attr('src','img/relatime/dakai.png')
			}else{
				$('.clearancelamp>img').eq(0).attr('src','img/relatime/guanbi.png')
			}
			if(data.parkingindicatorlamp==1){
				$('.clearancelamp>img').eq(1).attr('src','img/relatime/dakai.png')
			}else{
				$('.clearancelamp>img').eq(1).attr('src','img/relatime/guanbi.png')
			}
			//座椅安全
			if(data.leftheatedseat==1){  
				$('.driversseat>img').eq(0).attr('src','img/relatime/dakai.png')
			}else{
				$('.driversseat>img').eq(0).attr('src','img/relatime/guanbi.png')
			}
			if(data.rightheatedseat==1){
				$('.driversseat>img').eq(1).attr('src','img/relatime/dakai.png')
			}else{
				$('.driversseat>img').eq(1).attr('src','img/relatime/guanbi.png')
			}
			if(data.driverseatbelt==1){
				$('.safetybelt>img').eq(0).attr('src','img/relatime/dakai.png')
			}else{
				$('.safetybelt>img').eq(0).attr('src','img/relatime/guanbi.png')
			}
			if(data.passengerseatbelt==1){
				$('.safetybelt>img').eq(1).attr('src','img/relatime/dakai.png')
			}else{
				$('.safetybelt>img').eq(1).attr('src','img/relatime/guanbi.png')
			}
			//中控锁
			if(data.fldoorlock==1){     
				$('.frontdoorlock>img').eq(0).attr('src','img/relatime/dakai.png')
			}else{
				$('.frontdoorlock>img').eq(0).attr('src','img/relatime/guanbi.png')
			}
			if(data.frdoorlock==1){
				$('.frontdoorlock>img').eq(1).attr('src','img/relatime/dakai.png')
			}else{
				$('.frontdoorlock>img').eq(1).attr('src','img/relatime/guanbi.png')
			}
			if(data.rldoorlock==1){
				$('.reardoorlock>img').eq(0).attr('src','img/relatime/dakai.png')
			}else{
				$('.reardoorlock>img').eq(0).attr('src','img/relatime/guanbi.png')
			}
			if(data.rrdoorlock==1){
				$('.reardoorlock>img').eq(1).attr('src','img/relatime/dakai.png')
			}else{
				$('.reardoorlock>img').eq(1).attr('src','img/relatime/guanbi.png')
			}
			if(data.trunklock==1){
				$('.trunk>img').eq(0).attr('src','img/relatime/dakai.png')
			}else{
				$('.trunk>img').eq(0).attr('src','img/relatime/guanbi.png')
			}
			//车门车窗
			if(data.fldoor==1){       
				$('.driverdoor>img').eq(0).attr('src','img/relatime/dakai.png')
			}else{
				$('.driverdoor>img').eq(0).attr('src','img/relatime/guanbi.png')
			}
			if(data.frdoor==1){
				$('.driverdoor>img').eq(1).attr('src','img/relatime/dakai.png')
			}else{
				$('.driverdoor>img').eq(1).attr('src','img/relatime/guanbi.png')
			}
			if(data.rldoor==1){
				$('.backdoor>img').eq(0).attr('src','img/relatime/dakai.png')
			}else{
				$('.backdoor>img').eq(0).attr('src','img/relatime/guanbi.png')
			}
			if(data.rrdoor==1){
				$('.backdoor>img').eq(1).attr('src','img/relatime/dakai.png')
			}else{
				$('.backdoor>img').eq(1).attr('src','img/relatime/guanbi.png')
			}
			if(data.flwindow==1){         
				$('.drivershatchdor>img').eq(0).attr('src','img/relatime/dakai.png')
			}else{
				$('.drivershatchdor>img').eq(0).attr('src','img/relatime/guanbi.png')
			}
			if(data.frwindow==1){
				$('.drivershatchdor>img').eq(1).attr('src','img/relatime/dakai.png')
			}else{
				$('.drivershatchdor>img').eq(1).attr('src','img/relatime/guanbi.png')
			}
			if(data.rlwindow==1){
				$('.drivershatchdoor>img').eq(0).attr('src','img/relatime/dakai.png')
			}else{
				$('.drivershatchdoor>img').eq(0).attr('src','img/relatime/guanbi.png')
			}
			if(data.rrwindow==1){
				$('.drivershatchdoor>img').eq(1).attr('src','img/relatime/dakai.png')
			}else{
				$('.drivershatchdoor>img').eq(1).attr('src','img/relatime/guanbi.png')
			}
			if(data.trunk==1){
				$('.WIPERFRONT>img').eq(0).attr('src','img/relatime/dakai.png')
			}else{
				$('.WIPERFRONT>img').eq(0).attr('src','img/relatime/guanbi.png')
			}
			if(data.frontwiper==1){
				$('.WIPERFRONT>img').eq(1).attr('src','img/relatime/dakai.png')
			}else{
				$('.WIPERFRONT>img').eq(1).attr('src','img/relatime/guanbi.png')
			}
			if(data.rearwiper==1){
				$('.frontdefrost>img').eq(0).attr('src','img/relatime/dakai.png')
			}else{
				$('.frontdefrost>img').eq(0).attr('src','img/relatime/guanbi.png')
			}
			if(data.frontdefros==1){
				$('.frontdefrost>img').eq(1).attr('src','img/relatime/dakai.png')
			}else{
				$('.frontdefrost>img').eq(1).attr('src','img/relatime/guanbi.png')
			}
			if(data.reardefros==1){
				$('.queendefrost>img').eq(0).attr('src','img/relatime/dakai.png')
			}else{
				$('.queendefrost>img').eq(0).attr('src','img/relatime/guanbi.png')
			}
			//胎压温度      
			$('.leftanterior>span').eq(0).text('左前胎压'+data.fltirepressure)
			$('.leftanterior>span').eq(1).text('右前胎压'+data.frtirepressure)
			$('.rightanterior>span').eq(0).text('左后胎压'+data.rltirepressure)
			$('.rightanterior>span').eq(1).text('右后胎压'+data.rrtirepressure)      
			$('.leftTiretemperature>span').eq(0).text('左前胎温度'+data.fltiretemperature)
			$('.leftTiretemperature>span').eq(1).text('右前胎温度'+data.frtiretemperature)
			$('.rightTiretemperature>span').eq(0).text('左后胎温度'+data.rltiretemperature)
			$('.rightTiretemperature>span').eq(1).text('右后胎温度'+data.rrtiretemperature)
			// var address;
			var centerGPS = GPS.disposeGPS(data.lng,data.lat);
			var lng = Number(centerGPS.split(",")[0]);  
			var lat = Number(centerGPS.split(",")[1]);
			var pt = new BMap.Point(lng,lat);
			var ads = map.getZoom();
			map.centerAndZoom(pt,ads);
			points.push(pt)
			if(points.length==3){
				points.splice(0,1);
			}
			//删除车图片
			map.removeOverlay(carMk)
			//添加折线到地图上
			var polyline = new BMap.Polyline(points, { strokeColor: "#00AAFF", strokeWeight: 6, strokeOpacity: 1 });  //定义折线
			map.addOverlay(polyline);     
			//添加车图片
			var myIcon = new BMap.Icon("img/relatime/chetubiao.png", new BMap.Size(43, 70), {    //小车图片
				imageOffset: new BMap.Size(0, 0)    //图片的偏移量。为了是图片底部中心对准坐标点。
			});
			carMk = new BMap.Marker(pt,{icon:myIcon});
			map.addOverlay(carMk);
		}
	});		
}

function Realtimeconditiontsbcs(){
	 clearInterval(Realtimeconditionset);	
     RealtimeconditionTime = $('#lushuslider').slider('getValue')
	 RealtimeconditionTime = RealtimeconditionTime*1000
	 Realtimeconditionset = setInterval('relatimels()',RealtimeconditionTime)
	 $.messager.alert('系统提示','刷新时间为'+RealtimeconditionTime/1000+'秒')
}

$('.lushusq').click(function(){
	if($('.lushusq').attr('name')==1){
		$('.Realtimecondition-option').animate({left:"-215px"});
		$('.lushusqimg').css({
			'transform':'rotate(180deg)',
			'-ms-transform':'rotate(180deg)',	/* IE 9 */
			'-moz-transform':'rotate(180deg)', 	/* Firefox */
			'-webkit-transform':'rotate(180deg)', /* Safari 和 Chrome */
			'-o-transform':'rotate(180deg)'
		});
		$('.lushusq').attr('name','0')
	}else{
		$('.Realtimecondition-option').animate({left:"0"});
		$('.lushusqimg').css({
			'transform':'rotate(0deg)',
			'-ms-transform':'rotate(0deg)',	/* IE 9 */
			'-moz-transform':'rotate(0deg)', 	/* Firefox */
			'-webkit-transform':'rotate(0deg)', /* Safari 和 Chrome */
			'-o-transform':'rotate(0deg)'
		});
		$('.lushusq').attr('name','1')
	}
})
function Realtimeconditionsl(){
	console.log(123)
	$('.Realtimecondition-relaTime').css('z-index','99999')
	if($('.Realtimecondition-relaTime').attr('name')=='1'){
		$('.Realtimecondition-relaTime').animate({top:'60px',height:'100%'});
		$('.Realtimecondition-relaTime').attr('name','2');
		$('.Realtimecondition-relaTime>div').eq(0).find('img').css({
			'transform':'rotate(180deg)',
			'-ms-transform':'rotate(180deg)',	/* IE 9 */
			'-moz-transform':'rotate(180deg)', 	/* Firefox */
			'-webkit-transform':'rotate(180deg)', /* Safari 和 Chrome */
			'-o-transform':'rotate(180deg)'
		})
	}else if($('.Realtimecondition-relaTime').attr('name')=='2'){
		$('.Realtimecondition-relaTime').animate({top:'80%',height:'650px'});
		$('.Realtimecondition-relaTime').attr('name','1');
		$('.Realtimecondition-relaTime>div').eq(0).find('img').css({
			'transform':'rotate(0deg)',
			'-ms-transform':'rotate(0deg)',	/* IE 9 */
			'-moz-transform':'rotate(0deg)', 	/* Firefox */
			'-webkit-transform':'rotate(0deg)', /* Safari 和 Chrome */
			'-o-transform':'rotate(0deg)'
		})
	}
}

/************************5.2升级管理---升级日志*******************************/
$('#managementli26').click(function(){
	clearInterval(seti);
	clearInterval(Realtimeconditionset);
	$('main>div').css('display','none');
  	$('.UpdateLog').css('display','');
  	$('.UpdateLogtails input').val('');	
  	//权限请求
  	var data={
  		id:$('#managementli26').attr('name')
  	}
  	$.post(server_context+'/setMenuId',data,function(data){
  		if(data.error_code!=0){
  			Statuscodeprompt(data.error_code)
  		}
  		for(var i=0;i<data.data.length;i++){
  			if(data.data[i]=='115'){
  				//列表查看权限
  			}
  			if(data.data[i]=='116'){
  				// 升级日志详情查看
  				$('.UpdateLog-div').css('display','');	
  			}
  		}
  	})
  	
	$('.UpdateLog-datagrid').datagrid({
		url: server_context+'/listUpdateLog',
		method: 'post',
		singleSelect: 'true',
		fit: 'true',
		fitColumns: 'true',
		rownumbers: 'true',
		pagination: "true",
		columns:[[
		    { field:"deviceId",title:'设备编号',align:"center",width:'8%',
		        formatter: function (value, row, index) {
					var value = row.deviceId
					if(value ==null || value =="" || value =="undefined"){
							return "--"
					}
					return "<span title='" + value + "'>" + value + "</span>";
				}
	        },
	        { field:"softVer",title:'软件版本号',align:"center",width:'10%',
		        formatter: function (value, row, index) {
					var value = row.softVer
					if(value ==null || value =="" || value =="undefined"){
							return "--"
					}
					return "<span title='" + value + "'>" + value + "</span>";
				}
	        },
			{ field:"release",title:'tsr',align:"center",width:'12%',
		        formatter: function (value, row, index) {
					var value = row.release
					if(value ==null || value =="" || value =="undefined"){
							return "--"
					}
					return "<span title='" + value + "'>" + value + "</span>";
				}
	        },
			{ field:"swr",title:'swr',align:"center",width:'12%',
		        formatter: function (value, row, index) {
					var value = row.swr
					if(value ==null || value =="" || value =="undefined"){
							return "--"
					}
					return "<span title='" + value + "'>" + value + "</span>";
				}
	        },
			{ field:"requestsNumber",title:'请求次数',align:"center",width:'6%',
		        formatter: function (value, row, index) {
					var value = row.requestsNumber
					if(value ==null || value =="" || value =="undefined"){
							return "--"
					}
					return "<span title='" + value + "'>" + value + "</span>";
				}
		    },
			{ field:"hardVer",title:'硬件版本号',align:"center",width:'10%',
		         formatter: function (value, row, index) {
					var value = row.hardVer
					if(value ==null || value =="" || value =="undefined"){
							return "--"
					}
					return "<span title='" + value + "'>" + value + "</span>";
				}
		    },
			{ field:"remoteAddr",title:'请求IP地址',align:"center",width:'10%',
		         formatter: function (value, row, index) {
					var value = row.remoteAddr
					if(value ==null || value =="" || value =="undefined"){
							return "--"
					}
					return "<span title='" + value + "'>" + value + "</span>";
				}
	        },
			{ field:"fileName",title:'文件名',align:"center",width:'24%',
		        formatter: function (value, row, index) {
					var value = row.fileName
					if(value ==null || value =="" || value =="undefined"){
							return "--"
					}
					return "<span title='" + value + "'>" + value + "</span>";
				}
	        },
			{ field:"ts",title:'最近请求时间',align:"center",width:'10%',
		        formatter: function (value, row, index) {
					var value = row.ts
					if(value ==null || value =="" || value =="undefined"){
							return "--"
					}
					return "<span title='" + value + "'>" + value + "</span>";
				}
	        }
		]],
		onLoadSuccess:function(data){
			if(data.error_code!=0){
				Statuscodeprompt(data.error_code)
			}
		}
	})
})
//查看详情
$('.UpdateLog-div').click(function(){
	var row = $('.UpdateLog-datagrid').datagrid('getSelected');
	if(row == null){
		$.messager.alert('系统提示','请选择需要查看详情的数据','error');
		return;
	}
	$('#UpdateLogmyModal').modal('show');
	setTimeout(function(){
		$('.UpdateLog-modaldata').datagrid({
			url: server_context+'/listDeviceUpdateLog',
			method: 'post',
			singleSelect: 'true',
			fit: 'true',
			fitColumns: 'true',
			rownumbers: 'true',
			pagination: "true",
			queryParams:{
				deviceId:row.deviceId,
				hardVer:row.hardVer,
				release:row.tsr
			},
			columns:[[
			    { field:"deviceId",title:'设备编号',align:"center",width:'9%',
			        formatter: function (value, row, index) {
						var value = row.deviceId
						if(value ==null || value =="" || value =="undefined"){
								return "--"
						}
						return "<span title='" + value + "'>" + value + "</span>";
					}
		        },
		        { field:"softVer",title:'软件版本号',align:"center",width:'8%',
			         formatter: function (value, row, index) {
						var value = row.softVer
						if(value ==null || value =="" || value =="undefined"){
								return "--"
						}
						return "<span title='" + value + "'>" + value + "</span>";
					}
		        },
				{ field:"release",title:'tsr',align:"center",width:'11%',
			         formatter: function (value, row, index) {
						var value = row.release
						if(value ==null || value =="" || value =="undefined"){
								return "--"
						}
						return "<span title='" + value + "'>" + value + "</span>";
					}
		        },
				{ field:"swr",title:'swr',align:"center",width:'11%',
			        formatter: function (value, row, index) {
						var value = row.swr
						if(value ==null || value =="" || value =="undefined"){
								return "--"
						}
						return "<span title='" + value + "'>" + value + "</span>";
					}
		        },
				{ field:"hardVer",title:'硬件版本号',align:"center",width:'8%',
			         formatter: function (value, row, index) {
						var value = row.hardVer
						if(value ==null || value =="" || value =="undefined"){
								return "--"
						}
						return "<span title='" + value + "'>" + value + "</span>";
					}
		        },
				{ field:"remoteAddr",title:'请求IP地址',align:"center",width:'9%',
			         formatter: function (value, row, index) {
						var value = row.remoteAddr
						if(value ==null || value =="" || value =="undefined"){
								return "--"
						}
						return "<span title='" + value + "'>" + value + "</span>";
					}
		        },
				{ field:"fileName",title:'文件名',align:"center",width:'20%',
			         formatter: function (value, row, index) {
						var value = row.fileName
						if(value ==null || value =="" || value =="undefined"){
								return "--"
						}
						return "<span title='" + value + "'>" + value + "</span>";
					}
	         	},
				 { field:"summary",title:'摘要',align:"center",width:'12%',
			         formatter: function (value, row, index) {
						var value = row.summary
						if(value ==null || value =="" || value =="undefined"){
								return "--"
						}
						return "<span title='" + value + "'>" + value + "</span>";
					}
		        },
				{ field:"ts",title:'请求时间',align:"center",
			         formatter: function (value, row, index) {
						var value = row.ts
						if(value ==null || value =="" || value =="undefined"){
								return "--"
						}
						return "<span title='" + value + "'>" + value + "</span>";
					}
		        }
			]]
		})
	},300)
})
//查询
function UpdateLogchaxun(){
	$('.UpdateLog-datagrid').datagrid('load',{
		deviceId:$('#UpdateLog-bianhao').val(),
		hardVer:$('#UpdateLog-yingjian').val(),
		release:$('#UpdateLog-tsr').val(),
		//iccid:$('#UpdateLog-iccid').val()
	})
}

/************************6.1推送管理---信息推送******************************/
$('#managementli29').click(function(){
    clearInterval(seti);
	clearInterval(Realtimeconditionset);
	$('main>div').css('display','none');
	$('.informationpush').css('display','');
	$('#pushType').find('option').nextAll().remove();
	$('#pushState').find('option').nextAll().remove();
	$('#verifyState').find('option').nextAll().remove();
	$('#createUserName').val('')
	$('<option value="1">分组推送</option>').appendTo($('#pushType'))
	$('<option value="2">单体推送</option>').appendTo($('#pushType'))
	$('<option value="0">未推送</option>').appendTo($('#pushState'))
	$('<option value="1">已推送</option>').appendTo($('#pushState'))
	$('<option value="0">未审核</option>').appendTo($('#verifyState'))
	$('<option value="1">审核通过</option>').appendTo($('#verifyState'))
	$('<option value="2">审核未通过</option>').appendTo($('#verifyState'))
	var data={
		id:$('#managementli29').attr('name')
	}
	$.post(server_context+'/setMenuId',data,function(data){
		if(data.error_code!=0){
			Statuscodeprompt(data.error_code)
		}
		for(var i=0;i<data.data.length;i++){
			if(data.data[i]==161){
				$('.informationpushbottom-top-one').css('display','')
			}
			if(data.data[i]==162){
				$('.informationpushbottom-top-two').css('display','')
			}
			if(data.data[i]==163){
				$('.informationpushbottom-top-thr').css('display','')
			}
			if(data.data[i]==164){
				$('.informationpushbottom-top-four').css('display','')
			}
			if(data.data[i]==165){
				$('.informationpushbottom-top-five').css('display','')
			}
		}
	})
	$('.informationpushbottom-bottom-datagrid').datagrid({
		url:server_context+'/listPushMessage',
		method: 'get',
		// singleSelect: 'true',
		singSelect:false,
		fit: 'true',
		fitColumns: 'true',
		rownumbers: 'true',
		pageSize:50,
		pagination: "true",
		queryParams:{
            pushType:'',
			pushState:'',
			verifyState:'',
			createUserName:''
		},
		columns:[[
			{ field:"cb",checkbox:"true",align:"center"},
			{ field:"pushType",title:'推送类别',align:"center",width:'10%',
				formatter: function (value, row, index) {
					var value=row['pushType'];
					if(value==1){
					return '<a style="color:#000000">'+"分组推送"+'</a>';
					}else if(value==2){
					return '<a style="color:#000000">'+"单体推送"+'</a>';
					}
				}
			},
			{ field:"messageType",title:'信息类别',align:"center",width:'12%',
				formatter: function (value, row, index) {
					var value=row['messageType'];
					if(value==0){
					return '<a style="color:#000000">'+"普通推送消息"+'</a>';
					}else if(value==1){
					return '<a style="color:#000000">'+"反馈消息"+'</a>';
					}else if(value==2){
					return '<a style="color:#000000">'+"维保消息"+'</a>';
					}
				}
			},
			{ field:"title",title:'标题',align:"center",width:'10%',formatter: function (value) {return dataProcessing(value);}},
			{ field:"createUserName",title:'创建人',align:"center",width:'10%',formatter: function (value) {return dataProcessing(value);}},
			{ field:"ts",title:'创建时间',align:"center",width:'14%',formatter: function (value) {return dataProcessing(value);}},
			{ field:"verifyState",title:'审核状态',align:"center",width:'10%',
				formatter: function (value, row, index) {
					var value=row['verifyState'];
					if(value==0){
					return '<a style="color:#FF7E00;">'+"未审核"+'</a>';
					}else if(value==1){
					return '<a style="color:#7DAE16">'+"审核通过"+'</a>';
					}else if(value==2){
					return '<a style="color:#EE575A">'+"审核未通过"+'</a>';
					}
				}
			},
			{ field:"verifyUserName",title:'审核人员',align:"center",width:'10%',formatter: function (value) {return dataProcessing(value);}},
			{ field:"verifyDate",title:'审核时间',align:"center",width:'14%',formatter: function (value) {return dataProcessing(value);}},
			{ field:"pushState",title:'推送状态',align:"center",
				formatter: function (value, row, index) {
					var value=row['pushState'];
					if(value==0){
					return '<a href="javaScript:queryPushStatus('+index+')" id="checkpending" style="background:#EE575A;color:white;display: inline-block;width: 60px;">'+"未推送"+'</a>';
					}else if(value==1){
					return '<a href="javaScript:queryPushStatus('+index+')" id="checkpending" style="background: #7DAE16;color:white;display: inline-block;width: 60px;">'+"已推送"+'</a>';
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
//添加推送消息
function addPushMessage(){
	$('#addmoveMessageModal').modal('show');
	$('.addmoveMessageModaltitle').text('添加推送消息');
	$('.addmoveMessageModaltitle').attr('name','1')
	$('#Pushthecategory option').remove();
	$('<option value="0">--请选择--</option>').appendTo('#Pushthecategory');
	$('<option value="2" onclick="monocasetuisong()">单体推送</option>').appendTo('#Pushthecategory');
	$('<option value="1" onclick="groupingtuisong()">分组推送</option>').appendTo('#Pushthecategory');
	$('#messagetitle').val('')
	$('#messagecontent').val('')
	$('.monocasedatagrid').css('display','none')
	$('.groupingdatagrid').css('display','none')
	$('#monomerform-td-input>label').remove()
	$('<label class="checkbox-inline" id="optionsRadios1"></label>').appendTo('#monomerform-td-input')
	$('<label class="checkbox-inline" id="optionsRadios2"></label>').appendTo('#monomerform-td-input')
	$('<label class="checkbox-inline" id="optionsRadios3"></label>').appendTo('#monomerform-td-input')
	$('<input checked="checked" type="radio" name="optionsRadiosinline" style="width: 10px;" value="1">ios</input>').appendTo('#optionsRadios1')
	$('<input type="radio" name="optionsRadiosinline" style="width: 10px;" value="0">android</input>').appendTo('#optionsRadios2')
	$('<input type="radio" name="optionsRadiosinline" style="width: 10px;" value="2">全部</input>').appendTo('#optionsRadios3')
    $('#founders').val($.cookie('account'))
}
//添加/编辑保存按钮
function addmoveMessagebc(){
	var radi;
	var row;
	var isradio = document.getElementsByName('optionsRadiosinline')
	for(var i = 0; i < isradio.length; i++){
		if(isradio[i].checked==true){
			radi=isradio[i].value
		}
	}
	if($('#Pushthecategory').val()==0||$('#messagetitle').val()==''||$('#messagecontent').val()==''){
    	$.messager.alert('系统提示','必填字段不能为空','error')
		return
	}
	if($('.addmoveMessageModaltitle').attr('name')=='1'){
		var id = [];
		if($('#Pushthecategory').val()==2){
			row = $('.monocasedatagrid-bottom-datagrid1').datagrid('getRows')
			if(row.length==0||row==''){
				$.messager.alert('系统提示','请选择车主','error')
				return;
			}
		}else if($('#Pushthecategory').val()==1){
			row = $('.groupingdatagrid-top').datagrid('getChecked')
			if(row.length==0||row==''){
				$.messager.alert('系统提示','请选择用户组','error')
				return;
			}
		}
		for(var i = 0;i<row.length;i++){
			id.push(row[i].id)
		}
		var data = {
			pushType:$('#Pushthecategory').val(),//推送类别
			title:$('#messagetitle').val(),//标题
			content:$('#messagecontent').val(),//信息内容
			os:radi, //单选框
			createUserName:$('#founders').val() //创建人
		}
		if($('#Pushthecategory').val()==2){
			data.ownerIds=id.join(',')
		}
		if($('#Pushthecategory').val()==1){
			data.groupIds=id.join(',')
		}
       $.ajax({
			type:"post",
			url:server_context+"/savePushMessage",
			async:true,
			data:data,
			success:function(data){
				if(data.error_code==0){
					$.messager.alert('系统提示','保存成功','info');
                    $('#addmoveMessageModal').modal('hide');
					$('.informationpushbottom-bottom-datagrid').datagrid('reload')
				}else{
					Statuscodeprompt(data.error_code);
				}
			}
		});
	}
	if($('.addmoveMessageModaltitle').attr('name')=='2'){
	   var  row = $('.informationpushbottom-bottom-datagrid').datagrid('getSelected')
       $.ajax({
			type:"post",
			url:server_context+"/updatePushMessage",
			async:true,
			data:{
				id:row.id,
				title:$('#messagetitle').val(),//标题
				content:$('#messagecontent').val(),//信息内容
				os:radi, //单选框
			},
			success:function(data){
				if(data.error_code==0){
					$.messager.alert('系统提示','保存成功','info');
                    $('#addmoveMessageModal').modal('hide');
					$('.informationpushbottom-bottom-datagrid').datagrid('reload')
				}else{
					Statuscodeprompt(data.error_code);
				}
			}
		});
	}
}
//分组推送
function groupingtuisong(){
	$('.monocasedatagrid').css('display','none')
	$('.groupingdatagrid').css('display','')
	$('.groupingdatagrid-top').datagrid({
		url:server_context+'/listPushGroup',
		method: 'get',
		singSelect: 'false',
		fit: 'true',
		fitColumns: 'true',
		rownumbers: 'true',
		pageSize:50,
		pagination: "true",
		columns:[[
			{ field:"cb",checkbox:"true",align:"center"},
			{ field:"groupName",title:'用户组名称',align:"center",width:'20%',formatter: function (value) {return dataProcessing(value);}},
			{ field:"phone",title:'联系电话',align:"center",width:'20%',formatter: function (value) {return dataProcessing(value);}},
			{ field:"principal",title:'负责人',align:"center",width:'15%',formatter: function (value) {return dataProcessing(value);}},
			{ field:"email",title:'邮箱',align:"center",width:'20%',formatter: function (value) {return dataProcessing(value);}},
			{ field:"address",title:'地址',align:"center",formatter: function (value) {return dataProcessing(value);}}
		]]
	})	
}
//单体推送
function monocasetuisong(){
	$('.groupingdatagrid').css('display','none')
	$('.monocasedatagrid').css('display','')
	$('.monocasedatagrid-bottom-datagrid1').datagrid({
		data: {total: 0, rows:[]},
		fit: true,
		pageSize:50,
		pagination: true,
		columns:[[
			{ field:"cb",checkbox:"true",align:"center"},
			{ field:"ownerName",title:'车主姓名',align:"center",width:"25%",formatter: function (value) {return dataProcessing(value);}},
			{ field:"mobile",title:'联系电话',align:"center",width:"25%",formatter: function (value) {return dataProcessing(value);}},
			{ field:"deviceId",title:'设备ID',align:"center",formatter: function (value) {return dataProcessing(value);}}
		]]
	})
	$('.monocasedatagrid-bottom-datagrid2').datagrid({
		url: server_context+'/listPushOwner',
		method: 'get',
		singSelect: 'false',
		fit: 'true',
		fitColumns: 'true',
		rownumbers: 'true',
		pageSize:50,
		pagination: "true",
		columns:[[
			{ field:"cb",checkbox:"true",align:"center"},
			{ field:"ownerName",title:'车主姓名',align:"center",width:"25%",formatter: function (value) {return dataProcessing(value);}},
			{ field:"mobile",title:'联系电话',align:"center",width:"25%",formatter: function (value) {return dataProcessing(value);}},
			{ field:"deviceId",title:'设备ID',align:"center",formatter: function (value) {return dataProcessing(value);}}
		]]
	})
}
//左侧添加数据
function leftdatagrid(){
	var selRows = $('.monocasedatagrid-bottom-datagrid2').datagrid('getChecked');
	var rows =$('.monocasedatagrid-bottom-datagrid1').datagrid("getRows");
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
			$('.monocasedatagrid-bottom-datagrid1').datagrid('appendRow',{
				ownerName: item.ownerName,
				mobile: item.mobile,
				deviceId: item.deviceId,
				id:item.id
			});
		}
	});
	$.each(selRows, function(index, item){
		var rowIndex=$('.monocasedatagrid-bottom-datagrid2').datagrid('getRowIndex',item);
		$('.monocasedatagrid-bottom-datagrid2').datagrid('deleteRow',rowIndex);	
	});
}
//右侧添加数据
function rightdatagrid(){
	var selRows = $('.monocasedatagrid-bottom-datagrid1').datagrid('getChecked');
	var rows =$('.monocasedatagrid-bottom-datagrid2').datagrid("getRows");
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
			$('.monocasedatagrid-bottom-datagrid2').datagrid('appendRow',{
				ownerName: item.ownerName,
				mobile: item.mobile,
				deviceId: item.deviceId,
				id:item.id
			});
		}
	});
	$.each(selRows, function(index, item){
		var rowIndex=$('.monocasedatagrid-bottom-datagrid1').datagrid('getRowIndex',item);
		$('.monocasedatagrid-bottom-datagrid1').datagrid('deleteRow',rowIndex);	
	});
}
//主表查询条件
function informationpushSEXH(){
	var pushType;
	var pushState;
	var verifyState;
	if($('#pushType').val()==''){
		pushType=''
	}else{
		pushType=$('#pushType').val()	
	}
	if($('#pushState').val()==''){
		pushState=''
	}else{
		pushState=$('#pushState').val()	
	}
	if($('#verifyState').val()==''){
		verifyState=''
	}else{
		verifyState=$('#verifyState').val()	
	}
	$('.informationpushbottom-bottom-datagrid').datagrid('load',{
		pushType:pushType,
		pushState:pushState,
		verifyState:verifyState,
		createUserName:$('#createUserName').val()
	})
}
//编辑推送消息
function editorPushMessage(){
	var row = $('.informationpushbottom-bottom-datagrid').datagrid('getSelected')
	var rows = $('.informationpushbottom-bottom-datagrid').datagrid('getChecked')
	if(row == null) {
		$.messager.alert("系统提示", "请选择需要编辑的数据",'error');
		return;
	}
	if(row.pushState==1){
        $.messager.alert("系统提示", "消息已经推送不能再进行编辑",'error');
		return;
	}
	if(rows.length>=2){
		$.messager.alert("系统提示", "请选择一条数据进行编辑",'error');
		return;
	}
	$('#addmoveMessageModal').modal('show');
	$('.addmoveMessageModaltitle').text('编辑推送消息');
	$('.addmoveMessageModaltitle').attr('name','2');
	$('#Pushthecategory option').remove();
	$('#monomerform-td-input>label').remove();
	setTimeout(function(){
		if(row.pushType==2){
			$('<option value="2">单体推送</option>').appendTo('#Pushthecategory');
			$('.monocasedatagrid').css('display','none')
			$('.groupingdatagrid').css('display','')
			$('.groupingdatagrid-top').datagrid({
				url:server_context+'/listPushMessageOwner',
				method: 'get',
				singSelect: 'false',
				fit: 'true',
				fitColumns: 'true',
				rownumbers: 'true',
				pageSize:50,
				pagination: "true",
				queryParams: {
					pushId:row.id
				},
				columns:[[
					{ field:"cb",checkbox:"true",align:"center"},
					{ field:"ownerName",title:'车主姓名',align:"center",width:"25%",formatter: function (value) {return dataProcessing(value);}},
					{ field:"mobile",title:'联系电话',align:"center",width:"25%",formatter: function (value) {return dataProcessing(value);}},
					{ field:"deviceId",title:'设备ID',align:"center",formatter: function (value) {return dataProcessing(value);}}
				]]
			})
		}else if(row.pushType==1){
			$('<option value="1">分组推送</option>').appendTo('#Pushthecategory')
			$('.monocasedatagrid').css('display','none')
			$('.groupingdatagrid').css('display','')
			$('.groupingdatagrid-top').datagrid({
				url:server_context+'/listPushMessageGroup',
				method: 'get',
				singSelect: 'false',
				fit: 'true',
				fitColumns: 'true',
				rownumbers: 'true',
				pageSize:50,
				pagination: "true",
				queryParams: {
					pushId:row.id
				},
				columns:[[
					{ field:"cb",checkbox:"true",align:"center"},
					{ field:"groupName",title:'用户组名称',align:"center",width:'20%',formatter: function (value) {return dataProcessing(value);}},
					{ field:"phone",title:'联系电话',align:"center",width:'20%',formatter: function (value) {return dataProcessing(value);}},
					{ field:"principal",title:'负责人',align:"center",width:'15%',formatter: function (value) {return dataProcessing(value);}},
					{ field:"email",title:'邮箱',align:"center",width:'20%',formatter: function (value) {return dataProcessing(value);}},
					{ field:"address",title:'地址',align:"center",formatter: function (value) {return dataProcessing(value);}}
				]]
			})
		}
	},300)
	$('<label class="checkbox-inline" id="optionsRadios1"></label>').appendTo('#monomerform-td-input')
	$('<label class="checkbox-inline" id="optionsRadios2"></label>').appendTo('#monomerform-td-input')
	$('<label class="checkbox-inline" id="optionsRadios3"></label>').appendTo('#monomerform-td-input')
	if(row.os==1){
		$('<input checked="checked" type="radio" name="optionsRadiosinline" style="width: 10px;" value="1">ios</input>').appendTo('#optionsRadios1')
		$('<input type="radio" name="optionsRadiosinline" style="width: 10px;" value="0">android</input>').appendTo('#optionsRadios2')
		$('<input type="radio" name="optionsRadiosinline" style="width: 10px;" value="2">全部</input>').appendTo('#optionsRadios3')
	}
	if(row.os==0){
		$('<input checked="checked" type="radio" name="optionsRadiosinline" style="width: 10px;" value="0">android</input>').appendTo('#optionsRadios2')
		$('<input type="radio" name="optionsRadiosinline" style="width: 10px;" value="1">ios</input>').appendTo('#optionsRadios1')
		$('<input type="radio" name="optionsRadiosinline" style="width: 10px;" value="2">全部</input>').appendTo('#optionsRadios3')
	}
	if(row.os==2){
		$('<input checked="checked" type="radio" name="optionsRadiosinline" style="width: 10px;" value="2">全部</input>').appendTo('#optionsRadios3')
		$('<input type="radio" name="optionsRadiosinline" style="width: 10px;" value="0">android</input>').appendTo('#optionsRadios2')
		$('<input type="radio" name="optionsRadiosinline" style="width: 10px;" value="1">ios</input>').appendTo('#optionsRadios1')
	}
	$('#founders').val(row.createUserName) //创建人
	$('#messagetitle').val(row.title)  //标题
	$('#messagecontent').val(row.content)
}
//添加编辑弹出框查询功能
function monocasedatagridinquire(){
	$('.monocasedatagrid-bottom-datagrid2').datagrid('load',{
		ownerName:$('.monocasedatagrid-top-two-name').val(),
		mobile:$('.monocasedatagrid-top-two-phone').val()
	})
}
//删除推送消息
function removePushMessage(){
	var row = $('.informationpushbottom-bottom-datagrid').datagrid('getChecked')
	if(row==null || row==undefined || row==''){
		$.messager.alert("系统提示", "请选择需要删除的数据",'error');
		return;
	}
	var id = [];
	for(var i=0;i<row.length;i++){
        id.push(row[i].id)
	}
	$.messager.confirm('系统提示','确认删除此数据',function(r){
		if(r){
			$.ajax({
				type:"post",
				url:server_context+"/removePushMessage",
				async:true,
				data:{
					id:id.join(',')
				},
				success:function(data){
					if(data.error_code==0){
						$.messager.alert('系统提示','删除成功','info')
						$('.informationpushbottom-bottom-datagrid').datagrid('reload')
					}else{
						Statuscodeprompt(data.error_code)
					}
				}
			});
		}
	})
}
//查看推送消息    
function lookoverPushMessage(){
	var row = $('.informationpushbottom-bottom-datagrid').datagrid('getSelected')
	var rows = $('.informationpushbottom-bottom-datagrid').datagrid('getChecked')
	if(row==null){
		$.messager.alert("系统提示", "请选择需要查看的数据",'error');
		return;
	}
	if(rows.length>=2){
		$.messager.alert("系统提示", "请选择一条推送消息进行审核",'error');
		return;
	}
	$('#LookauditMessageModal').modal('show');
	$('.auditMessagestitle').text('查看推送消息')
	$('.auditMessagefooter').css('display','none')
	if(row.pushType==1){
		$('#lookPushThecateGory').text('分组推送');
		$('#LookauditMessagedt').css('display','none')
		$('#LookauditMessagedtfz').css('display','')
		Lookshquiretwo(row)
	}else{
		$('#lookPushThecateGory').text('单体推送');
		$('#LookauditMessagedt').css('display','')
		$('#LookauditMessagedtfz').css('display','none')
		Lookshquire(row)
	}
	if(row.os==1){
		$('#Looksystemtype').text('ios');
	}
	if(row.os==0){
		$('#Looksystemtype').text('android');
	}
	if(row.os==2){
		$('#Looksystemtype').text('全部');
	}
	$('#Lookfounder').text(row.createUserName);
	$('#Lookheadline').text(row.title);
	$('#Lookinformationcontent').text(row.content);
}
//查看/审核弹出框下册表加载   单体推送
function Lookshquire(row){
	setTimeout(function(){
       $('.LookPushMessage-datagrid').datagrid({
			url: server_context+'/listPushMessageOwner',
			method: 'get',
			singleSelect: 'true',
			fit:'true',
			fitColumns: 'true',
			rownumbers: 'true',
			pageSize:50,
			pagination: "true",
			queryParams: {
				pushId:row.id
			},
			columns:[[
				{ field:"cb",checkbox:"true",align:"center"},
				{ field:"ownerName",title:'车主姓名',align:"center",width:"25%",formatter: function (value) {return dataProcessing(value);}},
				{ field:"mobile",title:'联系电话',align:"center",width:"25%",formatter: function (value) {return dataProcessing(value);}},
				{ field:"deviceId",title:'设备ID',align:"center",formatter: function (value) {return dataProcessing(value);}}
			]]
		})
	},300)
}
//查看/审核弹出框下册表   单体推送查询
function inquireaudit(){
	var row = $('.informationpushbottom-bottom-datagrid').datagrid('getSelected')
	$('.LookPushMessage-datagrid').datagrid('load',{
		ownerName:$('#inquireNameau').val(),
		mobile:$('#inquireNamedit').val(),
		pushId:row.id
	})
}
//查看/审核弹出框下册表加载   分组推送
function Lookshquiretwo(row){
	setTimeout(function(){
       $('.LookPushMessage-datagrid-two').datagrid({
			url: server_context+'/listPushMessageGroup',
			method: 'get',
			singleSelect: 'true',
			fit:'true',
			fitColumns: 'true',
			rownumbers: 'true',
			pageSize:50,
			pagination: "true",
			queryParams: {
				pushId:row.id
			},
			columns:[[
				{ field:"cb",checkbox:"true",align:"center"},
				{ field:"groupName",title:'用户组名称',align:"center",width:'20%',formatter: function (value) {return dataProcessing(value);}},
				{ field:"phone",title:'联系电话',align:"center",width:'20%',formatter: function (value) {return dataProcessing(value);}},
				{ field:"principal",title:'负责人',align:"center",width:'15%',formatter: function (value) {return dataProcessing(value);}},
				{ field:"email",title:'邮箱',align:"center",width:'20%',formatter: function (value) {return dataProcessing(value);}},
				{ field:"address",title:'地址',align:"center",formatter: function (value) {return dataProcessing(value);}}
			]]
		})
	},300)
}
//查看/审核弹出框下册表    分组推送查询
function inquireaudittwo(){
	var row = $('.informationpushbottom-bottom-datagrid').datagrid('getSelected')
	$('.LookPushMessage-datagrid-two').datagrid('load',{
		groupName:$('#inquireNameaustwo').val(),
		pushId:row.id
	})
}
//审核推送消息
function auditPushMessage(){
	var row = $('.informationpushbottom-bottom-datagrid').datagrid('getSelected')
	var rows = $('.informationpushbottom-bottom-datagrid').datagrid('getChecked')
	if(row==null){
		$.messager.alert("系统提示", "请选择消息进行审核",'error');
		return;
	}
	if(row.verifyState==1){
        $.messager.alert("系统提示", "审核已通过不能再进行审核",'error');
		return;
	}
	if(rows.length>=2){
		$.messager.alert("系统提示", "请选择一条推送消息进行审核",'error');
		return;
	}
	$('#LookauditMessageModal').modal('show');
	$('.auditMessagestitle').text('审核推送消息')
	$('.auditMessagefooter').css('display','')
	if(row.pushType==1){
		$('#lookPushThecateGory').text('分组推送');
		$('#LookauditMessagedt').css('display','none')
		$('#LookauditMessagedtfz').css('display','')
		Lookshquiretwo(row)
	}else{
		$('#lookPushThecateGory').text('单体推送');
		$('#LookauditMessagedt').css('display','')
		$('#LookauditMessagedtfz').css('display','none')
		Lookshquire(row)
	}
	if(row.os==1){
		$('#Looksystemtype').text('ios');
	}
	if(row.os==0){
		$('#Looksystemtype').text('android');
	}
	if(row.os==2){
		$('#Looksystemtype').text('全部');
	}
	$('#Lookfounder').text(row.createUserName);
	$('#Lookheadline').text(row.title);
	$('#Lookinformationcontent').text(row.content);
}
//审核推送消息通过/未通过接口
$('.auditMessagesbutton').click(function(){
	$('.out').css('display','')
	var row = $('.informationpushbottom-bottom-datagrid').datagrid('getSelected')
	$('.auditMessagesbutton').attr('disabled','disabled')
	$.ajax({
		type:"post",
		url:server_context+"/verifyPushMessage",
		async:true,
		data:{
			pushId:row.id,
			verifyState:$(this).attr('name')
		},
		success:function(data){
			$('.out').css('display','none')
			$('.auditMessagesbutton').removeAttr('disabled','disabled')
			if(data.error_code==0){
				$.messager.alert('系统提示','审核成功','info');
				$('#LookauditMessageModal').modal('hide');
				$('.informationpushbottom-bottom-datagrid').datagrid('reload');
			}else{
				Statuscodeprompt(data.error_code)
			}
		}
	});
})
//推送信息发送状态
var queryPushStatusindex;
function queryPushStatus(index){
	queryPushStatusindex = index;
	var row = $('.informationpushbottom-bottom-datagrid').datagrid('getData').rows[index];
	if(row.pushState==0){
	    $.messager.alert('系统提示','该消息未发送,暂无详细数据');
		return;
	}
	$('#PushstateModalbottom').modal('show');
	//单体推送
	if(row.pushType==2){
		$('.informationpushbtmsx').css('display','none')
		$('.pushTypeone').css('display','none')
		$('.pushTypetwo').css('display','')
		setTimeout(function(){
				$('.pushTypetwo-datagrid').datagrid({
				url: server_context+'/listPushMessageOwner',
				method: 'get',
				singleSelect: 'true',
				fit:'true',
				fitColumns: 'true',
				rownumbers: 'true',
				pageSize:50,
				pagination: "true",
				queryParams: {
					pushId:row.id
				},
				columns:[[
					{ field:"cb",checkbox:"true",align:"center"},
					{ field:"ownerName",title:'车主姓名',align:"center",width:"15%",formatter: function (value) {return dataProcessing(value);}},
					{ field:"mobile",title:'联系电话',align:"center",width:"19%",formatter: function (value) {return dataProcessing(value);}},
					{ field:"deviceId",title:'设备ID',align:"center",width:"16%",formatter: function (value) {return dataProcessing(value);}},
					{ field:"ts",title:'推送时间',align:"center",width: '26%',formatter: function (value) {return dataProcessing(value);}},
					{ field:"Status",title:'推送状态',align:"center",
						formatter: function (value, row, index) {
							var value=row['Status'];
							if(value==0){
								return '推送失败';
							}else{
								return '推送成功';
							}
						}
					}
				]]
			})
		},300)
	}
	//分组推送
	if(row.pushType==1){
		$('.informationpushbtmsx').css('display','')
		$('.pushTypeone').css('display','')
		$('.pushTypetwo').css('display','none')
		$('.pushTypeone>p').css('display','none')
		$('.pushTypeone>div').css('display','none')
		$.ajax({
			type:'get',
			url:server_context+'/getGroupPushStatus',
			async:'true',
			data:{
				pushId:row.id
			},    
			success:function(data){
				var data = data.data;
				if(data.length==0){
                    return;
				}
				if(data[0].os==0){
                    $('.pushTypeone>p').eq(0).css('display','')
					$('.pushTypeone>div').eq(0).css('display','')
                    $('#messageIDandroid').text(data[0].xgPushId);
					$('#Pushthetimeandroid').text(data[0].startDate);
					$('#informationpushandroid').text(data[0].total);
					$('#Completethepushandroid').text(data[0].finished);
					if(data[0].status==0){
                       $('#sendstateandroid').text('待发送');
					}else if(data[0].status==1){
						$('#sendstateandroid').text('发送中');
					}else if(data[0].status==2){
						$('#sendstateandroid').text('发送完成');
					}else if(data[0].status==3){
						$('#sendstateandroid').text('发送失败');
					}
					$('#refreshtimeandroid').text(data[0].ts);
					if(data.length==2){
                        $('.pushTypeone>p').eq(1).css('display','')
						$('.pushTypeone>div').eq(1).css('display','')
                        $('#messageIDios').text(data[1].xgPushId);
						$('#Pushthetimeios').text(data[1].startDate);
						$('#informationpushios').text(data[1].total);
						$('#Completethepushios').text(data[1].finished);
						if(data[1].status==0){
							$('#sendstateios').text('待发送')
						}else if(data[1].status==1){
							$('#sendstateios').text('发送中')
						}
						else if(data[1].status==2){
							$('#sendstateios').text('发送完成')
						}
						else if(data[1].status==3){
							$('#sendstateios').text('发送失败')
						}
						$('#refreshtimeios').text(data[1].ts);
					}
				}
				if(data[0].os==1){
					$('.pushTypeone>p').eq(1).css('display','')
					$('.pushTypeone>div').eq(1).css('display','')
					$('#messageIDios').text(data[0].xgPushId);
					$('#Pushthetimeios').text(data[0].startDate);
					$('#informationpushios').text(data[0].total);
					$('#Completethepushios').text(data[0].finished);
					if(data[0].status==0){
						$('#sendstateios').text('正在发送')
					}else if(data[0].status==1){
						$('#sendstateios').text('发送中')
					}
					else if(data[0].status==2){
						$('#sendstateios').text('发送完成')
					}
					else if(data[0].status==3){
						$('#sendstateios').text('发送失败')
					}
					$('#refreshtimeios').text(data[0].ts);
					if(data.length==2){
						$('.pushTypeone>p').eq(0).css('display','')
						$('.pushTypeone>div').eq(0).css('display','')
						$('#messageIDandroid').text(data[1].xgPushId);
						$('#Pushthetimeandroid').text(data[1].startDate);
						$('#informationpushandroid').text(data[1].total);
						$('#Completethepushandroid').text(data[1].finished);
						if(data[1].status==0){
						$('#sendstateandroid').text('正在发送');
						}else if(data[1].status==1){
							$('#sendstateandroid').text('发送中');
						}else if(data[1].status==2){
							$('#sendstateandroid').text('发送完成');
						}else if(data[1].status==3){
							$('#sendstateandroid').text('发送失败');
						}
						$('#refreshtimeandroid').text(data[1].ts);
					}
				}
				if(data.length==1){

				}
				if(data.length==1){
					if(data[0].status==2){
						$('.informationpushbtmsx').attr('disabled','disabled');
					}
					else{
						$('.informationpushbtmsx').removeAttr('disabled','disabled');
					}
				}
				if(data.length==2){
					if(data[0].status==2&&data[1].status==2){
						$('.informationpushbtmsx').attr('disabled','disabled');
					}else{
						$('.informationpushbtmsx').removeAttr('disabled','disabled');
					}
				}
				// if($('#sendstateandroid').text()=='发送完成'&&$('#sendstateios').text()=='发送完成'){
				// 	$('.informationpushbtmsx').attr('disabled','disabled');
				// }else{
				// 	$('.informationpushbtmsx').removeAttr('disabled','disabled');
				// } 
			}
		})
       
	}
	
}
//推送信息刷新按钮
$('.informationpushbtmsx').click(function(){
	$('.informationpushbtmsx').attr('disabled','disabled');
	 var row = $('.informationpushbottom-bottom-datagrid').datagrid('getData').rows[queryPushStatusindex];
	 var data={};
	 var xgid=[];
	 var os=[];
	 data.pushId = row.id;
	 if($('#sendstateandroid').text()!='发送完成'){
        xgid.push($('#messageIDandroid').text());
		os.push('0');
	 }
	 if($('#sendstateios').text()!='发送完成'){
        xgid.push($('#messageIDios').text());
		os.push('1');
	 }
	 data.xgPushId = xgid.join(',');
	 data.os = os.join(',')
	 $.ajax({
		type:'post',
		url:server_context+'/updateGroupPushStatus',
		async:'true',
		data:data,
		success:function(data){
			var data = data.data;
			if(data.length==0){
				return;
			}
			if(data[0].os==0){
				$('.pushTypeone>p').eq(0).css('display','')
				$('.pushTypeone>div').eq(0).css('display','')
				$('#messageIDandroid').text(data[0].xgPushId);
				$('#Pushthetimeandroid').text(data[0].startDate);
				$('#informationpushandroid').text(data[0].total);
				$('#Completethepushandroid').text(data[0].finished);
				if(data[0].status==0){
					$('#sendstateandroid').text('待发送');
				}else if(data[0].status==1){
					$('#sendstateandroid').text('发送中');
				}else if(data[0].status==2){
					$('#sendstateandroid').text('发送完成');
				}else if(data[0].status==3){
					$('#sendstateandroid').text('发送失败');
				}
				$('#refreshtimeandroid').text(data[0].ts);
				if(data.length==2){
					$('.pushTypeone>p').eq(1).css('display','')
					$('.pushTypeone>div').eq(1).css('display','')
					$('#messageIDios').text(data[1].xgPushId);
					$('#Pushthetimeios').text(data[1].startDate);
					$('#informationpushios').text(data[1].total);
					$('#Completethepushios').text(data[1].finished);
					if(data[1].status==0){
						$('#sendstateios').text('待发送')
					}else if(data[1].status==1){
						$('#sendstateios').text('发送中')
					}
					else if(data[1].status==2){
						$('#sendstateios').text('发送完成')
					}
					else if(data[1].status==3){
						$('#sendstateios').text('发送失败')
					}
					$('#refreshtimeios').text(data[1].ts);
				}
			}
			if(data[0].os==1){
				$('.pushTypeone>p').eq(1).css('display','')
				$('.pushTypeone>div').eq(1).css('display','')
				$('#messageIDios').text(data[0].xgPushId);
				$('#Pushthetimeios').text(data[0].startDate);
				$('#informationpushios').text(data[0].total);
				$('#Completethepushios').text(data[0].finished);
				if(data[0].status==0){
					$('#sendstateios').text('正在发送')
				}else if(data[0].status==1){
					$('#sendstateios').text('发送中')
				}
				else if(data[0].status==2){
					$('#sendstateios').text('发送完成')
				}
				else if(data[0].status==3){
					$('#sendstateios').text('发送失败')
				}
				$('#refreshtimeios').text(data[0].ts);
				if(data.length==2){
					$('.pushTypeone>p').eq(0).css('display','')
					$('.pushTypeone>div').eq(0).css('display','')
					$('#messageIDandroid').text(data[1].xgPushId);
					$('#Pushthetimeandroid').text(data[1].startDate);
					$('#informationpushandroid').text(data[1].total);
					$('#Completethepushandroid').text(data[1].finished);
					if(data[1].status==0){
					$('#sendstateandroid').text('正在发送');
					}else if(data[1].status==1){
						$('#sendstateandroid').text('发送中');
					}else if(data[1].status==2){
						$('#sendstateandroid').text('发送完成');
					}else if(data[1].status==3){
						$('#sendstateandroid').text('发送失败');
					}
					$('#refreshtimeandroid').text(data[1].ts);
				}
			}
			if(data.length==1){
               if(data[0].status==2){
                   $('.informationpushbtmsx').attr('disabled','disabled');
			   }
			   else{
					$('.informationpushbtmsx').removeAttr('disabled','disabled');
				}
			}
			if(data.length==2){
 				if(data[0].status==2&&data[1].status==2){
                   $('.informationpushbtmsx').attr('disabled','disabled');
			    }else{
					$('.informationpushbtmsx').removeAttr('disabled','disabled');
				}
			}
		}   
	 })
})


/************************8.1应用管理--应用管理******************************/
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
		// singleSelect: 'true',
		singSelect:false,
		fit: 'true',
		fitColumns: 'true',
		rownumbers: 'true',
		pageSize:50,
		pagination: "true",
		columns:[[
			{ field:"cb",checkbox:"true",align:"center"},
			{ field:"appId",title:'应用ID',align:"center",width:'12%',formatter: function (value) {return dataProcessing(value);}},
			{ field:"secret",title:'唯一标示密钥',align:"center",width:'16%',formatter: function (value) {return dataProcessing(value);}},
			{ field:"active",title:'状态',align:"center",width:'12%',
		        formatter:function(value, rows, index){
                    var active = rows.active;
					if(active==1){
                       return '<a style="color:#7CAD16">启用</a>';
					}else{
                       return '<a style="color:#EC5759">禁用</a>';
					}
				}
		    },
			{ field:"provider",title:'设备供应商',align:"center",width:'12%',formatter: function (value) {return dataProcessing(value);}},
			{ field:"ts",title:'最后请求时间戳',align:"center",width:'16%',formatter: function (value) {return dataProcessing(value);}},
			{ field:"uuid",title:'UUID',align:"center",width:'26%',formatter: function (value) {return dataProcessing(value);}},
			{ field:"summary",title:'操作',align:"center",width:'6%',
		        formatter:function(value, row, index){
					return '<a style="display:inline-block;line-height:20px;width:60px;height:20px;background:#00AAFF;color:white" href=\javaScript:appliedmanagementModify2('+ index +')>'+"详情"+'</a>';

				}
		    }
		]],
		onLoadSuccess:function(data){
			if(data.error_code!=0){
				Statuscodeprompt(data.error_code)
			}
		}
	})
})
//添加应用
function appliedmanagementadd(){
	$('#appliedmanagementModal').modal('show')
	$('#appliedmanagement-ID').val('');
	$('#appliedmanagement-supplier').val('')
	$('#appliedmanagement-summary').val('')
	$('#appliedmanagement-state').find('option').remove()
	$('<option value="0" selected>禁用</option>').appendTo($('#appliedmanagement-state'))
	$('<option value="1">启用</option>').appendTo($('#appliedmanagement-state'))
	$('#addopenappspan').html('添加应用');
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
			provider:$('#appliedmanagement-supplier').val(),
			summary:$('#appliedmanagement-summary').val()
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
	$('#appliedmanagement-summary').val(row.summary)
	$('#addopenappspan').html('编辑应用');
	appliedmanagementurl=server_context+"/updateOpenApp"
}
//删除应用
function appliedmanagementremove(){
	var row = $('.appliedmanagement-datagrid').datagrid('getSelected');
	if(row == null || row =='' ||row == undefined){
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
//查看应用
function appliedmanagementModify2(index){
	
	var rows = $(".appliedmanagement-datagrid").datagrid('getRows');
	var row = rows[index]
	$('#appliedmanagementModal2').modal('show')
	if(row.active==0){
		$('#appliedmanagement-state2').text('禁用');
	}else if(row.active==1){
		$('#appliedmanagement-state2').text('启用');
	}else{
		$('#appliedmanagement-state2').text('--');
	}
	$('#appliedmanagement-ID2').text(row.appId);
	$('#appliedmanagement-supplier2').text(row.provider)
	$('#appliedmanagement-summary2').text(row.summary)
	
}

