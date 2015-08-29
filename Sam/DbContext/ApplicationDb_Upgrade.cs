﻿using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;
using Sam.Models;

#pragma warning disable 4014

namespace Sam.DbContext
{
    partial class ApplicationDbContext
    {
        /// <summary>
        /// Актуальная версия базы данных.
        /// Если <see cref="ActualDbVersion"/> больше <see cref="CurrentDbVersion"/> вызывается метод <see cref="UpgradeDatabase"/>
        /// </summary>
        public const int ActualDbVersion = 1;

        private static ApplicationUserManager _userManager;

        protected void UpgradeDatabase(int fromVersion, int toVersion)
        {
            _userManager = _userManager ?? new ApplicationUserManager(new UserStore<User>());

            // Creating database from scratch
            if (fromVersion == 0)
            {
            }
            // Updating database to version 2
            else if (toVersion == 2)
            {
            }
        }

    }
}