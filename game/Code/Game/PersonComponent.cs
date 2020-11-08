using UnityEngine;

public class PersonComponent : MonoBehaviour
{
	[SerializeField] private SpriteRenderer _spriteRenderer;
	[SerializeField] private MessageDisplay _messageDisplay;

	private Person _person;

	private void OnEnable()
	{
		GameEvents.QuoteAdded += OnQuoteAdded;
	}

	private void OnDisable()
	{
		GameEvents.QuoteAdded -= OnQuoteAdded;
	}

	private void OnQuoteAdded(Quote quote)
	{
		if (quote.Author != _person.Id)
		{
			return;
		}

		_messageDisplay.Show($"{quote.Author} : {quote.Message}");
	}

	public void Init(Person person)
	{
		_person = person;
		_spriteRenderer.sprite = _person.Sprite;
	}
}
