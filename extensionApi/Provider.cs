using Microsoft.Data.SqlClient;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace extensionApi
{
    public class Provider
    {
        private readonly List<WatchTime> watchTimes = new();
        private readonly string connectionString;

        public Provider(IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("DefaultConnection");

            using (SqliteConnection SqliteConnection = new SqliteConnection(connectionString))
            {
                SqliteConnection.Open();
                using (var sqlCommand = SqliteConnection.CreateCommand())
                {

                    sqlCommand.CommandText = "SELECT id, title, ep, time FROM timeWatch";
                    using (var reader = sqlCommand.ExecuteReader())
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
        }

        public List<WatchTime> GetAllWatchTime()
        {
            return watchTimes;
        }
        

        public string GetAllWatchTimeString()
        {
            StringBuilder res = new StringBuilder("|---------------------------------------------------------------------------|");
            res.Append("\n|  ID  |    TIME    |  episode  |                   title                   |");
            res.Append("\n|---------------------------------------------------------------------------|");
            foreach (WatchTime watchTime in watchTimes)
            {
                res.Append($"\n| {watchTime.Id,-4} | {ConvertTime(watchTime.Time),-10} | {watchTime.Episode,-9} | " +
                    $"{(watchTime.Title!.Length > 41 ? watchTime.Title!.Substring(0,41) : watchTime.Title!),-41} |");
            }
            res.Append("\n|---------------------------------------------------------------------------|");
            return res.ToString();
        }

        private string ConvertTime(int time)
        {

            int hours = time / 3600;
            int minutes = time % 3600 / 60;
            double seconds = time % 60;

            return $"{hours:D2}:{minutes:D2}:{seconds:00.##}"; 
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
            WatchTime watch = watchTimes.First(w => w.Id == watchTime.Id);
            watch.Time = watchTime.Time;
            using (SqliteConnection SqliteConnection = new SqliteConnection(this.connectionString))
            {
                SqliteConnection.Open();

                string query = @"
                update timeWatch set time = @Time where id=@Id";

                using (var sqlCommand = SqliteConnection.CreateCommand())
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
                using (SqliteConnection SqliteConnection = new SqliteConnection(this.connectionString))
                {
                    SqliteConnection.Open();



                    using (var sqlCommand = SqliteConnection.CreateCommand())
                    {
                        sqlCommand.CommandText = @"
                INSERT INTO timeWatch (ep, title, time)
                VALUES (@Episode, @Title, 0);

                SELECT id, title, ep, time
                FROM timeWatch
                WHERE ep = @Episode AND title = @Title
                ORDER BY id DESC
                LIMIT 1;";
                        sqlCommand.Parameters.AddWithValue("@Episode", episode);
                        sqlCommand.Parameters.AddWithValue("@Title", title);

                        using (var reader = sqlCommand.ExecuteReader())
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
