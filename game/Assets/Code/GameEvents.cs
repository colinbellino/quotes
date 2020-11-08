using System;
using UnityEngine;

public static class GameEvents
{
	public static Action<string> QuoteAdded;

	[RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
	static void Init()
	{
		QuoteAdded = null;
	}
}
