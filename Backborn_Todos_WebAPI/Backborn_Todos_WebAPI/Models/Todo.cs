using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Backborn_Todos_WebAPI.Models
{
    public class Todo
    {
        public int Id { get; set; }
        public string title { get; set; }
        public int order { get; set; }
        public bool done { get; set; }
    }
}