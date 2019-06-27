window.onload=function(){
	var content=document.getElementById('content');
	var arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10' ,'11', '12', 
	'13', '14', '15', '16' ,'17','18', '19', '20', '21', '22', '23', '24' ,'25','26', '27', '28', '29', '30'
	,'31','32', '33', '34', '35', '36', '37', '38', '39'];
	var data=['580', '580', '580', '580', '580', '580', '580', '580', '580', '580' ,'580', '580', 
	'580', '580', '580', '580' ,'580','580', '580', '580', '580', '580', '580', '580' ,'580','580', '580', '580', '580', '580'
	,'580','580', '580', '580', '580', '580', '580', '580', '580'];

	var dataArr = [
		// {
		// 	num: '01',
		// 	voteNum: 580
		// }
	];
	//投票验证人数和投票人数数组
    var arr2=['600','599'];
    var title2=document.getElementById('title2');
   
    title2.innerHTML='投票验证人数:'+arr2[0]+' '+' '+'投票人数:'+arr2[1];


//插入节点
	function initDataArr () {
		for(var j = 1; j < 40; j++) {
			dataArr.push({
				num: j,
				voteNum: 0
			})
		}
	}

	initDataArr()
	
	var classArr = ['red', 'blue'];
	var htmlTemp= '';
	
	for(var i = 0; i <dataArr.length; i++) {
    	// htmlTemp +='<div id="candidate_modle" class="ca580ndidate">' + i < 10 ? ('0' + i) : i + '</br>'+	 arr[i] + '</div>'
    	var num = dataArr[i].num < 10 ? '0' + dataArr[i].num : dataArr[i].num
		htmlTemp += '<div  class="group">'
		+ '<div class="data ">'+'<div class="showdata ' + classArr[i%2] +'" id=' + i +'></div>'+'</div>'  
		+ '<div class="circle ' + classArr[i%2] + '">'+ num +'</div>' 
        + '<span>' + dataArr[i].voteNum + '</span>'
   + '</div>'
	}
    content.innerHTML = htmlTemp;




//模拟后台数据
function genderate() {
		for(var j = 0; j < 39; j++) {
			dataArr.push({
				num: j,
				voteNum: Math.floor(Math.random() *1000 )   
			})
		}
	}

	function genderateUp(dataArr){
		for(var j = 0; j < 39; j++) {
			//debugger
			dataArr[j].voteNum  = dataArr[j].voteNum + 1
		}
	}

//实时刷新
function update() {
        $.ajax({
            type: "post",
            async: true,
            dataType: "json", //返回数据形式为json
            url: "#",
            data: {

                //rnd: Math.random()
            },
            success: function (data) {
                dataArr = data
            }

        });
    }
    setInterval(function(){
    	console.log(dataArr)
    	//dataArr = [];
    	//模拟数据
    	  genderateUp(dataArr)
    	 renderShowDataHeight(dataArr)

    	// update()
    }, 100);   //刷新时间间隔


//设置高度

var showDataArr = []

for(var j = 0; j < dataArr.length; j++) {
	showDataArr.push(document.getElementById(j))
}

function renderShowDataHeight(dataArr) {
	var max = 0
	for(var j = 0; j < dataArr.length; j++) {
		if (max < dataArr[j].voteNum) {
			max = dataArr[j].voteNum
		}
	}
	for(var j = 0; j < dataArr.length; j++) {
        //计算高度
		var height = dataArr[j].voteNum / 600 * 11
		showDataArr[j].style.height = height + 'rem';

		if (showDataArr[j].parentNode) {
			showDataArr[j].parentNode.parentNode.lastChild.innerHTML = dataArr[j].voteNum
		} else {
			showDataArr[j].parentElement.parentElement.lastChild.innerHTML = dataArr[j].voteNum
		}
	}
}

  


  
}