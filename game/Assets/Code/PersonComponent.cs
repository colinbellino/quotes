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
			var clothColor = person.Color;
			var hairColor = new Color(
				Random.Range(0f, 1f),
				Random.Range(0f, 1f),
				Random.Range(0f, 1f),
				255
			);
			var originalColors = new Color[]
			{
				new Color32(217, 87, 99, 255),
				new Color32(172, 50, 50, 255),
				new Color32(91, 110, 225, 255),
				new Color32(99, 155, 255, 255),
			};
			var newColors = new Color[]
			{
				clothColor,
				new Color(clothColor.r * 0.8f, clothColor.g * 0.8f, clothColor.b * 0.8f, 1f),
				hairColor,
				new Color(hairColor.r * 0.8f, hairColor.g * 0.8f, hairColor.b * 0.8f, 1f),
			};
			SetColor(originalColors, newColors);
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

	private void SetColor(Color[] originalColors, Color[] newColors)
	{
		var texture = Instantiate(_body.sprite.texture);

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

		var sprite = Sprite.Create(texture, _body.sprite.textureRect, new Vector2(0.5f, 0), _body.sprite.pixelsPerUnit);
		_body.sprite = sprite;
	}

	private Color ConvertColor(int r, int g, int b) {
		return new Color(r/255f, g/255f, b/255f, 1f);
	}
}
