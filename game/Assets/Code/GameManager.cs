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

		foreach (var item in Game.Instance.Data.Persons)
		{
			_persons.Add(SpawnPerson(item.Value, new Vector3(16, 9,0)));
		}

		foreach (var person in _persons)
		{
			var tasks = new List<ITask>
			{
				new MoveTask(person.transform.position + new Vector3(Random.Range(-5, 5), Random.Range(-5, 5), 0f)),
				new IdleTask(Random.Range(500, 5000)),
				new MoveTask(person.transform.position + new Vector3(Random.Range(-5, 5), Random.Range(-5, 5), 0f)),
				new IdleTask(Random.Range(500, 5000)),
				new MoveTask(person.transform.position + new Vector3(Random.Range(-5, 5), Random.Range(-5, 5), 0f)),
				new IdleTask(Random.Range(500, 5000)),
				new MoveTask(person.transform.position + new Vector3(Random.Range(-5, 5), Random.Range(-5, 5), 0f)),
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

public class IdleTask : ITask
{
	private readonly int _duration;

	public IdleTask(int duration)
	{
		_duration = duration;
	}

	public async UniTask Execute(PersonComponent person)
	{
		await UniTask.Delay(_duration);
	}
}

public class MoveTask : ITask
{
	private readonly Vector3 _destination;
	private readonly float _speed = 1f;

	public MoveTask(Vector3 destination)
	{
		_destination = destination;
	}

	public async UniTask Execute(PersonComponent person)
	{
		while (Vector3.Distance(person.transform.position, _destination) >= 0.1f)
		{
			person.transform.position = Vector3.MoveTowards(
				person.transform.position,
				_destination,
				Time.deltaTime * _speed
			);

			await UniTask.NextFrame();
		}
	}
}

public interface ITask
{
	UniTask Execute(PersonComponent person);
}
