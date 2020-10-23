namespace FrisbeerStats.Chart
{
    using Newtonsoft.Json;

    /// <summary>
    /// Base class for chart object
    /// </summary>
    public abstract class ChartBase
    {
        /// <summary>
        /// Chart type
        /// </summary>
        [JsonProperty("type")] 
        public string Type { get; private set; }
        
        /// <summary>
        /// Data
        /// </summary>
        [JsonProperty("data")] 
        public ChartData Data { get; private set; }

        /// <summary>
        /// Base constructor
        /// </summary>
        /// <param name="type"></param>
        /// <param name="data"></param>
        protected ChartBase(string type, ChartData data)
        {
            Type = type;
            Data = data;
        }
    }
}
