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
using PropertyApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using PropertyApi.Options;
using Amazon.S3;

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
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(Configuration.GetConnectionString("database")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.Configure<TokenParams>(Configuration.GetSection("Tokens"));

            services.AddAuthentication();
            services.AddSingleton<Jwt>();

            // this is actually an environment variable...
            DataConnection.ConnectionString = Configuration.GetConnectionString("database");

            services.AddMvc();
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
                        .WithOrigins("http://propertyapp-website.s3-website-us-west-2.amazonaws.com", "http://d2lffdqk93epuu.cloudfront.net")
                        .WithExposedHeaders("Access-Control-Allow-Origin")
                        .AllowAnyHeader()
                        .AllowCredentials()
                        .AllowAnyMethod());
            }
            
            app.UseMvc();
        }
    }
}
