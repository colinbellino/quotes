using UnityEngine;

public class PersonComponent : MonoBehaviour
{
	[SerializeField] private SpriteRenderer _spriteRenderer;

	private Person _person;

	public void Init(Person person)
	{
		_person = person;
		name = $"Person ({_person.Id})";
		if (person.Sprite)
		{
			_spriteRenderer.sprite = _person.Sprite;
		}

		if (person.Color != null)
		{
			_spriteRenderer.color = person.Color;
		}
	}
}
