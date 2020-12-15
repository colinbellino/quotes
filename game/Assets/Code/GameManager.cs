using System.Collections.Generic;
using System.Linq;
using Cysharp.Threading.Tasks;
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

		StartOfficeScene();
	}

	private void StartOfficeScene()
	{
		AstarPath.active.Scan();

		foreach (var item in Game.Instance.Data.Persons)
		{
			var origin = new Vector3(Random.Range(2, 30), Random.Range(2, 16), 0);
			_persons.Add(SpawnPerson(item.Value, origin));
		}

		foreach (var person in _persons)
		{
			var tasks = new List<ITask>
			{
				new MoveTask(new Vector3(Random.Range(2, 30), Random.Range(2, 16), 0f)),
				new IdleTask(Random.Range(500, 5000)),
				new MoveTask(new Vector3(Random.Range(2, 30), Random.Range(2, 16), 0f)),
				new IdleTask(Random.Range(500, 5000)),
				new MoveTask(new Vector3(Random.Range(2, 30), Random.Range(2, 16), 0f)),
				new IdleTask(Random.Range(500, 5000)),
				new MoveTask(new Vector3(Random.Range(2, 30), Random.Range(2, 16), 0f)),
				new IdleTask(Random.Range(500, 5000)),
			};
			person.StartTasks(tasks);
		}
	}

	private PersonComponent SpawnPerson(Person data, Vector3 position)
	{
		var instance = Instantiate(_personPrefab, position, Quaternion.identity);
		instance.Init(data);
		return instance;
	}

	public void CreateRandomQuote()
	{
		var randomQuote = Game.Instance.Data.Quotes.ElementAt(Random.Range(0, Game.Instance.Data.Quotes.Count)).Value;
		GameEvents.QuoteAdded?.Invoke(randomQuote.Id);
	}
}
