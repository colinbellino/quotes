using System.Collections.Generic;
using System.Threading;
using Cysharp.Threading.Tasks;
using Pathfinding;
using UnityEngine;

public class PersonComponent : MonoBehaviour
{
	[SerializeField] private SpriteRenderer _body;
	[SerializeField] private Sprite _sprite;

	public IAstarAI AStarAI { get; private set; }
	public Animator Animator { get; private set; }
	private Person _data;
	private CancellationToken _cancellationToken;

	private void Awake()
	{
		AStarAI = GetComponent<IAstarAI>();
		Animator = GetComponentInChildren<Animator>();

		_cancellationToken = this.GetCancellationTokenOnDestroy();
	}

	public void Init(Person person)
	{
		_data = person;
		name = $"Person ({_data.Id})";

		if (person.Color != null && person.Color2 != null)
		{
			_body.material.SetColor("ReplacementColor0", person.Color);
			_body.material.SetColor("ReplacementColor1", person.Color2);
		}
	}

	public async void StartTasks(List<ITask> tasks)
	{
		try
		{
			if (tasks.Count == 0)
			{
				return;
			}

			foreach (var task in tasks)
			{
				await task.Execute(this).WithCancellation(_cancellationToken);
			}

			StartTasks(tasks);
		}
		catch { }
	}
}
