$(function(){
    //获取地址参数
    var arr=getRequest();
    var plistTitle=arr.category;
    $('#nav span').html(plistTitle);


    var pageid=3;
    var totalSize=100;
    //渲染分离内容页面
    var plistTitleid=arr.categoryid;

    productContent(plistTitleid,pageid);


});



//获取地址参数
function getRequest() {
    var url = window.location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            //就是这句的问题
            theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
            //之前用了unescape()
            //才会出现乱码
        }
    }
    return theRequest;
}


//渲染分类内容页面
function productContent(plistTitleid,pageid,totalSize){
    $.ajax({
        url:'http://182.254.146.100:3000/api/getproductlist',
        data:{
            "categoryid":plistTitleid,
            "pageid":pageid
        },
        success:function(data){
            //渲染页面内容
            var html=template('productContents',{data:data.result});
            $('#productContent').html(html);
            totalSize=Math.ceil(data.totalCount/data.pagesize);

            //渲染页码
            var str="";
            for (var i=1; i<=totalSize; i++){
                str+='<option value="+i+">'+i+'</option>';
            }
            $('#productlistSelect').html(str);

            //页码默认选中
            $('#productlistSelect option').each(function(i,item){
                if ((i+1)===pageid){
                    $(item).attr('selected',true);
                }
            })
        },
        //上下页功能
        complete:function(){
            $('#btnPre').unbind('click').on('click',function(){
                if (pageid===1){
                    return false;
                }else {
                    pageid--;
                    productContent(plistTitleid,pageid);
                }
            });
            $('#btnNext').unbind('click').on('click',function(){
                if (pageid===totalSize){
                    return false;
                }else {
                    pageid++;
                    productContent(plistTitleid,pageid);
                }
            });
        }
    })
};
