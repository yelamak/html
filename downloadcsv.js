var jasonarray=[];

function getData(){
    var newHTML=[];
    getStoredData();
    jasonarray.forEach(function(arrayitem){
        newHTML.push('<br>');
        $.each( arrayitem, function( key, value ) {
             newHTML.push('<span>' + key+":"+value + '</span>');
             
    });
    });
    
    JSONToCSVConvertor(jasonarray,"employee");
    localStorage.setItem("storeddata",JSON.stringify(jasonarray));
    return false;
}
function JSONToCSVConvertor(JSONData, ReportTitle) {
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var CSV = '';
       CSV += ReportTitle + '\r\n\n';
     var row = "";
      /*for (var index in arrData[0]) {
        row += index + ',';
    }*/
    $.each( jasonarray[0], function( key, value ) {
        $.each(value,function(key1,value1){
            row += key1 + ',';
        });
        
    });
    row = row.slice(0, -1);
    CSV += row + '\r\n';
    /*for (var i = 0; i < arrData.length; i++) {
    var row = "";
    for (var index in arrData[i]) {
        for(var j=0;j<arrData[i].length;j++)
            row += '"' + arrData[i][index] + '",';
        }
    row.slice(0, row.length - 1);
    CSV += row + '\r\n';
    }*/
    jasonarray.forEach(function(arrayitem){
        var row = "";
        $.each( arrayitem, function( key, value ) {
            $.each(value,function(key1,value1){
                row += '"' + value1 + '",';
            });
           
    });
    row.slice(0, row.length - 1);
    CSV += row + '\r\n';
    });
    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    var fileName = "MyReport_";
    fileName += ReportTitle.replace(/ /g,"_");   
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    /*window.open(uri);*/
    var link = document.createElement("a");    
    link.href = uri;
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}