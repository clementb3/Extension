using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;

namespace extensionApi
{
    public class Provider
    {
        private readonly List<WatchTime> watchTimes = new();
        private readonly string connectionString;

        public Provider(IConfiguration configuration)
        {

            connectionString = configuration.GetConnectionString("DefaultConnection");

            using (SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                sqlConnection.Open();

                using (SqlCommand sqlCommand = new SqlCommand("SELECT id, title, ep, time FROM timeWatch", sqlConnection))
                using (SqlDataReader reader = sqlCommand.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        WatchTime watchTime = new WatchTime
                        {
                            Id = reader.GetInt32(0),
                            Title = reader.GetString(1),
                            Episode = reader.GetInt32(2),
                            Time = reader.GetInt32(3)
                        };

                        watchTimes.Add(watchTime);
                    }
                }
            }
        }

        public List<WatchTime> GetAllWatchTime()
        {
            return watchTimes;
        }

        public WatchTime GetWatchTimeById(int id)
        {
            return watchTimes.First(w => w.Id == id);
        }

        public List<WatchTime> GetWatchTimeByTitle(string title)
        {
            return watchTimes.Where(w => w.Title! == title).ToList();
        }

        public void UpdateWatchTime(WatchTime watchTime)
        {
            WatchTime watch =  watchTimes.First(w => w.Id == watchTime.Id);
            watch.Time = watchTime.Time;
            using (SqlConnection sqlConnection = new SqlConnection(this.connectionString))
            {
                sqlConnection.Open();

                string query = @"
                update timeWatch set time = @Time where id=@Id";

                using (SqlCommand sqlCommand = new SqlCommand(query, sqlConnection))
                {
                    sqlCommand.Parameters.AddWithValue("@Time", watchTime.Time);
                    sqlCommand.Parameters.AddWithValue("@Id", watchTime.Id);
                    sqlCommand.ExecuteNonQuery();
                }
            }
        }

        public WatchTime GetWatchTimeByData(int episode, string title)
        {
            WatchTime? watchTime = watchTimes.FirstOrDefault(w => w.Episode == episode && w.Title.Equals(title));

            if (watchTime == null)
            {
                using (SqlConnection sqlConnection = new SqlConnection(this.connectionString))
                {
                    sqlConnection.Open();

                    string query = @"
                INSERT INTO timeWatch (ep, title, time)
                VALUES (@Episode, @Title, 0);
                SELECT TOP 1 id, title, ep, time
                FROM timeWatch
                WHERE ep = @Episode AND title = @Title
                ORDER BY id DESC;";

                    using (SqlCommand sqlCommand = new SqlCommand(query, sqlConnection))
                    {
                        sqlCommand.Parameters.AddWithValue("@Episode", episode);
                        sqlCommand.Parameters.AddWithValue("@Title", title);

                        using (SqlDataReader reader = sqlCommand.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                watchTime = new WatchTime
                                {
                                    Id = reader.GetInt32(0),
                                    Title = reader.GetString(1),
                                    Episode = reader.GetInt32(2),
                                    Time = reader.GetInt32(3)
                                };

                                watchTimes.Add(watchTime);
                            }
                        }
                    }
                }
            }
            return watchTime!;
        }

    }
}
