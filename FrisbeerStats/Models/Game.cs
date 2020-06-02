namespace FrisbeerStats.Models
{
    using System;
    using System.Collections.Generic;
    using Newtonsoft.Json;

    /// <summary>
    /// Frisbeer API game model
    /// </summary>
    public class Game
    {
        /// <summary>
        /// Game identifier
        /// </summary>
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }

        /// <summary>
        /// Location object where the game was played
        /// </summary>
        [JsonProperty(PropertyName = "location_repr")]
        public Location Location { get; set; }

        /// <summary>
        /// Players who played in the game.
        /// </summary>
        [JsonProperty(PropertyName = "players")]
        public IList<GamePlayer> Players { get; set; }

        /// <summary>
        /// Team information for the game.
        /// </summary>
        [JsonProperty(PropertyName = "teams")]
        public IList<Team> Teams { get; set; }

        /// <summary>
        /// Scheduled start time.
        /// </summary>
        [JsonProperty(PropertyName = "date")]
        public DateTime StartTime { get; set; }

        /// <summary>
        /// Game name.
        /// </summary>
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        
        /// <summary>
        /// Team 1 score
        /// </summary>
        [JsonProperty(PropertyName = "team1_score")]
        public int Team1Score { get; set; }
        
        /// <summary>
        /// Team 2 score
        /// </summary>
        [JsonProperty(PropertyName = "team2_score")]
        public int Team2Score { get; set; }
        
        /// <summary>
        /// Gate state
        /// </summary>
        [JsonProperty(PropertyName = "state")]
        public GameState State { get; set; }
        
        /// <summary>
        /// Season identifier
        /// </summary>
        [JsonProperty(PropertyName = "season")]
        public int Season { get; set; }
    }

    /// <summary>
    /// Enumerable to present game states.
    /// </summary>
    public enum GameState
    {
        NotStarted = 0,
        Started = 1,
        Played = 2,
        Verified = 3
    }
}
