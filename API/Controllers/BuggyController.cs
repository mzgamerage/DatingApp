using System;
using API.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BuggyController : BaseApiController
    {
        [HttpGet("auth")]
        public IActionResult GetAuth()
        {
            return Unauthorized();
        }

        [HttpGet("not-found")]
        public IActionResult GetNotFound()
        {
            return NotFound();
        }

        [HttpGet("server-error")]
        public IActionResult GetServerError()
        {
            throw new Exception("Server error from buggy controller.");
        }

        [HttpGet("bad-request")]
        public IActionResult GetBadRequest()
        {
            return BadRequest("Bad Request from buggy controller.");
        }
    }
}
