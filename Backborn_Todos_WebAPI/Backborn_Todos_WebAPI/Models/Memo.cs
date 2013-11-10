using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.ComponentModel.DataAnnotations;


namespace Backborn_Todos_WebAPI.Models
{
    public class Memo
    {
        [ScaffoldColumn(false)]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime Timestamp { get; set; }
    }
}