using Newtonsoft.Json;

namespace FrisbeerStats.Models
{
    /// <summary>
    /// Frisbeer API player model
    /// </summary>
    public class Player
    {
        /// <summary>
        /// Player identifier
        /// </summary>
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }

        /// <summary>
        /// Name
        /// </summary>
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        /// <summary>
        /// Current score
        /// </summary>
        [JsonProperty(PropertyName = "score")]
        public int Score { get; set; }

        /// <summary>
        /// Current season highest score value
        /// </summary>
        [JsonProperty(PropertyName = "season_best")]
        public int SeasonBest { get; set; }
        
        /// <summary>
        /// Current rank
        /// </summary>
        [JsonProperty(PropertyName = "rank")]
        public Rank Rank { get; set; }
    }
}