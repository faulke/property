using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Mvc;
using PropertyApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using PropertyApi.Options;
using Amazon.S3;
using System.Security.Claims;

namespace PropertyApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var tokenConfig = Configuration.GetSection("Tokens");
            var connString = Configuration.GetConnectionString("database");

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(connString));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.Configure<TokenParams>(tokenConfig);
            services.Configure<CloudParams>(Configuration);

            services
              .AddAuthentication(options =>
              {
                  options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                  options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                  options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
                  options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
              })
              .AddJwtBearer(cfg =>
              {
                  cfg.RequireHttpsMetadata = false;
                  cfg.SaveToken = true;
                  cfg.TokenValidationParameters = new TokenValidationParameters
                  {
                      ValidIssuer = tokenConfig["Issuer"],
                      ValidAudience = tokenConfig["Audience"],
                      IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenConfig["Key"])),
                      ClockSkew = TimeSpan.Zero,
                      NameClaimType = ClaimTypes.NameIdentifier
                  };
              });

            services.AddAuthorization();

            services.AddSingleton<Jwt>();

            // this is actually an environment variable...
            DataConnection.ConnectionString = connString;

            services.AddMvc()
              .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddCors();

            services.AddDefaultAWSOptions(Configuration.GetAWSOptions());
            services.AddAWSService<IAmazonS3>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseAuthentication();

            if (env.IsProduction())
            {
                app.UseCors(builder =>
                    builder
                        .WithOrigins("https://rentalswag.net", "https://rentalswag.netlify.com")
                        .WithExposedHeaders("Access-Control-Allow-Origin", "Authorization")
                        .AllowAnyHeader()
                        .AllowCredentials()
                        .AllowAnyMethod());
            }
            
            app.UseMvc();
            var scopeFactory = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>();
            var scope = scopeFactory.CreateScope();
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            CreateRoles(roleManager).Wait();
        }

        private async Task CreateRoles(RoleManager<IdentityRole> roleManager)
        {
          string[] roleNames = { "Admin", "Landlord", "Tenant" };
          IdentityResult roleResult;

          foreach (var roleName in roleNames)
          {
              var roleExists = await roleManager.RoleExistsAsync(roleName);
              if (!roleExists)
              {
                  roleResult = await roleManager.CreateAsync(new IdentityRole(roleName));
              }
          }
        }
    }
}
