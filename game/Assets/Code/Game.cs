using UnityEngine;

public class Game
{
	private const string _apiURL = "http://localhost:3000/api/quotes";

	public DataLoader Data { get; private set; }

	private static Game _instance;
	public static Game Instance
	{
		get
		{
			if (_instance == null)
			{
				_instance = new Game();
			}
			return _instance;
		}
	}

	private Game()
	{
		Init();
	}

	private void Init()
	{
		Data = new DataLoader(_apiURL);
	}

	[RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
	private static void StaticInit()
	{
		Instance.Init();
	}
}
