    /*********************3.1车型管理---车型管理****************** */
	 var id4;//左侧tree树的真实id
	 var motorcycletypelevel; //车型的等级
	 var motorcycletypeGroupId; //车型的顶级用户组id
	 $('#managementli31').click(function(){
		clearInterval(seti);
	 	id4='';
	 	$('main>div').css('display', 'none');
		$('.Motorcyclebottom-right-div').css('display','none')
		$('.Motorcyclebottom-right2').css('display','')
    	$('.MotorcycleType').css('display','')
    	//权限判断
		var data={
			id:$('#managementli31').attr('name')
		}	
		$.post(server_context+'/setMenuId',data,function(data){
			for(var i=0;i<data.data.length;i++){
				if(data.data[i]==31){
					$('.MotorcycleAdd').css('display','');
				}
				if(data.data[i]==32){
					$('.MotorcycleMove').css('display','');
				}
				if(data.data[i]==33){
					$('.Motorcyclebaocun').css('display','');
				}
			}
		})
		//树状表
	    $('.Motorcyclebottom-tree').tree({
			url: server_context+'/listVehicleModelTree',
			method: 'post',
			animate: 'true',
			loadFilter: function(rows) {
				return rows.data;
				// return conver(rows);
			},
			onSelect: function(node) {
                id4 = node.id;
				motorcycletypelevel = node.level;
				motorcycletypeGroupId = node.topGroupId;
				return Motorcycletree(node);
			}
		})
	 })
	 //找出选中tree树的值
	 function Motorcycletree(node){
        if(motorcycletypelevel==4){
            $('.Motorcyclebottom-right-div').css('display','')
			$('.Motorcyclebottom-right2').css('display','none')
			$.ajax({
				url:server_context+'/getRemoteFeature',
				type:'post',
				async:'true',
				data:{
					id:id4
				},
				success:function(data){
					var data = data.data[0].remoteFeature
                    if(data.CENTRAL_LOCK==1){
						$('.Motorcyspanimg>img').eq(0).attr('src','img/MotorcycleType/xuanzhong.png')
					}else{
						$('.Motorcyspanimg>img').eq(0).attr('src','img/MotorcycleType/weixuanzhong.png')
					}
					if(data.ENGINE==1){
						$('.Motorcyspanimg>img').eq(1).attr('src','img/MotorcycleType/xuanzhong.png')
					}else{
						$('.Motorcyspanimg>img').eq(1).attr('src','img/MotorcycleType/weixuanzhong.png')
					}
					if(data.AC==1){
						$('.Motorcyspanimg>img').eq(2).attr('src','img/MotorcycleType/xuanzhong.png')
					}else{
						$('.Motorcyspanimg>img').eq(2).attr('src','img/MotorcycleType/weixuanzhong.png')
					}
					if(data.AC_PM==1){
						$('.Motorcyspanimg>img').eq(3).attr('src','img/MotorcycleType/xuanzhong.png')
					}else{
						$('.Motorcyspanimg>img').eq(3).attr('src','img/MotorcycleType/weixuanzhong.png')
					}
					if(data.AC_SEAT==1){
						$('.Motorcyspanimg>img').eq(4).attr('src','img/MotorcycleType/xuanzhong.png')
					}else{
						$('.Motorcyspanimg>img').eq(4).attr('src','img/MotorcycleType/weixuanzhong.png')
					}
					if(data.WINDOW_UP==1){
						$('.Motorcyspanimg>img').eq(5).attr('src','img/MotorcycleType/xuanzhong.png')
					}else{
						$('.Motorcyspanimg>img').eq(5).attr('src','img/MotorcycleType/weixuanzhong.png')
					}
					if(data.WINDOW_DOWN==1){
						$('.Motorcyspanimg>img').eq(6).attr('src','img/MotorcycleType/xuanzhong.png')
					}else{
						$('.Motorcyspanimg>img').eq(6).attr('src','img/MotorcycleType/weixuanzhong.png')
					}
					if(data.TRACKING==1){
						$('.Motorcyspanimg>img').eq(7).attr('src','img/MotorcycleType/xuanzhong.png')
					}else{
						$('.Motorcyspanimg>img').eq(7).attr('src','img/MotorcycleType/weixuanzhong.png')
					}
					if(data.TRUNK_OPEN==1){
						$('.Motorcyspanimg>img').eq(8).attr('src','img/MotorcycleType/xuanzhong.png')
					}else{
						$('.Motorcyspanimg>img').eq(8).attr('src','img/MotorcycleType/weixuanzhong.png')
					}
					if(data.TRUNK_CLOSE==1){
						$('.Motorcyspanimg>img').eq(9).attr('src','img/MotorcycleType/xuanzhong.png')
					}else{
						$('.Motorcyspanimg>img').eq(9).attr('src','img/MotorcycleType/weixuanzhong.png')
					}
					if(data.SUNROOF==1){
						$('.Motorcyspanimg>img').eq(10).attr('src','img/MotorcycleType/xuanzhong.png')
					}else{
						$('.Motorcyspanimg>img').eq(10).attr('src','img/MotorcycleType/weixuanzhong.png')
					}
				}
			})
        }else{
			$('.Motorcyclebottom-right-div').css('display','none')
            $('.Motorcyclebottom-right2').css('display','')
		}
	 }
	 //远程控制权限保存按钮
	 $('.Motorcyclebaocun').click(function(){
	 	for(var i=0;i<$('.Motorcyspanimg>img').length;i++){
	 		var src = $('.Motorcyspanimg>img').eq(i).attr('src');
	 		if(src=='img/MotorcycleType/xuanzhong.png'){
	 			$('.Motorcyspanimg>img').eq(i).attr('name','1')
	 		}else if(src=='img/MotorcycleType/weixuanzhong.png'){
	 			$('.Motorcyspanimg>img').eq(i).attr('name','0')
	 		}
	 	}
	 	var data = {
			id:id4,
	 		CENTRAL_LOCK:$('.Motorcyspanimg>img').eq(0).attr('name'),
	 		ENGINE:$('.Motorcyspanimg>img').eq(1).attr('name'),
	 		AC:$('.Motorcyspanimg>img').eq(2).attr('name'),
	 		AC_PM:$('.Motorcyspanimg>img').eq(3).attr('name'),
	 		AC_SEAT:$('.Motorcyspanimg>img').eq(4).attr('name'),
	 		WINDOW_UP:$('.Motorcyspanimg>img').eq(5).attr('name'),
	 		WINDOW_DOWN:$('.Motorcyspanimg>img').eq(6).attr('name'),
	 		TRACKING:$('.Motorcyspanimg>img').eq(7).attr('name'),
	 		TRUNK_OPEN:$('.Motorcyspanimg>img').eq(8).attr('name'),
	 		TRUNK_CLOSE:$('.Motorcyspanimg>img').eq(9).attr('name'),
	 		SUNROOF:$('.Motorcyspanimg>img').eq(10).attr('name')
	 	}
	 	$.ajax({
	 		type:"post",
	 		url:server_context+"/updateRemoteFeature",
	 		async:true,
	 		data:data,
	 		success:function(data){
	 			if(data.error_code==0){
	 				$.messager.alert("系统提示",'远程权限保存成功','info')
					Motorcycletree()
	 			}else{
					$.messager.alert("系统提示",'远程权限保存失败','error')
				 }
	 		}
	 	});
	 })
	
	$('.MotorcycleAdd').linkbutton({
		text: '添加车型',
		iconCls: 'icon-tianjiaa'
	})
	$('.MotorcycleMove').linkbutton({
		text: '删除车型',
		iconCls: 'icon-shanchu'
	})
	//点击添加车型按钮
	$('.MotorcycleAdd').click(function(){
		if(!id4){
			$.messager.alert("系统提示",'请选择车型组进行添加','warning');
			return false;
		}
		if(motorcycletypelevel==4){
            $.messager.alert("系统提示",'车型最多添加四级','warning');
			return false;
		}
		$('#MotorcycleModal').modal('show');
		if(motorcycletypelevel==0){
            $('#motorcycletype-type').text('品牌:')
			$('#motorcycletype-alias').css('display','none')
		}
		if(motorcycletypelevel==1){
            $('#motorcycletype-type').text('系列:')
			$('#motorcycletype-alias').css('display','')
		}
		if(motorcycletypelevel==2){
            $('#motorcycletype-type').text('排量:')
			$('#motorcycletype-alias').css('display','none')
		}
		if(motorcycletypelevel==3){
            $('#motorcycletype-type').text('配置:')
			$('#motorcycletype-alias').css('display','none')
		}
	})
	//点击删除车型按钮
	$('.MotorcycleMove').click(function(){
		if(!id4){
			$.messager.alert("系统提示",'请选择车型进行删除','warning');
			return;
		}
		$.messager.confirm('系统提示','你确认删除此车型吗?',function(r){
			if(r) {
				$.ajax({
					type: "post",
					url: server_context+"/removeVehicleModel",
					async: true,
					data: {
						vehicleModelId: id4
					},
					success: function(data) {
						if(data.error_code == 0) {
							$.messager.alert("系统提示", "删除成功",'info');
							$(".Motorcyclebottom-tree").tree('reload');
						} else {
							$.messager.alert("系统提示", "删除失败,或请先删除子车型",'error');
						}
					}
				})
			}
		})
	})
	//添加车型提交按钮
	$('.Motorcyclebutton').click(function(){
		var modelAli;
		if($('.Motorcycleinput').val()==''||$('.Motorcycleinput').val()==null||$('.Motorcycleinput').val()=='undefined'){
           $.messager.alert('系统提示','必填字段不能为空','warning')
		   return;
		}
		if(motorcycletypelevel==1){
            if($('.Motorcycleinput-alias').val()==''||$('.Motorcycleinput-alias').val()==null||$('.Motorcycleinput-alias').val()=='undefined'){
                $.messager.alert('系统提示','必填字段不能为空','warning')
		        return;
			}
			modelAli=$('.Motorcycleinput-alias').val()
		}else{
			modelAli=''
		}
		var data = {
			parentId:id4,
			topGroupId:motorcycletypeGroupId,
			level:motorcycletypelevel,
			vehicleModelName:$('.Motorcycleinput').val(),
			modelAlias:modelAli
		}
		$.ajax({
			type:"post",
			url:server_context+"/saveVehicleModel",
			async:true,
			data:data,
			success:function(data){
				if(data.error_code==0){
				    $.messager.alert("系统提示",'添加车型成功','info')
				    $('#MotorcycleModal').modal('hide');
                    $('.Motorcyclebottom-tree').tree('reload')
				}
				if(data.error_code==10008){
                    $.messager.alert("系统提示",'名称不能重复','info')
				}
			}
		});
	})
	//选中未选中的点击事件
	var img = document.querySelectorAll('.Motorcyspanimg>img');
	for(var i = 0;i<img.length;i++){
		img[i].index = i
		img[i].onclick = function(){
			var j = this.index;
			var src = $('.Motorcyspanimg>img').eq(j).attr('src');
			if(src=='img/MotorcycleType/xuanzhong.png'){
				$('.Motorcyspanimg>img').eq(j).attr('src','img/MotorcycleType/weixuanzhong.png')
			}else if(src=='img/MotorcycleType/weixuanzhong.png'){
	            $('.Motorcyspanimg>img').eq(j).attr('src','img/MotorcycleType/xuanzhong.png')
			}
		}
	}

// function conver(data) {
// 	function exists(data, parentId) {
// 		for(var i = 0; i < data.length; i++) {
// 			if(data[i].id == parentId) return true;
// 		}
// 		return false;
// 	}
// 	var nodes = [];
// 	// get the top level nodes
// 	for(var i = 0; i < data.length; i++) {
// 		var row = data[i];
// 		if(row.level==1){
//             if(!exists(data, row.parentId)) {
// 				nodes.push({
// 					id: row.id,
// 					text: row.name,
// 					parendId: row.parendId,
// 					type:row.type,
// 					actualId:row.actualId,
// 					checked:row.checked,
// 					iconCls:'icon-chexingone'
// 				});
// 			}
// 		}else if(row.level==2){
//             if(!exists(data, row.parentId)) {
// 				nodes.push({
// 					id: row.id,
// 					text: row.name,
// 					parendId: row.parendId,
// 					type:row.type,
// 					actualId:row.actualId,
// 					checked:row.checked,
// 					iconCls:'icon-chexingtwo'
// 				});
// 			}
// 		}else if(row.level==3){
//             if(!exists(data, row.parentId)) {
// 				nodes.push({
// 					id: row.id,
// 					text: row.name,
// 					parendId: row.parendId,
// 					type:row.type,
// 					actualId:row.actualId,
// 					checked:row.checked,
// 					iconCls:'icon-chexingthree'
// 				});
// 			}
// 		}else if(row.level==4){
//             if(!exists(data, row.parentId)) {
// 				nodes.push({
// 					id: row.id,
// 					text: row.name,
// 					parendId: row.parendId,
// 					type:row.type,
// 					actualId:row.actualId,
// 					checked:row.checked,
// 					iconCls:'icon-chexingfour'
// 				});
// 			}
// 		}
// 	}
// 	var toDo = [];
// 	for(var i = 0; i < nodes.length; i++) {
// 		toDo.push(nodes[i]);
// 	}
// 	while(toDo.length) {
// 		var node = toDo.shift(); // the parent node
// 		// get the children nodes
// 		for(var i = 0; i < data.length; i++) {
// 			var row = data[i];
// 			if(row.parentId == node.id) {
// 				if(row.level==1){
// 					var child = {
// 						id: row.id,
// 						text: row.name,
// 						parendId: row.parendId,
// 						type:row.type,
// 						actualId:row.actualId,
// 						checked:row.checked,
// 						iconCls:'icon-chexingone'
// 					};
// 				}else if(row.level==2){
//                     var child = {
// 						id: row.id,
// 						text: row.name,
// 						parendId: row.parendId,
// 						type:row.type,
// 						actualId:row.actualId,
// 						checked:row.checked,
// 						iconCls:'icon-chexingtwo'
// 					}
// 				}
// 				else if(row.level==3){
//                     var child = {
// 						id: row.id,
// 						text: row.name,
// 						parendId: row.parendId,
// 						type:row.type,
// 						actualId:row.actualId,
// 						checked:row.checked,
// 						iconCls:'icon-chexingthree'
// 					}
// 				}else if(row.level==4){
//                     var child = {
// 						id: row.id,
// 						text: row.name,
// 						parendId: row.parendId,
// 						type:row.type,
// 						actualId:row.actualId,
// 						checked:row.checked,
// 						iconCls:'icon-chexingfour'
// 					}
// 				}
// 				if(node.children) {
// 					node.children.push(child);
// 				} else {
// 					node.children = [child];
// 				}
// 				toDo.push(child);
// 			}
// 		}
// 	}
// 	return nodes;
// }