using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Backborn_Todos_WebAPI.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Depertment { get; set; }
        public int Salary { get; set; }
        public string Memo { get; set; }
    }
}