using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using Random = UnityEngine.Random;

public class GameManager : MonoBehaviour
{
	[SerializeField] public PersonComponent _personPrefab;

	private List<PersonComponent> _persons;

	private void Awake()
	{
		_persons = new List<PersonComponent>();
	}

	private async void Start()
	{
		GameEvents.DataLoadStarted?.Invoke();
		await Game.Instance.Data.LoadAll();
		GameEvents.DataLoadFinished?.Invoke();

		foreach (var item in Game.Instance.Data.Persons)
		{
			_persons.Add(SpawnPerson(item.Value, new Vector3(12f, 6f,0f)));
		}
	}

	private PersonComponent SpawnPerson(Person person, Vector3 position)
	{
		var instance = Instantiate(_personPrefab, position, Quaternion.identity);
		instance.Init(person);
		return instance;
	}

	public void CreateRandomQuote()
	{
		var randomQuote = Game.Instance.Data.Quotes.ElementAt(Random.Range(0, Game.Instance.Data.Quotes.Count)).Value;
		GameEvents.QuoteAdded?.Invoke(randomQuote.Id);
	}
}
