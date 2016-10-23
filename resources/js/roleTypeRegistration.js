var initRoleTypeComponents = function(){
    $("div.headerIconLabel").bind("click", function(){
        goToHome();
    });
    $("input").bind("change", function(){
        clearRoleTypeStatus();
    });
    $('.currency').autoNumeric('init');
    $('#btnRemoveRoleType').hide();

    $('#txtSearchKey').bind('keyup', function(){
        var searchkey = $(this).val();
        searchRoleTypeList(searchkey);
    });

    initializeRoleTypeForm();
};

var initializeRoleTypeForm = function(){
    $("#formRoleType").validate({
        onkeyup:false,
        onkeydown:false,
        onchange: false,
        onblur:false,
        rules: {
            "typeCode": {
                required:true,
                maxlength: 20
            },
            "typeName": {
                required:true
            }
        },
        messages: {
            "typeCode": {
                required: "Please enter service type code.",
                maxlength: "Service Type Code should not exceed 20 characters.",
            },
            "typeName": {
                required: "Please enter service type name"
            },
        },
        errorElement: 'div',
        wrapper: 'div',
        errorPlacement: function(error, element) {
            error.insertBefore(element).addClass('msgContainer'); // default function
        }
    });
};

var initializeRoleTypeTable = function(){
    $("table.serviceTypeTable").delegate('td','mouseover mouseleave', function(e) {
        if (e.type == 'mouseover') {
            $(this).parent().addClass("hover");
            $("colgroup").eq($(this).index()).addClass("hover");
        }
        else {
            $(this).parent().removeClass("hover");
            $("colgroup").eq($(this).index()).removeClass("hover");
        }
    });

    $("table.serviceTypeTable tr:odd").addClass("odd");
    $("table.serviceTypeTable tr:even").addClass("even");
    
    $("table.serviceTypeTable tr td").on("click", function(){
        var id = $(this).parent().find(":first-child").html();
        loadRoleTypeDetails(id);
    });
};

var loadRoleTypeDetails = function(id){
    if(id){
        $.getJSON("../getRoleTypeDetails.php?typeCode=" + id, function(data){
            if(data[0]){
                $("#txTtypeCode").val(data[0].type_code).attr('readonly', true);
                $("#txtRoleTypeName").val(data[0].type_name);
                $('#txtOtherInfo').text(data[0].remarks);
                
                if(roleType == 'administrator'){
                    $('#btnRemoveRoleType').show();
                }
                
                $('#formRoleType').valid();
            }
        });
    }
};

var addUpdateRoleType = function(){
    if($('#formRoleType').valid()){
        $.post("../roleTypeRegistration.php", $("#formRoleType").serialize()).done(function(msg){
            setRoleTypeStatus(true, msg);
            clearRoleTypeFields();
            refreshRoleTypeList();
        }).fail(function(error){
            setRoleTypeStatus(false, "Save Service Type Error: " + error.statusText);
        });
    }
};

var removeRoleType = function(){
    var typeCode = $("#txTtypeCode").val();
    if(typeCode){
        if(typeCode!='boxing' && typeCode!='weights'){
            $.post("../deleteRoleType.php?typeCode=" + typeCode).done(function(msg){
                setRoleTypeStatus(true, msg);
                clearRoleTypeFields();
                refreshRoleTypeList();
            }).fail(function(error){
                setRoleTypeStatus(false, "Remove Service Type Error: " + error.statusText);
            });
        }
        else {
            setRoleTypeStatus(false, 'Cannot remove referred served types.');
        }

    }
};

var searchRoleTypeList = function(searchKey){
    var url = "../roleTypeList.php";
    if(searchKey) url += "?searchKey=" + searchKey;
    $("#dvList").load(url, function(){
        initializeRoleTypeTable();
    });
};

var refreshRoleTypeList = function(page, sortColumn, order){
    var url = "../roleTypeList.php";
    if(page) url += "?page=" + page;
    if(sortColumn) url += "&sortBy=" + sortColumn;
    if(order) url += "&order=" + order;

    $("#dvList").load(url, function(){
        initializeRoleTypeTable();
    });
};

var loadDummyRoleTypeInfo = function(){
    $("#txTtypeCode").val('poledancing');
    $("#txtRoleTypeName").val('Pole Dancing');
    $("#txtOtherInfo").text("Tag singko tag singko tag singko nalang...");
};

var clearRoleTypeFields = function(){
    $('input[type="text"], textarea').val("");
    $("#txTtypeCode").removeAttr('readonly');
    $('#btnRemoveRoleType').hide();
    $('div.msgContainer').hide();
};

var setRoleTypeStatus = function(isSuccess, msg){
    var objStatus = $('#spanRoleTypeStatus');
     objStatus.removeClass("success").removeClass("error");
    if(isSuccess)
        objStatus.addClass("success").html(msg);
    else
        objStatus.addClass("error").html(msg);  
};

var clearRoleTypeStatus = function(){
    var objStatus = $('#spanRoleTypeStatus');
    objStatus.removeClass("success").removeClass("error").html("");
};

var clearSearchKeys = function(){
    $('#txtSearchKey').val('');
    refreshRoleTypeList();
};

var showMessageDialog = function(msg){
    $("#dialog-box").html(msg);
    $("#dialog-box").dialog({
        modal: true,
        title: "GRMSys Service Types",
        resizable: false,
        height: "auto",
        width: "auto",
        buttons: {
            "OK": function () {
                $(this).dialog('close');
            }
        }
    });
};

var showConfirmRemoveRoleTypeDialog = function(){
    $("#dialog-box").html('Do you want to remove service type?');
    $("#dialog-box").dialog({
        modal: true,
        title: "GRMSys Service Types",
        resizable: false,
        height: "auto",
        width: "auto",
        buttons: {
            "Remove Type": function () {
                removeRoleType();
                $(this).dialog('close');
            },
            "Cancel": function () {
                $(this).dialog('close');
            },
        }
    });
};

var numberWithCommas = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};