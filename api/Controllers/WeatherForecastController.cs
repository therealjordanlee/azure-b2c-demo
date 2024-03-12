using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace TestAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("weatherforecast")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        // In this example application, this endpoint works as the test-spa will have the required all.read scope
        // for access.
        [RequiredScope("all.read")]
        [HttpGet("")]
        public IActionResult Get()
        {
            var response = new
            {
                Result = Enumerable.Range(1, 5).Select(index => new WeatherForecast
                {
                    Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                    TemperatureC = Random.Shared.Next(-20, 55),
                    Summary = Summaries[Random.Shared.Next(Summaries.Length)]
                }).ToArray()
            };
            return Ok(response);
        }

        // This endpoint will never be reachable, as the test-spa app was not granted the all.write scope.
        [RequiredScope("all.write")]
        [HttpGet("fail")]
        public IActionResult ThisWillFail()
        {
            return Ok("You should never see this due to missing scope.");
        }
    }
}
