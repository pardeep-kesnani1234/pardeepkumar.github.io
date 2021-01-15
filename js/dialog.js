'use strict';
 
(function () {
 
    $(document).ready(function () {
        tableau.extensions.initializeDialogAsync().then(function (openPayload) {
            buildDialog();
        });
    });
 
    function buildDialog() {
        let dashboard = tableau.extensions.dashboardContent.dashboard;
        dashboard.worksheets.forEach(function (worksheet) {
            $("#selectWorksheet").append("<option value='" + worksheet.name + "'>" + worksheet.name + "</option>");
        });

        var worksheetName = tableau.extensions.settings.get("worksheet");
        if (worksheetName != undefined) {
            $("#selectWorksheet").val(worksheetName);
            columnsUpdate();
        }
 
        $('#selectWorksheet').on('change', '', function (e) {
            columnsUpdate();
        });
        $('#cancel').click(closeDialog);
        $('#save').click(saveButton);
        $('.select').select2();

       
        
    }
 
    function columnsUpdate() {
 
        var worksheets = tableau.extensions.dashboardContent.dashboard.worksheets;
        var worksheetName = $("#selectWorksheet").val();
 
        var worksheet = worksheets.find(function (sheet) {
            return sheet.name === worksheetName;
        });      
 
        worksheet.getSummaryDataAsync({ maxRows: 1 }).then(function (sumdata) {
            var worksheetColumns = sumdata.columns;
            $("#selectCategory").text("");
            $("#selectTotal").text("");
            $("#selectBudget").text("");
            $("#selectCurrent").text("");

            
            var counter = 1;
            worksheetColumns.forEach(function (current_value) {
                $("#selectCategory").append("<option value='" + counter + "'>"+current_value.fieldName+"</option>");
                $("#selectTotal").append("<option value='" + counter + "'>"+current_value.fieldName+"</option>");
                $("#selectBudget").append("<option value='" + counter + "'>"+current_value.fieldName+"</option>");
                $("#selectCurrent").append("<option value='" + counter + "'>"+current_value.fieldName+"</option>");
                counter++;
            });
            $("#selectCategory").val(tableau.extensions.settings.get("categoryColumnNumber"));
            $("#selectTotal").val(tableau.extensions.settings.get("valueColumnNumber"));
            $("#selectBudget").val(tableau.extensions.settings.get("valueColumnNumber"));
            $("#selectCurrent").val(tableau.extensions.settings.get("valueColumnNumber"));

            $("#titleName").val(tableau.extensions.settings.get("titleNameValue"));
            $("#prefix").val(tableau.extensions.settings.get("prefixValue"));
            $("#titleShow").val(tableau.extensions.settings.get("titleShow"));
            $("#legendShow").val(tableau.extensions.settings.get("legendShow"));

            $("#selectColor1Container").val(tableau.extensions.settings.get("selectColor1Value"));
            $("#selectColor2Container").val(tableau.extensions.settings.get("selectColor2Value"));
            $("#selectColor3Container").val(tableau.extensions.settings.get("selectColor3Value"));
           
        });
    }

    
    //Color Picker
            //  var popupColor = new Picker({
            //     parent: document.querySelector('#selectColor1'),
            //     popup: 'bottom', // 'right'(default), 'left', 'top', 'bottom'
            //     alpha: false, // default: true
            //     color: '#898989',
            //     editor: true,
            //     editorFormat: 'hex',
            //     onDone: function(color){
            //        $("selectColor1Container").html("<span id='selectColor1Value'>" + color.hex + "</span>" );
            //     }
    
            // });
 
    function reloadSettings() {
         
    }
 
    function closeDialog() {
        tableau.extensions.ui.closeDialog("10");
    }
 
    function saveButton() {
 
        tableau.extensions.settings.set("worksheet", $("#selectWorksheet").val());
        tableau.extensions.settings.set("categoryColumnNumber", $("#selectCategory").val());
        tableau.extensions.settings.set("valueColumnNumber", $("#selectTotal").val());
        tableau.extensions.settings.set("valueColumnNumber", $("#selectBudget").val());
        tableau.extensions.settings.set("valueColumnNumber", $("#selectCurrent").val());
        

        tableau.extensions.settings.set("titleNameValue", $("#titleName").val());
        tableau.extensions.settings.set("prefixValue", $("#prefix").val());
        tableau.extensions.settings.set("titleShow", $("#titleShow").val());
        tableau.extensions.settings.set("legendShow", $("#legendShow").val());


        // Set Colors
        tableau.extensions.settings.set("selectColor1Value", $("#selectColor1Container").val());
        tableau.extensions.settings.set("selectColor2Value", $("#selectColor2Container").val());
        tableau.extensions.settings.set("selectColor3Value", $("#selectColor3Container").val());

        tableau.extensions.settings.saveAsync().then((currentSettings) => {
            tableau.extensions.ui.closeDialog("10");
        });
    }
})();