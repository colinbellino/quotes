using System.Globalization;
using System.Linq;
using System.Text;

public static class TextHelpers
{
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
