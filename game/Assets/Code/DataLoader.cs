using System;
using System.Collections.Generic;
using Cysharp.Threading.Tasks;
using Newtonsoft.Json;
using UnityEngine;
using UnityEngine.Networking;
using Random = UnityEngine.Random;

public class DataLoader
{
	private readonly string _apiURL;

	private List<Quote> _quotes { get; }
	private List<Person> _persons { get; }

	public DataLoader(string apiUrl)
	{
		_apiURL = apiUrl;
		_quotes = new List<Quote>();
		_persons = new List<Person>();
	}

	public async UniTask InitialLoad()
	{
		var (persons, quotes) = await FetchData();

		foreach (var person in persons)
		{
			_persons.Add(person);
		}

		foreach (var quote in quotes)
		{
			_quotes.Add(quote);
		}
	}

	public async UniTask<(List<Person>, List<Quote>)> Refresh()
	{
		var newPersons = new List<Person>();
		var newQuotes = new List<Quote>();

		var (persons, quotes) = await FetchData();
		foreach (var person in persons)
		{
			if (GetPerson(person.Id) == null)
			{
				newPersons.Add(person);
				_persons.Add(person);
			}
		}

		foreach (var quote in quotes)
		{
			if (GetQuote(quote.Id) == null)
			{
				newQuotes.Add(quote);
				_quotes.Add(quote);
			}
		}

		return (newPersons, newQuotes);
	}

	public IEnumerable<Person> GetPersons() => _persons;
	public Person GetPerson(string personId) => _persons.Find(person => person.Id == personId);

	public Quote GetQuote(string quoteId) => _quotes.Find(quote => quote.Id == quoteId);
	public Quote GetLastQuote() => _quotes[_quotes.Count - 1];
	public Quote GetRandomQuote()
	{
		var index = Random.Range(0, _quotes.Count);
		return _quotes[index];
	}

	private async UniTask<(Person[], Quote[])> FetchData()
	{
		var request = await UnityWebRequest.Get(_apiURL).SendWebRequest();
		var response = JsonConvert.DeserializeObject<Response>(request.downloadHandler.text, new ColorConverter());

		var personsTasks = new List<UniTask<Person>>();

		foreach (var person in response.Data.Persons)
		{
			personsTasks.Add(DownloadSprite(person));
		}

		var persons = await UniTask.WhenAll(personsTasks);

		return (persons, response.Data.Quotes);
	}

	private static async UniTask<Person> DownloadSprite(Person person)
	{
		if (string.IsNullOrEmpty(person.Avatar))
		{
			return person;
		}

		var webRequest = await UnityWebRequestTexture.GetTexture(person.Avatar).SendWebRequest();
		var downloadHandler = webRequest.downloadHandler as DownloadHandlerTexture;
		var sprite = Sprite.Create(
			downloadHandler.texture,
			new Rect(0, 0, downloadHandler.texture.width, downloadHandler.texture.height),
			new Vector2(0.5f, 0.5f),
			downloadHandler.texture.width
		);
		sprite.name = $"Person Avatar: {person.Id}";

		person.Sprite = sprite;
		return person;
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
