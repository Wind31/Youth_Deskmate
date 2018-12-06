$("body").on("click", "button.delete", aa);

function aa() {
    var name = $(this).attr("name");
    if (!confirm("确定要删除" + name + "吗？数据删除后不可找回"))
        return false;
    var that=$(this);
    var objectid = $(this).attr("id");
    var submit_data =
    {
        'objectid': objectid
    };
    $.ajax({
        url: "/innerdelete/",
        tradition: true,
        data: { 'data': JSON.stringify(submit_data) },
        type: 'GET',
        success: function (arg) {
            var res = $.parseJSON(arg);
            result = res['result'];
            message = res['message'];
            alert(message);
            if (result) {
                that.text("已删除");
                that.attr("disabled","true");
            }
        }
    });
};
// $("button.delete").click(function () {
//     var name = $(this).attr("name");
//     if (!confirm("确定要删除" + name + "吗？数据删除后不可找回"))
//         return false;
//     var objectid = $(this).attr("id");
//     var submit_data =
//     {
//         'objectid': objectid
//     };
//     $.ajax({
//         url: "/innerdelete/",
//         tradition: true,
//         data: { 'data': JSON.stringify(submit_data) },
//         type: 'GET',
//         success: function (arg) {
//             var res = $.parseJSON(arg);
//             result = res['result'];
//             message = res['message'];
//             alert(message);
//             if(result){
//                 $("tr."+objectid).remove()
//             }
//         }
//     });
// });
$("#next").click(function () {
    $("#last").removeAttr("disabled");
    $.ajax({
        url: "/next/",
        tradition: true,
        type: 'GET',
        success: function (arg) {
            var res = $.parseJSON(arg);
            succ = res['success'];
            if (!succ) {
                $("#next").attr("disabled", "true");
                return;
            }
            result = res['res'];
            $("#table").empty();
            var t0 = "<tr><th>#</th><th>姓名</th><th>学号</th><th>性别</th><th>手机号码</th><th>是否已匹配</th><th>匹配对象学号</th><th>匹配对象姓名</th><th>报名时间</th><th>操作</th></tr>"
            $("#table").append(t0);
            for (var i = 0; i < result.length; i++) {
                var t1 = "<tr>";
                var t2 = "<td>" + result[i]['no'] + "</td>";
                var t3 = "<td>" + result[i]['name'] + "</td>";
                var t4 = "<td>" + result[i]['id'] + "</td>";
                var t5 = "<td>" + result[i]['sex'] + "</td>";
                var t6 = "<td>" + result[i]['phone'] + "</td>";
                var t7 = "<td>" + result[i]['match'] + "</td>";
                var t8 = "<td>" + result[i]['matchid'] + "</td>";
                var t9 = "<td>" + result[i]['matchname'] + "</td>";
                var t10 = "<td>" + result[i]['time'] + "</td>";
                var t11 = "<td><button class='btn btn-danger delete' id='" + result[i]['objectid'] + "' name='" + result[i]['name'] + "'>删除并重置其匹配对象</button></td>";
                var t12 = "</tr>";
                $("#table").append(t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12);
            }
        }
    });
})

$("#last").click(function () {
    $("#next").removeAttr("disabled");
    $.ajax({
        url: "/last/",
        tradition: true,
        type: 'GET',
        success: function (arg) {
            var res = $.parseJSON(arg);
            succ = res['success'];
            if (!succ) {
                $("#last").attr("disabled", "true");
                return;
            }
            result = res['res'];
            $("#table").empty();
            var t0 = "<tr><th>#</th><th>姓名</th><th>学号</th><th>性别</th><th>手机号码</th><th>是否已匹配</th><th>匹配对象学号</th><th>匹配对象姓名</th><th>报名时间</th><th>操作</th></tr>"
            $("#table").append(t0);
            for (var i = 0; i < result.length; i++) {
                var t1 = "<tr>";
                var t2 = "<td>" + result[i]['no'] + "</td>";
                var t3 = "<td>" + result[i]['name'] + "</td>";
                var t4 = "<td>" + result[i]['id'] + "</td>";
                var t5 = "<td>" + result[i]['sex'] + "</td>";
                var t6 = "<td>" + result[i]['phone'] + "</td>";
                var t7 = "<td>" + result[i]['match'] + "</td>";
                var t8 = "<td>" + result[i]['matchid'] + "</td>";
                var t9 = "<td>" + result[i]['matchname'] + "</td>";
                var t10 = "<td>" + result[i]['time'] + "</td>";
                var t11 = "<td><button class='btn btn-danger delete' id='" + result[i]['objectid'] + "' name='" + result[i]['name'] + "'>删除并重置其匹配对象</button></td>";
                var t12 = "</tr>";
                $("#table").append(t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12);
            }
        }
    });
})


