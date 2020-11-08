using UnityEngine;
using UnityEngine.UI;

public class MessageDisplay : MonoBehaviour
{
	[SerializeField] private GameObject _canvas;
	[SerializeField] private Text _text;

	private void Start()
	{
		_canvas.SetActive(false);
	}

	public void Show(string text)
	{
		_text.text = text;
		_canvas.SetActive(true);

		Invoke(nameof(Hide), 5f);
	}

	private void Hide()
	{
		_canvas.SetActive(false);
	}
}
