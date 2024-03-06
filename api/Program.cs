using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;

namespace TestAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var configuration = builder.Configuration;

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // CORS
            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    policy =>
                    {
                        policy.AllowAnyHeader();
                        policy.AllowAnyMethod();
                        policy.AllowAnyOrigin();
                    });
            });

            // Adds Microsoft Identity platform (Azure AD B2C) support to protect this Api
            builder.Services
                   .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                   .AddMicrosoftIdentityWebApi(jwtBearerOptions =>
                       {
                           configuration.Bind("AzureAdB2C", jwtBearerOptions);
                           jwtBearerOptions.TokenValidationParameters.NameClaimType = "name";
                       },
                       msIdentityOptions => { configuration.Bind("AzureAdB2C", msIdentityOptions); });

            var app = builder.Build();
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseHttpsRedirection();

            // Add CORs
            app.UseCors();
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}