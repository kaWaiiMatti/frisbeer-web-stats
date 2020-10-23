namespace FrisbeerStats.Chart
{
    using Newtonsoft.Json;

    public class Point
    {
        [JsonProperty("x")]
        public int X { get; private set; }
        
        [JsonProperty("y")]
        public int Y { get; private set; }

        public Point(int x, int y)
        {
            X = x;
            Y = y;
        }
    }
}
