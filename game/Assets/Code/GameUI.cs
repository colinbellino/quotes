using System.Globalization;
using System.Linq;
using System.Text;
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
		var color = $"#{ColorUtility.ToHtmlStringRGB(author.Color)}";
		var text = $"<color=\"{color}\">{author.Id}:</color> {quote.Text}";

		_messageUI.Show(RemoveDiacritics(text), author.Sprite);
	}

	public static string RemoveDiacritics(string text)
	{
		if (string.IsNullOrWhiteSpace(text))
		{
			return text;
		}

		text = text.Normalize(NormalizationForm.FormD);
		var chars = Enumerable.Where(text, c => CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark).ToArray();
		return new string(chars).Normalize(NormalizationForm.FormC);
	}
}
