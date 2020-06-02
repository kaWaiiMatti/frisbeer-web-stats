namespace FrisbeerStats.Models
{
    using System.Collections.Generic;
    using System.Linq;

    /// <summary>
    /// Class for managing raw API data.
    /// </summary>
    public class RawData
    {
        /// <summary>
        /// All games.
        /// </summary>
        public IDictionary<int, Game> Games { get; }
        
        /// <summary>
        /// All players.
        /// </summary>
        public IDictionary<int, Player> Players { get; }

        /// <summary>
        /// StatsData constructor from games.
        /// </summary>
        /// <param name="games"></param>
        public RawData(IEnumerable<Game> games)
        {
            Games = new Dictionary<int, Game>();
            Players = new Dictionary<int, Player>();
            
            foreach (var game in games)
            {
                Games.Add(game.Id, game);

                foreach (var player in game.Players)
                {
                    if (!Players.ContainsKey(player.Id))
                    {
                        Players.Add(player.Id, player);
                    }
                }
            }
        }
    }
}
