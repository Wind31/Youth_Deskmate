var resultList = [];
var c = -1;
$("body").on("click", "button.delete", aa);
function aa() {
    var name = $(this).attr("name");
    if (!confirm("确定要删除" + name + "吗？数据删除后不可找回"))
        return false;
    var that = $(this);
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
                that.attr("disabled", "true");
            }
        }
    });
};
$("#next").click(function () {
    $("#last").removeAttr("disabled");
    $("#table").attr("hidden", "true");
    if (c < resultList.length - 1) {
        c = c + 1;
        $("#table2").empty();
        var t0 = "<tr><th>#</th><th>姓名</th><th>学号</th><th>性别</th><th>手机号码</th><th>是否已匹配</th><th>匹配对象学号</th><th>匹配对象姓名</th><th>报名时间</th><th>操作</th></tr>"
        $("#table2").append(t0);
        for (var i = 0; i < resultList[c].length; i++) {
            var t1 = "<tr>";
            var t2 = "<td>" + resultList[c][i]['no'] + "</td>";
            var t3 = "<td>" + resultList[c][i]['name'] + "</td>";
            var t4 = "<td>" + resultList[c][i]['id'] + "</td>";
            var t5 = "<td>" + resultList[c][i]['sex'] + "</td>";
            var t6 = "<td>" + resultList[c][i]['phone'] + "</td>";
            var t7 = "<td>" + resultList[c][i]['match'] + "</td>";
            var t8 = "<td>" + resultList[c][i]['matchid'] + "</td>";
            var t9 = "<td>" + resultList[c][i]['matchname'] + "</td>";
            var t10 = "<td>" + resultList[c][i]['time'] + "</td>";
            var t11 = "<td><button class='btn btn-danger delete' id='" + resultList[c][i]['objectid'] + "' name='" + resultList[c][i]['name'] + "'>删除并重置其匹配对象</button></td>";
            var t12 = "</tr>";
            $("#table2").append(t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12);
        }
    }
    else {
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
                resultList.push(result);
                c = c + 1;
                $("#table2").empty();
                var t0 = "<tr><th>#</th><th>姓名</th><th>学号</th><th>性别</th><th>手机号码</th><th>是否已匹配</th><th>匹配对象学号</th><th>匹配对象姓名</th><th>报名时间</th><th>操作</th></tr>"
                $("#table2").append(t0);
                for (var i = 0; i < resultList[c].length; i++) {
                    var t1 = "<tr>";
                    var t2 = "<td>" + resultList[c][i]['no'] + "</td>";
                    var t3 = "<td>" + resultList[c][i]['name'] + "</td>";
                    var t4 = "<td>" + resultList[c][i]['id'] + "</td>";
                    var t5 = "<td>" + resultList[c][i]['sex'] + "</td>";
                    var t6 = "<td>" + resultList[c][i]['phone'] + "</td>";
                    var t7 = "<td>" + resultList[c][i]['match'] + "</td>";
                    var t8 = "<td>" + resultList[c][i]['matchid'] + "</td>";
                    var t9 = "<td>" + resultList[c][i]['matchname'] + "</td>";
                    var t10 = "<td>" + resultList[c][i]['time'] + "</td>";
                    var t11 = "<td><button class='btn btn-danger delete' id='" + resultList[c][i]['objectid'] + "' name='" + resultList[c][i]['name'] + "'>删除并重置其匹配对象</button></td>";
                    var t12 = "</tr>";
                    $("#table2").append(t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12);
                }
            }
        });
    }
})

$("#last").click(function () {
    $("#next").removeAttr("disabled");
    if (c > 0) {
        c = c - 1;
        $("#table2").empty();
        var t0 = "<tr><th>#</th><th>姓名</th><th>学号</th><th>性别</th><th>手机号码</th><th>是否已匹配</th><th>匹配对象学号</th><th>匹配对象姓名</th><th>报名时间</th><th>操作</th></tr>"
        $("#table2").append(t0);
        for (var i = 0; i < resultList[c].length; i++) {
            var t1 = "<tr>";
            var t2 = "<td>" + resultList[c][i]['no'] + "</td>";
            var t3 = "<td>" + resultList[c][i]['name'] + "</td>";
            var t4 = "<td>" + resultList[c][i]['id'] + "</td>";
            var t5 = "<td>" + resultList[c][i]['sex'] + "</td>";
            var t6 = "<td>" + resultList[c][i]['phone'] + "</td>";
            var t7 = "<td>" + resultList[c][i]['match'] + "</td>";
            var t8 = "<td>" + resultList[c][i]['matchid'] + "</td>";
            var t9 = "<td>" + resultList[c][i]['matchname'] + "</td>";
            var t10 = "<td>" + resultList[c][i]['time'] + "</td>";
            var t11 = "<td><button class='btn btn-danger delete' id='" + resultList[c][i]['objectid'] + "' name='" + resultList[c][i]['name'] + "'>删除并重置其匹配对象</button></td>";
            var t12 = "</tr>";
            $("#table2").append(t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12);
        }
    }
    else {
        $("#table2").empty();
        $("#table").removeAttr("hidden");
        $("#last").attr("disabled", "true");
        c = -1;
        // $.ajax({
        //     url: "/last/",
        //     tradition: true,
        //     type: 'GET',
        //     success: function (arg) {
        //         var res = $.parseJSON(arg);
        //         succ = res['success'];
        //         if (!succ) {
        //             $("#last").attr("disabled", "true");
        //             return;
        //         }
        //         result = res['res'];
        //         $("#table").empty();
        //         var t0 = "<tr><th>#</th><th>姓名</th><th>学号</th><th>性别</th><th>手机号码</th><th>是否已匹配</th><th>匹配对象学号</th><th>匹配对象姓名</th><th>报名时间</th><th>操作</th></tr>"
        //         $("#table").append(t0);
        //         for (var i = 0; i < result.length; i++) {
        //             var t1 = "<tr>";
        //             var t2 = "<td>" + result[i]['no'] + "</td>";
        //             var t3 = "<td>" + result[i]['name'] + "</td>";
        //             var t4 = "<td>" + result[i]['id'] + "</td>";
        //             var t5 = "<td>" + result[i]['sex'] + "</td>";
        //             var t6 = "<td>" + result[i]['phone'] + "</td>";
        //             var t7 = "<td>" + result[i]['match'] + "</td>";
        //             var t8 = "<td>" + result[i]['matchid'] + "</td>";
        //             var t9 = "<td>" + result[i]['matchname'] + "</td>";
        //             var t10 = "<td>" + result[i]['time'] + "</td>";
        //             var t11 = "<td><button class='btn btn-danger delete' id='" + result[i]['objectid'] + "' name='" + result[i]['name'] + "'>删除并重置其匹配对象</button></td>";
        //             var t12 = "</tr>";
        //             $("#table").append(t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12);
        //         }
        //     }
        // });
    }
})

$("#byname").click(function () {
    var data = $("#name").val();
    if (data == "")
        return false;
    var submit_data =
    {
        'type':1,
        'name': data
    };
    $.ajax({
        url: "/specificquery/",
        tradition: true,
        data: { 'data': JSON.stringify(submit_data) },
        type: 'GET',
        success: function (arg) {
            var res = $.parseJSON(arg);
            success = res['success'];
            result = res['result'];
            if (success) {
                $("#table3").empty();
                var t0 = "<tr><th>#</th><th>姓名</th><th>学号</th><th>性别</th><th>手机号码</th><th>是否已匹配</th><th>匹配对象学号</th><th>匹配对象姓名</th><th>报名时间</th><th>操作</th></tr>"
                $("#table3").append(t0);
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
                    $("#table3").append(t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12);
                }
            }
            else{
                alert("没有查询到数据，请确认是否输入正确");
            }
        }
    });
})

$("#byid").click(function () {
    var data = $("#id").val();
    if (data == "")
        return false;
    var submit_data =
    {
        'type':2,
        'id': data
    };
    $.ajax({
        url: "/specificquery/",
        tradition: true,
        data: { 'data': JSON.stringify(submit_data) },
        type: 'GET',
        success: function (arg) {
            var res = $.parseJSON(arg);
            success = res['success'];
            result = res['result'];
            if (success) {
                $("#table3").empty();
                var t0 = "<tr><th>#</th><th>姓名</th><th>学号</th><th>性别</th><th>手机号码</th><th>是否已匹配</th><th>匹配对象学号</th><th>匹配对象姓名</th><th>报名时间</th><th>操作</th></tr>"
                $("#table3").append(t0);
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
                    $("#table3").append(t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12);
                }
            }
            else{
                alert("没有查询到数据，请确认是否输入正确");
            }
        }
    });
})