using UnityEngine;

public class Rotate : MonoBehaviour
{
	[SerializeField] private float _speed = 1f;

	private void Update()
	{
		transform.Rotate(0f, 0f, _speed * Time.deltaTime);
	}
}
