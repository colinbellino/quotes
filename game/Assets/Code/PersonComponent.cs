using System.Collections.Generic;
using Pathfinding;
using UnityEngine;

public class PersonComponent : MonoBehaviour
{
	[SerializeField] private SpriteRenderer _body;
	[SerializeField] private SpriteRenderer _head;

	private Person _data;
	public IAstarAI AStarAI { get; private set; }

	private void Awake()
	{
		AStarAI = GetComponent<IAstarAI>();
	}

	public void Init(Person person)
	{
		_data = person;
		name = $"Person ({_data.Id})";

		// if (person.Sprite)
		// {
		// 	_head.sprite = _data.Sprite;
		// }

		if (person.Color != null)
		{
			var originalColors = new Color[]
			{
				new Color32(217, 87, 99, 255),
				new Color32(172, 50, 50, 255),
				new Color32(99, 155, 255, 255),
				new Color32(91, 110, 225, 255),
			};
			var newColors = new Color[]
			{
				person.Color,
				Lighten(person.Color),
				person.Color2,
				Lighten(person.Color2),
			};

			_body.sprite = ReplaceSpriteColors(_body.sprite, originalColors, newColors);
		}
	}

	private static Color Lighten(Color color)
	{
		return new Color(color.r * 0.9f, color.g * 0.9f, color.b * 0.9f, 1f);
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

	private static Sprite ReplaceSpriteColors(Sprite sprite, Color[] originalColors, Color[] newColors)
	{
		var texture = Instantiate(sprite.texture);

		var pixels = texture.GetPixels();
		for (var index = 0; index < pixels.Length; index++)
		{
			var pixel = pixels[index];
			var x = index % texture.width;
			var y = index / texture.width;

			for (var colorIndex = 0; colorIndex < originalColors.Length; colorIndex++)
			{
				if (originalColors[colorIndex] == pixel)
				{
					texture.SetPixel(x, y, newColors[colorIndex]);
				}
			}
		}
		texture.Apply();

		return Sprite.Create(texture, sprite.textureRect, new Vector2(0.5f, 0), sprite.pixelsPerUnit);
	}

	private Color ConvertColor(int r, int g, int b) {
		return new Color(r/255f, g/255f, b/255f, 1f);
	}
}
