using UnityEngine;

public class LoaderUI : MonoBehaviour
{
	[SerializeField] private GameObject _root;

	private void Start()
	{
		_root.SetActive(false);
	}

	public void Show()
	{
		_root.SetActive(true);
	}

	public void Hide()
	{
		_root.SetActive(false);
	}
}
