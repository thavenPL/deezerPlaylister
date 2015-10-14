using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Web.Http;

namespace AngularJSWebApiEmpty.Controllers
{
    public class PlaylistSource
    {
        public string Name { get; set; }
        public int Id { get; set; }
        public string Url { get; set; }
        public string Parser { get; set; }
    }

    public class PlaylistCollectionController : ApiController
    {
        List<PlaylistSource> playlist = new List<PlaylistSource> {
        new PlaylistSource {Id= 1, Name = "Lp3 Top 30" , Url = "http://lp3.polskieradio.pl/", Parser = @"find('#divCenter .boxNotowanie .BoxTrack').each(function(index){var auth =$(this).find('.bArtist a').text(); var tit=$(this).find('.bTitle a').text(); var obj = {author:auth, title:tit};  console.log(obj);})"},
        new PlaylistSource {Id= 2, Name = "Lp3 Cale 50" },
        new PlaylistSource {Id= 3, Name = "Lp3 50 + szczesliwa 13" },
        new PlaylistSource {Id= 4, Name = "Lp3 Top Wszechczasów 10" },
        };

        public IEnumerable<PlaylistSource> Get()
        {
            return playlist;
        }

        public string Get(int Id)
        {
            var webClient = new WebClient();
            webClient.Encoding = Encoding.UTF8;
            var source = webClient.DownloadString(playlist.First(e=>e.Id== Id).Url);
            source = Regex.Replace(source, @"<img[^>]*>", "");
            return source;
        }
    }
}
