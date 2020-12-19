using System.Collections.Generic;
using Cysharp.Threading.Tasks;
using UnityEngine;
using UnityEngine.InputSystem;
using Random = UnityEngine.Random;

public class GameManager : MonoBehaviour
{
	[SerializeField] public PersonComponent _personPrefab;

	private List<PersonComponent> _persons;
	private double _refreshTimestamp;
	private const double _refreshDelay = 10f;

	private void Awake()
	{
		_persons = new List<PersonComponent>();
	}

	private async void Start()
	{
		_refreshTimestamp = Time.time + _refreshDelay;

		GameEvents.DataLoadStarted?.Invoke();
		await Game.Instance.Data.InitialLoad();
		GameEvents.DataLoadFinished?.Invoke();

		StartOfficeScene();
	}

	private async void Update()
	{
		#if UNITY_EDITOR
		if (Keyboard.current.enterKey.wasReleasedThisFrame)
		{
			var randomQuote = Game.Instance.Data.GetRandomQuote();
			GameEvents.QuoteAdded?.Invoke(randomQuote, Game.Instance.Data.GetPerson(randomQuote.Author));
		}
		#endif

		if (Mouse.current.leftButton.wasReleasedThisFrame)
		{
			var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
			var hit = Physics2D.Raycast(ray.origin, ray.direction, Mathf.Infinity);
			var person = hit.collider?.GetComponentInParent<PersonComponent>();
			if (person != null)
			{
				var randomQuote = Game.Instance.Data.GetRandomQuoteByPerson(person.Id);
				GameEvents.QuoteAdded?.Invoke(randomQuote, Game.Instance.Data.GetPerson(randomQuote.Author));
			}
		}

		if (Time.time > _refreshTimestamp)
		{
			_refreshTimestamp = Time.time + _refreshDelay;

			Debug.Log("Refreshing data");
			var (newPersons, newQuotes) = await Game.Instance.Data.Refresh();

			foreach (var person in newPersons)
			{
				var origin = new Vector3(Random.Range(2, 30), Random.Range(2, 16), 0);
				_persons.Add(SpawnPerson(person, origin));
			}
			foreach (var quote in newQuotes)
			{
				GameEvents.QuoteAdded?.Invoke(quote, Game.Instance.Data.GetPerson(quote.Author));
			}
		}
	}

	private async void StartOfficeScene()
	{
		foreach (var person in Game.Instance.Data.GetPersons())
		{
			if (person.ShowInGame == false)
			{
				continue;
			}

			var origin = new Vector3(Random.Range(2, 30), Random.Range(2, 16), 0);
			_persons.Add(SpawnPerson(person, origin));
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

		{
			await UniTask.Delay(1000);
			var quote = Game.Instance.Data.GetLastQuote();
			GameEvents.QuoteAdded?.Invoke(quote, Game.Instance.Data.GetPerson(quote.Author));
		}
	}

	private PersonComponent SpawnPerson(Person data, Vector3 position)
	{
		var instance = Instantiate(_personPrefab, position, Quaternion.identity);
		instance.Init(data);
		return instance;
	}
}
