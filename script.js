$(document).ready(initialize);

function initialize() {
    $("#search-btn").on("click", function() {
        submitSearch();
    });
}

function submitSearch() {
    var url = "https://www.tastekid.com/api/similar?k=241156-MediaRec-C9L3QQKV&q=";
    $(".media-row").each(function (index, el) {
        url += $(".media-row .media-type").val() + ":";
        var name = urlEncode($(".media-row .media-input").val());
        url += name;
        $.ajax({
            dataType: "jsonp",
            url: url,
            type: "GET",
            success: function (data) {
                console.log(data);
            }
        });
    });
}
                         
function urlEncode(str) {
    str = str.replace(" ", "+");
    str = str.toLowerCase();
    return str;
}