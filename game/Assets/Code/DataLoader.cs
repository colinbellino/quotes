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

		foreach (var person in response.Data.Persons)
		{
			if (string.IsNullOrEmpty(person.Avatar) == false)
			{
				// Debug.Log(person.Id + " -> " +  person.Avatar);
				var downloadHandler = (await UnityWebRequestTexture.GetTexture(person.Avatar).SendWebRequest()).downloadHandler as DownloadHandlerTexture;
				var sprite = Sprite.Create(
					downloadHandler.texture,
					new Rect(0, 0, downloadHandler.texture.width, downloadHandler.texture.height),
					new Vector2(0.5f, 0.5f),
					downloadHandler.texture.width
				);
				person.Sprite = sprite;
			}

			Persons.Add(person.Id, person);
		}

		foreach (var quote in response.Data.Quotes)
		{
			Quotes.Add(quote.Id, quote);
		}
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
	public Sprite Sprite;
}
