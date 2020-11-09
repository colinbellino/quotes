using UnityEngine;

public class RootUI : MonoBehaviour
{
	[SerializeField] private MessageUI _messageUI;

	private void OnEnable()
	{
		GameEvents.QuoteAdded += OnQuoteAdded;
	}

	private void OnDisable()
	{
		GameEvents.QuoteAdded -= OnQuoteAdded;
	}

	private void OnQuoteAdded(string quoteId)
	{
		var quote = GameManager.GetQuote(quoteId);
		var author = GameManager.GetPerson(quote.Author);

		_messageUI.Show(author.Id, quote.Text, author.Color, author.Sprite);
	}

}
