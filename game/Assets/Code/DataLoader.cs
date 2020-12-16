using System;
using System.Collections.Generic;
using Cysharp.Threading.Tasks;
using Newtonsoft.Json;
using UnityEngine;
using UnityEngine.Networking;

public class DataLoader
{
	private readonly string _apiURL;

	public Dictionary<string, Quote> Quotes { get; }
	public Dictionary<string, Person> Persons { get; }

	public DataLoader(string apiUrl)
	{
		_apiURL = apiUrl;
		Quotes = new Dictionary<string, Quote>();
		Persons = new Dictionary<string, Person>();
	}

	public async UniTask LoadAll()
	{
		var raw = (await UnityWebRequest.Get(_apiURL).SendWebRequest()).downloadHandler.text;
		var response = JsonConvert.DeserializeObject<Response>(raw, new ColorConverter());

		var personsTasks = new List<UniTask>();

		foreach (var person in response.Data.Persons)
		{
			personsTasks.Add(DownloadSprite(person, Persons));
		}

		await UniTask.WhenAll(personsTasks);

		foreach (var quote in response.Data.Quotes)
		{
			Quotes.Add(quote.Id, quote);
		}
	}

	private static async UniTask DownloadSprite(Person person, Dictionary<string, Person> persons)
	{
		if (string.IsNullOrEmpty(person.Avatar))
		{
			return;
		}

		var webRequestTask = UnityWebRequestTexture.GetTexture(person.Avatar).SendWebRequest();
		var downloadHandler = (await webRequestTask).downloadHandler as DownloadHandlerTexture;
		var sprite = Sprite.Create(
			downloadHandler.texture,
			new Rect(0, 0, downloadHandler.texture.width, downloadHandler.texture.height),
			new Vector2(0.5f, 0.5f),
			downloadHandler.texture.width
		);

		person.Sprite = sprite;
		persons.Add(person.Id, person);
	}
}

public class Response
{
	[JsonProperty("data")] public Data Data;
}

public class Data
{
	[JsonProperty("quotes")] public Quote[] Quotes;
	[JsonProperty("persons")] public Person[] Persons;
}

public class Quote
{
	[JsonProperty("id")] public string Id;
	[JsonProperty("text")] public string Text;
	[JsonProperty("date")] 	public DateTime Date;
	[JsonProperty("author")] public string Author;
}

public class Person
{
	[JsonProperty("id")] public string Id;
	[JsonProperty("avatar")] public string Avatar;
	[JsonProperty("color")] public Color Color;
	[JsonProperty("color2")] public Color Color2;
	public Sprite Sprite;
}
