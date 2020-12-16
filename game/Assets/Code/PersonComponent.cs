using System.Collections.Generic;
using System.Linq;
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
			SetColor(person.Color);
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

	private void SetColor(Color color)
	{
		// _body.color = color;

		var colors = new Color[]
		{
			new Color32(172, 50, 50, 255),
			new Color32(217, 87, 99, 255),
		};
		var colors2 = new Color[]
		{
			new Color(color.r * 0.8f, color.g * 0.8f, color.b * 0.8f, 1f),
			color,
		};
		var texture = Texture.Instantiate(_body.sprite.texture);

		var pixels = texture.GetPixels();
		for (var index = 0; index < pixels.Length; index++)
		{
			var pixel = pixels[index];
			var x = index % texture.width;
			var y = index / texture.width;

			for (var colorIndex = 0; colorIndex < colors.Length; colorIndex++)
			{
				if (colors[colorIndex] == pixel)
				{
					texture.SetPixel(x, y, colors2[colorIndex]);
				}
			}
		}
		texture.Apply();

		{
			var pixel = texture.GetPixel(0, 0);
			Debug.Log($"{pixel}");
		}
		{
			var pixel = texture.GetPixel(1, 0);
			Debug.Log($"{pixel}");
			// texture.SetPixel(0, 0, colors[new Color32(172, 50, 50, 255)]);
		}

		var sprite = Sprite.Create(texture, _body.sprite.textureRect, new Vector2(0.5f, 0), _body.sprite.pixelsPerUnit);
		_body.sprite = sprite;
	}

	private Color ConvertColor(int r, int g, int b) {
		return new Color(r/255f, g/255f, b/255f, 1f);
	}
}
