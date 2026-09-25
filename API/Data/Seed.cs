using System;
using API.Data;
using API.Dtos;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace Api.Data;

public class Seed
{
    public static async Task SeedUsers(AppDbContext context)
    {
        if (await context.Users.AnyAsync()) return;
        
        
            var memberdata = await File.ReadAllTextAsync("Data/UserSeedData.json");
            
            var members = System.Text.Json.JsonSerializer.Deserialize<List<SeedUserDto>>(memberdata);

            if(members is null) {Console.WriteLine("Failed to deserialize userseed data."); return;}   
        
            
                
            foreach(var member in members)
            {
                using var hmac = new System.Security.Cryptography.HMACSHA512();
                
                var user = new AppUser
                {
                    Id = member.Id,
                    Email = member.Email,                
                    DisplayName = member.DisplayName,
                    ImageUrl = member.ImageUrl,
                    PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes("Pa$$w0rd")),
                    PasswordSalt = hmac.Key,
                    Member = new Member
                    {
                        Id = member.Id,
                        DisplayName = member.DisplayName,
                        Description = member.Description,    
                        DateOfBirth = member.DateOfBirth,
                        ImageUrl = member.ImageUrl,    
                        Gender = member.Gender,
                        City = member.City,
                        Country = member.Country,
                        Created = member.Created,
                        LastActive = member.LastActive,
                    }

                };
                user.Member.Photos.Add(new Photo
                {
                    Url = member.ImageUrl!,
                    MemberId = member.Id,
                });
                context.Users.Add(user);

            }   
        await context.SaveChangesAsync();
    }
    
}