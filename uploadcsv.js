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

function validate(data){
    var name=data[0];
    var email=data[1];
    var phno=data[2];
    if(name=='')
			return false;
	else if(email.indexOf('@')<0 || email.indexOf('.')<0 || email.lastIndexOf('.')<email.indexOf('@') || email.lastIndexOf('.') >= (email.length-1))
			return false;
	else if(phno.length	!=10 )
            return false;
    else{
        var flag=0;
        jasonarray.forEach(function(arrayitem){
            
            $.each( arrayitem, function( key, value ) {
                $.each(value,function(key1,value1){
                    if(key1=="email" && value1==email){
                        flag=1;
                    }
                });
               
        });
        });
        if(flag==1)
            return false;
        else
            return true;
    }
}