namespace FrisbeerStats.Classes
{
    using System;
    using System.Collections.Generic;
    using System.Net.Http;
    using Microsoft.Extensions.Caching.Memory;
    using Newtonsoft.Json;
    using FrisbeerStats.Models;

    /// <summary>
    /// Interface for getting frisbeer stats related data.
    /// </summary>
    public interface IDataProvider
    {
        /// <summary>
        /// Get all players.
        /// </summary>
        /// <returns></returns>
        RawData GetData();
    }

    /// <summary>
    /// Class for getting frisbeer stats related data.
    /// </summary>
    public class DataProvider : IDataProvider
    {
        /// <summary>
        /// Cache key for storing all Frisbeer stats data;
        /// </summary>
        private const string DataCacheKey = "DataProvider_AllData";

        /// <summary>
        /// Absolute cache expiration time for all Frisbeer stats data. 
        /// </summary>
        private readonly TimeSpan _dataCacheAbsoluteTime = TimeSpan.FromMinutes(10);

        /// <summary>
        /// Http client for getting data from API.
        /// </summary>
        private readonly HttpClient _client;

        /// <summary>
        /// Cache for storing data to prevent getting data on every request.
        /// </summary>
        private readonly IMemoryCache _cache;

        /// <summary>
        /// Cache lock object.
        /// </summary>
        private readonly object _lock;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="root"></param>
        /// <param name="cache"></param>
        public DataProvider(string root, IMemoryCache cache)
        {
            _client = new HttpClient
            {
                BaseAddress = new Uri(root)
            };
            _lock = new object();
            _cache = cache;
        }

        /// <inheritdoc />
        public RawData GetData()
        {
            lock (_lock)
            {
                var data = _cache.Get<RawData>(DataCacheKey);

                if (data != null)
                {
                    return data;
                }

                var json = _client.GetStringAsync("games/").Result;

                data = new RawData(JsonConvert.DeserializeObject<IList<Game>>(json));

                _cache.Set(DataCacheKey, data, new MemoryCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = _dataCacheAbsoluteTime
                });

                return data;
            }
        }
    }
}
