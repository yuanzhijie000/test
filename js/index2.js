$(function(){
    leiTitle();
    leiTitleList();
})

function leiTitle(){
    $.ajax({
        url:'http://182.254.146.100:3000/api/getcategorytitle',
        success:function (data){
            var html=template('leiTitle',{data:data.result});
            $('#fenleiLi').html(html);
        }
    })
}


function leiTitleList(){
    $('#fenleiLi').on('click','.leiTitle',function(){
        $(this).next().toggle().siblings('.leiTitle-list').show();
        var tid=parseInt($(this).attr('titleId'));
        $.ajax({
            url:'http://182.254.146.100:3000/api/getcategory',
            data:{titleid:tid},
            success:function(data){
                var html=template('leiTitle-list',{data:data.result})
                $('.leiTitle-list'+tid).html(html);
            }
        })
    })
}