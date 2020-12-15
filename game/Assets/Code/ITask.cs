using Cysharp.Threading.Tasks;

public interface ITask
{
	UniTask Execute(PersonComponent person);
}
