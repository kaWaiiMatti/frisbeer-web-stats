namespace FrisbeerStats.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using FrisbeerStats.Chart;

    public class SeasonViewModel
    {
        public IList<Game> Games { get; set; }

        public IDictionary<DateTime, int> GamesPerDay { get; set; } = new Dictionary<DateTime, int>();

        // TODO: INITIALIZE WITH REAL DATA
        public ChartBase GameCountAggregation { get; set; } = new LineChartBase(new ChartData
        {
            Labels = new List<object> {1, 2, 3, 4, 5},
            Datasets = new List<ChartDataset>
            {
                new ChartDataset
                {
                    Label = "testi",
                    Data = new List<object>
                    {
                        1, 2, 4, 8, 16
                    }
                }
            }
        });

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="games"></param>
        public SeasonViewModel(IEnumerable<Game> games)
        {
            foreach (var game in games.OrderBy(game => game.StartTime))
            {
                Games.Add(game);

                if (GamesPerDay.TryGetValue(game.StartTime.Date, out var count))
                {
                    GamesPerDay[game.StartTime.Date] = ++count; // I GUESS COUNT++ DOESN'T WORK??
                }
                else
                {
                    GamesPerDay.Add(game.StartTime.Date, 1);
                }
            }

            var firstDate = GamesPerDay
                .Keys
                .OrderBy(date => date)
                .First();

            var lastDate = GamesPerDay
                .Keys
                .OrderByDescending(date => date)
                .First();

            while (firstDate < lastDate)
            {
                firstDate = firstDate.AddDays(1);

                if (!GamesPerDay.ContainsKey(firstDate))
                {
                    GamesPerDay.Add(firstDate, 0);
                }
            }

            // TODO: JATKA TÄSTÄ
        }
    }
}
