using System.Collections.Generic;
using UnityEngine;

public class PersonComponent : MonoBehaviour
{
	[SerializeField] private SpriteRenderer _body;
	[SerializeField] private SpriteRenderer _head;

	private Person _data;

	public void Init(Person person)
	{
		_data = person;
		name = $"Person ({_data.Id})";

		if (person.Sprite)
		{
			_head.sprite = _data.Sprite;
		}

		if (person.Color != null)
		{
			_body.color = person.Color;
		}
	}

	public async void StartTasks(List<ITask> tasks)
	{
		if (tasks.Count == 0)
		{
			return;
		}

		foreach (var task in tasks)
		{
			await task.Execute(this);
		}

		StartTasks(tasks);
	}
}
