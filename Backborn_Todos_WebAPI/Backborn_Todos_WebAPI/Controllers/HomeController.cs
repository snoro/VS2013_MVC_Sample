﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Backborn_Todos.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Todos()
        {
            return View();
        }
        public ActionResult Todos_WebAPI()
        {
            return View();
        }

        public ActionResult Knockout_Todos()
        {
            return View();
        }

        public ActionResult Knockout_WebAPI1()
        {
            return View();
        }

        public ActionResult Knockout_WebAPI2()
        {
            return View();
        }

        public ActionResult SPA010()
        {
            return View();
        }

        

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}