using System;
using Newtonsoft.Json;
using UnityEngine;

internal class ColorConverter : JsonConverter
{
	public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
	{
		throw new System.NotImplementedException();
	}

	public override bool CanConvert(Type objectType)
	{
		return objectType.ToString() == "UnityEngine.Color";
	}

	public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
	{
		string value = (string) reader.Value;
		ColorUtility.TryParseHtmlString(value, out var color);
		return color;
	}
}
