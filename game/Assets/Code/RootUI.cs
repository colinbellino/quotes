using UnityEngine;

public class RootUI : MonoBehaviour
{
	[SerializeField] private LoaderUI _loaderUI;
	[SerializeField] private GameUI _gameUI;

	private void OnEnable()
	{
		GameEvents.DataLoadStarted += DataLoadStarted;
		GameEvents.DataLoadFinished += DataLoadFinished;
	}

	private void OnDisable()
	{
		GameEvents.DataLoadStarted -= DataLoadStarted;
		GameEvents.DataLoadFinished -= DataLoadFinished;
	}

	private void Awake()
	{
		_loaderUI.Hide();
		_gameUI.Hide();
	}

	private void DataLoadStarted()
	{
		_loaderUI.Show();
		_gameUI.Hide();
	}

	private void DataLoadFinished()
	{
		_loaderUI.Hide();
		_gameUI.Show();
	}
}
