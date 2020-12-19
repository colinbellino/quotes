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

	private void OnQuoteAdded(Quote quote, Person author)
	{
		var color = $"#{ColorUtility.ToHtmlStringRGB(author.Color)}";
		var text = TextHelpers.RemoveDiacritics(quote.Text);
		var formattedText = $"<color=\"{color}\">{author.Id}:</color> {text}";

		_messageUI.Show(formattedText, author.Sprite);
	}
}
