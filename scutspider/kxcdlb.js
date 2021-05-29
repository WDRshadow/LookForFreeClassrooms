jQuery(function ($) {

    function getModel() {
        var colModel = [
            {label: '场地学期信息ID', name: 'cdxqxx_id', index: 'cdxqxx_id', hidden: true, key: true, align: 'center'},
            {label: '场地ID', name: 'cd_id', index: 'cd_id', hidden: true},
            {label: $.i18n.get("cdbh")/*'场地编号'*/, name: 'cdbh', index: 'cdbh', align: 'center', width: '120'},
            {label: $.i18n.get("cdmc")/*'场地名称'*/, name: 'cdmc', index: 'cdmc', align: 'left', width: '180'},
            {label: $.i18n.get("xqu")/*'校区'*/, name: 'xqmc', index: 'xqmc', align: 'left', width: '120'},
            {label: $.i18n.get("cdlb")/*'场地类别'*/, name: 'cdlbmc', index: 'cdlb_id', align: 'center', width: '180'}];
        if ("1" == pkzwskg) {
            colModel.push({
                    label: $.i18n.get("zws")/*'座位数'*/,
                    name: 'sjzws',
                    index: 'sjzws',
                    align: 'center',
                    width: '100'
                },
                {label: $.i18n.get("pkzws")/*'排课座位数'*/, name: 'zws', index: 'zws', align: 'center', width: '100'});
        } else {
            colModel.push({
                label: $.i18n.get("zws")/*'座位数'*/,
                name: 'zws',
                index: 'zws',
                align: 'center',
                width: '100'
            });
        }
        colModel.push({
                label: $.i18n.get("kszws")/*'考试座位数'*/,
                name: 'kszws1',
                index: 'kszws1',
                align: 'center',
                width: '100'
            },
            {
                label: $.i18n.get("table")/*'桌椅'*/,
                name: 'zysx',
                index: 'zysx',
                align: 'left',
                width: '100',
                hidden: (xxdm != '10248')
            },
            {
                label: $.i18n.get("sflb")/*'是否录播'*/,
                name: 'sflb',
                index: 'sflb',
                align: 'center',
                width: '100',
                hidden: (xxdm != '10248')
            },
            {
                label: $.i18n.get("hbsl")/*'黑板数量'*/,
                name: 'hbsl',
                index: 'hbsl',
                align: 'center',
                width: '100',
                hidden: (xxdm != '10248')
            },
            {
                label: $.i18n.get("bbsl")/*'白板数量'*/,
                name: 'bbsl',
                index: 'bbsl',
                align: 'center',
                width: '100',
                hidden: (xxdm != '10248')
            },
            {
                label: $.i18n.get("sfyzz")/*'是否有桌子'*/,
                name: 'sfyzz',
                index: 'sfyzz',
                align: 'center',
                width: '100',
                hidden: (xxdm != '10248')
            },
            {
                label: $.i18n.get("sfjtjs")/*'是否阶梯教室'*/,
                name: 'sfjtjs',
                index: 'sfjtjs',
                align: 'center',
                width: '100',
                hidden: (xxdm != '10248')
            },
            {
                label: $.i18n.get("tjsl")/*'台阶数量'*/,
                name: 'tjsl',
                index: 'tjsl',
                align: 'center',
                width: '100',
                hidden: (xxdm != '10248')
            },
            {
                label: $.i18n.get("tymbsl")/*'投影幕布数量'*/,
                name: 'tymbsl',
                index: 'tymbsl',
                align: 'center',
                width: '100',
                hidden: (xxdm != '10248')
            },
            {
                label: $.i18n.get("yczb")/*'远程直播/收看'*/,
                name: 'yczb',
                index: 'yczb',
                align: 'center',
                width: '100',
                hidden: (xxdm != '10248')
            },
            {label: $.i18n.get("lh")/*'楼号'*/, name: 'jxlmc', index: 'jxlmc', align: 'center', width: '100'},
            {label: $.i18n.get("lch")/*'楼层号'*/, name: 'lch', index: 'lch', align: 'center', width: '100'},
            {label: $.i18n.get("cdjylx")/*'场地借用类型'*/, name: 'cdjylx', index: 'cdjylx', align: 'left', width: '180px'},
            {label: $.i18n.get("cdbzxx")/*'场地备注信息'*/, name: 'bz', index: 'bz', align: 'center', width: '100'},
            {label: $.i18n.get("sybm")/*'使用部门'*/, name: 'sydxmc', index: 'sydxmc', align: 'left', width: '80px'},
            {label: $.i18n.get("sybj")/*'使用班级'*/, name: 'sybj', index: 'sybj', align: 'left', width: '80px'},
            {
                label: $.i18n.get("cdejlb")/*'场地二级类别'*/,
                name: 'cdejlbmc',
                index: 'cdejlbmc',
                align: 'center',
                width: '180'
            },
            {label: $.i18n.get("jzmj")/*'建筑面积'*/, name: 'jzmj', index: 'jzmj', align: 'center', width: '100'},
            {label: $.i18n.get("tgbm")/*'托管部门'*/, name: 'jgmc', index: 'jgmc', align: 'left', width: '100px'});

        return colModel;
    }

    initFile();
    $("#yyForm").validateForm();
    $("#lh_chosen").css("z-index", "1010");
    var TempGrid = $.extend({}, BaseJqGrid, {
        //caption : "空闲场地信息列表",
        pager: "pager", //分页工具栏
        resizeHandle: "#searchForm1",
        autowidth: true,
        shrinkToFit: false,
        rowNum: 15, // 每页显示记录数
        rowList: [15, 20, 30, 50, 100], // 可调整每页显示的记录数
        url: _path + '/cdjy/cdjy_cxKxcdlb.html?doType=query', //这是Action的请求地址
        colModel: getModel(),
        sortname: 'cdbh', //首次加载要进行排序的字段
        sortorder: 'asc',
        /*触发全选中事件*/
        onSelectAll: function (aRowids, status) {
            jQuery.each(aRowids, function (index, rowid) {
                selectEvent(rowid, status);
            });
            refreshFun();
        },
        /*触发选中事件*/
        onSelectRow: function (rowid, status) {
            selectEvent(rowid, status);
            refreshFun();
        },
        /*加载完成后的回调函数*/
        gridComplete: function () {
            jQuery("li", "#yxcd_ul").each(function (index, domEle) {
                var rowid = jQuery(domEle).attr("name");
                jQuery("#tabGrid").setSelection(rowid, false);
            });
            jQuery("#tabGrid").data("cdjylx", $("#cdjylx").val());
        }
    });
    loadJqGrid("#tabGrid", "#pager", TempGrid);

    //学年学期select框的change事件
    $("#dm_cx").change(function () {
        var array = $("#dm_cx option:selected").val().split("-");
        $("#xnm").val(array[0]);
        $("#xqm").val(array[1]);
        $.ajax({
            url: _path + '/cdjy/cdjy_cxQtlb.html',//重新查询其它查询列表
            data: {"xnm": array[0], "xqm": array[1]},
            async: false,
            type: "post",
            datatype: "json",
            success: function (data) {
                $("#qkyx").click();
                if (typeof data == 'object') {
                    zxrq = data.dqzcxq.ZXRQ;
                    zdrq = data.dqzcxq.ZDRQ;
                    dqzc = data.dqzcxq.DQZC;
                    zqst = data.dqzcxq.ZQST;
                    dqxq = data.dqzcxq.DQXQ;
                    zdkxzc = data.dqzcxq.ZDKXZC;
                    zdkxxq = data.dqzcxq.ZDKXXQ;
                    if ($.founded(data.nxqzcList)) {
                        //加载周次
                        var nxqzcList = data.nxqzcList;
                        str = '<tr><th width="40" rowspan="2">' + $.i18n.get("zcd") + '</th>';
                        $.each(nxqzcList, function (i, model) {
                            if ("0".equals(model.zczt)) {
                                str += '<th width="30" class="displaynone" value="' + model.dxqzc + '">' + model.zc + '</th>';
                            } else {
                                str += '<th width="30" class="selectTH" value="' + model.dxqzc + '">' + model.zc + '</th>';
                            }
                            if ((i + 1) == (nxqzcList.length + 1) / 2 || (i + 1) == nxqzcList.length / 2) {
                                str += '<th width="40" rowspan="2"><button type="button" id="qc_zc" class="btn btn-default btn-xs">' + $.i18n.get("qk") + '</button></th>' + '</tr><tr>';
                            }
                        });
                        str += '</tr>';
                        $("#selectTR_ZC").empty().html(str);
                        //加载星期
                        $("#selectTR_XQJ tr th:gt(0)").remove();
                        var xqjArr = [1, 2, 3, 4, 5, 6, 7];
                        if (zqst == "7") {
                            xqjArr = [7, 1, 2, 3, 4, 5, 6];
                        }
                        str = "";
                        $.each(xqjArr, function (i, xqj) {
                            str += '<th width="30" class="selectTH" value="' + xqj + '">' + xqj + '</th>';
                        });
                        str += '<th width="40"><button type="button" id="qc_xq" class="btn btn-default btn-xs">' + $.i18n.get("qk") + '</button></th>';
                        $("#selectTR_XQJ tr").append(str);
                        loadZcxq();
                        hqjcList();
                        changeSjfw();
                    }
                } else if (typeof data == 'string') {
                    $.alert(data);
                } else {
                    $.alert($.i18n.get("error"));
                    /*$.alert("程序运行出错！");*/
                }
            }
        });
    });
    loadZcxq();
    hqjcList();
    changeSjfw();


    //导出功能
    $("#btn_dc").click(function () {
        var map = {};
        var zcList = [];
        var xqList = [];
        var jcList = [];
        map["fwzt"] = jQuery('#fwzt').val();
        map["xqh_id"] = jQuery('#xqh_id').val();
        map["xnm"] = jQuery('#xnm').val();
        map["xqm"] = jQuery('#xqm').val();
        map["cdlb_id"] = jQuery('#cdlb_id').val();
        map["cdejlb_id"] = jQuery('#cdejlb_id').val();
        map["qszws"] = jQuery('#qszws').val();
        map["jszws"] = jQuery('#jszws').val();
        map["cdmc"] = jQuery('#cdmc').val();
        map["lh"] = jQuery('#lh').val();
        map["jyfs"] = ($("#cdyyfsTab").size() == 0 || $("#azcjy_li").hasClass("active")) ? "0" : $("input[name=jyfs]:checked").val();
        map["cdjylx"] = jQuery("#cdjylx").val();
//		map["zysx"] = jQuery("#zysx_1").val();
//		map["sflb"] = jQuery("#sflb_1").val();
//		map["hbsl"] = jQuery("#hbsl_1").val();
//		map["bbsl"] = jQuery("#bbsl_1").val();
//		map["sfyzz"] = jQuery("#sfyzz_1").val(); 
//		map["sfjtjs"] = jQuery("#sfjtjs_1").val();
//		map["tjsl"] = jQuery("#tjsl_1").val();
//		map["tymbsl"] = jQuery("#tymbsl_1").val();
//		map["yczb"] = jQuery("#yczb_1").val();
//		map["zws"] = jQuery("#zws_1").val();
//		map["kszws1"] = jQuery("#kszws1_1").val();

        if (map["jyfs"] == 0) {
            //获取选择的周次
            var zcd = 0;
            $("#selectTR_ZC .selectTH").each(function () {
                if ($(this).hasClass("ui-selected")) {//判断有无此样式
                    zcd += Math.pow(2, $(this).attr("value") - 1);
                }
            });
            map["zcd"] = zcd;
            $("#selectTR_ZC .ui-selected").each(function (i, dom) {
                zcList.push($(dom).attr("value"));

            });
            //获取选择的星期
            $("#selectTR_XQJ .ui-selected").each(function (i, dom) {
                xqList.push($(dom).attr("value"));

            });
            map["xqj"] = xqList.join(",");
            //获取选择的节次
            var jcd = 0;
            $("#selectTR_JC .selectTH").each(function () {
                if ($(this).hasClass("ui-selected")) {//判断有无此样式
                    jcd += Math.pow(2, $(this).attr("value") - 1);
                }
            });
            map["jcd"] = jcd;

            $("#selectTR_JC .ui-selected").each(function (i, dom) {
                jcList.push($(dom).attr("value"));

            });
        } else if (map["jyfs"] == 1) {
            map["qssj"] = jQuery('#qssj').val().split(' ')[0];
            map["jssj"] = jQuery('#jssj').val().split(' ')[0];
            map["qssd"] = jQuery('#qssj').val().split(' ')[1];
            map["jssd"] = jQuery('#jssj').val().split(' ')[1];
        } else if (map["jyfs"] == 3) {
            map["qssd"] = jQuery('#qssd').val();
            map["jssd"] = jQuery('#jssd').val();
            map["qssj"] = jQuery('#sjfw').val().split(' - ')[0];
            map["jssj"] = jQuery('#sjfw').val().split(' - ')[1];
        } else {
            return false;
        }
        //更新右侧浮层数据
        if (map["jyfs"] == 0) {
            //按周次借用赋值
            $("#jysj_fc").closest("div.panel-footer").hide();
            $("#jyzc_fc").closest("div.panel-footer").show();
            if (localeKey == 'zh_CN') {
                $("#jyzc_fc").empty().html("第 " + zcList.join(",") + " 周");
                $("#jyxq_fc").empty().html(xqList.join(","));
                $("#jyjc_fc").empty().html("第 " + jcList.join(",") + " 节");
            } else {
                $("#jyzc_fc").empty().html(zcList.join(","));
                $("#jyxq_fc").empty().html(xqList.join(","));
                $("#jyjc_fc").empty().html(jcList.join(","));
            }
        } else {
            //按日期借用赋值
            $("#jysj_fc").closest("div.panel-footer").show();
            $("#jyzc_fc").closest("div.panel-footer").hide();
            if (map["jyfs"] == 1) {
                $("#jysj_fc").empty().html(map["qssj"] + " " + map["qssd"] + " ~ " + map["jssj"] + " " + map["jssd"]);
            } else if (map["jyfs"] == 3) {
                $("#jysj_fc").empty().html(map["qssj"] + " - " + map["jssj"] + " (" + map["qssd"] + " - " + map["jssd"] + ")");
            }
        }
        //更新(预约时)需要隐藏提交的数据
        $("#jyfs_fc").val(map["jyfs"]);
        $("#qssj_fc").val(map["qssj"]);
        $("#jssj_fc").val(map["jssj"]);
        $("#qssd_fc").val(map["qssd"]);
        $("#jssd_fc").val(map["jssd"]);
        $("#zcd_fc").val(map["zcd"]);
        $("#xqj_fc").val(map["xqj"]);
        $("#jcd_fc").val(map["jcd"]);
        $("#xqh_id_fc").val(map["xqh_id"]);
        $("#xnm_fc").val(map["xnm"]);
        $("#xqm_fc").val(map["xqm"]);
        $.exportDialog(_path + '/cdjy/cdjy_dcKxcdlb.html', "JW_N2155_CXKXJS", map, TempGrid.colModel, '#tabGrid');
    });
});

//选择场地事件
function selectEvent(rowid, status) {
    var array = $("#dm_cx option:selected").val().split("-");
    $("#xnm").val(array[0]);
    $("#xqm").val(array[1]);
    $.ajax({
        url: _path + '/cdjy/cdjy_cxSfkfyuy.html',//重新查询其它查询列表
        data: {"xnm": array[0], "xqm": array[1]},
        async: false,
        type: "post",
        datatype: "json",
        success: function (data) {
            if ("1".equals(data)) {
                var rowObj = jQuery("#tabGrid").jqGrid('getRowData', rowid);
                //如果选中
                if (status == true) {
                    if ($("li[name='" + rowid + "']", "#yxcd_ul").length == 0) {
                        var html = [];
                        html.push('<li class="list-group-item" name="' + rowid + '" cd_id="' + rowObj["cd_id"] + '" zws="' + rowObj["zws"]
                            + '" kszws1="' + rowObj["kszws1"] + '"' + (1 == pkzwskg ? ' sjzws="' + rowObj["sjzws"] + '"' : '') + '><div>');
                        html.push('<p class="cdmc">' + ($.founded(rowObj["cdmc"]) ? rowObj["cdmc"] : "&nbsp;") + '</p>');
                        if ("1" == pkzwskg) {
                            html.push('<p class="sjzws">' + ($.founded(rowObj["sjzws"]) ? rowObj["sjzws"] : "&nbsp;") + '</p>');
                            html.push('<p class="zws">' + ($.founded(rowObj["zws"]) ? rowObj["zws"] : "&nbsp;") + '</p>');
                        } else {
                            html.push('<p class="zws">' + ($.founded(rowObj["zws"]) ? rowObj["zws"] : "&nbsp;") + '</p>');
                        }
                        html.push('<p class="zws">' + ($.founded(rowObj["kszws1"]) ? rowObj["kszws1"] : "&nbsp;") + '</p>');
                        html.push('<p class="jzmj">' + ($.founded(rowObj["jzmj"]) ? rowObj["jzmj"] : "&nbsp;") + '</p>');
                        html.push('<p class="cdlbmc">' + ($.founded(rowObj["cdlbmc"]) ? rowObj["cdlbmc"] : "&nbsp;") + '</p>');
                        html.push('<p class="sjzws" style="float:right;"><button type="button" class="btn btn-danger btn-sm">' + $.i18n.get("sc") + '</button></p>');
                        /*html.push('<p class="sjzws" style="float:right;"><button type="button" class="btn btn-danger btn-sm">删除</button></p>');*/
                        html.push('</div></li>');
                        $("#yxcd_ul").append(html.join(""));
                    }
                } else {
                    $("#yxcd_ul").eq(0).find("li[name='" + rowid + "']").remove();
                }
            }
        }
    });
    var sels = $('#yxcd_ul').children('li').length;
    if (sels >= 1 && $(".outer").css("width") == "40px") {//打开右侧场地信息（第一次选中）
        $(".outer_left").click();
    }
    if (sels == 0 && $(".outer").css("width") != "40px") {//关闭右侧场地信息（没有选中的记录）
        $(".outer_left").click();
    }
};
//默认使用人为申请人
if ("xs".equals(jsdm)) {
    $("#syrxh_id").val($("#syr").val());
    $("#xsxm").val($("#syrxm").val());
    if ($("input:radio[name='xzfs']:checked").val() == 0) {
        $("#syrxh_id").val('');
        $("#xsxm").val('').focus();
    }
} else {
    $("#syr_id").val($("#syr").val());
    $("#jsxm").val($("#syrxm").val());
    if ($("input:radio[name='xzfs']:checked").val() == 1) {
        $("#syr_id").val('');
        $("#jsxm").val('').focus();
    }
}

if (jsdm == "xs") {
    if (jydwsfmr == "10" || jydwsfmr == "11" || jydwsfmr == "12") {
        $("#jg_id").val(jg_id).trigger("chosen:updated");
    }
}
if (jsdm == "js") {
    if (jydwsfmr == "01" || jydwsfmr == "11" || jydwsfmr == "21") {
        $("#jg_id").val(jg_id).trigger("chosen:updated");
    }
}

function refreshFun() {
    //删除已选教学班
    $("#yxcd_ul li p button").unbind("click").click(function (e) {
        e.stopPropagation();
        var el_li = jQuery(this).parent().parent().parent();
        var rowid = el_li.attr("name");
        var rowObj = jQuery("#tabGrid").jqGrid('getRowData', rowid);
        el_li.remove();
        countSum();
        $("#tabGrid").setSelection(rowid, false);
    });
    countSum();
};

//计算已选个数和总座位数
function countSum() {
    var yxcd_num = $("li", "#yxcd_ul").length;
    var sjzws_all = 0;
    var pkzws_all = 0;
    var kszws_all = 0;
    for (var i = 0; i < yxcd_num; i++) {
        if ("1" == pkzwskg) {
            var zws = parseInt($("li", "#yxcd_ul").eq(i).attr("zws"));
            var sjzws = parseInt($("li", "#yxcd_ul").eq(i).attr("sjzws"));
            sjzws_all += isNaN(sjzws) ? 0 : sjzws;
            pkzws_all += isNaN(zws) ? 0 : zws;
        } else {
            var zws = parseInt($("li", "#yxcd_ul").eq(i).attr("zws"));
            pkzws_all += isNaN(zws) ? 0 : zws;
        }
        var kszws1 = parseInt($("li", "#yxcd_ul").eq(i).attr("kszws1"));
        kszws_all += isNaN(kszws1) ? 0 : kszws1;
    }
    $("#yxcd_num").empty().html(yxcd_num);
    $("#yxcd_num2").empty().html(yxcd_num);
    $("#zws_all4").empty().html(kszws_all);
    if ("1" == pkzwskg) {
        $("#zws_all").empty().html(sjzws_all);
        $("#zws_all2").empty().html(sjzws_all);
        $("#zws_all3").empty().html(pkzws_all);
    } else {
        $("#zws_all").empty().html(pkzws_all);
        $("#zws_all2").empty().html(pkzws_all);
    }
}

//场地类别二级联动
$("#cdlb_id").change(function () {
    jQuery.ajaxSetup({async: false});
    var html = [];
    $.getJSON(_path + "/query/query_cxEjjxcdlbList.html", {"sscdlb_id": $(this).val()}, function (data) {
        html.push('<option value="">' + $.i18n.get("qb") + '</option>');
        /*html.push('<option value="">全部</option>');*/
        if ($.founded(data)) {
            $.each(data || [], function (i, rowObj) {
                html.push('<option value="' + rowObj["CDLB_ID"] + '">' + rowObj["CDLBMC"] + '</option>');
            });
        }
    });
    $("#cdejlb_id").empty().append(html.join(""));
    $("#cdejlb_id").trigger("chosen:updated");
    jQuery.ajaxSetup({async: true});
});
//根据校区号二级联动节次List
$("#xqh_id").change(function () {
    hqjcList();
});

//加载周次星期
function loadZcxq() {
    /*selectTR事件注册*/
    if (!(isNaN(dqzc) || isNaN(dqxq))) {
        $("#selectTR_ZC th.selectTH").each(function (i, dom) {
            if ((cdyysqsjsfxz == 1 && parseInt($(dom).attr("value")) < dqzc) || parseInt($(dom).attr("value")) > zdkxzc) {
                $(dom).addClass("displaynone");
            }
        });
        //清空选择事件
        $("#qc_zc").unbind("click").click(function (event) {
            event.stopPropagation();
            $("#selectTR_ZC th.selectTH").removeClass("ui-selected");
            $("#selectTR_ZC").parent().removeClass("wrapError");
            $("#selectTR_XQJ .selectTH").removeClass("displaynone");
        });
        //清空选择事件
        $("#qc_xq").unbind("click").click(function (event) {
            event.stopPropagation();
            $("#selectTR_XQJ th.selectTH").removeClass("ui-selected");
            $("#selectTR_XQJ").parent().removeClass("wrapError");
        });
        $("#selectTR_ZC").selectable({
            filter: "th.selectTH",
            selectFilter: ".removeTHHH",
            //选择完成后执行的回调函数
            stop: function () {
                $("#selectTR_ZC .ui-selected").each(function (i, dom) {
                    if ($(dom).hasClass("displaynone")) {
                        $(dom).removeClass("ui-selected");
                    }
                });
                $("#selectTR_XQJ .selectTH").removeClass("displaynone");
                if ((cdyysqsjsfxz == 1 && $("#selectTR_ZC th.selectTH[value='" + dqzc + "']").hasClass("ui-selected"))) {
                    $("#selectTR_XQJ .selectTH").each(function (i, dom) {
                        var tempXq = $(dom).attr("value");
                        var tempDqxq = dqxq;
                        //如果是星期天为第一天，则进行特殊处理把星期日:7，改为:0
                        if (zqst == "7") {
                            if (tempXq == "7") tempXq = "0";
                            if (dqxq == 7) tempDqxq = 0;
                        }
                        if (parseInt(tempXq) < tempDqxq) {
                            $(dom).removeClass("ui-selected");
                            $(dom).addClass("displaynone");
                        }
                    });
                }
                if ($("#selectTR_ZC th.selectTH[value='" + zdkxzc + "']").hasClass("ui-selected")) {
                    $("#selectTR_XQJ .selectTH").each(function (i, dom) {
                        var tempXq = $(dom).attr("value");
                        var tempZdkxxq = zdkxxq;
                        //如果是星期天为第一天，则进行特殊处理把星期日:7，改为:0
                        if (zqst == "7") {
                            if (tempXq == "7") tempXq = "0";
                            if (zdkxxq == 7) tempZdkxxq = 0;
                        }
                        if (parseInt(tempXq) > tempZdkxxq) {
                            $(dom).removeClass("ui-selected");
                            $(dom).addClass("displaynone");
                        }
                    });
                }
                var selectNum = $("#selectTR_ZC .selectTH.ui-selected").length;
                if (selectNum > 0) {
                    $("#selectTR_ZC").parent().removeClass("wrapError");
                }
            }
        });
        $("#selectTR_XQJ").selectable({
            filter: "th.selectTH",
            selectFilter: ".removeTHHH",
//				  tolerance: "fit",
            //选择完成后执行的回调函数
            stop: function () {
                $("#selectTR_XQJ .ui-selected").each(function (i, dom) {
                    if ($(dom).hasClass("displaynone")) {
                        $(dom).removeClass("ui-selected");
                    }
                });
                var selectNum = $("#selectTR_XQJ .selectTH.ui-selected").length;
                if (selectNum > 0) {
                    $("#selectTR_XQJ").parent().removeClass("wrapError");
                }
            }
        });
    } else {
        $("#selectTR_ZC .selectTH").addClass("displaynone");
        $("#selectTR_XQJ .selectTH").addClass("displaynone");
        $("#selectTR_JC .selectTH").addClass("displaynone");
    }
}

//获取节次List
function hqjcList() {
    $.ajaxSetup({async: false});
    var html_jc = [];
    var html_rsd = [];
    var html_lh = [];
    $.getJSON(_path + "/cdjy/cdjy_cxXqjc.html", {
        "xqh_id": $("#xqh_id").val(),
        "xnm": $("#xnm").val(),
        "xqm": $("#xqm").val()
    }, function (data) {
        html_rsd.push('<th width="40" rowspan="2">' + $.i18n.get("jcd") + '</th>');
        /*html_rsd.push('<th width="40" rowspan="2">节次</th>');*/
        if ($.founded(data.jcList)) {
            var rsdmc = "";
            var colspanNum = 0;
            $.each(data.jcList || [], function (i, rowObj) {
                html_jc.push('<th width="30" class="selectTH" value="' + rowObj["JCMC"] + '">' + rowObj["JCMC"] + '</th>');
                if (rsdmc == rowObj["RSDMC"]) {
                    colspanNum += 1;
                    html_rsd.pop();
                } else {
                    colspanNum = 1;
                    rsdmc = rowObj["RSDMC"];
                }
                html_rsd.push('<th width="30" colspan="' + colspanNum + '">' + rowObj["RSDMC"] + '</th>');
            });
        }
        html_rsd.push('<th width="40" rowspan="2"><button type="button" id="qc_jc" class="btn btn-default btn-xs">' + $.i18n.get("qk") + '</button></th>');
        /*html_rsd.push('<th width="40" rowspan="2"><button type="button" id="qc_jc" class="btn btn-default btn-xs">清空</button></th>');*/
        //楼号List初始化
        html_lh.push('<option value="">' + $.i18n.get("qb") + '</option>');
        /*html_lh.push('<option value="">全部</option>');*/
        if ($.founded(data.lhList)) {
            $.each(data.lhList || [], function (i, rowObj) {
                html_lh.push('<option value="' + rowObj["JXLDM"] + '">' + rowObj["JXLMC"] + '</option>');
            })
        }
        $("#lh").empty().append(html_lh.join(""));
        $("#lh").trigger("chosen:updated");
    });
    $("#rsdmcTR").empty().append(html_rsd.join(""));
    $("#selectTR_JC").empty().append(html_jc.join(""));
    $("#selectTR_JC").selectable({
        filter: "th.selectTH",
        selectFilter: ".removeTHHH",
        //选择完成后执行的回调函数
        stop: function () {
            var selectNum = $("#selectTR_JC .selectTH.ui-selected").length;
            if (selectNum > 0) {
                $("#selectTR_JC").parent().removeClass("wrapError");
            }
        }
    });
    //清空选择事件
    $("#qc_jc").unbind("click").click(function (event) {
        event.stopPropagation();
        $("#selectTR_JC th.selectTH").removeClass("ui-selected");
        $("#selectTR_JC").parent().removeClass("wrapError");
    });
    $.ajaxSetup({async: true});
}

//控制时间范围选择控件
function changeSjfw() {
    var locale = {"format": 'YYYY-MM-DD'};
    if (localeKey == 'zh_CN') {
        locale = {
            "format": 'YYYY-MM-DD',
            "separator": " - ",
            "applyLabel": "确定",
            "cancelLabel": "取消",
            "fromLabel": "起始时间",
            "toLabel": "结束时间'",
            "customRangeLabel": "自定义",
            "weekLabel": "W",
            "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
            "monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
        };
    }
    $("#sjfw").unbind("daterangepicker");
    $("#sjfw").daterangepicker(
        {
            "autoUpdateInput": false,
            "locale": locale,
            minDate: zxrq,
            maxDate: zdrq,
            startDate: zxrq,
            endDate: zdrq
        },
        function (start, end, label) {
            var startTime = start.format("YYYY-MM-DD");
            var endTime = end.format("YYYY-MM-DD");
            var range = startTime + " - " + endTime;
            $("#sjfw").val(range);
            $("#sjfw").valid();
        }
    );
    document.getElementById('qssj').onfocus = function () {
        WdatePicker({
            dateFmt: 'yyyy-MM-dd HH:mm:00',
            isShowToday: false,
            startDate: zxrq + ' 00:00:00',
            minDate: zxrq + ' 00:00:00',
            maxDate: zdrq + ' 23:59:00'
        })
    };
    document.getElementById('jssj').onfocus = function () {
        WdatePicker({
            dateFmt: 'yyyy-MM-dd HH:mm:00',
            isShowToday: false,
            startDate: zxrq + ' 00:00:00',
            minDate: zxrq + ' 00:00:00',
            maxDate: zdrq + ' 23:59:00'
        })
    };
}

//借用方式点击事件
$("#arqjy_lx").click(function () {
    //移除验证规则
    $("#qssj").rules("remove");
    $("#jssj").rules("remove");
    $("#sjfw").rules("remove");
    $("#qssd").rules("remove");
    $("#jssd").rules("remove");
    //去除验证气泡和样式
    $("#qssj,#jssj,#sjfw,#qssd,#jssd").tooltips('destroy');
    $("#qssj_div,#jssj_div,#jysj_div,#jysd_div").children().removeClass("has-error");
    $("#selectTR_ZC").parent().removeClass("wrapError");
    $("#selectTR_XQJ").parent().removeClass("wrapError");
    $("#selectTR_JC").parent().removeClass("wrapError");
    //显示隐藏
    $("#qssj_div,#jssj_div").show();
    $("#jysj_div,#jysd_div").hide();
    //增加验证规则
    $("#qssj").rules("add", {required: true, beforeDate: "#jssj"});
    $("#jssj").rules("add", {required: true, afterDate: "#qssj"});
});
$("#arqjy_jd").click(function () {
    //移除验证规则
    $("#qssj").rules("remove");
    $("#jssj").rules("remove");
    $("#sjfw").rules("remove");
    $("#qssd").rules("remove");
    $("#jssd").rules("remove");
    //去除验证气泡和样式
    $("#qssj,#jssj,#sjfw,#qssd,#jssd").tooltips('destroy');
    $("#qssj_div,#jssj_div,#jysj_div,#jysd_div").children().removeClass("has-error");
    $("#selectTR_ZC").parent().removeClass("wrapError");
    $("#selectTR_XQJ").parent().removeClass("wrapError");
    $("#selectTR_JC").parent().removeClass("wrapError");
    //显示隐藏
    $("#jysj_div,#jysd_div").show();
    $("#qssj_div,#jssj_div").hide();
    //增加验证规则
    $("#sjfw").rules("add", {required: true});
    $("#qssd").rules("add", {required: true, beforeTime: "#jssd"});
    $("#jssd").rules("add", {required: true, afterTime: "#qssd"});
});

//预约场地
function yyCd(sqzt) {
    if (!$("#yyForm").valid() || $("#myFile").closest("div.form-group").hasClass("has-error")) {
        return false;
    }
    //判断审批业务是否配置过审批流程
    if (!$.hasWorkFlow("CDYY")) {
        $.alert($.i18n.get("lcwpz"));
        /*$.alert("【场地预约】流程未配置,请联系管理员！");*/
        return false;
    }

    if ($("#cdyysqkz").val() == 0 && $("li", "#yxcd_ul").length == 0) {
        $.alert($.i18n.get("yycdwk"));
        /*$.alert("当前预约场地为空，请预约场地！");*/
        return false;
    }
    var map = {};
    var jyfs = parseInt($("#jyfs_fc").val());
    map["cdyyModel.sqzt"] = sqzt;
    map["cdyyModel.jyfs"] = jyfs;
    if (jyfs == 0) {
        map["cdyyModel.zcd"] = $("#zcd_fc").val();
        map["cdyyModel.xqj"] = $("#xqj_fc").val();
        map["cdyyModel.jcd"] = $("#jcd_fc").val();
    } else {
        map["cdyyModel.qssj"] = $("#qssj_fc").val();
        map["cdyyModel.jssj"] = $("#jssj_fc").val();
        map["cdyyModel.qssd"] = $("#qssd_fc").val();
        map["cdyyModel.jssd"] = $("#jssd_fc").val();
    }
    map["cdyyModel.xnm"] = $("#xnm_fc").val();
    map["cdyyModel.xqm"] = $("#xqm_fc").val();
    map["cdyyModel.xqh_id"] = $("#xqh_id_fc").val();
    map["cdyyModel.jyly"] = $("#jyly").val();
    map["cdyyModel.sfsysb"] = $("#sfsysb").val();
    map["cdyyModel.yylbdm"] = $("#yylbdm").val();
    map["cdyyModel.lxdh"] = $("#lxdh").val();
    map["cdyyModel.syrlxdh"] = $("#syrlxdh").size() > 0 ? $("#syrlxdh").val() : "";
    map["cdyyModel.cdjylx"] = jQuery("#tabGrid").data("cdjylx");
    map["cdyyModel.jg_id"] = $("#jg_id").val();
    map["cdyyModel.jydwjg_id"] = $("#jydwjg_id").val() == undefined ? '' : $("#jydwjg_id").val();

    $("li", "#yxcd_ul").each(function (i, domEle) {
        var cd_id = jQuery(domEle).attr("cd_id");
        map["cdyyModel.cdList[" + i + "]"] = cd_id;
    })
    var url = _path + "/cdjy/cdjy_tjKxcd.html";
    $("#yyForm").ajaxSubmit({
        type: "POST",
        url: url,
        async: false,
        data: map,
        success: function (msg) {
            if (msg.indexOf($.i18n.jwglxt["success"]) >= 0) {
                //initFile();
                $.success(msg, function () {
                    $(".outer").animate({width: "40px"}, 500);
                    $(".outer_left .glyphicon").removeClass("glyphicon-arrow-right");
                    refershGrid("tabGrid");
                    if ($("input:radio[name='xzfs']:checked").val() == 1) {
                        $("#syr_id").val('');
                        $("#jsxm").val('').focus();
                    }
                    $("#qkyx").click();
                    refershGrid("tabGrid3");
                    cleanFile();
                });
            } else {
                $.error(msg);
            }
            initFile();
        }
    });
}

function cleanFile() {
    $("#myFile").val("");
}

/**
 * 初始化文件上传
 * @return
 */
function initFile() {
    var myFile = $('#myFile');

    myFile.filestyle("destroy");
    myFile.filestyle({
        buttonText: $.i18n.get("xzwj"),
        /*buttonText : ' 选择文件',*/
        buttonName: 'btn-primary'
    });

    myFile.change(function (e) {
        $(this).successClass();
        // 获取文件列表对象:这里优先使用 File API 并兼任旧的读取方式
        var files = $(e.target).getFiles() || e.dataTransfer.files || [];

        // 处理选择的文件
        $.filehandle(files || [], {
            // 可选择文件类型，默认2全部类型；多个用;分割，如：*.gif;*.png;*.jpg;*.jpeg;*.bmp
            fileType: '*.xls;*.zip;*.rar;*.xlsx;*.docx;*.doc;*.gif;*.png;*.jpg;*.jpeg;*.bmp;*.pdf',
            // 单个文件最大:默认10M
            maxSize: "60MB",
            // 所有文件总共大小:默认100MB；换算关系： 1GB=1024MB; 1MB=1024KB; 1KB=1024BB（字节）; 1B = 8Byte
            maxTotal: "100MB",
            // 最大上传文件总数限制
            maxCount: "1",
            // 单个文件不匹配要求文件类型回调
            handleInvalidType: function (file, message) {
                myFile.data("message", message).errorClass(message);
                //$('#myFile').clearFile();
            },
            // 文件总个数超出总限制回调
            handleOverMaxCount: function (message) {
                myFile.data("message", message).errorClass(message);
                //$('#myFile').clearFile();
            },
            // 文件大小超出总限制回调
            handleOverTotal: function (message) {
                myFile.data("message", message).errorClass(message);
                //$('#myFile').clearFile();
            },
            // 单个文件大小超出限制回调：该函数需要返回true|false，决定是否继续之后的逻辑
            handleOverSize: function (file, message) {
                myFile.data("message", message).errorClass(message);
                //$('#myFile').clearFile();
            },
            // 每个文件的回调函数
            handleFile: function (file, message, options) {
                myFile.data("message", "").successClass();
            }
        });
    });
}

//选择使用人
function xzsyr() {
    if ($("input:radio[name='xzfs']:checked").val() == 0) {
        //选择教师
        $.showSelectDialog("2", {"multiselect": false, "rangeable": false}, function (result) {
            $.each(result, function (index, item) {
                $("#syr_id").val(item.JGH_ID);
                $("#jsxm").val(item.XM + "/" + item.JGH).focus();
                $("#syrlxdh").val(item.SJHM);
            });
        });
    } else {
        //选择学生
        $.showSelectDialog("1", {"multiselect": false}, function (result) {
            $.each(result, function (index, item) {
                $("#syrxh_id").val(item.XH_ID);
                $("#xsxm").val(item.XM + "/" + item.XH).focus();
                $("#syrlxdh").val(item.SJHM);
            });
        });
    }

}

function jsxs() {
    $("#js").show();
    $("#xs").hide();
    $("#qt").hide();
    if ("js".equals(jsdm)) {
        $("#syr_id").val($("#syr").val());
        $("#jsxm").val($("#syrxm").val());
    }
    $("#xsxm").rules("remove");
    $("#syr_qt").rules("remove");
    $("#jsxm").rules("add", {required: true});
    $("#syrxh_id").val('');
    $("#xsxm").val('').focus();
    $("#syr_qt").val('').focus();
    $("#jydwjg_id").rules("remove");
    if (!(jydwsfmr == "00" || jydwsfmr == "10" || jydwsfmr == "20")) {
        $("#jg_id").closest("div.panel-footer").show();
    }
}

function xsxs() {
    $("#js").hide();
    $("#xs").show();
    $("#qt").hide();
    if ("xs".equals(jsdm)) {
        $("#syrxh_id").val($("#syr").val());
        $("#xsxm").val($("#syrxm").val());
    }
    $("#jsxm").rules("remove");
    $("#syr_qt").rules("remove");
    $("#xsxm").rules("add", {required: true});
    $("#syr_id").val('');
    $("#jsxm").val('').focus();
    $("#syr_qt").val('').focus();
    $("#jydwjg_id").rules("remove");
    if (!(jydwsfmr == "00" || jydwsfmr == "01" || jydwsfmr == "02")) {
        $("#jg_id").closest("div.panel-footer").show();
    }
}

function qtxs() {
    $("#js").hide();
    $("#xs").hide();
    $("#qt").show();
    $("#jsxm").rules("remove");
    $("#xsxm").rules("remove");
    $("#syr_qt").rules("add", {required: true});
    $("#syr_id").val('');
    $("#jsxm").val('').focus();
    $("#syrxh_id").val('');
    $("#xsxm").val('').focus();
    $("#jydwjg_id").rules("remove");
    $("#jydwjg_id").rules("add", {required: true});
    if (!$.founded($("#jg_id").val())) {
        $("#jg_id").val(jg_id).trigger("chosen:updated");
    }
    $("#jg_id").closest("div.panel-footer").hide();
    $("#syrlxdh").val('');
}

