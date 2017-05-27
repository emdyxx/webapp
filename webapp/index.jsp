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
		<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE10" /> 
		<link rel="stylesheet" href="css/index.css" />
		<link rel="stylesheet" href="css/TheOwner.css">
		<link rel="stylesheet" href="css/three.css" />
		<script src="js/public/jquery.min.js"></script>
		<script src="easyui/jquery.easyui.min.js"></script>
		<script src="easyui/easyui-lang-zh_CN.js"></script>
		<link rel="stylesheet" href="easyui/icon.css" />
		<link rel="stylesheet" href="css/bootstrap.css" />
		<link rel="stylesheet" href="easyui/easyui.css" />
		<script src="js/public/bootstrap.min.js"></script>
		<script src="js/public/jquery.cookie.js"></script>
		<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=jFv6hdya18Fhm8APEKM9yhtl3rBzQSzY"></script>
		<script src="js/public/GPS.js"></script>
		<title>它石车联网数据管理平台</title>
		<style>
		    .ThirdpartyEquipment-search{
				width: 100%;
				position: absolute;
				height: 37px;
				top: 61px;
			}
			.ThirdpartyEquipment-search > span {
				margin-left: 20px;
			}
			.ThirdpartyEquipment-search > input {
				border: 1px solid #6DC8F5;
				background: none;
				margin-top:7px;
			}
			.ThirdpartyEquipment-search > a {
				display: inline-block;
				color: white;
				width: 80px;
				margin-left: 20px;
				background: #00AAFF;
				border-radius: 3px;
				text-align: center;
			}
			.ThirdpartyEquipment-bottom{
				width: 100%;
				height: auto;
				position: absolute;
				top: 97px;
				bottom: 0;
				background: white;
			}
            .ThirdpartyEquipment-bottom-top{
				position: absolute;
				top: 0;
				width: 100%;
				padding-top: 5px;
				padding-bottom: 5px;
				padding-left: 17px;
			}
            .ThirdpartyEquipment-bottom-bottom{
				position: absolute;
				top: 36px;
				bottom: 0;
				width: 100%;
				height: auto;
			}
			.Motorcyclebottom-right-divtwo{
                width:100%;
				height:280px;
				margin-top:30px;
				overflow: auto;
			}
			.trilaterald1{
				margin-top: 10px;width:100%;height:130px;position: relative;
			}
			.trilaterald2{font-size: 16px;position:absolute;width:110px;height:130px;line-height:130px;text-align:center;display:inline-block;position: absolute;}
			.trilaterald3{display: inline-block;width:23px;}
            .trilaterald4{display:inline-block;width:100px;height:130px;margin-left:20px;position: relative;}
			.trilaterald4:nth-of-type(1){
				margin-left:110px;
			}
			.trilaterald5{position: absolute;text-align: center;display: inline-block;width: 100px;margin-top: 8px;}
		    .trilaterald6{}
			.trilaterald7{width:100px;height:100px;}
			.trilaterald8{display: inline-block;width: 100px;text-align: center;position: absolute;bottom: 0;left: 0;}
			.trilaterald9{width:23px;height:23px;}
		</style>
	</head>

	<body>
		<div class="out" style="display:none;">
			<div class="sk-circle">
				<div class="sk-circle1 sk-child"></div>
				<div class="sk-circle2 sk-child"></div>
				<div class="sk-circle3 sk-child"></div>
				<div class="sk-circle4 sk-child"></div>
				<div class="sk-circle5 sk-child"></div>
				<div class="sk-circle6 sk-child"></div>
				<div class="sk-circle7 sk-child"></div>
				<div class="sk-circle8 sk-child"></div>
				<div class="sk-circle9 sk-child"></div>
				<div class="sk-circle10 sk-child"></div>
				<div class="sk-circle11 sk-child"></div>
				<div class="sk-circle12 sk-child"></div>
			</div>
			<span class="outTest" style="margin-top: 49%;margin-left: 15px;display:none;">数据读取中</span>
		</div> 
		<div class="all">
			<div class="right">
				<div class="right_in">
					<nav>
						<div class="nav-right">
							<span>它石车联网数据管理平台</span>
							<span class="nav-right-right">
			           	   	   <p>
			           	   	   	  <img src="img/imagess/HOME.png" alt="" />
			           	   	   	    <a href="index.jsp" style="color: #333;">主页</a>
			           	   	   </p>
			           	   	   <p>
			           	   	   	<img src="img/imagess/fuwupingtai.png" alt="" />
			           	   	   	    <a href="http://192.168.11.16:8080/" style="color: #333;">服务中心</a>
			           	   	   </p>
			           	   	   <div id="pswquit">
									<img src="img/imagess/USER.png" alt="" />
									<span class="accounts"></span>
									<img class="nav-right-right-tb" src="img/imagess/daohangjiantoux.png" alt="" />
									<!--修改密码/退出登录-->
									<p class="nav-right-right-xl" style="display: none;">
										<span onclick='amendpsw()'>
												<span>
													<img src="img/imagess/xiugaimima.png" alt="" />
												</span>
												<button class="buttonss">修改密码</button>
										</span>
										<span onClick="quitaccount()">
												<span><img src="img/imagess/tuichuzhanghao.png" alt="" /></span> 退出账号
										</span>
									</p>	   
			           	   	   </div>
			           	   	   
							</span>
						</div>
					</nav>
					<!-- 模态框（Modal-->
					<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
						<div class="modal-dialog">
							<div class="modal-content">
								<div class="modal-header">
									<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
										&times;
									</button>
									<h4 class="modal-title" id="myModalLabel">
										修改密码
									</h4>
								</div>
								<div class="modal-body">
									<form class="form-horizontal" role="form">
										<div class="form-group">
											<label for="inputPassword" class="col-sm-2 control-label">原密码</label>
											<div class="col-sm-10">
												<input type="password" class="form-control rawpsw" maxlength="20" id="inputPassword" placeholder="请输入原密码">
											</div>
										</div>
										<div class="form-group">
											<label for="inputPassword" class="col-sm-2 control-label">新密码</label>
											<div class="col-sm-10">
												<input type="password" class="form-control newpsw" maxlength="20" id="inputPassword" placeholder="请输入新密码">
											</div>
										</div>
										<div class="form-group">
											<label for="inputPassword" class="col-sm-2 control-label">确认密码</label>
											<div class="col-sm-10">
												<input type="password" class="form-control newpsword" maxlength="20" id="inputPassword" placeholder="确认新密码">
											</div>
										</div>
									</form>
								</div>
								<div class="modal-footer">
									<button type="button" class="btn btn-default" data-dismiss="modal">关闭
									</button>
									<button type="button" class="btn btn-primary" onClick="amendpassword()">
										提交更改
									</button>
								</div>
							</div>
							<!-- /.modal-content -->
						</div>
						<!-- /.modal -->
					</div>
					<main>
						<!--0.0背景图片-->
						<div class="background">
							<div>
								<span>Welcome TASS</span>
								<span>Internet Of Vehicles Network </span>
							</div>
							<img src="img/login/welcomebackground.png" alt="" />
						</div>
						<!--1.1系统管理---组织管理-->
						<div class="Yardmanagement">
							<!--当前指向-->
							<div class="oriented">
								<span><b>系统管理</b></span>
								<span><b>></b></span>
								<span><b>组织管理</b></span>
							</div>
							<!--添加删除-->
							<div class="sbYardmanagement-zsb">
								<div class="box" onClick="treeadd()" style="display: none"></div>
								<!-- 添加模态框（Modal） -->
								<div class="modal fade" id="myfmmModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
									<div class="modal-dialog">
										<div class="modal-content">
											<div class="modal-header">
												<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
													&times;
												</button>
												<h4 class="modal-title" id="myModalLabel">
													添加用户组
												</h4>
											</div>
											<div class="modal-body">
												<form class="fmm-form">
													<label for=""><i>*</i>用户组名:</label>
													<input type="text" id="treename" maxlength="20" style="width:146px;" onkeyup="inputteshu(this)" required/>
													<hr />
													<label for=""><i>*</i>负责人:</label>
													<input type="text" id="treefzr" maxlength="10" onkeyup="inputteshu(this)" required/>
													<hr />
													<label for=""><i>*</i>联系电话:</label>
													<input type="text" id="treephone" maxlength="20" onkeyup="" required/>
													<hr />
													<label for=""><i>*</i>邮箱:</label>
													<input type="email" id="treeemail" maxlength="20" required/>
													<hr>
													<label for=""><i>*</i>省份:</label>
													<select onChange="sheng(value)" id="province" style="width: 90px">

													</select>
													<label for=""><i>*</i>地级市:</label>
													<select onChange="shi(value)" id="municipality" style="width: 90px">

													</select>
													<hr />
													<label for=""><i>*</i>县(区):</label>
													<select id="county" style="width: 90px">

													</select>
													<label for=""><i>*</i>详细地址:</label>
													<input type="text" id="inaddress" maxlength="100" onkeyup="inputteshu(this)" required style="width: 132px" />
												</form>
											</div>
											<div class="modal-footer">
												<button type="button" class="btn btn-default" data-dismiss="modal">关闭
												</button>
												<button type="button" class="btn btn-primary" onClick="baocun()">
													保存
												</button>
											</div>
										</div><!-- /.modal-content -->
									</div>
								</div><!-- /.modal -->
								<div class="sox" onClick="treeremoveo()" style="display: none"></div>
							</div>
							<!--下侧easyUI树&表-->
							<div class="Yardmanagement-bottom">
								<!--表-->
								<div class="right">
									<div class="rightright">
										<div class="Yardmanagement-bottom-right">
											<div class="Yardmanagement-bottom-right-top">
												<div class="xxbjone">
													<div id="tb" class="xxbj">
														<div class="iscompile" style="display: none;">
															<!--<span><img src="img/imagess/bianjitubiao.png" alt="" /></span>-->
															<a href="javascript:openUserAddDialog()" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-bianjitwo'">信息编辑</a>&nbsp;
														</div>
													</div>
													<table id="dg">
														<thead>
															<tr>
																<!--<th field="cb" align="center"></th>-->
																<th field="groupName" align="center" style="width: 18%">编组名称</th>
																<th field="userTotal" align="center" style="width: 16%">成员总数</th>
																<th field="principal" align="center" style="width: 16%">负责人</th>
																<th field="phone" align="center" style="width: 16%">电话</th>
																<th field="email" align="center" style="width: 19%">邮箱</th>
																<th field="ts" align="center" style="width: 16%">创建时间</th>
															</tr>
														</thead>
													</table>
													<!-- 模态框（Modal） -->
													<div class="modal fade" id="mydlgModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
														<div class="modal-dialog">
															<div class="modal-content">
																<div class="modal-header">
																	<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
																		&times;
																	</button>
																	<h4 class="modal-title" id="myModalLabel">
																		信息编辑
																	</h4>
																</div>
																<div class="modal-body">
																	<form action="" method="post" id="fm" style="overflow: hidden;">
																		<label><i>*</i>编组名称:</label>
																		<input type="text" id="id" onkeyup="inputteshu(this)" required/>
																		<hr />
																		<label>成员总数:</label>
																		<input type="text" id="male" disabled/>
																		<hr />
																		<label><i>*</i>负责人:</label>
																		<input type="text" id="name" onkeyup="inputteshu(this)" required/>
																		<hr />
																		<label><i>*</i>联系电话:</label>
																		<input type="text" id="phone" onkeyup="inputteshu(this)" required/>
																		<hr />
																		<label><i>*</i>邮箱:</label>
																		<input type="email" id="email" required/>
																		<hr />
																		<!--改动-->
																		<label>角色:</label>
																		<select id="parlinglotrole" style="width:146px;height:19px;">
                                                                              <option value="-1">--此选项可以为空--</option> 
																		</select>
																		<hr />
																		<label for=""><i>*</i>省份:</label>
																		<select onChange="pros(value)" id="provinces" style="width: 90px">
																			
																		</select>
																		<label for=""><i>*</i>地级市:</label>
																		<select onChange="municg(value)" id="municipalityg" style="width: 90px">
																			
																		</select>
																		<hr />
																		<label for=""><i>*</i>县(区):</label>
																		<select id="countyn" style="width: 90px">
																			
																		</select>
																		<label for=""><i>*</i>详细地址:</label>
																		<input type="text" id="parlingaddress" onkeyup="this.value=this.value.replace(/\s+/g,'')" style="width: 132px" required/>
																		<!--结尾-->
																	</form>
																</div>
																<div class="modal-footer">
																	<button type="button" class="btn btn-default" data-dismiss="modal">关闭
																	</button>
																	<button type="button" class="btn btn-primary" onclick="saveUser()">
																		保存
																	</button>
																</div>
															</div><!-- /.modal-content -->
														</div>
													</div><!-- /.modal -->
												</div>
												<div class="xxbjtwo" style="display: none;">
													<div class="xxbjtwotop">
														<div id="tb" class="xxbj">
															<div class="iscom" style="display:none;margin-top:-3px;">
																<a href="javascript:iscompilebj()" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-bianjitwo'">信息编辑</a>&nbsp;
															</div>
														</div>
													</div>
													<div class="xxbjtwobottom">
														<div class="xxbjtwobottom-left">
											    			<img class="xxbjtwobottom-left-image"  src="" alt="" />
											    	    </div>
														<!--模态框-->
														<div class="modal fade" id="myModalfile" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
															<div class="modal-dialog">
																<div class="modal-content">
																	<div class="modal-header">
																		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
																	&times;
																</button>
																		<h4 class="modal-title" id="myModalLabel">
																		信息编辑
																	</h4>
																	</div>
																	<div class="modal-body">
																		<form class="fmm-form" enctype="multipart/form-data">
																			<label for="">图片:</label>
																			<input type="file" name="file_name" id="file_name" accept=".jpg,.jpeg,.png"/>
																			<hr />
																			<label for=""><i>*</i>名称:</label>
																			<input type="text" id="iscompilename" maxlength="15" onkeyup="inputteshu(this)" name="groupName" required/>
																			<hr />
																			<label for=""><i>*</i>联系电话:</label>
																			<input type="text" id="iscompilefzr" name="phone" onkeyup="inputteshu(this)" required/>
																			<hr />
																			<label for=""><i>*</i>总部地址:</label>
																			<input type="text" id="iscompilephone" maxlength="100" onkeyup="inputteshu(this)" name="address" required/>
																			<hr />
																			<label for=""><i>*</i>负责人:</label>
																			<input type="text" id="iscompileprincipal" maxlength="10" onkeyup="inputteshu(this)" name="principal" required/>
																		    <hr />
																		    <label for=""><i>*</i>邮箱地址:</label>
																			<input type="email" id="iscompileemail" name='email' required/>
																		</form>
																	</div>
																	<div class="modal-footer">
																		<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
																		<button onClick="ajaxFileUpload()" type="button" class="btn btn-primary button">
																			提交更改
																		</button>
																	</div>
																</div>
															</div>
														</div>
														<!---->
														<div class="xxbjtwobottom-right">
															<div class="xxbjtwobottom-right-left">
																<div>
																	<span class="Antaur">名称:</span>
																	<span class="Antaurinformation"></span>
																</div>
																<div>
																	<span class="Antaur">联系电话:</span>
																	<span class="Antaurinformation"></span>
																</div>
																<div>
																	<span class="Antaur">总部地址:</span>
																	<span class="Antaurinformation" title=''></span>
																</div>
															</div>
															<div class="xxbjtwobottom-right-right">
																<div>
																	<span class="Antaur">负责人:</span>
																	<span class="Antaurinformation"></span>
																</div>
																<div>
																	<span class="Antaur">邮箱地址:</span>
																	<span class="Antaurinformation"></span>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>

											<div class="Yardmanagement-bottom-right-bottom">
												<div id="tb" style="padding:3px">
													<div style="margin-top: 3px;">
														<span><img src="img/imagess/sousuotubiaotwo.png" alt="" /></span>
														<span>用户名:</span>
														<input id="itemid" maxlength="20" style="line-height:22px;border:1px solid #6DC8F5;height: 22px;background: #EAEAEA;">
														<span>姓名:</span>
														<input id="productid" maxlength="10" style="line-height:22px;border:1px solid #6DC8F5;height: 22px;background: #EAEAEA;">
														<span>角色:</span>
														<input id="Yardmanagementrole" maxlength="15" style="line-height:22px;border:1px solid #6DC8F5;height: 22px;background: #EAEAEA;" />
														<a class="doSearch" onClick="doSearch()">查询</a>
													</div>
												</div>
												<div>
													<!--------------------------------------------------------->
													<div class="bumenshuju">
														<div id="tb" class="xxbj">
															<div style="margin-top: 5px;">
																<a style="display: none;" href="javascript:openUserAdd()" class="easyui-linkbutton isrevise" data-options="plain:true,iconCls:'icon-xinzengs'">新增用户</a>&nbsp;
																<a style="display: none;" href="javascript:deleteUser()" class="easyui-linkbutton isrevise2" data-options="plain:true,iconCls:'icon-shanchu2'">删除用户</a>&nbsp;
																<a style="display: none;" href="javascript:openUserModifyDialog()" class="easyui-linkbutton isrevise3" data-options="plain:true,iconCls:'icon-bianjitwo'">修改用户</a>
															</div>
														</div>
														<!-- 模态框（Modal） -->
														<div class="modal fade" id="dlmyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
															<div class="modal-dialog">
																<div class="modal-content">
																	<div class="modal-header">
																		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
																			&times;
																		</button>
																		<h4 class="modal-title dlmyModaltitle" id="myModalLabel">
																		    新增用户
																		</h4>
																	</div>
																	<div class="modal-body">
																		<form action="" method="post" id="fmmm" style="overflow: hidden;">
																			<label><i>*</i>用户名:</label>
																			<input type="text" id="_id" maxlength="10" onkeyup="inputteshu(this)" required disabled/>
																			<hr />
																			<label><i>*</i>密码:</label>
																			<input type="text" id="psw" maxlength="20" onkeyup="inputteshu(this)" required/>
																			<span id="ResetPassword">重置密码</span>
																			<hr />
																			<label><i>*</i>姓名:</label>
																			<input type="text" id="stuname" onkeyup="inputteshu(this)" maxlength="10" required/>
																			<hr />
																			<label><i>*</i>用户组:</label>
																			<div class="usergroupfmm" style="display: inline-block;">
                                                                                
																			</div>
																			<!--<input type="text" class="usergroup" id="age" required/>-->
																			<hr />
																			<label><i>*</i>联系电话:</label>
																			<input type="text" id="addressss" onkeyup="inputteshu(this)" maxlength="20" required/>
																			<hr />
																			<label><i>*</i>邮箱:</label>
																			<input type="email" id="youxiang" maxlength="20" required/>
																			<hr />
																			<label><i>*</i>角色:</label>
																			<select class="roles" id="sex" style="width:146px;height:19px;">
																				
																			</select>
																		</form>
																	</div>
																	<div class="modal-footer">
																		<button type="button" class="btn btn-default" data-dismiss="modal">关闭
																		</button>
																		<button type="button" class="btn btn-primary" onclick="save()">
																			保存
																		</button>
																	</div>
																</div><!-- /.modal-content -->
															</div>
														</div><!-- /.modal -->
														<table id="dgl">
															<!-- <thead>
																<tr>
																	<th field="cb" checkbox="true" align="center"></th>
																	<th field="userName" align="center" style="width: 16.8%">用户名</th>
																	<th field="fullName" align="center" style="width: 16%">姓名</th>
																	<th field="groupName" align="center" style="width: 16%">用户组</th>
																	<th field="roleName" align="center" style="width: 15%">角色</th>
																	<th field="mobile" align="center" style="width: 18%">联系方式</th>
																	<th field="ts" align="center" style="width: 17%">创建时间</th>
																</tr>
															</thead> -->
														</table>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<!--树菜单-->
								<div class="leftleft">
									<div id="leftleft1">
          
									</div>
								</div>
							</div>
						</div>
						<!--1.2系统管理---角色管理-->
						<div class="rolemanagement">
							<!--当前指向-->
							<div class="oriented">
								<span><b>系统管理</b></span>
								<span><b>></b></span>
								<span><b>角色管理</b></span>
							</div>
							<!--添加删除-->
							<div class="sbYardmanagement-zsb">
								<div class="addrole" onClick="treeadds()"></div>
                                <!-- 添加角色模态框（Modal） -->
								<div class="modal fade" id="myModalfmm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
									<div class="modal-dialog">
										<div class="modal-content">
											<div class="modal-header">
												<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
													&times;
												</button>
												<h4 class="modal-title" id="myModalLabel">
													添加角色
												</h4>
											</div>
											<div class="modal-body">
												<form class="fmm-form">
													<label for="treenameo"><i>*</i>角色名称:</label>
													<input type="text" id="treenameo" onkeyup="inputteshu(this)" maxlength="20"/>
												</form>
											</div>
											<div class="modal-footer">
												<button type="button" class="btn btn-default" data-dismiss="modal">关闭
												</button>
												<button type="button" class="btn btn-primary" onclick="addrole()">
													保存
												</button>
											</div>
										</div><!-- /.modal-content -->
									</div>
								</div><!-- /.modal -->
								<div class="removerole" onClick="treeremove()"></div>
								<!--规则-->
								<div class="rule" style="display:none;top: 1px;">
									<div class="rulediv">
										<span>
								         <img style="margin-top: 5px;" src="img/icon/guize.png" alt="" />
								      </span>
									  <span style="margin-top: 5px;position: absolute;left: 21px;top: -1px;font-size:12px;padding-top: 3px;">
								            规则设置
								      </span>
									</div>
								</div>
								<!--规则模态框-->
								<div class="modal fade" id="rulessmyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
									<div class="modal-dialog">
										<div class="modal-content">
											<div class="modal-header">
												<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
													&times;
												</button>
												<h4 class="modal-title" id="myModalLabel">
													规则设置
												</h4>
											</div>
											<div class="modal-body">
												<div class="ruleinput">

												</div>
											</div>
											<div class="modal-footer">
												<button type="button" class="btn btn-default" data-dismiss="modal">关闭
												</button>
												<button type="button" class="btn btn-primary" onclick="ruleadd(0)">
													保存
												</button>
											</div>
										</div><!-- /.modal-content -->
									</div>
								</div><!-- /.modal -->
							</div>
							<!--下侧easyUI树&权限&表-->
							<div class="Yardmanagement-bottom">
								<div class="rolebased">
									<div class="rolebasedin">
										<div class="rolebasedintop">
											用户列表
										</div>
										<div class="rolebasedinbottom">
											<div>
												<table id="rolebasedinbottom-b">
													<thead>
														<tr>
															<!--<th field="cb" checkbox="true" align="center"></th>-->
															<th field="userName" align="center" style="width: 20%">用户名</th>
															<th field="fullName" align="center" style="width: 20%">姓名</th>
															<th field="groupName" align="center" style="width: 20%">用户组</th>
															<th field="roleName" align="center" style="width: 20%">角色</th>
															<th field="mobile" align="center" style="width: 20%">联系方式</th>
														</tr>
													</thead>
												</table>
											</div>
										</div>
									</div>
								</div>
								<div class="roleList">
									<div class="roleListone">
										<div class="roleListonetop">
											角色列表
										</div>
										<div class="roleListonebottom" style="height:auto;position:absolute;top:30px;bottom:100px;overflow:auto;">

										</div>
									</div>
									<div class="roleListtwo">
										<div class="roleListtwotop">
											权限列表
										</div>
										<div class="roleListtwo-addmove">
											<div onClick="roleadd()">保存修改</div>
											<div onClick="roleremove()">取消修改</div>
										</div>
										<div class="roleListtwobottom" style="height:auto;position:absolute;top:60px;bottom:100px;overflow:auto;">

										</div>
									</div>
								</div>
							</div>
						</div>
						<!--1.3系统管理---访问管理-->
						<div class="accessmanagement">
							<!--当前指向-->
							<div class="oriented" style="position: absolute;">
								<span><b>系统管理</b></span>
								<span><b>></b></span>
								<span><b>访问管理</b></span>
							</div>
							<div class="Yardmanagement-bottom" style="position: absolute;top: 60px;bottom: 0;height: auto;">
								<div class="accessmanagement-top" style="position: absolute;top: 0;">
									<span><img src="img/imagess/sousuotubiaotwo.png" alt="" /></span>
									<span>
						        			<label for="">IP地址:</label>
						        			<input type="text" id="addressip" maxlength="20" onkeyup="inputteshu(this)" style="border: 1px solid #6DC8F5;"/>
						        			<label for="">归属车场:</label>
						        			<select id="parkingip" style="width:146px;height: 22px;background: #EAEAEA;border: 1px solid #6DC8F5;">
						        				<option value="0">-全部车场-</option>
						        		    </select>
						        		    <button onClick="inquire()">查询</button>
					        		</span>

								</div>
								<div class="accessmanagement-bottom" style="position: absolute;top: 37px;bottom: 0;height: auto;">
									<div style="padding-bottom: 50px;">
										<div class="bumenshuju">
											<div id="tb" class="xxbj">
												<div style="margin-top: 5px;">
													<a style="display:none" id="addIp" data-toggle="modal" data-target="#myModalip" class="easyui-linkbutton isrevise" data-options="plain:true,iconCls:'icon-xinzengs'">新增IP</a>&nbsp;
													<a style="display:none" id="removeIp" href="javascript:deleteUserip()" class="easyui-linkbutton isrevise2" data-options="plain:true,iconCls:'icon-shanchu2'">删除IP</a>&nbsp;
												</div>
											</div>
											<table id="dgip">

											</table>
											<div class="modal fade" id="myModalip" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
												<div class="modal-dialog">
													<div class="modal-content">
														<div class="modal-header">
															<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
															<h4 class="modal-title" id="myModalLabel">新增IP</h4>
														</div>
														<div class="modal-body">
															<form class="form-horizontal" role="form">
																<div class="form-group">
																	<label for="firstname" style="width:149px;padding-right:14px;" class="control-label"><i>*</i>IP地址:</label>
																	<input type="text" class="form-control IP" id="firstname" style="width:200px;display: inline-block;" maxlength="20" placeholder="请输入ip地址">
																</div>
																<div class="form-group">
																	<label for="lastname" style="width:149px;" class="control-label"><i>*</i>归属车场:</label>
																	<select id="ddlRegType" style="width:200px;height:34px">

																	</select>
																</div>
															</form>
														</div>
														<div class="modal-footer">
															<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
															<button type="button" onClick="saveip()" class="btn btn-primary">提交更改</button>
														</div>
													</div>
													<!-- /.modal-content -->
												</div>
												<!-- /.modal -->
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!--1.4系统管理---系统日志-->
						<div class="systemLog">
							<!--当前指向-->
							<div class="oriented" style="position: absolute;">
								<span><b>系统管理</b></span>
								<span><b>></b></span>
								<span><b>系统日志</b></span>
							</div>
							<div class="systemLog-bottom">
								<div class="systemLog-bottom-top">
									<div id="Logs" style="background:white;">
										登陆日志
									</div>
									<!--<div id="operates">
										操作日志
									</div>-->
								</div>
								<div class="systemLog-bottom-bottom">
									<div class="systemLog-bottom-bottomone">
										<div class="systemLog-bottom-bottomones">
											<table style="margin-top: 6px;margin-left: 20px;">
												<tr>
													<td>用户名:</td>
													<td>
														<input type="text" class="LoguserName" />
													</td>
													<td style="padding-left: 10px;">开始时间:</td>
													<td>
														<input class="easyui-datetimebox Logstarttime" data-options="editable:false">
													</td>
													<td style="padding-left: 10px;">结束时间:</td>
													<td>
														<input class="easyui-datetimebox Logfinishtime" data-options="editable:false">
													</td>
													<td style="padding-left: 10px;">IP地址:</td>
													<td>
														<input type="text" class="Logaddress" />
													</td>
													<td><button class="Loginquire">查询</button></td>
													<td><button class="Loginquiretwo">取消</button></td>
												</tr>
											</table>
											<!--<div id="cc" class="easyui-calendar"></div>-->
										</div>
										<div class="systemLog-bottom-bottomoned">
											<table id="Logform">

											</table>
										</div>
									</div>
									<!--<div class="systemLog-bottom-bottomtwo">
										<div class="systemLog-bottom-bottomones">
											<table style="margin-top: 6px;margin-left: 20px;">
												<tr>
													<td>用户名:</td>
													<td>
														<input type="text" class="operateName" />
													</td>
													<td>开始时间:</td>
													<td>
														<input class="easyui-datebox operatestarttime" data-options="sharedCalendar:'#cc'">
													</td>
													<td>结束时间:</td>
													<td>
														<input class="easyui-datebox operatefinishtime" data-options="sharedCalendar:'#cc'">
													</td>
													<td>操作模块:</td>
													<td>
														<input class="operatemenuName" style="width:120px;">
													</td>
													<td>操作类型:</td>
													<td>
														<select class="operatetype" style="width: 120px;">
															<option value="0">全部</option>
															<option value="1">增加</option>
															<option value="2">删除</option>
															<option value="3">修改</option>
														</select>
													</td>
													<td><button class="operateinquire">查询</button></td>
												</tr>
											</table>
											<div id="cc" class="easyui-calendar"></div>
										</div>
										<div class="systemLog-bottom-bottomoned">
											<table id="operateLog">

											</table>
										</div>
									</div>-->
								</div>
							</div>
						</div>
					    <!--2.1车主管理---车主管理-->
					    <div class="TheOwner">
					       <!--当前指向-->
							<div class="oriented" style="position: absolute;">
								<span><b>车主管理</b></span>
								<span><b>></b></span>
								<span><b>车主管理</b></span>
							</div>
							<!--下侧查询&&表-->
							<div class="TheOwner-bottom">
							    <!--树-->
					        	<div class="TheOwner-bottom-left">
					        		<div id="TheOwner-tree">
					        			 
					        		</div>
					        	</div>
								<!--表-->
								<div class="TheOwner-bottom-right">
								    <div class="TheOwner-right-top">
                                        <div class="TheOwner-right-top-b">
                                        	<table id="TheOwner-datagrid-top">
                                        		
                                        	</table>
                                        </div>				        			
					        		</div>
									<!--查询条件-->
									<div class="TheOwner-right-center">
										 <div class="TheOwner-inquire">
							        		<span class="TheOwner-inquire-img">
							        			<img src="img/imagess/sousuotubiaotwo.png" alt="" />
							        		</span>
							        		<label>车架号:</label>
							        		<input type="text" maxlength="17" class="FrameNumber"/>
							        		<label>设备编号:</label>
							        		<input type="text" maxlength="10" class="EquipmentNumber"/>
							        		<label>归属分组:</label>
							        		<input type="text" class="GroupName"/>
							        	    <label>注册状态:</label>
							        	    <select class="TheOwner-inquire-select">
							        	    	<option value="">-请选择-</option>
							        	    	<option value="1">已注册</option>
							        	    	<option value="0">未注册</option>
							        	    </select>
							        	    <label>审核状态:</label>
							        	    <select class="TheOwner-inquire-selecttwo">
							        	    	<option value="">-请选择-</option>
							        	    	<option value="1">已审核</option>
							        	    	<option value="0">待审核</option>
							        	    	<option value="2">未通过</option>
							        	    </select>
							        	    <a class="TheOwner-inquire-cs">查询</a>
							        	</div>  
									</div>
									<!--下侧表-->
									<div class="TheOwner-right-bottom">
									   <div class="TheOwner-datagrid">
									        <div class="TheOwner-datagrid-tops">
												<div class="iscompile">
												    <a style="display: none;" href="javascript:TheOwneradd()" class="easyui-linkbutton isrevadd" data-options="plain:true,iconCls:'icon-xinzengs'">新增车主</a>&nbsp;
													<a style="display: none;" href="javascript:TheOwnerremove()" class="easyui-linkbutton isrevremove" data-options="plain:true,iconCls:'icon-shanchu2'">删除车主</a>&nbsp;
													<a style="display: none;" href="javascript:TheOwnerbj(this)" class="easyui-linkbutton isrevload" data-options="plain:true,iconCls:'icon-bianjitwo'">修改车主</a>
												    <a style="display: none;" href="javaScript:Theownermigration()" class="easyui-linkbutton Theownermigration" data-options="plain:true,iconCls:'icon-chezhuqianyi'">车主迁移</a>
												</div>
											 </div>
											<div class="TheOwner-datagrid-bottoms">
													<table id="TheOwner-datagrid-bottom"></table>
											</div>
											<!--新增/删除/详情模态框（Modal） -->
											<div class="modal fade" id="TheOwnerModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
												<div class="modal-dialog" style="width: 680px;">
													<div class="modal-content">
														<div class="modal-header">
															<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
																&times;
															</button>
															<h4 class="modal-title TheOwnertitle" id="myModalLabel">
																新增用户
															</h4>
														</div>
														<div class="modal-body TheOwnerModal-body" style="height:280px;overflow: auto;">
															<!--基本信息-->
															<form class="TheOwnerForm">
																<p style="font-size: 18px;">车主基本信息:</p>
																<table class="table table-striped table-bordered text-center" id="TheOwnerFormtable">
																	<tbody>
																		<tr>
																			<td><i>*</i>车主姓名:</td>
																			<td><input type="text" id="ownerName" onkeyup="inputteshu(this)" maxlength="20" class="NoName" required/></td>
																			<td><i>*</i>车主性别:</td>
																			<td>
																				<select id="sexx">
																					<option value="1">男</option>
																					<option value="2">女</option>
																				</select>
																			</td>
																		</tr>
																		<tr>
																			<td><i>*</i>车主身份证号</td>
																			<td><input type="text" id="idNumber" onkeyup="inputteshu(this)" maxlength="20" name="idNumber" class="noneNull" require></td>
																			<td><i>*</i>车主手机号:</td>
																			<td><input type="text" id="mobile" maxlength="18" onkeyup="inputteshu(this)" class="NoPhone" required/></td>
																		</tr>
																		<tr>
																			<td><i>*</i>省:</td>
																			<td>
																				<select id="TheOwnersheng" onChange="wners(value)">
																	
																				</select>
																			</td>
																			<td><i>*</i>市:</td>
																			<td>
																				<select id="TheOwnershi" onChange="wnerx(value)">
																	
																				</select>
																			</td>
																		</tr>
																		<tr>
																			<td><i>*</i>县:</td>
																			<td>
																				<select id="TheOwnerxian" class="noneNull">
																	
																				</select>
																			</td>
																			<td><i>*</i>详细地址:</td>
																			<td><input type="text" id="address" onkeyup="inputteshu(this)" maxlength="50" class="Noaddress" required/></td>
																		</tr>
																		<tr>
																			<!--<td><i>*</i>保险公司:</td>
																			<td>
																				<select id="insurerId">
																	
																				</select>
																			</td>-->
																			<td>车牌号码:</td>
																			<td><input type="text" maxlength="20" onkeyup="inputteshu(this)" id="plate"/></td>
																			<td><i>*</i>车架号:</td>
																			<td><input type="text" id="vin" maxlength="17" onkeyup="inputteshu(this)" class="noneNull" required/></td>
																		</tr>
																		<tr>
																			<td><i>*</i>发动机编号:</td>
																			<td><input type="text" id="engineCode" onkeyup="inputteshu(this)" maxlength="11" class="noneNull" required/></td>
                                                                            <td><i>*</i>车型品牌:</td>
																			<td>
																				<select id="vehicleBrand" onchange="Brand(value)">
																					<option value="">请选择</option>
																				</select>
																			</td>
																		</tr>
																		<tr>
																			<td><i>*</i>型号:</td>
																			<td>
																				<select id="vehicleModel" onchange="vecle(value)" class="noneNull"> 
																	                  <option value="">-请选择-</option>
																				</select>
																			</td>
																			<td><i>*</i>排量:</td>
																			<td>
																				<select id="vehicleDisplacement" onchange="place(value)" class="noneNull">
																	                  <option value="">-请选择-</option>
																				</select>
																			</td>
																		</tr>
																		<tr>
																			<td><i>*</i>配置:</td>
																			<td>
																				<select id="vehicleConfig" class="noneNull">
																	                   <option value="">-请选择-</option>
																				</select>
																			</td>
																			<td id="TheOwnerFormtable-two"><i>*</i>紧急联系人姓名:</td>
																			<td id="contactsNamess"><input type="text" onkeyup="inputteshu(this)" id="contactsName" maxlength="20" class="NoName" required/></td>
																		</tr>
																		<tr id="TheOwnerFormtable-one">
																			<!--<td>服务截止时间:</td>
																			<td><input class="easyui-datetimebox" id="serviceEndTime" style="width:140px"></td>-->
																			<td><i>*</i>紧急联系人电话:</td>
																			<td><input type="text" id="contactsMobile" onkeyup="inputteshu(this)" maxlength="20" class="NoPhone" required/></td>
																			<td><i>*</i>关系:</td>
																			<td><input type="text" id="relation" maxlength="20" onkeyup="inputteshu(this)" class="NoName" required/></td>
																		</tr>
																		<!--<tr id="TheOwnerFormtable-two">
																			
																		</tr>-->
																	</tbody>
																</table>
															</form>
															 <!--紧急联系人信息-->
                                                            <form class="TheOwnerFormthree" style="display:none">
														    	<p style="font-size: 18px;">紧急联系人:</p>
														    	<table class="table table-striped table-bordered text-center">
														    	    <thead>
																      <tr>
																        <th style="text-align: center;">姓名</th>
																        <th style="text-align: center;">手机号</th>
																        <th style="text-align: center;">关系</th>
																        <th id="TheOwnercaozuo" style="text-align: center;">操作</th>
																      </tr>
																    </thead>
																    <tbody class="Phonetbody">
																    	
																    </tbody>
														    	</table>
														    	<div class="phoneaddremove">
														    		<button type="button" class="btn btn-primary addphone">
																	       新增
																	</button>
														    		<button type="button" onClick="TheOwnerphone()" class="btn btn-primary">
																		保存
																	</button>
														    	</div>
														    </form>
														    <!--服务信息-->
														    <form class="TheOwnerFormfour" style="display:none">
														        <p style="font-size: 18px;">服务信息:</p>
														    	<table class="table table-striped table-bordered text-center">
														    		<tbody class="tablefuwu">
																      <tr>
																        <td>商业服务电话</td>
																        <td><input type="text" onkeyup="inputteshu(this)" maxlength="15" id="business"/></td>
																      </tr>
																      <tr>
																        <td>故障服务电话</td>
																        <td><input type="text" onkeyup="inputteshu(this)" maxlength="15" id="malfunction"/></td>
																      </tr>
																      <tr>
																        <td>事故服务电话</td>
																        <td><input type="text" onkeyup="inputteshu(this)" maxlength="15" id="Accident"/></td>
																      </tr>
																    </tbody>
														    	</table>
														    </form>
															<!--查看详情车主基本信息-->
															<!--基本信息-->
															<form class="TheOwnerForm2">
																<p style="font-size: 18px;">车主基本信息:</p>
																<table class="table table-striped table-bordered text-center" id="TheOwnerFormtable">
																	<tbody>
																		<tr>
																			<td><i>*</i>车主姓名:</td>
																			<td class="owner1"></td>
																			<td><i>*</i>车主性别:</td>
																			<td class="owner2"></td>
																		</tr>
																		<tr>
																			<td><i>*</i>车主身份证号</td>
																			<td class="owner3"></td>
																			<td><i>*</i>车主手机号:</td>
																			<td class="owner4"></td>
																		</tr>
																		<tr>
																			<td><i>*</i>省:</td>
																			<td class="owner5"></td>
																			<td><i>*</i>市:</td>
																			<td class="owner6"></td>
																		</tr>
																		<tr>
																			<td><i>*</i>县:</td>
																			<td class="owner7"></td>
																			<td><i>*</i>详细地址:</td>
																			<td class="owner8"></td>
																		</tr>
																		<tr>
																			<!--<td><i>*</i>保险公司:</td>
																			<td class="owner9"></td>-->
																			<td>车牌号码:</td>
																			<td class="owner10"></td>
																			<td><i>*</i>车架号:</td>
																			<td class="owner11"></td>
																		</tr>
																		<tr>
																			<td><i>*</i>发动机编号:</td>
																			<td class="owner12"></td>
																			<td><i>*</i>车型品牌:</td>
																			<td class="owner13"></td>
																		</tr>
																		<tr>
																			<td><i>*</i>型号:</td>
																			<td class="owner14"></td>
                                                                            <td><i>*</i>排量:</td>
																			<td class="owner15"></td>
																		</tr>
																		<tr>
																			<td><i>*</i>配置:</td>
																			<td class="owner16"></td>
																		</tr>
																		<!--<tr>
																			<td><i>*</i>紧急联系人姓名:</td>
																			<td class="owner17"></td>
																			<td><i>*</i>紧急联系人电话:</td>
																			<td class="owner18"></td>
																		</tr>
																		<tr>
																			<td><i>*</i>关系:</td>
																			<td class="owner19"></td>
																		</tr>-->
																	</tbody>
																</table>
															</form>
														    <!--保险信息-->
                                                           <!-- <form class="TheOwnerFormtwo" style="display:none">
														    	<p style="font-size: 18px;">车主保险基本信息:</p>
														    	<label for="agent">经办人:</label>
																<input type="text" id="agent" class="NoNam noneNul"/>
																<label for="applicant">投保人:</label>
																<input type="text" id="applicant" class="NoNam noneNul"/>
																<hr />
																<label for="insured">被保险人:</label>
																<input type="text" id="insured" class="NoNam noneNul"/>
																<label for="insurerId">保险公司:</label>
																<select id="insurerId"></select>
																<hr />	
																<label for="commercialInsuranceNo">商业险保单号:</label>
																<input type="text" id="commercialInsuranceNo" class="undefined"/>
																<label for="compulsoryInsuranceNo">交强险保单号:</label>
																<input type="text" id="compulsoryInsuranceNo" class="undefined"/>
														        <hr />
														        <label for="insureDate">投保日期:</label>
																<input class="easyui-datebox noneNul" id="insureDate" data-options="sharedCalendar:'#cc'">
																<label for="expireDate">保险到期日期:</label>
																<input class="easyui-datebox noneNul" id="expireDate" data-options="sharedCalendar:'#cc'">
																<hr />
																<label for="commercialPremium">商业险保费:</label>
																<input type="text" id="commercialPremium" class="undefined"/>
																<label for="commercialIncome">商业险实收保费:</label>
																<input type="text" id="commercialIncome" class="undefined"/>
														        <hr />
														        <label for="commercialDiscount">商业险优惠比:</label>
																<input type="text" id="commercialDiscount" class="undefined"/>
																<label for="compulsoryPremium">交强险保费:</label>
																<input type="text" id="compulsoryPremium" class="undefined"/>
																<hr />
																<label for="compulsoryIncome">交强险实收保费:</label>
																<input type="text" id="compulsoryIncome" class="undefined"/>
																<label for="compulsoryDiscount">交强险优惠比:</label>
																<input type="text" id="compulsoryDiscount" class="undefined"/>
																<hr />
																<label for="premium">总保费:</label>
																<input type="text" id="premium" class="undefined"/>
																<label for="remarks">备注:</label>
																<input type="text" id="remarks" class="undefined"/>
																<p style="font-size: 18px;">车主保险费用明细:</p>
																<label for="premiums">应收:</label>
																<input type="text" id="premiums" class="undefined"/>
																<label for="income">实收:</label>
																<input type="text" id="income" class="undefined"/>
																<hr />
																<label for="damageAmount">车辆损失险（保额）:</label>
																<input type="text" id="damageAmount" class="undefined"/>
																<label for="damageReceivable">车辆损失险（应收）:</label>
																<input type="text" id="damageReceivable" class="undefined"/>
																<hr />
																<label for="damageIncome">车辆损失险（实收）:</label>
																<input type="text" id="damageIncome" class="undefined"/>
																<label for="tplAmount">第三方责任险（保额）:</label>
																<input type="text" id="tplAmount" class="undefined"/>
																<hr />
																<label for="tplReceivable">第三方责任险（应收）:</label>
																<input type="text" id="tplReceivable" class="undefined"/>
																<label for="tplIncome">第三方责任险（实收）:</label>
																<input type="text" id="tplIncome" class="undefined"/>
																<hr />
																<label for="passengerAmount">车上人员座位险（保额）:</label>
																<input type="text" id="passengerAmount" class="undefined"/>
																<label for="passengerReceivable">车上人员座位险（应收）:</label>
																<input type="text" id="passengerReceivable" class="undefined"/>
																<hr />
																<label for="passengerIncome">车上人员座位险（实收）:</label>
																<input type="text" id="passengerIncome" class="undefined"/>
																<label for="theftAmount">盗抢险（保额）:</label>
																<input type="text" id="theftAmount" class="undefined"/>
																<hr />
																<label for="theftReceivable">盗抢险（应收）:</label>
																<input type="text" id="theftReceivable" class="undefined"/>
																<label for="theftIncome">盗抢险（实收）:</label>
																<input type="text" id="theftIncome" class="undefined"/>
																<hr />
																<label for="glassBreakageAmount">玻璃单独破碎险（保额）:</label>
																<input type="text" id="glassBreakageAmount" class="undefined"/>
																<label for="glassBreakageReceivable">玻璃单独破碎险（应收）:</label>
																<input type="text" id="glassBreakageReceivable" class="undefined"/>
																<hr />
																<label for="glassBreakageIncome">玻璃单独破碎险（实收）:</label>
																<input type="text" id="glassBreakageIncome" class="undefined"/>
																<label for="combustionAmount">自燃损失险（保额）:</label>
																<input type="text" id="combustionAmount" class="undefined"/>
																<hr />
																<label for="combustionReceivable">自燃损失险（应收）:</label>
																<input type="text" id="combustionReceivable" class="undefined"/>
																<label for="combustionIncome">自燃损失险（实收）:</label>
																<input type="text" id="combustionIncome" class="undefined"/>
																<hr />
																<label for="wadeAmount">涉水损失险（保额）:</label>
																<input type="text" id="wadeAmount" class="undefined"/>
																<label for="wadeReceivable">涉水损失险（应收）:</label>
																<input type="text" id="wadeReceivable" class="undefined"/>
																<hr />
																<label for="wadeIncome">涉水损失险（实收）:</label>
																<input type="text" id="wadeIncome" class="undefined"/>
																<label for="scratchAmount">划痕险（保额）:</label>
																<input type="text" id="scratchAmount" class="undefined"/>
																<hr />
																<label for="scratchAmount">划痕险（保额）:</label>
																<input type="text" id="scratchAmount" class="undefined"/>
																<label for="scratchReceivable">划痕险（应收）:</label>
																<input type="text" id="scratchReceivable" class="undefined"/>
																<hr />
																<label for="scratchIncome">划痕险（实收）:</label>
																<input type="text" id="scratchIncome" class="undefined"/>
																<label for="waiverAmount">不计免赔（保额）:</label>
																<input type="text" id="waiverAmount" class="undefined"/>
																<hr />
																<label for="waiverReceivable">不计免赔（应收）:</label>
																<input type="text" id="waiverReceivable" class="undefined"/>
																<label for="waiverIncome">不计免赔（实收）:</label>
																<input type="text" id="waiverIncome" class="undefined"/>
																<hr />
																<label for="compelsoryAmount">交强险（保额）:</label>
																<input type="text" id="compelsoryAmount" class="undefined"/>
																<label for="compelsoryReceivable">交强险（应收）:</label>
																<input type="text" id="compelsoryReceivable" class="undefined"/>
																<hr />
																<label for="compelsoryIncome">交强险（实收）:</label>
																<input type="text" id="compelsoryIncome" class="undefined"/>
																<label for="vehicleTax">车船税:</label>
																<input type="text" id="vehicleTax" class="undefined"/>
																<hr />
																<label for="other">其它:</label>
																<input type="text" id="other" class="undefined"/>
																<label for="remark">备注:</label>                             
																<input type="text" id="remark"/>
														    </form>-->
														</div>
														<div class="modal-footer Nextstepbutton">
															<span class="spanerror" style="color: red;position: relative;margin-right: 10px;"></span>
															<button type="button" id="Nextstep" class="btn btn-primary" value="下一步">
																下一步
															</button>
															<button type="button" id="Nextstep1" class="btn btn-primary" value="提交">
																提交
															</button>
															<button type="button" id="Nextstep2" class="btn btn-primary" value="0">
																保存
															</button>
															<button type="button" id="Nextstep3" class="btn btn-primary">
																基本信息
															</button>
															<!--<button type="button" id="Nextstep4" class="btn btn-primary">
																 保险信息
															</button>-->
															<button type="button" id="Nextstep5" class="btn btn-primary">
																 联系人信息
															</button>
															<button type="button" id="Nextstep6" class="btn btn-primary">
																 服务信息
															</button>
															<button type="button" id="Nextstep7" name='1' class="btn btn-primary Nextstep7">
																 通过
															</button>
															</button>
															<button type="button" id="Nextstep8" name='2' class="btn btn-primary Nextstep7">
																 未通过
															</button>
															<button type="button" id="Nextstep9" class="btn btn-primary">
																 关闭
															</button>
														</div>
													</div><!-- /.modal-content -->
												</div>
											</div><!-- /.modal -->
											<!--车主迁移模态框-->
											<div class="modal fade" id="TheownermigrationModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
												<div class="modal-dialog">
													<div class="modal-content">
														<div class="modal-header">
															<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
															<h4 class="modal-title" id="myModalLabel">车主迁移</h4>
														</div>
														<div class="modal-body">
															<div id="TheownermigrationModal-tree" style="width: 300px;margin: 0 auto;">
                                                                
															</div>
														</div>
														<div class="modal-footer">
															<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
															<button type="button" class="btn btn-primary" onclick="Theownermigrationsave()">提交更改</button>
														</div>
													</div><!-- /.modal-content -->
												</div>
											</div><!-- /.modal -->
									   </div> 
									</div>
								</div>
							</div>
						</div>
					    <!--3.1车型管理---车型管理-->
					    <div class="MotorcycleType">
					    	<!--当前指向-->
							<div class="oriented" style="position: absolute;">
								<span><b>车型管理</b></span>
								<span><b>></b></span>
								<span><b>车型管理</b></span>
							</div>
							<!--添加删除-->
							<div class="MotorcycleAddMove">
								<div class="MotorcycleAdd" style="display:none;"></div>
								<div class="MotorcycleMove" style="display:none;"></div>
							    <!--添加模态框-->
							    <div class="modal fade" id="MotorcycleModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
									<div class="modal-dialog">
										<div class="modal-content">
											<div class="modal-header">
												<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
													&times;
												</button>
												<h4 class="modal-title" id="myModalLabel">
													添加车型
												</h4>
											</div>
											<div class="modal-body">
												<form>
													<span style="margin-left: 190px;" id="motorcycletype-type">车型:</span>
													<input type="text" maxlength="20" onkeyup="inputteshu(this)" class="Motorcycleinput"/>
													<i>*</i>
													<div style="margin-left: 163px;margin-top:10px;" id="motorcycletype-alias">
                                                        <span>车系代码:</span>
														<input type="text" maxlength="20" onkeyup="inputteshu(this)" class="Motorcycleinput-alias"/>
														<i>*</i>
														<p>(车系代码:该系列车辆对应的T-BOX的型号代码)</p>
													</div>
												</form>
											</div>
											<div class="modal-footer">
												<button type="button" class="btn btn-default" data-dismiss="modal">关闭
												</button>
												<button type="button" class="btn btn-primary Motorcyclebutton">
													提交更改
												</button>
											</div>
										</div><!-- /.modal-content -->
									</div>
								</div><!-- /.modal -->
							</div>
					        <!--下侧-->
					        <div class="Motorcyclebottom">
					        	<div class="Motorcyclebottom-left">
					        		<div class="Motorcyclebottom-tree">
					        			
					        		</div>
					        	</div>
					        	<div class="Motorcyclebottom-right">
					        		<div class="Motorcyclebottom-right-div" style="overflow: auto;position: relative;">
					        			<p style="font-size: 15px;font-weight: 600;margin-bottom: 15px;">远程控制权限</p>
					        			<div class="Motorcyclebottom-right-div-div">
					        				<div>
					        					<span>中控锁</span>
					        					<img src="img/MotorcycleType/zhongkongsuo.png" alt="" />
					        					<span class="Motorcyspanimg"><img src="img/MotorcycleType/weixuanzhong.png" alt="" /></span>
					        				</div>
					        				<div>
					        					<span>引擎</span>
					        					<img src="img/MotorcycleType/yinqing.png" alt="" />
					        					<span class="Motorcyspanimg"><img src="img/MotorcycleType/weixuanzhong.png" alt="" /></span>
					        				</div>
					        				<div>
					        					<span>空调控制</span>
					        					<img src="img/MotorcycleType/kongtiaokongzhi.png" alt="" />
					        					<span class="Motorcyspanimg"><img src="img/MotorcycleType/weixuanzhong.png" alt="" /></span>
					        				</div>
					        				<div>
					        					<span>空气净化</span>
					        					<img src="img/MotorcycleType/kongqijinghua.png" alt="" />
					        					<span class="Motorcyspanimg"><img src="img/MotorcycleType/weixuanzhong.png" alt="" /></span>
					        				</div>
					        				<div>
					        					<span>座椅加热</span>
					        					<img src="img/MotorcycleType/zuoyijiare.png" alt="" />
					        					<span class="Motorcyspanimg"><img src="img/MotorcycleType/weixuanzhong.png" alt="" /></span>
					        				</div>
					        				<div>
					        					<span>升车窗</span>
					        					<img src="img/MotorcycleType/shengchechuang.png" alt="" />
					        					<span class="Motorcyspanimg"><img src="img/MotorcycleType/weixuanzhong.png" alt="" /></span>
					        				</div>
					        				<div>
					        					<span>天窗</span>
					        					<img src="img/MotorcycleType/tianchuang.png" alt="" />
					        					<span class="Motorcyspanimg"><img src="img/MotorcycleType/weixuanzhong.png" alt="" /></span>
					        				</div>
					        				<div>
					        					<span>降车窗</span>
					        					<img src="img/MotorcycleType/jiangchechuang.png" alt="" />
					        					<span class="Motorcyspanimg"><img src="img/MotorcycleType/weixuanzhong.png" alt="" /></span>
					        				</div>
					        				<div>
					        					<span>闪灯鸣笛</span>
					        					<img src="img/MotorcycleType/shandengmingdi.png" alt="" />
					        					<span class="Motorcyspanimg"><img src="img/MotorcycleType/weixuanzhong.png" alt="" /></span>
					        				</div>
					        				<div>
					        					<span>开后备箱</span>
					        					<img src="img/MotorcycleType/kaihoubeixiang.png" alt="" />
					        					<span class="Motorcyspanimg"><img src="img/MotorcycleType/weixuanzhong.png" alt="" /></span>
					        				</div>
					        				<div>
					        					<span>关后备箱</span>
					        					<img src="img/MotorcycleType/guanhoubeixiang.png" alt="" />
					        					<span class="Motorcyspanimg"><img src="img/MotorcycleType/weixuanzhong.png" alt="" /></span>
					        				</div>
					        				<div>
					        					<span>上下电</span>
					        					<img src="img/MotorcycleType/power.png" alt="" />
					        					<span class="Motorcyspanimg"><img src="img/MotorcycleType/weixuanzhong.png" alt="" /></span>
					        				</div>
					        			</div>
                                        <p style="font-size: 15px;font-weight: 600;margin-bottom: 15px;position: absolute;">
											第三方设备
											<button class="ThirdPartyAdd" style="width:50px;height:25px;font-size:14px;margin-left:20px;">增加</button>
											<button class="ThirdPartyRemove" style="width:50px;height:25px;font-size:14px;margin-left:10px;">删除</button>
										</p>
										<div class="Motorcyclebottom-right-divtwo">
											
										</div>
					        		    <div style="display: block;width: 100%;height: 40px;">
					        				<p class="Motorcyclebaocun" style="display:none;">保存设置</p>
					        			</div>
					        		</div>

					        	    <div class="Motorcyclebottom-right2">
                                        <img src="img/imagess/ModelsIntroduction.png" style="width:100%;height:100%;" alt="">
								    </div>
									<!-- 增加第三方模态框（Modal） -->
									<div class="modal fade" id="MotorcyclebottommyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
										<div class="modal-dialog">
											<div class="modal-content">
												<div class="modal-header">
													<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
														&times;
													</button>
													<h4 class="modal-title" id="myModalLabel">
														增加第三方设备
													</h4>
												</div>
												<div class="modal-body" style="width:100%;height:200px;">
													<div id="ThirdParty">
                                                        
													</div>
												</div>
												<div class="modal-footer">
													<button type="button" class="btn btn-default" data-dismiss="modal">关闭
													</button>
													<button type="button" class="btn btn-primary Motorcyclebottommybc">
														保存
													</button>
												</div>
											</div><!-- /.modal-content -->
										</div>
									</div><!-- /.modal -->
								</div>
					        </div>
					    </div>
						<!--4.1设备管理---车载设备-->
					    <div class="MobileUnit">
					    	<!--当前指向-->
							<div class="oriented" style="position: absolute;">
								<span><b>设备管理</b></span>
								<span><b>></b></span>
								<span><b>车载设备</b></span>
							</div>
							<!--搜索条件-->
							<div class="MobileSeek">
								<div>
									<span><img src="img/imagess/sousuotubiaotwo.png" alt="" /></span>
								    <span style="margin-left: 10px;">车架号:</span>
								    <input type="text" class="MobileID"/>
								    <span>设备编号:</span>
								    <input type="text" maxlength="10" class="Mobilename"/>
								    <span>ICCID:</span>
								    <input type="text" class="MobileICCID"/>
								    <span>电控单元序列号:</span>
								    <input type="text" maxlength="50" class="MobileSeekID"/>
								    <span>归属分组:</span>
								    <input class="MobileSeekfz" style="width: 150px;"> 
									<span>升级分组:</span>
								    <input class="MobileSeeksjfz" style="width: 150px;"> 
								    <span class="Mobilecx" onClick="Mobileinput()">查询</span>
									<span class="Mobilecx" onClick="Mobileinputqx()">取消</span>
								    <span style="margin-left: 10px;">刷新间隔(秒):</span>
								    <select id="MobileSelect">
								    	<option value="5000">5</option>
								    	<option value="10000">10</option>
								    	<option value="15000">15</option>
								    	<option value="30000">30</option>
								    </select>
								    <span class="Mobilecx" onClick="MobileSelect()">刷新</span>
								</div>
							</div>
					        <!--下侧表-->
					        <div class="MobileDatagrid">
					        	<div class="Mobileyh">
					        		<div style="display:none;" class="Mobileyh-div Mobileyh-one" onClick="Mobileyhone()">
					        			<img src="img/imagess/xinzeng.png" alt="" />
					        			<span>添加设备</span>
										<!--<a class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-xinzengs'">新增用户</a>&nbsp;-->
					        		</div>
					        		<!-- 添加设备模态框（Modal） -->
									<div class="modal fade" id="MobileyhoneModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
										<div class="modal-dialog">
											<div class="modal-content">
												<div class="modal-header">
													<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
														&times;
													</button>
													<h4 class="modal-title MobileyhtwoModaltitle" id="myModalLabel">
														添加设备
													</h4>
												</div>
												<div class="modal-body Mobileyhoneform">
													<label for="deviceIds"><i>*</i>设备编号:</label>
													<input type="text" minlength="5" onkeyup="inputteshu(this)" maxlength="10" id="deviceIds"/>
													<label for="hardwareVers"><i>*</i>硬件版本号:</label>
													<input type="text" maxlength="10"  id="hardwareVers"/>
													<hr />
													<label for="vins">车架号:</label>
													<input type="text" maxlength="17" onkeyup="inputteshu(this)" id="vins"/>
													<label for="models">车系代码:</label>
													<input type="text" onkeyup="inputteshu(this)" id="models"/>
													<hr />
													<label for="softVers">软件版本号:</label>
													<input type="text" maxlength="50"  id="softVers"/>
													<label for="serialNums">设备序列号:</label>
													<input type="text" maxlength="20" onkeyup="inputteshu(this)" id="serialNums"/>
													<hr />
													<!--<label for="makers">车型:</label>
													<input type="text" id="makers"/>-->
													<label for="call_nums">呼叫号码:</label>
													<input type="text" maxlength="20" onkeyup="inputteshu(this)" id="call_nums"/>
													<label for="ecuSerialNums">电控单元序列号:</label>
													<input type="text" maxlength="50" onkeyup="inputteshu(this)" id="ecuSerialNums"/>
												</div>
												<div class="modal-footer">
													<button type="button" class="btn btn-default" data-dismiss="modal">关闭
													</button>
													<button type="button" name="" class="btn btn-primary Mobileyhone">
														提交更改
													</button>
												</div>
											</div><!-- /.modal-content -->
										</div>
									</div><!-- /.modal -->
					        		<div style="display:none;" class="Mobileyh-div Mobileyh-two" onClick="compilefacility()">
					        			<img src="img/imagess/bianjitubiao.png" alt="" />
					        			<span>编辑设备</span>
					        		</div>
					        		<div style="display:none;" class="Mobileyh-div Mobileyh-three" onClick="groupOwnershipgroup()">
					        			<img src="img/imagess/guishufenzu.png" alt="" />
					        			<span>归属分组</span>
					        		</div>
					        		<!--归属分组模态框-->
					        		<div class="modal fade" id="MobileyhtwoModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
										<div class="modal-dialog">
											<div class="modal-content">
												<div class="modal-header">
													<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
														&times;
													</button>
													<h4 class="modal-title" id="myModalLabel">
														归属分组
													</h4>
												</div>
												<div class="modal-body Mobileyhthreeform">
													<p style="text-align: center;">操作提示：绑定车主的设备进行归属分组，车主信息将同时划分至与设备相同分组</p>
													<div style="width: 250px;margin: 0 auto;">
														<div class="Mobileyhtwoformtree">
															
														</div>
													</div>
												</div>
												<div class="modal-footer">
													<button type="button" class="btn btn-default" data-dismiss="modal">关闭
													</button>
													<button type="button" name="" class="btn btn-primary Mobileyhtwo">
														提交更改
													</button>
												</div>
											</div><!-- /.modal-content -->
										</div>
									</div><!-- /.modal -->
					        		<div style="display:none;" class="Mobileyh-div Mobileyh-four" onClick="UpgradeGroupss()">
					        			<img src="img/imagess/shengjifenzu.png" alt="" />
					        			<span>升级分组</span>
					        		</div>
					        		<!--升级分组模态框-->
					        		<div class="modal fade" id="MobileyhthreeModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
										<div class="modal-dialog">
											<div class="modal-content">
												<div class="modal-header">
													<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
														&times;
													</button>
													<h4 class="modal-title" id="myModalLabel">
														升级分组
													</h4>
												</div>
												<div class="modal-body Mobileyhoneform">
													<div class="Mobileyhthreformdiv">
														<div>
															<span onClick="Mobileyhthreeadd()">添加分组</span>
														    <span onClick="Mobileyhthreemove()" style="margin-left: 50px;">删除分组</span>
														</div>	
														<div class="Mobileyhthreformdiv-divtwo" style="display: none;">
															<label>设备组名称:</label>
															<input style="width: 100px" type="text" id="Mobileyhthreformdiv-input" required/>
															<button id="Mobileyhthreformdiv-btone">提交</button>
															<button id="Mobileyhthreformdiv-bttwo">取消</button>
														</div>
													</div>
													<div style="width: 250px;margin: 0 auto;">
														<div class="Mobileyhthreeformtree">
															
														</div>
													</div>
												</div>
												<div class="modal-footer">
													<button type="button" class="btn btn-default" data-dismiss="modal">关闭
													</button>
													<button type="button" name="" class="btn btn-primary Mobileyhthree">
														提交更改
													</button>
												</div>
											</div><!-- /.modal-content -->
										</div>
									</div><!-- /.modal -->
								    <!--模板下载-->
									<div style="display:none;" class="Mobileyh-div Mobileyh-five" onclick="DownloadTheTemplate()">
                                        <img src="img/imagess/mubanxiazai.png" alt="">
										<span>模板下载</span>
									</div>
									<!--批量导入-->
									<div style="display:none;" class="Mobileyh-div Mobileyh-six" onclick="bulkimport()">
                                        <img src="img/imagess/piliangdaoru.png" alt="">
										<span>批量导入</span>
									</div>
									<!--批量导入模态框-->
									<div class="modal fade" id="bulkimportmyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
										<div class="modal-dialog">
											<div class="modal-content">
												<div class="modal-header">
													<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
													<h4 class="modal-title" id="myModalLabel">批量导入</h4>
												</div>
												<div class="modal-body">
												    <div style="width:300px;height:auto;margin:0 auto;">
														<label for="">文件上传:</label>
														<input type="file" id="bulkimportfile" style='width:200px'>
													</div>
													<div class="progress progress-striped active" style="width:300px;height:15px;margin:0 auto;">
														<div class="progress-bar progress-bar-success" id="bulkimportschedule" role="progressbar"
															aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
															style="width: 0%;">
															<!--<span class="sr-only">40% 完成</span>-->
														</div>
													</div>
												</div>
												<div class="modal-footer">
													<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
													<button type="button" class="btn btn-primary" id="bulkimportj">提交</button>
												</div>
											</div><!-- /.modal-content -->
										</div>
									</div><!-- /.modal -->
									<!--信息同步-->
									<div style="display:none" class="Mobileyh-div Mobileyh-seven" onclick="Mobileyhseven()">
										<img src="img/imagess/guishufenzu.png" alt="">
										<span>信息同步</span>
									</div>
								</div>
								
					        	<div class="MobileDa">
					        		<div class="MobileData">
					        			
					        		</div>
					        		 <!-- 查看详情模态框（Modal） -->
									<div class="modal fade" id="particularsModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
										<div class="modal-dialog" style="width: 750px;">
											<div class="modal-content">
												<div class="modal-header">
													<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
														&times;
													</button>
													<h4 class="modal-title" id="myModalLabel">
														查看详情
													</h4>
												</div>
												<div class="modal-body">
											    	<table class="table table-striped table-bordered text-center">
											    		<tbody class="lookupparticulars">
													      <tr>
													        <td>设备编号:</td>
													        <td class="lookup1"></td>
															<td>设备序列号:</td>
													        <td class="lookup3"></td>
													      </tr>
													      <tr>
													        <td>车系代码:</td>
													        <td class="lookup4"></td>
															<td>车辆系列:</td>
													        <td class="lookup2"></td>
													      </tr>
													      <tr>
													        <td>车架号:</td>
													        <td class="lookup5"></td>
													        <td>硬件版本号:</td>
													        <td class="lookup6"></td>
													      </tr>
														  <tr>
															<td>归属分组:</td>
													        <td class="lookup25"></td>
													        <td>升级分组:</td>
													        <td class="lookup26"></td>  
														  </tr>
													      <tr>
													        <td>电控单元硬件编号:</td>
													        <td class="lookup7"></td>
													        <td>电控单元序列号:</td>
													        <td class="lookup8"></td>
													      </tr>
													      <tr>
													        <td>电控单元零件编号:</td>
													        <td class="lookup9"></td>
													        <td>电控单元生产日期:</td>
													        <td class="lookup10"></td>
													      </tr>
													      <tr>
													        <td>imsi:</td>
													        <td class="lookup13"></td>
													        <td>imei:</td>
													        <td class="lookup14"></td>
													      </tr>
													      <tr>
													        <td>iccid:</td>
													        <td class="lookup15"></td>
													        <td>升级索引:</td>
													        <td class="lookup16"></td>
													      </tr>
													      <tr>
													        <td>配置文件版本号:</td>
													        <td class="lookup17"></td>
													        <td>软件版本号:</td>
													        <td class="lookup18"></td>
													      </tr>
													      <tr>
													        <td>程序编译时间:</td>
													        <td class="lookup19"></td>
													        <td>登记日期:</td>
													        <td class="lookup20"></td>
													      </tr>
													      <tr>
													        <td>最后上线时间:</td>
													        <td class="lookup21"></td>
													        <td>最后离线时间:</td>
													        <td class="lookup22"></td>
													      </tr>
													      <tr>
													        <td>是否激活:</td>
													        <td class="lookup23"></td>
													        <td>激活截止日期:</td>
													        <td class="lookup24"></td>
													      </tr>
													       <tr>
													        <td>sim卡手机号码:</td>
													        <td class="lookup12"></td>
													      </tr>
													    </tbody>
											    	</table>
												</div>
											</div><!-- /.modal-content -->
										</div>
									</div><!-- /.modal -->
					        	    <!--远程模态框（Modal） -->
									<div class="modal fade" id="remoteManipulationModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
										<div class="modal-dialog" style="width: 1138px;">
											<div class="remoteManipulationheader">
													<div onClick="reulaone()" id="reulaone" class="reulacolor" style="left:1px;">配置信息</div>
													<div onClick="reulatwo()" id="reulatwo" style="left: 122px;">设备激活</div>
													<div onClick="reulathree()" id="reulathree" style="left: 243px;">陀螺仪校正</div>
													<div onClick="reulafour()" id="reulafour" style="left: 364px;">can协议</div>
													<div onClick="reulafive()" id="reulafive" style="left: 485px;">互联设备</div>
													<div onClick="reulasix()" id="reulasix" style="left: 606px;">注册应答</div>
													<div onClick="reulaseven()" id="reulaseven" style="left: 727px;">碰撞触发</div>
													<div onClick="reulaeight()" id="reulaeight" style="left: 848px;">呼叫接入</div>
													<!--<div onClick="reulanine()" id="reulanine" style="left: 969px;">远程升级</div>-->
													<div onClick="reulaeleven()" id="reulaeleven" style="left: 969px;">设备重启</div>
													<div onClick="reulaten()" id="reulaten" style="right: 1px;background: white;">
														<img src="img/Theowner/guanbi.png" alt="" />
													</div>
											</div>
											<div class="modal-content" style="border-top: none;border-top-right-radius: 0px;border-top-left-radius: 0px;">
												<div class="modal-body remoteManipulation-body">
													<form class="configurationinformation">
														<div>
															<p>		
																<span>设备编号:</span>
																<span class="equipmentnumber"></span>
															</p>
															<p>
																<span>在线状态:</span>
																<span class="EquipmentStatus"></span>
															</p>
														</div>
														<div class="configurationinformationtwo" style="width: 980px;margin: 0 auto;">
															<label for="">配置版本</label>
															<input type="text" maxlength="20" onkeyup="inputteshu(this)" class="config_ver"/>
															<label for="">iovdc_key</label>
															<input type="text" class="iovdc_key"/>
															<label for="">升级包密钥ID</label>
															<input type="text" maxlength="10" onkeyup="inputteshu(this)" class="update_keyid"/>
															<hr />
															<label for="">升级包密钥(hex)</label>
															<input type="text" maxlength="32" onkeyup="inputteshu(this)" class="update_key"/>
															<label for="">车牌号</label>
															<input type="text" maxlength="10" onkeyup="inputteshu(this)" class="plate"/>
															<label for="">sim卡电话号码</label>
															<input type="text" maxlength="20" onkeyup="inputteshu(this)" class="callNum"/>
															<hr />
															<label for="">Ecall服务号码</label>
															<input type="text" maxlength="20" onkeyup="inputteshu(this)" class="ecallNum"/>
															<label for="">Bcall服务号码</label>
															<input type="text" maxlength="20" onkeyup="inputteshu(this)" class="bcallNum"/>
															<label for="">Icall服务号码</label>
															<input type="text" maxlength="20" onkeyup="inputteshu(this)" class="icallNum"/>
															<hr />
															<label for="">Ecall短信号码</label>
															<input type="text" maxlength="20" onkeyup="inputteshu(this)" class="ecall_sms_num"/>
															<label for="">apn接入名称</label>
															<input type="text" maxlength="50" onkeyup="inputteshu(this)" class="apn"/>
															<label for="">接入服务器ip1</label>
															<input type="text" maxlength="20" onkeyup="inputteshu(this)" class="iovdc_ip1"/>
															<hr />
															<label for="">接入服务器ip2</label>
															<input type="text" maxlength="20" onkeyup="inputteshu(this)" class="iovdc_ip2"/>
															<label for="">接入服务器ip3</label>
															<input type="text" maxlength="20" onkeyup="inputteshu(this)" class="iovdc_ip3"/>
															<label for="">最近升级日期</label>
															<input type="text" maxlength="20" onkeyup="inputteshu(this)" class="update_time"/>
														</div>
													    <div class="configurationinformationthree">
													    	<a class="compiles">编辑</a>
													    	<a class="saves" name='2'>保存</button>
													    	<a class="reads">读取</a>
													    </div>
													</form>
												    <form class="configurationinformationtw">
														<div>
															<p>		
																<span>设备编号:</span>
																<span class="equipmentnumber"></span>
															</p>
															<p>
																<span>在线状态:</span>
																<span class="EquipmentStatus"></span>
															</p>
														</div>
														<div style="width: 980px;margin: 0 auto;">								
															<table class="table table-striped table-bordered text-center">
													    		<tbody>
															      <tr>
															        <td>设备当前状态</td>
															        <td id="currentone"></td>
															      </tr>
															      <tr>
															        <td>激活截止日期</td>
															        <td><input class="easyui-datetimebox" id="activationDateSpan" editable="false" style="width:146px"></td>
															      </tr>
															      <tr>
															        <td>T-BOX激活</td>
															        <td>
															        	<select id="activationone" style="width: 146px;">
															        		<option class="activationoneop1" value="1">激活</option>
															        		<option class="activationoneop2" value="0">反激活</option>
															        	</select>
															        </td>
															      </tr>
															    </tbody>
													    	</table>
													    	<div style="width: 160px;margin: 0 auto;">
													    	   <a class="ensureone">确定</a>
													        </div>
														</div>
													</form>
												    <form class="configurationinformationthr">
														<div>
															<p>		
																<span>设备编号:</span>
																<span class="equipmentnumber"></span>
															</p>
															<p>
																<span>在线状态:</span>
																<span class="EquipmentStatus"></span>
															</p>
														</div>
														<div style="width: 980px;margin: 0 auto;">								
															<table class="table table-striped table-bordered text-center">
													    		<tbody class="threetbody">
															      <tr>
															        <td>x方向姿态角度校正</td>
															        <td><input type="text" maxlength="45" onkeyup="inputteshu(this)" id="xdirection" /></td>
															      </tr>
															      <tr>
															        <td>y方向姿态角度校正</td> 
															        <td><input type="text" maxlength="45" onkeyup="inputteshu(this)" id="ydirection" /></td>
															      </tr>
															      <tr>
															        <td>行使方向姿态角度校正</td>
															        <td><input type="text" maxlength="45" onkeyup="inputteshu(this)" id="traveldirection" /></td>
															      </tr>
															    </tbody>
													    	</table>
													    	<div class="compileth" style="width: 640px;margin: 0 auto;">
														    	<a class="compilethr">编辑</a>
														    	<a class="savethr" name="2">确定</button>
														    	<a class="readthr">读取</a>
													        </div>
														</div>
													</form>
												    <form class="configurationinformationfou">
												    	<div>
															<p>		
																<span>设备编号:</span>
																<span class="equipmentnumber"></span>
															</p>
															<p>
																<span>在线状态:</span>
																<span class="EquipmentStatus"></span>
															</p>
														</div>
												        <div style="width: 980px;margin: 0 auto;">								
															<table class="table table-striped table-bordered text-center">
													    		<tbody class="fourtbody">
															      <tr>
															        <td>can通道号</td>
															        <td><input type="text" maxlength="20" onkeyup="inputteshu(this)" id="cangallery" /></td>
															        <td>页面号</td>
															        <td><input type="text" maxlength="20" onkeyup="inputteshu(this)" id="pagemark" /></td>
															      </tr>
															      <tr>
															        <td>can id1</td> 
															        <td><input type="text" maxlength="20" onkeyup="inputteshu(this)" id="canid1" /></td>
															        <td>can id1 发送时间间隔</td>
															        <td><input type="text" maxlength="20" onkeyup="inputteshu(this)" id="canid1jg" /></td>
															      </tr>
															      <tr>
															        <td>can id2</td>
															        <td><input type="text" maxlength="20" onkeyup="inputteshu(this)" id="canid2" /></td>
															        <td>can id2 发送时间间隔</td>
															        <td><input type="text" maxlength="20" onkeyup="inputteshu(this)" id="canid2jg" /></td>
															      </tr>
															    </tbody>
													    	</table>
													    	<div class="compilefour" style="width: 640px;margin: 0 auto;">
														    	<a class="compilefou">编辑</a>
														    	<a class="savefou" name="2">发送</button>
														    	<a class="readfou">读取</a>
													        </div>
														</div>
												    </form>
												    <form class="configurationinformationfive">
												    	<div>
															<p>		
																<span>设备编号:</span>
																<span class="equipmentnumber" id="friendlyDeviceIdSpan"></span>
															</p>
															<p>
																<span>序列号:</span>
																<span class="serialnumberfive" id="friendlyDeviceSnSpan"></span>
															</p>
															<p>
																<span>在线状态:</span>
																<span class="EquipmentStatus"></span>
															</p>
														</div>
												        <div style="width: 980px;margin: 0 auto;">	
															<table class="table table-striped table-bordered text-center">
													    		<p>(MAC地址由12位字母及数字组成)</p>
													    		<tbody class="fivetbody">
															        <tr>
																      <th style="text-align: center;">序号</th>
																      <th style="text-align: center;">名称</th>
																      <th style="text-align: center;">mac地址</th>
																      <th style="text-align: center;">操作</th>
																    </tr>
															    </tbody>
													        </table>  
													    	<div class="compilefive" style="width: 400px;margin: 0 auto;">
														    	<a class="compilefiv" style="padding-left: 15px;">添加设备</a>
														    	<a class="compilefi" name="2">保存</a>
													        </div>
													    </div>   
												    </form>
												    <form class="configurationinformationsix" method="post">
												    	<div>
															<p>		
																<span>设备编号:</span>
																<span class="equipmentnumber"></span>
															</p>
															<p>
																<span>在线状态:</span>
																<span class="EquipmentStatus"></span>
															</p>
														</div>
														<div style="width: 980px;margin: 0 auto;">	
															<table class="table table-striped table-bordered text-center">
													    		<tbody class="sixtbody">
															        <tr>
																      <td>设备互联网络</td>
																      <td>
																      	<input id="friendly_network" name="interworkingNetwork" class="easyui-combobox"
																		data-options="editable:false,valueField:'id',textField: 'value',data: [{id:'3',value: '开启WIFI与3G'},{id:'1',value: '开启WIFI'},{id:'2',value: '开启3G'},{id:'0',value: '关闭'}]"
																		panelheight="100" />
																      </td>
																      <td>用户WIFI网络</td>
																      <td>
																      	<input id="customer_network" name="userNetwork" class="easyui-combobox"
																		data-options="editable:false,valueField:'id',textField: 'value',data: [{id:'0',value: '关闭'},{id:'1',value: '开启WIFI'},{id:'2',value: '开启3G'},{id:'3',value: '开启WIFI与3G'}]"
																		panelheight="100" />
																      </td>
																    </tr>
																    <tr>
																      <td>E_call通话时长(分钟)</td>
																      <td>
																      	<input id="ecallLimit" name="ecallLimit" type="text" maxlength="20" onKeyUp="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onBlur="this.v();">
																      </td>
																      <td>B_call通话时长(分钟)</td>
																      <td>
																      	<input id="bcallLimit" name="bcallLimit" type="text" maxlength="20" onKeyUp="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onBlur="this.v();">
																      </td>
																    </tr>
																    <tr>
																      <td>I_call通话时长(分钟)</td>
																      <td>
																      	<input id="icallLimit" name="icallLimit" type="text" maxlength="20" onKeyUp="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onBlur="this.v();">
																      </td>
																      <td>其他通话时长(分钟)</td>
																      <td>
																      	<input id="xcallLimit" name="xcallLimit" type="text" maxlength="20" onKeyUp="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onBlur="this.v();">
																      </td>
																    </tr>
															    </tbody>
													        </table>  
													    	<div class="compilesix" style="width: 165px;margin: 0 auto;">
														    	<a class="compilesi" onClick="saveDeviceLoginResponse()">保存</a>
													        </div>
													    </div>   
												    </form>
												    <form class="configurationinformationseven" method="post">
												    	<div>
															<p>		
																<span>设备编号:</span>
																<span class="equipmentnumber"></span>
															</p>
															<p>
																<span>在线状态:</span>
																<span class="EquipmentStatus"></span>
															</p>
														</div>
												        <div style="width: 980px;margin: 0 auto;">	
															<table class="table table-striped table-bordered text-center">
													    		<tbody class="seventbody">
															        <tr>
																      <td>安装方式</td>
																      <td>
																      	<input id="ecallSetupMode" name="setupDirection" class="easyui-combobox" data-options="editable:false,valueField:'id',textField: 'value',data: [{id:'0',value: '车头方向为+X轴方向'},{id:'1',value: '车头方向为-X轴方向'},{id:'2',value: '车头方向为+Y轴方向'},{id:'3',value: '车头方向为-Y轴方向'}]" panelheight="100" />
																      </td>
																      <td>ECALL触发</td>
																      <td>
																      	<input id="ecallAutotrigger" name="ecallAutoTrigger" class="easyui-combobox" data-options="editable:false,valueField:'id',textField: 'value',data: [{id:'0',value: '关闭自动触发'},{id:'1',value: '开启自动触发'}]" panelheight="50" />
																      </td>
																    </tr>
																    <tr>
																      <td>倾斜角度大于X轴</td>
																      <td>
																      	<input id="gyrox" name="gyrox" type="text"  maxlength="5" onKeyUp="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onBlur="this.v();">
																      </td>
																      <td>倾斜角度大于Y轴</td>
																      <td>
																      	<input id="gyroy" name="gyroy" type="text" maxlength="5" onKeyUp="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onBlur="this.v();">
																      </td>
																    </tr>
																    <tr>
																      <td>倾斜角度大于Z轴</td>
																      <td>
																      	<input id="gyroz" name="gyroz" type="text" maxlength="5" onKeyUp="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onBlur="this.v();">
																      </td>
																      <td>加速度大于X轴</td>
																      <td>
																      	<input id="accx" name="accx" type="text" maxlength="5" onKeyUp="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onBlur="this.v();">
																      </td>
																    </tr>
																    <tr>
																      <td>加速度大于Y轴</td>
																      <td>
																      	<input id="accy" name="accy" type="text" maxlength="5" onKeyUp="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onBlur="this.v();">
																      </td>
																      <td>加速度大于Z轴</td>
																      <td>
																        <input id="accz" name="accz" type="text" maxlength="5" onKeyUp="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onBlur="this.v();">
																      </td>
																    </tr>
																    <tr>
																      <td>开启时间</td>
																      <td>
																      	<input id="ecallDelay" name="ecallDelay" type="text" maxlength="10" onKeyUp="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onBlur="this.v();">
																      </td>
																    </tr>
															    </tbody>
													        </table>  
													    	<div class="compileseven" style="width: 640px;margin: 0 auto;">
														    	<a class="compilese">编辑</a>
														    	<a class="compilesev" id="2">发送</a>
														    	<a class="compileseve">读取</a>
													        </div>
													    </div>   
												    </form>
												    <form class="configurationinformationeight">
												    	<div>
															<p>		
																<span>设备编号:</span>
																<span class="equipmentnumber"></span>
															</p>
															<p>
																<span>在线状态:</span>
																<span class="EquipmentStatus"></span>
															</p>
														</div>
														<div style="width: 980px;margin: 0 auto;">	
															<table class="table table-striped table-bordered text-center">
													    		<tbody class="eighttbody">
															        <tr>
																       <td>允许呼入时间</td> 
																       <td><input id="incomingCallAllow" name="incomingCallAllow" type="text"  maxlength="20"  onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onBlur="this.v();"></td>
																       <td>允许呼入电话号码</td>
																       <td><input id="incomingCallNumber" name="incomingCallNumber" type="text" maxlength="20" onKeyUp="(this.v=function(){if(this.value.length>1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/[^0-9\#]+/,'')}}).call(this)" onBlur="this.v();"></td>
																    </tr>
															    </tbody>
													        </table>  
													    	<div class="compileeight" style="width: 165px;margin: 0 auto;">
														    	<a class="compileeigh" name="2">保存</a>
													        </div>
													    </div>
												    </form>
												    <!--<form class="configurationinformationten" method="post">
												    	<div>
															<p>		
																<span>设备编号:</span>
																<span class="equipmentnumber"></span>
															</p>
															<p>
																<span>在线状态:</span>
																<span class="EquipmentStatus"></span>
															</p>
														</div>
														<div style="width: 980px;margin: 0 auto;">	
															<table class="table table-striped table-bordered text-center">
													    		<tbody class="tentbody">
															        <tr>
																       <td>升级包</td> 
																       <td colspan="3"><input id="via_upgrade" name="via_upgrade" style="width: 400px;" class="easyui-combogrid"  size="75" missingMessage="必填" data-options="editable:false,required:true,validType:'length[2,200]'" maxlength="200" /></td>
																    </tr>
															    </tbody>
													        </table> 
													    	<div class="compileten" style="width: 165px;margin: 0 auto;">
														    	<a class="compilete">升级</a>
													        </div>
													    </div>
												    </form>-->
													<form class="configurationinformationeleven">
														<div>
															<p>		
															    <span>设备编号:</span>
																<span class="equipmentnumber" id="equipmentnumbereleven"></span>
															</p>
															<p>
																<span>在线状态:</span>
																<span class="EquipmentStatus"></span>
															</p>
														</div>
                                                        <div class="compileeleven" style="width: 345px;margin: 0 auto;">
															<a class="compileeleve">重启</a>
															<a class="compileelevenn">读取</a>
														</div>
													</form>
												</div>
											</div><!-- /.modal-content -->
										</div>
									</div><!-- /.modal -->
					        	</div>
					        </div>
					    </div>
						 <!--4.2设备管理---SIM卡-->
					    <div class="facilitySIM">
					    	<!--当前指向-->
							<div class="oriented" style="position: absolute;">
								<span><b>设备管理</b></span>
								<span><b>></b></span>
								<span><b>SIM信息</b></span>
							</div>
							<!--搜索条件-->
							<div class="facilitySIMseek">
								<span><img src="img/imagess/sousuotubiaotwo.png" alt="" /></span>
							    <span>设备编号:</span>
							    <input type="text" id='facilitySIMseekinquire1'/>
							    <span>ICCID:</span>
							    <input type="text" id='facilitySIMseekinquire2'/>
							    <a href="javaScript:facilitySIMseekinquire()">查询</a>
							</div>
							<!--SIM信息下侧表-->
							<div class="facilitySIMbottom">
								<div class="facilitySIMbottom-top">
									<a style="display:none" class="easyui-linkbutton seeSim" iconCls="icon-detail" plain="true" onclick="seeSim()">sim卡详情</a>
									<a style="display:none" class="easyui-linkbutton seeSimInvoice" iconCls="icon-detail" plain="true" onclick="seeSimInvoice()">历史详单</a>
									<a style="display:none" class="easyui-linkbutton refreshSim" iconCls="icon-reload" plain="true" onclick="refreshSim()">用量同步</a>
									<a style="display:none" class="easyui-linkbutton informations" iconCls="icon-reload" plain="true" onclick="informations()">信息同步</a>
								</div>
								<!--sim卡详情模态框-->
								<div class="modal fade" id="SIMdetailsModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
									<div class="modal-dialog">
										<div class="modal-content">
											<div class="modal-header">
												<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
													&times;
												</button>
												<h4 class="modal-title" id="myModalLabel">
													SIM卡详情
												</h4>
											</div>
											<div class="modal-body">
												<table class="table table-striped table-bordered text-center">
													<tr>
														<td>设备编号</td>
														<td id="simdeviceid"></td>
														<td>呼叫号码</td>
														<td id="simphone"></td>
													</tr>
													<tr>
														<td>iccid</td>
														<td id="simiccid"></td>
														<td>当月数据(MB)</td>
														<td id="simdatausage"></td>
													</tr>
													<tr>
														<td>imei</td>
														<td id="simimei"></td>
														<td>当月短信(条)</td>
														<td id="simsmsusage"></td>
													</tr>
													<tr>
														<td>imsi</td>
														<td id="simimsi"></td>
														<td>当月语音(秒)</td>
														<td id="simvoiceusage"></td>
													</tr>
													<tr>
														<td>套餐</td>
														<td colspan="3" id="simrateplan"></td>
													</tr>
												</table>
											</div>
										</div><!-- /.modal-content -->
									</div>
								</div><!-- /.modal -->
								<!--sim卡历史详单模态框-->
								<div class="modal fade" id="SIMhistorysModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
									<div class="modal-dialog" style="width: 800px;">
										<div class="modal-content">
											<div class="modal-header">
												<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
													&times;
												</button>
												<h4 class="modal-title" id="myModalLabel">
													SIM卡历史详单
												</h4>
											</div>
											<div class="modal-body" style="height: 400px;">
												<div class="SIMhistorysdetailsone">
													<div class="SIMhistorysdetailsone-data">
														
													</div>
												</div>
												<div class="SIMhistorysdetailsonetwo" style="position: relative;">
													<div class="SIMhistorysdetailsonetwo-div1">
														<a class="easyui-linkbutton" iconCls="icon-back" plain="true" onclick="SIMhistorysdetailsonetwofh()">返回</a>
													</div>
													<div class="SIMhistorysdetailsonetwo-div2">
														<div class="SIMhistorysdetailsonetwo-data">
														
													    </div>
													</div>
													
												</div>
											</div>
										</div><!-- /.modal-content -->
									</div>
								</div><!-- /.modal -->
								<div class="facilitySIMbottom-bottom">
									<div class="facilitySIMbottomdata">
										
									</div>
								</div>
							</div>
					    </div>
					    <!--4.3设备管理---设备更换-->
						<div class="equipmentreplacement">
							<!--当前指向-->
							<div class="oriented" style="position: absolute;">
								<span><b>设备管理</b></span>
								<span><b>></b></span>
								<span><b>设备更换</b></span>
							</div>
                             <!--搜索条件-->
							 <div class="devicemanagementsearchcriteria">
                                 <span>初始设备编号:</span>
								 <input type="text" maxlength="20" id="initialequipmentnumber">
								 <span>原设备编号:</span>
								 <input type="text" maxlength="20" id="originalequipmentnumber">
								 <span>新设备编号:</span>
								 <input type="text" maxlength="20" id="newequipmentnumber">
								 <span>更换人员:</span>
								 <input type="text" maxlength="20" id="changepersonnel">
								 <a id="equipmentreplacementinquire1">查询</a>
							 </div>
						     <!--下侧表-->
							 <div class="equipmentreplacement-bottom">
                                  <!--下侧表操作按钮-->
								  <div class="equipmentreplacement-bottom-top">
                                      <!--添加设备更换记录-->
									  <div class="addequipmentreplacementrecord" style="display:none">
										  <img src="img/imagess/xinzeng.png" alt="">
										  <span>添加设备更换记录</span>
									  </div>
									  <!--修改设备更换记录-->
									  <div class="Modifyequipmentreplacementrecord" style="display:none">
										  <img src="img/imagess/bianjitubiao.png" alt="">
										  <span>修改设备更换记录</span>
									  </div>
									  <!--删除设备更换记录-->
									  <div class="removeequipmentreplacementrecord" style="display:none">
										  <img src="img/imagess/shanchu2.png" alt="">
										  <span>删除设备更换记录</span>
									  </div>
									  <!--查看设备更换记录-->
									  <div class="Lookequipmentreplacementrecord" style="display:none">
										  <img src="img/imagess/guishufenzu.png" alt="">
										  <span>查看设备更换记录</span>
									  </div>
								  </div>
								    <!-- 添加/修改模态框（Modal） -->
									<div class="modal fade" id="addequipmentreplacementrecordModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
										<div class="modal-dialog" style="width:1000px;">
											<div class="modal-content">
												<div class="modal-header">
													<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
														&times;
													</button>
													<h4 class="modal-title equipmentreplacementtitle" id="myModalLabel">
														添加更换记录
													</h4>
												</div>
												<div class="modal-body">
													<form id="repairfm" method="post" style="width:100%;height:100%">
                                                        <table class="table table-striped table-bordered text-center">
															<tr>
																<td><i>*</i>用户组</td>
																<td id="Modalusergroup"></td>
																<td><i>*</i>角色</td>
																<td id="Modalrole"></td>
																<td><i>*</i>操作人员</td>
																<td id="Modalusergroupoperationstaff"></td>
															</tr>
															<tr>
																<td><i>*</i>更换时间</td>
																<td><input class="easyui-datetimebox" data-options='editable:false' id="Modalreplacementtime" value="" style="width:146px"></td>
																<td><i>*</i>原电控单元序列号</td>
																<td><input type="text" maxlength="30" onkeyup='inputteshu(this)' id="Modalrawserialnumber"></td>
																<td><i>*</i>新电控单元序列号</td>
																<td><input type="text" maxlength="30" onkeyup='inputteshu(this)' id="Modalnewserialnumber"></td>

															</tr>
															<tr>
																<td>维修内容</td>
																<td colspan="5">
																	<textarea class="form-control" id="Modalsummary" name="Modalsummary" rows="3" style="width:100%;height:150px;resize:none;"></textarea>
																</td>
															</tr>
														</table>
													</form>
												</div>
												<div class="modal-footer">
													<button type="button" class="btn btn-default" data-dismiss="modal">关闭
													</button>
													<button type="button" onclick="saveequipmentreplacement()" class="btn btn-primary">
														保存
													</button>
												</div>
											</div><!-- /.modal-content -->
										</div>
									</div><!-- /.modal -->
									<!--查看设备更换记录模态框-->
									<div class="modal fade" id="LookequipmentreplacementModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
										<div class="modal-dialog" style="width:800px;">
											<div class="modal-content">
												<div class="modal-header">
													<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
														&times;
													</button>
													<h4 class="modal-title" id="myModalLabel">
														查看设备更换记录
													</h4>
												</div>
												<div class="modal-body">
													<table class="table table-striped table-bordered text-center">
														<tr>
															<td>用户组</td>
															<td id="LookModalusergroup"></td>
															<td>角色</td>
															<td id="LookModalrole"></td>
														</tr>
														<tr>
                                                            <td>操作人员</td>
															<td id="LookModalusergroupoperationstaff"></td>
															<td>更换时间</td>
															<td id="LookModalreplacementtime"></td>
														</tr>
														<tr>
															<td>原电控单元序列号</td>
															<td id="LookModalrawserialnumber"></td>
															<td>新电控单元序列号</td>
															<td id="LookModalnewserialnumber"></td>
														</tr>
														<tr>
															<td>初始设备编号</td>
															<td id="Lookinitialnumber"></td>
															<td>原设备编号</td>
															<td id="Lookrawnumber"></td>
														</tr>
														<tr>
															<td>新设备编号</td>
															<td id="Looknewnumber"></td>
														</tr>
														<tr>
															<td>维修内容</td>
															<td colspan="5" id="LookModalsummary"></td>
														</tr>
													</table>
												</div>
											</div><!-- /.modal-content -->
										</div>
									</div><!-- /.modal -->
								  <!--下侧表数据-->
								  <div class="equipmentreplacement-bottom-bottom">
									  <div class="equipmentreplacementmastermeter">

									  </div>
								  </div>
							 </div>
						</div>
						<!--4.4设备管理---第三方设备-->
                        <div class="ThirdpartyEquipment">
                            <!--当前指向-->
							<div class="oriented" style="position: absolute;">
								<span><b>设备管理</b></span>
								<span><b>></b></span>
								<span><b>第三方设备</b></span>
							</div>
							<!--搜索条件-->
							<div class="ThirdpartyEquipment-search">
                                <span><img src="img/imagess/sousuotubiaotwo.png" alt="" /></span>
								<span>第三方名称:</span>
							    <input type="text" id='ThirdpartyEquipment-deviceName'/>
							    <span>制造商:</span>
							    <input type="text" id='ThirdpartyEquipment-model'/>
							    <a href="javaScript:ThirdpartyEquipmentinquire()">查询</a>
							</div>
							<!--下侧表-->
							<div class="ThirdpartyEquipment-bottom">
                                 <div class="ThirdpartyEquipment-bottom-top">
									 <a style="" class="easyui-linkbutton ThirdpartyEquipmentadd" iconCls="icon-xinzengs" plain="true" onclick="ThirdpartyEquipmentadd()">新增第三方设备</a>
									 <a style="" class="easyui-linkbutton ThirdpartyEquipmentrevamp" iconCls="icon-bianjitwo" plain="true" onclick="ThirdpartyEquipmentrevamp()">修改第三方设备</a>
									 <a style="" class="easyui-linkbutton ThirdpartyEquipmentremove" iconCls="icon-shanchu2" plain="true" onclick="ThirdpartyEquipmentremove()">删除第三方设备</a>
								 </div>
								 <!--新增模态框-->
								 <!-- 模态框（Modal） -->
								<div class="modal fade" id="ThirdpartyEquipmentaddModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
									<div class="modal-dialog">
										<div class="modal-content">
											<div class="modal-header">
												<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
													&times;
												</button>
												<h4 class="modal-title" id="myModalLabel" class="ThirdpartyEquipmentaddTitle">
													新增第三方设备
												</h4>
											</div>
											<div class="modal-body">
												在这里添加一些文本
											</div>
											<div class="modal-footer">
												<button type="button" class="btn btn-default" data-dismiss="modal">关闭
												</button>
												<button type="button" class="btn btn-primary">
													提交
												</button>
											</div>
										</div><!-- /.modal-content -->
									</div>
								</div><!-- /.modal -->
								 <div class="ThirdpartyEquipment-bottom-bottom">
									 <div id="ThirdpartyEquipment-datagrid"></div>
								 </div>
							</div>
						</div>
						<!--5.1升级管理---设备升级-->
					    <div class="upgrademanage">
					    	<!--当前指向-->
							<div class="oriented" style="position: absolute;">
								<span><b>升级管理</b></span>
								<span><b>></b></span>
								<span><b>设备升级</b></span>
							</div>
							<div class="upgrademanagebottom">
								<div class="upgradetop">
									<span>
										<img src="img/imagess/sousuotubiaotwo.png" alt="" />
									</span>
									<span>适用型号:</span>
									<input type="text" maxlength="20" id="upgradetopcxs1"/>
									<span>软件版本:</span>
									<input type="text" maxlength="50" id="upgradetopcxs2"/>
									<span>硬件版本:</span>
									<input type="text" maxlength="10" id="upgradetopcxs3"/>
									<span>PAC版本:</span>
									<input type="text" id="upgradetopcxs4"/>
									<span>TSR:</span>
									<input type="text" maxlength="20" id="upgradetopcxs5"/>
									<span>文件名称:</span>
									<input type="text" maxlength="50" id="upgradetopcxs6"/>
									<a href="javascript:upgradetopcx2()">查询</a>
									<a href="javascript:upgradetopModal()" style="display:none;" class="uploadPackage">上传</a>

								    <!--上传模态框（Modal）-->
									<div class="modal fade" id="upgradetopModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
										<div class="modal-dialog" style="width: 950px;">
											<div class="modal-content">
												<div class="modal-header">
													<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
														&times;
													</button>
													<h4 class="modal-title" id="myModalLabel">
														设备升级文件上传
													</h4>
												</div>
												<div class="modal-body">
													<form id="uploadForm" action="uploadFile" enctype="multipart/form-data" method="post">
														<table id="uploadForm12" class="table table-striped table-bordered text-center">
															<tr style="text-align: left;margin-left: 6px;">
																<td style="text-align:center">上传文件:</td>
																<td colspan="3"><input id="file_namess" type="file" name="file_name" style="width: 300px;" class="easyui-validatebox" onChange="checkFile()" missingMessage="请选择上传文件" data-options="required:true" ><i> *</i>	</td>
															</tr>
															<tr style="text-align: left;margin-left: 6px;">
																<td style="text-align:center">MD5校验:</td>
																<td colspan="3"><input type="text" name="md5" id="md5" onkeyup='inputteshu(this)' size=50 style="width: 300px;" class="easyui-validatebox"  validtype="deviceId" missingmessage="必填"  data-options="required:true,validType:'length[2,32]'" maxlength="32" ><i> *</i></td>
															</tr>
															<tr>
																<td style="width: 25%;">硬件版本:</td>
																<td style="width: 25%;"><input type="text" name="hdversion"  id="hdversion" class="easyui-validatebox"   validtype="hardVer"   missingmessage="必填"  data-options="required:true,validType:'length[2,20]'" maxlength="10"><i> *</i></td>
																<td style="width: 25%;">软件版本:</td>
																<td style="width: 25%;"><input type="text" name="version"  id="version"  class="easyui-validatebox"   validtype="deviceId"  missingmessage="必填"  data-options="required:true,validType:'length[2,20]'" maxlength="20"><i> *</i></td>
															</tr>
															<tr>
																<td >车系代码:</td>
																<td><input type="text" name="model" onkeyup='inputteshu(this)' id="modelss" class="easyui-validatebox"   validtype="deviceId"   missingmessage="必填"  data-options="required:true,validType:'length[2,20]'" maxlength="20"><i> *</i></td>
																<td>升级类型:</td>
																<td>
																	<select id="update_type" name="update_type" onChange="updatetype()" style="width: 146px;">
																	   <option value="0" class="sb">通用升级</option>
																	   <option value="1">分组升级</option>
																	   <option value="2">指定升级</option>
																    </select><i> *</i>
																</td>
															</tr>
															<tr>
																<td>版本简介:</td>
																<td colspan="3">
																	<textarea id="summary" name="summary" cols="100" rows="8" maxlength="200" style="width:100%;height:100px;"></textarea>
																</td>
															</tr>
														</table>
														<div id="progressNumber" class="easyui-progressbar" style="width:400px;margin: 0 auto;margin-bottom: 10px;"></div>
													    <div class="uploadFiledatagirdone" style="width: 100%;height: 300px;">
													    	<div style="width: 300px;margin: 0 auto;margin-bottom: 5px;">
													    		<span>设备组:</span>
													    		<input type="text" id="filedevicegroup"/>
													    		<a href="javascript:uploadFilecx1()" style="display: inline-block;text-align: center;width: 60px;color: white;background: #4AAA4A;">查询</a>
													    	</div>
													    	<div class="uploadFiledatagird1">
													    		
													    	</div>
													    </div>
													    <div class="uploadFiledatagirdtwo" style="width: 100%;height: 300px;position: relative;">
													    	<div style="width: 710px;margin: 0 auto;margin-bottom: 5px;">
													    		<span style="margin-left: 120px;">设备编号:</span>
													    		<input type="text" maxlength="10" id="filededeviceone"/>
													    		<span>硬件版本:</span>
													    		<input type="text" maxlength="10" id="filededevicetwo"/>
													    		<!--<span>设备类型:</span>
													    		<input type="text" maxlength="20" id="filededevicethr"/>-->
													    		<a href="javascript:uploadFilecx2()" style="display: inline-block;text-align: center;width: 60px;color: white;background: #4AAA4A;">查询</a>
													    	</div>
													    	<div class="uploadFiledatagird2" style="width:100%;height:auto;position:absolute;top:24px;bottom:0;">
													    		<div class="uploadFiledatagird2-one" style="width:415px;height:290px;position: absolute;overflow: auto;">
                                                                     <div class="uploadFiledatagird2-one1">

																	 </div>
																</div>
																<div class="uploadFiledatagird2-two" style="width:75px;height:300px;background:white;position: absolute;left:421px;">
                                                                     <img src="img/Theowner/zuoshanchu.png" alt="" onclick="uploadFiledatagird2left()">
																	 <img src="img/Theowner/youshanchu.png" alt="" onclick="uploadFiledatagird2right()">
																</div>
																<div class="uploadFiledatagird2-thr" style="width:425px;height:290px;position: absolute;right:0;">
																	 <div class="uploadFiledatagird2-thr1">

																	 </div>
																</div>
													    	</div>
													    </div>
													</form>
												</div>
												<div class="modal-footer">
													<button type="button" onClick="uploadCanceled()" class="btn btn-default">
														取消
													</button>
													<button type="button" onClick="uploadFile()" class="btn btn-primary">
														上传
													</button>
												</div>
											</div><!-- /.modal-content -->
										</div>
									</div><!-- /.modal -->
								</div>
								<div class="upgradebottom">
									<div class="upgradebottomdata">
										
									</div>
									<!--详情模态框（Modal） -->
									<div class="modal fade" id="upgradedetailsModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
									    <div class="modal-dialog" style="width: 800px;">
									        <div class="modal-content">
									            <div class="modal-header">
									                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
									                <h4 class="modal-title" id="myModalLabel">详情</h4>
									            </div>
									            <div class="modal-body">
									            	<table id="uploadForm12" style="table-layout:fixed" class="table table-striped table-bordered text-center">
														<tr>
															<td>升级包类型</td>
															<td id="updataTypee"></td>
															<td>适用车型</td>
															<td id="modell"></td>
														</tr>
														<tr>
															<td>硬件版本号</td>
															<td id="hardVerr"></td>
															<td>软件版本号</td>
															<td id="softVerss"></td>
														</tr>
														<tr>
															<td>modem版本</td>
															<td id="modemVerr"></td>
															<td>pac版本</td>
															<td id="pacVerr"></td>
														</tr>
														<tr>
															<td>md5校检</td>
															<td id="md55" style="overflow: hidden;"></td>
															<td>文件大小</td>
															<td id="fileSizee"></td>
														</tr>
														<tr>
															<td>升级Key</td>
															<td id="keyIdd"></td>
															<td>上传时间</td>
															<td id="tss"></td>
														</tr>
														<tr>
															<td>升级包地址</td>
															<td colspan="3" id="urll"></td>
														</tr>
														<tr>
															<td>文件名称</td>
															<td colspan="3" id="fileNamee"></td>
														</tr>							
														<tr>
															<td>升级包描述</td>
															<td colspan="3" style="text-overflow: ellipsis; overflow: hidden;" id="summaryy"></td>
														</tr>
														<tr>
															<td>升级目标</td>
															<td colspan="3" id="tagetTypee"></td>
														</tr>
													</table>
													<div class="tagetTypeeone" style="height:200px;width: 768px;">
														<div class="tagetTypeeonedata" style="height:200px;width: 768px;">
															
														</div>
													</div>
													<div class="tagetTypeetwo" style="height:200px;width: 768px;">
														<div class="tagetTypeetwodata" style="height:200px;width: 768px;">
															
														</div>
													</div>
									            </div>
									        </div><!-- /.modal-content -->
									    </div>
									</div><!-- /.modal -->

								    <!-- 分组升级模态框（Modal） -->
									<div class="modal fade" id="UpgradeGroupModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
										<div class="modal-dialog" style="width: 900px;">
											<div class="modal-content">
												<div class="modal-header">
													<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
														&times;
													</button>
													<h4 class="modal-title" id="myModalLabel">
													     分组升级
													</h4>
												</div>
												<div class="modal-body">
													<p>（提示：1.查询以及刷新分页时，请先保存之前的添加或删除的指定设备组。2.请至少保留一个已指定设备组）</p>
													<div class="UpgradeGroupone">
														<p>已指定设备组</p>
														<p>
															设备组:<input type="text" id="UpgradeGrouponeinput"/>
															<a class="UpgradeGroupthraa" href="javascript:UpgradeGrouponecxx()">查询</a>
														</p>
														<div id="UpgradeGroupondata">
															<div id="upgradeGroupDg" style="width: 386px;height: 433px;"></div>
														</div>
													</div>
													<div class="UpgradeGrouptwo">
														<div>
															<div>
																<img onClick="importMore()" src="img/Theowner/zuoshanchu.png" alt="" />
															</div>
															<div>
																<img onClick="exportMore()" src="img/Theowner/youshanchu.png" alt="" />
															</div>
															<div>
																<button class="UpgradeGrouptwobc" onClick="saveUpgradeGroupDg()">保存</button>
															</div>
															<div>
																<button class="UpgradeGrouptwoqx" onclick='cancelupgradeGroupDg()'>取消</button>
															</div>
														</div>
													</div>
													<div class="UpgradeGroupthr">
														<p>未指定设备组</p>
														<p>
															设备组:<input type="text" id="UpgradeGroupthrinput"/>
															<a class="UpgradeGroupthraa" href="javascript:UpgradeGroupthrcxx()">查询</a>
														</p>
														<div id="UpgradeGrouptwdata">
															<div id="unupgradeGroupDg" style="width: 386px;height: 433px;"></div>
														</div>
													</div>
												</div>
											</div><!-- /.modal-content -->
										</div>
									</div><!-- /.modal -->
								    <!-- 指定升级模态框（Modal） -->
								    <div class="modal fade" id="assignModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
										<div class="modal-dialog" style="width: 900px;">
											<div class="modal-content">
												<div class="modal-header">
													<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
														&times;
													</button>
													<h4 class="modal-title" id="myModalLabel">
													     指定升级
													</h4>
												</div>
												<div class="modal-body">
													<p>（提示：1.查询以及刷新分页时，请先保存之前的添加或删除的指定设备。2.请至少保留一个已指定设备）</p>
													<div class="UpgradeGroupone">
														<p>已指定设备</p>
														<p style="width: 400px;">
															设备编号:<input type="text" id="UpgradeGroupone-inputone" style="width: 92px;"/>
															车架号:<input type="text" id="UpgradeGroupone-inputtwo" style="width: 92px;"/>
															<a class="UpgradeGroupthraa" href="javascript:searchUpgradeDevice()">查询</a>
														</p>
														<div id="UpgradeGroupondata">
															<div id="upgradeDeviceDg" style="width: 386px;height: 433px;"></div>
														</div>
													</div>
													<div class="UpgradeGrouptwo">
														<div>
															<div>
																<img onClick="importMor()" src="img/Theowner/zuoshanchu.png" alt="" />
															</div>
															<div>
																<img onClick="exportMor()" src="img/Theowner/youshanchu.png" alt="" />
															</div>
															<div>
																<button class="UpgradeGrouptwobc" onClick="saveUpgradeDeviceDg()">保存</button>
															</div>
															<div>
																<button class="UpgradeGrouptwoqx" onclick='cancelUpgradeDeviceDg()'>取消</button>
															</div>
														</div>
													</div>
													<div class="UpgradeGroupthr">
														<p>未指定设备</p>
														<p style="width: 400px;">
															设备编号:<input type="text" id="UpgradeGroupone-inputthree" style="width: 92px;"/>
															车架号:<input type="text" id="UpgradeGroupone-inputfour" style="width: 92px;"/>
															<a class="UpgradeGroupthraa" href="javascript:searchUnupgradeDevice()">查询</a>
														</p>
														<div id="UpgradeGrouptwdata">
															<div id="unupgradeDeviceDg" style="width: 386px;height: 433px;"></div>
														</div>
													</div>
												</div>
											</div><!-- /.modal-content -->
										</div>
									</div><!-- /.modal -->
								</div>
							</div>
					    </div>
						<!--5.2升级管理---升级日志-->
						<div class="UpdateLog">
					    	<!--当前指向-->
							<div class="oriented" style="position: absolute;">
								<span><b>升级管理</b></span>
								<span><b>></b></span>
								<span><b>升级日志</b></span>
							</div>
							<!--搜索条件-->
							<div class="UpdateLogtails"> 
								<img src="img/imagess/sousuotubiaotwo.png" alt="" />
								<span>设备编号:</span>
								<input type="text" id="UpdateLog-bianhao"/>
								<span>硬件版本号:</span>
								<input type="text" id="UpdateLog-yingjian"/>
								<span>TSR:</span>
								<input type="text" id="UpdateLog-tsr"/>
								<!-- <span>iccid:</span>
								<input type="text" id="UpdateLog-iccid"/> -->
								<a href="javaScript:UpdateLogchaxun()">查询</a>
							</div>
							<!--升级下侧表-->
							<div class="UpdateLog-bottom">
								<div class="UpdateLog-bottom-top">
									<div class="UpdateLog-div" style="display:none;">
					        			<img src="img/imagess/guishufenzu.png" alt="" />
					        			<span>查看详情</span>
					        		</div>
								</div>
								<!--查看详情模态框（Modal） -->
								<div class="modal fade" id="UpdateLogmyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
								    <div class="modal-dialog" style="width: 1140px;">
								        <div class="modal-content">
								            <div class="modal-header" >
								                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
								                <h4 class="modal-title" id="myModalLabel">查看详情</h4>
								            </div>
								            <div class="modal-body">
								            	<div class="UpdateLog-xiangqing">
								            		<div class="UpdateLog-modaldata">
								            			
								            		</div>
								            	</div>
								            </div>
								            <div class="modal-footer">
								                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
								            </div>
								        </div><!-- /.modal-content -->
								    </div><!-- /.modal -->
								</div>
								<div class="UpdateLog-bottom-bottom">
									<div class="UpdateLog-datagrid">
										
									</div>
								</div>
							</div>
					    </div>
						<!--6.1推送管理---信息推送-->
					    <div class="informationpush">
					    	<!--当前指向-->
							<div class="oriented" style="position: absolute;">
								<span><b>推送管理</b></span>
								<span><b>></b></span>
								<span><b>信息推送</b></span>
							</div>
                            <!--搜索条件-->
                            <div class="informationpushSE">
                            	<span><img src="img/imagess/sousuotubiaotwo.png" alt="" /></span>
                                <span>推送类别:</span>
                                <select id="pushType">
                                	<option value="">--请选择--</option>
                                	<option value="1">分组推送</option>
                                	<option value="2">单体推送</option>
                                </select>
                                <span>创建人:</span>
                                <input type="text" id="createUserName"/>
                                <span>推送状态:</span>
                                <select id="pushState">
                                	<option value="">--请选择--</option>
                                	<option value="0">未推送</option>
                                	<option value="1">已推送</option>
                                </select>
                                <span>审核状态:</span>
                                <select id="verifyState">
                                	<option value="">--请选择--</option>
                                	<option value="0">未审核</option>
                                	<option value="1">审核通过</option>
                                	<option value="2">审核未通过</option>
                                </select>
                                <a href="javaScript:informationpushSEXH()">查询</a>
                            </div>
					        <!--下侧表-->
					        <div class="informationpushbottom"> 
					        	<div class="informationpushbottom-top">
					        		<div style="display:none;" class="informationpushbottom-top-one">
					        			<span><img src="img/imagess/xinzeng.png" alt="" /></span>
					        			<a href="javaScript:addPushMessage()">添加推送消息</a>
					        		</div>
					        		<div style="display:none;" class="informationpushbottom-top-two">
					        			<span><img src="img/imagess/bianjitubiao.png" alt="" /></span>
					        			<a href="javaScript:editorPushMessage()">编辑推送消息</a>
					        		</div>
					        		<div style="display:none;" class="informationpushbottom-top-thr">
					        			<span><img src="img/imagess/shanchu2.png" alt="" /></span>
					        			<a href="javaScript:removePushMessage()">删除推送消息</a>
					        		</div>
					        		<div style="display:none;" class="informationpushbottom-top-four">
					        			<span><img src="img/imagess/guishufenzu.png" alt="" /></span>
					        			<a href="javaScript:lookoverPushMessage()">查看推送消息</a>
					        		</div>
					        		<div style="display:none;" class="informationpushbottom-top-five">
					        			<span><img src="img/imagess/shengjifenzu.png" alt="" /></span>
					        			<a href="javaScript:auditPushMessage()">审核推送消息</a>
					        		</div>
					        	</div>
					        	<!--添加/修改推送消息模态框-->
					        	<div class="modal fade" id="addmoveMessageModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
								    <div class="modal-dialog" style="width: 900px;">
								        <div class="modal-content">
								            <div class="modal-header">
								                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
								                <h4 class="modal-title addmoveMessageModaltitle" id="myModalLabel">添加推送消息</h4>
								            </div>
								            <div class="modal-body">
								            	<form class="monomerform">
								            		<table class="table table-striped table-bordered text-center">
								            			<tr>
								            				<td><i>*</i>推送类别</td>
								            				<td>  
								            					<select id="Pushthecategory">
								            						
								            					</select>
								            				</td>
								            				<td><i>*</i>app系统类型</td>
								            				<td id="monomerform-td-input"> 
								            					
								            				</td>
								            			</tr>
								            			<tr>
								            				<td><i>*</i>创建人</td>
								            				<td>
								            					<input type="text" id="founders" style="width: 100%;" style="text-align:center;" disabled="disabled"/>
								            				</td>
								            				<td><i>*</i>信息标题</td>
								            				<td>
								            					<input type="text" maxlength="100" id="messagetitle" style="width: 100%;"/>
								            				</td>
								            			</tr>
								            			<tr>
								            				<td><i>*</i>信息内容</td>
								            				<td colspan="3">
								            					<textarea class="form-control" maxlength="800" id="messagecontent" rows="3" maxlength="200" style="width:100%;height:60px;"></textarea>
								            				</td>
								            			</tr>
								            		</table>
								            	</form>
								            	<!--//单体推送-->
								            	<div class="monocasedatagrid">
								            	    <div>
								            	    	<div class="monocasedatagrid-top-one">
								            	    		已选择车主
								            	    	</div>
								            	    	<div class="monocasedatagrid-bottom-one">
								            	    		<div class="monocasedatagrid-bottom-datagrid1">

															</div>
								            	    	</div>
								            	    </div>
								            	    <div>
								            	    	<img onclick="leftdatagrid()" src="img/Theowner/zuoshanchu.png" style="width: 60px;height: 60px;cursor: pointer;margin-left: 4px;margin-top: 40px;" alt="" />
								            	    	<img onclick="rightdatagrid()" src="img/Theowner/youshanchu.png" style="width: 60px;height: 60px;cursor: pointer;margin-left: 4px;margin-top: 20px;" alt="" />
								            	    </div>
								            	    <div>
								            	    	<div class="monocasedatagrid-top-two">
								            	    		<span style="margin-left: 55px;">姓名:</span>
								            	    		<input type="text" class="monocasedatagrid-top-two-name" style="width: 85px;"/>
								            	    		<span>电话</span>
								            	    		<input type="text" class="monocasedatagrid-top-two-phone" style="width: 85px;"/>
								            	    		<button onclick="monocasedatagridinquire()">查询</button>
								            	    	</div>
								            	    	<div class="monocasedatagrid-bottom-two">
								            	    		<div class="monocasedatagrid-bottom-datagrid2"></div>
								            	    	</div>
								            	    </div>	
								            	</div>
								                <!--//分组推送-->
								                <div class="groupingdatagrid">
								                	<div class="groupingdatagrid-top">
								                		
								                	</div>
								                </div>
								            </div>
								            <div class="modal-footer">
								                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
								                <button type="button" class="btn btn-primary" onclick="addmoveMessagebc()">保存</button>
								            </div>
								        </div><!-- /.modal-content -->
								    </div>
								</div><!-- /.modal -->
					        	<!--查看/审核推送消息模态框-->
					        	<div class="modal fade" id="LookauditMessageModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
									<div class="modal-dialog" style="width:800px;">
										<div class="modal-content">
											<div class="modal-header">
												<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
													&times;
												</button>
												<h4 class="modal-title auditMessagestitle" id="myModalLabel">
													查看推送消息
												</h4>
											</div>
											<div class="modal-body">
												<table class='table table-striped table-bordered text-center'>
													<tr>
														<td>推送类别</td>
														<td id="lookPushThecateGory"></td>
														<td>app系统类型</td>
														<td id="Looksystemtype"></td>
													</tr>
													<tr>
														<td>创建人</td>
														<td id="Lookfounder"></td>
														<td>信息标题</td>
														<td id="Lookheadline"></td>
													</tr>
													<tr>
														<td>信息内容</td>
														<td id="Lookinformationcontent" colspan="3"></td>
													</tr>
												</table>
												<!--//单体推送-->
												<div id="LookauditMessagedt" style="width: 768px;height: 250px;position: relative;">
													<div style="width: 100%;height:35px;position: absolute;top: 0;">
														<div style="width: 350px;height: 100%;margin: 0 auto;padding: 6px;">
															<label for="">姓名:</label>
															<input type="text" id="inquireNameau" style="width: 100px;"/>
															<label for="">电话:</label>
															<input type="text" id="inquireNamedit" style="width: 100px;"/>
															<button onclick="inquireaudit()" style="border: 1px solid #3C8B3C;background: #47A447;color: white;border-radius: 4px;width: 37px;">查询</button>
														</div>
													</div>
													<div class="LookPushMessage">
														<div class="LookPushMessage-datagrid" style="width: 568px;height: 215px;">
															
														</div>
													</div>
												</div>
												<!--//分组推送-->
												<div id="LookauditMessagedtfz" style="width: 768px;height: 250px;position: relative;">
													<div style="width: 100%;height:35px;position: absolute;top: 0;">
														<div style="width: 240px;height: 100%;margin: 0 auto;padding: 6px;">
															<label for="">用户组名称:</label>
															<input type="text" id="inquireNameaustwo" style="width: 100px;"/>
															<button onclick="inquireaudittwo()" style="border: 1px solid #3C8B3C;background: #47A447;color: white;border-radius: 4px;width: 37px;">查询</button>
														</div>
													</div>
													<div class="LookPushMessage">
														<div class="LookPushMessage-datagrid-two" style="width: 568px;height: 215px;">
															
														</div>
													</div>
												</div>
											</div>
											<div class="modal-footer auditMessagefooter">
												<button type="button" class="btn btn-default auditMessagesbutton" name="2">
													未通过
												</button>
												<button type="button" class="btn btn-primary auditMessagesbutton" name="1">通过
												</button>
											</div>
										</div><!-- /.modal-content -->
									</div>
								</div><!-- /.modal -->
					        	<div class="informationpushbottom-bottom">
					        		<div class="informationpushbottom-bottom-datagrid">
					        			
					        		</div>
					        	</div>
								<!--下册表推送状态详情模态框（Modal） -->
								<div class="modal fade" id="PushstateModalbottom" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
									<div class="modal-dialog">
										<div class="modal-content">
											<div class="modal-header">
												<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
													&times;
												</button>
												<h4 class="modal-title" id="myModalLabel">
													推送状态查询
												</h4>
											</div>
											<div class="modal-body">
												<!--分组推送-->
												<div class="pushTypeone" style="width:568px;">
													<p style="font-size:18px;margin:0;display:none;">android用户推送状态</p>
                                                    <div style="width:100%;height:130px;display:none;">
                                                        <table class='table table-striped table-bordered text-center'>
                                                            <tr>
																<td>信息ID</td>
																<td id="messageIDandroid"></td>
																<td>推送时间</td>
																<td id="Pushthetimeandroid"></td>
															</tr>
															<tr>
																<td>信息推送总数</td>
																<td id="informationpushandroid"></td>
																<td>完成推送数量</td>
																<td id="Completethepushandroid"></td> 
															</tr>
															<tr>
																<td>发送状态</td>
																<td id="sendstateandroid"></td>
																<td>刷新时间</td>
																<td id="refreshtimeandroid"></td>
															</tr>
														</table>
													</div>
													<p style="font-size:18px;margin:0;margin-top:15px;display:none;">ios用户推送状态</p>
													<div style="width:100%;height:130px;display:none;">
                                                         <table class='table table-striped table-bordered text-center'>
                                                            <tr>
																<td>信息ID</td>
																<td id="messageIDios"></td>
																<td>推送时间</td>
																<td id="Pushthetimeios"></td>
															</tr>
															<tr>
																<td>信息推送总数</td>
																<td id="informationpushios"></td>
																<td>完成推送数量</td>
																<td id="Completethepushios"></td>
															</tr>
															<tr>
																<td>发送状态</td>
																<td id="sendstateios"></td>
																<td>刷新时间</td>
																<td id="refreshtimeios"></td>
															</tr>
														</table>
													</div>
												</div>
												<!--单体推送-->
												<div class="pushTypetwo" style="width:568px;height:300px;">
                                                     <div class="pushTypetwo-datagrid">
                                                          
													 </div>
												</div>
											</div>
											<div class="modal-footer">
												<button type="button" class="btn btn-default" data-dismiss="modal">关闭
												</button>
												<button type="button" class="btn btn-primary informationpushbtmsx" style="margin-right:230px;">刷新</button>
											</div>
										</div><!-- /.modal-content -->
									</div>
								</div><!-- /.modal -->
					        </div>
					    </div>
						<!--7.1总线录制---录制管理-->
						<div class="Recordmanagement">
							<!--当前指向-->
							<div class="oriented" style="position: absolute;">
								<span><b>总线录制</b></span>
								<span><b>></b></span>
								<span><b>录制管理</b></span>
							</div>
							<!--查询条件-->
							<div class="Recordmanagement-inquier">
								<img src="img/imagess/sousuotubiaotwo.png" alt="" />
								<span>设备编号:</span>
								<input type="text" id="Recordmanagement-number"/>
								<span>车架号:</span>
								<input type="text" id="Recordmanagement-vin"/>
								<span>电控单元号:</span>
								<input type="text" id="Recordmanagement-Electronic"/>
								<a href="javaScript:Recordmnagement()">查询</a>
							</div>
						    <!--录制管理下侧表-->
						    <div class="Recordmanagement-datagrid">
						    	<div class="Recordmanagement-primarymeter">
						    		
						    	</div>
						    </div>
						    <!--查看模态框-->
						    <div class="modal fade" id="RecordmanagementModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
								<div class="modal-dialog" style="width: 850px;">
									<div class="modal-content">
										<div class="modal-header">
											<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
												&times;
											</button>
											<h4 class="modal-title" id="myModalLabel">
												录制信息详情
											</h4>
										</div>
										<div class="modal-body">
											<div>
												<table class="table table-striped table-bordered text-center">
													<tr>
														<td>设备编号:</td>
														<td style="width: 90px;" id="Recordmanagementtd1"></td>
														<td>电控单元序列号:</td>
														<td id="Recordmanagementtd2"></td>
														<td>车架号:</td>
														<td id="Recordmanagementtd3"></td>
													</tr>
													<tr>
														<td>车系代码:</td>
														<td id="Recordmanagementtd5"></td>
														<td>iccid:</td>
														<td colspan="3" id="Recordmanagementtd4"></td>
													</tr>
												</table>
											</div>
											<!--表 datagrid-->
											<div style="width: 818px;height: 200px;">
												<div class="RecordmanagementModal-datagrid"></div>
											</div>
										</div>
									</div><!-- /.modal-content -->
								</div>
							</div><!-- /.modal -->
						    <!--录制设置模态框-->
						    <div class="modal fade" id="RecordingoptionsModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
								<div class="modal-dialog" style="width: 825px;">
									<div class="modal-content">
										<div class="modal-header">
											<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
												&times;
											</button>
											<h4 class="modal-title" id="myModalLabel">
												录制信息设置
											</h4>
										</div>
										<div class="modal-body">
											<div>
												<table class="table table-striped table-bordered text-center">
													<tr>
														<td>设备编号:</td>
														<td style="width: 90px;" id="Recordmanagementtdd1"></td>
														<td>电控单元序列号:</td>
														<td id="Recordmanagementtdd2"></td>
														<td>车架号:</td>
														<td id="Recordmanagementtdd3"></td>
													</tr>
													<tr>
														<td>车系代码:</td>
														<td id="Recordmanagementtdd5"></td>
														<td>iccid:</td>
														<td colspan="3" id="Recordmanagementtdd4"></td>
													</tr>
												</table>
											</div>
										    <div style="width: 450px;margin: 0 auto;">
										    	<span style="margin-left: 40px;">结束时间:</span>
										    	<input class="easyui-datetimebox" id="CANstoptime" data-options="editable:false" style="width:146px">
										    	<i>*</i>
												<span style="margin-left: 20px;">设备状态:</span>
												<span id="CANdeviceIdzt"></span>
										    </div>
										    <div style="width: 100%;height: 200px;margin-top: 10px;">
										    	<div id="CANdatagridform" style="width: 100%;height:100%;overflow: auto;">
										    		<table class="table table-striped table-bordered text-center table-hover" id="cantable">
										    			<tr>
										    				<th></th>
										    				<th style="text-align: center;">canID</th>
										    				<th style="text-align: center;">名称</th>
										    				<th style="text-align: center;">采集时间</th>
										    				<th style="text-align: center;">掩码</th>
															<th style="text-align: center;">CAN通道号</th>
															<th style="text-align: center;">清除</th>
										    			</tr>
										    			
										    		</table>
										    	</div>
										    </div>
										</div>
										<div class="modal-footer">
											<span>(设备需在线才能保存成功)</span>
											<button type="button" id="canIDduqu" class="btn btn-primary">读取</button>
											<!--<button type="button" id="canawaken" class="btn btn-primary">设备唤醒</button>-->
											<button type="button" id="Bustorecordsend" class="btn btn-primary">
												保存并发送
											</button>
											<!-- <button type="button" id="cancelrecording" class="btn btn-primary">取消录制</button> -->
											<button type="button" class="btn btn-default" data-dismiss="modal">关闭
											</button>
										</div>
									</div><!-- /.modal-content -->
								</div>
							</div><!-- /.modal -->
						</div>
					    <!--7.2总线录制---数据查询-->
						<div class="queryandpivot">
					    	<!--当前指向-->
							<div class="oriented" style="position: absolute;">
								<span><b>总线录制</b></span>
								<span><b>></b></span>
								<span><b>数据查询</b></span>
							</div>
					        <!--标签页-->
							<div class="systemLog-bottom">
								<div class="systemLog-bottom-top">
									<div id="queryandpivotLogs" style="background:white;">
										数据查询
									</div>
									<div id="queryandpivotoperates">
										导出记录
									</div>
								</div>
								<div class="systemLog-bottom-bottom">
									<!--数据查询-->
                                    <div class="queryandpivot-bottom-one">
                                        <!--查询条件-->
										<div class="queryandpivot-inquier">
											<img style="margin-left: 15px;" src="img/imagess/sousuotubiaotwo.png" alt="" />
											<span>设备编号:</span>
											<input type="text" id="queryandpivot-number"/>
											<span>起始时间:</span>
											<input type="text" class="easyui-datetimebox" id="queryandpivot-startElectronic" style="background: #EAEAEA !important;"/>
											<span>结束时间:</span>
											<input type="text" class="easyui-datetimebox" id="queryandpivot-oldElectronic" style="background: #EAEAEA !important;"/>
											<a href="javaScript:queryandpivotmanagement()">查询</a>
											<a href="javaScript:queryandpivotdaochu()" style="display:none;" class="canDataExport">导出</a>
										</div>
										<div style="position: absolute;top:32px;padding-left: 20px;">备注：列表页面最多展示1000条数据，可通过修改查询时间查看更多数据，或导出数据进行查看。</div>
										<!--下侧表-->
										<div class="queryandpivot-bottom">
											<!--<div class="queryandpivot-bottom-left">
												<div class="queryandpivot-bottom-left-top">CAN-ID 名称</div>
												<div class="queryandpivot-bottom-left-bottom">
													<button>全部数据</button>
													<button>EMS1 发动机管理</button>
													<button>EMS1 发动机管理</button>
													<button>EMS1 发动机管理</button>
												</div>
											</div>-->
											<div class="queryandpivot-bottom-right">
												<div class="queryandpivot-bottom-right-in">
													<div class="queryandpivot-bottom-datagrid">
														<div class="queryandpivot-datagrid">
															
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<!--导出记录-->
									<div class="queryandpivot-bottom-two" style="display:none;">
                                         <!--查询条件-->
										<div class="queryandpivot-inquier">
											<img style="margin-left: 15px;" src="img/imagess/sousuotubiaotwo.png" alt="" />
											<span>设备编号:</span>
											<input type="text" id="queryandpivot-numbertwo"/>
											<span>起始时间:</span>
											<input type="text" class="easyui-datetimebox" id="queryandpivot-startElectronictwo" style="background: #EAEAEA !important;"/>
											<span>结束时间:</span>
											<input type="text" class="easyui-datetimebox" id="queryandpivot-oldElectronictwo" style="background: #EAEAEA !important;"/>
											<a href="javaScript:queryandpivotmanagementtwo()">查询</a>
										</div>
										<div style="position: absolute;top:32px;padding-left: 20px;">备注：数据导出记录及导出文件服务器最多保留一个月。导出数据后请及时下载导出文件。</div>
										<div class="queryandpivot-bottom">
											<div class="queryandpivot-datagrid-two">

											</div>
										</div>
									</div>
								</div>
							</div>
							<!--导出详情模态框-->
							<div class="modal fade" id="systemLogmyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
								<div class="modal-dialog" style="width:550px;">
									<div class="modal-content">
										<div class="modal-header">
											<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
											<h4 class="modal-title" id="myModalLabel">导出详情</h4>
										</div>
										<div class="modal-body">
											<div style="width:100%;height:300px;">
                                                <div class="systemLogmyModal-datagrid">

												</div>
											</div>
										</div>
										<div class="modal-footer">
											<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
											<!--<button type="button" class="btn btn-primary">提交更改</button>-->
										</div>
									</div><!-- /.modal-content -->
								</div>
							</div><!-- /.modal -->
					    </div>
						<!--7.3总线录制---总线设置-->
					    <div class="canidSet">
					    	<!--当前指向-->
							<div class="oriented" style="position: absolute;">
								<span><b>总线录制</b></span>
								<span><b>></b></span>
								<span><b>CANID设置</b></span>
							</div>
					        <!--下侧树/表-->
					        <div class="canidSet-bottom">
					        	<div class="canidSet-bottom-left">
					        		<div class="canidSet-tree" style="padding: 10px;"></div>
					        	</div>
					        	<div class="canidSet-bottom-right">
					        		<div class="canidSet-bottom-right-inver" id="canidSetinver">
										<div class="canidSet-bottom-right-inver-main">
											<div class="canidSet-top-one" style="display:none;">
												<span><img src="img/imagess/xinzeng.png" alt="" /></span>
												<a href="javaScript:addcanidSet()">新增CANID</a>
											</div>
											<div class="canidSet-top-two" style="display:none;">
												<span><img src="img/imagess/bianjitubiao.png" alt="" /></span>
												<a href="javaScript:editorcanidSet()">修改CANID</a>
											</div>
											<div class="canidSet-top-thr" style="display:none;">
												<span><img src="img/imagess/shanchu2.png" alt="" /></span>
												<a href="javaScript:removecanidSet()">删除CANID</a>
											</div>
										</div>
										<!--新增/修改模态框-->
										<div class="modal fade" id="canidSetModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
											<div class="modal-dialog">
												<div class="modal-content">
													<div class="modal-header">
														<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
														<h4 class="modal-title canidSet-title" id="myModalLabel">新增CANID</h4>
													</div>
													<div class="modal-body">
														<table class="table table-striped table-bordered text-center">
															<tr>
																<td><i>*</i>CANID</td>
																<td><input type="text" onkeyup='inputteshu(this)' id="canidSet-myid" maxlength="4"/></td>
															</tr>
															<tr>
																<td><i>*</i>CAN名称</td>
																<td><input type="text" onkeyup='inputteshu(this)' id="canidSet-myname" maxlength="20"/></td>
															</tr>
															<tr>
																<td><i>*</i>掩码</td>
																<td id="canidSet-mymask">

																</td>
															</tr>
														</table>
													</div>
													<div class="modal-footer">
														<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
														<button type="button" class="btn btn-primary" id="canidSetSubmit">提交更改</button>
													</div>
												</div><!-- /.modal-content -->
											</div>
										</div><!-- /.modal -->
										<div class="canidSet-bottom-right-inver-bottom">
											<div class="canidSet-datagrid"></div>
										</div>
					        		</div>
					        	</div>
					        </div>
					    </div>
						<!--8.1应用管理--应用管理-->
					    <div class="appliedmanagement">
					    	<!--当前指向-->
							<div class="oriented" style="position: absolute;">
								<span><b>应用管理</b></span>
								<span><b>></b></span>
								<span><b>应用管理</b></span>
							</div>
					        <!--下侧表-->
					        <div class="appliedmanagement-bottom">
					        	<div class="appliedmanagement-bottom-top">
					        	    <div class="appliedmanagement-top-one" style="display:none;">
					        			<span><img src="img/imagess/xinzeng.png" alt="" /></span>
					        			<a href="javaScript:appliedmanagementadd()">添加应用</a>
					        		</div>
					        		<div class="appliedmanagement-top-two" style="display:none;">
					        			<span><img src="img/imagess/bianjitubiao.png" alt="" /></span>
					        			<a href="javaScript:appliedmanagementModify()">编辑应用</a>
					        		</div>
					        		<div class="appliedmanagement-top-thr" style="display:none;">
					        			<span><img src="img/imagess/shanchu2.png" alt="" /></span>
					        			<a href="javaScript:appliedmanagementremove()">删除应用</a>
					        		</div>
					        	</div>
					        	<!--新增模态框-->
				        		<div class="modal fade" id="appliedmanagementModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
								    <div class="modal-dialog">
								        <div class="modal-content">
								            <div class="modal-header">
								                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
								                <h4 class="modal-title" id="myModalLabel"><span id="addopenappspan">添加应用</span></h4>
								            </div>
								            <div class="modal-body">
								            	<div style="width: 250px;height: 200px;margin: 0 auto;">
								            		<span style="width:86px;display: inline-block;margin-top: 15px;"><i>*</i>状态:</span>
								            		<select id="appliedmanagement-state" style="width: 146px;">
								            			<option value="0">禁用</option>
								            			<option value="1">启用</option>
								            		</select> 
								            		<hr />
								            		<span style="width:86px;display: inline-block;margin-top: 15px;"><i>*</i>应用ID:</span>
								            		<input type="text" id="appliedmanagement-ID" onkeyup='inputteshu(this)' maxlength="20"/>
								            		<hr />
								            		<span style="width:86px;display: inline-block;margin-top: 15px;"><i>*</i>设备供应商:</span>
								            		<input type="text" id="appliedmanagement-supplier" onkeyup='inputteshu(this)' maxlength="20"/>
								            		<hr />
								            		<span style="width:86px;vertical-align: top;display: inline-block;margin-top: 15px;">应用描述:</span>
								            		<textarea id="appliedmanagement-summary" cols="20" maxlength="50"style="width: 146px;margin-top: 15px;" ></textarea>
								            		<hr />
								            	</div>
								            </div>
								            <div class="modal-footer">
								                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
								                <button type="button" class="btn btn-primary" id="appliedmanagement-save">保存</button>
								            </div>
								        </div><!-- /.modal-content -->
								    </div>
								</div><!-- /.modal -->
								<!--查看应用-->
								<div class="modal fade" id="appliedmanagementModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
									<div class="modal-dialog" style="width:600px;">
										<div class="modal-content">
											<div class="modal-header">
												<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
													&times;
												</button>
												<h4 class="modal-title" >
													查看应用
												</h4>
											</div>
											<div class="modal-body">
												<table class="table table-striped table-bordered text-center">
													<tr>
														<td style="width:200px;">状态：</td>
														<td id="appliedmanagement-state2"></td>
													</tr>
													<tr>
                                                        <td>应用ID：</td>
														<td id="appliedmanagement-ID2"></td>
													</tr>
													<tr>
														<td>设备供应商：</td>
														<td id="appliedmanagement-supplier2"></td>
													</tr>
													<tr>
														<td>应用描述：</td>
														<td id="appliedmanagement-summary2"></td>
													</tr>
												</table>
											</div>
										</div><!-- /.modal-content -->
									</div>
								</div><!-- /.modal -->
							
								
					        	<div class="appliedmanagement-bottom-bottom">
					        		<div class="appliedmanagement-datagrid">
					        			
					        		</div>
					        	</div>
					        </div>
					    </div>
						<!--9.2数据查询--实时车况-->
					    <div class="Realtimecondition">
					    	<!--当前指向-->
							<div class="oriented" style="position: absolute;">
								<span><b>数据查询</b></span>
								<span><b>></b></span>
								<span><b>实时车况</b></span>
							</div>
							<div style="width:100%;height:auto;position:absolute;top:60px;bottom:0;background;red;">
                                    <!--上层遮罩层-->
									<div class="Realtimecondition-option" style="min-height:550px;height:80%;">
										<p class="lushusq" name='1' style="position: absolute;right:5px;margin-top: 5px;cursor: pointer;">
											<span style="color: #FFB801;padding-right: 5px;">收起</span>
											<span style="padding-right: 5px;"><img class="lushusqimg" src="img/icon/sq.png" alt="" /></span>
										</p>
										<div style="position: absolute;top:35px;" class="lushuinquire">
											<span style="margin-left: 20px;">设备编号:</span>
											<span><input type="text" style="width: 120px;color: black;" id="RealtimeconditionSerial"/></span>
											<hr />
											<a onclick="Realtimeconditionqinquire()">立即查询</a>
										</div>
										<p style="position: absolute;top: 150px;left: 20px;">刷新时间设定</p>
										<div class="lushuflush" style="margin-top:205px;margin-left: 30px;position: relative;">
											<span style="position: absolute;top: 0;left: -25px;">3s</span>
											<span><input id="lushuslider" style="width:90px;"></span>
											<span style="position:absolute;top: 0;right: 87px;">15s</span>
											<a onclick="Realtimeconditiontsbcs()">保存</a>
										</div>
										<div class="lushushuju">
											<p>
												<span>设备编号:</span>
												<span id="Realtimecondition-equipmentnumber"></span>
											</p>
											<p>
												<span>车主姓名:</span>
												<span id="Realtimecondition-username"></span>
											</p>
											<p>
												<span>联系电话:</span>
												<span id="Realtimecondition-userphone"></span>
											</p>
											<p>
												<span>车牌号:</span>
												<span id="Realtimecondition-platenumber"></span>
											</p>
											<p>
												<span>车架号:</span>
												<span id="Realtimecondition-vin"></span>
											</p>
											<p>
												<span>紧急联系人:</span>
												<span id="Realtimecondition-name"></span>
											</p>
											<p>
												<span>紧急联系人电话:</span>
												<span id="Realtimecondition-phone"></span>
											</p>
										</div>
									</div>
									<!--地图图层-->
									<div class="Realtimecondition-bottom" id="allmap" style="width: 100%;height: 80%;">
										
									</div>
									<!--下侧实时数据层-->
									<div class="Realtimecondition-relaTime" name='1'>
										<div style="width:20px;height:20px;margin:0 auto;" onclick="Realtimeconditionsl()">
											<img src="img/icon/sqs.png" alt="">
										</div>
										<div class="Realtimecondition-relaTime-top">
											<div>
												<img src="img/relatime/fadongji.png" alt="" />
												<p style="color:#F65353;" id="fadongji"></p>
												<p style="color:#F65353;">r/min</p>
											</div>
											<div>
												<img src="img/relatime/shisu.png" alt="" />
												<p style="color:#FFBB00;" id="shisu"></p>
												<p style="color:#FFBB00;">km/h</p>
											</div>
											<div>
												<img src="img/relatime/youliang.png" alt="" />
												<p style="color:#00E4C1;" id="youliang"></p>
												<p style="color:#00E4C1;">%</p>
											</div>
											<div>
												<img src="img/relatime/shuiwen.png" alt="" />
												<p style="color:#00ACFF;" id="shuiwen"></p>
												<p style="color:#00ACFF;">&#8451;</p>
											</div>
											<div>
												<img src="img/relatime/dianya.png" alt="" />
												<p style="color:#EE43BD;" id="dianya"></p>
												<p style="color:#EE43BD;">正常/低压</p>
											</div>
											<div>
												<img src="img/relatime/youhao.png" alt="" />
												<p style="color:#FF8146;" id="youhao"></p>
												<p style="color:#FF8146;">L</p>
											</div>
										</div>
										<div class="Realtimecondition-relaTime-main">
											<div class="Realtimecondition-relaTime-main-one">
												<div>
													<p>持续行驶时间</p>
													<p id="vehiclestate1"></p>
												</div>
												<div>
													<p>总里程</p>
													<p id="vehiclestate2"></p>
												</div>
												<div>
													<p>上电状态</p>
													<p id="vehiclestate3"></p>
												</div>
												<div>
													<p>离合器状态</p>
													<p id="vehiclestate4"></p>
												</div>
												<div>
													<p>方向盘角度</p>
													<p id="vehiclestate5"></p>
												</div>
												<div>
													<p>驻车刹车(手刹)</p>
													<p id="vehiclestate6"></p>
												</div>
												<div>
													<p>刹车状态</p>
													<p id="vehiclestate7"></p>
												</div>
												<div>
													<p>油门状态</p>
													<p id="vehiclestate8"></p>
												</div>
												<div>
													<p>档位</p>
													<p id="vehiclestate9"></p>
												</div>
												<div style="margin-left: 5%;">
													<p>自动巡航</p>
													<p id="vehiclestate10"></p>
												</div>
												<div>
													<p>ABS状态</p>
													<p id="vehiclestate11"></p>
												</div>
												<div>
													<p>DSP状态</p>
													<p id="vehiclestate12"></p>
												</div>
												<div>
													<p>防盗报警</p>
													<p id="vehiclestate13"></p>
												</div>
												<div>
													<p>引擎盖</p>
													<p id="vehiclestate14"></p>
												</div>
												<div>
													<p>油盖箱</p>
													<p id="vehiclestate15"></p>
												</div>
												<div>
													<p>内部PM2.5</p>
													<p id="vehiclestate16"></p>
												</div>
												<div>
													<p>外部PM2.5</p>
													<p id="vehiclestate17"></p>
												</div>
												<div>
													<p>车内温度</p>
													<p id="vehiclestate18"></p>
												</div>
												<div style="margin-left: 5%;">
													<p>车外温度</p>
													<p id="vehiclestate19"></p>
												</div>
												<div>
													<p>钥匙位置</p>
													<p id="vehiclestate20"></p>
												</div>
												<div>
													<p>发动机状态</p>
													<p id="vehiclestate21"></p>
												</div>
											</div>
										</div>
										<div class="Realtimecondition-relaTime-bottom">
											<div>
												<div class="Realtimecondition-xiatop">
													<div style="width: 198px;margin: 0 auto;">
														<span style="margin-top: 30px;">
															<img src="img/relatime/dakai.png"/>
															打开状态
															<hr />
															<img src="img/relatime/guanbi.png"/>
															关闭状态
														</span>
														<span style="position: relative;">
															<span>车灯</span>
															<img src="img/relatime/chedeng.png" alt="" />
														</span>
													</div>
												</div>
												<div class="Realtimecondition-xiabottom">
													<div style="width: 198px;margin: 0 auto;">
														<span class="turnlight">
															<img src="img/relatime/guanbi.png" alt="" />
															左转向灯
															<img style="margin-left:21px " src="img/relatime/guanbi.png" alt=""/>
															右转向灯
														</span>
														<hr />
														<span class="cornerlamp">
															<img src="img/relatime/guanbi.png" alt="" />
															左角灯
															<img src="img/relatime/guanbi.png" alt=""/>
															右角灯
														</span>
														<hr />
														<span class="actiniclamp">
															<img src="img/relatime/guanbi.png" alt="" />
															近光灯
															<img src="img/relatime/guanbi.png" alt=""/>
															远光灯
														</span>
														<hr />
														<span class="foglight">
															<img src="img/relatime/guanbi.png" alt="" />
															前雾灯
															<img src="img/relatime/guanbi.png" alt=""/>
															后雾灯
														</span>
														<hr />
														<span class="stoplight">
															<img src="img/relatime/guanbi.png" alt="" />
															刹车灯
															<img src="img/relatime/guanbi.png" alt=""/>
															三角警告灯
														</span>
														<hr />
														<span class="readinglamp">
															<img src="img/relatime/guanbi.png" alt="" />
															阅读灯
															<img src="img/relatime/guanbi.png" alt=""/>
															驻车灯
														</span>
														<hr />
														<span class="clearancelamp">
															<img src="img/relatime/guanbi.png" alt="" />
															示宽灯
															<img src="img/relatime/guanbi.png" alt=""/>
															停车指示灯
														</span>
													</div>
												</div>
											</div>
											<div>
												<div class="Realtimecondition-xiatop">
													<div style="width: 198px;margin: 0 auto;">
														<span style="margin-top: 30px;">
															<img src="img/relatime/dakai.png"/>
															打开状态
															<hr />
															<img src="img/relatime/guanbi.png"/>
															关闭状态
														</span>
														<span style="position: relative;">
															<span>座椅安全</span>
															<img src="img/relatime/zuoyi.png" alt="" />
														</span>
													</div>
												</div>
												<div class="Realtimecondition-xiabottom">
													<div style="width: 198px;margin: 0 auto;">
														<span class="driversseat">
															<img src="img/relatime/guanbi.png" alt="" />
															驾驶座加热
															<img style="margin-left: 11px;" src="img/relatime/guanbi.png" alt=""/>
															副驾驶座加热
														</span>
														<hr />
														<span class="safetybelt">
															<img src="img/relatime/guanbi.png" alt="" />
															驾驶安全带
															<img style="margin-left: 11px;" src="img/relatime/guanbi.png" alt=""/>
															副驾驶安全带
														</span>
													</div>
												</div>
											</div>
											<div>
												<div class="Realtimecondition-xiatop">
													<div style="width: 198px;margin: 0 auto;">
														<span style="margin-top: 30px;">
															<img src="img/relatime/dakai.png"/>
															落锁状态
															<hr />
															<img src="img/relatime/guanbi.png"/>
															解锁状态
														</span>
														<span style="position: relative;">
															<span>中控锁</span>
															<img src="img/relatime/zhongkong.png" alt="" />
														</span>
													</div>
												</div>
												<div class="Realtimecondition-xiabottom">
													<div style="width: 198px;margin: 0 auto;">
														<span class="frontdoorlock">
															<img src="img/relatime/guanbi.png" alt="" />
															驾驶门锁
															<img style="margin-left: 30px;" src="img/relatime/guanbi.png" alt=""/>
															副驾驶门锁
														</span>
														<hr />
														<span class="reardoorlock">
															<img src="img/relatime/guanbi.png" alt="" />
															左后门锁
															<img style="margin-left: 30px;" src="img/relatime/guanbi.png" alt=""/>
															右后门锁
														</span>
														<span class="trunk">
															<img src="img/relatime/guanbi.png" alt="" />
															后备箱锁
														</span>
													</div>
												</div>
											</div>
											<div>
												<div class="Realtimecondition-xiatop">
													<div style="width: 198px;margin: 0 auto;">
														<span style="margin-top: 30px;">
															<img src="img/relatime/dakai.png"/>
															打开状态
															<hr />
															<img src="img/relatime/guanbi.png"/>
															关闭状态
														</span>
														<span style="position: relative;">
															<span>车门车窗</span>
															<img src="img/relatime/chemenchuang.png" alt="" />
														</span>
													</div>
												</div>
												<div class="Realtimecondition-xiabottom">
													<div style="width: 198px;margin: 0 auto;">
														<span class="driverdoor">
															<img src="img/relatime/guanbi.png" alt="" />
															驾驶门
															<img style="margin-left: 35px;" src="img/relatime/guanbi.png" alt=""/>
															副驾驶门
														</span>
														<hr />
														<span class="backdoor">
															<img src="img/relatime/guanbi.png" alt="" />
															左后门
															<img style="margin-left: 35px;" src="img/relatime/guanbi.png" alt=""/>
															右后门
														</span>
														<hr />
														<span class="drivershatchdor">
															<img src="img/relatime/guanbi.png" alt="" />
															驾驶门窗
															<img style="margin-left: 21px;" src="img/relatime/guanbi.png" alt=""/>
															副驾驶门窗
														</span>
														<hr />
														<span class="drivershatchdoor">
															<img src="img/relatime/guanbi.png" alt="" />
															左后门窗
															<img style="margin-left: 21px;" src="img/relatime/guanbi.png" alt=""/>
															右后门窗
														</span>
														<hr />
														<span class="WIPERFRONT">
															<img src="img/relatime/guanbi.png" alt="" />
															后备箱
															<img style="margin-left: 35px;" src="img/relatime/guanbi.png" alt=""/>
															前雨刮
														</span>
														<hr />
														<span class="frontdefrost">
															<img src="img/relatime/guanbi.png" alt="" />
															后雨刮
															<img style="margin-left: 35px;" src="img/relatime/guanbi.png" alt=""/>
															前除霜
														</span>
														<hr />
														<span class="queendefrost">
															<img src="img/relatime/guanbi.png" alt="" />
															后除霜
														</span>
													</div>
												</div>
											</div>
											<div>
												<div class="Realtimecondition-xiatop">
													<div style="width: 198px;margin: 0 auto;">
														<span style="margin-top: 30px;">
															<img src="img/relatime/dakai.png"/>
															安全状态
															<!--<hr />
															<img src="img/relatime/jinggao.png"/>
															告警状态-->
														</span>
														<span style="position: relative;">
															<span style="top: -35px;">胎压温度</span>
															<img style="top:5px;" src="img/relatime/taiya.png" alt="" />
														</span>
													</div>
												</div>
												<div class="Realtimecondition-xiabottom">
													<div style="width: 258px;margin: 0 auto;">
														<span class="leftanterior">
															<img src="img/relatime/dakai.png" alt="" />
															<span style="width: 110px;">左前胎压</span>
															<img style="margin-left: 0;" src="img/relatime/dakai.png" alt=""/>
															<span>右前胎压</span>
														</span>
														<hr />
														<span class="rightanterior">
															<img src="img/relatime/dakai.png" alt="" />
															<span style="width: 110px;">左后胎压</span>
															<img style="margin-left: 0;" src="img/relatime/dakai.png" alt=""/>
															<span>右后胎压</span>
														</span>
														<hr />
														<span class="leftTiretemperature">
															<img src="img/relatime/dakai.png" alt="" />
															<span style="width: 110px;">左前胎温度</span>
															<img style="margin-left: 0;" src="img/relatime/dakai.png" alt=""/>
															<span>右前胎温度</span>
														</span>
														<hr />
														<span class="rightTiretemperature">
															<img src="img/relatime/dakai.png" alt="" />
															<span style="width: 110px;">左后胎温度</span>
															<img style="margin-left: 0;" src="img/relatime/dakai.png" alt=""/>
															<span>右后前胎温度</span>
														</span>
													</div>
												</div>
											</div>
										</div>
									</div>
							</div>
							 
					    </div>
					</main>
				</div>
			</div>
			<div class="left">
				<div class="left-img">
					<img src="img/login/LOGO.png" alt="" />
					<img src="img/imagess/caidanjian.png" alt="" />
				</div>
				<div class="main-left">
					<div class="funct">
						<span>
							<img src="img/icon/gongnengliebiao.png" alt="">
						</span>
					</div>
					<div class="listing" ng-controller='listingcontroller'>
						<div class="panel-group" id="accordion" style="overflow: auto;">
                             
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
<script src="js/index.js"></script>
<script src="js/TheOwner.js"></script>
<script src="js/MobileUnit.js"></script>
<script src="js/upgrademanage.js"></script>
<script src="js/MotorcycleType.js"></script>
<script src="js/equipmentreplacement.js"></script>
<script src="js/facilitySIM.js"></script>
<script src="js/Recordmanagement.js"></script>
