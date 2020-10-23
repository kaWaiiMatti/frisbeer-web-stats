namespace FrisbeerStats.Chart
{
    using System.Collections.Generic;
    using Newtonsoft.Json;

    public class ChartDataset
    {
        [JsonProperty("label", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Label { get; set; }
        
        [JsonProperty("data")]
        public IList<object> Data { get; set; }
    }
}
