using Cysharp.Threading.Tasks;
using UnityEngine;

public class MoveTask : ITask
{
	private readonly Vector3 _destination;
	private readonly float _speed = 2f;

	public MoveTask(Vector3 destination)
	{
		_destination = destination;
	}

	public async UniTask Execute(PersonComponent person)
	{
		person.AStarAI.canSearch = true;
		person.AStarAI.destination = _destination;

		while (person.AStarAI.reachedDestination == false && person.AStarAI.isStopped == false)
		{
			await UniTask.NextFrame();
		}

		person.AStarAI.canSearch = false;
	}
}
