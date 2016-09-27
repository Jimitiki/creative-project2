$(document).ready(initialize);

this.results;

function initialize() {
    $("#search").on("click", function() {
        submitSearch();
    });
    $("#add").on("click", function() {
        addRow();
    })
}

function submitSearch() {
    $(".media-result").remove();
    this.results = [];
    var url = "https://www.tastekid.com/api/similar?k=241156-MediaRec-C9L3QQKV&info=1&q=";
    var num_fields = $(".media-row").length;
    $(".media-row").each(function (index, el) {
        url += $(el).children(".media-type").val() + ":";
        var name = urlEncode($(el).children(".media-input").val());
        url += name;
        if (index >= 0 && num_fields > 1 && index < num_fields - 1 && name) {
            url += "%2C+";
        }
        console.log(url);
    });
    $.ajax({
        dataType: "jsonp",
        url: url,
        success: function (data) {
            console.log(data);
            for (var i in data.Similar.Results) {
                var result = data.Similar.Results[i];
                var el = "<div class=\"media-result\"><a class=\"media-link\" id=\"" + i +"\">" + 
                    result.Name + ", " + result.Type + "</a><br></div>";
                $("#results").append(el);
                results.push({
                    name: result.Name,
                    type: result.Type,
                    yt_embed: result.yUrl,
                    summary: result.wTeaser,
                    w_link: result.wUrl
                })
            }
            $(".media-link").on("click", function() {
                viewSelection(event.target);
            });
        }
    });
}

function viewSelection(link) {
    console.log(this.results);
    var result = this.results[$(link).attr("id")];
    localStorage.setItem("name", result.name);
    localStorage.setItem("type", result.type);
    localStorage.setItem("yt_embed", result.yt_embed);
    localStorage.setItem("summary", result.summary);
    localStorage.setItem("w_link", result.w_link);
    window.open("media.html");
}

function addRow() {
    if ($(".media-row").length < 5) {
        var el = "<span class=\"media-row\"><input type=\"text\" class=\"media-input\">" +
                "<select class=\"media-type\"><option value=\"author\">Author</option>" + 
                "<option value=\"music\">Band</option><option value=\"book\">Book</option>" +
                "<option value=\"game\">Game</option><option value=\"movie\">Movie</option>" +
                "<option value=\"show\">TV Show</option></select></span><br>";
        $("#inputs").append(el);
        if ($(".media-row").length === 5) {
            $("#add").attr("disabled", true);
        }
    }
}

function urlEncode(str) {
    str = str.replace(" ", "+");
    str = str.toLowerCase();
    return str;
}