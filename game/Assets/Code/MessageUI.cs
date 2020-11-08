using UnityEngine;
using UnityEngine.UI;

public class MessageUI : MonoBehaviour
{
	[SerializeField] private GameObject _root;
	[SerializeField] private Text _text;
	[SerializeField] private Text _author;
	[SerializeField] private Image _avatar;
	[SerializeField] private Image _color;

	private void Start()
	{
		_root.SetActive(false);
	}

	public void Show(string title, string text, Color color)
	{
		_text.text = text;
		_author.text = title;
		_color.color = color;
		_root.SetActive(true);

		CancelInvoke(nameof(Hide));
		Invoke(nameof(Hide), 5f);
	}

	private void Hide()
	{
		_root.SetActive(false);
	}
}
