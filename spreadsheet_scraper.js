
//on document load
$(function() {

var BUTTON_ID = "scrape_start";

//add a button to grab ALL the table data
$('#master').prepend('<p align="center"><button id="' + BUTTON_ID + '"> Get All Data! </button></p>');


$("#" + BUTTON_ID).click(function() {
    
    //change the table to show ALL elements
    //NOTE: can't do this dynamically as I can't find the event trigger
    if($('select[name=main_table_length]').val() != "-1")
    {
        alert("Please change to show ALL entries");
    }
    else //grab all the rows
    {
        //keep track of the size and once we get to the last one say "DONE!"
        var totalCount = $("tr").size();
        $("tr").each(function(index, element) {
        
            //ensure it has "even" or "odd" and we will know it is in the data tables
            if($(element).attr("class") == "even" || $(element).attr("class") == "odd")
            {
                var item = {};
                item.quality = $(element).find(".column_A").text();
                item.equip_class = $(element).find(".column_B").eq(0).text();
                item.name = $(element).find(".column_C").text();
                item.est_price = $(element).find(".column_D").text();
                item.est_dirty_price = $(element).find(".column_E").text();
                item.notes = $(element).find(".column_G").text();
                
                priceUpdate(item);
            }
            
            if(index+1 == totalCount) //display finished message!
            {
                $("#" + BUTTON_ID).html("Data Collection Completed!").attr("disabled", "disabled");
            }
        });
    }

});

});



function priceUpdate(_item)
{
    chrome.extension.sendMessage({type: "price_update", item: _item});
}