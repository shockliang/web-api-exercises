using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly IAuthRepository repo;
        public AuthController(IAuthRepository repo)
        {
            this.repo = repo;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]UserForRegisterDto userForRegister)
        {
            // validate request
            userForRegister.Username = userForRegister.Username.ToLower();
            if (await repo.UserExists(userForRegister.Username))
                return BadRequest("Username is already taken");

            var userToCreate = new User
            {
                Username = userForRegister.Username
            };

            var createUser = await repo.Register(userToCreate, userForRegister.Password);

            return StatusCode(201);
        }
    }
}