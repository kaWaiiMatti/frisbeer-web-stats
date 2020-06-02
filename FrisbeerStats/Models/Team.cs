namespace FrisbeerStats.Models
{
    using Newtonsoft.Json;

    /// <summary>
    /// Frisbeer API game model
    /// </summary>
    public class Team
    {
        /// <summary>
        /// Team side
        /// </summary>
        [JsonProperty(PropertyName = "side")]
        public int Side { get; set; }

        /// <summary>
        /// Team name
        /// </summary>
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
    }
}
