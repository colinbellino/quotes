using Cysharp.Threading.Tasks;

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
