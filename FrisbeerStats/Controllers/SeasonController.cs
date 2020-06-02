namespace FrisbeerStats.Controllers
{
    using System.Linq;
    using FrisbeerStats.Classes;
    using FrisbeerStats.Models;
    using Microsoft.AspNetCore.Mvc;

    public class SeasonController : Controller
    {
        private readonly IDataProvider _dataProvider;

        public SeasonController(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }

        /// <summary>
        /// Default view
        /// </summary>
        /// <returns></returns>
        public IActionResult Index()
        {
            return Season(_dataProvider
                .GetData()
                .Games
                .Values
                .Max(game => game.Season));
        }

        /// <summary>
        /// Single season view
        /// </summary>
        /// <param name="seasonId"></param>
        /// <returns></returns>
        [Route("/season/{seasonId}")]
        public IActionResult Season(int seasonId)
        {
            var data = new SeasonViewModel
            {
                Games = _dataProvider
                    .GetData()
                    .Games
                    .Values
                    .Where(game => game.Season == seasonId)
                    .ToList()
            };
            
            return View("Season", data);
        }
    }
}
