using System;
using UnityEngine;

public static class GameEvents
{
	public static Action DataLoadStarted;
	public static Action DataLoadFinished;
	public static Action<string> QuoteAdded;

	[RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
	static void Init()
	{
		DataLoadStarted = null;
		DataLoadFinished = null;
		QuoteAdded = null;
	}
}
