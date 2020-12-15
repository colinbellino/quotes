using UnityEngine;

public class GameUI : MonoBehaviour
{
	[SerializeField] private GameObject _root;
	[SerializeField] private MessageUI _messageUI;

	private void Start()
	{
		Hide();
	}

	public void Show()
	{
		GameEvents.QuoteAdded += OnQuoteAdded;
		_root.SetActive(true);
	}

	public void Hide()
	{
		GameEvents.QuoteAdded -= OnQuoteAdded;
		_root.SetActive(false);
	}

	private void OnQuoteAdded(string quoteId)
	{
		var quote = Game.Instance.Data.Quotes[quoteId];
		var author = Game.Instance.Data.Persons[quote.Author];

		_messageUI.Show(author.Id, quote.Text, author.Color, author.Sprite);
	}
}
