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
				location.href="/index.jsp"
			}else if(data.error_code==10002){
				alert("验证码输入错误")
			}else{
				alert("账号密码错误")
			}  
		})
	})