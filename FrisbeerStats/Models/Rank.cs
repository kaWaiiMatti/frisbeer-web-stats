using Newtonsoft.Json;

namespace FrisbeerStats.Models
{
    /// <summary>
    /// Frisbeer API player rank model
    /// </summary>
    public class Rank
    {
        /// <summary>
        /// Rank numerical value
        /// </summary>
        [JsonProperty(PropertyName = "numerical_value")]
        public int NumericalValue { get; set; }

        /// <summary>
        /// String representation of the rank
        /// </summary>
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        /// <summary>
        /// Url for rank image
        /// </summary>
        [JsonProperty(PropertyName = "image_url")]
        public string ImageUrl { get; set; }
    }
}