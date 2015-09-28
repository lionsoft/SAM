using System;
using System.Data.Entity;
using System.Linq;
using System.Threading;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Sam.DbContext;
using Sam.Extensions.ErrorManager;

namespace Sam.Api
{
    [AppExceptionFilter]
    public class AppController : ApiController
    {
        private Lazy<ApplicationDbContext> _db = new Lazy<ApplicationDbContext>(ApplicationDbContext.Create);
        private User _currentUser;

        public ApplicationDbContext Db
        {
            get { return _db.Value; }
        }

        public string CurrentUserId { get { return Thread.CurrentPrincipal.Identity.GetUserId(); } }

        public User CurrentUser
        {
            get
            {
                if (_currentUser == null)
                {
                    lock (Db)
                    {
                        _currentUser = Db.Users.Include(u => u.Employees).FirstOrDefault(u => u.Id == CurrentUserId);
                    }
                }
                return _currentUser;
            }
        }

        public Employee CurrentEmployee
        {
            get
            {
                if (CurrentUser.Employee == null) throw new ApplicationException("Current user has no assigned employee to him.");
                return CurrentUser.Employee;
            }
        }

        #region Overrides of ApiController

        /// <summary>
        /// Releases the unmanaged resources that are used by the object and, optionally, releases the managed resources.
        /// </summary>
        /// <param name="disposing">true to release both managed and unmanaged resources; false to release only unmanaged resources.</param>
        protected override void Dispose(bool disposing)
        {
            if (_db != null && _db.IsValueCreated)
            {
                Db.Dispose();
                _db = null;
            }
                
            base.Dispose(disposing);
        }

        #endregion
    }
}