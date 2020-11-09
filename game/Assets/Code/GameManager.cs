using System;
using System.Linq;
using Cysharp.Threading.Tasks;
using Newtonsoft.Json;
using UnityEngine;
using UnityEngine.Networking;
using Random = UnityEngine.Random;

public class GameManager : MonoBehaviour
{
	private const string _apiURL = "http://localhost:3000/.netlify/functions/quotes-dev";
	// private const string _apiURL = "https://pouett.netlify.app/.netlify/functions/quotes";

	[SerializeField] public PersonComponent _personPrefab;
	private static Data _data;

	public static Quote GetQuote(string id) => _data.Quotes.Single(quote => quote.Id == id);
	public static Person GetPerson(string id) => _data.Persons.Single(person => person.Id == id);

	private async void Awake()
	{
		await LoadData();

		for (var index = 0; index < _data.Persons.Length; index++)
		{
			var person = _data.Persons[index];
			SpawnPerson(person, new Vector3(12f + index, 0f, 17f));

			await UniTask.NextFrame();
		}
	}

	private async UniTask LoadData()
	{
		var raw = (await UnityWebRequest.Get(_apiURL).SendWebRequest()).downloadHandler.text;
		var response = JsonConvert.DeserializeObject<Response>(raw, new ColorConverter());

		foreach (var person in response.Data.Persons)
		{
			if (string.IsNullOrEmpty(person.Avatar))
			{
				continue;
			}

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

		_data = response.Data;
	}

	private PersonComponent SpawnPerson(Person person, Vector3 position)
	{
		var instance = Instantiate(_personPrefab, position, Quaternion.identity);
		instance.Init(person);
		return instance;
	}

	public void CreateRandomQuote()
	{
		GameEvents.QuoteAdded?.Invoke(_data.Quotes[Random.Range(0, _data.Quotes.Length)].Id);
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
