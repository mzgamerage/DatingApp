using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Interfaces;

namespace API.Controllers
{
   [Authorize]
    public class MembersController(IMemberRepository memberRepository) : BaseApiController
    {   
        [HttpGet] 
        public async Task<ActionResult<IReadOnlyList<Member>>> GetMembers()
        {
            return Ok( await memberRepository.GetMembersAsync());
        } 

        [Authorize]
        [HttpGet("{id}")] // localhost:5001/api/members/bob-id
        public async Task<ActionResult<Member>> GetMember(string id)
        {
            var member=await memberRepository.GetMemberByIdAsync(id);
            if(member==null)
                return NotFound();
            return member;
            
        } 

        [Authorize]
        [HttpGet("{id}/photos")] // localhost:5001/api/members/bob-id
        public async Task<ActionResult<Photo>> GetMemberPhotos(string id)
        {
            var member=await memberRepository.GetPhotosForMemberAsync(id);
            if(member==null)
                return NotFound();
            return Ok(member);
            
        } 

    }
    
};

