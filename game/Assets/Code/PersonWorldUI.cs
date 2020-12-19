using UnityEngine;
using UnityEngine.UI;

public class PersonWorldUI : MonoBehaviour
{
	[SerializeField] private Text _text;

	public void SetName(string value)
	{
		_text.text = value;
	}
}
