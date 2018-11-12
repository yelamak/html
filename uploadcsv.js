var jasonarray=[];
var id;

function uploadcsv(){
    getStoredData();
    var file=document.getElementById("file").value;
    var type=file.substr(file.lastIndexOf(".")+1);
    var filename=file.substr(file.lastIndexOf("\\")+1);
    if(type!="csv"){
        alert("select only csv files");
        return;
    }
    else
    {
        $.ajax({
        type: "GET",
        url: filename,
        dataType: "text",
        success: function(data) {processData(data);},
        error :function(){
            alert("something went wrong");
        }
         });
    }
}

function processData(allText) {
var allTextLines = allText.split(/\r\n|\n/);
var headers = allTextLines[0].split(',');
var lines = [];
for (var i=1; i<allTextLines.length-1; i++) {
    var data = allTextLines[i].split(',');
    if (data.length == headers.length) {
        if(validate(data)){
            var tarr = {};
            var idobj={};
            for (var j=0; j<headers.length; j++) {
                 tarr[headers[j]]=data[j];
            }
            idobj[id]=tarr;
            id++;
            localStorage.setItem("id",id);
            lines.push(idobj);
        }
        else{
            alert("Data is not valid or dublicate data found on line "+i);
            return;
        }
        
    }
    else{
        alert("not a valid csv file");
        return;
    }
}
for(i=0;i<lines.length;i++)
    jasonarray.push(lines[i]);
localStorage.setItem("storeddata",JSON.stringify(jasonarray));
localStorage.setItem("id",id);
console.log(JSON.stringify(jasonarray));
}


    

