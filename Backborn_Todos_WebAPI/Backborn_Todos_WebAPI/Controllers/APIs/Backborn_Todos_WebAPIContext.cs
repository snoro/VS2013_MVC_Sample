using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Backborn_Todos_WebAPI.Models
{
    public class Backborn_Todos_WebAPIContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public Backborn_Todos_WebAPIContext() : base("name=Backborn_Todos_WebAPIContext")
        {
        }

        public System.Data.Entity.DbSet<Backborn_Todos_WebAPI.Models.Todo> Todoes { get; set; }

        public System.Data.Entity.DbSet<Backborn_Todos_WebAPI.Models.Employee> Employees { get; set; }

        public System.Data.Entity.DbSet<Backborn_Todos_WebAPI.Models.Memo> Memos { get; set; }

    
    }
}
