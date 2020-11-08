using System;
using UnityEngine;

public static class GameEvents
{
	public static Action<Quote> QuoteAdded;

	[RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
	static void Init()
	{
		QuoteAdded = null;
	}
}
