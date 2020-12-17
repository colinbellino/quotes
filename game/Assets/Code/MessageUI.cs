using UnityEngine;
using UnityEngine.UI;

public class MessageUI : MonoBehaviour
{
	[SerializeField] private GameObject _root;
	[SerializeField] private Text _text;
	[SerializeField] private Image _avatar;

	private void Start()
	{
		_root.SetActive(false);
	}

	public void Show(string text, Sprite avatar)
	{
		_text.text = text;

		if (avatar)
		{
        	_avatar.sprite = avatar;
		}
		_root.SetActive(true);

		CancelInvoke(nameof(Hide));
		Invoke(nameof(Hide), 5f);
	}

	private void Hide()
	{
		_root.SetActive(false);
	}
}
