namespace FrisbeerStats.Chart
{
    using System.Collections.Generic;
    using Newtonsoft.Json;

    public class ChartData
    {
        [JsonProperty("labels")]
        public IList<object> Labels { get; set; }
        
        [JsonProperty("datasets")]
        public IList<ChartDataset> Datasets { get; set; }


    }
}
