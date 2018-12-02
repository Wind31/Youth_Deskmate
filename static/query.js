var count = 0;

$(document).ready(function () {
    $('#zero').change(function () {
        var res = $(this).children('option:selected').val();
        var sex = $('#sex');
        var one = $('#one');
        var two = $('#two');
        var three = $('#three');
        var four = $('#four');
        if (res == "all") {
            sex.attr('disabled', 'true');
            one.attr('disabled', 'true');
            two.attr('disabled', 'true');
            three.attr('disabled', 'true');
            four.attr('disabled', 'true');
        }
        else {
            sex.removeAttr('disabled');
            one.removeAttr('disabled');
            two.removeAttr('disabled');
            three.removeAttr('disabled');
            four.removeAttr('disabled');
        }
    });
    $('#submit').click(function () {
        var zero = $('#zero').children('option:selected').val();
        var sex;
        var one;
        var two;
        var three;
        var four;
        if (zero == 'other') {
            sex = $('#sex').children('option:selected').val();
            one = $('#one').children('option:selected').val();
            two = $('#two').children('option:selected').val();
            three = $('#three').children('option:selected').val();
            four = $('#four').children('option:selected').val();
        }
        var submit_data =
        {
            'zero': zero,
            'sex': sex,
            'one': one,
            'two': two,
            'three': three,
            'four': four
        };
        $.ajax({
            url: "/update/",
            tradition: true,
            data: { 'data': JSON.stringify(submit_data) },
            type: 'GET',
            success: function (arg) {
                var dict = $.parseJSON(arg);
                alert_str = dict['alert_info'];
                alert(alert_str);
            }
        });
        return false;
    });
})
