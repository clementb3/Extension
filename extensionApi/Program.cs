using System.Text.Json.Serialization;

namespace extensionApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateSlimBuilder(args);

            builder.Services.ConfigureHttpJsonOptions(options =>
            {
                options.SerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonSerializerContext.Default);
            });

            var app = builder.Build();

            Provider provider = new Provider(app.Configuration);

            var serveurState = app.MapGroup("/serveurState");
            serveurState.MapGet("/", () => Results.Ok("API is running")); 
            var extensionApi = app.MapGroup("/extensionApi");
            extensionApi.MapGet("/", () => provider.GetAllWatchTime());
            extensionApi.MapGet("/title/{title}", (string title) => provider.GetWatchTimeByTitle(title));
            extensionApi.MapGet("/id/{id}", (int id) => provider.GetWatchTimeById(id));
            extensionApi.MapGet("/eptitle/{ep}/{title}", (int ep, string title) => provider.GetWatchTimeByData(ep, title));
            extensionApi.MapPut("/", (WatchTime w) => provider.UpdateWatchTime(w));
            extensionApi.MapGet("/list", () => provider.GetAllWatchTimeString());

            app.Run();
        }
    }

    [JsonSerializable(typeof(List<WatchTime>))]
    [JsonSerializable(typeof(WatchTime))]
    internal partial class AppJsonSerializerContext : JsonSerializerContext
    {

    }
}
