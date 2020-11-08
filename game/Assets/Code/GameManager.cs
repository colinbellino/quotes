using System;
using System.IO;
using System.Linq;
using Newtonsoft.Json;
using UnityEngine;
using Random = UnityEngine.Random;

public class GameManager : MonoBehaviour
{
	[SerializeField] public PersonComponent _personPrefab;
	[SerializeField] private RootUI _ui;

	private static Fixtures _fixtures;

	public static Quote GetQuote(string id) => _fixtures.Quotes.Single(quote => quote.Id == id);
	public static Person GetPerson(string id) => _fixtures.Persons.Single(person => person.Id == id);

	private void Awake()
	{
		var reader = new StreamReader("../src/data/fixtures.json");
		var json = reader.ReadToEnd();
		_fixtures = JsonConvert.DeserializeObject<Fixtures>(json, new ColorConverter());

		for (var index = 0; index < _fixtures.Persons.Length; index++)
		{
			var person = _fixtures.Persons[index];
			SpawnPerson(person.Id, new Vector3(12f + index, 0f, 17f));
		}
	}

	private PersonComponent SpawnPerson(string id, Vector3 position)
	{
		var instance = Instantiate(_personPrefab, position, Quaternion.identity);
		instance.Init(_fixtures.Persons.Single(person => person.Id == id));
		return instance;
	}

	public void CreateRandomQuote()
	{
		GameEvents.QuoteAdded?.Invoke(_fixtures.Quotes[Random.Range(0, _fixtures.Quotes.Length)].Id);
	}
}

public class Fixtures
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
