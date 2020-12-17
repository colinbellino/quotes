using System.Collections.Generic;
using Pathfinding;
using UnityEditor;
using UnityEngine;

public class PersonComponent : MonoBehaviour
{
	[SerializeField] private SpriteRenderer _body;
	[SerializeField] private Sprite _sprite;

	public IAstarAI AStarAI { get; private set; }
	public Animator Animator { get; private set; }
	private Person _data;
	private Color[] _originalColors;
	private Color[] _newColors;

	private void Awake()
	{
		AStarAI = GetComponent<IAstarAI>();
		Animator = GetComponentInChildren<Animator>();
	}

	public void Init(Person person)
	{
		_data = person;
		name = $"Person ({_data.Id})";

		if (person.Color != null && person.Color2 != null)
		{
			_originalColors = new Color[]
			{
				new Color32(217, 87, 99, 255),
				new Color32(172, 50, 50, 255),
				new Color32(99, 155, 255, 255),
				new Color32(91, 110, 225, 255),
			};
			_newColors = new[]
			{
				person.Color,
				Lighten(person.Color),
				person.Color2,
				Lighten(person.Color2),
			};

			// ApplyPalette(_sprite);
			// ApplyPalette(Animator);
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

	private void ApplyPalette(Animator animator)
	{
		foreach (var clip in animator.runtimeAnimatorController.animationClips)
		{
			var newClip = Instantiate(clip);

			var curveBinding = new EditorCurveBinding
			{
				type = typeof(SpriteRenderer),
				path = "",
				propertyName = "m_Sprite"
			};

			foreach (var binding in AnimationUtility.GetObjectReferenceCurveBindings(newClip))
			{
				var keyframes = AnimationUtility.GetObjectReferenceCurve(newClip, binding);
				var newKeyframes = new ObjectReferenceKeyframe[keyframes.Length];

				for (var frameIndex = 0; frameIndex < keyframes.Length; frameIndex++)
				{
					var frame = keyframes[frameIndex];
					if (frame.value is Sprite sprite)
					{
						newKeyframes[frameIndex] = new ObjectReferenceKeyframe
						{
							time = frame.time,
							value = ApplyPalette(sprite),
						};
					}
				}

				AnimationUtility.SetObjectReferenceCurve(newClip, curveBinding, newKeyframes);
			}

			var animatorOverrideController = new AnimatorOverrideController();
			animatorOverrideController.runtimeAnimatorController = animator.runtimeAnimatorController;
			animatorOverrideController[clip.name] = newClip;
			Animator.runtimeAnimatorController = animatorOverrideController;
		}
	}

	private Sprite ApplyPalette(Sprite sprite)
	{
		return ReplaceSpriteColors(sprite, _originalColors, _newColors);
	}

	private static Sprite ReplaceSpriteColors(Sprite sprite, Color[] originalColors, Color[] newColors)
	{
		var texture = Instantiate(sprite.texture);

		var pixels = texture.GetPixels();
		for (var pixelIndex = 0; pixelIndex < pixels.Length; pixelIndex++)
		{
			var pixel = pixels[pixelIndex];

			for (var colorIndex = 0; colorIndex < originalColors.Length; colorIndex++)
			{
				if (originalColors[colorIndex] == pixel)
				{
					var x = pixelIndex % texture.width;
					var y = pixelIndex / texture.width;

					texture.SetPixel(x, y, newColors[colorIndex]);
				}
			}
		}
		texture.Apply();

		return Sprite.Create(texture, sprite.textureRect, new Vector2(0.5f, 0), sprite.pixelsPerUnit);
	}

	private static Color Lighten(Color color)
	{
		return new Color(color.r * 0.8f, color.g * 0.8f, color.b * 0.8f, 1f);
	}
}
