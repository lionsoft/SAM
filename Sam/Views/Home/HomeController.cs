﻿using System.Web.Mvc;

namespace Sam.Views.Home
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
    }
}
