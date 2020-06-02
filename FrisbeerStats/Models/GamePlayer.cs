using Newtonsoft.Json;

namespace FrisbeerStats.Models
{
    /// <summary>
    /// Frisbeer API player model for player in game.
    /// </summary>
    public class GamePlayer : Player
    {
        /// <summary>
        /// Team number
        /// </summary>
        [JsonProperty(PropertyName = "team")]
        public int Team { get; set; }
    }
}
