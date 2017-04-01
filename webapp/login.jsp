<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
		<html>

		<head>
			<meta charset="UTF-8">
			<meta http-equiv=”X-UA-Compatible” content=”IE=edge,chrome=1″ />
			<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
			<link rel="stylesheet" href="css/login.css" />
			<script src="js/public/jquery.min.js"></script>
			<script src="js/public/jquery.cookie.js"></script>
			<title>它石车联网数据管理平台</title>
			<style>
				.bear {
					margin-top: 55px !important;
				}
				#form>div {
					width: 208px;
					height: 28px;
					margin: 10px auto;
					border: 1px solid #999999;
					position: relative;
				}
				
				#form span {
					display: inline-block;
					height: 100%;
				}
				
				#form span>img {
					width: 18px;
					height: 18px;
					position: absolute;
					top: 4px;
				}
				
				#password,
				#account,
				#verification {
					width: 100%;
					height: 25px;
					border: none;
					background: none;
					color: white;
				}
				
				.bearone,
				.gearone,
				.searone {
					margin-left: 10px;
					width: 30px;
				}
				
				.beartwo,
				.geartwo {
					width: 160px;
					height: 25px;
					position: absolute;
					background: #01141A;
				}
				
				#form>div:nth-of-type(3) {
					border: none;
				}
				
				.sear {
					width: 110px;
					height: 100%;
					border: 1px solid #999999;
				}
				
				.seartwo {
					position: absolute;
					background: #01141A;
					width: 68px;
					height: 25px !important;
				}
				
				.searthree {
					width: 65px !important;
					height: 25px !important;
					position: absolute;
					left: 114px;
				}
				
				.ghyzm {
					position: absolute;
					width: 25px;
					height: 25px !important;
					right: 0;
				}
				
				.ghyzm>img {
					width: 19px !important;
					height: 19px !important;
					top: 3px !important;
				}
			</style>
		</head>

		<body>
			<div class="top">
				<nav>
					<span class="logo"> 
				   <img src="img/login/LOGO.png" alt="" />
				</span>
					<span class="ts">
					<h5>它石车联网数据管理平台</h5>
				    <span>TASS vehicle networking data management platform</span>
					</span>
					<div class="website">
						<p>
							<a href="#">企业官网<span></span></a>
							<span><img src="img/imagess/HOME.png" alt="" /></span>
						</p>
						<p>中文简体
							<span><img src="img/imagess/xiala.png" alt="" /></span>
						</p>
					</div>
				</nav>
			</div>
			<div class="main">
				<main>
					<div class="center">
						<div class="center_01">
							<span><img src="" alt="" /></span> 密码登陆
						</div>
						<div class="center_02">
							<span><img src="" alt="" /></span> 令牌登陆
						</div>
						<div class="form">
							<form id="form">
								<div class="bear">
									<span class="bearone"><img src="img/login/zhanghao.png" alt="" /></span>
									<span class="beartwo"><input type="text" name="account" id="account" autocomplete="off" placeholder="请输入账号" required/></span>
								</div>
								<div class="gear">
									<span class="gearone"><img src="img/login/mima.png"/></span>
									<span class="geartwo"><input type="password" name="password" id="password" placeholder="请输入密码" required/></span>
								</div>
								<div>
									<div class="sear">
										<span class="searone"><img src="img/login/yanzhengma.png"/></span>
										<span class="seartwo"><input type="text" placeholder="验证码" id="verification" required/></span>
										<span class="searthree"><input type="button" id="code" title='点击更换验证码'/></span>
										<span class="ghyzm"><img src="img/login/shuaxin.png" alt="" /></span>
									</div>
								</div>
								<button>登录</button>
							</form>
						</div>
						<!--令牌登陆-->
						<div></div>
					</div>
				</main>
			</div>
			<div class="foot">
				<footer>
					<p>软件版本号: 1.1.1.20170101_beta</p>
					<p>版本信息: rewetrtra23445eewt35t346t42343tgfe</p>
				</footer>
			</div>
		</body>

		</html>
		<script>
	var checkCode = document.getElementById("code");
	function login(){
	    $.ajax({
	    	url:"<%=request.getContextPath()%>/getVerifyToken",
	    	type:"POST",
	    	success:function(data){
	    		checkCode.value = data.data.verifyToken;
	    	}
	    })
	}
	login();
	$('#code').click(function(){
		login();
	})
	$('.ghyzm').click(function(){
		login();
	})
	//点击登陆发起请求
	$("form").submit(function(e){
		e.preventDefault();
		var data={
			account:$('#account').val(),
			password:$('#password').val(),
			verification:$('#verification').val()
		};
		$.post("<%=request.getContextPath()%>/login",data,function(data){
			if(data.error_code==0){
				$.cookie('account',data.data[0].userName)
				localStorage.groupName = data.data[0].groupName;
				localStorage.roleName = data.data[0].roleName
				location.href="<%=request.getContextPath()%>/index.jsp"
			}else if(data.error_code==10002){
				console.log(123)
				alert("验证码输入错误")
			}else{
				alert("账号密码错误")
			}  
		})
	})
</script>