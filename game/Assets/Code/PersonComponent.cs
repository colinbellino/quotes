using UnityEngine;

public class PersonComponent : MonoBehaviour
{
	[SerializeField] private SpriteRenderer _body;
	[SerializeField] private SpriteRenderer _head;

	private Person _person;

	public void Init(Person person)
	{
		_person = person;
		name = $"Person ({_person.Id})";

		if (person.Sprite)
		{
			_head.sprite = _person.Sprite;
		}

		if (person.Color != null)
		{
			_body.color = person.Color;
		}
	}
}
