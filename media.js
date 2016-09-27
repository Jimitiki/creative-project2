$(document).ready(function() {initialize();});

function initialize() {
    var name = localStorage.getItem("name");
    var type = localStorage.getItem("type");
    var yt_embed = localStorage.getItem("yt_embed");
    var w_link = localStorage.getItem("w_link");
    var summary = localStorage.getItem("summary");
    if (yt_embed !== "null") {
        $("iframe").attr("src", yt_embed);
        $("iframe").show();
    }
    if (summary !== "null") {
        $("#summary").text(summary);
    }
    if (w_link !== "null") {
        $("#summary").append("<br><a href=\"" + w_link + "\">Wikipedia</a>");
    }
    console.log(type)
    $("#name").text(name);
    switch (type) {
        case ("author"):
            getAuthorLink(name);
            break;
        case ("book"):
            getBookLink(name);
            break;
        case ("game"):
            getGameLink(name);
            break;
        case ("movie"):
        case ("show"):
            getMovieLink(name);
        case ("music"):
            getBandLink(name);
    }
}

function getAuthorLink(name) {
    var url = "https://www.goodreads.com/book/author/" + convertGoodreadsUrl(name);
    $("#media-links").append("<a class=\"media-link\" href=\"" + url + "\">Goodreads</a>");
}

function getBookLink(name) {
    var url = "https://www.goodreads.com/book/title?id=" + convertGoodreadsUrl(name);
    $("#media-links").append("<a class=\"media-link\" href=\"" + url + "\">Goodreads</a>");
}

function getGameLink(name) {
    var url = "http://www.giantbomb.com/api/search/?query=\"" + name + "\""
    
    var app_id = 0;
    $.ajax({
        url: "games.json",
        datatype: "json",
        success: function(data) {
            console.log(data);
            var games = data.applist.apps.app;
            for (var i = 0; i < games.length; i++) {
                if (games[i].name.toLowerCase() === name.toLowerCase()) {
                    app_id = games[i].appid;
                    break;
                }
            }
            if (app_id !== 0) {
                var steam_url = (app_id == 0) ? "" : "http://store.steampowered.com/app/" + app_id + "/";
                $("#media-links").append("<a class=\"media-link\" href=\"" + steam_url + "\">Steam</a>");
            }
        }
    });
}

function getMovieLink(name) {
    $.ajax ({
        url: "http://www.omdbapi.com/?t=" + name + "&r=json",
        datatype: "json",
        success: function(data) {
            var url = "http://www.imdb.com/title/" + data.imdbID + "/";
            $("#media-links").append("<a class=\"media-link\" href=\"" + url + "\">IMDb</a>");
        }
    })
}

function getBandLink(name) {
     $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: name,
            type: 'artist',
            limit: 1
        },
        success: function (data) {
            console.log(data);
            var sURL = data.artists.items[0].external_urls.spotify;
            if (sURL) {
                $("#media-links").append("<a class=\"media-link\" href=\"" + sURL + "\">Spotify</a> ");
            }
        }
    });
    $.ajax({
        url: 'https://itunes.apple.com/search',
        dataType: "jsonp",
        method: "GET",
        data: {
            term: name,
            entity: "musicArtist",
            limit: 1
        },
        success: function (data) {
            console.log(data);
            var iURL = data.results[0].artistLinkUrl;
            if (iURL) {
                $("#media-links").append("<a class=\"media-link\" href=\"" + iURL + "\">iTunes</a>");
            }
        }
    })
}

function convertGoodreadsUrl(item) {
    item = item.replace(/\./g, "");
    item = item.replace(/ /g, "+");
    return item;
}