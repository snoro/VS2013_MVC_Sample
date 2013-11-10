using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Backborn_Todos_WebAPI.Models;

namespace Backborn_Todos_WebAPI.Controllers.APIs
{
    public class MemoController : ApiController
    {
        private Backborn_Todos_WebAPIContext db = new Backborn_Todos_WebAPIContext();

        // GET api/Memo
        public IQueryable<Memo> GetMemos()
        {
            return db.Memos;
        }

        // GET api/Memo/5
        [ResponseType(typeof(Memo))]
        public IHttpActionResult GetMemo(int id)
        {
            Memo memo = db.Memos.Find(id);
            if (memo == null)
            {
                return NotFound();
            }

            return Ok(memo);
        }

        // PUT api/Memo/5
        public IHttpActionResult PutMemo(int id, Memo memo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != memo.Id)
            {
                return BadRequest();
            }

            db.Entry(memo).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MemoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST api/Memo
        [ResponseType(typeof(Memo))]
        public IHttpActionResult PostMemo(Memo memo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Memos.Add(memo);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = memo.Id }, memo);
        }

        // DELETE api/Memo/5
        [ResponseType(typeof(Memo))]
        public IHttpActionResult DeleteMemo(int id)
        {
            Memo memo = db.Memos.Find(id);
            if (memo == null)
            {
                return NotFound();
            }

            db.Memos.Remove(memo);
            db.SaveChanges();

            return Ok(memo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MemoExists(int id)
        {
            return db.Memos.Count(e => e.Id == id) > 0;
        }
    }
}