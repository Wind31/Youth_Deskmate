var wait = setInterval(waiting, 500);
function waiting() {
    var temp = $('#dot').text();
    $('#dot').text(temp + '.')
    if ($('#dot').text() == '.......')
        $('#dot').text('.');
}

$(document).ready(function () {
    var object_id = $('#object_id').text();
    var sex = $('#sex').text();
    var score = parseInt($('#score').text());
    var submit_data = {
        'object_id': object_id,
        'sex': sex,
        'score': score
    };
    $.ajax({
        url: "/match/",
        tradition: true,
        data: { 'data': JSON.stringify(submit_data) },
        type: 'GET',
        success: function (arg) {
            var dict = $.parseJSON(arg);
            var res = dict['res'];
            if(res){
                var rate = dict['rate'];
                var name = dict['name'];
                var id = dict['id'];
                var sex = dict['sex'];
                var qq = dict['qq'];
                var txt1 = '<div>匹配成功！你的同桌是</div>';
                var txt = '<div>契合度：<span>' + rate + '</span></div>';
                var txt2 = '<div>姓名：<span>' + name + '</span></div>';
                var txt3 = '<div>学号：<span>' + id + '</span></div>';
                var txt4 = '<div>性别：<span>' + sex + '</span></div>';
                var txt5 = '<div>QQ或者微信号码：<span>' + qq + '</span></div>';
                var tips = '<div>请用微信扫描二维码加入有思同桌打卡群聊</div>'
                var img = '<img src="/static/sc.png">';
                $('#main').append(txt1,txt,txt2,txt3,txt4,txt5,tips,img);
            }
            else{
                var txt6 = '<div>匹配失败，暂时没有合适的人选，请等待后续匹配成功后，短信通知结果</div>';
                $('#main').append(txt6);
            }
            clearInterval(wait);
            $('#waiting').attr('hidden','true')
        }
    });
})
