namespace FrisbeerStats.Models
{
    using Newtonsoft.Json;

    /// <summary>
    /// Frisbeer API game model
    /// </summary>
    public class Location
    {
        /// <summary>
        /// Location identifier
        /// </summary>
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }

        /// <summary>
        /// Name
        /// </summary>
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        /// <summary>
        /// WGS-84 longitude of the location
        /// </summary>
        [JsonProperty(PropertyName = "longitude")]
        public double? Longitude { get; set; }

        /// <summary>
        /// WGS-84 latitude of the location
        /// </summary>
        [JsonProperty(PropertyName = "latitude")]
        public double? Latitude { get; set; }
    }
}
