$(function(){
    indexMenu();
    indexDissale();
})

//类目
function indexMenu(){
    $.ajax({
        url:'http://182.254.146.100:3000/api/getindexmenu',
        success:function(result){
            var html=template('indexMenuTpl',result);
            $('#menu .row').html(html);
        }
    })
}

//清单
function indexDissale(){
    $.ajax({
        url:'http://182.254.146.100:3000/api/getmoneyctrl',
        success:function(data){
            var html=template('indexDissaleTpl',{data:data.result});
            $('#dissale .dissaleList').html(html);
        }
    })
}

