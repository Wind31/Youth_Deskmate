var reset = document.getElementById("reset");
var submit = document.getElementById("submit");

reset.onclick = function () {
    var res = confirm("确定清除所有已填信息吗");
    if (res)
        return true;
    else
        return false;
}
function validate_require(field, alerttxt) {
    if (field.value == null || field.value == "") {
        alert(alerttxt);
        return false;
    }
    else
        return true;
}


submit.onclick = function () {
    var form = document.getElementById("form");
    var pattern = /^[1][3-9]\d{9}$/;
    if (!validate_require(form.name, "你的姓名还没有填哦~")) {
        form.name.focus();
        return false;
    }
    if (!validate_require(form.id, "你的学号还没有填哦~")) {
        form.id.focus();
        return false;
    }
    if (!validate_require(form.phone, "你的手机号码还没有填哦~")) {
        form.phone.focus();
        return false;
    }
    if (!pattern.test(form.phone.value)) {
        alert("请确认你的手机号是否填写正确");
        form.phone.focus();
        return false;
    }
    var res = confirm("确认提交信息吗");
    if (res)
        return true;
    else
        return false;
}
